import styles from "./header.module.scss";
import Logo from "../../../assets/logo/monoLogo.svg?react";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__company}>
        <Logo />
        <div className="logo-font">FreeDi</div>
      </div>
    </header>
  );
};

export default Header;
