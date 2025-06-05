import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import "./RegisterView.css";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    fetchSignInMethodsForEmail
} from 'firebase/auth';
import { auth } from '../firebase';

function RegisterView() {
    const { genreList, setFGenre, setFName, setLName, setEmail, setUser } = useStoreContext();
    const [checkedGenres, setCheckedGenres] = useState([]);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    });
    const [googleProcessing, setGoogleProcessing] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleChecked = (e) => {
        const genreId = e.target.id;
        if (e.target.checked) {
            setCheckedGenres(prev => [...prev, genreId]);
        } else {
            setCheckedGenres(prev => prev.filter(id => id !== genreId));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.password2) {
            alert("Passwords do not match.");
            return;
        }

        if (checkedGenres.length < 5) {
            alert("Please select at least 5 favorite genres.");
            return;
        }

        try {
            // Check if email is already registered
            const methods = await fetchSignInMethodsForEmail(auth, form.email);
            if (methods && methods.length > 0) {
                alert("This email is already registered.");
                return;
            }

            const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
            setUser(result.user);

            // Update user profile with name
            await updateProfile(result.user, {
                displayName: `${form.firstName} ${form.lastName}`
            });

            // Set context values
            setFName(form.firstName);
            setLName(form.lastName);
            setEmail(form.email);
            setFGenre(checkedGenres);

            navigate(`/movies/genres/${checkedGenres[0]}`);
        } catch (error) {
            alert(`Error creating user: ${error.message}`);
        }
    };

    const googleSignIn = async () => {
        if (checkedGenres.length < 5) {
            alert("Please select at least 5 favorite genres.");
            return;
        }

        setGoogleProcessing(true);
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user is new
            if (result._tokenResponse.isNewUser) {
                // Set context values
                const nameParts = user.displayName?.split(" ") || ["", ""];
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(" ") || "User";

                setFName(firstName);
                setLName(lastName);
                setEmail(user.email);
                setFGenre(checkedGenres);
                setUser(user);

                navigate(`/movies/genres/${checkedGenres[0]}`);
            } else {
                // Existing user
                alert("You already have an account. Please sign in instead.");
                navigate('/login');
            }
        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                alert("This email is already registered with another method.");
            } else {
                alert(`Google sign-in error: ${error.message}`);
            }
        } finally {
            setGoogleProcessing(false);
        }
    };

    return (
        <div>
            <Header />
            <div id="rForm" >
                <h1 id="rTitle">Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName" className="inputLabel">First Name</label>

                    <input
                        id="firstName"
                        type="text"
                        className="input"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="lasttName" className="inputLabel">Last Name</label>

                    <input
                        id="lastName"
                        type="text"
                        className="input"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                              <label htmlFor="email" className="inputLabel">Email</label>

                    <input
                        id="email"
                        type="email"
                        className="input"
                        name="email"
                        autoComplete="on"
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
                              <label htmlFor="reenterpassword" className="inputLabel">Re-Enter Password</label>

                    <input
                        id="password2"
                        type="password"
                        className="input"
                        name="password2"
                        value={form.password2}
                        onChange={handleChange}
                        required
                    />
                    <p id="genresTitle">Choose at least 5 of genres you want to see</p>
                    {genreList && genreList.map(genre => (
                        <div key={genre.id} className="checkboxGroup">
                            <input
                                id={String(genre.id)}
                                type="checkbox"
                                checked={checkedGenres.includes(String(genre.id))}
                                onChange={handleChecked}
                            />
                            <label htmlFor={String(genre.id)} className="inputLabel">{genre.genre}</label>
                        </div>
                    ))}
                    <input
                        id="submitButton"
                        type="submit"
                        value="Register"
                        disabled={googleProcessing}
                    />
                </form>
                <button
                    onClick={googleSignIn}
                    className="googleSigninBtn"
                    disabled={googleProcessing}
                >
                    <img src="googleIcon.png" className="googleIcon" alt="Google Icon"></img>
                    {googleProcessing ? "Processing..." : "Register with Google"}
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterView;
