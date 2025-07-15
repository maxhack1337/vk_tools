/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface SettingsElementProps {
  id: string;
  label: string;
  canFile: boolean;
}

interface SettingsData {
  [key: string]: any;
}

/*
 * Все стейты дублируй сюда и ниже
 */

const allStates = [
  "alternativeScrollbarState",
  "fixLeftMenuState",
  "tabletMenuState",
  "doWideFeedState",
  "garlandDisableState",
  "customlogoState",
  "custombgState",
  "customfontState",
  "sliderValue",
  "feedValue",
  "color-picker-accentState",
  "color-picker-selectionState",
  "color-picker-selection-textState",
  "leftMenuState",
  "returnCameraState",
  "showPatronymicState",
  "removeAvatarsState",
  "removeEmojiStatusState",
  "removePostReactionsState",
  "avatarNameNearState",
  "stickerPopupHideState",
  "newMediaViewerState",
  "feedOldThemeState",
  "oldPostingState",
  "additionalVKEnhancerFunctionsState",
  "classicProfileInterfaceState",
  "disableReadingMessagesState",
  "hideTextEntryState",
  "removeMessageReactionsState",
  "disableReconnectIndicatorState",
  "standardTagInteractionState",
  "oldMessagesBadgeState",
  "disableMessageCounterState",
  "hideMessageFooterState",
  "emojiHotbarState",
  "newMessengerDesignState",
  "disableAwayState",
  "hideNamesAvatarsState",
  "showPollResultsState",
  "doNotDisturbState",
  "reloadFunctionsButtonState",
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
  "returnComAvaState",
  "disableStandaloneCheckOnLoadVideoState",
  "classicCommunityInterfaceState",
];

const clearAllStates: { [key: string]: any } = {
  alternativeScrollbarState: false,
  fixLeftMenuState: false,
  tabletMenuState: false,
  doWideFeedState: false,
  garlandDisableState: false,
  customlogoState: "",
  custombgState: "",
  customfontState: "",
  sliderValue: 100,
  feedValue: 550,
  "color-picker-accentState": "#ffffff",
  "color-picker-selectionState": "#3291ff",
  "color-picker-selection-textState": "#ffffff",
  leftMenuState: {},
  returnCameraState: false,
  showPatronymicState: false,
  removeAvatarsState: false,
  removeEmojiStatusState: false,
  removePostReactionsState: false,
  avatarNameNearState: false,
  stickerPopupHideState: false,
  newMediaViewerState: false,
  feedOldThemeState: false,
  oldPostingState: false,
  additionalVKEnhancerFunctionsState: false,
  classicProfileInterfaceState: false,
  disableReadingMessagesState: false,
  hideTextEntryState: false,
  removeMessageReactionsState: false,
  disableReconnectIndicatorState: false,
  standardTagInteractionState: false,
  oldMessagesBadgeState: false,
  disableMessageCounterState: false,
  hideMessageFooterState: false,
  emojiHotbarState: [],
  newMessengerDesignState: false,
  disableAwayState: false,
  hideNamesAvatarsState: false,
  showPollResultsState: false,
  doNotDisturbState: false,
  reloadFunctionsButtonState: false,
  messageTextUpState: false,
  oldClubState: false,
  oldMessengerDesignState: false,
  compactPhotosState: false,
  oldMessengerAttachesState: false,
  enterProfileGroupIDState: false,
  oldLoaderState: false,
  classicVideoPlaylistsState: false,
  createYtPlayerState: false,
  postInWkLayerState: false,
  returnComAvaState: false,
  disableStandaloneCheckOnLoadVideoState: false,
  classicCommunityInterfaceState: false,
};
const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

const SettingsElement = ({ id, label, canFile }: SettingsElementProps) => {
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (id === "loadSettingsFromFile") {
      const loadSettingsInput = event.target;

      if (loadSettingsInput.files && loadSettingsInput.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", async function () {
          const result: SettingsData = JSON.parse(reader.result as string);
          for (const item of Object.keys(result)) {
            const item123: { [key: string]: any } = {};
            item123[item] = result[item];
            await chrome.storage.local.set(item123);
          }
          if (!isFirefox) window.location.reload();
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTabId = tabs[0].id;
            if (activeTabId !== undefined) {
              chrome.tabs.reload(activeTabId);
            }
          });
        });

        reader.readAsText(loadSettingsInput.files[0]);
      }
    }
  };

  const handleClick = async () => {
    if (id === "saveSettingsToFile") {
      let jsonData = null;
      chrome.storage.local.get(allStates, function (items) {
        console.log(items);
        jsonData = JSON.stringify(items);
        console.log(jsonData);
        const blob = new Blob([jsonData], { type: "text/json" });
        const a = document.createElement("a");

        a.download = "VKToolsSettings.json";
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
    } else if (id === "resetSettings") {
      const result = clearAllStates;
      for (const item of Object.keys(result)) {
        const item123: { [key: string]: any } = {};
        item123[item] = result[item];
        await chrome.storage.local.set(item123);
      }
      window.location.reload();
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTabId = tabs[0].id;
        chrome.tabs.reload(activeTabId!);
      });
    }
  };

  return (
    <label id={id} className={`vkToolsCheckBox`} onClick={handleClick}>
      <div className="vkToolsCheckBox__Label">
        {label && (
          <div className="vkToolsCheckBox__PrimaryText">
            <span className="vkToolsCheckBox__PrimaryTextSpan">{label}</span>
          </div>
        )}
      </div>
      {canFile && <input id="vkToolsInputSettings" type="file" accept=".json" onChange={handleFileInputChange} />}
    </label>
  );
};

export default SettingsElement;
