import React from 'react';
import BookDetails from './BookDetails';

const BookContainer = ({ books, getBooksData }) => {
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg px-32 rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-16 py-3">
							<span className="sr-only">Image</span>
						</th>
						<th scope="col" className="px-6 py-3">
							Book Name
						</th>
						<th scope="col" className="px-6 py-3">
							Awarded / Achivement
						</th>
						<th scope="col" className="px-6 py-3">
							Date
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{books &&
						books?.map(book => (
							<BookDetails
								book={book}
								key={book.createdDate}
								getBooksData={getBooksData}
							/>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default BookContainer;
