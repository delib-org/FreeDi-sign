import { FC, useContext, useEffect, useState } from "react";
import { isEditSelector } from "../../../../../controllers/slices/editSlice";
import { useSelector } from "react-redux";
import { adjustTextAreaHeight } from "../../../../../controllers/general.ts/general";
import EditInput from "../../../../components/editInput/EditInput";
import { Statement } from "delib-npm";
import { updateStatementText } from "../../../../../controllers/db/statements/setStatements";
import { useRole } from "../../../../../controllers/hooks/useRole";
import styles from './SectionTitle.module.scss';

//icons
import TouchIcon from "../../../../../assets/icons/touch.svg?react";
import { DocumentContext } from "../../documentCont";

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
  const {isAdmin} = useRole();
  const isEdit = useSelector(isEditSelector);
  const [_isEdit, _setIsEdit] = useState(false);
  const {document} = useContext(DocumentContext);

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
    if (e.key === "Enter" ) {
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
        <div id={`id-${statement.statementId}`} className={styles.anchor}></div>
        {isEdit && _isEdit ? (
          <div>
            <EditInput
              statement={statement}
              placeholder="Add title"
              text={statement.statement}
              onChange={handleChange}
              onBlur={handleUpdate}
              onKeyUp={handleUpdate}
            />
          </div>
        ) : (
          <div
            className={styles.title}
           
            onClick={() => {
              if (isEdit) _setIsEdit(true);
            }}
          >
            {isAdmin && <h2 className={styles.adminH2}><span className={styles.viewed}><TouchIcon /></span><span >{viewed}</span></h2>} {sectionHeader(statement, level, document)}
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

function sectionHeader(statement: Statement, level: number, document?: Statement) {
const title = statement.statement;
const {color}  = document || {color:"var(--color-text)"};
 
  switch (level) {
    case 1:
      return <h2 style={{ color, opacity: 1 }}>{title}</h2>;
    case 2:
      return <h3 style={{ color, opacity: .95 }}>{title}</h3>;
    case 3:
      return <h4 style={{ color, opacity: .9 }}>{title}</h4>;
    case 4:
      return <h5 style={{ color, opacity: .85 }}>{title}</h5>;
    case 5:
      return <h6 style={{ color, opacity: .8 }}>{title}</h6>;
    default:
      return <h6 style={{ color, opacity: .8 }}>{title}</h6>;
  }
}
