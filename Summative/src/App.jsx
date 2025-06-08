import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./Context";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ErrorView from "./views/ErrorView";
import DetailView from "./views/DetailView";
import MoviesView from "./views/MoviesView";
import GenreView from "./views/GenreView";
import CartView from "./views/CartView";
import SettingsView from "./views/SettingView";
import SearchView from "./views/SearchView";
import ProtectedRoutes from './views/ProtectedRoutes';

function App() {

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/movies" element={<MoviesView />} >
              <Route path="genres/:genre_id" element={<GenreView />} />
              <Route path="details/:id" element={<DetailView />} />
              <Route path="search/:search_id" element={<SearchView />} />
            </Route>
            <Route path="settings" element={<SettingsView />} />
            <Route path="cart" element={<CartView />} />
          </Route>
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App