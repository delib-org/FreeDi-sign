import { FormEvent, useEffect, useState } from 'react';
import Button from '../buttons/button/Button';
import { ButtonType } from '../../../model/enumsModel';
import styles from './SignupForm.module.scss';
import { useDispatch } from 'react-redux';
import { setUserDataToDB } from '../../../controllers/db/user/setUserData';
import { setUserData } from '../../../controllers/slices/userSlice';
import { Segmentation, UserData } from 'delib-npm';
import { useParams } from 'react-router-dom';
import { getSegments } from '../../../controllers/db/segmentation/getSegmentation';
import InputFields from './inputFields/InputFields';
import { useLanguage } from '../../../controllers/hooks/useLanguage';
import { validateIsraeliPhoneNumber } from '../../../controllers/general.ts/validations';

const SigninForm = () => {
	const { t } = useLanguage();
	const { statementId } = useParams<{ statementId: string }>();
	const dispatch = useDispatch();
	const allowAnonymous = false;

	const [segments, setSegments] = useState<Segmentation[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (statementId) {
			getSegments(statementId)
				.then((segments) => setSegments(segments))
				.catch((e) => console.error(e));
		}
	}, [statementId]);

	async function handleSetUserData(
		ev: FormEvent<HTMLFormElement>
	): Promise<void> {
		try {
			ev.preventDefault();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const values: any = {};

			for (const segment of segments) {
				const fieldMandatoryName = segment.fieldMandatoryName
					? segment.fieldMandatoryName
					: segment.title;

				const form = ev.target as HTMLFormElement;
				const value = form[fieldMandatoryName].value;

				if (segment.filedType === 'tel' && !validateIsraeliPhoneNumber(value)) {
					throw new Error('אנא הכנס/י מספר טלפון תקין');
				}

				if (!value && segment.isRequired) {
					throw new Error('אנא מלא/י את כל השדות');
				}
				values[fieldMandatoryName] = value;

				if (
					fieldMandatoryName === 'displayName' &&
					values[fieldMandatoryName] === ''
				) {
					values[fieldMandatoryName] = t('Anonymous');
				}
			}

			const _userData: UserData | undefined = await setUserDataToDB(
				values,
				statementId
			);
			dispatch(setUserData(_userData));
		} catch (error: any) {
			console.error(error);
			setErrorMessage(error.message);
		}
	}

	async function handleSetUserDataAnonymous(): Promise<void> {
		try {
			const _userData: UserData | undefined = await setUserDataToDB(
				{ displayName: t('Anonymous') },
				statementId
			);
			dispatch(setUserData(_userData));
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div className={styles.sign}>
			<h1 className={styles.h1}>טופס הרשמה</h1>
			<form onSubmit={handleSetUserData}>
				{segments.map((segmentation, i: number) => (
					<InputFields segmentation={segmentation} key={`field-${i}`} />
				))}
				{errorMessage && <div className={styles.error}>{errorMessage}</div>}
				<div className='btns'>
					<Button
						text='הרשמה'
						type='submit'
						buttonType={ButtonType.primary}
						isSelected={true}
					/>
				</div>

				{allowAnonymous && (
					<>
						<div className='btns'>--- {t('Or')} ---</div>
						<div className='btns'>
							<Button
								onClick={handleSetUserDataAnonymous}
								text={t('Login as anonymous')}
								type='button'
								buttonType={ButtonType.secondary}
								isSelected={true}
							/>
						</div>
					</>
				)}
			</form>
		</div>
	);
};

export default SigninForm;
