/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import CheckBox from "./BlockWithActions/CheckBox";
import LanguageSelector from "./Language/LanguageSelector";
import { useLocalization } from "../../../Localization/LocalizationContext";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import BlockWithInput from "./BlockWithActions/BlockWithInput";
import SliderBlock from "./BlockWithActions/SliderBlock";
import ColorPickers from "./BlockWithActions/ColorPickers/ColorPickers";
import LeftMenuItems from "./LeftMenuItems/LeftMenuItems";
import EmojiHotBarBlock from "./BlockWithActions/EmojiHotBarBlock";
import SettingsElement from "./Settings/SettingsElement";
import HeaderPseudoTransparent from "./HeaderPseudo/HeaderPseudoTransparent";
import CardWithLink from "./CardWithLink";
import SliderFeedBlock from "./BlockWithActions/SliderFeedBlock";
import getUpdateUrl from "./getUpdateUrl";
interface ScrollableBlockProps {
  id: string;
  initialScroll: number;
}

const ScrollableBlock = forwardRef(({ id, initialScroll }: ScrollableBlockProps, ref) => {
  const { getLang } = useLocalization();
  const [updateUrl, setUpdateUrl] = useState<string | null>(null);
  const simpleBarRef = useRef<any>(null);

  useEffect(() => {
    const fetchUpdateUrl = async () => {
      const url = await getUpdateUrl();
      setUpdateUrl(url);
    };

    fetchUpdateUrl();
  }, []);

  useImperativeHandle(ref, () => ({
    getScrollPosition: () => {
      return simpleBarRef.current?.getScrollElement()?.scrollTop || 0;
    },
  }));

  useEffect(() => {
    const scrollEl = simpleBarRef.current?.getScrollElement();
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
      return () => {
        scrollEl.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    chrome.storage.local.get([`scrollPos_${id}`], (result) => {
      const savedScroll = result[`scrollPos_${id}`] ?? 0;
      setTimeout(() => {
        if (simpleBarRef.current) {
          const el = simpleBarRef.current.getScrollElement();
          el.scrollTop = savedScroll;
        }
      }, 0);
    });
  }, [id]);

  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

  const handleScroll = () => {
    if (simpleBarRef.current) {
      const scrollEl = simpleBarRef.current.getScrollElement();
      chrome.storage.local.get(["defaultTab"], function (result) {
        chrome.storage.local.set({
          [`scrollPos_${result.defaultTab}`]: scrollEl.scrollTop,
        });
      });
    }
  };

  let currentTab = [
    <div className="vkToolsBlockWithPadding">
      <HeaderPseudoTransparent label={getLang("appearance")} />
      {!isFirefox && <CheckBox type={"checkBox"} label={getLang("alternativeScrollbar")} isNew={false} isFire={false} id={"alternativeScrollbar"} shouldReload={false} />}
      <CheckBox type={"checkBox"} label={getLang("fixLeftMenu")} isNew={false} isFire={false} id={"fixLeftMenu"} shouldReload={false} />
      <CheckBox type={"checkBox"} label={getLang("tabletMenu")} isNew={false} isFire={false} id={"tabletMenu"} shouldReload={false} />
      <CheckBox type={"checkBox"} label={getLang("stickerPopupHide")} isNew={false} isFire={false} id={"stickerPopupHide"} shouldReload={false} />
      <SliderFeedBlock label={getLang("doWideFeed")} rangeMinFeed={550} rangeMaxFeed={895} id={"doWideFeed"} />
      <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customLogoHeader")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"customlogo"} />
      <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customBackground")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"custombg"} />
      <BlockWithInput inputTypes={".otf,.ttf,.woff,.woff2"} label={getLang("useCustomFont")} placeholder={getLang("enterFontName")} buttonLabel={getLang("set")} canLink={false} isTextBoxAvailable={false} option={"customfont"} />
      <SliderBlock label={getLang("blockTransparency")} rangeMin={0} rangeMax={100} id={"SliderBlock"} />
    </div>,
    <div className="vkToolsBlockWithPadding">
      <HeaderPseudoTransparent label={getLang("pseudoTab1")} textForTT={getLang("accentDesc")} />
      <ColorPickers />
    </div>,
    <div className="vkToolsBlockWithPadding">
      <HeaderPseudoTransparent label={getLang("leftMenuSettingsHeader")} />
      <LeftMenuItems />
    </div>,
    <LanguageSelector displayNone={true} />,
  ];
  switch (id) {
    case "tab1":
      currentTab = [];
      currentTab = [
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("appearance")} />
          {!isFirefox && <CheckBox type={"checkBox"} label={getLang("alternativeScrollbar")} isNew={false} isFire={false} id={"alternativeScrollbar"} shouldReload={false} />}
          <CheckBox type={"checkBox"} label={getLang("fixLeftMenu")} isNew={false} isFire={false} id={"fixLeftMenu"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("tabletMenu")} isNew={false} isFire={false} id={"tabletMenu"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("stickerPopupHide")} isNew={false} isFire={false} id={"stickerPopupHide"} shouldReload={false} />
          <SliderFeedBlock label={getLang("doWideFeed")} rangeMinFeed={550} rangeMaxFeed={895} id={"doWideFeed"} />
          <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customLogoHeader")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"customlogo"} />
          <BlockWithInput inputTypes={"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"} label={getLang("customBackground")} placeholder={getLang("addLink")} buttonLabel={getLang("set")} canLink={true} isTextBoxAvailable={true} option={"custombg"} />
          <BlockWithInput inputTypes={".otf,.ttf,.woff,.woff2"} label={getLang("useCustomFont")} placeholder={getLang("enterFontName")} buttonLabel={getLang("set")} canLink={false} isTextBoxAvailable={false} option={"customfont"} />
          <SliderBlock label={getLang("blockTransparency")} rangeMin={0} rangeMax={100} id={"SliderBlock"} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("pseudoTab1")} textForTT={getLang("accentDesc")} />
          <ColorPickers />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("leftMenuSettingsHeader")} />
          <LeftMenuItems />
        </div>,
        <LanguageSelector displayNone={true} />,
      ];
      break;
    case "tab2":
      currentTab = [];
      currentTab = [
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("oldDTab")} textForTT={getLang("someAfterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("oldLoader")} isNew={false} isFire={false} id={"oldLoader"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("oldClub")} isNew={false} isFire={false} id={"oldClub"} shouldReload={true} description={getLang("oldClubDescription")} />
          <CheckBox type={"checkBox"} label={getLang("compactPhotos")} isNew={false} isFire={false} id={"compactPhotos"} shouldReload={false} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("video")} textForTT={getLang("afterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("additionalVKEnhancerFunctions")} isNew={false} isFire={false} id={"additionalVKEnhancerFunctions"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("classicVideoPlaylists")} isNew={false} isFire={false} id={"classicVideoPlaylists"} shouldReload={true} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("profile")} textForTT={getLang("someAfterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("returnCamera")} isNew={false} isFire={false} id={"returnCamera"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("showPatronymic")} isNew={false} isFire={false} id={"showPatronymic"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("removeEmojiStatus")} isNew={false} isFire={false} id={"removeEmojiStatus"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("avatarNameNear")} isNew={false} isFire={false} id={"avatarNameNear"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("classicProfileInterface")} isNew={false} isFire={true} id={"classicProfileInterface"} shouldReload={true} description={getLang("classicProfileInterfaceDescription")} shouldWarn={true} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("feedAndPosts")} textForTT={getLang("afterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("removePostReactions")} isNew={false} isFire={false} id={"removePostReactions"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("newMediaViewer")} isNew={false} isFire={false} id={"newMediaViewer"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("feedOldTheme")} isNew={false} isFire={true} id={"feedOldTheme"} shouldReload={true} description={getLang("feedOldThemeDescription")} shouldWarn={true} />
          <CheckBox type={"checkBox"} label={getLang("oldPosting")} isNew={false} isFire={true} id={"oldPosting"} shouldReload={true} description={getLang("oldPostingDescription")} />
        </div>,
        <LanguageSelector displayNone={true} />,
      ];
      break;
    case "tab3":
      currentTab = [];
      currentTab = [
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("messenger")} textForTT={getLang("someAfterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("removeMessageReactions")} isNew={false} isFire={false} id={"removeMessageReactions"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("disableReconnectIndicator")} isNew={false} isFire={false} id={"disableReconnectIndicator"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("disableMessageCounter")} isNew={false} isFire={false} id={"disableMessageCounter"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("hideMessageFooter")} isNew={false} isFire={false} id={"hideMessageFooter"} shouldReload={false} />
          <EmojiHotBarBlock label={getLang("emojiHotbar")} placeholder={getLang("enterEmojiCodes")} buttonLabel={getLang("updateHotbar")} description={getLang("emojiHotbarDescription")} option={"emojiHotbar"} />
          <CheckBox type={"checkBox"} label={getLang("createYtPlayer")} isNew={false} isFire={true} id={"createYtPlayer"} shouldReload={true} description={getLang("createYtPlayerDescription")} />
          <CheckBox type={"checkBox"} label={getLang("newMessengerDesign")} isNew={false} isFire={false} id={"newMessengerDesign"} shouldReload={true} description={getLang("newMessengerDesignDescription")} shouldAlert={true} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("activity")} textForTT={getLang("afterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("disableReadingMessages")} isNew={false} isFire={false} id={"disableReadingMessages"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("hideTextEntry")} isNew={false} isFire={false} id={"hideTextEntry"} shouldReload={true} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("oldDTab")} textForTT={getLang("someAfterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("standardTagInteraction")} isNew={false} isFire={false} id={"standardTagInteraction"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("messageTextUp")} isNew={false} isFire={false} id={"messageTextUp"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("reloadFunctionsButton")} isNew={false} isFire={false} id={"reloadFunctionsButton"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("oldMessagesBadge")} isNew={false} isFire={false} id={"oldMessagesBadge"} shouldReload={false} description={getLang("oldMessagesBadgeDescription")} />
          <CheckBox type={"checkBox"} label={getLang("oldMessengerAttaches")} isNew={false} isFire={true} id={"oldMessengerAttaches"} shouldReload={true} description={getLang("oldMessenderAttachesDescription")} shouldWarn={true} />
          <CheckBox type={"checkBox"} label={getLang("oldMessengerDesign")} isNew={false} isFire={false} id={"oldMessengerDesign"} shouldReload={true} description={getLang("oldMessengerDesignDescription")} />
        </div>,
        <LanguageSelector displayNone={true} />,
      ];
      break;
    case "tab4":
      currentTab = [];
      currentTab = [
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("other")} textForTT={getLang("someAfterReboot")} />
          <CheckBox type={"checkBox"} label={getLang("disableAway")} isNew={false} isFire={false} id={"disableAway"} shouldReload={true} />
          <CheckBox type={"checkBox"} label={getLang("hideNamesAvatars")} isNew={false} isFire={false} id={"hideNamesAvatars"} shouldReload={false} />
          <CheckBox type={"checkBox"} label={getLang("showPollResults")} isNew={false} isFire={false} id={"showPollResults"} shouldReload={true} description={getLang("defaultPollHidden")} />
          <CheckBox type={"checkBox"} label={getLang("doNotDisturb")} isNew={false} isFire={false} id={"doNotDisturb"} shouldReload={true} description={getLang("doNotDisturbDescription")} />
          <CheckBox type={"checkBox"} label={getLang("enterProfileGroupID")} isNew={false} isFire={false} id={"enterProfileGroupID"} shouldReload={true} />
        </div>,
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("pseudoTab3")} />
          <SettingsElement id={"saveSettingsToFile"} label={getLang("saveSettingsToFile")} canFile={false} />
          <SettingsElement id={"loadSettingsFromFile"} label={getLang("loadSettingsFromFile")} canFile={true} />
          <SettingsElement id={"resetSettings"} label={getLang("resetSettings")} canFile={false} />
        </div>,
        <LanguageSelector displayNone={true} />,
      ];
      break;

    case "tab5":
      currentTab = [];
      currentTab = [
        <div className="vkToolsBlockWithPadding">
          <HeaderPseudoTransparent label={getLang("usefulLinks")} />
          <CardWithLink label={getLang("vkEnhancerGitHub")} description={getLang("vkEnhancerGitHubDescription")} icon={"github"} href={"https://github.com/maxhack1337/vk_tools"} />
          <CardWithLink label={getLang("vkEnhancerGroup")} description={getLang("vkEnhancerGroupDescription")} icon={"vk"} href={"https://vk.com/vkenhancer"} />
          <CardWithLink label={getLang("vkEnhancerChat")} description={getLang("vkEnhancerChatDescription")} icon={"chat"} href={"https://vk.me/join/AZQ1d7gWwQOl_caHw_zw472D"} />
        </div>,
        <div className="vkToolsBlockWithPadding vkToolsFooterBlock">
          <HeaderPseudoTransparent label={getLang("versionNumber")} />
          <a className="vkToolsCardLink vkToolsActualVersion" target="_blank" href={updateUrl || "#"}>
            <h4 className="vkToolsCardLink__title vkToolsActualVersion__title">{getLang("whatsNew")}</h4>
          </a>
          <LanguageSelector />
        </div>,
      ];
      break;
  }

  return (
    <div className="vkToolsScrollable">
      <SimpleBar style={{ maxHeight: 486 }} ref={simpleBarRef} onScroll={handleScroll}>
        {currentTab}
      </SimpleBar>
    </div>
  );
});

export default ScrollableBlock;
