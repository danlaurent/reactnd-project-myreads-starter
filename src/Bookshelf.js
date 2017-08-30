import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

    render() {
        const books = this.props.books

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <li key={book.id}>
                            <Book title={book.title} subtitle={book.subtitle} shelf={book.shelf} authors={book.authors} image={book.imageLinks.smallThumbnail} />
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf