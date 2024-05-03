import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: [],
  topMovies: [],
  nowplaying: [],
  upcoming: [],
  trailerr: [],
  selectedMovieId: null, //
  movies: [],
  movieDetail: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topMovies = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowplaying = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    setMovieId: (state, action) => {
      state.selectedMovieId = action.payload; // Mengatur selectedMovieId dari payload action
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
  },
});

export const {
  setPopularMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setUpcomingMovies,
  setTrailerplay,
  setMovieId,
  setMovies,
  setMovieDetail,
} = movieSlice.actions;

export default movieSlice.reducer;
