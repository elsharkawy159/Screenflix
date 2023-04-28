import React, { useEffect, useState } from "react";
import "./Details.css";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import RatingCircle from "../RatingCircle/RatingCircle";
import TrendingTvWeeklySlider from "../TrendingTVWeeklySlider/TrendingTVWeeklySlider";
import TrendingMoviesWeeklySlider from "../TrendingMoviesWeeklySlider/TrendingMoviesWeeklySlider";
import TrendingPeopleWeeklySlider from "../TrendingPeopleWeeklySlider/TrendingPeopleWeeklySlider";
import Slider from "react-slick";
import settings from "../SliderSetting/SliderSetting";
import ContentLoader from "react-content-loader";
import MyLoader from "../MyLoader/MyLoader";
import { Helmet } from "react-helmet";

export default function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const [mediaDetails, setMediaDetails] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const location = useLocation();
  const params = useParams();

  async function getMediaDetails() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=c04c56b8aeb3dce3acdfd16eb3ca314b&language=en-US&include_image_language=en&append_to_response=recommendations,keywords,watch/providers,images,videos,movie_credits`
      );
      setMediaDetails(data);
      console.log(data);
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    window.scrollY = 0;
    getMediaDetails();
    console.clear();
  }, [params, location.pathname]);

  const handleAccordionClick = (id) => {
    if (id === expandedId) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const DetailsLoader = (props) => (
    <ContentLoader
      speed={1}
      viewBox="0 0 100% 100%"
      height={600}
      width={1300}
      backgroundColor="#2e2e2e"
      foregroundColor="#1a1a1a"
      {...props}
    >
      <rect x="20" y="15" rx="20" ry="20" width="300" height="320" />
      <rect x="92" y="347" rx="5" ry="5" width="45" height="45" />
      <rect x="148" y="347" rx="5" ry="5" width="45" height="45" />
      <rect x="205" y="347" rx="5" ry="5" width="45" height="45" />
      <rect x="361" y="17" rx="10" ry="10" width="420" height="33" />
      <rect x="361" y="71" rx="10" ry="10" width="315" height="33" />
      <rect x="361" y="125" rx="10" ry="10" width="233" height="20" />
      <rect x="361" y="216" rx="5" ry="5" width="195" height="13" />
      <rect x="361" y="251" rx="5" ry="5" width="195" height="13" />
      <rect x="367" y="311" rx="8" ry="8" width="130" height="38" />
      <rect x="515" y="311" rx="8" ry="8" width="130" height="38" />
    </ContentLoader>
  );
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows."
        />
        <title>{mediaDetails.title || mediaDetails.name}</title>
      </Helmet>
      <div
        className="mainBg container-fluid position-relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${mediaDetails.backdrop_path})`,
        }}
      >
        <div className="mainLayer row ps-5 pe-5">
          {isLoading ? (
            <DetailsLoader className={"m-top140"} />
          ) : (
            <>
              <div className="col-xl-2 col-md-4 m-top140">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${
                    mediaDetails.poster_path || mediaDetails.profile_path
                  }`}
                  className="detailsPoster img-fluid rounded-3 shadow"
                  alt="Media Poster"
                  title={mediaDetails.title || mediaDetails.name}
                  loading="lazy"
                />

                {mediaDetails.keywords?.results?.length >= 1 ||
                mediaDetails.keywords?.keywords?.length >= 1 ? (
                  <div className="keywords bg-screenflix justify-content-center text-center mt-5 row ms-0 me-0 pb-3 border-bottom-red">
                    <h2 className="h6 opacity-75 fw-semibold p-1">Keywords</h2>
                    {(
                      mediaDetails.keywords?.results ||
                      mediaDetails.keywords?.keywords
                    ).map(
                      (keyword, index) =>
                        index < 10 && (
                          <p
                            key={index}
                            className="col-4 h-auto m-1 p-1 overflow-auto bg-light bg-opacity-10 opacity-75 rounded-3"
                          >
                            {keyword.name}
                          </p>
                        )
                    )}
                  </div>
                ) : null}
                {mediaDetails.also_known_as?.length > 0 ? (
                  <div className="keywords bg-screenflix justify-content-center text-center mt-5 row ms-0 me-0 pb-3 border-bottom-red">
                    <h2 className="h6 opacity-75 fw-semibold p-1">
                      Also Known As
                    </h2>
                    {mediaDetails.also_known_as.map(
                      (name, index) =>
                        index < 20 && (
                          <p
                            key={index}
                            className="col-4 h-auto m-1 p-1 overflow-auto bg-light bg-opacity-10 opacity-75 rounded-3"
                          >
                            {name}
                          </p>
                        )
                    )}
                  </div>
                ) : null}
              </div>
              <div className="centerCol col-xl-8 col-md-6 m-top140 pt-5">
                <h1 className="title fw-bold">
                  {mediaDetails.title || mediaDetails.name}{" "}
                  <span className="opacity-75 h6 fw-normal">
                    {mediaDetails.release_date || mediaDetails.birthday ? (
                      <>
                        {" "}
                        (
                        {mediaDetails.release_date?.slice(0, 4) ||
                          mediaDetails.birthday?.slice(0, 4)}
                        ){" "}
                      </>
                    ) : (
                      <>
                        ({mediaDetails.first_air_date?.slice(0, 4)} -{" "}
                        {mediaDetails.last_air_date?.slice(0, 4)})
                      </>
                    )}
                  </span>
                </h1>
                {mediaDetails.genres ? (
                  <div className="genres d-flex mb-2">
                    {mediaDetails.genres?.map((genre) => (
                      <p key={genre.id} className="mb-1">
                        {genre.name}
                        {"."}
                      </p>
                    ))}
                  </div>
                ) : null}
                <p>{mediaDetails.place_of_birth}</p>
                <p className="barLeft w-100">
                  {mediaDetails.overview || mediaDetails.biography}
                </p>

                <div className="row w-100 justify-content-center align-items-center text-center gy-3 mt-4">
                  {params.mediaType === "person" ? null : (
                    <div className="score col-sm-2 col-4 text-light d-flex flex-column align-items-center bg-screenflix ">
                      <p className="mb-1 fw-semibold">Vote Average</p>
                      <RatingCircle
                        rating={mediaDetails.vote_average?.toFixed(1) || 0}
                      />
                    </div>
                  )}

                  {params.mediaType === "person" ? null : (
                    <div className="col-sm-2 col-4 bg-screenflix">
                      <p className="mb-1 fw-semibold">Vote Count</p>
                      <p className="mb-0 opacity-75">
                        {mediaDetails.vote_count}
                      </p>
                    </div>
                  )}
                  <div className="col-sm-2 col-4 bg-screenflix">
                    <p className="mb-1 fw-semibold">Popularity</p>
                    <p className="mb-0 opacity-75">{mediaDetails.popularity}</p>
                  </div>

                  {mediaDetails.number_of_episodes ? (
                    <>
                      <div className="col-sm-2 col-4 bg-screenflix">
                        <p className="mb-1 fw-semibold">Seasons</p>
                        <p className="mb-0 opacity-75">
                          {mediaDetails.number_of_seasons}
                        </p>
                      </div>
                      <div className="col-sm-2 col-4 bg-screenflix  ">
                        <p className="mb-1 fw-semibold">Episodes</p>
                        <p className="mb-0 opacity-75">
                          {mediaDetails.number_of_episodes}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="row w-100 justify-content-center align-items-center text-center gy-3 mt-4">
                  {mediaDetails.created_by?.map((createItem) => (
                    <div
                      key={createItem.id}
                      className="col-sm-2 col-4 mt-3 d-flex flex-column text-center bg-screenflix"
                    >
                      {" "}
                      <p className="mb-1 fw-semibold">Creator</p>
                      <Link
                        to={`/person/${createItem.id}`}
                        className="text-decoration-none link opacity-75"
                      >
                        {createItem.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="seasons d-flex align-items-center flex-wrap justify-content-evenly mt-5">
                  {mediaDetails.seasons?.length > 0
                    ? mediaDetails.seasons.map((season, index) => (
                        <div
                          className="col-md-2 col-sm-4 col-6 p-1 overflow-hidden pointer position-relative "
                          key={`${season.id}-${index}`}
                        >
                          {isLoading ? (
                            <MyLoader
                              key={`loader-${index}`}
                              className="col-md-12 col-sm-4 col-6 p-1"
                            />
                          ) : (
                            <div className="text-decoration-none item">
                              {season.poster_path ? (
                                <div className="poster overflow-hidden shadow position-relative rounded-2">
                                  <img
                                    src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
                                    className="img-fluid "
                                    alt="Season Poster"
                                    title={season.title || season.name}
                                    loading="lazy"
                                  />
                                  <div className="mediaType position-absolute d-flex flex-column">
                                    <span className="mediaType fw-semibold text-dark p-1 rounded-end mb-2">
                                      Episodes: {season.episode_count}
                                    </span>
                                    <span className="mediaType fw-semibold text-dark p-1 rounded-end ">
                                      Released: {season.air_date?.slice(0, 4)}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="poster d-flex align-items-center overflow-hidden position-relative justify-content-center rounded-2 border text-light opacity-75">
                                  Poster Unavailable
                                  <div className="mediaType position-absolute d-flex flex-column">
                                    <span className="mediaType fw-semibold text-dark p-1 rounded-end mb-2">
                                      Episodes: {season.episode_count}
                                    </span>
                                    <span className="mediaType fw-semibold text-dark p-1 rounded-end ">
                                      Released: {season.air_date?.slice(0, 4)}
                                    </span>
                                  </div>
                                </div>
                              )}
                              <div className="card-body text-center mt-2 p-1">
                                <h2 className="h6 fw-bold opacity-75">
                                  {season.title || season.name}
                                </h2>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    : null}
                </div>
                {mediaDetails.videos?.results.length >= 1 ? (
                  <div className="mt-5">
                    <h3 className="sliderTitle mb-3">Videos</h3>
                    <div className="d-flex flex-wrap justify-content-evenly">
                      {mediaDetails.videos.results.map((video) => (
                        <div
                          key={video.id}
                          className="accordion me-2 mb-2"
                          id="accordionPanelsStayOpenExample"
                        >
                          <div className="accordion-item bg-dark border-bottom border-0 rounded-0  rounded-top">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed bg-dark text-light shadow-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#video${video.key}`}
                                aria-expanded={
                                  expandedId === video.id ? "true" : "false"
                                }
                                aria-controls={`video${video.key}`}
                                onClick={() => handleAccordionClick(video.id)}
                              >
                                {expandedId === video.id
                                  ? video.name
                                  : video.name.split(" ").slice(0, 3).join(" ")}
                              </button>
                            </h2>
                            <div
                              id={`video${video.key}`}
                              className="accordion-collapse collapse"
                            >
                              <div className="accordion-body d-flex flex-column shadow p-0">
                                <iframe
                                  src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                                  title={video.name}
                                  width="560"
                                  height="315"
                                  className="videos"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {(mediaDetails.images &&
                  mediaDetails.images?.backdrops?.length > 0) ||
                mediaDetails.images?.logos?.length > 0 ||
                mediaDetails.images?.posters?.length > 0 ? (
                  <div className="mt-5">
                    <h3 className="sliderTitle mb-3">Images</h3>
                    <div className="d-flex flex-wrap justify-content-evenly">
                      {mediaDetails.images?.backdrops?.length > 0 ? (
                        <div
                          className="accordion mb-2"
                          id={`accordionPanelsStayOpenExample$`}
                        >
                          <div className="accordion-item bg-dark border-bottom border-0 rounded-0 row justify-content-center rounded-top">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed bg-dark text-light shadow-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#backdrops`}
                                aria-expanded="true"
                                aria-controls={`backdrops`}
                              >
                                Backdrops
                              </button>
                            </h2>
                            {mediaDetails.images.backdrops.map(
                              (backdrop, index) =>
                                index < 12 && (
                                  <div
                                    id={`backdrops`}
                                    key={index}
                                    className="accordion-collapse col-xl-4 col-6 p-0 collapse"
                                  >
                                    <div className="accordion-body shadow p-0">
                                      <img
                                        src={`https://image.tmdb.org/t/p/w500/${backdrop.file_path}`}
                                        className="w-100"
                                        alt="backdrops"
                                        loading="lazy"
                                        title={`Backdrop ${index + 1}`}
                                      />
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      ) : null}
                      {mediaDetails.images?.posters?.length > 0 ? (
                        <div
                          className="accordion mb-2"
                          id={`accordionPanelsStayOpenExample$`}
                        >
                          <div className="accordion-item bg-dark border-bottom border-0 rounded-0 row justify-content-center rounded-top">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed bg-dark text-light shadow-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#posters`}
                                aria-expanded="true"
                                aria-controls={`posters`}
                              >
                                Posters
                              </button>
                            </h2>
                            {mediaDetails.images.posters.map(
                              (backdrop, index) =>
                                index < 24 && (
                                  <div
                                    id={`posters`}
                                    key={index}
                                    className="accordion-collapse col-xl-2 col-4 p-0 collapse"
                                  >
                                    <div className="accordion-body shadow p-0">
                                      <img
                                        src={`https://image.tmdb.org/t/p/w500/${backdrop?.file_path}`}
                                        className="w-100"
                                        alt="posters"
                                        loading="lazy"
                                        title={`Poster ${index + 1}`}
                                      />
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      ) : null}
                      {mediaDetails.images?.logos?.length > 0 ? (
                        <div
                          className="accordion mb-2"
                          id={`accordionPanelsStayOpenExample$`}
                        >
                          <div className="accordion-item bg-dark border-bottom border-0 rounded-0 row justify-content-center rounded-top">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button collapsed bg-dark text-light shadow-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#logos`}
                                aria-expanded="true"
                                aria-controls={`logos`}
                              >
                                logos
                              </button>
                            </h2>
                            {mediaDetails.images?.logos?.map(
                              (logo, index) =>
                                index < 12 && (
                                  <div
                                    id={`logos`}
                                    key={index}
                                    className="accordion-collapse col-xl-2 col-4 p-2 collapse"
                                  >
                                    <div className="accordion-body shadow p-0">
                                      <img
                                        src={`https://image.tmdb.org/t/p/w500/${logo.file_path}`}
                                        className="w-100"
                                        alt="logos"
                                        loading="lazy"
                                        title={`Poster ${index + 1}`}
                                      />
                                    </div>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {mediaDetails.images?.profiles?.length > 0 ? (
                  <div
                    className="accordion mb-2"
                    id={`accordionPanelsStayOpenExample$`}
                  >
                    <div className="accordion-item bg-dark border-bottom border-0 rounded-0 row justify-content-center rounded-top">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed bg-dark text-light shadow-none"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#backdrops`}
                          aria-expanded="true"
                          aria-controls={`backdrops`}
                        >
                          Images
                        </button>
                      </h2>
                      {mediaDetails.images?.profiles.map(
                        (backdrop, index) =>
                          index < 12 && (
                            <div
                              id={`backdrops`}
                              key={index}
                              className="accordion-collapse col-xl-4 col-6 p-0 collapse"
                            >
                              <div className="accordion-body shadow p-0">
                                <img
                                  src={`https://image.tmdb.org/t/p/w500/${backdrop.file_path}`}
                                  className="w-100"
                                  alt="backdrops"
                                  loading="lazy"
                                  title={`Backdrop ${index + 1}`}
                                />
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="col-xl-2 col-md-2 m-top140">
                {mediaDetails.networks ? (
                  <div className="companies bg-screenflix justify-content-center text-center mt-4 row ms-0 me-0 border-bottom-red">
                    <h2 className="h6 opacity-75 fw-semibold p-2">Networks</h2>
                    {mediaDetails.networks?.map((network, index) =>
                      index < 5 && network.logo_path ? (
                        <div
                          key={network.id}
                          className="p-2 col-6 overflow-auto"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${network.logo_path}`}
                            alt={"Network Poster"}
                            className="m-1 p-3"
                            width={"60%"}
                          />
                          <p className="opacity-75 mb-4">{network?.name}</p>
                        </div>
                      ) : null
                    )}
                  </div>
                ) : null}
                {mediaDetails.production_companies?.length > 0 ? (
                  <div className="companies bg-screenflix justify-content-center text-center mt-4 row ms-0 me-0 border-bottom-red">
                    <h2 className="h6 opacity-75 fw-semibold p-2">
                      Production Companies
                    </h2>
                    {mediaDetails.production_companies?.map((company, index) =>
                      index < 5 ? (
                        <div
                          key={company.id}
                          className="p-2 col-6 overflow-auto"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                            alt={"Company Poster"}
                            className="m-1 p-3"
                            width={"75%"}
                          />
                          <p className="opacity-75 mb-4">{company.name}</p>
                        </div>
                      ) : null
                    )}
                  </div>
                ) : null}

                {mediaDetails.status ? (
                  <div className="d-flex flex-column align-items-center bg-screenflix mt-4 border-bottom-red text-center">
                    <h2 className="h6 opacity-75 fw-semibold p-2">Status</h2>
                    <p className="opacity-75 mb-4">{mediaDetails.status}</p>
                  </div>
                ) : null}
                {mediaDetails.type ? (
                  <div className="d-flex flex-column align-items-center bg-screenflix mt-4 border-bottom-red text-center">
                    <h2 className="h6 opacity-75 fw-semibold p-2">Type</h2>
                    <p className="opacity-75 mb-4">{mediaDetails.type}</p>
                  </div>
                ) : null}

                {mediaDetails.tagline ? (
                  <div className="d-flex flex-column align-items-center bg-screenflix mt-4 border-bottom-red text-center">
                    <h2 className="h6 opacity-75 fw-semibold p-2">Tagline</h2>
                    <p className="opacity-75 mb-4">{mediaDetails.tagline}</p>
                  </div>
                ) : null}
              </div>
            </>
          )}

          {mediaDetails.recommendations?.results.length > 0 ? (
            <div className="Slider container-fluid w-100 mt-5">
              <span className="sliderTitle text-light ms-5 d-flex align-items-center">
                Recommendations
              </span>
              <Slider {...settings}>
                {mediaDetails.recommendations?.results?.map((media) => (
                  <div key={media.id} className="position-relative">
                    {isLoading ? (
                      <MyLoader />
                    ) : (
                      <Link
                        to={
                          media.media_type === "tv"
                            ? `/tv/${media.id}`
                            : `/movie/${media.id}`
                        }
                        key={media.id}
                        onClick={() => window.scrollTo(0, 0)}
                        className="pointer text-decoration-none item p-0 w-100 me-2 pt-1"
                      >
                        <div className="overflow-hidden rounded-2">
                          {media.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                              className="img-fluid bg-secondary"
                              alt="Poster"
                            />
                          ) : (
                            <div className="noPoster d-flex align-items-center justify-content-center text-secondary">
                              Poster Unavailable
                            </div>
                          )}
                        </div>
                        <div className="rate position-absolute end-0 m-1">
                          <RatingCircle
                            rating={media.vote_average.toFixed(1)}
                          />
                        </div>
                        <div className="card-body text-center mt-2 p-1">
                          <h2 className="card-title h6">
                            {media.name || media.title}
                          </h2>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          ) : null}

          <div className="col-12 mt-5 p-0">
            {params.mediaType === "movie" ? (
              <TrendingMoviesWeeklySlider />
            ) : params.mediaType === "person" ? (
              <TrendingPeopleWeeklySlider />
            ) : (
              <TrendingTvWeeklySlider />
            )}
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 320">
        <path
          fill="rgba(9, 9, 9, 1)"
          fillOpacity="1"
          d="M0,160L34.3,154.7C68.6,149,137,139,206,128C274.3,117,343,107,411,128C480,149,549,203,617,208C685.7,213,754,171,823,165.3C891.4,160,960,192,1029,224C1097.1,256,1166,288,1234,277.3C1302.9,267,1371,213,1406,186.7L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
    </>
  );
}
