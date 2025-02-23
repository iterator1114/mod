"use client";
import React, { useState } from "react";

const Progress = ({ percent }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  setTimeout(() => {
    setAnimatedValue(percent);
  }, 500);

  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          //   width: `${animatedValue}%`,
          transform: `translateX(${animatedValue - 100}%)`,
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span style={percent < 5 ? { color: "#000" } : { color: "#fff" }}>
          {percent}%
        </span>
      </div>
    </div>
  );
};

const ProgressBarContainer = () => {
  let arr = Array.from({ length: 11 }, (_, i) => i * 10);
  return (
    <div className="progress__container">
      <div>
        {arr.map((item, index) => (
          <Progress percent={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProgressBarContainer;
