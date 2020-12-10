// This did not work!!!!

/*import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  //const [name, setName] = useState('')
  //const [born, setBorn] = useState('')
  const [selectAuthor, setSelectAuthor] =useState(authors[0])

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS} ]
    
   
  })

  const submit = async (event) => {
    event.preventDefault()
    //const bornToInt = Number(born)

    await updateAuthor({
        variables: { name: selectAuthor, bornToInt: Number(event.target.born.value) }
      })
    //setName('')
    //setBorn('')
  
    }
    return (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              <select>
                value={selectAuthor}
                onChange={( event ) => setSelectAuthor(event.target.value)}>
                {authors.map(author => 
                  <option> key={author.id} value={author.name}>{author.name} </option>
                  )}
                </select>
            </div>
            <div>
              born <input
                name ='born'
              />
              </div>
            <button type='submit'>update author</button>
          </form>
        </div>
      )
    }



export default AuthorForm
*/