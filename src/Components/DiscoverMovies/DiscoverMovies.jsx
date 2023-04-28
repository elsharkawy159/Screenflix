import React, { useEffect, useState } from "react";
import "./DiscoverMovies.css";
import axios from "axios";
import MyLoader from "../MyLoader/MyLoader";
import { Link } from "react-router-dom";
import RatingCircle from "../RatingCircle/RatingCircle";
import movieGenres from "../GenresIDS/MovieGenres";
import { Helmet } from "react-helmet";

export default function DiscoverMovies() {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setreleaseYear] = useState("");

  async function discover(page, sortBy, genre, releaseYear) {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=c04c56b8aeb3dce3acdfd16eb3ca314b&language=en-US&${sortBy}&include_adult=false&include_video=false&page=${page}&${releaseYear}${genre}&with_watch_monetization_types=flatrate`
      );
      if (data && data.results) {
        setDiscoverMovies(data.results);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    discover(page, sortBy, genre, releaseYear);
  }, [page, sortBy, genre, releaseYear]);

  function handlePage() {
    if (discoverMovies.length < 20) {
      return;
    } else {
      const newPage = page + 1;
      setPage(newPage);
      discover(newPage, sortBy, genre, releaseYear);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      discover(newPage, sortBy, genre, releaseYear);
    } else {
      return;
    }
  }

  function handleSortBy(sortBy) {
    setSortBy(sortBy);
    setPage(1);
  }

  function handleGenre(genre) {
    setGenre(genre);
    setPage(1);
  }
  function handleReleaseYear(releaseYear) {
    setreleaseYear(releaseYear);
    setPage(1);
  }
  function handleReset() {
    setPage(1);
    setGenre("");
    setSortBy("");
    setreleaseYear("");
    discover(page, sortBy, genre, releaseYear);
  }

  const sideBarDiscover = window.document.querySelector(".sideBarDiscover");

  function handleBarResponsive() {
    if (sideBarDiscover.style.left === "-82%") {
      sideBarDiscover.style.left = "0%";
    } else {
      sideBarDiscover.style.left = "-82%";
    }
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows."
        />
        <link
          rel="shortcut icon"
          href="../../img/logo.png"
          type="image/x-icon"
        />
        <title>Discover Movies</title>
      </Helmet>
      <div className="container-fluid ">
        <div className="row ms-5 me-5">
          <div
            className="sideBarDiscover col-md-2 col-10 bg-mainDark pt-5 pb-5 ps-4 pe-4 shadow rounded-3"
            style={{ left: "2.5%" }}
          >
            <div className="accordion mb-3" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Sort by
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body d-flex flex-column">
                    <Link
                      className="bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1"
                      onClick={() => handleSortBy("sort_by=popularity.desc")}
                    >
                      Popularity
                    </Link>
                    <Link
                      className="bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1"
                      onClick={() => handleSortBy("sort_by=release_date.desc")}
                    >
                      Release Date
                    </Link>
                    <Link
                      className="bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1"
                      onClick={() => handleSortBy("sort_by=revenue.desc")}
                    >
                      Revenue
                    </Link>
                    <Link
                      className="bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1"
                      onClick={() =>
                        handleSortBy("sort_by=primary_release_date.desc")
                      }
                    >
                      Primary Release Date
                    </Link>
                    <Link
                      className="bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1"
                      onClick={() => handleSortBy("sort_by=vote_average.desc")}
                    >
                      Vote Average
                    </Link>
                    <Link
                      className="bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 text-dark mb-1"
                      onClick={() => handleSortBy("sort_by=vote_count.desc")}
                    >
                      Vote Count
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion mb-3" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Genres
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <div className="d-flex flex-wrap">
                      {movieGenres.map((genre) => (
                        <Link
                          className="h6 m-0 bg-light text-dark text-decoration-none rounded-2 p-2 pt-1 pb-1 m-1"
                          onClick={() => handleGenre(`with_genres=${genre.id}`)}
                          key={genre.id}
                        >
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <select
              className="form-select bg-light mb-5 text-dark p-2 ps-3"
              onChange={(event) =>
                handleReleaseYear(`year=${event.target.value}`)
              }
            >
              <option>Release Dates</option>
              {Array.from({ length: 140 }, (_, i) => 1887 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button
              onClick={handleReset}
              className="btn btn-outline-light w-100 mt-3"
            >
              Reset
            </button>
            <div
              onClick={handleBarResponsive}
              className="barToggle text-light pointer p-2 position-absolute translate-middle-y"
            >
              <i className="fa-solid fa-bars fs-1"></i>
            </div>
          </div>

          <div className="col-md-10 ms-auto mt-5 pt-5 me-0 row gy-4 justify-content-center">
            <div className="col-12 d-flex flex-column align-items-center">
              <div>
                <button
                  className="btn bg-light ps-4 pe-4 m-2"
                  onClick={handlePrevPage}
                >
                  <i className="fa-solid fa-arrow-left text-dark"></i>
                </button>
                <button
                  className="btn bg-light ps-4 pe-4 m-2"
                  onClick={handlePage}
                >
                  <i className="fa-solid fa-arrow-right text-dark"></i>
                </button>
              </div>
            </div>
            {discoverMovies.map((media, index) => (
              <div
                className="col-xl-2 col-md-3 col-sm-6 col-6 p-1 overflow-hidden pointer position-relative"
                key={`${media.id}-${index}`}
              >
                {isLoading ? (
                  <MyLoader key={`loader-${index}`} className="col p-1" />
                ) : (
                  <Link
                    to={`/movie/${media.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-decoration-none item"
                  >
                    {media.poster_path ? (
                      <div className="poster overflow-hidden position-relative rounded-2">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                          className="img-fluid"
                          alt="Movie Poster"
                          title={media.title || media.name}
                          loading="lazy"
                        />
                        <div className="mediaType position-absolute d-flex flex-column">
                          <span className="mediaType fw-semibold text-dark p-1 rounded-end mb-2">
                            Pop: {media.popularity}
                          </span>
                          <span className="mediaType fw-semibold text-dark p-1 rounded-end ">
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="poster d-flex align-items-center overflow-hidden position-relative justify-content-center rounded-2 border">
                        Poster Unavailable
                        <div className="mediaType position-absolute d-flex flex-column">
                          <span className="mediaType fw-semibold text-dark p-1 rounded-end mb-2">
                            Pop: {media.popularity}
                          </span>
                          <span className="mediaType fw-semibold text-dark p-1 rounded-end ">
                            Vote Count: {media.vote_count}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="rate position-absolute end-0 m-1 p-2">
                      <RatingCircle
                        rating={media.vote_average?.toFixed(1) || 0}
                      />
                    </div>
                    <div className="card-body text-center mt-2 p-1">
                      <h2 className="h6 fw-bold">
                        {media.title || media.name}
                      </h2>
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <span className="fw-bold fs-5 text-light text-center">
              Page {page}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
