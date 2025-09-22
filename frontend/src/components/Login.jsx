import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ toggle }) {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://airbnc-b4cu.onrender.com/api/users").then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    toggle();
    navigate("/dashboard");
  }

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={toggle}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            User Email:
            <input
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
