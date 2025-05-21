/* eslint-disable @typescript-eslint/no-unused-expressions */
import addOpacity from "./AddOpacity";
import appendTopName from "./appendTopName";
import create from "./create";
import fromId from "./fromId";
import HotBarAppear from "./HotBarAppear";
import customMessage from "./postMessage";
import injectScript from "../inject/inject";
import { sleep } from "../sleep";
console.log("VK Tools content script is running!");

injectScript(chrome.runtime.getURL("src/main.js"));

async function CheckToken() {
  await sleep(1000);
  if (window.location.href.indexOf("https://oauth.vk.com/blank.html") === -1 && window.location.href.indexOf("https://oauth.vk.com/authorize") === -1 && window.location.href.indexOf("https://oauth.vk.com/oauth/authorize") === -1) {
    window.location.href = "https://oauth.vk.com/authorize?client_id=6121396&scope=196608&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1";
    return;
  }

  const closeButton = document.querySelector(".button_indent:not(:has(>.pr))") as HTMLButtonElement;
  if (closeButton) {
    closeButton.click();
    return;
  }
  const accessToken = new URLSearchParams(window.location.hash.slice(1)).get("access_token");
  if (accessToken) {
    console.log("Токен загружен успешно:", accessToken);
    chrome.runtime.sendMessage({
      type: "vken_access_token",
      value: accessToken,
    });
    window.location.href = "https://vk.com/feed";
    return;
  } else {
    console.log("Токен не найден в URL");
  }
}
var vkenAccessToken1 = "";

(async () => {
  window.postMessage({ action: "Init" }, "*");
  window.postMessage(
    {
      action: "Urls",
      urls: {
        im_css: chrome.runtime.getURL("css/im-page-open.css"),
        profile_css: chrome.runtime.getURL("css/classical-profile-view.css"),
      },
    },
    "*"
  );
})();

const functions = [
  "additionalVKEnhancerFunctionsState",
  "alternativeScrollbarState",
  "avatarNameNearState",
  "classicProfileInterfaceState",
  "color-picker-accentState",
  "color-picker-selection-textState",
  "color-picker-selectionState",
  "custombgState",
  "customfontState",
  "customlogoState",
  "disableAwayState",
  "disableMessageCounterState",
  "doWideFeedState",
  "emojiHotbarState",
  "feedOldThemeState",
  "fixLeftMenuState",
  "garlandDisableState",
  "stickerPopupHideState",
  "leftMenuState",
  "newMediaViewerState",
  "newMessengerDesignState",
  "oldMessagesBadgeState",
  "oldPostingState",
  "reloadFunctionsButtonState",
  "removeAvatarsState",
  "removeMessageReactionsState",
  "removePostReactionsState",
  "sliderValue",
  "standardTagInteractionState",
  "tabletMenuState",
  "hideNamesAvatarsState",
  "removeEmojiStatusState",
  "doNotDisturbState",
  "disableReconnectIndicatorState",
  "returnCameraState",
  "hideTextEntryState",
  "disableReadingMessagesState",
  "showPollResultsState",
  "showPatronymicState",
  "hideMessageFooterState",
  "feedValue",
  "messageTextUpState",
  "oldClubState",
  "oldMessengerDesignState",
  "compactPhotosState",
  "oldMessengerAttachesState",
  "enterProfileGroupIDState",
  "oldLoaderState",
  "classicVideoPlaylistsState",
  "createYtPlayerState",
  "postInWkLayerState",
];

const applySavedStyles = () => {
  chrome.storage.local.get(functions, function (items) {
    const isVideoModal = items.additionalVKEnhancerFunctionsState;
    const altScroll = items.alternativeScrollbarState;
    const avatarNearName = items.avatarNameNearState;
    const classicProfile = items.classicProfileInterfaceState;
    const accent = items["color-picker-accentState"];
    const selectionText = items["color-picker-selection-textState"];
    const selection = items["color-picker-selectionState"];
    const customBg = items.custombgState;
    const customFont = items.customfontState;
    const customLogo = items.customlogoState;
    const wideFeed = items.doWideFeedState;
    const hotbar = items.emojiHotbarState;
    const oldPostStyle = items.feedOldThemeState;
    const fixLeftMenu = items.fixLeftMenuState;
    const garland = items.garlandDisableState;
    const stickerPopupHide = items.stickerPopupHideState;
    const leftMenu = items.leftMenuState;
    const refreshFeed = items.newMediaViewerState;
    const oldPosting = items.oldPostingState;
    const removePostReacts = items.removePostReactionsState;
    const sliderValue = items.sliderValue;
    const tabletMenu = items.tabletMenuState;
    const disableAway = items.disableAwayState;
    const disableMessageCounter = items.disableMessageCounterState;
    const isGraffity = items.newMessengerDesignState;
    const oldBadge = items.oldMessagesBadgeState;
    const reloadButton = items.reloadFunctionsButtonState;
    const removeMessageReacts = items.removeMessageReactionsState;
    const tagInteraction = items.standardTagInteractionState;
    const removeNFT = items.removeAvatarsState;
    const hideNamesAvatars = items.hideNamesAvatarsState;
    const removeEmojiStatus = items.removeEmojiStatusState;
    const doNotDisturb = items.doNotDisturbState;
    const disableReconnectIndicator = items.disableReconnectIndicatorState;
    const returnCamera = items.returnCameraState;
    const hideTextEntry = items.hideTextEntryState;
    const disableReadingMessages = items.disableReadingMessagesState;
    const showPollResults = items.showPollResultsState;
    const showPatronymic = items.showPatronymicState;
    const hideMessageFooter = items.hideMessageFooterState;
    const feedValue = items.feedValue;
    const messageTextUp = items.messageTextUpState;
    const oldClub = items.oldClubState;
    const oldMessengerDesign = items.oldMessengerDesignState;
    const compactPhotos = items.compactPhotosState;
    const oldMessengerAttaches = items.oldMessengerAttachesState;
    const enterProfileGroupID = items.enterProfileGroupIDState;
    const oldLoader = items.oldLoaderState;
    const classicVideoPlaylists = items.classicVideoPlaylistsState;
    const createYtPlayer = items.createYtPlayerState;
    const postInWkLayer = items.postInWkLayerState;
    applyStyles({
      isVideoModal,
      altScroll,
      avatarNearName,
      classicProfile,
      accent,
      selectionText,
      selection,
      customBg,
      customFont,
      customLogo,
      wideFeed,
      hotbar,
      oldPostStyle,
      fixLeftMenu,
      garland,
      stickerPopupHide,
      leftMenu,
      refreshFeed,
      oldPosting,
      removePostReacts,
      sliderValue,
      tabletMenu,
      disableAway,
      disableMessageCounter,
      isGraffity,
      oldBadge,
      reloadButton,
      removeMessageReacts,
      tagInteraction,
      removeNFT,
      hideNamesAvatars,
      removeEmojiStatus,
      doNotDisturb,
      disableReconnectIndicator,
      returnCamera,
      hideTextEntry,
      disableReadingMessages,
      showPollResults,
      showPatronymic,
      hideMessageFooter,
      feedValue,
      messageTextUp,
      oldClub,
      oldMessengerDesign,
      compactPhotos,
      oldMessengerAttaches,
      enterProfileGroupID,
      oldLoader,
      classicVideoPlaylists,
      createYtPlayer,
      postInWkLayer,
    });
  });
};

function applyStyles(styles: {
  isVideoModal: any;
  altScroll: any;
  avatarNearName: any;
  classicProfile: any;
  accent: any;
  selectionText: any;
  selection: any;
  customBg: any;
  customFont: any;
  customLogo: any;
  wideFeed: any;
  hotbar: any;
  oldPostStyle: any;
  fixLeftMenu: any;
  garland: any;
  stickerPopupHide: any;
  leftMenu: any;
  refreshFeed: any;
  oldPosting: any;
  removePostReacts: any;
  sliderValue: any;
  tabletMenu: any;
  disableAway: any;
  disableMessageCounter: any;
  isGraffity: any;
  oldBadge: any;
  reloadButton: any;
  removeMessageReacts: any;
  tagInteraction: any;
  removeNFT: any;
  hideNamesAvatars: any;
  removeEmojiStatus: any;
  doNotDisturb: any;
  disableReconnectIndicator: any;
  returnCamera: any;
  hideTextEntry: any;
  disableReadingMessages: any;
  showPollResults: any;
  showPatronymic: any;
  hideMessageFooter: any;
  feedValue: any;
  messageTextUp: any;
  oldClub: any;
  oldMessengerDesign: any;
  compactPhotos: any;
  oldMessengerAttaches: any;
  enterProfileGroupID: any;
  oldLoader: any;
  classicVideoPlaylists: any;
  createYtPlayer: any;
  postInWkLayer: any;
}) {
  //if (styles.removeNFT) {
  //hideNFT_Avatars();
  //} else {
  //backNFT_Avatars();
  //}

  addOpacity(styles.sliderValue);

  if (styles.removeMessageReacts) {
    removeMessageReactions();
  } else {
    backMessageReactions();
  }
  if (styles.removePostReacts) {
    customMessage("removePostReactions");
    removePostReactions();
  } else {
    customMessage("backPostReactions");
    backPostReactions();
  }

  if (styles.avatarNearName) {
    const customStyle = fromId("removeNA");
    if (customStyle) {
      customStyle.remove();
    }
    appendTopName();
  } else {
    removeNameAva();
  }

  if (styles.isVideoModal) {
    customMessage("videoModalEnabled");
  } else {
    customMessage("videoModalDisabled");
  }

  if (styles.oldLoader) {
    customMessage("oldLoader", styles.oldLoader);
  } else {
    customMessage("oldLoader", "false");
  }

  if (styles.createYtPlayer) {
    customMessage("createYtPlayer", styles.createYtPlayer);
  } else {
    customMessage("createYtPlayer", "false");
  }

  if (styles.classicVideoPlaylists) {
    customMessage("classicVideoPlaylistsIn", styles.classicVideoPlaylists);
  } else {
    customMessage("classicVideoPlaylistsIn", "false");
  }
  if (styles.hideNamesAvatars) {
    addBlur();
  } else {
    removeBlur();
  }

  if (styles.accent && styles.accent !== "#FFFFFF" && styles.accent !== "#ffffff") {
    addCAccent(styles.accent);
  } else {
    removeCAccent();
  }

  if (styles.selectionText && styles.selection) {
    addColorPicker(styles.selection, styles.selectionText);
  }

  if (styles.customLogo && styles.customLogo !== "" && styles.customLogo !== "undefined") {
    addLogo(styles.customLogo);
  } else {
    removeLogo();
  }

  if (styles.customBg && styles.customBg !== "" && styles.customBg !== "undefined") {
    addBg(styles.customBg);
  } else {
    removeBg();
  }

  if (styles.customFont && styles.customFont !== "" && styles.customFont !== "undefined") {
    addFont(styles.customFont);
  } else {
    removeFont();
  }

  if (styles.removeEmojiStatus) {
    emojiRemove();
  } else {
    emojiBack();
  }

  if (styles.stickerPopupHide) {
    stickersRemove();
  } else {
    stickersBack();
  }

  if (styles.altScroll) {
    altSBadd();
  } else {
    altSBremove();
  }

  if (styles.doNotDisturb) {
    customMessage("muteCalls");
  } else {
    customMessage("unmuteCalls");
  }

  if (styles.hotbar) {
    HotBarAppear(styles.hotbar);
    customMessage("HotBarAppear", styles.hotbar);
  }

  if (styles.disableReconnectIndicator) {
    removeReconnectIndicator();
  } else {
    backReconnectIndicator();
  }

  if (styles.returnCamera) {
    cameraPhotoRet();
  } else {
    cameraPhotoDel();
  }

  if (styles.reloadButton) {
    lessStickerAdd();
  } else {
    lessStickerRemove();
  }

  if (styles.messageTextUp) {
    textUp();
  } else {
    textDown();
  }

  if (styles.oldPostStyle) {
    customMessage("feedOldThemeEnabled");
  } else {
    customMessage("feedOldThemeDisabled");
  }

  if (styles.oldClub) {
    customMessage("oldClubEnabled");
  } else {
    customMessage("oldClubDisabled");
  }

  if (styles.isGraffity) {
    canLoadGraffity();
    chrome.storage.local.get(["vkenAccessToken"], async function (result) {
      try {
        vkenAccessToken1 = result.vkenAccessToken;
        if (vkenAccessToken1 && vkenAccessToken1 !== "") {
          customMessage("vkEnhancerAccessToken", vkenAccessToken1);
        } else {
          await CheckToken();
        }
      } catch (e) {
        console.error(e);
      }
    });
    window.addEventListener("message", async (event) => {
      switch (event.data.action?.messageAction) {
        case "tokenRemove": {
          chrome.runtime.sendMessage({
            type: "vken_access_token_remove",
          });
          break;
        }
      }
    });
  } else {
    stopLoadGraffity();
  }

  if (!window.hasMessageListener) {
    window.addEventListener("message", async (event) => {
      switch (event.data.action?.messageAction) {
        case "colorSchemeUpdated": {
          applySavedStyles();
          break;
        }
      }
    });
    window.hasMessageListener = true;
  }

  if (styles.refreshFeed) {
    customMessage("refreshFeed", styles.refreshFeed);
  } else {
    customMessage("refreshFeed", "false");
  }

  if (styles.postInWkLayer) {
    customMessage("postInWkLayer", styles.postInWkLayer);
  } else {
    customMessage("postInWkLayer", "false");
  }

  if (styles.hideTextEntry) {
    customMessage("nepisalka", styles.hideTextEntry);
  } else {
    customMessage("nepisalka", "false");
  }

  if (styles.disableReadingMessages) {
    customMessage("nechitalka", styles.disableReadingMessages);
  } else {
    customMessage("nechitalka", "false");
  }

  if (styles.showPollResults) {
    customMessage("pollResults", styles.showPollResults);
  } else {
    customMessage("pollResults", "false");
  }

  if (styles.disableAway) {
    customMessage("removeAway", styles.disableAway);
  } else {
    customMessage("removeAway", "false");
  }

  if (styles.classicProfile) {
    customMessage("newProfiles", styles.classicProfile);
  } else {
    customMessage("newProfiles", "false");
  }

  if (styles.showPatronymic) {
    customMessage("middleName", styles.showPatronymic);
  } else {
    customMessage("middleName", "false");
  }

  if (styles.tagInteraction) {
    customMessage("oldHover", styles.tagInteraction);
  } else {
    customMessage("oldHover", "false");
  }

  if (styles.tabletMenu) {
    initTabletMenu();
  } else {
    closeTabletMenu();
  }

  if (styles.oldPostStyle) {
    customMessage("defaultThemeFeed", styles.oldPostStyle);
  } else {
    customMessage("defaultThemeFeed", "false");
  }

  if (styles.oldBadge) {
    oldBadgeEnable();
  } else {
    oldBadgeDisable();
  }

  if (styles.fixLeftMenu) {
    fixLeftMenu();
  } else {
    unFixLeftMenu();
  }

  if (styles.garland) {
    garlandRemove();
  } else {
    garlandBack();
  }

  if (styles.disableMessageCounter) {
    disableCounter();
  } else {
    enableCounter();
  }

  if (styles.hideMessageFooter) {
    disableFooter();
  } else {
    enableFooter();
  }

  if (styles.feedValue) {
    addValue(styles.feedValue);
  }

  if (styles.oldPosting) {
    customMessage("oldPosting", styles.oldPosting);
  } else {
    customMessage("oldPosting", "false");
  }

  if (styles.leftMenu) {
    customMessage("customLeftMenu", styles.leftMenu);
  } else {
    customMessage("customLeftMenu", "false");
  }

  if (styles.oldMessengerDesign) {
    customMessage("oldMessengerDesign", styles.oldMessengerDesign);
  } else {
    customMessage("oldMessengerDesign", "false");
  }

  if (styles.oldMessengerAttaches) {
    customMessage("oldMessengerAttaches", styles.oldMessengerAttaches);
  } else {
    customMessage("oldMessengerAttaches", "false");
  }

  if (styles.enterProfileGroupID) {
    customMessage("enterProfileGroupID", styles.enterProfileGroupID);
  } else {
    customMessage("enterProfileGroupID", "false");
  }

  if (styles.compactPhotos) {
    initCompactPhotos();
  } else {
    removeCompactPhotos();
  }
}

document.addEventListener("DOMContentLoaded", applySavedStyles);
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "resetFunctions") {
    customMessage("resetFunctions", "true");
  } else if (message.type === "checkIfLoaded") {
    sendResponse({ loaded: true });
  } else {
    applySavedStyles();
  }
});

//Убрать NFT-Аватарки
// function hideNFT_Avatars() {
// 	let styleElement = fromId("nftavatars");
// 	if (!styleElement) {
// 		styleElement = create("style", {}, { id: "nftavatars" });
// 		document.head.appendChild(styleElement);
// 	}
// 	styleElement.innerHTML =
// 		'[class^="vkitOutline__rootNft"] {display:none} .AvatarRich--nft .AvatarRich__img, .AvatarRich--nft .AvatarRich__background, .AvatarRich--nft .AvatarRich__children{clip-path:none; border-radius:100%;}.AvatarRich__outline--nft path {display:none}.AvatarRich__outline--nft{    border-radius: 100%;    outline: var(--avatar-rich-stroke-width) solid var(--vkui--color_icon_accent);    outline-offset: calc(var(--avatar-rich-stroke-width) * -1);} .OwnerPageAvatar--nft .OwnerPageAvatar__underlay:not(.OwnerPageAvatar__underlay--outlined) { top: calc(var(--stroke-width, 4px) * -1) !important; bottom: calc(var(--stroke-width, 4px) * -1) !important; left: calc(var(--stroke-width, 4px) * -1) !important; right: calc(var(--stroke-width, 4px) * -1) !important; } .OwnerPageAvatar--nft .OwnerPageAvatar__underlay, .AvatarRich--nft .AvatarRich__img, div[class*="RichAvatar-module__rootNft"] > img { clip-path: none !important; -webkit-clip-path: none !important; border-radius: 50% !important; } .OwnerPageAvatar--nft .vkuiAvatar svg, .AvatarRich__heptagonUnderlay,div[class*="RichAvatar-module__rootNft"] > svg { display: none !important; } svg[data-testid="richavatar-nft-heptagon"] { display:none; } [class*="vkitRichAvatar__rootNft"]>img { clip-path:none; border-radius:100%; }';
// }

// function backNFT_Avatars() {
// 	const customStyle = fromId("nftavatars");
// 	if (customStyle) {
// 		customStyle.remove();
// 	}
// }

//Реакции сообщений
function removeMessageReactions() {
  let styleElement = fromId("msgReactions");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "msgReactions" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "[class^='MessageReactionPicker'],.DropdownReforged:has(.ReactionChip), .ConvoListItem__icon:not([aria-label]),.HopNavigationButton:has(.vkuiIcon--stars_20),.ConvoMessageWithoutBubble__reactions,.MessageActionsContent__reactions,.MessageReactionsPanel,.im-mess--reaction,.MessageReactions,MessageReactionsModalButton,.im-mess_reactions:hover .MessageReactionsModalButton,.im-mess .im-mess--reactions,.nim-dialog .nim-dialog--unread-badge_reaction,button.im-navigation.im-navigation--to-reaction._im_to_reaction.im-navigation_shown { display: none!important; }";
}

function backMessageReactions() {
  const customStyle = fromId("msgReactions");
  if (customStyle) {
    customStyle.remove();
  }
}

//Убрать имя возле аватарки VK ID
function removeNameAva() {
  let styleElement = fromId("removeNA");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeNA" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = ".top_profile_name {display:none!important;}";
}

//Скрыть имена и аватарки
function addBlur() {
  let styleElement = fromId("hider");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "hider" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".Reply__author, .ForwardedMessageNew__userName, .NestedForwardedMessageButton__header, .ForeignMessagesHistory__topAuthor, [data-testid='story_card_stories'],[hrefparams='_ref=feed_recommended_friends_right_block'],.PostHeaderTitle__authorName, .PostHeader__avatar,.feedback_header,.feedback_image,.CallsRichCell__Title,.PeerTitle__title,.PeerListItem__name,.vkuiRichCell__before, [class^='vkitUserRichCell__name'], [class^='CallHistoryScreen--friendsListItem'], .audio_friend, .ConvoListItem__message,.ConvoPinnedMessage__authorLink,.ServiceMessage__link,.BasicAvatar__img,.ConvoProfileName__longName,.ConvoProfileInformation__infoCellText,.spanPseudoText1,.bp_thumb,.bp_author,.wall_module .author_highlighted,.deep_active .replies .reply_image,.top_profile_name,.im-mess-stack--lnk, ._im_ui_peers_list .ui_rmenu_item_label, ._im_page_peer_name, .nim-dialog--name, .im-page-pinned--name, .im-replied--author,.ConvoRecommendList__name,.nim-dialog .nim-dialog--text-preview, .nim-dialog .nim-dialog--preview,.ProfileSubscriptions__item,.ProfileFriends__item,#react_rootLeftMenuRoot > div > nav > ol > li:not(#l_pr):not(#l_nwsf):not(#l_msg):not(#l_ca):not(#l_fr):not(#l_gr):not(#l_ph):not(#l_aud):not(#l_vid):not(#l_svd):not(#l_ap):not(#l_stickers):not(#l_mk):not(#l_vkfest2023):not(#l_mini_apps):not(#l_fav):not(#l_doc):not(#l_apm):not(#l_vkp):not(#l_ads) {    filter: blur(5px) !important;}.nim-peer--photo-w img, .nim-peer img,.ImUserAvatar img,.TopNavBtn__profileImg,.UsersStack__userItemSvg {    filter: blur(10px) grayscale(1) !important;} .MEAvatar,.ConvoTitle__title,.ConvoMessageAuthor,.ConvoListItem__author {filter: blur(5px) grayscale(1)!important}";
}

function removeBlur() {
  const customStyle = fromId("hider");
  if (customStyle) {
    customStyle.remove();
  }
}

//Кастомный акцент
function addCAccent(cAccentValue: string) {
  let styleElement = fromId("CAccentID");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "CAccentID" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "body{    --accent:" +
    cAccentValue +
    "!important; --vkui--color_text_link: var(--accent) !important; --vkui--color_text_link: var(--accent) !important; --vkui--color_icon_accent_themed: var(--accent) !important;  --blue_400: var(--accent) !important;    --action_sheet_action_foreground: var(--accent) !important;    --attach_picker_tab_active_background: var(--accent) !important;    --attach_picker_tab_active_text: var(--accent) !important;    --cell_button_foreground: var(--accent) !important;    --control_foreground: var(--accent) !important;    --counter_primary_background: var(--accent) !important;    --header_alternate_tab_active_indicator: var(--accent) !important;    --header_tab_active_indicator: var(--accent) !important;    --header_tint: var(--accent) !important;    --header_tint_alternate: var(--accent) !important;    --im_attach_tint: var(--accent) !important;    --im_reply_sender_text: var(--accent) !important;    --im_reply_separator: var(--accent) !important;    --landing_login_button_background: var(--accent) !important;    --landing_primary_button_background: var(--accent) !important;    --landing_tertiary_button_foreground: var(--accent) !important;    --landing_text_title: var(--accent) !important;    --landing_secondary_button_foreground: var(--accent) !important;    --link_alternate: var(--accent) !important;    --loader_track_value_fill: var(--accent) !important;    --feed_recommended_friend_promo_background: var(--accent) !important;    --tabbar_active_icon: var(--accent) !important;    --tabbar_tablet_active_icon: var(--accent) !important;    --text_link: var(--accent) !important;    --text_name: var(--accent) !important;    --writebar_icon: var(--accent) !important;    --dynamic_blue: var(--accent) !important;    --text_link_hightlighted_background: var(--accent) !important;    --im_text_name: var(--accent) !important;    --button-background-color: var(--accent) !important;    --sky_100: var(--accent) !important;    --sky_200: var(--accent) !important;    --light_blue_700: var(--accent) !important;    --blue_bright: var(--accent) !important;    --vkui--color_icon_accent: var(--accent) !important;    --vkui--color_background_accent_themed: var(--accent) !important;    --vkui--color_background_accent: var(--accent) !important;    --vkui--color_background_accent--hover: var(--accent) !important;    --vkui--color_background_accent--active: var(--accent) !important;    --vkui--color_background_accent_themed--hover: var(--accent) !important;    --vkui--color_background_accent_themed--active: var(--accent) !important;    --vkui--color_background_accent_tint--hover: var(--accent) !important;    --vkui--color_background_accent_tint--active: var(--accent) !important;    --vkui--color_background_accent_alternative: var(--accent) !important;    --vkui--color_background_accent_alternative--hover: var(--accent) !important;    --vkui--color_background_accent_alternative--active: var(--accent) !important;    --vkui--color_text_accent: var(--accent) !important;    --vkui--color_text_accent--hover: var(--accent) !important;    --vkui--color_text_accent--active: var(--accent) !important;    --vkui--color_text_accent_themed: var(--accent) !important;    --vkui--color_text_accent_themed--hover: var(--accent) !important;    --vkui--color_text_accent_themed--active: var(--accent) !important;    --vkui--color_text_link: var(--accent) !important;    --vkui--color_text_link--hover: var(--accent) !important;    --vkui--color_text_link--active: var(--accent) !important;    --vkui--color_text_link_themed: var(--accent) !important;    --vkui--color_text_link_themed--hover: var(--accent) !important;    --vkui--color_text_link_themed--active: var(--accent) !important;    --vkui--color_text_link_visited--hover: var(--accent) !important;    --vkui--color_text_link_visited--active: var(--accent) !important;    --blue_a400: var(--accent) !important;    --blue_400_alpha20: var(--accent),0.2 !important;    --blue_400_alpha48: var(--accent),0.48 !important;    --blue_420: var(--accent) !important;    --blue_550: var(--accent) !important;    --blue_600: var(--accent) !important;    --blue_640: var(--accent) !important;    --blue_800: var(--accent) !important;    #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg > g > g > path:nth-child(2), #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > span > svg > path:nth-child(1){        fill: " +
    cAccentValue +
    " !important;    }}";
  try {
    const svgElement1 = document.querySelector("#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg");
    if (svgElement1 !== null) {
      const pathElement1 = svgElement1.querySelector("g > g > path:nth-child(2)");
      if (pathElement1) pathElement1.setAttribute("fill", cAccentValue);
    }
  } catch (error) {}
  document.addEventListener("DOMContentLoaded", function () {
    const svgElement = document.querySelector("#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg");
    if (svgElement !== null) {
      const pathElement = svgElement.querySelector("g > g > path:nth-child(2)");
      if (pathElement) pathElement.setAttribute("fill", cAccentValue);
    }
  });
}

function removeCAccent() {
  const customStyle = fromId("CAccentID");
  if (customStyle) {
    customStyle.remove();
  }
  try {
    const svgElement = document.querySelector("#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg");
    if (svgElement) {
      const pathElement = svgElement.querySelector("g > g > path:nth-child(2)");
      if (pathElement != null) {
        pathElement.setAttribute("fill", "#07F");
      }
    }
  } catch (error) {}
}

//Цвета выделения текста
function addColorPicker(cColorValue: string, cTextValue: string) {
  let styleElement = fromId("selections");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "selections" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `::selection {background-color: ${cColorValue};color: ${cTextValue};}`;
}

//Кастомный логотип
function addLogo(cLogoValue: string) {
  let styleElement = fromId("logos");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "logos" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink {          background:url(" +
    "'" +
    cLogoValue +
    "'" +
    ") no-repeat;          background-size: contain;          background-position: center;      }      #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > span > svg,#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg{          display:none;      }";
}

function removeLogo() {
  const customStyle = fromId("logos");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный фон
function addBg(cBgValue: string) {
  let styleElement = fromId("custombg");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "custombg" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ProfileWrapper__root{background:transparent!important;}:root,.vknBgWrapper,.scroll_fix {          background-image:url(" +
    cBgValue +
    ')!important;          background-size: cover;          background-position: center;          background-attachment: fixed;} #side_bar_inner, .side_bar_inner {box-shadow: var(--page-block-shadow) !important;margin-top: calc(var(--header-height) + 16px) !important;position: relative !important;right: calc(var(--page-block-offset, 15px) + 7px) !important;background: var(--vkui--color_background_content) !important;border-radius: var(--vkui--size_border_radius_paper--regular) !important; padding: 4px !important;} [class^="LeftMenuItem-module__item"] {border-radius: 10px !important;}.side_bar_nav_wrap {margin: 0px !important;padding: 0px !important;}';
}

function removeBg() {
  const customStyle = fromId("custombg");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный шрифт
function addFont(cFontValue: any) {
  let styleElement = fromId("customfont");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "customfont" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `
        @font-face {
            font-family: 'customFont';
            src: url(${cFontValue}) format('woff2'); /* Укажите правильный формат */
        }
        html, body, p, h1, h2, h3, h4, h5, h6, span, div, a, ul, ol, li, input, button {
            font-family: 'customFont' !important;
        }
    `;
}

function removeFont() {
  const customStyle = fromId("customfont");
  if (customStyle) {
    customStyle.remove();
  }
}

//Эмодзи-статусы
function emojiRemove() {
  let styleElement = fromId("removeES");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeES" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '[class*="UserNameIcon__icon"]:not(:has(.vkuiIcon--verified_16)) ,[class*="OwnerNameIcon__icon"]:not(.OwnerPageName__esia, .OwnerPageName__prometheus, .OwnerPageName__verified),[class*="OwnerNameIcon-module__icon"]:not(.OwnerPageName__esia, .OwnerPageName__prometheus, .OwnerPageName__verified), .image_status__status, .PostHeaderTitle__imageStatus,span[class^="UserNameIcon-module__icon"]:has(>img),div[class^="StatusIcon"]:has(>img) { display: none !important; }';
}

function emojiBack() {
  const customStyle = fromId("removeES");
  if (customStyle) {
    customStyle.remove();
  }
}

//Скрыть всплывающие стикеры
function stickersRemove() {
  let styleElement = fromId("removePopupStickers");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removePopupStickers" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `#popup-sticker-convo-main-history-container [class^="PlayBackArea__wrapper"] {
        display:none;
    }
    [class^="PlayBackArea__wrapper"]:has(canvas),[class^="PlayBackArea__wrapper"]:has([class^="GradientLayer__wrapperWithLinearGradient"]) {
        display:none;
    }
        
    .popupStickerIcon, .AttachSticker__iconClass {
        display: none!important;
    }
        
    [class^="PopupWrapper__stickerAnimationIsPlaying"], .popupStickerWrapperAnimationIsPlaying .popupSticker {
      opacity: 1!important;
      scale: 1!important;
    }
      
    #popup-sticker-emoji-keyboard-container > [class^="PlayBackArea__wrapper"], [class*="StickersKeyboardRow__stickerRichIcon"], [class^="StickersKeyboardGroupItem__in"] > [class^="Icon__in"] {
      display:none!important;
    }`;
}

function stickersBack() {
  const customStyle = fromId("removePopupStickers");
  if (customStyle) {
    customStyle.remove();
  }
}

//Альтернативный скроллбар
function altSBadd() {
  let styleElement = fromId("altSB");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "altSB" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "::-webkit-scrollbar { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); width: 16px; } ::-webkit-scrollbar-track { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-thumb { background-color: var(--scrollbar_thumb, var(--vkui--color_icon_tertiary)); border-radius: 16px; border: 4px solid var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-button { display: none; }";
}

function altSBremove() {
  const customStyle = fromId("altSB");
  if (customStyle) {
    customStyle.remove();
  }
}

//Индикатор реконнекта
function removeReconnectIndicator() {
  let styleElement = fromId("reconnectIndicator");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "reconnectIndicator" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = ".ConnectionIndicator,.MEApp__reconnecting {	display: none !important;}";
}

function backReconnectIndicator() {
  const customStyle = fromId("reconnectIndicator");
  if (customStyle) {
    customStyle.remove();
  }
}

//Возвращение фотоаппарата для пустых аватарок
function cameraPhotoRet() {
  let styleElement = fromId("cameraPhotoReturn");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "cameraPhotoReturn" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '[style*="impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[style*="https://pp.userapi.com/60tZWMo4SmwcploUVl9XEt8ufnTTvDUmQ6Bj1g/mmv1pcj63C4.png"],[style*="impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"] {background-image: url("https://vk.com/images/camera_a.gif")!important;} [src*="impg/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src*="/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src^="https://sun6-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src^="https://pp.userapi.com/60tZWMo4SmwcploUVl9XEt8ufnTTvDUmQ6Bj1g/mmv1pcj63C4.png"], [src^="https://pp.userapi.com/dfvmQ4fDCgEfMVVLlOKBUsaUdh7QZww8ME4IHg/2G-nzM7_pH4.png"],[src^="https://pp.userapi.com/nKpB1Qq39oLk0_S8_C9PolGFFUpM5n8FnzKC7A/ucP1cjlkpZk.png"], [src*="/impf/HnDXZID-SDmaVYd91lIag6dSg1lsaXuGBxzR6w/7oh8V3B731U.jpg"], [src*="/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"] {content:url("https://vk.com/images/camera_a.gif");}';
}

function cameraPhotoDel() {
  const customStyle = fromId("cameraPhotoReturn");
  if (customStyle) {
    customStyle.remove();
  }
}

//Размер стикеров
function lessStickerAdd() {
  let styleElement = fromId("lesssticker");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "lesssticker" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `
  [class^='Sticker__sticker'].AttachSticker[style^='--sticker-size: 168px;'] {
    width: 128px!important;
    height: 128px! important;
    --sticker - size: 128px!important
  }

  [class^='Sticker__sticker'].AttachSticker[style^='--sticker-size: 168px;'] > [class^="Sticker__in"] {
    height: 128px!important;
  }
  
  [class^='Sticker__sticker'].AttachSticker[style^='--sticker-size: 168px;'] canvas[style^="width: 168px"] {
    width: 128px!important;
    height: 128px! important;
  }`;
}

function lessStickerRemove() {
  const customStyle = fromId("lesssticker");
  if (customStyle) {
    customStyle.remove();
  }
}

//Граффити можем или нет//
function stopLoadGraffity() {
  let styleElement = fromId("removeGraffitiInput");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeGraffitiInput" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.vkEnhancerGraffityInput{display:none!important;}`;
}

function canLoadGraffity() {
  const customStyle = fromId("removeGraffitiInput");
  if (customStyle) {
    customStyle.remove();
  }
}

//Меню как на планшетах//
function initTabletMenu() {
  let styleElement = fromId("mvktabletMenu");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "mvktabletMenu" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.side_bar_inner {
    background-color: var(--block, var(--vkui--color_background_content)) !important;
    box-shadow: var(--page-block-shadow) !important;
    border-radius: 100px;
}

.side_bar {
    [class^="vkitLeftMenuItem__container"] {
        padding: 5px 0;
    }

    [class^="vkitLeftMenuItem__settings"] {
        left: -24px !important;
    }
}

.side_bar_nav_wrap {
    margin: 0 !important;
    margin-bottom: 10px !important;
}

body {
    .side_bar {
        width: 54px !important;
        padding-left: 258px !important;
        margin-left: -149px !important;
        padding-right: 0px !important;
        margin-right: -149px !important;

        .LeftMenu__separator,
        [class^='vkitLeftMenuOld__separator'] {
            margin-left: 0;
            margin-right: 0;
        }

        [class^='LeftMenuSection-module__hiddenItems--'],
        [class*=' LeftMenuSection-module__hiddenItems--'] {
            position: relative;
            width: calc(var(--left-menu-icon-size, 20px) + 21) !important;
        }

        [class^="vkitLeftMenuItem__icon"] {
            scale: 1.3;
            color: var(--vkui--color_icon_secondary);
        }

        #l_pr [class^="vkitLeftMenuItem__icon"] {
            width: 20px;
            height: 20px;
            background-image: url(` +
    localStorage.getItem("ownerPhoto200") +
    `);
            background-size: cover;
            margin-right: 0;
            border-radius: 100px;
        }

        li[class^="vkitLeftMenuItem__container"]:not(:last-child) {
            padding-bottom: 8px;
        }

        #l_pr [class^="vkitLeftMenuItem__icon"] svg {
            display: none;
        }

        .LeftMenu__itemLink,
        [class^='vkitLeftMenuItem__item'] {
            border-radius: 100px;
            position: relative;
            width: calc(var(--left-menu-icon-size, 20px) + 21) !important;

            .left_count_wrap,
            [class^='vkitLeftMenuItem__counter']:not([class^="vkitLeftMenuItem__counterLink"]):not([type="internal/link"]) {
                position: absolute;
                top: 0px;
                left: 12px;
                font-size: 14px;
                transform: scale(0.7);
                background: var(--vkui--color_background_accent_themed) !important;
                color: var(--vkui--color_icon_contrast_themed) !important;
            }

            .left_count_wrap,
            [class^='vkitLeftMenuItem__counterObject'] {
                position: absolute;
                top: 0px;
                left: 12px;
                font-size: 14px;
                transform: scale(0.7);
                background: var(--vkui--color_background_accent_themed) !important;
                color: var(--vkui--color_icon_contrast_themed) !important;
            }

            &:hover {
                [class^='vkitLeftMenuItem__label']:not([class^='vkitLeftMenuItem__labelIn']) {
                    padding: 0 !important;
                    margin-left: 0px !important;
                    margin-top: -24px !important;
                }
                .LeftMenu__itemLabel,
                [class^='vkitLeftMenuItem__label'] {
                    display: block !important;
                    position: fixed !important;
                    background: var(--vkui--color_avatar_overlay--hover) !important;
                    color: var(--vkui--color_background_content) !important;
                    border-radius: 100px !important;
                    padding: 4px 7px !important;
                    height: auto !important;
                    line-height: initial !important;
                    margin-left: 36px !important;
                    margin-top: 16px !important;
                    margin-top: 0 !important;
                }
            }
        }

        [class^='vkitLeftMenuOld__separator'] {
            margin: 9px 8px 9px 8px;
        }

        .LeftMenu__itemLabel,
        [class^='LeftMenuItem-module__label--'] {
            font-size: 12px;
        }

        .side_bar_inner {
            width: 42px !important;
            padding: 2px 0 !important;
            margin-top: 64px !important;
        }

        ol {
            margin: 0 5px 10px 5px !important;
        }

        .LeftMenu__itemLabel,
        [class^='vkitLeftMenuItem__label'],
        .left_menu_nav_wrap {
            display: none !important;
        }
    }
}

li.HeaderNav__item.HeaderNav__item--logo {
    margin: 0 !important;
}

[class*="LeftMenuOld-module__separator"] {
    margin: 4px 0px 8px 0px;
}

.LegalRecommendationsLinkLeftMenuAuthorized,
.WideSeparator--legalRecommendationsLink {
    display: none;
}

;`;
}

function closeTabletMenu() {
  const customStyle = fromId("mvktabletMenu");
  if (customStyle) {
    customStyle.remove();
  }
}

//Старый значок непрочитанных//
function oldBadgeEnable() {
  let styleElement = fromId("oldBadgeStyle12");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "oldBadgeStyle12" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `
	.ConvoHistory__messageBlockSelected--withoutBubbles .ConvoMessageWithoutBubble {
		border-radius: 0px!important;
	}
	.ConvoListItem__outStatusIcon:has(.vkuiIcon--check_double_outline_16) {
        display:none;
    }
    .ConvoListItem__outStatusIcon .vkuiIcon--check_outline_16 {
        background-color: var(--vkui--color_background_accent_themed);
        border-radius:100px;
        width:7px!important;
        height:7px!important;
        scale: 1.143;
    }
    .ConvoListItem__outStatusIcon .vkuiIcon--check_outline_16 use {
        display:none;
    }
    .ConvoHistory__messageWrapper--withoutBubbles:has(.vkuiIcon--check_outline_16) {
        background-color:var(--vkui--color_background_secondary);
    }
    .ConvoHistory__messageBlock--withoutBubbles {
        padding: 0 22px !important;
    }
    .ConvoHistory__messageWrapper--withoutBubbles .vkuiIcon--check_outline_16,.ConvoHistory__messageWrapper--withoutBubbles .vkuiIcon--check_double_outline_16 {
        display:none;
    }
    .ConvoMessageWithoutBubble:hover {
        background:transparent;
    }
        
    .ConvoHistory__messageWrapper--withoutBubbles {
        cursor:pointer;
    }`;
}

function oldBadgeDisable() {
  const customStyle = fromId("oldBadgeStyle12");
  if (customStyle) {
    customStyle.remove();
  }
}

//Зафиксировать левое меню//
function fixLeftMenu() {
  let styleElement = fromId("fixMenuLeft");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "fixMenuLeft" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `#side_bar:has([data-testid="leftmenu"]){position:sticky!important; top:0px!important;}`;
}

function unFixLeftMenu() {
  const customStyle = fromId("fixMenuLeft");
  if (customStyle) {
    customStyle.remove();
  }
}

//Убрать гирлянду//
function garlandRemove() {
  let styleElement = fromId("garlandRemover");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "garlandRemover" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `#page_header_wrap > div:has([class^="GarlandParts__root"]) {
		visibility:hidden;
	}`;
}

function garlandBack() {
  const customStyle = fromId("garlandRemover");
  if (customStyle) {
    customStyle.remove();
  }
}

//Выключить каунтер сообщений//
function disableCounter() {
  let styleElement = fromId("removeMsgCount");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeMsgCount" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.vkEnhancerCounterOfMessages{display:none;}`;
}

function enableCounter() {
  const customStyle = fromId("removeMsgCount");
  if (customStyle) {
    customStyle.remove();
  }
}

//Скрыть футер с непрочитанными//
function disableFooter() {
  let styleElement = fromId("removeMsgFooter");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeMsgFooter" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.ConvoList__footer{display:none!important;}`;
}

function enableFooter() {
  const customStyle = fromId("removeMsgFooter");
  if (customStyle) {
    customStyle.remove();
  }
}

//Широкий стиль стены//
function addValue(value: number) {
  let styleElement = fromId("wideFeedEnabler");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "wideFeedEnabler" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.wide_column_left:has(#ui_rmenu_news)
    {
        --narrow-column-width:${895 - value}px!important
    }`;
}

//Реакции к постам
function removePostReactions() {
  let styleElement = fromId("postReactions");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "postReactions" });
    document.head.appendChild(styleElement);
  }
  const imageUrl =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath xmlns='http://www.w3.org/2000/svg' fill-rule='nonzero' fill='%23e64646' d='M11.95 4.83l-0.09 -0.09c-1.27,-1.23 -2.96,-1.93 -4.73,-1.94 0,0 0,0 0,0 -3.62,0 -6.55,2.93 -6.56,6.54 0,3.52 1.3,5.2 7.07,9.76l3.07 2.4c0.37,0.29 0.8,0.44 1.24,0.45l0 0c0.44,-0.01 0.88,-0.16 1.24,-0.45l3.07 -2.4c5.78,-4.56 7.07,-6.24 7.07,-9.76 -0.01,-3.61 -2.94,-6.54 -6.55,-6.54 0,0 0,0 0,0 -1.77,0.01 -3.47,0.71 -4.73,1.94l-0.1 0.09z'/%3E%3C/g%3E%3C/svg%3E";
  styleElement.innerHTML =
    '.PostBottomAction.PostButtonReactions.PostButtonReactions--post {z-index:10; padding-right:0px!important;} .PostButtonReactionsContainer {display:flex} .PostBottomAction--withBg{padding:4px 6px!important;}.PostButtonReactions__iconAnimation{display:none!important;}.PostButtonReactions__icon.PostButtonReactions__icon--custom{background: url("' +
    imageUrl +
    '")!important;         scale:.85;} .ReactionsMenuPopperTransition-appear-done, .ReactionsMenuPopperTransition-enter-done {          display: none!important;      }                        .ReactionsMenu,    .ReactionsMenu--extraHoverArea,    .ReactionsMenu--extraHoverAreaToTop,    div.ReactionsPreview__items,.PostButtonReactions--post .PostButtonReactions__title--textual,.like_tt_reacted-count,.fans_fanph_reaction,li#likes_tab_reactions_0,    li#likes_tab_reactions_1,    li#likes_tab_reactions_2,    li#likes_tab_reactions_3,    li#likes_tab_reactions_4,    li#likes_tab_reactions_5,.ui_tab.ui_tab_group:not(.ui_tab_group_new),.like_tt_reaction {        display: none !important;    }    .PostBottomAction {        --post-bottom-action-background-color: transparent !important;    }    div.ReactionsPreview.ReactionsPreview--active .ReactionsPreview__count._counter_anim_container {        color: #e64646 !important;    }   .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count{color:var(--vkui--color_text_secondary);} [dir] .ReactionsPreview {  margin-left: -6px; z-index: 9;    }    .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count {    font-size: 14px!important;    line-height: 16px;    font-weight: 500;    }    .PostButtonReactionsContainer {        width: auto !important;    }    .PostButtonReactions__iconAnimation svg    {        background: url("' +
    imageUrl +
    '") no-repeat!important;        margin-top:3px;        margin-left:3px;        scale:.85;    }    .PostButtonReactions__iconAnimation svg g    {        display:none;    }        [dir] .PostActionStatusBar--inPost {        padding-top: 0px !important;        padding-bottom: 0px !important;    }    div.like_cont.PostBottomActionLikeBtns {        border-top: 1px solid transparent !important;    }    .PostButtonReactionsContainer {        width: auto !important;    }        [dir=ltr] .post--withPostBottomAction .PostBottomActionLikeBtns .like_btns {        margin-top: 5px !important;    }    [dir] .PostBottomAction::before {        background-image: none!important;    }    [dir] .like_cont {           }    [dir] .PostBottomActionLikeBtns.like_cont {  padding-bottom:10px!important;   }';
}

function backPostReactions() {
  const customStyle = fromId("postReactions");
  if (customStyle) {
    customStyle.remove();
  }
}
//Текст сверху сообщения
function textUp() {
  let styleElement = fromId("textUpStyleUp");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "textUpStyleUp" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.ConvoMessage__content:has(.ConvoMessage__mediaAttachments):has(.ConvoMessage__text) {
        display: flex;
        flex-direction: column;

        .ConvoMessageHeader {
            order: -4 !important;
        }
        
        .ConvoMessage__reply {
            order: -3 !important;
            max-height: 42px;
        }
        
        .ConvoMessage__text {
            order: -2 !important;
            margin-top: 0px;
            margin-bottom: 12px;
        }

        .ConvoMessage__mediaAttachments {
            order: -1 !important;
        }

        .ConvoMessageBottomInfo {
            display: flex;
            justify-content: flex-end;
        }
    }


    .ConvoMessageWithoutBubble__content:has(.ConvoMessageWithoutBubble__mediaAttachments):has(.ConvoMessageWithoutBubble__text) {
        display: flex;
        flex-direction: column;

        .ConvoMessageHeader {
            order: -4 !important;
        }
        
        .ConvoMessageWithoutBubble__reply {
            order: -3 !important;
        }
        
        .ConvoMessageWithoutBubble__text {
            order: -2 !important;
            margin-top: 0px;
            margin-bottom: 4px;
        }

        .ConvoMessageWithoutBubble__mediaAttachments {
            order: -1 !important;
        }
    }

    .ForwardedMessageNew__content {
        display: flex;
        flex-direction: column;

        .ForwardedMessageNew__text {
            order: -1 !important;
        }
        
        .Reply {
            order: -2 !important;
            max-height: 42px;
        }
    }

    .AttachWallNew__content {
        display: flex;
        flex-direction: column;

        .AttachWallNew__WallReply {
            order: -4 !important;
        }
        
        .AttachWallNew__header {
            order: -3 !important;
        }
        
        .AttachWallNew__message {
            order: -2 !important;
        }
        
        .AttachWallNew__attaches {
            order: -1 !important;
        }
    }`;
}

function textDown() {
  const customStyle = fromId("textUpStyleUp");
  if (customStyle) {
    customStyle.remove();
  }
}

//Компактный размер фото в посте//
function initCompactPhotos() {
  let styleElement = fromId("compactPhotoPost");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "compactPhotoPost" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.Post--redesignV3 [class^="vkitPrimaryAttachment__root"]:not(:has([href^="/video"]))[style^="--photo-primary-ratio"] {
			padding-top: min(100%,var(--photo-primary-height, 100%));
			max-width: calc(var(--photo-primary-ratio)*100%);
		}`;
}

function removeCompactPhotos() {
  const customStyle = fromId("compactPhotoPost");
  if (customStyle) {
    customStyle.remove();
  }
}
