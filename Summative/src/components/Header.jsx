import "./style.css";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../Context";

function Header() {
  const navigate = useNavigate();
  const { fName, setSearch, email, setEmail } = useStoreContext();

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const sendRequest = useCallback((value) => {
    setSearch(value);
    navigate("/movies/search");
  }, [navigate, setSearch]);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 500);
  }, [sendRequest]);

  const onChange = (e) => {
    debouncedSendRequest(e.target.value);
  };

  return (
    <header className="header section">
      <div className="logo">
        <h1>StreamFix</h1>
      </div>

      {email ? (
        <div className="user-controls">
          <h2 className="welcome">Hi {fName}!</h2>
          <button className="headerButtons" onClick={() => navigate("/cart")}>Cart</button>
          <button className="headerButtons" onClick={() => navigate("/settings")}>Settings</button>
          <button className="headerButtons" onClick={() => { setEmail(null); navigate("/"); }}>Logout</button>
          <input
            type="text"
            id="searchBar"
            placeholder="Search Movies Here"
            onChange={onChange}
          />
        </div>
      ) : (
        <div className="button">
          <button className="LoginBtm" onClick={() => navigate("/login")}>Log in</button>
          <button className="Register" onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </header>
  );
}

export default Header;
