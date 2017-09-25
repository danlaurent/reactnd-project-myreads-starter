import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Bookshelf = ({ title, value, books, onShelfChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <Book
            key={book.id}
            book={book}
            onShelfChange={onShelfChange}
          />
        ))}
      </ol>
    </div>
  </div>
)

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Bookshelf