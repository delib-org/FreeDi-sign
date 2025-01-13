// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { keys } from "./configKey";


const firebaseConfig = keys;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(app);
const analytics = getAnalytics(app);
const messaging = async () => (await isSupported()) && getMessaging(app);
const storage = getStorage(app);
const auth = getAuth();

//development
if (location.hostname === "localhost") {
	console.warn("running on development mode");

	connectFirestoreEmulator(firebaseDb, "127.0.0.1", 8080);
	connectAuthEmulator(auth, "http://127.0.0.1:9099");
	connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export { auth, firebaseDb, analytics, messaging, storage, app };
