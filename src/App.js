import React from 'react'
import { Route } from 'react-router-dom'
import './styles/App.css'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
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
      let updatedBooks = []
      const addedBook = this.state.books.filter(_ => _.id === book.id)
      if (addedBook.length === 0) {
        updatedBooks = this.state.currentlyReading.concat(this.state.wantToRead, this.state.read)
        updatedBooks.push(book)
      } else {
        updatedBooks = this.state.currentlyReading.concat(this.state.wantToRead, this.state.read)
      }
      this.setState({
        books: updatedBooks,
        currentlyReading: updatedBooks.filter(b => b.shelf === 'currentlyReading'),
        wantToRead: updatedBooks.filter(b => b.shelf === 'wantToRead'),
        read: updatedBooks.filter(b => b.shelf === 'read')
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            onShelfChange={this.onShelfChange}
          />
        )}
        />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            searchResult={this.state.searchResult}
            onShelfChange={(book, shelf) => {
              this.onShelfChange(book, shelf)
              history.push('/')
            }
            }
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
