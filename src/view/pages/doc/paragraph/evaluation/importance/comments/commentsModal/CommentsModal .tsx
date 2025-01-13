import { useNavigate } from 'react-router-dom';
import Modal from '../../../../../../../components/modal/Modal';
import Comments from '../../../../../comments/Comments';

const CommentsModal = () => {
	const navigate = useNavigate();

	return (
		<div className='tets'>
			<Modal
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						navigate('..');
					}
				}}
			>
				<Comments />
			</Modal>
		</div>
	);
};

export default CommentsModal;
