/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";
import LeftMenuItem from "./LeftMenuItem";

export default function LeftMenuItems() {
  const { getLang } = useLocalization();

  return (
    <div className="vkToolsLeftMenuBlock">
      <LeftMenuItem label={getLang("profile")} id={"profileLeft"} />
      <LeftMenuItem label={getLang("feed")} id={"feedLeft"} />
      <LeftMenuItem label={getLang("im")} id={"imLeft"} />
      <LeftMenuItem label={getLang("calls")} id={"callsLeft"} />
      <LeftMenuItem label={getLang("friends")} id={"friendsLeft"} />
      <LeftMenuItem label={getLang("groups")} id={"groupsLeft"} />
      <LeftMenuItem label={getLang("photo")} id={"photoLeft"} />
      <LeftMenuItem label={getLang("audio")} id={"audioLeft"} />
      <LeftMenuItem label={getLang("video")} id={"videoLeft"} />
      <LeftMenuItem label={getLang("clips")} id={"clipsLeft"} />
      <LeftMenuItem label={getLang("games")} id={"gamesLeft"} />
      <LeftMenuItem label={getLang("stickers")} id={"stickersLeft"} />
      <LeftMenuItem label={getLang("market")} id={"marketLeft"} />
      <LeftMenuItem label={getLang("services")} id={"servicesLeft"} />
      <LeftMenuItem label={getLang("vkpay")} id={"vkpayLeft"} />
      <LeftMenuItem label={getLang("bookmarks")} id={"bookmarksLeft"} />
      <LeftMenuItem label={getLang("files")} id={"filesLeft"} />
      <LeftMenuItem label={getLang("ads")} id={"adsLeft"} />
      <LeftMenuItem label={getLang("appmng")} id={"appmngLeft"} />
      <LeftMenuItem label={getLang("faq")} id={"faqLeft"} />
      <label className="ButtonInstallpreload" id="leftmenusave" style={{ margin: "12px 12px 12px;" }}>
        <span className="ButtonInstall">
          <span className="vkToolsPresentation" role="presentation"></span>
          <span className="vkToolsButtonText__in">{getLang("save")}</span>
        </span>
      </label>
    </div>
  );
}
