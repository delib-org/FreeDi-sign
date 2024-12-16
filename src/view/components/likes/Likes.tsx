import { Statement } from "delib-npm";
import { FC } from "react";
import SimpleEvaluation from "./SimpleLikes/SimpleLikes";
import EnhancedEvaluation from "./enhancedEvaluation/EnhancedEvaluation";

interface EvaluationProps {
  parentStatement: Statement;
  statement: Statement;
}

const Likes: FC<EvaluationProps> = ({ parentStatement, statement }) => {
  
	const shouldDisplayScore: boolean = parentStatement.statementSettings
		?.showEvaluation
		? parentStatement.statementSettings?.showEvaluation
		: false;

	if (parentStatement.statementSettings?.enhancedEvaluation) {
		return (
			<EnhancedEvaluation
				statement={statement}
				shouldDisplayScore={shouldDisplayScore}
			/>
		);
	}

	return (
		<SimpleEvaluation
			statement={statement}
			shouldDisplayScore={shouldDisplayScore}
		/>
	);
};

export default Likes;
