import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  getTopMovies,
  selectMovie,
} from "../redux/actions/topActions";
import {
  setCurrentPage,
  setQuery,
  setSortBy,
  setTopMovies,
} from "../redux/reducers/topReducers";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const renderRatingStars = (rating) => {
    const stars = [];
    const numStars = Math.round(rating / 2);
    for (let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  const handleClick = () => {
    navigate("/movie-detail", { state: { id: movie.id } });
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      onClick={handleClick}
    >
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-2 text-white">{movie.title}</h2>
        <p className="text-gray-300">Release date: {movie.release_date}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {renderRatingStars(movie.vote_average)}
            <span className="text-white ml-1">
              {movie?.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllTopRatedMovies = () => {
  const currentPage = useSelector((state) => state.top.currentPage);
  const query = useSelector((state) => state.top.query);
  const sortBy = useSelector((state) => state.top.sortBy);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari React Redux
  const movies = useSelector((state) => state.top.movies);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getTopMovies(1));
    if (!token) navigate("/login");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    dispatch(searchMovies(query, 1));
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      dispatch(getTopMovies(1));
    }
    dispatch(setQuery(e.target.value));
  };

  const loadMore = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const renderMovies = () => {
    let sortedMovies = [...movies];

    if (sortBy === "vote_average.desc") {
      // Lakukan sorting berdasarkan rating film secara menurun
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === "vote_average.asc") {
      // Lakukan sorting berdasarkan rating film secara menaik
      sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
    }

    return query.length >= 3 && movies.length !== 0 ? movies : sortedMovies;
  };

  return (
    <div className="bg-red-800">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="mb-40"></div>
        <div className="flex justify-between items-center mb-6">
          <div className="">
            <form onSubmit={handleSubmit} className="flex justify-start">
              <input
                type="text"
                placeholder="Search Movie"
                value={query}
                onChange={handleChange}
                className="rounded-xl h-8 bg-[#3a3333] text-white w-96 px-2"
              />
              <button
                type="submit"
                className="bg-orange-400 px-2 py-1 rounded-lg ml-2 text-white"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex items-center">
            <label className="text-white mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-900 text-white border border-gray-700 rounded-md px-2 py-1"
            >
              <option value="select">SELECT</option>
              <option value="vote_average.desc">Top Rated Descending</option>
              <option value="vote_average.asc">Top Rated Ascending</option>
            </select>
          </div>
          <h1 className="text-4xl text-center font-bold text-white">
            ALL TOP RATED MOVIES
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {renderMovies().map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              onClick={() => {
                dispatch(selectMovie(movie.id));
                navigate("/movie-detail");
              }}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-yellow-400 text-white py-3 px-6 rounded-full font-bold text-xl shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Load More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllTopRatedMovies;
