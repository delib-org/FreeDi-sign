import { FC, useContext } from "react";
import MainEditButton from "../../buttons/edit/MainEditButton";
import styles from "./PaperHeader.module.scss";
import InfoButton from "../../buttons/InfoButton";
import Checkbox from "../../checkbox/Checkbox";
import { Role, Statement } from "delib-npm";
import { RoleContext } from "../../../pages/doc/Document";

interface Props {
  statement?: Statement;
}

const PaperHeader: FC<Props> = ({ statement }) => {
  const role = useContext(RoleContext);
  if (!statement) return null;
  const title = statement.statement.split("\n")[0].replace("*", "").trim();
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          <a href={`https://freedi.tech/statement/${statement.statementId}/info`} target="_blank">{title}</a>
        </h1>
        <div className={styles.buttons}>
          {role === Role.admin && <MainEditButton title="Edit" />}
          <InfoButton />
          <Checkbox />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.lastModified}>
          Last Modified:
          <span>09:05 17/6/2024</span>
        </div>
      </div>
    </header>
  );
};

export default PaperHeader;
