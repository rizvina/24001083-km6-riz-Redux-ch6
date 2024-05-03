import axios from "axios";
import { setMovieId, setupComing } from "../reducers/upcomingReducer";

export const getupComing = (currentPage) => async (dispatch) => {
  const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );
    dispatch(setupComing(response.data.results));
    console.log("response.data.results", response.data.results);
  } catch (error) {
    console.error("Error fetching popular movies: ", error);
  }
};

export const selectMovie = (movieId) => async (dispatch) => {
  try {
    dispatch(setMovieId(movieId));
  } catch (err) {
    console.error("Error selecting movie: ", err);
  }
};

export const searchMovies = (query, currentPage) => async (dispatch) => {
  try {
    const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );

    dispatch(setupComing(response.data.results));
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};
