import styles from "./AsideItem.module.scss";
import { Statement } from "delib-npm";
import { useSelector } from "react-redux";
import { sectionsSelector } from "../../../../../controllers/slices/statementsSlice";
import { useLanguage } from "../../../../../controllers/hooks/useLanguage";
import { setViewToDB } from "../../../../../controllers/db/views/setViews";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useDocument } from "../../../../../controllers/hooks/documentHooks";

interface Props {
  isActiveSection: boolean;
  setActiveIndex: (index: number | null) => void;
  isAside?: boolean;
  sectionIndex: number;
  statement: Statement;
  level: number;
  isTOC?: boolean;
}

function AsideItem({
  isActiveSection,
  setActiveIndex,
  sectionIndex,
  isAside = true,
  statement,
  level,
  isTOC,
}: Props) {
  const [searchParams] = useSearchParams();
  const lobby = searchParams.get("lobby"); 
  const press = Number(searchParams.get("press")) || 1;
  const { pathname} = useLocation();
  const { hostname  } = new URL(window.location.href);

  const { dir } = useLanguage();
  
  const sections = useSelector(sectionsSelector(statement.statementId));
  const title = statement.statement.split("\n")[0];

  function handleView() {
    setViewToDB(statement);
  }
  const minLevel = Math.min(level, 5);
  const levelCss = isAside?`aside-h${minLevel}`: `toc-h${minLevel}`;

  const lobbyParam = lobby ? `lobby=${lobby}` : "";
  const pressParam = press ? `press=${press+1}` : "";
  const newUrl = `?${pressParam}&${lobbyParam}#id-${statement.statementId}`;

  return (
    <>
      <div
        onClick={handleView}
        className={`${styles["asideItem"]} ${
          styles[isTOC ? "asideItem--toc" : ""]
        } ${dir === "rtl" && styles["asideItem--rtl"]}`}
      >
        <div className={styles.titleWrapper}>
          {isActiveSection ? (
            <NavLink
              to={newUrl}
              className={`${styles.active} ${styles.title} ${levelCss}`}
            >
              {title}
            </NavLink>
          ) : (
            <NavLink
                to={newUrl}
              className={`${styles.title} ${levelCss}`} >
              {title}
            </NavLink>
          )}
        </div>
        <div className={styles.descriptionWrapper}>
          {sections.map((section, index) => (
            <AsideItem
              isTOC={isTOC}
              key={`as-${section.statementId}`}
              isAside={isAside}
              statement={section}
              isActiveSection={index === sectionIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={index}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AsideItem;
