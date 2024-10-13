import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonType?: ButtonType;
  type: "button" | "submit" | "reset" | undefined;
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
  buttonType = ButtonType.primary,
  type,
  backgroundColor = "teal",
  color = "white",
  borderRadius = "50px",
  children,
  unselectedBackgroundColor = "var(--inactive-btn)",
  unselectedColor = "darkgray",
  isSelected = false,
  isDisabled = false,
}) => {
  const types = {
    primary: {
      backgroundColor: "var(--primary)",
      color: "white",
      border:" 1px solid var(--primary)"
    },
    secondary: {
      backgroundColor: "white",
      color: "black",
      border:"1px solid black"
    },
    other:{
      backgroundColor,
      color,
      border:backgroundColor
    }
  };

  return (
    <button
      className={`${styles.button} ${
        isDisabled ? styles["button--notActive"] : ""
      }`}
      onClick={onClick}
      style={{
        backgroundColor: isSelected
          ? types[buttonType].backgroundColor
          : unselectedBackgroundColor,
        color: isSelected ? types[buttonType].color : unselectedColor,
        borderRadius,
      }}
      type={type}
    >
      <span>{text}</span> {children}
    </button>
  );
};

export default Button;

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  other = "other",
}
