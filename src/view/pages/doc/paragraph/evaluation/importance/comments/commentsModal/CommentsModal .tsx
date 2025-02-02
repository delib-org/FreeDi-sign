import { useLocation, useNavigate } from 'react-router-dom';

import Modal from '../../../../../../../components/modal/Modal';
import Comments from '../../../../../comments/Comments';

const CommentsModal = () => {
	const { search, pathname } = useLocation();
	const navigate = useNavigate();

	function handleHideComments() {
		const path = pathname.split('/');
		navigate(`/${path[1]}/${path[2]}${search}`);
	}

	return (
		<div className='tets'>
			<Modal
				close={handleHideComments}
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						handleHideComments();
					}
				}}
			>
				<Comments handleHideComments={handleHideComments } />
			</Modal>
		</div>
	);
};

export default CommentsModal;
