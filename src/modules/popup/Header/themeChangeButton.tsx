import React from "react";
import CurrentSVG from "./currentSVG";
import { useLocalization } from "../../../Localization/LocalizationContext";

export default function ThemeChangeButton() {
  const { getLang: t } = useLocalization();
  var isThemeChanged: boolean;
  const handleClick = () => {
    if (!isThemeChanged) {
      const styleElement = document.createElement("style");
      chrome.storage.local.set({
        issThemeChanged: true,
      });
      isThemeChanged = true;
      styleElement.id = "lightTheme";
      var imageurl =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28' width='28' height='28' style='display: block;'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath d='M0 0h28v28H0z'%3E%3C/path%3E%3Cpath d='M24.166 15.685a1 1 0 0 1 1.277 1.275c-.569 1.614-1.445 3.046-2.632 4.229-4.418 4.418-11.58 4.417-15.997 0-4.419-4.417-4.419-11.58 0-15.998C8 4.006 9.431 3.129 11.042 2.559a1 1 0 0 1 1.276 1.277c-1.194 3.372-.394 7.133 2.16 9.69 2.554 2.553 6.317 3.353 9.688 2.16Zm-11.102-.746a11.25 11.25 0 0 1-3.163-9.643c-.61.37-1.17.806-1.673 1.309-3.637 3.637-3.637 9.534 0 13.17a9.311 9.311 0 0 0 13.17-.002 8.75 8.75 0 0 0 1.31-1.671a11.247 11.247 0 0 1-9.644-3.163Z' fill='%232483e4'%3E%3C/path%3E%3C/g%3E%3C/svg%3E ";
      styleElement.innerHTML =
        ".vkToolsModalButton{background-color: #2483e4} #themechange svg {display:none;} .vkToolsTabbarItem.active{color:#0077FF!important} .vkToolsLogoClickable > svg > path:nth-child(6){fill:black!important} .vkToolsPseudoHeader{color:#99A2AD!important} body{background-color:#fff;}:root {--vkui--color_separator_primary:#e1e3e6!important;--vkui--color_background_secondary:#00103d0a!important;--vkui--color_text_primary:black!important;--vkui--color_background_content:#fff!important;--vkui--color_transparent--hover:rgba(0, 16, 61, 0.04)!important;--vkenhancer--chosen_tab:#0077FF!important}.vkToolsInternalTabbar{	border-top:1px solid #d3d3d3;);background-color:#fff;}.vkToolsHeader{border-bottom:1px solid #d3d3d3;}.CardLink_CardLink__title{color:#000;}.CardLink_CardLink:hover{background-color:#00103d1f;}.CardLink_CardLink{background-color:#00103d0a;}.custom-slider::-webkit-slider-thumb{	  box-shadow: 0px 0px 5px #ccc;} .vkToolsModalHeader{color:black!important;} .vkToolsModal{background-color:#fff; box-shadow: 0px 0px 10px gray;}.vkToolsCheckBox__Check--label-input:checked + .vkToolsCheckBox__Check--label-span::after{	 background-color:#2688eb!important;}.vkToolsCheckBox__Check--label-input:checked + .vkToolsCheckBox__Check--label-span::before{	background-color:#2483e4}.vkToolsBlockLabelText,.vkToolsLowText--in {	color:rgba(0,0,0,0.8);}#addstickertext,#parseidtext{	color:black;}.simplebar-track.simplebar-vertical .simplebar-scrollbar:before{	background-color:#e5e5e7;}#themechange > button{	background: url(" +
        '"' +
        imageurl +
        '"' +
        ") 4px no-repeat;}.vkenhancerThemeChanger{	color:#2483e4!important;}#themechange > button > svg > g > path:nth-child(2){	fill:#2483e4!important;}.vkenhancerVersionText{	color:rgba(0, 0, 0, 0.5)!important;}.vkToolsInput__placeholder{	 color: rgba(50, 50, 50)!important;}.ButtonInstallpreload{	 background-color:#2483e4;}.vkToolsButtonText__in,.ButtonInstallpreload > span > span.vkToolsPresentation{	 color:#fff!important;}.vkToolsLogoClickable > svg > g > g > path{	 fill:black;}.vkToolsInput input{	 border-color:rgba(0, 0, 0, 0.24)!important;}.vkToolsCheckBox{	 color:black;}.config-reset-icon > svg{	 color:black;}.vkToolsCheckBox__PrimaryTextSpan{	 color:black;}.vkToolsCheckBox__SecondaryTextSpan{color:gray;}.vkToolsCheckBox__Check--label-span::after {	 background:rgba(0, 0, 0, 0.24);}.vkebhancerHome .vkebhancerInternalPanel_in, .vkToolsRoot,.vkToolsInput input{	 background-color:#fff;} .vkToolsFuncDescription {	 background-color:#f5f5f5;	 color:#6d7885;}";
      document.head.appendChild(styleElement);
    } else {
      const customStyle = document.getElementById("lightTheme");
      if (customStyle) {
        customStyle.remove();
      }
      isThemeChanged = false;
      chrome.storage.local.set({
        issThemeChanged: false,
      });
    }
  };

  return (
    <div id="themechange" className="vkenhancerThemeChanger">
      <button id="changerb" title={t("changeTheme")} type="button" className="vkenhancerButtonMoon vkenhancerButtonHeader" onClick={handleClick}>
        <CurrentSVG />
      </button>
    </div>
  );
}
