import { FC } from 'react'
import { useDocumentCard } from './DocumentCardVM'
import { Link, NavLink } from 'react-router-dom'

interface Props {
    documentId: string
}
const DocumentCard: FC<Props> = ({ documentId }) => {
    const { loading, docTOC } = useDocumentCard(documentId)
    return (
        <div>
            {loading && <div>Loading...</div>}
            <h2>
                <NavLink to={`/doc/${documentId}`}>{docTOC?.title}</NavLink>
            </h2>
            <ul>
                {docTOC?.children.map((child) => (
                    <li key={child.statementId}>
                        <Link to={`/doc/${documentId}#id-${child.statementId}`}>{child.title}</Link>
                        <ul>
                            {child.children.map((child) => (
                                <li key={child.statementId}>
                                    <Link to={`/doc/${documentId}#id-${child.statementId}`}>{child.title} </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DocumentCard