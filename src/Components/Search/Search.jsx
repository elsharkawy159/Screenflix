import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import RatingCircle from "../RatingCircle/RatingCircle";
import MyLoader from "../MyLoader/MyLoader";

export default function Search() {
  const [searchData, setsearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  let params = useParams();

  async function getSearch(params, page) {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=c04c56b8aeb3dce3acdfd16eb3ca314b&language=en-US&query=${params.query}&page=${page}&include_adult=false`
      );
      setsearchData(data.results);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSearch(params, page);
  }, [params, page]);

  function handlePage() {
    if (searchData.length < 20) {
      return;
    } else {
      const newPage = page + 1;
      setPage(newPage);
      getSearch(params, newPage);
    }
  }

  function handlePrevPage() {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      getSearch(params, newPage);
    }
  }

  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        <div className="row gy-5 ms-5 me-5 justify-content-center">
          <div className="col-12 d-flex justify-content-center mb-min20">
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
          {searchData.map((media, index) => (
            <div
              className="col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative"
              key={`${media.id}-${index}`}
            >
              {isLoading ? (
                <MyLoader key={`loader-${index}`} className="col p-1" />
              ) : (
                <Link
                  to={
                    media.media_type === "tv"
                      ? `/tv/${media.id}`
                      : `/movie/${media.id}`
                  }
                  onClick={() => window.scrollTo(0, 0)}
                  className=" text-decoration-none item"
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
                          {media.media_type.toUpperCase()}
                        </span>
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
                          {media.media_type.toUpperCase()}
                        </span>
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
    </>
  );
}
