import { FC } from 'react'
import styles from './Image.module.scss'

interface Props {
    imageUrl: string;
    alt: string;         // Adding alt text property
    className?: string;  // Optional className for additional styling
    height?: string;     // Optional height for the image
}

const Image: FC<Props> = ({ imageUrl, alt, className, height }) => {
    return (
        <div
            className={`${styles.img} ${className || ''}`}
            role="img"              // Semantic role for accessibility
            aria-label={alt}        // Alt text for screen readers
            style={{ backgroundImage: `url(${imageUrl})`, height:height?height:'100%' }} // Inline style for background image
        >
            {/* Hidden element for screen readers */}
            <span className={styles.srOnly}>{alt}</span>

            {/* Loading state */}
            <span className={styles.loading} aria-hidden="true">
                loading...
            </span>
        </div>
    )
}

export default Image