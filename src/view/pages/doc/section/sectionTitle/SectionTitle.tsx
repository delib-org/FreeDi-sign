import { FC, useEffect, useState } from "react";
import { isEditSelector } from "../../../../../controllers/slices/editSlice";
import { useSelector } from "react-redux";
import { adjustTextAreaHeight } from "../../../../../controllers/general.ts/general";
import EditInput from "../../../../components/editInput/EditInput";
import { Statement } from "delib-npm";
import { updateStatementText } from "../../../../../controllers/db/statements/setStatements";

interface Props {
  bullet: string;
  level: number;
  statement: Statement;
  setIsTitleReady: (isReady: boolean) => void;
  isTitleReady: boolean;
}

const SectionTitle: FC<Props> = ({
  bullet,
  level,
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
            text={statement.statement}
            onChange={handleChange}
            onBlur={handleUpdate}
            onKeyUp={handleUpdate}
          />
        ) : (
          <div
            id={`id-${statement.statementId}`}
            onClick={() => {
              if (isEdit) _setIsEdit(true);
            }}
          >
            {sectionHeader(`${bullet} ) ${statement.statement}`, level)}
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

        updateStatementText({statement, title: value});

        _setIsEdit(false);
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default SectionTitle;

function sectionHeader(title: string, level: number) {
  switch (level) {
    case 1:
      return <h2>{title}</h2>;
    case 2:
      return <h3>{title}</h3>;
    case 3:
      return <h4>{title}</h4>;
    case 4:
      return <h5>{title}</h5>;
    case 5:
      return <h6>{title}</h6>;
    default:
      return <h6>{title}</h6>;
  }
}
