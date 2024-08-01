import { ReactNode } from "react";
import styles from "./buttons.module.scss";

interface Props {
  value: string;
  backgroundColor?: string;
  padding?: string;
  height?: string;
  fontSize?: string;
  icon?: ReactNode;
  color?: string;
  gap?: string;
  onClick?: () => void;
}

const MainButton = ({
  value,
  backgroundColor = "var(--active-btn)",
  icon,
  padding = "8px 24px 8px 24px",
  color,
  gap,
  height = "2.41rem",
  fontSize = "1rem",
  onClick,
}: Props) => {
  return (
    <>
      {icon ? (
        <button
          onClick={onClick}
          style={{
            backgroundColor: `${backgroundColor}`,
            padding: `${padding}`,
            color: `${color}`,
            gap: `${gap}`,
            height: `${height}`,
            fontSize: `${fontSize}`,
          }}
          className={`${styles.button} ${styles.buttonWithIcon}`}
        >
          {value}
          <span>{icon}</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          style={{
            backgroundColor: `${backgroundColor}`,
            padding: `${padding}`,
            color: `${color}`,
            gap: `${gap}`,
            height: `${height}`,
            fontSize: `${fontSize}`,
          }}
          className={styles.button}
        >
          {value}
        </button>
      )}
    </>
  );
};

export default MainButton;
