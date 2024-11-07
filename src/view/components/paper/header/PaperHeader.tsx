import { FC, useContext } from "react";
import styles from "./PaperHeader.module.scss";

import { Role, Statement } from "delib-npm";
import { RoleContext } from "../../../pages/doc/Document";
import { useDispatch } from "react-redux";
import { toggleIsEdit } from "../../../../controllers/slices/editSlice";

//icons
import InfoIcon from "../../../../assets/icons/info.svg?react";
import EditIcon from "../../../../assets/icons/edit.svg?react";
import QuestionIcon from "../../../../assets/icons/question.svg?react";

interface Props {
  statement?: Statement;
  setShowInfo: (showInfo: boolean) => void;
}

const PaperHeader: FC<Props> = ({ statement, setShowInfo }) => {
  const dispatch = useDispatch();
  const role = useContext(RoleContext);
  if (!statement) return null;

  const handleToggleEdit = () => {
    dispatch(toggleIsEdit());
  };

  return (
    <header className={styles.header}>
    
        <div className={styles.buttons}>
          <button>
            <QuestionIcon />
          </button>
          {role === Role.admin && (
            <button onClick={handleToggleEdit}>
              <EditIcon />
            </button>
          )}
          {role === Role.admin && (
            <button onClick={() => setShowInfo(true)}>
              <InfoIcon />
            </button>
          )}
        </div>
    
    </header>
  );
};

export default PaperHeader;
