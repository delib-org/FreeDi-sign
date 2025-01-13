import Button from '../buttons/button/Button';
import './FeedbackWindow.scss';
import StarIcon from '../../../assets/icons/star.svg?react';

export default function FeedbackWindow() {
	return (
		<main className='feedbackWindow'>
			<h1>We appreciate your feedback</h1>
			<p>
				We are always looking for ways to improve your experience. Please take a
				moment to evaluate and tell us what you think.
			</p>
			<div>
				<StarIcon />
				<StarIcon />
				<StarIcon />
				<StarIcon />
				<StarIcon />
			</div>
			<textarea
				name='feedback'
				id='feedback'
				className='feedbackText'
			></textarea>
			<Button text='Send my feedback' />
		</main>
	);
}
