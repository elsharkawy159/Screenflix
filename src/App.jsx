import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/NotFound/Notfound";
import Movies from "./Components/Movies/Movies";
import Shows from "./Components/Shows/Shows";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { MoviesDataContextProvider } from "./Context/MoviesContextAPI";
import { TVDataContextProvider } from "./Context/TVShowsContextAPI";
import { TrendingContextProvider } from "./Context/TrendingContextAPI";
import Details from "./Components/Details/Details";
import DiscoverMovies from "./Components/DiscoverMovies/DiscoverMovies";
import DiscoverTvShows from "./Components/DiscoverTVShows/DiscoverTVShows";
import Search from "./Components/Search/Search";
function App() {
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "discover/movies", element: <DiscoverMovies /> },
        { path: "discover/tvshows", element: <DiscoverTvShows /> },
        { path: "movies", element: <Movies /> },
        { path: "tvshows", element: <Shows /> },
        { path: `/:mediaType/:id`, element: <Details /> },
        { path: `/search/:query`, element: <Search /> },

        {
          path: "login",
          element: <Login />,
        },
        { path: "register", element: <Register /> },
        { path: "forgotpassword", element: <ForgotPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <MoviesDataContextProvider>
      <TVDataContextProvider>
        <UserDataContextProvider>
          <TrendingContextProvider>
            <RouterProvider router={routers}></RouterProvider>;
          </TrendingContextProvider>
        </UserDataContextProvider>
      </TVDataContextProvider>
    </MoviesDataContextProvider>
  );
}

export default App;
