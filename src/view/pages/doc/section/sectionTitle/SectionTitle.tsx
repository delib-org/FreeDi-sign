import { FC, useEffect, useState } from "react";
import { isEditSelector } from "../../../../../controllers/slices/editSlice";
import { useSelector } from "react-redux";
import { adjustTextAreaHeight } from "../../../../../controllers/general.ts/general";
import EditInput from "../../../../components/editInput/EditInput";
import { sectionHeader } from "../Section";
import { Statement } from "delib-npm";


interface Props {
  order: number;
  statement: Statement;
  setIsTitleReady: (isReady: boolean) => void;
  isTitleReady: boolean;
}

const SectionTitle: FC<Props> = ({
  order,
 statement,
  isTitleReady,
  setIsTitleReady,
}) => {
  try {
    const isEdit = useSelector(isEditSelector);
    const [_isEdit, _setIsEdit] = useState(false);

    useEffect(() => {
      if (isTitleReady === false) {
        _setIsEdit(true);
      }
    }, [isTitleReady]);

    return (
      <>
        {isEdit && _isEdit ? (
          <EditInput
            placeholder="Sdd title"
            statement={statement}
            onChange={handleChange}
            onBlur={handleUpdate}
            onKeyUp={handleUpdate}
          />
        ) : (
          <div
            onClick={() => {
              if (isEdit) _setIsEdit(true);
            }}
          >
            {sectionHeader(`${order}) ${statement.statement}`,2)}
          </div>
        )}
      </>
    );

    function handleChange(e: any) {
      const textarea = e.target as HTMLTextAreaElement;
      adjustTextAreaHeight(textarea);
    }

    function handleUpdate(e: any) {
      if (e.key === "Enter" || e.type === "blur") {
        debugger;
        const textarea = e.target as HTMLTextAreaElement;
        const value = textarea.value;
        if (value === "") {
          setIsTitleReady(false);
          return;
        }

        setIsTitleReady(true);

        // setSectionToDB({
        //   text: value,
        //   docStatement: section.statement,
        //   parentId: section.statementId,
        //   order: order,
        //   isTop: false,
        // });

        _setIsEdit(false);
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SectionTitle;
