import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import {
	asyncSignInWithEmailandPassword,
	handleSignInWithGoogle,
	handleSignOut,
} from '../config/FirebaseAction';
const initialFormField = {
	email: '',
	password: '',
};
const Auth = ({ setCurrentUser, fetchCurrentUser }) => {
	const [formValues, setFormValues] = useState(initialFormField);

	const handleFormSubmit = async e => {
		e.preventDefault();
		try {
			const { user } = await asyncSignInWithEmailandPassword(formValues);
			// console.log(user);
			setCurrentUser(user);
			setFormValues(initialFormField);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSignInwithGoogle = async () => {
		try {
			const { user } = await handleSignInWithGoogle();
			setCurrentUser(user);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangeForm = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign Up with new account
					</h2>
				</div>

				<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-2" onSubmit={handleFormSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									onChange={handleChangeForm}
									value={formValues.email}
									autoComplete="email"
									required
									className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									onChange={handleChangeForm}
									value={formValues.password}
									autoComplete="current-password"
									required
									className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>
					<div className="mt-1">
						<button
							onClick={handleSignInwithGoogle}
							className="flex w-full items-center	 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
						>
							<img src="/google.webp" height={30} width={30} alt="" />
							Sign in With Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
