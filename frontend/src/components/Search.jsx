import { useState } from "react";

export default function Search({ setSearchTerm }) {
  const [newSearchTerm, setNewSearchTerm] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setSearchTerm(newSearchTerm);
  }

  return (
    <div id="search-form">
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search"
          onChange={(e) => setNewSearchTerm(e.target.value)}
        />

        <button>Search</button>
      </form>
    </div>
  );
}
