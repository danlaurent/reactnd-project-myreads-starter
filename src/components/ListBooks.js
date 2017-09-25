import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ListBooks = ({ books, currentlyReading, wantToRead, read, onShelfChange }) => {

  const bookShelves = [
    { title: 'Currently Reading', value: 'currentlyReading', books: currentlyReading },
    { title: 'Want to Read', value: 'wantToRead', books: wantToRead },
    { title: 'Read', value: 'read', books: read }
  ]

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map(shelf => (
            <Bookshelf title={shelf.title} value={shelf.value} key={shelf.title} books={shelf.books} onShelfChange={onShelfChange} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array,
  currentlyReading: PropTypes.array,
  wantToRead: PropTypes.array,
  read: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired
}

export default ListBooks