import React from 'react';

function LoginView() {
  return (
    <div className="login section">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required /><br/>
        <input type="password" placeholder="Password" required /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginView;
