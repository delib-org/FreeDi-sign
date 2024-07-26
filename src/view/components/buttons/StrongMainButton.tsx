import { ReactNode } from "react";
import styles from "./buttons.module.scss";

interface Props {
  value: string;
  backgroundColor?: string;
  padding?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  icon?: ReactNode;
  color?: string;
  gap?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}


const StrongMainButton = ({
  value,
  backgroundColor = "var(--active-btn)",
  icon,
  padding = "8px 52px",
  color = "white",
  gap,
  width = "13.17rem",
  height = "2.41rem",
  fontSize = "0.9rem",
  onClick,
  type = "button",
}: Props) => {
  return (
    <>
      {icon ? (
        <button
          type={type}
          onClick={onClick}
          style={{
            backgroundColor: `${backgroundColor}`,
            padding: `${padding}`,
            color: `${color}`,
            gap: `${gap}`,
            width: `${width}`,
            height: `${height}`,
            fontSize: `${fontSize}`,
          }}
          className={`${styles.strongButton} ${styles.buttonWithIcon}`}
        >
          {value}
          <span>{icon}</span>
        </button>
      ) : (
        <button
          type={type}
          onClick={onClick}
          style={{
            backgroundColor: `${backgroundColor}`,
            padding: `${padding}`,
            color: `${color}`,
            gap: `${gap}`,
            width: `${width}`,
            height: `${height}`,
            fontSize: `${fontSize}`,
          }}
          className={styles.strongButton}
        >
          {value}
        </button>
      )}
    </>
  );
};

export default StrongMainButton;
