import React from "react";
import CheckBox from "./CheckBox";
import HeaderPseudo from "./HeaderPseudo";
import LanguageSelector from "./Language/LanguageSelector";
import { useLocalization } from "../../../Localization/LocalizationContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import BlockWithInput from "./BlockWithInput";

export default function ScrollableBlock() {
  const { getLang } = useLocalization();

  const checkBoxes = [
    { id: "alternativeScrollbar", label: getLang("alternativeScrollbar") },
    { id: "fixLeftMenu", label: getLang("fixLeftMenu") },
    { id: "tabletMenu", label: getLang("tabletMenu") },
    { id: "doWideFeed", label: getLang("doWideFeed") },
    { id: "garlandDisable", label: getLang("garlandDisable") },
  ];

  const blockWithInputs = [
    { label: getLang("customLogoHeader"), placeholder: getLang("addLink"), buttonLabel: getLang("set"), canLink: true, isTextBoxAvailable: true, option: "customlogo" },
    { label: getLang("customBackground"), placeholder: getLang("addLink"), buttonLabel: getLang("set"), canLink: true, isTextBoxAvailable: true, option: "custombg" },
    { label: getLang("useCustomFont"), placeholder: getLang("enterFontName"), buttonLabel: getLang("set"), canLink: false, isTextBoxAvailable: false, option: "customfont" },
  ];

  return (
    <div className="vkToolsScrollable">
      <SimpleBar style={{ maxHeight: 486 }}>
        <HeaderPseudo label={getLang("appearance")} />
        {checkBoxes.map((checkBox) => (
          <CheckBox key={checkBox.id} type={"checkBox"} label={checkBox.label} isNew={false} isFire={false} id={checkBox.id} shouldReload={false} />
        ))}
        {blockWithInputs.map((blockWithInput) => (
          <BlockWithInput key={blockWithInput.option} label={blockWithInput.label} placeholder={blockWithInput.placeholder} buttonLabel={blockWithInput.buttonLabel} canLink={blockWithInput.canLink} isTextBoxAvailable={blockWithInput.isTextBoxAvailable} option={blockWithInput.option} />
        ))}
        <LanguageSelector />
      </SimpleBar>
    </div>
  );
}
