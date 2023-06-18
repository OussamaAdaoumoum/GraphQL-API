
import { getBookQuery } from "../queries/queries";
import { useQuery } from '@apollo/client';





function BookDetails(props){

    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id: props.BookId }, // Assuming props.BookId contains the book ID
      });
    
    
    
    if (loading) { console.log("loaaaaaaading"); return <p>Loading...</p>;}
    if (error) return null;//<p>Error : {error.message}</p>;

    console.log('props is: '+ props.BookId);
    return(<>
        <div id="book-details">
            <p>the book details</p>
            <p>name: {data.book.name}</p>
            <p>name: {data.book.genre}</p>
            <p>name: {data.book.author.name}</p>

        </div>

    </>);
}

export default BookDetails;