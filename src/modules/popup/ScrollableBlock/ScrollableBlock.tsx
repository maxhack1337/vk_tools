import React from "react";
import CheckBox from "./CheckBox";
import HeaderPseudo from "./HeaderPseudo";
import LanguageSelector from "./Language/LanguageSelector";
import { useLocalization } from "../../../Localization/LocalizationContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import BlockWithInput from "./BlockWithInput";

export default function ScrollableBlock() {
  const { t } = useLocalization();
  return (
    <div className="vkToolsScrollable">
      <SimpleBar style={{ maxHeight: 486 }}>
        <HeaderPseudo label={t("appearance")} />
        <CheckBox type={"checkBox"} label={t("alternativeScrollbar")} isNew={false} isFire={false} id={"alternativeScrollbar"} shouldReload={false} />
        <CheckBox type={"checkBox"} label={t("fixLeftMenu")} isNew={false} isFire={false} id={"fixLeftMenu"} shouldReload={false} />
        <CheckBox type={"checkBox"} label={t("tabletMenu")} isNew={false} isFire={false} id={"tabletMenu"} shouldReload={false} />
        <CheckBox type={"checkBox"} label={t("doWideFeed")} isNew={false} isFire={false} id={"doWideFeed"} shouldReload={false} />
        <CheckBox type={"checkBox"} label={t("garlandDisable")} isNew={false} isFire={false} id={"garlandDisable"} shouldReload={false} />
        <BlockWithInput label={t("customLogoHeader")} placeholder={t("addLink")} buttonLabel={t("set")} canLink={true} isTextBoxAvailable={true} option={"customlogo"} />
        <BlockWithInput label={t("customBackground")} placeholder={t("addLink")} buttonLabel={t("set")} canLink={true} isTextBoxAvailable={true} option={"custombg"} />
        <BlockWithInput label={t("useCustomFont")} placeholder={t("enterFontName")} buttonLabel={t("set")} canLink={false} isTextBoxAvailable={false} option={"customfont"} />
        <LanguageSelector />
      </SimpleBar>
    </div>
  );
}
