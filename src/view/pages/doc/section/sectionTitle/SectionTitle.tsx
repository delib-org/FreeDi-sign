import { FC, useEffect, useState } from "react";
import { isEditSelector } from "../../../../../controllers/slices/editSlice";
import { useSelector } from "react-redux";
import { adjustTextAreaHeight } from "../../../../../controllers/general.ts/general";
import EditInput from "../../../../components/editInput/EditInput";
import { Role, Statement } from "delib-npm";
import { updateStatementText } from "../../../../../controllers/db/statements/setStatements";
import { useRole } from "../../../../../controllers/hooks/useRole";
import styles from './SectionTitle.module.scss';

//icons
import EyeIcon from "../../../../../assets/icons/eye.svg?react";

interface Props {
  bullet: string;
  level: number;
  statement: Statement;
  setIsTitleReady: (isReady: boolean) => void;
  isTitleReady: boolean;
}

const SectionTitle: FC<Props> = ({
  // bullet,
  level,
  statement,
  isTitleReady,
  setIsTitleReady,
}) => {
  // const { statementId } = useParams();
  // const role:Role | undefined = useSelector(selectSubscriptionByDocumentId(statementId))?.role;
  const role = useRole();
  const isAdmin = role === Role.admin;
  const isEdit = useSelector(isEditSelector);
  const [_isEdit, _setIsEdit] = useState(false);

  useEffect(() => {
    if (isTitleReady === false) {
      _setIsEdit(true);
    }
  }, [isTitleReady]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const textarea = e.target as HTMLTextAreaElement;
    adjustTextAreaHeight(textarea);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleUpdate(e: any) {
    if (e.key === "Enter" || e.type === "blur") {
      const textarea = e.target as HTMLTextAreaElement;
      const value = textarea.value;

      if (value === "") {
        setIsTitleReady(false);
        return;
      }

      setIsTitleReady(true);

      updateStatementText({ statement, title: value });

      _setIsEdit(false);
    }
  }

  try {
    const viewed = statement.viewed?.individualViews || 0;
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
          className={styles.title}
            id={`id-${statement.statementId}`}
            onClick={() => {
              if (isEdit) _setIsEdit(true);
            }}
          >
           {isAdmin && <h2 className={styles.adminH2}><span className={styles.viewed}><EyeIcon /></span><span >{viewed}</span></h2>} {sectionHeader(`${statement.statement}`, level)} 
          </div>
        )}
      </>
    );
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
