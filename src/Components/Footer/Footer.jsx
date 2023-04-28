import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="p-4 text-center mt-5 position-absolute w-100">
      <h3 className="text-white h6 m-0 opacity-50">
      All rights reserved © (Company), 5/2023. Programmed by <Link to={"https://www.linkedin.com/in/omar-m-abdelhamid-b78151195/"} target="_blank" className="text-decoration-none">Omar</Link>.
      </h3>
    </footer>
}
