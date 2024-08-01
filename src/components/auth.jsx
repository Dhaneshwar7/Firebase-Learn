import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	console.log(auth?.currentUser?.email);
	console.log(auth?.currentUser?.uid);
	// console.log(auth?.currentUser?.photoURL);

	const handleSignIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<input
				onChange={e => setEmail(e.target.value)}
				placeholder="Email ...."
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				type="password"
				placeholder="Password ...."
			/>
			<button onClick={handleSignIn}>Sign IN</button>
			<button onClick={handleSignInWithGoogle}>Sign In with Google</button>
			<button onClick={handleSignOut}> Log Out</button>
		</div>
	);
};

export default Auth;

// const handleChange = e => {
// 	if (e.target.name === 'password') {
// 		setPassword(e.targe.value);
// 	} else {
// 		setEmail(e.target.value);
// 	}
// 	console.log(email);
// 	console.log(password);
// };
