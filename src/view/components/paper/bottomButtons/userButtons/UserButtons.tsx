import { FC } from "react";
import styles from "./UserButtons.module.scss";
import Button from "../../../buttons/button/Button";

interface Props{
    paragraphsLength: number;
    approved: number;
}

const UserButtons: FC<Props> = ({paragraphsLength,approved}) => {
    function handleReset() {
        console.log("Reset");
    }

  return (
    <div className={styles.buttons}>
      <Button text="Reset" onClick={handleReset} backgroundColor="var(--paragraph-light)" />
      <Button text={`Sign (${approved}/${paragraphsLength})`} onClick={handleReset} backgroundColor="var(--icon-blue)" />
    </div>
  );
};

export default UserButtons;
