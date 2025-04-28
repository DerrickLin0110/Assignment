import { useNavigate } from 'react-router-dom';
import './style.css';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header section">
      <h1>StreamFix</h1>
      <button className="headerButtons" onClick={() => navigate('/login')}>Login</button>
      <button className="headerButtons" onClick={() => navigate('/register')}>Register</button>
    </div>
  );
}

export default Header;
