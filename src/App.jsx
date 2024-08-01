import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth';
import { db } from './config/firebase';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AddBook from './components/AddBook';

function App() {
	const [books, setBooks] = useState([]);
	const [newUpdatedTitle, setNewUpdatedTitle] = useState('');
	const allBooksCollection = collection(db, 'books');

	const getMovieList = async () => {
		try {
			//Read Book Data
			const data = await getDocs(allBooksCollection);
			const filterData = data.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));
			// console.log({filterData});
			//Set Books Collection Data
			setBooks(filterData);
		} catch (error) {
			console.error(error);
		}
	};
	const handleDelete = async bookId => {
		try {
			const bookDoc = doc(db, 'books', bookId);
			await deleteDoc(bookDoc);
			getMovieList();
		} catch (error) {
			console.error(error);
		}
	};
	const handleEdit = async bookId => {
		try {
			const bookDoc = doc(db, 'books', bookId);
			await updateDoc(bookDoc, { title: newUpdatedTitle });
			setNewUpdatedTitle('')
			getMovieList();
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<>
			<Auth />
			<hr />
			<AddBook getMovieList={getMovieList} />
			<br />
			<div>
				{books.map(book => (
					<div
						key={book.createdDate}
						className="bg-gray-200 gap-2 w-fit px-4 py-2 rounded-md text-zinc-700 flex-g"
					>
						<div>
							<h1>Book Name: - {book.title}</h1>
							<h2>Publish Date: - {book.publishDate}</h2>
							<p
								className={` ${
									book.isNationalAwarded ? 'bg-green-600' : 'bg-red-400'
								} m-auto w-fit px-2 py-1 rounded`}
							>
								{book.isNationalAwarded ? 'Awarded' : 'No Achivement'}
							</p>
						</div>
						<div className="border-t-2 border-black flex justify-around">
							<button
								className="bg-red-400 rounded px-2 py-1"
								onClick={() => handleDelete(book.id)}
							>
								Delete{' '}
							</button>
							<button
								className="bg-blue-400 rounded px-3 py-1"
								onClick={() => handleEdit(book.id)}
								disabled={newUpdatedTitle === ''}
							>
								Edit{' '}
							</button>
						</div>
						<input
							type="text"
							placeholder="Type updated title"
							onChange={e => setNewUpdatedTitle(e.target.value)}
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
