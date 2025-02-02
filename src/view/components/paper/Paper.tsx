import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Role } from 'delib-npm';

import Section from '../../pages/doc/section/Section';
import { useDocument } from '../../../controllers/hooks/documentHooks';
import AdminBottomButtons from './bottomButtons/AdminBottomButtons';
import NewSection from '../../pages/doc/newSection/NewSection';
import {
	documentParagraphsSelector,
	sectionsSelector,
} from '../../../controllers/slices/statementsSlice';
import { useLanguage } from '../../../controllers/hooks/useLanguage';
import UserButtons from './bottomButtons/userButtons/UserButtons';
import { selectApprovalsByDocId } from '../../../controllers/slices/approvalSlice';
import Text from '../text/Text';
import HourGlassLoader from '../loaders/HourGlassLoader';
import TableOfContent from '../../pages/doc/toc/TableOfContent';
import { getViewWidth } from '../../../controllers/general.ts/helpers';
import Button from '../buttons/button/Button';
import FeedbackWindow from '../feedback/FeedbackWindow';
import Modal from '../modal/Modal';
import { ButtonType } from '../../../model/enumsModel';

import './paper.scss';


const Paper = () => {
	const { t } = useLanguage();
	const { statementId } = useParams<{ statementId: string }>();
	const sections = useSelector(sectionsSelector(statementId ?? ''));
	const paragraphs = useSelector(documentParagraphsSelector(statementId ?? ''));
	const rejected = useSelector(
		selectApprovalsByDocId(statementId ?? '')
	).filter((approval) => approval.approval === false);
	const approved = paragraphs.length - rejected.length;
	const { dir } = useLanguage();

	const [isAside, setIsAside] = useState<boolean>(getViewWidth() > 1024);
	const [userFeedbackIsOpen, setUserFeedbackIsOpen] = useState(false);
	const resizeTimeoutRef = useRef<number>();

	const { isLoading, isError, statement, role } = useDocument();

	const handleResize = useCallback(() => {
		if (resizeTimeoutRef.current) {
			window.clearTimeout(resizeTimeoutRef.current);
		}

		// Set new timeout
		resizeTimeoutRef.current = window.setTimeout(() => {
			setIsAside(getViewWidth() > 1024);
		}, 250);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (resizeTimeoutRef.current) {
				window.clearTimeout(resizeTimeoutRef.current);
			}
		};
	}, [handleResize]);

	const toggleFeedbackWindow = useCallback(() => {
		setUserFeedbackIsOpen((prev) => !prev);
	}, []);

	if (isLoading) return <HourGlassLoader />;
	if (isError) return <div>Error: An error occurred.</div>;
	if (!statement) return null;

	return (
		<main className='paper'>
			{userFeedbackIsOpen && (
				<Modal show={userFeedbackIsOpen} setShow={toggleFeedbackWindow}>
					<FeedbackWindow onCloseClick={toggleFeedbackWindow} />
				</Modal>
			)}
			<div
				className={`wrapper wrapper--paper ${dir === 'rtl' ? 'wrapper--rtl' : ''
					}`}
			>

				<div id='toc' />
				<div className='mainContainer'>

					<h1>{statement.statement}</h1>

					<Text
						statement={statement}
						showTitle={false}
						showDescription={true}
					/>
					<div className='paper__cover'>
						{statement.imagesURL?.main && <div style={{ backgroundImage: `url(${statement.imagesURL.main})` }} />}
					</div>
					<div className='TOC'>
						<TableOfContent isAside={isAside} />
					</div>
					{sections.map((section, index) => (
						<Section
							key={section.statementId}
							statement={section}
							order={index + 1}
							parentLevel={0}
							parentBullet=''
						/>
					))}

					<NewSection
						statement={statement}
						order={sections.length + 1}
						parentBullet=''
					/>
				</div>

				{role !== Role.admin && (
					<div className='feedbackButton'>
						<Button
							text={t('Feedback')}
							isSelected={true}
							buttonType={ButtonType.approve}
							onClick={toggleFeedbackWindow}
						/>
					</div>
				)}


			</div>

			{role === Role.admin ? (
				<AdminBottomButtons />
			) : (
				<UserButtons
					paragraphsLength={paragraphs.length}
					approved={approved}
					document={statement}
				/>
			)}
			<footer>
				<p >
					<a href="https://freedi.co" target='_blank'>פותח על ידי פרידי הסכמות</a>
				</p>

			</footer>
		</main >
	);
};

export default React.memo(Paper);
