import { useParams } from "react-router-dom";
import NewSection from "../../pages/doc/newSection/NewSection";
import Section from "../../pages/doc/section/Section";
import MainButton from "../buttons/MainButton";
import StrongMainButton from "../buttons/StrongMainButton";
import styles from "./creatingPolicy.module.scss";
import { useDocument } from "../../../controllers/hooks/documentHooks";
import {
  DocumentObject,
  statementsToDocument,
} from "../../../controllers/general.ts/statement_helpers";
import EditButton from "../buttons/EditButton";
import InfoButton from "../buttons/InfoButton";
import Checkbox from "../checkbox/Checkbox";

type Props = {};

const CreatingPolicy = (props: Props) => {
  const { statementId } = useParams<{ statementId: string }>();
  const { statements, isLoading, isError, docStatement, isAuthorized } =
    useDocument(statementId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: An error occurred.</div>;

  const document: DocumentObject | undefined = statementsToDocument({
    section: docStatement,
    statements,
  });

  if (!isAuthorized) return <div>Not authorized</div>;

  const title = docStatement?.statement.split("\n")[0].split("*")[1];

  return (
    <div className={styles.wrapper} style={docStatement && document?.sections.length != 0 ? {justifyContent: "flex-start"} : {justifyContent: "space-between", marginTop:"5.3rem"}}>
      <div className={styles.wrapper__headerWrapper}>
        <h1 className={styles.wrapper__headerWrapper__header}>{title}</h1>
        <div className={styles.wrapper__headerWrapper__buttonWrapper}>
          <EditButton title="Edit"/>
          <InfoButton/>
          <Checkbox />
        </div>
      </div>
      {docStatement && document?.sections.length != 0 ? (
        <div className={styles.wrapper__mainContainer}>
          {document &&
            document.sections.map((d) => (
              <Section
                key={d.statementId}
                document={d}
                docStatement={docStatement}
                statement={docStatement}
              />
            ))}
        </div>
      ) : null}
      <div className={styles.wrapper__bottomWrapper}>
        {docStatement && (
          <>
            {document && (
              <NewSection
                docStatement={docStatement}
                isTop={true}
                parentId={docStatement.statementId}
                order={document.sections.length}
                buttonValue="Add New Section"
              />
            )}
          </>
        )}
        <div className={styles.wrapper__bottomWrapper__buttonWrapper}>
          <MainButton
            width="6.11rem"
            height="2.41rem"
            value="Cancel"
            backgroundcolor="var(--inactive-btn)"
            padding="8px 24px 8px 24px"
            fontSize="1rem"
            color="var(--icon-blue)"
          />
          <StrongMainButton
            width="9.47rem"
            height="2.41rem"
            value="Save Changes"
            backgroundcolor="var(--active-btn)"
            padding="8px 24px 8px 24px"
            fontSize="1rem"
            color="#fff"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatingPolicy;
