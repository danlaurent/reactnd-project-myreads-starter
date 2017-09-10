import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            let readingBooks = books.filter(b => b.shelf === 'currentlyReading')
            let wantBooks = books.filter(b => b.shelf === 'wantToRead')
            let readBooks = books.filter(b => b.shelf === 'read')
            this.setState({
                books: books,
                currentlyReading: readingBooks,
                wantToRead: wantBooks,
                read: readBooks
            })
        })
    }

    onShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            book.shelf = shelf
            const updatedBooks = this.state.currentlyReading.concat(this.state.wantToRead, this.state.read)
            this.setState({
                books: updatedBooks,
                currentlyReading: updatedBooks.filter(b => b.shelf === 'currentlyReading'),
                wantToRead: updatedBooks.filter(b => b.shelf === 'wantToRead'),
                read: updatedBooks.filter(b => b.shelf === 'read')
            })
        })
    }

    render() {
        const bookShelves = [
            {title: 'Currently Reading', value: 'currentlyReading', books: this.state.currentlyReading},
            {title: 'Want to Read', value: 'wantToRead', books: this.state.wantToRead},
            {title: 'Read', value: 'read', books: this.state.read}
        ]
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {bookShelves.map(shelf => (
                            <Bookshelf title={shelf.title} value={shelf.value} key={shelf.title} books={shelf.books} onShelfChange={this.onShelfChange}/>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks