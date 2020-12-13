
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)


  const notification = (msg) => {
    setMessage(msg)
    setTimeout(() =>{
      setMessage(null)
    }, 6000)
  }

  return (
    <div>
      <Notification message={message} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notification}
      />

    </div>
  )
}

export default App