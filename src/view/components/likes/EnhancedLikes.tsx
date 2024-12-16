import { Statement } from "delib-npm";
import { FC } from "react";
import {
	enhancedEvaluationsThumbs,
	EnhancedEvaluationThumb,
} from "./EnhancedLikesModel";
import styles from  "./EnhancedLikes.module.scss";
import { useSelector } from "react-redux";
import { setEvaluationToDB } from "../../../controllers/db/evaluations/setEvaluations";
import { selectLike } from "../../../controllers/slices/evaluationSlice";
import { getEvaluationThumbIdByScore } from "./EnahancedLikesCont";


interface EnhancedEvaluationProps {
  statement: Statement;
  shouldDisplayScore: boolean;
}

const EnhancedLikes: FC<EnhancedEvaluationProps> = ({
	statement,
	shouldDisplayScore,
}) => {
	const like = useSelector(selectLike(statement.statementId))?.evaluation;

	const { sumPro, sumCon, numberOfEvaluators } = statement.evaluation || {
		sumPro: 0,
		sumCon: 0,
		numberOfEvaluators: 0,
	};

	return (
		<div
			className={`${styles[`enhanced-evaluation`]} evolution-element`}
		>
			<div className={`${styles["evaluation-score"]} con-element`}>
				{shouldDisplayScore === true ? sumCon : null}
			</div>
			<div
				className={styles["evaluation-thumbs"]}
			>
				{enhancedEvaluationsThumbs.map((evaluationThumb) => (
					<EvaluationThumb
						key={evaluationThumb.id}
						evaluationThumb={evaluationThumb}
						evaluationScore={like}
						statement={statement}
					/>
				))}
			</div>

			{shouldDisplayScore ? (
				<div
					className={`${styles[`evaluation-score`]} ${statement.consensus < 0 ? "negative" : ""}`}
				>
					<span>{sumPro}</span>
					{(numberOfEvaluators && numberOfEvaluators > 0)? (
						<span className={styles["total-evaluators"]}> ({numberOfEvaluators})</span>
					):null}
					
				</div>
			) : (
				<div />
			)}
			<div />
			<div />
		</div>
	);
};

export default EnhancedLikes;

interface EvaluationThumbProps {
  statement: Statement;
  evaluationScore: number | undefined;
  evaluationThumb: EnhancedEvaluationThumb;
}

const EvaluationThumb: FC<EvaluationThumbProps> = ({
	evaluationThumb,
	evaluationScore,
	statement,
}) => {
	const handleSetEvaluation = (): void => {
		setEvaluationToDB(statement, evaluationThumb.evaluation);
	};

	const isThumbActive =
    evaluationScore !== undefined &&
    evaluationThumb.id === getEvaluationThumbIdByScore(evaluationScore);

	return (
		<button
			className={`${styles["evaluation-thumb"]} ${isThumbActive ? styles.active : ""}`}
			style={{
				backgroundColor: isThumbActive
					? evaluationThumb.colorSelected
					: evaluationThumb.color,
			}}
			onClick={handleSetEvaluation}
		>
			<img src={evaluationThumb.svg} alt={evaluationThumb.alt} />
		</button>
	);
};
