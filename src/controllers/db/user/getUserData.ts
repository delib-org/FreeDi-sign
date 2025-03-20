import {
	Collections,
	getStatementSubscriptionId,
	Statement,
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

interface GetUserDataProps {
	userId?: string ,
	statementId?: string 
}

export async function getUserData({
	userId,
	statementId
}:GetUserDataProps): Promise<UserData | undefined> {
	try {
		if (!userId) userId = store.getState().user.user?.uid;
		if (!userId) throw new Error("couldn't get user id");
		if (!statementId) throw new Error('Statement id is missing');

		const urlParams = new URLSearchParams(window.location.search);
		const lobbyId: string = String(urlParams.get('lobby') ?? "123");

	

		const user: User = {
			uid: userId,
			email: '',
			displayName: '',
			photoURL: '',
		};

		const userDataId = getStatementSubscriptionId(statementId, user);
		if (!userDataId) throw new Error('User data id not found');

		const lobbyUserDataId = getStatementSubscriptionId(lobbyId, user);
		if (!lobbyUserDataId) throw new Error('Lobby User data id not found');

		const userDataRef = doc(firebaseDb, Collections.usersData, userDataId);
		const lobbyUserDataRef = doc(firebaseDb, Collections.usersData, lobbyUserDataId);
		const [userDataDB, lobbyUserDataDB] = await Promise.all([
			getDoc(userDataRef),
			getDoc(lobbyUserDataRef)
		]);


		if (!userDataDB.exists() && !lobbyUserDataDB.exists()) return undefined;
		const userData = (userDataDB.data() || lobbyUserDataDB.data()) as UserData;
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

interface GetUserDataProps {
	documentId?: string;
	lobbyId?: string;
}

export async function getUsersData({documentId,lobbyId}:GetUserDataProps): Promise<any[]> {
	try {
		if (!documentId && !lobbyId ) throw new Error('Document id and LobbyId are missing');
		lobbyId = "123"
		const usersDataRef = collection(firebaseDb, Collections.usersData);
		const q = documentId? query(usersDataRef, where('documentId', '==', documentId))
		: query(usersDataRef, where('lobbyId', '==', lobbyId));
		const usersDataDB = await getDocs(q);
		const usersData: any[] = usersDataDB.docs.map(
			(doc) => doc.data() 
		);
debugger;
		const comments = usersData.filter((userData) => userData.eventType === 'comment');

		const targetRefs = comments.map((comment) => doc(firebaseDb, Collections.statements, comment.targetId));

		const targetsDB = await Promise.all(targetRefs.map((ref) => getDoc(ref)));

		const targets = targetsDB.map((target) => target.data() as Statement);

		const usersDataWithTargets = usersData.map((ud) => {
			if(ud.eventType === 'comment') {
				const target = targets.find((target) => target?.statementId === ud.targetId);
				if(!target) return ud;
				if(!target.statement) return ud;
				return {
					...ud,
					targetText: target?.statement,
				};
			} else {
				return ud;
			}
		});

		return usersDataWithTargets;
	} catch (error) {
		console.error(error);
		return [];
	}
}
