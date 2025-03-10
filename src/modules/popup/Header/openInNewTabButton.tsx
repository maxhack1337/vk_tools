import React from "react";
import { useLocalization } from "../../../Localization/LocalizationContext";

export default function OpenInNewTabButton() {
  const { getLang: t } = useLocalization();

  const handleClick = () => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.create({ url: "index.html" });
    } else {
      console.error("This feature is only available in a Chrome Extension environment.");
    }
  };

  return (
    <div id="openInNewTab" className="vkenhancerThemeChanger">
      <button id="openinnewtab" title={t("openExtension")} type="button" className="vkEnhancerButtonHeader" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
          <g fill="currentColor">
            <rect x="0.65" y="3.95" width="2.16" height="19.37" rx="1.08" ry="1.11" />
            <rect transform="matrix(2.02061E-14 0.936332 -0.563401 1.82077E-14 11.9651 3.94591)" width="2.3" height="20.07" rx="1.15" ry="1.15" />
            <rect transform="matrix(3.48055E-14 0.937357 -0.966461 1.82632E-14 20.0573 21.1527)" width="2.3" height="20.07" rx="1.15" ry="1.15" />
            <rect x="17.89" y="11.51" width="2.16" height="11.8" rx="1.08" ry="0.68" />
            <rect transform="matrix(1.59872E-14 0.936332 -0.445484 1.82354E-14 23.254 0.640859)" width="2.3" height="20.07" rx="1.15" ry="1.15" />
            <rect x="21.18" y="0.7" width="2.16" height="8.94" rx="1.08" ry="0.51" />
            <rect transform="matrix(0.662087 0.662087 -0.605919 0.605919 22.191 0.23717)" width="2.3" height="20.07" rx="1.15" ry="1.15" />
          </g>
        </svg>
      </button>
    </div>
  );
}
