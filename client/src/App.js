import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
// apollo client server 

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>

    <div id="main">
      <h1>GraphQL Book List</h1>
      <BookList />
      <AddBook />
    </div>
    </ApolloProvider>

  );
}

export default App;
