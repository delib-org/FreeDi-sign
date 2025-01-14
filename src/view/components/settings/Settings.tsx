import Switch from '../switch/Switch'
import { useLanguage } from '../../../controllers/hooks/useLanguage'
import styles from './Settings.module.scss';
import { Mode, selectMode, setMode } from '../../../controllers/slices/modesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


const Settings = () => {
    const { t } = useLanguage();
    const modeState = useSelector(selectMode);
    const dispatch = useDispatch();
    console.log("..............", modeState)

   
    
    function handleOnChange(isChecked: boolean, mode: Mode) {
        console.log(isChecked, mode)
        if (isChecked)
            dispatch(setMode(mode))
        else dispatch(setMode(Mode.regularMode))

    }
    return (
        <div className={styles.settings}>
            <div className={styles.modes}>
                <h3>{t("Modes")}</h3>
                <div className={styles.switchBox}>
                    <Switch onChange={(isChecked) => handleOnChange(isChecked, Mode.viewsMode)} checked={modeState === Mode.viewsMode} /> <span>{t("View Mode")}</span>
                </div>
                <div className={styles.switchBox}>
                    <Switch onChange={(isChecked) => handleOnChange(isChecked, Mode.resistanceMode)} checked={modeState === Mode.resistanceMode} /> {t("Resistance Mode")}
                </div>
            </div>

        </div>
    )
}

export default Settings