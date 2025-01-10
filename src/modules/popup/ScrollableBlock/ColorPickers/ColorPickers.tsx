/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";
import ColorPicker from "./ColorPicker";

export default function ColorPickers() {
  const { getLang } = useLocalization();

  return (
    <div className="vkToolsAccentsBlock">
      <ColorPicker label={getLang("customAccent")} defaultVal={"#FFFFFF"} id={"color-picker-accent"} />
      <ColorPicker label={getLang("highlightColor")} defaultVal={"#3291FF"} id={"color-picker-selection"} />
      <ColorPicker label={getLang("selectedTextColor")} defaultVal={"#FFFFFF"} id={"color-picker-selection-text"} />
    </div>
  );
}
