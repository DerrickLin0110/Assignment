import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Genres from '../components/Genres';

const genreList = [
  { genre: 'Action', id: 28 },
  { genre: 'Crime', id: 80 },
  { genre: 'History', id: 36 },
  { genre: 'Sci-Fi', id: 878 },
  { genre: 'Adventure', id: 12 },
  { genre: 'Family', id: 10751 },
  { genre: 'Horror', id: 27 },
  { genre: 'War', id: 10752 },
  { genre: 'Animation', id: 16 },
  { genre: 'Fantasy', id: 14 }
];

const MoviesView = () => {
  return (
    <div>
      <Header />
      <div className="movies-layout">
        <Genres genres={genreList} />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MoviesView;