import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'
import { Debounce } from 'react-throttle'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResult: [],
      noResults: false
    }
  }

  searchQuery = (query) => {
    if(query) {
      BooksAPI.search(query).then((books) => {
        const shelfBooks = this.props.books
        books.map(book => {
          let myBooks = shelfBooks.filter(_ => _.id === book.id)
          if (myBooks.length > 0) {
            myBooks.map(myBook => (
              book.shelf = myBook.shelf
            ))
          } else if (book.shelf === undefined) {
            book.shelf = "none"
          }
          return myBooks
        })
        this.setState({
          searchResult: books,
          noResults: false
        })
      }).catch(err => {
        this.setState({
          searchResult: [],
          noResults: true
        })
      })
    } else {
      this.setState({
        searchResult: [],
        noResults: false
      })
    }
  }

  render() {
    const { searchResult, noResults } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => { this.searchQuery(e.target.value) }}
              />
            </Debounce>

          </div>
        </div>
        <div className="search-books-results">
          {noResults === true && (
            <small className="no-results">No results found</small>
          )}
          <ol className="books-grid">
            {searchResult.map(book => (
              <Book
                key={book.id}
                book={book}
                onShelfChange={this.props.onShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  books: PropTypes.array.isRequired,
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default SearchBooks