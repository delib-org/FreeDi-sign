import styles from "./header.module.scss";

//icons
import Logo from "../../../assets/logo/monoLogo.svg?react";
import Home from "../../../assets/icons/home.svg?react";
import Search from "../../../assets/icons/search.svg?react";
import Install from "../../../assets/icons/install.svg?react";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__company}>
        <div className={styles.header__company__logo}>
          <Logo />
          <div className="logo-text">FreeDi</div>
        </div>
        <div className={styles.header__company__testimonials}>
          For Nordia Community
        </div>
      </div>
      <div className={styles.header__right}>
        <div className={styles.header__right__icons}>
          <button className={styles.header__right__icons__icon}>
            <Home />
          </button>
          <button className={styles.header__right__icons__icon}>
           <Search />
          </button>
          <button className={styles.header__right__icons__icon}>
            <Install />
          </button>
        </div>
        <div className={styles.header__right__lastModified}>Last Modified: 09:05 17/6/2024</div>
      </div>
    </header>
  );
};

export default Header;
