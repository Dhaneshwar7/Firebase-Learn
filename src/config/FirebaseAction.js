import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { auth, db, googleProvider, storage } from './firebase';
import {
	getDocs,
	collection,
	deleteDoc,
	doc,
	updateDoc,
	addDoc,
} from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

/*  -----------Authentication Actions--------- */
/*  -----------Authentication Actions--------- */
export const asyncCurrentLoggedInUser = () => {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(
			auth,
			user => {
				if (user) {
					resolve(user);
				} else {
					resolve(null);
				}
			},
			reject
		);
	});
};

export const asyncSignInWithEmailandPassword = async formValues => {
	const { email, password } = formValues;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const handleSignInWithGoogle = async () => {
	return await signInWithPopup(auth, googleProvider);
};

export const handleSignOut = async () => {
	return await signOut(auth);
};

/*  -----------Books Actions--------- */
/*  -----------Books Actions--------- */
export const asynchandleBookFormSubmit = async bookData => {
	// console.log(bookData);
	const allBooksCollection = collection(db, 'books');
	try {
		if (!bookData.bookName == '' || !bookData.publishDate == '') {
			return await addDoc(allBooksCollection, bookData);
		}
	} catch (error) {
		console.error(error);
	}
};

export const asyncGetBooksData = async () => {
	const allBooksCollection = collection(db, 'books');
	try {
		//Read Book Data
		const data = await getDocs(allBooksCollection);
		return data.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));
	} catch (error) {
		console.error(error);
	}
};

export const asyncHandleEditBook = async (bookId, editedBookName) => {
	try {
		const bookDoc = await doc(db, 'books', bookId);
		return await updateDoc(bookDoc, { title: editedBookName });
	} catch (error) {
		console.error(error);
	}
};

export const asyncHandleDeleteBook = async bookId => {
	try {
		const bookDoc = doc(db, 'books', bookId);
		await deleteDoc(bookDoc);
	} catch (error) {
		console.error(error);
	}
};

export const handleUploadFile = async () => {
	if (!uploadFile) return null;
	const fileFolderRef = ref(storage, `booksImages/${uploadFile.name}`);
	try {
		await uploadBytes(fileFolderRef, uploadFile);
	} catch (error) {
		console.error(error);
	}
};
