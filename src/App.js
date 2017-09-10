import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks />
          )} 
          />
          <Route path="/search" render={() => (
            <SearchBooks />
          )}
          />
      </div>
    )
  }
}

export default BooksApp
