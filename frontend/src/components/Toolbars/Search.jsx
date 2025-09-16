import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}`);
  }
  return (
    <div id="search-form">
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
    </div>
  );
}
