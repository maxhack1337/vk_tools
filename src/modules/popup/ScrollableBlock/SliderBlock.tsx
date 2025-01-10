/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface SliderBlockProps {
  label: string;
  rangeMin: number;
  rangeMax: number;
  id: string;
}

const SliderBlock = ({ label, rangeMin, rangeMax, id }: SliderBlockProps) => {
  if (label === "") {
    return null;
  }

  return (
    <div id={id} className="slider-container">
      <div className="slider-value-container">
        <label htmlFor="slider">{label}</label>
        <p id="slider-value">{rangeMax}</p>
      </div>
      <input
        type="range"
        id="slider"
        min={rangeMin}
        max={rangeMax}
        value={rangeMax}
        className="custom-slider"
        style={{
          background: "linear-gradient(to right, rgb(57, 125, 204) 100%, rgb(255, 255, 255) 100%)",
        }}
      />
    </div>
  );
};

export default SliderBlock;
