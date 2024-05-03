import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import AllTopRatedMovies from "./Pages/AllTopRatedMovies";
import AllNowPlayingMovies from "./Pages/AllNowPlayingMovies";
import MovieDetail from "./Pages/MovieDetail";
import Login from "./Pages/Login";
import GoogleLogin from "./Pages/GoogleLogin";
import AllPopularMovies from "./Pages/AllPopularMovies";
import AllUpcomingMovies from "./Pages/AllUpcomingMovies";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google" element={<GoogleLogin />} />
        <Route path="/register" element={<Register />} />
        {/* Melindungi rute-rute yang memerlukan login */}
        <Route path="/all-top-rated" element={<AllTopRatedMovies />} />
        <Route path="/all-now-playing" element={<AllNowPlayingMovies />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="/all-popular-movies" element={<AllPopularMovies />} />
        <Route path="/all-upcoming-movies" element={<AllUpcomingMovies />} />
      </Routes>
    </Router>
  );
}

export default App;
