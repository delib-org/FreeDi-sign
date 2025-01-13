import {
	Collections,
	getStatementSubscriptionId,
	User,
	UserData,
	UserDataSchema,
} from 'delib-npm';
import {
	collection,
	doc,
	getDoc,
	where,
	query,
	getDocs,
} from 'firebase/firestore';
import { firebaseDb } from '../config';
import { store } from '../../../model/store';

export async function getUserData(
	userId: string | undefined,
	statementId: string | undefined
): Promise<UserData | undefined> {
	try {
		if (!userId) userId = store.getState().user.user?.uid;
		if (!userId) throw new Error("couldn't get user id");
		if (!statementId) throw new Error('Statement id is missing');

		const user: User = {
			uid: userId,
			email: '',
			displayName: '',
			photoURL: '',
		};

		const userDataId = getStatementSubscriptionId(statementId, user);
		if (!userDataId) throw new Error('User data id not found');

		const userDataRef = doc(firebaseDb, Collections.usersData, userDataId);
		const userDataDB = await getDoc(userDataRef);
		if (!userDataDB.exists()) return undefined;
		const userData = userDataDB.data() as UserData;
		const results = UserDataSchema.safeParse(userData);
		if (!results.success) {
			console.error(results.error);
			console.info(userData);
			return undefined;
		}
		return userData;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export async function getUsersData(documentId: string): Promise<UserData[]> {
	try {
		const usersDataRef = collection(firebaseDb, Collections.usersData);
		const q = query(usersDataRef, where('documentId', '==', documentId));
		const usersDataDB = await getDocs(q);
		const usersData: UserData[] = usersDataDB.docs.map(
			(doc) => doc.data() as UserData
		);
		const results = usersData.map((userData) =>
			UserDataSchema.safeParse(userData)
		);
		if (!results.every((result) => result.success)) {
			console.error(results);
			return [];
		}
		return usersData;
	} catch (error) {
		console.error(error);
		return [];
	}
}
