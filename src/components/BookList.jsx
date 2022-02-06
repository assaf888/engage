import React, { useEffect, useState } from 'react';
import bookData from '../bookData';

const BookList = () => {

    const [books, setBooks] = useState(bookData);
    const [book, setBook] = useState("");

    const onBookClick = (book) => {
        setBook(book);
    }

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        if (book.catalogNumber) {
            const bookListWithoutChangedBook = books.filter(listBook => listBook.catalogNumber !== book.catalogNumber)
            setBooks([...bookListWithoutChangedBook, book])

        }
        else {
            const newBook = { ...book, catalogNumber: Math.floor(100000000 + Math.random() * 900000000) };
            setBooks([...books, newBook])
        }
        setBook({
            "authorName": "",
            "bookName": "",
            "publicationDate": "",
            "coverPhoto": "",
            "catalogNumber": ""
        });
    }

    const onBookNameChange = (newName) => {
        setBook({ ...book, bookName: newName });
    }

    const onAuthorNameChange = (newAuthorName) => {
        debugger;
        setBook({ ...book, authorName: newAuthorName });
    }

    const onCatalogNumberChange = (newCatalogNumber) => {
        setBook({ ...book, catalogNumber: newCatalogNumber });
    }

    const onPublishDateChange = (newPublishDate) => {
        setBook({ ...book, publicationDate: newPublishDate });
    }
    
    const onCoverUrlChange = (newCoverUrl) => {
        setBook({ ...book, coverPhoto: newCoverUrl });
    }

    const handleSearch = (searchValue) => {
        const temp = bookData.filter(bookItem => bookItem.bookName.toLowerCase().includes(searchValue.toLowerCase()))
        setBooks(temp);
    }

    const handleDelete = (catalogNumber) => {
        debugger;
        setBooks(books.filter(bookItem => bookItem.catalogNumber !== catalogNumber));
    }

    return (
        <div className="wrapper">
            <div>
                <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
                <div className="book-list">
                    {
                        books.map((book, index) => (
                            <div>
                                <span className="book-preview" onClick={() => onBookClick(book)} key={index}>
                                    {book.bookName + ", "}
                                    {book.authorName}
                                </span>
                                <i className="deletebtn" onClick={() => handleDelete(book.catalogNumber)}>X</i>
                            </div>

                        ))
                    }
                </div>
            </div>

            <img src={book.coverPhoto} />
            <form className="bookForm" onSubmit={(e) => handleSubmit(e)}>
                <label>Book name
                    <input className="formInput" type="text" required value={book.bookName} onChange={(e) => onBookNameChange(e.target.value)}></input>
                </label>
                <label>Author name
                    <input className="formInput" type="text" required value={book.authorName} onChange={(e) => onAuthorNameChange(e.target.value)}></input>
                </label>
                <label>catalog Number
                    <input className="formInput" disabled type="text" value={book.catalogNumber} onChange={(e) => onCatalogNumberChange(e.target.value)}></input>
                </label>
                <label>Publish Date
                    <input className="formInput" type="number" min="0" max="2022" required value={book.publicationDate} onChange={(e) => onPublishDateChange(e.target.value)}></input>
                </label>
                <label>Cover URL
                    <input className="formInput" type="text" required value={book.coverPhoto} onChange={(e) => onCoverUrlChange(e.target.value)}></input>
                </label>
                <input className="formInput" type="submit" value="Submit" />
            </form>
        </div>);
}

export default BookList;