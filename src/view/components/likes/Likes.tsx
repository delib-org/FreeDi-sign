import { Statement } from "delib-npm";
import { FC, useContext } from "react";
import SimpleLikes from "./SimpleLikes/SimpleLikes";

import { DocumentContext } from "../../pages/doc/documentCont";
import EnhancedLikes from "./EnhancedLikes";

interface EvaluationProps {
  statement: Statement;
}

const Likes: FC<EvaluationProps> = ({ statement }) => {

	const {document} = useContext(DocumentContext);
  
	const shouldDisplayScore: boolean = document?.statementSettings
		?.showEvaluation
		? document.statementSettings?.showEvaluation
		: false;

	if (document?.statementSettings?.enhancedEvaluation) {
		return (
			<EnhancedLikes
				statement={statement}
				shouldDisplayScore={shouldDisplayScore}
			/>
		);
	}

	return (
		<SimpleLikes
			statement={statement}
			shouldDisplayScore={shouldDisplayScore}
		/>
	);
};

export default Likes;
