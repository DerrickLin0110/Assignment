import Header from './components/Header';
import Footer from './components/Footer';
import Genres from './components/Genres';
import { Outlet } from 'react-router-dom';

function MoviesView() {
  return (
    <>
      <Header />
      <Genres />
      <Outlet />
      <Footer />
    </>
  );
}

export default MoviesView;