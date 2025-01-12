import { Collections, Segmentation } from 'delib-npm';
import {
	collection,
	DocumentData,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { DB } from '../config';

export async function getSegments(documentId: string): Promise<Segmentation[]> {
	try {
		const segmentsRef = collection(DB, Collections.statementSegments);
		const q = query(segmentsRef, where('statementId', '==', documentId));
		const segmentsDB = await getDocs(q);
		const segments = segmentsDB.docs.map(
			(doc: DocumentData) => doc.data() as Segmentation
		);

		return segments.sort((a, b) => a.order - b.order);
	} catch (e) {
		console.error(e);
		return [];
	}
}
