import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;


const getBookQuery = gql`
  query Book($id: ID!){
    book(id: $id ){
      name
      genre
      author{
        name
        age
        books{
          name
          genre
        }
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

// const addBookMutation = gql`
//   {
//     mutation {
//       addBook(name: "", genre: "", authorId: "") {
//         name
//         id
//       }
//     }
//   }
// `;
const addBookMutation = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };
