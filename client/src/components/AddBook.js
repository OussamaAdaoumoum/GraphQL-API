import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation,
} from "../queries/queries";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [addBook, { data, loading, error }] = useMutation(addBookMutation);
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
  } = useQuery(getAuthorsQuery);

  if (queryLoading) {
    console.log("loading");
    return <option disabled>Loading...</option>;
  }
  if (queryError) return <p>Error: {queryError.message}</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
  };

  return (
    <>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            {queryData.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button>+</button>
      </form>
    </>
  );
}

export default AddBook;
