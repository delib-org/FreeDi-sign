import {
	Approval,
	getStatementSubscriptionId,
	Statement,
} from 'delib-npm';
import { FC, useEffect } from 'react';
import styles from './Approval.module.scss';
//icons

import ApproveFAB from '../../../../../../assets/icons/approveFAB.svg?react';
import RejectFAB from '../../../../../../assets/icons/rejectFAB.svg?react';
import { setApprovalToDB } from '../../../../../../controllers/db/approval/setApproval';
import { getUserApprovalFromDB } from '../../../../../../controllers/db/approval/getApproval';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectApprovalById,
	setApproval,
	updateApproval,
} from '../../../../../../controllers/slices/approvalSlice';
import { store } from '../../../../../../model/store';
import { useLanguage } from '../../../../../../controllers/hooks/useLanguage';
import { useRole } from '../../../../../../controllers/hooks/useRole';

interface Props {
	statement: Statement;
}

const ApprovalComp: FC<Props> = ({ statement }) => {
	const { t } = useLanguage();
	const { isAdmin } = useRole();
	const dispatch = useDispatch();

	const approval: Approval | undefined = useSelector(
		selectApprovalById(statement.statementId)
	);
	const approved = approval ? approval.approval : true;

	useEffect(() => {
		getUserApprovalFromDB({ statement })
			.then((approval: Approval | undefined) => {
				try {
					if (approval) {
						dispatch(setApproval(approval));
					} else {
						const user = store.getState().user.user;
						if (!user) throw new Error('User not found');
						const documentId = statement.documentSettings?.parentDocumentId;
						if (!documentId) throw new Error('Document Id not found');
						const approvalId = getStatementSubscriptionId(
							statement.statementId,
							user
						);
						if (!approvalId) throw new Error('Approve Id not found');

						const newApproval: Approval = {
							approvalId,
							statementId: statement.statementId,
							topParentId: statement.topParentId,
							userId: user.uid,
							approval: true,
							documentId,
						};

						dispatch(setApproval(newApproval));
					}
				} catch (error) {
					console.error(error);
				}
			})
			.catch((error) => {
				console.error(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleApprove(_approval: boolean) {
		try {
			if (isAdmin) return;

			setApprovalToDB({ statement, approval: _approval });
			dispatch(
				updateApproval({
					approved: _approval,
					statementId: statement.statementId,
				})
			);
		} catch (error) {
			console.error(error);
		}
	}

	return (
    <div className={styles.admin}>
      <div className={styles.admin__btns}>
        <div
          onClick={() => handleApprove(false)}
          className={
            !approved ? styles['admin--reject'] : styles['admin--unselected']
          }
        >
          <RejectFAB />
        </div>
        <div
          onClick={() => handleApprove(true)}
          className={
            approved ? styles['admin--approve'] : styles['admin--unselected']
          }
        >
          <ApproveFAB />
        </div>
      </div>
      <div className={styles.admin__title}>
        <span>{t('Approve?')}</span>
      </div>
    </div>
  );
};

export default ApprovalComp;
