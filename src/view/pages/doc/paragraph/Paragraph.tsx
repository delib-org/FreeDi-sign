import { Approval, Role, Statement } from 'delib-npm';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStatement, evaluationMaxMinSelector } from '../../../../controllers/slices/statementsSlice';
import styles from './Paragraph.module.scss';
import { isEditSelector } from '../../../../controllers/slices/editSlice';
import {
	updateParagraphTextToDB,
	deleteParagraphFromDB,
} from '../../../../controllers/db/paragraphs/setParagraphs';
import Evaluation from './evaluation/Evaluation';
import { adjustTextAreaHeight } from '../../../../controllers/general.ts/general';
import DeleteIcon from '../../../../assets/icons/trash.svg?react';
import { selectApprovalById } from '../../../../controllers/slices/approvalSlice';
import { setViewToDB } from '../../../../controllers/db/views/setViews';
import { getViewsFromDB } from '../../../../controllers/db/views/getViews';
import { DocumentContext } from '../documentCont';

//icons
import EyeIcon from '../../../../assets/icons/eye.svg?react';
import { getHeatMapColor, getSupportResistanceColor } from '../../../../controllers/general.ts/helpers';
import { Mode, selectMode } from '../../../../controllers/slices/modesSlice';

interface Props {
	statement: Statement;
}

const Paragraph: FC<Props> = ({ statement }) => {
	const dispatch = useDispatch();
	const { maxViewed, role } = useContext(DocumentContext);
	const mode = useSelector(selectMode);
	const minMax = useSelector(evaluationMaxMinSelector(statement.documentSettings?.parentDocumentId ));
	
	const isAdmin = role === Role.admin;

	const paragraphRef = useRef<HTMLDivElement>(null);
	const textarea = useRef<HTMLTextAreaElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const approval: Approval | undefined = useSelector(
		selectApprovalById(statement.statementId)
	);

	const isEdit = useSelector(isEditSelector);
	const [_isEdit, _setIsEdit] = useState(false);
	const [hasBeenViewed, setHasBeenViewed] = useState(true);

	useEffect(() => {
		const fetchView = async () => {
			const view = await getViewsFromDB(statement.statementId);
			if (view && view?.viewed > 0) setHasBeenViewed(true);
			else setHasBeenViewed(false);
		};
		fetchView();
	}, [statement.statementId]);

	useEffect(() => {
		// Create Intersection Observer
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// Clear any existing timeout when visibility changes
					if (timeoutRef.current) {
						clearTimeout(timeoutRef.current);
					}

					if (entry.isIntersecting && !hasBeenViewed) {
						// Set a 4-second delay before triggering the view count
						timeoutRef.current = setTimeout(() => {
							setHasBeenViewed(true);
							setViewToDB(statement);
						}, 4000);
					}
				});
			},
			{
				threshold: 0.7,
				rootMargin: '0px',
			}
		);

		// Start observing the paragraph
		if (paragraphRef.current) {
			observer.observe(paragraphRef.current);
		}

		// Cleanup observer and timeout on component unmount
		return () => {
			if (paragraphRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(paragraphRef.current);
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [hasBeenViewed, statement]);

	useEffect(() => {
		if (isEdit && textarea.current) {
			adjustTextAreaHeight(textarea.current);
		}
	}, [isEdit, textarea, _isEdit]);

	function handleDelete() {
		const shouldDelete = confirm(
			'Are you sure you want to delete this paragraph?'
		);
		if (!shouldDelete) return;
		deleteParagraphFromDB(statement);
		dispatch(deleteStatement(statement.statementId));
	}

	function handleUpdate(
		e:
			| React.KeyboardEvent<HTMLTextAreaElement>
			| React.FocusEvent<HTMLTextAreaElement>
	) {
		if (e.type === 'keyup' && (e as React.KeyboardEvent).key !== 'Enter')
			return;
		_setIsEdit(false);
		const textarea = e.target as HTMLTextAreaElement;
		if (textarea.value === '') {
			textarea.value = statement.statement;
		}
		textarea.value = textarea.value.replace(/\n/g, ' ');
		updateParagraphTextToDB({ statement, newText: textarea.value });
	}

	function renderText(text: string) {
		if (text.includes('*')) {
			const parts = text.split('*');
			return parts.map((part, index) => {
				if (index % 2 === 0) {
					return <span key={index}>{part}</span>;
				} else {
					return <b key={index}>{part}</b>;
				}
			});
		} else {
			return text;
		}
	}

	function getBackgroundColor() {
		const totalSupport = (statement.evaluation?.sumPro || 0) - (statement.evaluation?.sumCon || 0);
		const viewed = statement.viewed?.individualViews || 0;
		const relativeViewed = viewed / maxViewed;
		if (isAdmin) {
			if (mode === Mode.viewsMode) {
				return getHeatMapColor(relativeViewed);
			}
			if (mode === Mode.resistanceMode) {
				return getSupportResistanceColor(totalSupport, minMax.max, minMax.min);;
			}

			return 'white';
		}
		return 'transparent';
	}

	try {
		const viewed = statement.viewed?.individualViews || 0;
		const showHeatMap = mode === Mode.viewsMode;
	
		return (
			<div
				className={styles.paragraph}
				ref={paragraphRef}
				style={{
					backgroundColor:getBackgroundColor(),
					boxShadow: showHeatMap || isAdmin ? `0 0 10px #ceced3` : 'none',
				}}
			>
				{isEdit && _isEdit ? (
					<textarea
						ref={textarea}
						placeholder='Enter Text ... '
						autoFocus={true}
						defaultValue={statement.statement}
						className={`${styles.textArea} ${styles.textAreaEdit}`}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
							adjustTextAreaHeight(e.target);
							updateParagraphTextToDB({ statement, newText: e.target.value });
						}}
						onBlur={handleUpdate}
						onKeyUp={handleUpdate}
					/>
				) : (
					<div className={styles.paragraphLine}>
						<div className={styles.paragraphText}>
							<p
								className={`${styles.textArea} ${styles.textAreaP} ${approval?.approval === false && styles.rejected
									}`}
								onClick={() => {
									_setIsEdit(true);
								}}
							>
								{isAdmin && (
									<>
										<span>
											<EyeIcon />
										</span>
										<span className={styles.viewed}>{viewed}</span>
									</>
								)}
								<span>{renderText(statement.statement)} </span>
							</p>
							{isEdit && (
								<button onClick={handleDelete}>
									<DeleteIcon />
								</button>
							)}
						</div>
					</div>
				)}
				{!isEdit && <Evaluation statement={statement} />}
			</div>
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};

export default Paragraph;
