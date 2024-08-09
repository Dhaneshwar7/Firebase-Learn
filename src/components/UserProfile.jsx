import React, { useEffect, useState } from 'react';
import { handleSignOut } from '../config/FirebaseAction';
const initialFormField = {
	email: '',
	password: '',
};
const UserProfile = ({ setCurrentUser, currentUser, fetchCurrentUser }) => {
	const [formValues, setFormValues] = useState(initialFormField);
	console.log(currentUser);

	const handleFormSubmit = async e => {
		e.preventDefault();
		try {
			const { user } = await asyncSignInWithEmailandPassword(formValues);
			console.log(user);
			setCurrentUser(user);
			setFormValues(initialFormField);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangeForm = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex w-full flex-col justify-center px-6 py-5 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					User Logged In Details
				</h2>
			</div>

			<div className="mt-2 sm:mx-auto sm:w-full w-full">
				<form className="space-y-2" onSubmit={handleFormSubmit}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Name
						</label>
						<div className="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								disabled={true}
								onChange={handleChangeForm}
								value={currentUser?.displayName ? 'ha' : 'No Display Name'}
								autoComplete="email"
								required
								className="block px-4 font-bold  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="userEmail"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email
							</label>
						</div>
						<div className="mt-1">
							<input
								id="userEmail"
								name="userEmail"
								type="userEmail"
								disabled={true}
								onChange={handleChangeForm}
								value={currentUser?.email}
								autoComplete="current-userEmail"
								required
								className="block w-full  px-4 font-bold rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</form>
				<div className="mt-1">
					<button
						onClick={() => {
							handleSignOut();
							setTimeout(() => {
								fetchCurrentUser();
							}, 2000);
						}}
						className="flex w-full items-center	 justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
