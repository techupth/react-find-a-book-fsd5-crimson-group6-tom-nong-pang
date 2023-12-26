import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  // console.log("books :>> ", books);

  const [input, setInput] = useState("");
  // console.log("input :>> ", input);

  const getBooks = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${input}`
      );
      setBooks(result.data.items);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  useEffect(() => {
    if (input) {
      getBooks();
    } else {
      setBooks([]);
    }
  }, [input]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" value={input} onChange={handleInputChange} />
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
