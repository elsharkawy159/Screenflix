import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../img/logo.png";
import { userDataContext } from "../../Context/UserDataContext";

export default function Navbar() {
  let { UserData, setUserData } = useContext(userDataContext);

  function logOut() {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserData");
    setUserData(null);
  }

  const [showNavbar, setShowNavbar] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 350) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleSearch(e) {
    let query = e.target.value;

    if (query === "") {
      navigate("/");
    } else {
      navigate(`/search/${query}`);
    }
  }

  const navbarClasses = ["navbar"];
  if (showNavbar) {
    navbarClasses.push("navbar--show");
  }
  return (
    <nav
      className={`navbar ${
        showNavbar ? "navbar-show" : ""
      } navbar-expand-lg navbar-dark p-3 ps-5 pe-5 mb-4`}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand text-light"
          onClick={() => window.scrollTo(0, 0)}
          to="/"
        >
          <img src={logo} width={210} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="pages navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                onClick={() => window.scrollTo(0, 0)}
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="dropdown nav-item">
              <NavLink
                className="nav-link text-decoration-none dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-current="page"
                to="/discover"
              >
                Discover
              </NavLink>
              <ul className="dropdown-menu text-center">
                <li>
                  <NavLink
                    className="nav-link text-dark"
                    aria-current="page"
                    onClick={() => window.scrollTo(0, 0)}
                    to="/discover/movies"
                  >
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link text-dark"
                    aria-current="page"
                    onClick={() => window.scrollTo(0, 0)}
                    to="/discover/tvshows"
                  >
                    TV Shows
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                onClick={() => window.scrollTo(0, 0)}
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                onClick={() => window.scrollTo(0, 0)}
                to="/tvshows"
              >
                TV Shows
              </NavLink>
            </li>
          </ul>{" "}
          <input
            id="search"
            type="search"
            className="search form-control w-25 me-5 text-light"
            placeholder="Search"
            value={inputValue}
            onInput={(e) => setinputValue(e.target.value)}
            onChange={handleSearch}
          />
          <ul className="authentication navbar-nav mb-2 mb-lg-0 ">
            {UserData ? (
              <li className="nav-item">
                <span
                  onClick={logOut}
                  className="nav-link btn border-bottom rounded-0"
                >
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/login"}>
                    Login
                  </NavLink>
                </li>
                <span className="slash"></span>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    onClick={() => window.scrollTo(0, 0)}
                    to="register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
