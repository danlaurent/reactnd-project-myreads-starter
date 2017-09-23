import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  render() {
    const { searchResult, searchQuery } = this.props
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
            <input
              type="text"
              placeholder="Search by title or author and press enter"
              onKeyPress={(e) => { searchQuery(e, e.target.value) }}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult.map(book => (
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

export default SearchBooks