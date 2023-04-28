import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let TrendingContext = createContext();

export function TrendingContextProvider(props) {
  const [trendingMovies, settrendingMovies] = useState([]);
  const [trendingTV, settrendingTV] = useState([]);
  const [trendingPeople, settrendingPeople] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const sections = ["movie", "tv", "person"];
  async function getTrending() {
    for (let i = 0; i < sections.length; i++) {
      setisLoading(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${sections[i]}/week?api_key=c04c56b8aeb3dce3acdfd16eb3ca314b`
      );
      switch (sections[i]) {
        case "movie":
          settrendingMovies(data.results);
          break;
        case "tv":
          settrendingTV(data.results);
          break;
        case "person":
          settrendingPeople(data.results);
          break;
        default:
          break;
      }
    }
    setisLoading(false);
  }

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <TrendingContext.Provider
      value={{
        trendingMovies,
        trendingTV,
        trendingPeople,
        isLoading,
      }}
    >
      {props.children}
    </TrendingContext.Provider>
  );
}
