import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { playTrailer, fetchMovieDetail } from "../redux/actions/movieActions";

const API_KEY = "1258836cba49adb1a3a6859aaf9c2aed";

export default function MovieDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const movies = useSelector((state) => state?.movie?.movieDetail);
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const movieDetail = useSelector((state) => state?.movie?.movieDetail);
  console.log(
    "state",
    useSelector((state) => state)
  );

  useEffect(() => {
    dispatch(fetchMovieDetail(location?.state?.id));
    if (!token) navigate("/login");
  }, []);

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-500 bg-blend-multiply h-auto"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetail?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-20 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`}
            alt={movieDetail?.title}
            className="w-auto h-auto rounded-lg"
          />
          <div
            className="text-white font-sans bg-gray-600/75 rounded-xl shadow-lg p-10"
            key={movieDetail?.id}
          >
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-2">
                {movieDetail?.title}
              </h2>
              <p className="text-lg mb-2 border-b-2 pb-3">
                {movieDetail?.overview}
              </p>
              <p className="text-lg">
                Release Date: {movieDetail?.release_date}
              </p>
              <p className="text-lg">
                Vote Average: {parseFloat(movieDetail?.vote_average).toFixed(1)}
                /10
              </p>
              <p className="text-lg">Popularity: {movieDetail?.popularity}</p>
              <p className="text-lg">Votes: {movieDetail?.vote_count}</p>
              <p className="text-lg">
                Duration: {movieDetail?.runtime} minutes
              </p>
              <p className="text-lg">
                Language:{" "}
                {movieDetail?.spoken_languages
                  ?.map((lang) => lang.name)
                  .join(", ")}
              </p>
              <p className="text-lg">
                Genres:{" "}
                {movieDetail?.genres?.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <div className="left-0 p-4 mr-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-500 flex items-center"
                onClick={() => {
                  dispatch(playTrailer(movieDetail.id));
                }}
              >
                <FaPlay className="mr-2" />
                Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
