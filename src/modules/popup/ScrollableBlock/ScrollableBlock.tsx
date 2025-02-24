/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import CheckBox from "./BlockWithActions/CheckBox";
import HeaderPseudo from "./HeaderPseudo/HeaderPseudo";
import LanguageSelector from "./Language/LanguageSelector";
import { useLocalization } from "../../../Localization/LocalizationContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import BlockWithInput from "./BlockWithActions/BlockWithInput";
import SliderBlock from "./BlockWithActions/SliderBlock";
import ColorPickers from "./BlockWithActions/ColorPickers/ColorPickers";
import LeftMenuItems from "./LeftMenuItems/LeftMenuItems";
import SecondaryHeaderPseudo from "./SecondaryHeaderPseudo/SecondaryHeaderPseudo";
import EmojiHotBarBlock from "./BlockWithActions/EmojiHotBarBlock";
import DiscoverIdBlock from "./BlockWithActions/DiscoverIdBlock";
import SettingsElement from "./Settings/SettingsElement";
import HeaderPseudoTransparent from "./HeaderPseudo/HeaderPseudoTransparent";
import CardWithLink from "./CardWithLink";
import SecondaryHeaderPseudoLittle from "./SecondaryHeaderPseudo/SecondaryHeaderPseudoLittle";
import SliderFeedBlock from "./BlockWithActions/SliderFeedBlock";
import getUpdateUrl from "./getUpdateUrl";
interface ScrollableBlockProps {
  id: string;
}

const ScrollableBlock = ({ id }: ScrollableBlockProps) => {
  const { getLang } = useLocalization();
  const [updateUrl, setUpdateUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdateUrl = async () => {
      const url = await getUpdateUrl();
      setUpdateUrl(url); // Устанавливаем полученную ссылку в состояние
    };

    fetchUpdateUrl(); // Вызываем функцию для получения ссылки
  }, []); // Пустой массив зависимостей означает, что эффект сработает только один раз при монтировании

  let currentTab = [
    <HeaderPseudo label={getLang("appearance")} />,
    <CheckBox type={"checkBox"} label={getLang("alternativeScrollbar")} isNew={false} isFire={false} id={"alternativeScrollbar"} shouldReload={false} />,
    <CheckBox type={"checkBox"} label={getLang("fixLeftMenu")} isNew={false} isFire={false} id={"fixLeftMenu"} shouldReload={false} />,
    <CheckBox type={"checkBox"} label={getLang("tabletMenu")} isNew={false} isFire={false} id={"tabletMenu"} shouldReload={false} />,
    <CheckBox type={"checkBox"} label={getLang("stickerPopupHide")} isNew={false} isFire={false} id={"stickerPopupHide"} shouldReload={false} />,
    <SliderFeedBlock label={getLang("doWideFeed")} rangeMinFeed={550} rangeMaxFeed={895} id={"doWideFeed"} />,
    //<CheckBox type={"checkBox"} label={getLang("garlandDisable")} isNew={false} isFire={false} id={"garlandDisable"} shouldReload={false} />,
    <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customLogoHeader")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"customlogo"} />,
    <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customBackground")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"custombg"} />,
    <BlockWithInput inputTypes={".otf,.ttf,.woff,.woff2"} label={getLang("useCustomFont")} placeholder={getLang("enterFontName")} buttonLabel={getLang("set")} canLink={false} isTextBoxAvailable={false} option={"customfont"} />,
    <SliderBlock label={getLang("blockTransparency")} rangeMin={0} rangeMax={100} id={"SliderBlock"} />,
    <HeaderPseudo label={getLang("pseudoTab1")} />,
    <ColorPickers />,
    <HeaderPseudo label={getLang("leftMenuSettingsHeader")} />,
    <LeftMenuItems />,
  ];
  switch (id) {
    case "tab1":
      currentTab = [];
      currentTab = [
        <HeaderPseudo label={getLang("appearance")} />,
        <CheckBox type={"checkBox"} label={getLang("alternativeScrollbar")} isNew={false} isFire={false} id={"alternativeScrollbar"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("fixLeftMenu")} isNew={false} isFire={false} id={"fixLeftMenu"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("tabletMenu")} isNew={false} isFire={false} id={"tabletMenu"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("stickerPopupHide")} isNew={false} isFire={false} id={"stickerPopupHide"} shouldReload={false} />,
        <SliderFeedBlock label={getLang("doWideFeed")} rangeMinFeed={550} rangeMaxFeed={895} id={"doWideFeed"} />,
        //<CheckBox type={"checkBox"} label={getLang("garlandDisable")} isNew={false} isFire={false} id={"garlandDisable"} shouldReload={false} />,
        <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customLogoHeader")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"customlogo"} />,
        <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customBackground")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"custombg"} />,
        <BlockWithInput inputTypes={".otf,.ttf,.woff,.woff2"} label={getLang("useCustomFont")} placeholder={getLang("enterFontName")} buttonLabel={getLang("set")} canLink={false} isTextBoxAvailable={false} option={"customfont"} />,
        <SliderBlock label={getLang("blockTransparency")} rangeMin={0} rangeMax={100} id={"SliderBlock"} />,
        <HeaderPseudo label={getLang("pseudoTab1")} />,
        <ColorPickers />,
        <HeaderPseudo label={getLang("leftMenuSettingsHeader")} />,
        <LeftMenuItems />,
      ];
      break;
    case "tab2":
      currentTab = [];
      currentTab = [
        <HeaderPseudo label={getLang("oldDTab")} />,
        <SecondaryHeaderPseudo label={getLang("someAfterReboot")} />,
        <CheckBox type={"checkBox"} label={getLang("returnCamera")} isNew={false} isFire={false} id={"returnCamera"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("showPatronymic")} isNew={false} isFire={false} id={"showPatronymic"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("removeAvatars")} isNew={false} isFire={false} id={"removeAvatars"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("removeEmojiStatus")} isNew={false} isFire={false} id={"removeEmojiStatus"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("removePostReactions")} isNew={false} isFire={false} id={"removePostReactions"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("avatarNameNear")} isNew={false} isFire={false} id={"avatarNameNear"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("newMediaViewer")} isNew={false} isFire={false} id={"newMediaViewer"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("oldClub")} isNew={true} isFire={true} id={"oldClub"} shouldReload={true} description={getLang("oldClubDescription")} />,
        <CheckBox type={"checkBox"} label={getLang("feedOldTheme")} isNew={false} isFire={true} id={"feedOldTheme"} shouldReload={true} description={getLang("feedOldThemeDescription")} />,
        <CheckBox type={"checkBox"} label={getLang("oldPosting")} isNew={false} isFire={true} id={"oldPosting"} shouldReload={true} description={getLang("oldPostingDescription")} />,
        <CheckBox type={"checkBox"} label={getLang("additionalVKEnhancerFunctions")} isNew={false} isFire={false} id={"additionalVKEnhancerFunctions"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("classicProfileInterface")} isNew={false} isFire={true} id={"classicProfileInterface"} shouldReload={true} description={getLang("classicProfileInterfaceDescription")} />,
      ];
      break;
    case "tab3":
      currentTab = [];
      currentTab = [
        <HeaderPseudo label={getLang("messenger")} />,
        <SecondaryHeaderPseudo label={getLang("someAfterReboot")} />,
        <CheckBox type={"checkBox"} label={getLang("disableReadingMessages")} isNew={false} isFire={false} id={"disableReadingMessages"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("hideTextEntry")} isNew={false} isFire={false} id={"hideTextEntry"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("removeMessageReactions")} isNew={false} isFire={false} id={"removeMessageReactions"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("disableReconnectIndicator")} isNew={false} isFire={false} id={"disableReconnectIndicator"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("standardTagInteraction")} isNew={false} isFire={false} id={"standardTagInteraction"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("oldMessagesBadge")} isNew={true} isFire={false} id={"oldMessagesBadge"} shouldReload={false} description={getLang("oldMessagesBadgeDescription")} />,
        <CheckBox type={"checkBox"} label={getLang("disableMessageCounter")} isNew={false} isFire={false} id={"disableMessageCounter"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("hideMessageFooter")} isNew={false} isFire={false} id={"hideMessageFooter"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("messageTextUp")} isNew={false} isFire={false} id={"messageTextUp"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("reloadFunctionsButton")} isNew={false} isFire={false} id={"reloadFunctionsButton"} shouldReload={false} />,
        <EmojiHotBarBlock label={getLang("emojiHotbar")} placeholder={getLang("enterEmojiCodes")} buttonLabel={getLang("updateHotbar")} description={getLang("emojiHotbarDescription")} option={"emojiHotbar"} />,
        <CheckBox type={"checkBox"} label={getLang("newMessengerDesign")} isNew={false} isFire={false} id={"newMessengerDesign"} shouldReload={true} description={getLang("newMessengerDesignDescription")} />,
        <CheckBox type={"checkBox"} label={getLang("oldMessengerDesign")} isNew={true} isFire={false} id={"oldMessengerDesign"} shouldReload={true} description={getLang("oldMessengerDesignDescription")} />,
      ];
      break;
    case "tab4":
      currentTab = [];
      currentTab = [
        <HeaderPseudo label={getLang("other")} />,
        <SecondaryHeaderPseudo label={getLang("someAfterReboot")} />,
        <CheckBox type={"checkBox"} label={getLang("disableAway")} isNew={false} isFire={false} id={"disableAway"} shouldReload={true} />,
        <CheckBox type={"checkBox"} label={getLang("hideNamesAvatars")} isNew={false} isFire={false} id={"hideNamesAvatars"} shouldReload={false} />,
        <CheckBox type={"checkBox"} label={getLang("showPollResults")} isNew={false} isFire={false} id={"showPollResults"} shouldReload={true} description={getLang("defaultPollHidden")} />,
        <CheckBox type={"checkBox"} label={getLang("doNotDisturb")} isNew={false} isFire={false} id={"doNotDisturb"} shouldReload={true} description={getLang("doNotDisturbDescription")} />,
        <DiscoverIdBlock label={getLang("enterProfileGroupID")} placeholder={getLang("notUserOrGroup")} buttonLabel={getLang("knowID")} description={getLang("enterProfileGroupIDDescription")} option={"discoverID"} />,
        <HeaderPseudo label={getLang("pseudoTab3")} />,
        <SettingsElement id={"saveSettingsToFile"} label={getLang("saveSettingsToFile")} canFile={false} />,
        <SettingsElement id={"loadSettingsFromFile"} label={getLang("loadSettingsFromFile")} canFile={true} />,
        <SettingsElement id={"resetSettings"} label={getLang("resetSettings")} canFile={false} />,
      ];
      break;

    case "tab5":
      currentTab = [];
      currentTab = [
        <HeaderPseudoTransparent label={getLang("usefulLinks")} />,
        <CardWithLink label={getLang("vkEnhancerGitHub")} description={getLang("vkEnhancerGitHubDescription")} icon={"github"} href={"https://github.com/maxhack1337/vk_tools"} />,
        <CardWithLink label={getLang("vkEnhancerGroup")} description={getLang("vkEnhancerGroupDescription")} icon={"vk"} href={"https://vk.com/vkenhancer"} />,
        <CardWithLink label={getLang("vkEnhancerChat")} description={getLang("vkEnhancerChatDescription")} icon={"chat"} href={"https://vk.me/join/AZQ1d7gWwQOl_caHw_zw472D"} />,
        <SecondaryHeaderPseudoLittle label={getLang("versionNumber")} />,
        <a className="vkToolsCardLink vkToolsActualVersion" target="_blank" href={updateUrl || "#"}>
          <h4 className="vkToolsCardLink__title vkToolsActualVersion__title">{getLang("whatsNew")}</h4>
        </a>,
        <h5 className="vkToolsVersionDescription">{getLang("errorUpdating")}</h5>,
        <LanguageSelector />,
      ];
      break;
  }

  return (
    <div className="vkToolsScrollable">
      <SimpleBar style={{ maxHeight: 486 }}>{currentTab}</SimpleBar>
    </div>
  );
};

export default ScrollableBlock;
