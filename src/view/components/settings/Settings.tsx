import Switch from '../switch/Switch'
import { useLanguage } from '../../../controllers/hooks/useLanguage'
import styles from './Settings.module.scss';
import { Mode, selectMode, setMode } from '../../../controllers/slices/modesSlice';
import { useDispatch, useSelector } from 'react-redux';



const Settings = () => {
    const { t } = useLanguage();
    const modeState = useSelector(selectMode);
    const dispatch = useDispatch();


    function handleOnChange(isChecked: boolean, mode: Mode) {

        if (isChecked)
            dispatch(setMode(mode))
        else dispatch(setMode(Mode.regularMode))

    }
    return (
        <div className={styles.settings}>
            <h2>{t("Settings")}</h2>
            <div className={styles.modes}>
                <h3>{t("Heat Maps")}</h3>
                <div className={styles.switchBox}>
                    <Switch
                        onChange={(isChecked) => handleOnChange(isChecked, Mode.viewsMode)}
                        checked={modeState === Mode.viewsMode} />
                    <span>{t("Views Map")}</span>
                </div>
                <div className={styles.switchBox}>
                    <Switch
                        onChange={(isChecked) => handleOnChange(isChecked, Mode.resistanceMode)}
                        checked={modeState === Mode.resistanceMode} />
                    <span>{t("Support Map")}</span>
                </div>
            </div>

        </div>
    )
}

export default Settings