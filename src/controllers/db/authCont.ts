import {
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	signInAnonymously,
} from 'firebase/auth';
import { store } from '../../model/store';
import { parseUserFromFirebase } from 'delib-npm';
import { setUser } from '../slices/userSlice';
import { auth } from './config';

const provider = new GoogleAuthProvider();

export function listenToAuth() {
	try {
		return onAuthStateChanged(auth, async (userFB) => {
			try {
				const dispatch = store.dispatch;
				if (userFB) {
					const user = parseUserFromFirebase(userFB);

					dispatch(setUser(user));
				} else {
					console.info('User is logged out');
					dispatch(setUser(undefined));
				}
			} catch (error) {
				console.error(error);
			}
		});
	} catch (error) {
		console.error('Error getting statements: ', error);
		return () => {};
	}
}

export function googleLogin() {
	signInWithPopup(auth, provider)
		.then(() => {
			console.info('user signed in with google ');
		})
		.catch((error) => {
			console.error(error);
		});
}

export function logOut() {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			console.info('Sign-out successful.');
		})
		.catch((error) => {
			// An error happened.
			console.error(error);
		});
}

export function anonymousLogin() {
	signInAnonymously(auth)
		.then(() => {
			console.info('user signed in anonymously ');
		})
		.catch((error) => {
			console.error(error);
		});
}
