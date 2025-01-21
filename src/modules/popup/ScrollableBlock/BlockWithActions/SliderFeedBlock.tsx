/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

interface SliderFeedBlockProps {
  label: string;
  rangeMinFeed: number;
  rangeMaxFeed: number;
  id: string;
}

const SliderFeedBlock = ({ label, rangeMinFeed, rangeMaxFeed, id }: SliderFeedBlockProps) => {
  if (label === "") {
    return null;
  }

  const [valueFeed, setValueFeed] = useState(rangeMinFeed);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["feedValue"], (result) => {
      const storedValue = result.feedValue;
      if (storedValue !== undefined) {
        setValueFeed(storedValue);
      } else {
        setValueFeed(rangeMinFeed);
      }
      setIsLoaded(true);
    });
  }, [rangeMinFeed]);

  useEffect(() => {
    if (isLoaded) {
      const sliderElement = document.getElementById("slider-feed") as HTMLInputElement;
      if (sliderElement) {
        sliderElement.value = valueFeed.toString();
        updateSliderColor(valueFeed);
        saveSliderValue(valueFeed);
      }
    }
  }, [valueFeed, isLoaded]);

  const updateSliderColor = (value: number) => {
    const sliderValueElement = document.getElementById("slider-value-feed") as HTMLElement;
    if (sliderValueElement) {
      sliderValueElement.textContent = `${value}px`;
    }
    const sliderElement = document.getElementById("slider-feed") as HTMLInputElement;
    if (sliderElement) {
      const percentage = ((value - rangeMinFeed) / (rangeMaxFeed - rangeMinFeed)) * 100;
      const colorBefore = `linear-gradient(to right, #397dcc ${percentage}%, #ffffff ${percentage}%)`;
      sliderElement.style.background = colorBefore;
    }
  };

  const saveSliderValue = (value: number) => {
    chrome.storage.local.set({
      feedValue: value,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValueFeed(newValue);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id !== undefined) {
        chrome.tabs.sendMessage(activeTab.id, {
          type: "feedValue",
          value: newValue,
        });
      }
    });
  };

  return (
    <div id={id} className="slider-container">
      <div className="slider-value-container">
        <label htmlFor="slider">{label}</label>
        <p id="slider-value-feed">{valueFeed}px</p>
      </div>
      <input
        type="range"
        id="slider-feed"
        min={rangeMinFeed}
        max={rangeMaxFeed}
        value={valueFeed}
        onChange={handleInputChange}
        className="custom-slider"
        style={{
          background: `linear-gradient(to right, #397dcc ${((valueFeed - rangeMinFeed) / (rangeMaxFeed - rangeMinFeed)) * 100}%, #ffffff ${((valueFeed - rangeMinFeed) / (rangeMaxFeed - rangeMinFeed)) * 100}%)`,
        }}
      />
    </div>
  );
};

export default SliderFeedBlock;
