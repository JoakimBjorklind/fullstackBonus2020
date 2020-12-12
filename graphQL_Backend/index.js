const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: String!
    authorCount: String!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => Book.find({}).populate('author'),
    /*allBooks: (root, args) => {
      if(!args.author && !args.genre) {
       return books
      }
      else if (args.genre) {
        return books.filter(boo => boo.genres.includes(args.genre))
      }
      else {
        return books.filter(boo => boo.author === args.author)
      }
      },*/

    //allAuthors: () => authors
    allAuthors: () => Author.find({}) 
  },
  /*Author: {
    bookCount: (root) => {
      return books.filter(boo => boo.author === root.name).length
    }
  },*/
  Author: {
    bookCount: async (root) => {
      const kirjaLaskuri = await Book.find({ author: root.id }).populate('author')
      return kirjaLaskuri.filter(boo => boo.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      /*const authorExist = authors.find(aut => aut.name === args.author)
      if(!authorExist) {
        const authorAdd = {
          name: args.author,
        }
        authors = authors.concat(authorAdd)
      }*/

      //const book = { ...args, id: uuid()}
      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = new Author({ name: args.author })
      }
      //books = books.concat(book)
      //return book

      const book = new Book({ ...args, author: author })
      //author.bookCount = author.bookCount+1
      await author.save()
      return book.save()
    },
    editAuthor: async (root, args) => {
      //const author = authors.find(aut => aut.name === args.name)
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      /*const editedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(aut => aut.name === args.name ? editedAuthor : aut)
      return editedAuthor*/
      author.born = args.setBornTo
      await author.save()
      return author
    }  
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})