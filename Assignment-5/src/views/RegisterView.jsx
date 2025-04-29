import React from 'react';

function RegisterView() {
  return (
    <div className="register section">
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="First Name" required /><br/>
        <input type="text" placeholder="Last Name" required /><br/>
        <input type="email" placeholder="Email" required /><br/>
        <input type="password" placeholder="Password" required /><br/>
        <input type="password" placeholder="Re-enter Password" required /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterView;
