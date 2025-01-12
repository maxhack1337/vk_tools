/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

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

  const [value, setValue] = useState(rangeMax);

  useEffect(() => {
    chrome.storage.local.get(["sliderValue"], (result) => {
      const storedValue = result.sliderValue;
      if (storedValue !== undefined) {
        setValue(storedValue);
      }
    });
  }, []);

  useEffect(() => {
    const sliderElement = document.getElementById("slider") as HTMLInputElement;
    if (sliderElement) {
      sliderElement.value = value.toString();
      updateSliderColor(value);
      saveSliderValue(value);
    }
  }, [value]);

  const updateSliderColor = (value: number) => {
    const sliderValueElement = document.getElementById("slider-value") as HTMLElement;
    if (sliderValueElement) {
      sliderValueElement.textContent = `${value}%`;
    }
    const sliderElement = document.getElementById("slider") as HTMLInputElement;
    if (sliderElement) {
      const percentage = value;
      const colorBefore = `linear-gradient(to right, #397dcc ${percentage}%, #ffffff ${percentage}%)`;
      sliderElement.style.background = colorBefore;
    }
  };

  const saveSliderValue = (value: number) => {
    chrome.storage.local.set({
      sliderValue: value,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id !== undefined) {
        chrome.tabs.sendMessage(activeTab.id, {
          type: "sliderValue",
          value: newValue,
        });
      }
    });
  };

  return (
    <div id={id} className="slider-container">
      <div className="slider-value-container">
        <label htmlFor="slider">{label}</label>
        <p id="slider-value">{value}%</p>
      </div>
      <input
        type="range"
        id="slider"
        min={rangeMin}
        max={rangeMax}
        value={value}
        onChange={handleInputChange}
        className="custom-slider"
        style={{
          background: `linear-gradient(to right, #397dcc ${value}%, #ffffff ${value}%)`,
        }}
      />
    </div>
  );
};

export default SliderBlock;
