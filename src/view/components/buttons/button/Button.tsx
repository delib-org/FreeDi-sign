import { FC, MouseEventHandler } from "react";
import styles from "./Button.module.scss";
import { ButtonType } from "../../../../model/enumsModel";

interface Props {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonType?: ButtonType;
  type?: "button" | "submit" | "reset" | undefined;
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
  type = "button",
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
      color: "var(--primary)",
      border:"1px solid var(--primary)"
    },
    other:{
      backgroundColor,
      color,
      border:`1px solid ${backgroundColor}`
    },
    approve:{
      backgroundColor:"var(--approve)",
      color:"white",
      border:"1px solid var(--approve)"
    },
    reject:{
      backgroundColor:"var(--reject)",
      color:"white",
      border:"1px solid var(--reject)"
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
        border:isSelected?types[buttonType].border: unselectedBackgroundColor,
        borderRadius,
      }}
      type={type}
    >
      <span>{text}</span> {children}
    </button>
  );
};

export default Button;


