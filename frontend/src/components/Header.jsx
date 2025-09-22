import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Header({ title }) {
  const [popup, setPopup] = useState(false);

  function togglePopup() {
    setPopup((currentPopup) => !currentPopup);
  }

  return (
    <div id="header">
      <Link to="/">
        <h1>{title}</h1>
      </Link>
      <button onClick={togglePopup}>Log In</button>
      {popup ? <Login toggle={togglePopup} /> : null}
    </div>
  );
}
