import { FC } from 'react'
import { useDocumentCard } from './DocumentCardVM'
import { Link, NavLink, useParams } from 'react-router-dom';
import styles from './DocumentCard.module.scss';
import HourGlassLoader from '../../../components/loaders/HourGlassLoader';
interface Props {
    documentId: string;
    hasTOC?: boolean;
}

const DocumentCard: FC<Props> = ({ documentId, hasTOC}) => {
    const { lobbyId } = useParams();
    const { loading, docTOC } = useDocumentCard(documentId, hasTOC)
    return (
        <div className={styles["lobby-card"]}>
            {loading ? <div className={styles.loader}>
                <HourGlassLoader />
            </div> :
                <>
                    <NavLink to={`/doc-anonymous/${documentId}`} className={styles["lobby-card__header"]}>
                        {docTOC?.image && <img src={docTOC?.image} alt={`Image depicting ${docTOC?.title}`} />}
                        <div>
                            {docTOC?.title}
                        </div>
                    </NavLink>
                    {hasTOC && <div className={styles["lobby-card__u1"]}>
                        {docTOC?.children.map((child) => (
                            <div className={`${styles.li}`} key={child.statementId}>
                                <Link className={styles.p1} to={`/doc-anonymous/${documentId}?lobby=${lobbyId}#id-${child.statementId}`}>{child.title}</Link>
                                {child.children.length > 0 && <div className={styles["lobby-card__u2"]}>
                                    {child.children.map((child) => (
                                        <div className={styles.li} key={child.statementId}>
                                            <Link to={`/doc-anonymous/${documentId}?lobby=${lobbyId}#id-${child.statementId}`}>{child.title} </Link>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        ))}
                    </div>}
                </>
            }

        </div>
    )
}

export default DocumentCard