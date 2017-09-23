import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'


class Bookshelf extends Component {

  render() {
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                book={book}
                title={book.title}
                subtitle={book.subtitle}
                shelf={book.shelf}
                authors={book.authors}
                image={book.imageLinks.smallThumbnail}
                onShelfChange={this.props.onShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Bookshelf