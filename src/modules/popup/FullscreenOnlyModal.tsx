import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocalization } from "../../Localization/LocalizationContext";

interface FullscreenOnlyModalProps {
  onClose: () => void;
}

export default function FullscreenOnlyModal({ onClose }: FullscreenOnlyModalProps) {
  const { getLang } = useLocalization();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleGoToFullscreen = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={`vkToolsModalBG ${isVisible ? "visible" : "hidden"}`}>
      <div className={`vkToolsModal vkToolsFireFoxModal ${isVisible ? "" : "hidden"}`}>
        <p className="vkToolsModalHeader vkToolsFireFoxModalHeader">{getLang("onlyFireFox")}</p>
        <div className="vkToolsModalButtons">
          <button className="vkToolsModalButton" onClick={handleGoToFullscreen}>
            <span className="vkToolsButtonText">
              <span className="vkToolsButtonText__in">{getLang("openExtension")}</span>
            </span>
          </button>
          <button className="vkToolsModalButton" onClick={handleClose}>
            <span className="vkToolsButtonText">
              <span className="vkToolsButtonText__in">{getLang("globalCancel")}</span>
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.querySelector(".vkToolsRoot")!
  );
}
