import { FC, useEffect, useState } from "react";
import { isEditSelector } from "../../../../../controllers/slices/editSlice";
import { useSelector } from "react-redux";
import { adjustTextAreaHeight } from "../../../../../controllers/general.ts/general";
import { setSectionToDB } from "../../../../../controllers/db/sections/setSections";
import { DocumentObject } from "../../../../../controllers/general.ts/statement_helpers";
import EditInput from "../../../../components/editInput/EditInput";
import { sectionHeader } from "../Section";
interface Props {
  order: number ;
  document: DocumentObject;
  setIsTitleReady: (isReady: boolean) => void;
  isTitleReady: boolean;
}

const SectionTitle: FC<Props> = ({
  order,
  document,
  isTitleReady,
  setIsTitleReady,
}) => {
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
          placeHolder={document.title ? document.title : "add title"}
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
          {sectionHeader(`${order}) ${document.title}`, document.level)}
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
      const textarea = e.target as HTMLTextAreaElement;
      const value = textarea.value;
      if (value === "") {
        setIsTitleReady(false);
        return;
      }

      setIsTitleReady(true);

      setSectionToDB({
        text: value,
        docStatement: document.statement,
        parentId: document.statementId,
        order: order,
        isTop: false,
      })

      _setIsEdit(false);
    }
  }
};

export default SectionTitle;
