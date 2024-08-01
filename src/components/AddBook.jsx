import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const AddBook = ({ getMovieList }) => {
	const [newTitle, setNewTitle] = useState('');
	const [newPublishDate, setNewPublishDate] = useState('');
	const [checked, setChecked] = useState(true);
	const allBooksCollection = collection(db, 'books');

	const handleAddBook = async () => {
		try {
			if (!newTitle == '' || !newPublishDate == '') {
				await addDoc(allBooksCollection, {
					title: newTitle,
					publishDate: newPublishDate,
					isNationalAwarded: checked,
					createdDate: Date.now(),
				});
			}
			setNewPublishDate('');
			setNewTitle('');
			getMovieList();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<input
				onChange={e => setNewTitle(e.target.value)}
				placeholder="Add Book ...."
			/>
			<input
				onChange={e => setNewPublishDate(e.target.value)}
				type="number"
				placeholder="Add Publish Date ..."
			/>
			<label htmlFor="">
				Is National Awarded
				<input
					type="checkbox"
					checked={checked}
					onChange={e => setChecked(e.target.checked)}
				/>
			</label>
			<button
				className="px-2 py-1 bg-blue-500 text-black"
				onClick={handleAddBook}
			>
				Add Book{' '}
			</button>
		</div>
	);
};

export default AddBook;
