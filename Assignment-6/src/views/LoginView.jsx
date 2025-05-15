import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import "./LoginView.css";

function LoginView() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: email, 
        password: password
      });

      if (res.status === 200) {
        navigate('/movies');
      }
    } catch (err) {
      setError("Login failed: Invalid credentials");
    }
  };

  return (
    <div>
      <Header />
      <div id="lForm">
        <h1 id="lTitle">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="inputLabel">Username</label>
          <input id="email" type="text" className="input" name="email" required />
          
          <label htmlFor="password" className="inputLabel">Password</label>
          <input id="password" type="password" className="input" name="password" required />
          
          <input type="submit" value="Login" className="submitBtn"/>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default LoginView;
