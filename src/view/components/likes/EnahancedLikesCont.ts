import { enhancedEvaluationsThumbs } from "./EnhancedLikesModel";

export const getEvaluationThumbIdByScore = (
	evaluationScore: number | undefined,
): string => {
	if (evaluationScore === undefined) return defaultThumb.id;

	// find the nearest evaluation
	let nearestThumb = enhancedEvaluationsThumbs[0];

	enhancedEvaluationsThumbs.forEach((evaluationThumb) => {
		const current = Math.abs(evaluationScore - evaluationThumb.evaluation);
		const nearest = Math.abs(evaluationScore - nearestThumb.evaluation);

		if (current < nearest) {
			nearestThumb = evaluationThumb;
		}
	});

	return nearestThumb.id;
};