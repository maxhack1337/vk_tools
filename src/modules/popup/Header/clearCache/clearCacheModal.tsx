import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocalization } from "../../../../Localization/LocalizationContext";

interface ClearCacheModalProps {
  onClose: () => void;
}

export default function ClearCacheModal({ onClose }: ClearCacheModalProps) {
  const { getLang } = useLocalization();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleYes = () => {
    chrome.browsingData.remove(
      {
        since: 0,
      },
      {
        cache: true,
        appcache: true,
      },
      function () {
        chrome.tabs.query(
          {
            url: ["https://vk.com/*", "https://vk.ru/*", "https://vkvideo.ru/*"],
          },
          function (tabs) {
            tabs.forEach(function (tab) {
              if (tab.id !== undefined) {
                chrome.tabs.reload(tab.id, {
                  bypassCache: true,
                });
              }
            });
          }
        );
      }
    );

    handleClose();
  };

  const handleNo = () => {
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
      <div className={`vkToolsModal ${isVisible ? "" : "hidden"}`}>
        <p className="vkToolsModalHeader">{getLang("clearCacheDescription")}</p>
        <div className="vkToolsModalButtons">
          <button className="vkToolsModalButton" onClick={handleYes}>
            <span className="vkToolsButtonText">
              <span className="vkToolsButtonText__in">{getLang("globalYes")}</span>
            </span>
          </button>
          <button className="vkToolsModalButton" onClick={handleNo}>
            <span className="vkToolsButtonText">
              <span className="vkToolsButtonText__in">{getLang("globalNo")}</span>
            </span>
          </button>
        </div>
      </div>
    </div>,
    document.querySelector(".vkToolsRoot")!
  );
}
