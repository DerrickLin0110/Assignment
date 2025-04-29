import React from 'react';
import Header from '../components/Header';
import Genres from '../components/Genres';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const genreList = [
  { genre: 'Action', id: 28 },
  { genre: 'Adventure', id: 12 },
  { genre: 'Animation', id: 16 },
  { genre: 'Crime', id: 80 },
  { genre: 'Family', id: 10751 },
  { genre: 'Fantasy', id: 14 },
  { genre: 'History', id: 36 },
  { genre: 'Horror', id: 27 },
  { genre: 'Mystery', id: 9648 },
  { genre: 'Sci-Fi', id: 878 },
  { genre: 'War', id: 10752 },
  { genre: 'Western', id: 37 }
];

function MoviesView() {
  return (
    <>
      <Header />
      <Genres genres={genreList} />
      <Outlet />
      <Footer />
    </>
  );
}

export default MoviesView;
