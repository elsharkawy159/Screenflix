import React, { useContext } from "react";
import "./OnTheAirTVShows.css";
import { Link } from "react-router-dom";
import RatingCircle from "../RatingCircle/RatingCircle";
import MyLoader from "../MyLoader/MyLoader";
import { TVDataContext } from "../../Context/TVShowsContextAPI";
export default function OnTheAirTvShows() {
  let { onTheAirTV, page, setpage, isLoading, getTV } =
    useContext(TVDataContext);

  function handlePage() {
    if (onTheAirTV.length < 20) {
      return;
    } else {
      setpage(page + 1);
      getTV(page + 1);
    }
  }
  function handlePrevPage() {
    if (page > 1) {
      setpage(page - 1);
      getTV(page - 1);
    } else {
      return;
    }
  }

  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        <div className="row gy-5 ms-5 me-5 justify-content-center">
          <div className="col-12 d-flex mb-min20 position-sticky justify-content-center">
            <button
              className="btn bg-light ps-4 pe-4 m-2"
              onClick={handlePrevPage}
            >
              <i className="fa-solid fa-arrow-left text-dark"></i>
            </button>
            <button className="btn bg-light ps-4 pe-4 m-2" onClick={handlePage}>
              <i className="fa-solid fa-arrow-right text-dark"></i>
            </button>
          </div>
          {onTheAirTV.map((media, index) => (
            <div
              className="col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative "
              key={`${media.id}-${index}`}
            >
              {isLoading ? (
                <MyLoader key={`loader-${index}`} className="col p-1" />
              ) : (
                <Link
                  to={`/tv/${media.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-decoration-none item"
                >
                  {media.poster_path ? (
                    <div className="poster overflow-hidden position-relative rounded-2">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                        className="img-fluid"
                        alt="Media Poster"
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
                    <h2 className="h6 fw-bold">{media.title || media.name}</h2>
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
      <div className="container-fluid mt-5 pt-5">
        <div className="row gy-3 ms-0 me-0"></div>
      </div>
    </>
  );
}
