"use client";
import React, { useState } from "react";

const StarWidget = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="container">
      <div>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
          <span
            className="star"
            key={item}
            onMouseOver={() => {
              setHover(item);
            }}
            onMouseOut={() => {
              setHover(rating);
            }}
            onClick={() => {
              setRating(item);
            }}
            style={
              hover >= item || rating >= item
                ? { color: "gold" }
                : { color: "#e4e4e4" }
            }
          >
            &#9733;
          </span>
        ))}
        <p className="star__rating">Star rating is: {rating}</p>
      </div>
    </div>
  );
};

export default StarWidget;
