/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocalization } from "../../../../../Localization/LocalizationContext";

interface ColorPickerProps {
  label: string;
  defaultVal: string;
  id: string;
}

const ColorPicker = ({ label, defaultVal, id }: ColorPickerProps) => {
  const { getLang } = useLocalization();
  const [colorValue, setColorValue] = useState(defaultVal);

  if (label === "") {
    return null;
  }

  useEffect(() => {
    chrome.storage.local.get([`${id}State`], (result) => {
      if (result[`${id}State`]) {
        setColorValue(result[`${id}State`]);
      }
    });
  }, [id]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColorValue(newColor);
    chrome.storage.local.set({
      [`${id}State`]: newColor,
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      if (activeTabId !== undefined)
        chrome.tabs.sendMessage(activeTabId, {
          type: `${id}Toggle`,
          value: newColor,
        });
    });
  };

  const handleResetClick = () => {
    setColorValue(defaultVal);

    chrome.storage.local.set({
      [`${id}State`]: defaultVal,
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      if (activeTabId !== undefined)
        chrome.tabs.sendMessage(activeTabId, {
          type: `${id}Toggle`,
          value: defaultVal,
        });
    });
  };

  return (
    <div id={`${id}__block`} className="vkToolsColorBlock">
      <h5 className="vkToolsLowText--in">{label}</h5>
      <div className="vkToolsColorBlock--in">
        <input type="color" id={id} name="color-picker" value={colorValue} onChange={handleColorChange} />
        <a tabIndex={0} className="config-reset-icon" id={`${id}__reset`} onClick={handleResetClick}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="svg-icon">
            <title>{getLang("resetFast")}</title>
            <polygon points="16.2,5.5 14.5,3.8 10,8.3 5.5,3.8 3.8,5.5 8.3,10 3.8,14.5 5.5,16.2 10,11.7 14.5,16.2 16.2,14.5 11.7,10"></polygon>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ColorPicker;
