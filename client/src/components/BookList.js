import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

export default function BookList() {
  const [bookId, setBookId] = useState();

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) {
    console.log("loaaaaaaading");
    return <p>Loading...</p>;
  }
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <diV>
        <ul id="book-list">
          {data.books.map((book) => (
            <li key={book.id} onClick={(e) => setBookId(book.id)}>
              {book.name}
            </li>
          ))}
        </ul>

        <BookDetails BookId={bookId} />
      </diV>
    </>
  );
}
