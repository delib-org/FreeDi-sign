import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./config";
import { store } from "../../model/store";
import { parseUserFromFirebase } from "delib-npm";
import { setUser } from "../slices/userSlice";

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export function listenToAuth() {
    try {
        return onAuthStateChanged(auth, async (userFB) => {
            try {
                const dispatch = store.dispatch;
                if (userFB) {
                    console.info("User is logged in");
                    const user = parseUserFromFirebase(userFB);
                    dispatch(setUser(user));
                } else {
                    console.info("User is logged out");
                    dispatch(setUser(undefined));
                }
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error("Error getting statements: ", error);
    }
}

export function googleLogin() {
    signInWithPopup(auth, provider)
        .then(() => {
            console.info("user signed in with google ");
        })
        .catch((error) => {
            console.error(error);
        });
}

export function logOut() {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			console.info("Sign-out successful.");
		
		})
		.catch((error) => {
			// An error happened.
			console.error(error);
		});
}