import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import MoviesView from './views/MoviesView';
import GenreView from './views/GenreView';
import DetailView from './views/DetailView';
import ErrorView from './views/ErrorView';
import { ROUTES } from './constants/paths';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomeView />} />
        <Route path={ROUTES.LOGIN} element={<LoginView />} />
        <Route path={ROUTES.REGISTER} element={<RegisterView />} />
        <Route path={ROUTES.MOVIES} element={<MoviesView />}>
          <Route path="genre/:genre_id" element={<GenreView />} />
          <Route path="details/:id" element={<DetailView />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<ErrorView />} />
      </Routes>
    </Router>
  );
}

export default App;
