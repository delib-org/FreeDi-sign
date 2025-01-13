import { useDispatch, useSelector } from 'react-redux';
import MainButton from '../../buttons/MainButton';
import StrongMainButton from '../../buttons/StrongMainButton';
import {
	isEditSelector,
	setIsEdit,
} from '../../../../controllers/slices/editSlice';
import './AdminBottomButtons.scss';

const AdminBottomButtons = () => {
	const dispatch = useDispatch();
	const isEdit = useSelector(isEditSelector);

	function handleEndEdit() {
		dispatch(setIsEdit(false));
	}

	if (!isEdit) return null;
	return (
		<div className='buttonWrapper'>
			<MainButton
				value='Cancel'
				backgroundColor='var(--inactive-btn)'
				color='var(--icon-blue)'
				onClick={handleEndEdit}
			/>
			<StrongMainButton value='Save Changes' onClick={handleEndEdit} />
		</div>
	);
};

export default AdminBottomButtons;
