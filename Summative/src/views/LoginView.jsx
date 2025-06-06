import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./LoginView.css";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, } from '../firebase'
// 
function LoginView() {
  const navigate = useNavigate();
  const { setUser, setEmail } = useStoreContext(); // Add setEmail
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const result = await signInWithEmailAndPassword(auth, form.email, form.password);
          setUser(result.user);
          setEmail(result.user.email); // Update email in context
          navigate("/movies"); // Redirect to MoviesView
      } catch (error) {
          console.error("Login error:", error);
          alert("Login error");
      }
  };

  const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      try {
          const result = await signInWithPopup(auth, provider);
          setUser(result.user);
          setEmail(result.user.email); // Update email in context
          navigate("/movies"); // Redirect to MoviesView
      } catch (error) {
          console.error("Google sign-in error:", error);
          alert("Google sign-in error");
      }
  };

  return (
      <div>
          <Header />
          <div id="lForm">
              <h1 id="lTitle">Login</h1>
              <form onSubmit={handleSubmit}>
                  <input id="email" type="email" className="input" name="email" placeholder="Email" autoComplete="on" onChange={handleChange} required />
                  <input id="password" type="password" className="input" name="password" placeholder="Password" onChange={handleChange} required />
                  <input id="loginButton" type="submit" value="Login" />
              </form>
              <button onClick={googleSignIn} className="googleSigninBtn"><img src="googleIcon.png" className="googleIcon"></img> Google Sign In</button>
          </div>
          <Footer />
      </div>
  );
}

export default LoginView;
   