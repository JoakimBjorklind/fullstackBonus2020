import { gql } from '@apollo/client'

// below an example base ...

/*export const ALL_PERSONS = gql`
  query {
    // ...
  }
`
export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    // ...
  }
`

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    // ...
  }
`*/

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name 
    born
    bookCount
  }
}
`
// leaving out genres, cuz the exercise said so...
export const ALL_BOOKS = gql`
query {
  allBooks {
    title 
    published
    author
    id
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $convertToIntPublished: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $convertToIntPublished,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`