/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ToolTip from "./Tooltip";

interface EmojiHotBarBlockProps {
  label: string;
  placeholder: string;
  buttonLabel: string;
  description: string;
  option: string;
}

const EmojiHotBarBlock: React.FC<EmojiHotBarBlockProps> = ({ label, placeholder, buttonLabel, option, description }) => {
  const [textInputValue, setTextInputValue] = useState("");

  useEffect(() => {
    chrome.storage.local.get([`${option}State`], (result) => {
      if (result[`${option}State`]) {
        setTextInputValue(result[`${option}State`].join(", "));
      }
    });
  }, [option]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const emojiArray = textInputValue.split(",").map((emoji) => emoji.trim());

    chrome.storage.local.set({
      [`${option}State`]: emojiArray,
    });

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        const activeTabId = tabs[0].id;
        if (activeTabId !== undefined)
          chrome.tabs.sendMessage(activeTabId, {
            type: `${option}Toggle`,
            value: emojiArray,
          });
      }
    );
  };

  const handleSvgClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    chrome.tabs.create({
      url: "https://vkenhancer.ru/emoji.html",
    });
  };

  return (
    <div className="vkToolsBlockLabel">
      <div className="vkToolsBlockHeaderWrapper" style={{ color: "var(--vkui--color_text_primary)" }}>
        <span className="vkToolsCheckBox__PrimaryTextSpan">{label}</span>
        {description && <ToolTip text={description} />}
      </div>
      <span className="vkToolsInput">
        <input id={`${option}__tb__`} placeholder={placeholder} type="text" className="vkToolsInput__placeholder" value={textInputValue} onChange={handleTextChange} />
        <div className="vkToolsInput__after">
          <button type="button" className="vkToolsInput__after--button" onClick={handleSvgClick}>
            <svg className=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z"
                clip-rule="evenodd"></path>
            </svg>
            <span aria-hidden="true" className="vkenhancerSpanHidden"></span>
            <span aria-hidden="true" className="vkenhancerCBHidden vkenhancerSpanHidden__in"></span>
          </button>
        </div>
        <span aria-hidden="true" className="vkToolsInput__placeholder-empty"></span>
      </span>
      <div className="vkToolsBlockFooter">
        <button className="ButtonInstallpreload" id={`${option}__not-file__`} onClick={handleButtonClick}>
          <span className="ButtonInstall" style={{ marginTop: "0px" }}>
            <span className="vkToolsPresentation" role="presentation"></span>
            <span style={{ display: "flex", paddingRight: "22px" }} className="vkToolsButtonText__in">
              {buttonLabel}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default EmojiHotBarBlock;
