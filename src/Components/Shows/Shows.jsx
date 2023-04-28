import React, { useContext } from "react";
import "./Shows.css";
import { TVDataContext } from "../../Context/TVShowsContextAPI";
import TopRatedTvShows from "../TopRatedTVShows/TopRatedTVShows";
import PopularTvShows from "../PopularTVShows/PopularTVShows";
import AiringTodayTvShows from "../AiringTodayTVShows/AiringTodayTVShows";
import OnTheAirTvShows from "../OnTheAirTVShows/OnTheAirTVShows";
import { Helmet } from "react-helmet";

export default function Shows() {
  let { page, setpage, getTV } = useContext(TVDataContext);

  function handlePageReset() {
    setpage(1);
    getTV(page === 1);
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows."
        />
        <title>TV Shows</title>
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
            id="AiringToday-tab"
            data-bs-toggle="tab"
            data-bs-target="#AiringToday-tab-pane"
            type="button"
            role="tab"
            aria-controls="AiringToday-tab-pane"
            aria-selected="false"
            onClick={handlePageReset}
          >
            Airing Today
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="onTheAir-tab"
            data-bs-toggle="tab"
            data-bs-target="#onTheAir-tab-pane"
            type="button"
            role="tab"
            aria-controls="onTheAir-tab-pane"
            aria-selected="false"
            onClick={handlePageReset}
          >
            On The Air
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
          <TopRatedTvShows />
        </div>
        <div
          className="tab-pane fade"
          id="popular-tab-pane"
          role="tabpanel"
          aria-labelledby="popular-tab"
          tabIndex="0"
        >
          <PopularTvShows />
        </div>
        <div
          className="tab-pane fade"
          id="AiringToday-tab-pane"
          role="tabpanel"
          aria-labelledby="AiringToday-tab"
          tabIndex="0"
        >
          <AiringTodayTvShows />
        </div>
        <div
          className="tab-pane fade"
          id="onTheAir-tab-pane"
          role="tabpanel"
          aria-labelledby="onTheAir-tab"
          tabIndex="0"
        >
          <OnTheAirTvShows />
        </div>
      </div>
    </>
  );
}
