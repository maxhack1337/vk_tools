/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";

interface DiscoverIdBlockProps {
  label: string;
  placeholder: string;
  buttonLabel: string;
  description: string;
  option: string;
}

const DiscoverIdBlock: React.FC<DiscoverIdBlockProps> = ({ label, placeholder, buttonLabel, option, description }) => {
  const [textInputValue, setTextInputValue] = useState("");
  const { getLang } = useLocalization();

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.greeting) {
      const inputElement = document.getElementById(`${option}__tb__`) as HTMLInputElement;
      console.log("Greetings " + message.greeting);
      if (message.greeting === "undefined") {
        inputElement.value = getLang("notGroupOrUserId");
      }
      inputElement.value = message.greeting;
    }
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        const activeTabId = tabs[0].id;
        if (activeTabId !== undefined) {
          chrome.tabs.sendMessage(activeTabId, {
            type: "checkId",
          });
        }
      }
    );
  };

  const handleButtonCopy = () => {
    const inputElement = document.getElementById(`${option}__tb__`) as HTMLInputElement;
    if (inputElement && inputElement.value !== getLang("notGroupOrUserId")) {
      copyToClipboard(inputElement.value);
      inputElement.value = getLang("copiedToCB");
    }
  };

  function copyToClipboard(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  return (
    <div className="vkToolsBlockLabel">
      <h5 className="vkToolsBlockLabelText">{label}</h5>
      <span className="vkToolsFuncDescription">{description}</span>
      <span className="vkToolsInput">
        <input disabled id={`${option}__tb__`} placeholder={placeholder} type="text" className="vkToolsInput__placeholder" value={placeholder} onChange={handleTextChange} />
        <div className="vkToolsInput__after">
          <button type="button" className="vkToolsInput__after--button" onClick={handleButtonCopy}>
            <svg fill="currentColor" aria-hidden="true" display="block" className=" vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--linked_outline_24 " viewBox="0 0 24 24" width="24" height="24">
              <path
                fill-rule="evenodd"
                d="M13.49 4.293a4.402 4.402 0 0 1 6.225 6.225l-1.072 1.072a.9.9 0 0 1-1.273-1.274l1.071-1.071a2.601 2.601 0 1 0-3.678-3.679l-3.537 3.537a2.601 2.601 0 0 0 0 3.679.9.9 0 1 1-1.274 1.273 4.402 4.402 0 0 1 0-6.225zm-.708 5.66a.9.9 0 0 1 1.273 0 4.402 4.402 0 0 1 0 6.225l-3.537 3.537a4.402 4.402 0 0 1-6.225-6.226l1.122-1.122a.9.9 0 0 1 1.273 1.274l-1.122 1.122a2.601 2.601 0 1 0 3.679 3.678l3.537-3.537a2.601 2.601 0 0 0 0-3.678.9.9 0 0 1 0-1.274z"
                clip-rule="evenodd"></path>
            </svg>
            <span aria-hidden="true" className="vkenhancerSpanHidden"></span>
            <span aria-hidden="true" className="vkenhancerCBHidden vkenhancerSpanHidden__in"></span>
          </button>
        </div>
        <span aria-hidden="true" className="vkToolsInput__placeholder-empty"></span>
      </span>
      <div className="vkToolsBlockFooter">
        <button type="button" className="ButtonInstallpreload" id={`${option}__not-file__`} onClick={handleButtonClick}>
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

export default DiscoverIdBlock;
