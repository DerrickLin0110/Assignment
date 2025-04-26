import Header from '../components/header';
import Footer from '../components/footer';

function LoginView() {
  return (
    <>
      <Header />
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
      <Footer />
    </>
  );
}

export default LoginView;