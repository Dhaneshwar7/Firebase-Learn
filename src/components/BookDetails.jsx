import React, { useState } from 'react';
import {
	asyncHandleEditBook,
	asyncHandleDeleteBook,
} from '../config/FirebaseAction';

const BookDetails = ({ book, currentUser, getBooksData }) => {
	const [isTodoEditable, setIsTodoEditable] = useState(false);
	const [editedBookName, setEditedBookName] = useState(book?.title || '');

	return (
		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
			<td className="p-4">
				<img
					src="https://flowbite.com/docs/images/products/apple-watch.png"
					className="w-16 md:w-32 max-w-full max-h-full"
					alt="Apple Watch"
				/>
			</td>

			<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
				<p className="text-xs">{isTodoEditable && 'Edit Book Name'}</p>
				<input
					type="text"
					id="bookName"
					name="bookName"
					placeholder={book?.title}
					value={editedBookName}
					autoComplete="bookName"
					onChange={e => setEditedBookName(e.target.value)}
					readOnly={!isTodoEditable}
					className={` outline-none bg-transparent block w-full px-5  text-white rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
						isTodoEditable
							? 'border-white/10 px-2'
							: 'border-none ring-0 focus:ring-transparent'
					} `}
				/>
			</td>
			<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
				<p
					className={` ${
						book.isNationalAwarded ? 'bg-green-600' : 'bg-red-400'
					} m-auto w-fit px-2 py-1 rounded`}
				>
					{book.isNationalAwarded ? 'Awarded' : 'No Achivement'}
				</p>
			</td>

			<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
				{book?.publishDate}
			</td>
			{currentUser ? (
				<td className="px-6 py-4 gap-3 h-full">
					<button
						onClick={() => {
							asyncHandleDeleteBook(book.id);
							setTimeout(() => {
								getBooksData();
							}, 1000);
						}}
						className="font-medium bg-red-600 px-2 py-2 rounded-md dark:bg-red-500 hover:underline"
					>
						Delete
					</button>
					<button
						onClick={() => {
							if (isTodoEditable) {
								asyncHandleEditBook(book.id, editedBookName);
								setTimeout(() => {
									getBooksData();
								}, 1300);
								setIsTodoEditable(false);
							} else setIsTodoEditable(prev => !prev);
						}}
						className="font-medium bg-blue-400 ml-2  px-4 py-2 text-black rounded-md dark:bg-blue-400  hover:underline"
					>
						{isTodoEditable ? <span>Update 📁 </span> : <span>Edit ✏️</span>}
					</button>
				</td>
			) : (
				<td className="px-6 py-4 gap-3 h-full">
					<button className="font-medium bg-blue-400 ml-2  px-4 py-2 text-black rounded-md dark:bg-blue-400  hover:underline">
						Sign In For Changes
					</button>
				</td>
			)}
		</tr>
	);
};

export default BookDetails;
