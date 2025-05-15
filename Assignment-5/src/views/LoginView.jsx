import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./LoginView.css";

function LoginView() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/movies/genres/28');
    };

    return (
        <div>
            <Header />
            <div id="lForm">
                <h1 id="lTitle">Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="inputLabel">Email</label>
                    <input id="email" type="email" className="input" name="email" autoComplete="on" required />
                    <label htmlFor="password" className="inputLabel">Password</label>
                    <input id="password" type="password" className="input" name="password" required />
                    <input type="submit" id="submitBtn" value="Login" />
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default LoginView;