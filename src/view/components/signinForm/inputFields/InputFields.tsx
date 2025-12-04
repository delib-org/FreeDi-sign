import { Segmentation, SegmentationType } from 'delib-npm';
import { FC, useState } from 'react';
import UserIcon from '../../../../assets/icons/user.svg?react';
import PhoneIcon from '../../../../assets/icons/phone-tel.svg?react';
import './InputFields.scss';

interface Props {
	segmentation: Segmentation;
}

const InputFields: FC<Props> = ({ segmentation }) => {
	const [hasValue, setHasValue] = useState(false);
	const [otherValue, setOtherValue] = useState('אחר');
	const [showOther, setShowOther] = useState(false);

	const fieldMandatoryName = segmentation.fieldMandatoryName
		? segmentation.fieldMandatoryName
		: segmentation.title;
	const label = `${segmentation.title}${segmentation.isRequired === true ? ' *' : ''
		}`;

	const getIcon = (title: string) => {
		if (title.includes('שם')) return <UserIcon className='input-icon' />;
		if (title.includes('טלפון')) return <PhoneIcon className='input-icon' />;
		return null;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		if (e.target.value === 'other' || e.target.value === otherValue) {
			setShowOther(true);
		} else {
			setShowOther(false);
		}
		setHasValue(!!e.target.value);
	};

	if (segmentation.type === SegmentationType.array) {
		return (
			<div className='input-element'>
				<label>{label}</label>
				<div className='input-container'>
					<select
						defaultValue=''
						name={fieldMandatoryName}
						onChange={handleChange}
					>
						<option value='' defaultChecked disabled>
							בחר/י
						</option>
						{segmentation.array?.map((option: string, i: number) => (
							<option key={`option-${i}`} value={option}>
								{option}
							</option>
						))}
						<option value={otherValue}>{otherValue}</option>
					</select>
					{showOther  && (<input type='text' name='other' placeholder='ישוב' onBlur={(e) => setOtherValue(e.target.value)} />)}
				</div>
			</div>
		);
	}

	return (
		<div className='input-element'>
			<label>{label}</label>
			<div className='input-container'>
				<input
					type={segmentation.filedType}
					name={fieldMandatoryName}
					autoFocus={segmentation.order === 0}
					required={segmentation.isRequired}
					onChange={handleChange}
				/>
				{!hasValue && getIcon(segmentation.title)}
			</div>
		</div>
	);
};

export default InputFields;
