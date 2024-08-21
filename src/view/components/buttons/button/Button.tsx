import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  backgroundColor?: string;
  color?: string;
  unselectedColor?: string;
  unselectedBackgroundColor?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  borderRadius?: string;
  children?: React.ReactNode;
}

const Button: FC<Props> = ({
  text,
  onClick,
  backgroundColor = "teal",
  color = "white",
  borderRadius = "50px",
  children,
  unselectedBackgroundColor = "var(--inactive-btn)",
  unselectedColor = "darkgray",
  isSelected = false,
  isDisabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${isDisabled ? styles["button--notActive"] : ""}`}
      onClick={onClick}
      style={{
        backgroundColor: isSelected
          ? backgroundColor
          : unselectedBackgroundColor,
        color: isSelected ? color : unselectedColor,
        borderRadius,
      }}
    >
      <span>{text}</span> {children}
    </button>
  );
};

export default Button;
