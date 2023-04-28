import React from "react";

const RatingCircle = ({ rating }) => {
  const borderColors = ["#FF0000", "#FF4C00", "#FFA500", "#FFD700", "#ADFF2F"];

  const getBorderColor = (rating) => {
    if (rating < 2) {
      return borderColors[0];
    } else if (rating < 4) {
      return borderColors[1];
    } else if (rating < 6) {
      return borderColors[2];
    } else if (rating < 8) {
      return borderColors[3];
    } else {
      return borderColors[4];
    }
  };

  const borderColor = getBorderColor(rating);

  const circleStyles = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "hsla(0, 0%, 87%, 0.7)",
    border: `5px solid ${borderColor}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  };

  return <div style={circleStyles}>{rating}</div>;
};

export default RatingCircle;
