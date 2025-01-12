import React, { useEffect, useState } from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";
import LeftMenuItem from "./LeftMenuItem";
import LeftMenuSaveButton from "./LeftMenuSaveButton";

type LeftMenuInputKeys = "profile" | "feed" | "im" | "calls" | "friends" | "groups" | "photo" | "audio" | "video" | "clips" | "games" | "stickers" | "market" | "services" | "vkpay" | "bookmarks" | "files" | "ads" | "appmng" | "faq";

export default function LeftMenuItems() {
  const { getLang } = useLocalization();

  const leftMenuInputs: LeftMenuInputKeys[] = ["profile", "feed", "im", "calls", "friends", "groups", "photo", "audio", "video", "clips", "games", "stickers", "market", "services", "vkpay", "bookmarks", "files", "ads", "appmng", "faq"];

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    chrome.storage.local.get("leftMenuState", (result) => {
      if (result.leftMenuState) {
        console.log(result.leftMenuState);
        setInputValues(result.leftMenuState);
      }
    });
  }, []);

  const handleSave = () => {
    let changedValues: { [key: string]: string } = {};

    leftMenuInputs.forEach((id) => {
      const input = document.getElementById(id + "Left") as HTMLInputElement;
      if (input && input.value !== "") {
        changedValues[id + "Left"] = input.value;
      }
    });

    chrome.storage.local.set({
      leftMenuState: changedValues,
    });

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        const activeTabId = tabs[0].id;
        if (activeTabId !== undefined) {
          chrome.tabs.sendMessage(activeTabId, {
            type: "leftMenuToggle",
            value: changedValues,
          });
          chrome.tabs.reload(activeTabId);
        }
      }
    );
  };

  const handleInputChange = (id: string, newValue: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [`${id}Left`]: newValue,
    }));
  };

  return (
    <div className="vkToolsLeftMenuBlock">
      {leftMenuInputs.map((inputKey) => (
        <LeftMenuItem key={inputKey} label={getLang(inputKey)} id={`${inputKey}Left`} value={inputValues[`${inputKey}Left`] || ""} onChange={handleInputChange} />
      ))}
      <LeftMenuSaveButton label={getLang("save")} onClick={handleSave} />
    </div>
  );
}
