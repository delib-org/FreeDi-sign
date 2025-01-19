interface Props {}

function InfoIcon({}: Props) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ cursor: 'pointer' }}
		>
			<rect x='0.5' y='0.5' width='23' height='23' rx='11.5' stroke='#4789D1' />
			<path d='M14 9H11V20H14V9Z' fill='#4789D1' />
			<path d='M11.5 6.5V4.5H13.5V6.5H11.5Z' fill='#4789D1' stroke='#5899E0' />
		</svg>
	);
}

export default InfoIcon;
