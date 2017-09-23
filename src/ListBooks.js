import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


class ListBooks extends Component {

  render() {
    const bookShelves = [
      { title: 'Currently Reading', value: 'currentlyReading', books: this.props.currentlyReading },
      { title: 'Want to Read', value: 'wantToRead', books: this.props.wantToRead },
      { title: 'Read', value: 'read', books: this.props.read }
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelves.map(shelf => (
              <Bookshelf title={shelf.title} value={shelf.value} key={shelf.title} books={shelf.books} onShelfChange={this.props.onShelfChange} />
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

ListBooks.propTypes = {
  books: PropTypes.array,
  currentlyReading: PropTypes.array,
  wantToRead: PropTypes.array,
  read: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired
}

export default ListBooks