import React, { useContext, useEffect, useState } from "react";
import "./MainSlider.css";
import Slider from "react-slick";
import mainSliderPhotos from "../../MainSliderPhotos";
import $ from "jquery";
import { userDataContext } from "../../Context/UserDataContext";
export default function MainSlider() {
  let { UserData } = useContext(userDataContext);
  const [sortedArray, setSortedArray] = useState([]);

  useEffect(() => {
    const newSortedArray = mainSliderPhotos
      .slice()
      .sort(() => Math.random() - 0.5);
    setSortedArray(newSortedArray);
  }, []);
  setTimeout(() => {
    $(document, window).ready(function () {
      $(".screenflix").width(345);
    });
  }, 1000);

  function SampleNextArrow(props) {
    const { className } = props;
    return <div className={className} style={{ display: "none" }} />;
  }
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    // autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
  };
  return (
    <div className="mainSlider">
      <div className="h-100 position-absolute top-0 start-0 p-0 w-100">
        <Slider {...settings}>
          {sortedArray.map((photo, index) => (
            <div
              key={index}
              className="position-absolute top-0 start-0 w-100 h-100 text-decoration-none slider p-0 w-100 h-100"
            >
              <div
                style={{
                  background: `url(${photo.src})`,
                  width: "100%",
                  height: "100%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  position: "relative",
                }}
              >
                <div
                  className="position-absolute layer d-flex align-items-start justify-content-center flex-column top-0 start-0 w-100 h-100"
                  style={{
                    backgroundImage:
                      "linear-gradient( 30% transparent, 70% black)",
                  }}
                >
                  <div className="intro container-fluid">
                    <h1 className="introContent bold900 ms-5 mb-3 d-flex align-items-end flex-wrap">
                      Welcome{" "}
                      {UserData ? (
                        <span className="ms-3">
                          {" "}
                          {UserData.name.trim().split(" ")[0]}!
                        </span>
                      ) : (
                        <span className="ms-3"> To </span>
                      )}
                      <div className="overflow-hidden d-flex justify-content-end screenflix">
                        <img
                          src={"https://i.imgur.com/5jV7Pow.png"}
                          width={325}
                          className="d-inline"
                          alt="Title"
                        />
                      </div>
                    </h1>
                    <h2 className="introContent h4 ms-5 ps-0 text-white-50">
                      Millions of movies, TV shows and people to discover.
                      Explore now.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
