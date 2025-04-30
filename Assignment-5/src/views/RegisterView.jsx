import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import "./RegisterView.css";

function RegisterView() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (p1 !== p2) {
      setShowError(true);
      return;
    }

    const user = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: p1
    };

    try {
      const res = await axios.post("https://dummyjson.com/users/add", user); // dummyjson注册模拟
      if (res.status === 200 || res.status === 201) {
        navigate("/movies");
      }
    } catch (err) {
      setApiError("Failed to register user");
    }
  };

  return (
    <div>
      <Header />
      <div id="rForm">
        <h1 id="rTitle">Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="inputLabel">First Name</label>
          <input id="firstName" type="text" className="input" name="firstName" required />
          
          <label htmlFor="lastName" className="inputLabel">Last Name</label>
          <input id="lastName" type="text" className="input" name="lastName" required />
          
          <label htmlFor="email" className="inputLabel">Email</label>
          <input id="email" type="email" className="input" name="email" required />
          
          <label htmlFor="1Password" className="inputLabel">Password</label>
          <input 
            id="1Password" 
            type="password" 
            className="input" 
            name="1Password" 
            onChange={e => setP1(e.target.value)} 
            required 
          />
          
          <label htmlFor="2Password" className="inputLabel">Re-enter Password</label>
          <input 
            id="2Password" 
            type="password" 
            className="input" 
            name="2Password" 
            onChange={e => setP2(e.target.value)} 
            required 
          />
          
          <input type="submit" value="Register" className="submitBtn" />
        </form>

        {showError && <h2 id="errorM">Passwords do not match</h2>}
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default RegisterView;
