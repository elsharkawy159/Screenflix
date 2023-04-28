import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { userDataContext } from "../../Context/UserDataContext";
import Footer from "../Footer/Footer";

export default function Login() {
  let { saveUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function signUp(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((error) => {
        if (error.response) {
          seterror(error.response.data.message);
          setisLoading(false);
        }
      });
    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem("UserData", JSON.stringify(data.user));
      localStorage.setItem("UserToken", JSON.stringify(data.token));
      saveUserData();
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-start",
        background: "#1d2024",
        color: "white",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: `Logged in`,
      });
    }
    navigate("/");
  }
  const formik = useFormik({
    initialValues: {
      email: JSON.parse(sessionStorage.getItem("userMail")) || "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Address"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Minimum eight characters, at least one letter and one number, Without special character"
        )
        .required("Required"),
    }),

    onSubmit: signUp,
  });

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Our website is a one-stop-shop for everything related to movies, TV shows, and actors. We have a vast collection of content, ranging from the latest blockbusters to classic movies and TV shows."
        />
        <title>Login</title>
      </Helmet>
      <div className="container pt-5 mt-5">
        <div className="row bg-second rounded-4 mt-5 pt-4 pb-4 shadow">
          <div className="form col-md-6 p-4 m-auto">
            <h4 className="text-center pb-3">Login</h4>
            <form onSubmit={formik.handleSubmit} className="row">
              {error ? (
                <>
                  {" "}
                  <h4 className="alert alert-dark text-danger fs-6 p-2 w-100 text-center">
                    {error}
                  </h4>
                </>
              ) : null}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="alert alert-dark text-danger ps-2 pe-2 pt-0 pb-0 w-100 text-center mt-2 mb-0">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              {isLoading ? (
                <button className="btn btn-primary w-75 m-auto">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-75 m-auto">
                  Login
                </button>
              )}
            </form>
            <p className="mt-4 mb-1">
              Forgot your password?{" "}
              <Link
                className="text-decoration-none link"
                to={"/forgotpassword"}
              >
                Reset
              </Link>
            </p>
            <p>
              Don't have an account?{" "}
              <Link className="text-decoration-none link" to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
