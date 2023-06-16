const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "The small Business", genre: "Sci-Fi", id: "3", authorId: "2" },
];

var authors = [
  { name: "ahmed chawki", age: 32, id: "1" },
  { name: "oussama Adm", age: 41, id: "2" },
  { name: "redone", age: 39, id: "3" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({ // we wrap this fields inside a function, because the function not gonna be executed until we see all the things on thif file, so she don't gonna generate an error if we calling something that we gonna define later in this file 
    id: { type: GraphQLID }, // you can specify this ID as a string, or also you can work with it as an ID
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // for example, the parent here is the book itself, because we nested the author in the book
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID }, // you can specify this ID as a string, or also you can work with it as an ID
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return _.filter(books, {authorId: parent.id})
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // the main role of the resolve function is to grap data based on a specific args
        // code to get data from db / other source
        // the id here is a string, even if we work with GraphQLID and we passed an integer as an id, but here we gonna find that the id is a string / u an verify with "console.log(typeof(args.id))"
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // the id here is a string, even if we work with GraphQLID and we passed an integer as an id, but here we gonna find that the id is a string / u an verify with "console.log(typeof(args.id))"
        return _.find(authors, { id: args.id });
      },
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books; // and graphQL gonna handle it, if the user want just the name or he want other fields 
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors;
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
