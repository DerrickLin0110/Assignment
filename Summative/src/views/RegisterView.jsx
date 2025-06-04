import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";
import { auth, googleProvider } from "../firebase"; // 🔥 Make sure to configure this
import {
createUserWithEmailAndPassword,
signInWithPopup,
fetchSignInMethodsForEmail,
} from "firebase/auth";
import "./RegisterView.css";

function RegisterView() {
const { setEmail, setFName, setLName, genreList, setFGenre } = useStoreContext();
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();

const fName = e.target[0].value;
const lName = e.target[1].value;
const email = e.target[2].value;
const password1 = e.target[3].value;
const password2 = e.target[4].value;
const checkedGenres = [];
const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');

if (password1 !== password2) {
alert("Passwords do not match.");
return;
}

checkboxes.forEach(checkbox => {
if (checkbox.checked) {
checkedGenres.push(Number(checkbox.id));
}
});

if (checkedGenres.length < 5) {
alert("Please select at least 5 favorite genres.");
return;
}

try {
const methods = await fetchSignInMethodsForEmail(auth, email);
if (methods.length > 0) {
alert("This email is already registered.");
return;
}

await createUserWithEmailAndPassword(auth, email, password1);

// Set context
setFName(fName);
setLName(lName);
setEmail(email);
setFGenre(checkedGenres);

navigate(`/movies/genres/${checkedGenres[0]}`);
} catch (error) {
alert("Registration failed: " + error.message);
}
};

const handleGoogleRegister = async () => {
try {
const result = await signInWithPopup(auth, googleProvider);
const user = result.user;

const email = user.email;
const methods = await fetchSignInMethodsForEmail(auth, email);

if (methods.length > 0 && !methods.includes("google.com")) {
alert("This email is already registered with a different method.");
return;
}

setEmail(user.email);
setFName(user.displayName?.split(" ")[0] || "");
setLName(user.displayName?.split(" ")[1] || "");
alert("Google registration successful. Please choose your favorite genres.");

// Direct to genre selection (or build logic for collecting genre prefs after)
} catch (error) {
alert("Google Sign-In failed: " + error.message);
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
<input id="email" type="email" className="input" name="email" autoComplete="on" required />
<label htmlFor="1Password" className="inputLabel">Password</label>
<input id="1Password" type="password" className="input" name="1Password" required />
<label htmlFor="2Password" className="inputLabel">Re-enter Password</label>
<input id="2Password" type="password" className="input" name="2Password" required />
<p id="genreListTitle">Choose at least 5 of your favourite genres</p>
{genreList && genreList.map(genre => (
<div key={genre.id} className="checkboxGroup">
<input id={genre.id} type="checkbox" />
<label htmlFor={genre.id} className="inputLabel">{genre.genre}</label>
</div>
))}
<input id="submitButton" type="submit" value="Register" />
</form>
<hr />
<button id="googleButton" onClick={handleGoogleRegister}>Register with Google</button>
</div>
<Footer />
</div>
);
}

export default RegisterView;