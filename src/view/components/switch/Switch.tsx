import  { useState, FC } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
    onChange?: (value: boolean) => void;
    checked?: boolean;
    tabIndex?: number;
}

const Switch: FC<SwitchProps> = ({ onChange, checked = false, tabIndex=0 }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div
            className={`${styles.switch} ${isChecked ? styles['switch--checked'] : ''}`}
            onClick={handleToggle}
            role="switch"
            aria-checked={isChecked}
            tabIndex={tabIndex}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleToggle();
                }
            }}
        >
            <div
                className={`${styles.switch__background} ${isChecked ? styles['switch__background--active'] : ''
                    }`}
            />
            <div
                className={`${styles.switch__toggle} ${isChecked ? styles['switch__toggle--active'] : ''
                    }`}
            />
        </div>
    );
};

export default Switch;