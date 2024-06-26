// untuk menggabungkan beberapa reducer menjadi satu root reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import nowPlayingReducers from "./nowPlayingReducers";
import popularReducers from "./popularReducers";
import topReducers from "./topReducers";
import upcomingReducer from "./upcomingReducer";

export default combineReducers({
  auth: authReducer,
  movie: movieReducer,
  playing: nowPlayingReducers,
  popular: popularReducers,
  top: topReducers,
  up: upcomingReducer,
});
