import Header from "../components/header";
import Footer from "../components/footer";


function RegisterView() {
  return (
    <>
      <Header />
      <h2>Register</h2>
      <form>
        <input type="text" placeholder="First Name" /><br />
        <input type="text" placeholder="Last Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <input type="password" placeholder="Re-enter Password" /><br />
        <button type="submit">Register</button>
      </form>
      <Footer />
    </>
  );
}

export default RegisterView;