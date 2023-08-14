import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../Assets/Logo.png";

function HomePage() {
  const [bookList, setBookList] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: { Authorization: "whatever-you-want" },
          }
        );
        const data = await response.json();
        setBookList(data.books);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBooks();
  }, []);

  const filteredBooks = bookList.filter((book) => {
    if (Search === "") {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.includes(Search.toLowerCase());
  });

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-between content-center items-center px-10 py-7 max-w-screen bg-gray-700 shadow-md">
        <img className="w-54" src={Logo} alt="Logo" />
        <div className="flex items-center shadow-xl">
          <input
            className="w-full md:w-96 h-10 bg-white pl-4 outline-none rounded-l"
            type="text"
            placeholder="Search books"
            onKeyPress={handleSearchKeyPress}
          />
          <div className="w-16 h-10 rounded-r bg-green-300 text-center flex items-center justify-center">
            <SearchIcon />
          </div>
        </div>
        <NavLink to="/register">
          <button className="px-4 py-2 bg-green-500 rounded text-white font-semibold">
            Register
          </button>
        </NavLink>
      </div>
      <div className="flex flex-wrap justify-center items-center px-5 mt-10">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-md p-4 m-4 w-64 h-80 hover:bg-gray-100"
          >
            <div className="h-40 flex justify-center items-center mb-4">
              <img
                src={book.imageLinks.thumbnail}
                alt={book.title}
                className="h-full rounded-md"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-lg font-medium text-gray-800 mb-2">
                {book.title}
              </p>
              <p className="text-sm text-gray-500">{book.authors.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
