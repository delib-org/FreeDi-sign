import { FC, useContext } from "react";
import styles from "./PaperHeader.module.scss";

import { Role, Statement } from "delib-npm";
import { RoleContext } from "../../../pages/doc/Document";
import { useDispatch } from "react-redux";
import { toggleIsEdit } from "../../../../controllers/slices/editSlice";

//icons
// import InfoIcon from "../../../../assets/icons/info.svg?react";
import EditIcon from "../../../../assets/icons/edit.svg?react";
import GlobousIcon from '../../../../assets/icons/globus.svg?react';
// import QuestionIcon from "../../../../assets/icons/question.svg?react";

interface Props {
  statement?: Statement;
  setShowInfo: (showInfo: boolean) => void;
}

const PaperHeader: FC<Props> = ({ statement }) => {
  const dispatch = useDispatch();
  const role = useContext(RoleContext);
  if (!statement) return null;

  const handleToggleEdit = () => {
    dispatch(toggleIsEdit());
  };


  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        {/* <button>
            <QuestionIcon />
          </button> */}
        {role === Role.admin && (
          <button onClick={handleToggleEdit}>
            <EditIcon />
          </button>
        )}
        {/* {role === Role.admin && (
          <button onClick={() => setShowInfo(true)}>
            <InfoIcon />
          </button>
        )} */}
        <a href="https://freedi.co" target="_blank" rel="noreferrer">
          Freedi
          <GlobousIcon />
        </a>
      </div>
    </header>
  );
};

export default PaperHeader;
