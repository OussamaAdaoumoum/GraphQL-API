import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";

function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.BookId }, // Assuming props.BookId contains the book ID
  });

  if (loading) {
    console.log("loaaaaaaading");
    return <p>Loading...</p>;
  }
  if (error) return null; //<p>Error : {error.message}</p>;

  console.log("props is: " + props.BookId);
  return (
    <>
      <div id="book-details">
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>{data.book.author.age}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
