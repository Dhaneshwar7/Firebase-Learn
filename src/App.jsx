import './App.css';
import { useEffect, useState } from 'react';
import {
	asyncCurrentLoggedInUser,
	asyncGetBooksData,
} from './config/FirebaseAction';
import { AddBookForm, Auth, BookContainer, UserProfile } from './components';

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [books, setBooks] = useState(null);

	const fetchCurrentUser = async () => {
		const user = await asyncCurrentLoggedInUser();
		if (user) {
			setCurrentUser(user);
		} else {
			setCurrentUser(null);
		}
		// console.log(user);
	};
	useEffect(() => {
		fetchCurrentUser();
	}, [currentUser]);

	const getBooksData = async () => {
		const data = await asyncGetBooksData();
		if (data) {
			setBooks(data);
		}
		console.log(data);
	};
	useEffect(() => {
		getBooksData();
	}, []);

	return (
		<>
			{currentUser ? (
				<div className="flex items-center justify-center max-w-screen ">
					<AddBookForm getBooksData={getBooksData} currentUser={currentUser} />
					<UserProfile
						fetchCurrentUser={fetchCurrentUser}
						currentUser={currentUser}
					/>
				</div>
			) : (
				<Auth
					setCurrentUser={setCurrentUser}
					fetchCurrentUser={fetchCurrentUser}
				/>
			)}
			<hr />
			<br />
			<BookContainer
				currentUser={currentUser}
				getBooksData={getBooksData}
				books={books}
			/>
		</>
	);
}
export default App;
