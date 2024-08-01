import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC71tYAwTZtyWmnx4bE4IPjsyOV1Yfhkuo',
	authDomain: 'fir-learn-hk.firebaseapp.com',
	projectId: 'fir-learn-hk',
	storageBucket: 'fir-learn-hk.appspot.com',
	messagingSenderId: '983744351994',
	appId: '1:983744351994:web:02836dce1542c6b2088343',
	measurementId: 'G-QW3CZ1C5T8',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
