import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useStoreContext } from "../Context"; // You missed this in the full version
import "./LoginView.css";

function LoginView() {
  const { setUser } = useStoreContext(); // ADD THIS
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [googleProcessing, setGoogleProcessing] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    console.log("Trying to login with:", email);

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      console.log("Available sign-in methods:", methods);

      if (!methods || methods.length === 0) {
        setError("This email is not registered. Please register first.");
        return;
      }

      if (!methods.includes("password")) {
        setError(
          "This email is registered with Google. Please use Google sign-in."
        );
        return;
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user); // Set user in global context
      navigate("/movies");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Login failed: Invalid credentials or an error occurred.");
    }
  };

  const googleSignIn = async () => {
    setGoogleProcessing(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set user in global context
      navigate("/movies");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      if (error.code === "auth/account-exists-with-different-credential") {
        setError(
          "This email is already registered with a different sign-in method."
        );
      } else {
        setError(`Google sign-in error: ${error.message}`);
      }
    } finally {
      setGoogleProcessing(false);
    }
  };

  return (
    <div>
      <Header />
      <div id="lForm">
        <h1 id="lTitle">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="inputLabel">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="inputLabel">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Login" className="submitBtn" />
        </form>

        <button
          onClick={googleSignIn}
          className="googleSigninBtn"
          disabled={googleProcessing}
          style={{ marginTop: "1rem" }}
        >
          <img src="googleIcon.png" className="googleIcon" alt="Google Icon" />
          {googleProcessing ? "Processing..." : "Sign in with Google"}
        </button>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default LoginView;
