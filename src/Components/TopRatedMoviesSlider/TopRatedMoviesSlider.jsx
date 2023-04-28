import React, { useContext } from "react";
import "./TopRatedMoviesSlider.css";

import { moviesDataContext } from "../../Context/MoviesContextAPI";
import Slider from "react-slick";
import RatingCircle from "../RatingCircle/RatingCircle";
import { Link } from "react-router-dom";
import MyLoader from "../MyLoader/MyLoader";
import settings from "../SliderSetting/SliderSetting";

export default function TopRatedMoviesSlider() {
  let { topRatedMovies, isLoading } = useContext(moviesDataContext);

  return (
    <div className="Slider container-fluid w-100">
      <Link
        to={"/movies"}
        onClick={() => window.scrollTo(0, 0)}
        className="sliderTitle text-light ms-5 d-flex align-items-center"
      >
        Top Rated Movies
        <p className="more ms-3 h6 mb-0">
          - Explore All
          <i className="fa-solid fa-angles-right text-danger arrow ms-1"></i>
        </p>
      </Link>
      <Slider {...settings}>
        {topRatedMovies.map((movie) => (
          <div key={movie.id} className="position-relative">
            {isLoading ? (
              <MyLoader />
            ) : (
              <Link
                to={`/movie/${movie.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="pointer text-decoration-none item p-0 w-100 me-2 pt-1"
              >
                <div className="overflow-hidden rounded-2">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      className="img-fluid bg-secondary"
                      alt="Movie Poster"
                    />
                  ) : (
                    <div className="noPoster d-flex align-items-center justify-content-center text-secondary">
                      Poster Unavailable
                    </div>
                  )}
                </div>
                <div className="rate position-absolute end-0 m-1">
                  <RatingCircle rating={movie.vote_average.toFixed(1)} />
                </div>
                <div className="card-body text-center mt-2 p-1">
                  <h2 className="card-title h6">{movie.title}</h2>
                </div>
              </Link>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}
