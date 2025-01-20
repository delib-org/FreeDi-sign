import { FC, MouseEventHandler } from 'react';
import styles from './Button.module.scss';
import { ButtonType } from '../../../../model/enumsModel';

interface Props {
	text: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	buttonType?: ButtonType;
	type?: 'button' | 'submit' | 'reset' | undefined;
	backgroundColor?: string;
	color?: string;
	fontWight?: 'normal' | 'bold';
	unselectedColor?: string;
	unselectedBackgroundColor?: string;
	unselectedBorderColor?: string;
	isSelected?: boolean;
	isDisabled?: boolean;
	borderRadius?: string;
	children?: React.ReactNode;
}

const Button: FC<Props> = ({
	text,
	onClick,
	buttonType = ButtonType.primary,
	type = 'button',
	backgroundColor = 'teal',
	color = 'white',
	borderRadius = '50px',
	children,
	unselectedBackgroundColor = 'var(--inactive-btn)',
	unselectedBorderColor = 'var(--inactive-btn)',
	unselectedColor = 'darkgray',
	isSelected = false,
	isDisabled = false,
	fontWight = 'normal',
}) => {
	console.log(buttonType);
	const types = {
		primary: {
			backgroundColor: 'var(--primary)',
			color: 'white',
			border: ' 1px solid var(--primary)',
		},
		secondary: {
			backgroundColor: 'white',
			color: 'var(--primary)',
			border: '1px solid var(--primary)',
		},
		other: {
			backgroundColor,
			color,
			border: `2px solid ${backgroundColor}`,
		},
		approve: {
			backgroundColor: 'var(--approve)',
			color: 'white',
			border: '2px solid var(--approve)',
		},
		reject: {
			backgroundColor: 'var(--reject)',
			color: 'white',
			border: '2px solid var(--reject)',
		},
	};

	console.log(types[buttonType])

	return (
		<button
			className={`${styles.button} ${
				isDisabled ? styles['button--notActive'] : ''
			}`}
			onClick={onClick}
			style={{
				fontWeight: fontWight,
				backgroundColor: isSelected
					? types[buttonType].backgroundColor
					: unselectedBackgroundColor,
				color: isSelected ? types[buttonType].color : unselectedColor,
				border: isSelected
					? `${types[buttonType].border}`
					: `${unselectedBorderColor}`,
				borderRadius,
			}}
			type={type}
		>
			<span>{text}</span> {children}
		</button>
	);
};

export default Button;
