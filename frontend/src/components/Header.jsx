import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <div id="header">
      <Link to="/">
        <h1>{title}</h1>
      </Link>
      <button>Log In</button>
    </div>
  );
}
