import { FC, useEffect, useState } from "react";
import { useLanguage } from "../../../../controllers/hooks/useLanguage";
import { useSelector } from "react-redux";
import { selectLike } from "../../../../controllers/slices/evaluationSlice";
// Third Party Imports
import { Statement } from "delib-npm";

// Custom components
import Thumb from "./thumb/Thumb";

//css
import "./SimpleLikes.scss";


interface Props {
    statement: Statement;
    shouldDisplayScore?: boolean;
}

const SimpleLikes: FC<Props> = ({
	statement,
	shouldDisplayScore = true,
}) => {
	const {dir:direction} = useLanguage();

	const initialContVotesCount = statement.con ?? 0;
	const initialProVotesCount = statement.pro ?? 0;

	// number of people who gave a bad evaluation
	const [conVotesCount, setConVotesCount] = useState(initialContVotesCount);

	// number of people who gave a good evaluation
	const [proVotesCount, setProVotesCount] = useState(initialProVotesCount);

	const like = useSelector(
		selectLike(statement.statementId)
	)?.evaluation;

	const { consensus } = statement;
	const consensusToDisplay = consensus
		? Math.round(consensus * 100) / 100
		: 0;

	useEffect(() => {
		setConVotesCount(initialContVotesCount);
		setProVotesCount(initialProVotesCount);
	}, [initialContVotesCount, initialProVotesCount, statement.con, statement.pro]);

	return (
		<div className="simple-evaluation">
			<div
				className="evaluation-box"
				style={{ flexDirection: direction === "ltr" ? "row" : "row-reverse" }}
			>
				{shouldDisplayScore && <span>{conVotesCount}</span>}
				<div className="thumb-icon">
					<Thumb
						evaluation={like || 0}
						upDown="down"
						statement={statement}
						setConVote={setConVotesCount}
						setProVote={setProVotesCount}
					/>
				</div>
				<div className="thumb-icon">
					<Thumb
						evaluation={like || 0}
						upDown="up"
						statement={statement}
						setProVote={setProVotesCount}
						setConVote={setConVotesCount}
					/>
				</div>
				{shouldDisplayScore && <span>{proVotesCount}</span>}
			</div>
			{shouldDisplayScore && (
				<div className="total-evaluations">{consensusToDisplay}</div>
			)}
		</div>
	);
};

export default SimpleLikes;
