import AsideLogo from '../../doc/aside/AsideLogo'
import Explanation from '../explanation/Explanation'
import styles from './LobbyAside.module.scss'

const LobbyAside = () => {
    return (
        <aside className={styles["lobby-aside"]}>
            <div className={styles.logo}>
                <AsideLogo />
                <Explanation />
                
            </div>
        </aside>
    )
}

export default LobbyAside