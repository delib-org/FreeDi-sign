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
	const {dir:direction, t} = useLanguage();

	// number of people who gave a bad evaluation
	const [conVotesCount, setConVotesCount] = useState(0);

	// number of people who gave a good evaluation
	const [proVotesCount, setProVotesCount] = useState(0);

	const like = useSelector(
		selectLike(statement.statementId)
	)?.evaluation;

	useEffect(() => {
		setConVotesCount(statement?.evaluation?.sumCon || 0);
		setProVotesCount(statement.evaluation?.sumPro || 0);
	}, [ statement.evaluation?.sumPro, statement.evaluation?.sumCon]);

	return (
		<div className="simple-evaluation">
			<div className="simple-evaluation__question">{t("Do you agree with this paragraph?")}</div>
			<div
				className="evaluation-box"
				style={{ flexDirection: direction === "ltr" ? "row" : "row-reverse" }}
			>
				{shouldDisplayScore && <span>{proVotesCount}</span>}
				<div className="thumb-icon">
					
					<Thumb
						evaluation={like || 0}
						upDown="up"
						statement={statement}
						setProVote={setProVotesCount}
						setConVote={setConVotesCount}
					/>
				</div>
				<div className="thumb-icon">
					<Thumb
						evaluation={like || 0}
						upDown="down"
						statement={statement}
						setConVote={setConVotesCount}
						setProVote={setProVotesCount}
					/>
				</div>
				{shouldDisplayScore && <span>{conVotesCount}</span>}				
			</div>
		</div>
	);
};

export default SimpleLikes;
