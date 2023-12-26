import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [bookName, setBookName] = useState([]);

  const getBookName = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
    );
    setBookName(result.data.items);
  };
  console.log(bookName);

  useEffect(() => {
    getBookName();
  }, [searchText]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />
      <ul>
        {bookName.map((item) => (
          <li key={item.id}>{item.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
