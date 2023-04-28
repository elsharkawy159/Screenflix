import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let moviesDataContext = createContext();

export function MoviesDataContextProvider(props) {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const sections = ["now_playing", "popular", "top_rated", "upcoming"];

  async function getMovies(page) {
    setisLoading(true);
    for (let i = 0; i < sections.length; i++) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${sections[i]}?api_key=c04c56b8aeb3dce3acdfd16eb3ca314b&language=en-US&page=${page}`
      );
      switch (sections[i]) {
        case "now_playing":
          setNowPlayingMovies(data.results);
          break;
        case "popular":
          setPopularMovies(data.results);
          break;
        case "top_rated":
          setTopRatedMovies(data.results);
          break;
        case "upcoming":
          setUpcomingMovies(data.results);
          break;
        default:
          break;
      }
    }
    setisLoading(false);
  }

  useEffect(() => {
    setpage(1);
    getMovies(page);
  }, []);

  return (
    <moviesDataContext.Provider
      value={{
        nowPlayingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,

        page,
        setpage,
        getMovies,
        isLoading,
      }}
    >
      {props.children}
    </moviesDataContext.Provider>
  );
}
