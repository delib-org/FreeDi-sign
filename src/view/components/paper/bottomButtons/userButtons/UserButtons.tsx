import { FC } from "react";
import styles from "./UserButtons.module.scss";
import Button from "../../../buttons/button/Button";

const UserButtons: FC = () => {
    function handleReset() {
        console.log("Reset");
    }
  return (
    <div className={styles.buttons}>
      <Button text="Reset" onClick={handleReset} backgroundColor="var(--paragraph-light)" />
      <Button text="Sign (12/17)" onClick={handleReset} backgroundColor="var(--icon-blue)" />
    </div>
  );
};

export default UserButtons;
