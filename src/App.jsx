import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [textSearch, setTextSearch] = useState("");
  const [data, setData] = useState([]);

  const getTextSearch = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${textSearch}`
    );
    setData(result.data.items);
  };
  console.log(data);

  useEffect(() => {
    getTextSearch();
  }, [textSearch]);

  return (
    <div>
      <h1>Find a Book</h1>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setTextSearch(e.target.value);
          }}
        />
      </div>
      {data.map((item, index) => (
        <div key={index}>
          <ul>
            <li>{item.volumeInfo.title}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
