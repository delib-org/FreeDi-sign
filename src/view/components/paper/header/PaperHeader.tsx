import { FC, useContext } from "react";
import MainEditButton from "../../buttons/edit/MainEditButton";
import styles from "./PaperHeader.module.scss";
import InfoButton from "../../buttons/InfoButton";
import { Role, Statement } from "delib-npm";
import { RoleContext } from "../../../pages/doc/Document";
import {
  LanguagesEnum,
  useLanguage,
} from "../../../../controllers/hooks/useLanguage";

//icons
import USAFlag from "../../../../assets/icons/usaFlag.svg?react";
import IsraelFlag from "../../../../assets/icons/israelFlag.svg?react";

interface Props {
  statement?: Statement;
  setShowInfo: (showInfo: boolean) => void;
}

const PaperHeader: FC<Props> = ({ statement,setShowInfo }) => {
  const role = useContext(RoleContext);
  const { currentLanguage, changeLanguage } = useLanguage();
  if (!statement) return null;
  const title = statement.statement.split("\n")[0].replace("*", "").trim();

  //TODO: remove
  function handleToggleLanguage() {
    if (currentLanguage === LanguagesEnum.he) changeLanguage(LanguagesEnum.en);
    else changeLanguage(LanguagesEnum.he);
  }



  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          <a
            href={`https://freedi.tech/statement/${statement.statementId}/info`}
            target="_blank"
          >
            {title}
          </a>
        </h1>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleToggleLanguage}>
            {currentLanguage === LanguagesEnum.en ? (
              <IsraelFlag />
            ) : (
              <USAFlag />
            )}
          </button>
          {role === Role.admin && <MainEditButton title="Edit" />}
          {role === Role.admin && <InfoButton onClick={()=>setShowInfo(true)}/>}
          {/* <Checkbox /> */}
        </div>
      </div>
      {/* <div className={styles.bottom}>
        <div className={styles.lastModified}>
          Last Modified:
          <span>09:05 17/6/2024</span>
        </div>
      </div> */}
    </header>
  );
};

export default PaperHeader;
