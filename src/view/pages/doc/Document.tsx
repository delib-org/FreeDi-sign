import { useEffect, useState, useMemo, memo } from 'react';
import { Role } from 'delib-npm';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { DocumentContext, handleSetUserEnteredPage } from './documentCont';
import { RoleContext } from '../../../controllers/hooks/useRole';
import { useLanguage } from '../../../controllers/hooks/useLanguage';
import { useSignatures } from '../../../controllers/hooks/signHooks';
import { listenToMySignature } from '../../../controllers/db/signatures/getSignatures';
import { documentParagraphsSelector } from '../../../controllers/slices/statementsSlice';
import { selectApprovalsByDocId } from '../../../controllers/slices/approvalSlice';
import { setUserData } from '../../../controllers/slices/userSlice';
import { getUserData } from '../../../controllers/db/user/getUserData';
import { setEvaluationSettings } from '../../../controllers/slices/evaluationSlice';
import { setSegmentation } from '../../../controllers/db/segmentation/setSegmentation';
import styles from './document.module.scss';
import DocumentInfo from '../../components/info/DocumentInfo';
import HourGlassLoader from '../../components/loaders/HourGlassLoader';
import { MetaTags } from '../../components/metaTags/MetaTags';
import Modal from '../../components/modal/Modal';
import PaperHeader from '../../components/paper/header/PaperHeader';
import Paper from '../../components/paper/Paper';
import SigninForm from '../../components/signinForm/SigninForm';
import Page401 from '../page401/Page401';
import Aside from './aside/Aside';
import { useDocument } from '../../../controllers/hooks/documentHooks';

const Document = () => {
	const dispatch = useDispatch();
	const { t } = useLanguage();
	const location = useLocation();
	const { statementId } = useParams<{ statementId: string }>();

	const [showInfo, setShowInfo] = useState(false);
	const [maxViewed, setMaxViewed] = useState(0);

	const {
		isLoading,
		isError,
		statement,
		isAuthorized,
		role,
		user,
		userData,
		mySignature,
	} = useDocument();

	const signatures = useSignatures(statementId);
	const currentUrl = useMemo(
		() => `${window.location.origin}${location.pathname}`,
		[location.pathname]
	);

	const contextValue = useMemo(
		() => ({
			role,
			maxViewed,
			document: statement,
		}),
		[role, maxViewed, statement]
	);

	const paragraphs = useSelector(documentParagraphsSelector(statementId || ''));
	const rejectedCount = useSelector(
		selectApprovalsByDocId(statementId || '')
	).filter((approval) => approval.approval === false).length;

	const approved = paragraphs.length - rejectedCount;

	useEffect(() => {
		if (statementId && role === Role.admin) {
			setSegmentation(statementId);
		}
	}, [statementId, role]);

	useEffect(() => {
		if (statement) {
			document.title = `FreeDi-sign - ${statement.statement}`;
		}
	}, [statement]);

	useEffect(() => {
		const newMaxViewed = Math.max(
			...paragraphs.map((p) => p.viewed?.individualViews || 0)
		);
		if (newMaxViewed !== maxViewed) {
			setMaxViewed(newMaxViewed);
		}
	}, [paragraphs, maxViewed]);

	

	useEffect(() => {
		if (statementId) {
			dispatch(
				setEvaluationSettings({
					statementId,
					approve: false,
					comment: true,
					importance: false,
					likes: true,
				})
			);
		}
	}, [statementId, dispatch]);


	useEffect(() => {
		let unsubscribe = () => {};
		if (isAuthorized && statementId) {
			unsubscribe = listenToMySignature(statementId);
		}
		return unsubscribe;
	}, [isAuthorized, statementId]);

	useEffect(() => {
		if (!mySignature && statement) {
			handleSetUserEnteredPage(statement, paragraphs.length, approved);
		}
	}, [mySignature, paragraphs.length, statement, approved]);

	if (isLoading) {
		return (
			<div className={styles.loader}>
				<h2>FreeDi - sign</h2>
				<HourGlassLoader />
				<div>{t('Loading')}...</div>
			</div>
		);
	}

	if (isError) return <div>Error: An error occurred.</div>;
	if (!isAuthorized) return <Page401 />;

	return (
		<RoleContext.Provider value={role}>
			<DocumentContext.Provider value={contextValue}>
				<>
					<MetaTags
						title={
							statement?.statement
								? `FreeDi Sign- ${statement.statement}`
								: 'FreeDi-sign'
						}
						description={statement?.description || 'FreeDi-sign document'}
						image='https://freedis.web.app/logo.png'
						url={currentUrl}
					/>
					<div className={styles.doc}>
						<div className={styles.aside}>
							<Aside />
						</div>

						<div className={styles.main}>
							<PaperHeader statement={statement} />
							<Paper />
						</div>

						{showInfo && (
							<Modal>
								<DocumentInfo
									statement={statement}
									signatures={signatures}
									setShowInfo={setShowInfo}
								/>
							</Modal>
						)}

						<Outlet />

						{!userData && role !== Role.admin && (
							<Modal>
								<SigninForm />
							</Modal>
						)}
					</div>
				</>
			</DocumentContext.Provider>
		</RoleContext.Provider>
	);
};

export default memo(Document);
