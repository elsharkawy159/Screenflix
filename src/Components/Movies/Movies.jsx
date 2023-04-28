import React, { useContext } from "react";
import "./Movies.css";
import NowPlayingMovies from "../NowPlayingMovies/NowPlayingMovies";
import PopularMovies from "../PopularMovies/PopularMovies";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import { moviesDataContext } from "../../Context/MoviesContextAPI";
import { Helmet } from "react-helmet";

export default function Movies() {
  let { setpage, page, getMovies } = useContext(moviesDataContext);

  function handlePageReset() {
    setpage(1);
    getMovies(page === 1);
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows."
        />
        <title>Movies</title>
      </Helmet>
      <ul
        className="nav nav-tabs mt-5 pt-5 border-0 d-flex justify-content-center"
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="topRated-tab"
            data-bs-toggle="tab"
            data-bs-target="#topRated-tab-pane"
            type="button"
            role="tab"
            aria-controls="topRated-tab-pane"
            aria-selected="true"
            onClick={handlePageReset}
          >
            Top Rated
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="popular-tab"
            data-bs-toggle="tab"
            data-bs-target="#popular-tab-pane"
            type="button"
            role="tab"
            aria-controls="popular-tab-pane"
            aria-selected="false"
            onClick={handlePageReset}
          >
            Popular
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="nowPlaying-tab"
            data-bs-toggle="tab"
            data-bs-target="#nowPlaying-tab-pane"
            type="button"
            role="tab"
            aria-controls="nowPlaying-tab-pane"
            aria-selected="false"
            onClick={handlePageReset}
          >
            Now Playing
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="upcoming-tab"
            data-bs-toggle="tab"
            data-bs-target="#upcoming-tab-pane"
            type="button"
            role="tab"
            aria-controls="upcoming-tab-pane"
            aria-selected="false"
            onClick={handlePageReset}
          >
            Upcoming
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="topRated-tab-pane"
          role="tabpanel"
          aria-labelledby="topRated-tab"
          tabIndex="0"
        >
          <TopRatedMovies />
        </div>
        <div
          className="tab-pane fade"
          id="popular-tab-pane"
          role="tabpanel"
          aria-labelledby="popular-tab"
          tabIndex="0"
        >
          <PopularMovies />
        </div>
        <div
          className="tab-pane fade"
          id="nowPlaying-tab-pane"
          role="tabpanel"
          aria-labelledby="nowPlaying-tab"
          tabIndex="0"
        >
          <NowPlayingMovies />
        </div>
        <div
          className="tab-pane fade"
          id="upcoming-tab-pane"
          role="tabpanel"
          aria-labelledby="upcoming-tab"
          tabIndex="0"
        >
          <UpcomingMovies />
        </div>
      </div>
    </>
  );
}
