import { FC } from 'react'
import { useDocumentCard } from './DocumentCardVM'
import { Link, NavLink, useParams } from 'react-router-dom';
import styles from './DocumentCard.module.scss';
interface Props {
    documentId: string
}

const DocumentCard: FC<Props> = ({ documentId }) => {
    const {lobbyId} = useParams();
    const { loading, docTOC } = useDocumentCard(documentId)
    return (
        <div className={styles["lobby-card"]}>
            {loading && <div>Loading...</div>}
            <NavLink to={`/doc-anonymous/${documentId}`}>
                <img src={docTOC?.image} alt={`Image depicting ${docTOC?.title}`} />
                <h2>
                    {docTOC?.title}
                </h2>
            </NavLink>
            <div className={styles["lobby-card__u1"]}>
                {docTOC?.children.map((child) => (
                    <div className={styles.li} key={child.statementId}>
                        <Link to={`/doc-anonymous/${documentId}?lobby=${lobbyId}#id-${child.statementId}`}>{child.title}</Link>
                        {child.children.length > 0 &&<div className={styles["lobby-card__u2"]}>
                            {child.children.map((child) => (
                                <div className = {styles.li} key={child.statementId}>
                                    <Link to={`/doc-anonymous/${documentId}?lobby=${lobbyId}#id-${child.statementId}`}>{child.title} </Link>
                                </div>
                            ))}
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DocumentCard