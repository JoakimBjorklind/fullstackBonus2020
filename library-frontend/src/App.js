
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('libraries-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }


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
        {token
          ? <>
              <button onClick={() => setPage('add')}>add Book</button>
              <button onClick={logout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
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
      {token
        ? null
        :
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notification}
          setPage={setPage}
        />
      }

    </div>
  )
}

export default App