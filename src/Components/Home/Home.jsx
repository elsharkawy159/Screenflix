import React, { useContext, useEffect } from "react";
import NowPlayingMoviesSlider from "../NowPlayingMoviesSlider/NowPlayingMoviesSlider";
import PopulargMoviesSlider from "../PopulargMoviesSlider/PopulargMoviesSlider";
import TopRatedMoviesSlider from "../TopRatedMoviesSlider/TopRatedMoviesSlider";
import UpcomingMoviesSlider from "../UpcomingMoviesSlider/UpcomingMoviesSlider";
import OnTheAirTvSlider from "../OnTheAirTVSlider/OnTheAirTVSlider";
import AiringTodayTvSlider from "../AiringTodayTVSlider/AiringTodayTVSlider";
import TopRatedTvSlider from "../TopRatedTVSlider/TopRatedTVSlider";
import PopularTvSlider from "../PopularTVSlider/PopularTVSlider";
import TrendingMoviesWeeklySlider from "../TrendingMoviesWeeklySlider/TrendingMoviesWeeklySlider";
import TrendingPeopleWeeklySlider from "../TrendingPeopleWeeklySlider/TrendingPeopleWeeklySlider";
import TrendingTvWeeklySlider from "../TrendingTVWeeklySlider/TrendingTVWeeklySlider";
import MainSlider from "../MainSlider/MainSlider";
import { moviesDataContext } from "../../Context/MoviesContextAPI";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

export default function Home() {
  let { setpage, getMovies } = useContext(moviesDataContext);

  useEffect(() => {
    setpage(1);
    getMovies();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows."
        />
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <TopRatedMoviesSlider />
      <TopRatedTvSlider />
      <TrendingMoviesWeeklySlider />
      <PopulargMoviesSlider />
      <PopularTvSlider />
      <TrendingTvWeeklySlider />
      <NowPlayingMoviesSlider />
      <AiringTodayTvSlider />
      <UpcomingMoviesSlider />
      <OnTheAirTvSlider />
      <TrendingPeopleWeeklySlider />
      <Footer />
    </>
  );
}
