import { useParams } from 'react-router-dom';
import Section from '../../pages/doc/section/Section';
import { useDocument } from '../../../controllers/hooks/documentHooks';
import AdminBottomButtons from './bottomButtons/AdminBottomButtons';
import NewSection from '../../pages/doc/newSection/NewSection';
import { useSelector } from 'react-redux';
import {
	documentParagraphsSelector,
	sectionsSelector,
} from '../../../controllers/slices/statementsSlice';
import { useLanguage } from '../../../controllers/hooks/useLanguage';
import { Role } from 'delib-npm';
import UserButtons from './bottomButtons/userButtons/UserButtons';
import { selectApprovalsByDocId } from '../../../controllers/slices/approvalSlice';
import Text from '../text/Text';
import HourGlassLoader from '../loaders/HourGlassLoader';
import TableOfContent from '../../pages/doc/toc/TableOfContent';
import { useState } from 'react';
import { getViewWidth } from '../../../controllers/general.ts/helpers';
import './paper.scss';
import Button from '../buttons/button/Button';
import FeedbackWindow from '../feedback/FeedbackWindow';
import Modal from '../modal/Modal';
import { ButtonType } from '../../../model/enumsModel';

const Paper = () => {
	const {t} = useLanguage();
	const { statementId } = useParams<{ statementId: string }>();
	const sections = useSelector(sectionsSelector(statementId || ''));
	const paragraphs = useSelector(documentParagraphsSelector(statementId || ''));
	const rejected = useSelector(
		selectApprovalsByDocId(statementId || '')
	).filter((approval) => approval.approval === false);
	const approved = paragraphs.length - rejected.length;
	const { dir } = useLanguage();

	const [isAside, setIsAside] = useState<boolean>(getViewWidth() > 1024);
	const [userFeedbackIsOpen, setUserFeedbackIsOpen] = useState(false);

	const { isLoading, isError, statement, role } = useDocument();
	if (isLoading) return <HourGlassLoader />;
	if (isError) return <div>Error: An error occurred.</div>;

	if (!statement) return null;

	//onresize
	window.addEventListener('resize', () => {
		//view width
		setIsAside(getViewWidth() > 1024);
	});

	const toggleFeedbackWindow = () => {
		setUserFeedbackIsOpen(!userFeedbackIsOpen);
	};

	return (
		<main className='paper'>
			{userFeedbackIsOpen && (
				<Modal>
					<FeedbackWindow onCloseClick={toggleFeedbackWindow} />
				</Modal>
			)}
			<div
				className={`wrapper wrapper--paper ${dir === 'rtl' && 'wrapper--rtl'}`}
			>
				<div id='toc' />
				{statement && (
					<div className='mainContainer'>
						<h1>{statement.statement}</h1>

						<Text
							statement={statement}
							showTitle={false}
							showDescription={true}
						/>

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
				)}
				<div className='feedbackButton'>
					<Button
						text={t('Feedback')}
						isSelected={true}
						buttonType={ButtonType.approve}
						onClick={toggleFeedbackWindow}
					/>
				</div>
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
		</main>
	);
};

export default Paper;
