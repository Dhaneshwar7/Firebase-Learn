import React, { useEffect, useState } from 'react';
import {
	asynchandleBookFormSubmit,
	handleSignOut,
} from '../config/FirebaseAction';
import { auth } from '../config/firebase';
const initialBookFormField = {
	bookName: '',
	publishDate: '',
	checked: false,
};
const AddBookForm = ({ getBooksData }) => {
	const [bookValues, setBookValues] = useState(initialBookFormField);
	const [checked, setChecked] = useState(false);

	const handleBookFormSubmit = async e => {
		e.preventDefault();
		const bookData = {
			title: bookValues.bookName,
			publishDate: bookValues.publishDate,
			isNationalAwarded: checked,
			createdDate: Date.now(),
			userId: auth?.currentUser?.uid,
		};
		try {
			const data = await asynchandleBookFormSubmit(bookData);
			console.log(data);
			setBookValues(initialBookFormField);
			getBooksData();
		} catch (error) {
			console.error(error);
		}
	};
	const handleBookFormChange = e => {
		setBookValues({ ...bookValues, [e.target.name]: e.target.value });
		// console.log(bookValues);
	};

	return (
			<div className="flex w-full flex-col justify-center px-6 py-5 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Add Book
					</h2>
				</div>

				<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-2" onSubmit={handleBookFormSubmit}>
						<div>
							<label
								htmlFor="bookName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Book Name
							</label>
							<div className="mt-1">
								<input
									id="bookName"
									name="bookName"
									type="bookName"
									onChange={handleBookFormChange}
									value={bookValues.bookName}
									autoComplete="bookName"
									required
									className="block w-full px-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="publishDate"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Publish Date
								</label>
							</div>
							<div className="mt-1">
								<input
									id="publishDate"
									name="publishDate"
									type="date"
									onChange={handleBookFormChange}
									value={bookValues.publishDate}
									autoComplete="current-publishDate"
									required
									className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="nationalAwarded"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Is Awarded/Achievement !?
								</label>
							</div>
							<div className="mt-0">
								<input
									id="nationalAwarded"
									type="checkbox"
									checked={checked}
									onChange={e => setChecked(e.target.checked)}
									className="w-5 h-5 cursor-pointer"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Add Book
							</button>
						</div>
					</form>
					
				</div>
			</div>
	);
};

export default AddBookForm;
