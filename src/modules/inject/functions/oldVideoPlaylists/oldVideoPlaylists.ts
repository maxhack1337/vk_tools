import createStyle from "../../createStyle";
import { escapeHtml } from "../../escapeHtml";
import getLocalValue from "../../getLocalValue";
import { splitRaw } from "../../helpers";
import extractPlistRaw from "./extractPlistRaw";
import oldVideoPlaylistsStyle from "./oldVideoPlaylistsStyle";
import parseVidPlist from "./parseVidPlist";

const oldVideoPlaylists = () => {
  if (getLocalValue("playlistsClassicalV")) {
    document.arrive("[class^='PlaylistPage__group']", { existing: true }, (e) => {
      e.arrive('[data-testid="playlist_more_button"]', { existing: true }, async (f) => {
        createStyle("oldPlist", oldVideoPlaylistsStyle());
        let morePlistButton = f;
        let raw = extractPlistRaw(window.location.href);
        let pList = splitRaw(raw);
        let plistProps = await vkApi.api("video.getAlbumById", { owner_id: pList.oid, album_id: pList.id });

        let editButton = e.querySelector('[data-testid="edit_playlist_button"]');

        let parentEl = document.querySelector(".vkuiGroup__header")?.parentElement;
        let appendBlockHere = parentEl?.querySelector(":scope > div:not(.vkuiGroup__header)");

        let blockElement = document.createElement("div");
        blockElement.classList.add("VideoInfoPanel", "VideoInfoPanel--playlist", "VideoInfoPanel--withTopDelimiter", "VkToolsVideoInfoPanel");
        blockElement.id = "video_info_panel";
        blockElement.style.paddingLeft = "8px";
        blockElement.style.paddingRight = "8px";
        blockElement.style.zIndex = "1";
        let iconElement = document.createElement("div");
        iconElement.classList.add("VideoInfoPanel__cover");

        let privacy = plistProps.privacy && plistProps.privacy.category !== "all";
        let title = plistProps.title || "";
        let subCount = plistProps.followers_count === 0 ? getLang?.("mobile_video_playlist_no_subscribers").toString().toLowerCase() : getLang?.("video_showcase_N_subscribers", plistProps.followers_count).toString().toLowerCase();
        if (plistProps.image && plistProps.image.length > 1) {
          iconElement.innerHTML = `
          <img src="${plistProps.image.at(-1).url}" loading="lazy" class="VideoInfoPanel__coverImage" alt="${escapeHtml(title)}">
<div class="VideoInfoPanel__coverIcon"></div>
${
  privacy
    ? '<div class= "VideoInfoPanel__privateIcon"><svg xmlns="http://www.w3.org/2000/svg" width = "12" height = "12" fill = "currentColor" viewBox = "0 0 12 12"><path d="M6 .5a3 3 0 0 1 3 3V5h.75c.41 0 .75.34.75.76v4.48a.76.76 0 0 1-.75.76h-7.5a.76.76 0 0 1-.75-.76V5.76c0-.42.34-.76.75-.76H3V3.5a3 3 0 0 1 2.82-3H6ZM6 2h-.14A1.5 1.5 0 0 0 4.5 3.5V5h3V3.5C7.5 2.67 6.83 2 6 2Z"></path></svg></div>'
    : ""
}
`;
        } else {
          iconElement.innerHTML = `<div class="VideoInfoPanel__coverIcon"><svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M13 18a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0-6a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm9-6a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm3 12.13a1 1 0 0 1 0 1.74l-6.49 4c-.67.38-1.51-.1-1.51-.87v-8c0-.77.84-1.25 1.51-.86z"></path></g></svg></div>
          ${
            privacy
              ? '<div class= "VideoInfoPanel__privateIcon"><svg xmlns="http://www.w3.org/2000/svg" width = "12" height = "12" fill = "currentColor" viewBox = "0 0 12 12"><path d="M6 .5a3 3 0 0 1 3 3V5h.75c.41 0 .75.34.75.76v4.48a.76.76 0 0 1-.75.76h-7.5a.76.76 0 0 1-.75-.76V5.76c0-.42.34-.76.75-.76H3V3.5a3 3 0 0 1 2.82-3H6ZM6 2h-.14A1.5 1.5 0 0 0 4.5 3.5V5h3V3.5C7.5 2.67 6.83 2 6 2Z"></path></svg></div>'
              : ""
          }`;
        }

        let contentEl = document.createElement("div");
        contentEl.classList.add("VideoInfoPanel__content");

        let contInfo = document.createElement("div");
        contInfo.classList.add("VideoInfoPanel__contentInfo");

        contInfo.innerHTML = `<a href="/playlist/${raw}" class="VideoInfoPanel__title" title="${escapeHtml(title)}">${escapeHtml(title)}</a>
      <div class="VideoInfoPanel__text"><span class="js-playlist_subscribers_count">${subCount}</span></div>`;

        let actions = document.createElement("div");
        actions.classList.add("VideoInfoPanel__actions", "VkToolsButton__actions-plist");
        if (editButton) actions.append(editButton);
        actions.append(morePlistButton || "");
        contentEl.append(contInfo, actions);
        blockElement.append(iconElement, contentEl);

        let videoCount = plistProps.count || 0;
        let videoHeaderBlock = document.createElement("div");
        videoHeaderBlock.classList.add("VideoSubheader", "VkToolsVideoSubheader");
        videoHeaderBlock.innerHTML = `
        <div class="VideoSubheader__title">
        <div class="VideoSubheader__titleText js-video-subtitle">${getLang?.("me_fc_add_video")}</div>
        <div class="VideoSubheader__titleCounter js-video-subtitle-counter">${videoCount}</div>
        </div>
        `;
        if (appendBlockHere && !document.querySelector(".VkToolsVideoInfoPanel")) parentEl?.insertBefore(blockElement, appendBlockHere);
        if (appendBlockHere && videoCount > 0 && !document.querySelector(".VkToolsVideoSubheader")) parentEl?.insertBefore(videoHeaderBlock, appendBlockHere);
      });
      document.arrive('[data-testid="video_card_title"]', { existing: true }, async (s) => {
        let draggable = false;
        let allVideosInPlist = s.closest("[class^='vkitVideoCardLayout__card']")?.querySelector("[class^='vkitVideoCardThumb__thumb'][href^='/playlist']:has(> [class^='vkitVideoCardPreviewContainer__preview'])");

        if (!allVideosInPlist) {
          allVideosInPlist = s.closest("[class*='vkitDraggableVideoCard__card']")?.querySelector("[class^='vkitVideoCardThumb__thumb'][href^='/playlist']:has(> [class^='vkitVideoCardPreviewContainer__preview'])");
          if (!allVideosInPlist) {
            return;
          } else {
            draggable = true;
          }
        }
        let props = await parseVidPlist(allVideosInPlist as HTMLElement);
        let closestLayoutCard = draggable ? "[class*='vkitDraggableVideoCard__card']" : '[class^="vkitVideoCardLayout__card"]';
        let videoCardInfo = allVideosInPlist.closest(closestLayoutCard)?.querySelector('[class^="vkitVideoCardInfoLayout__container"]');

        if (!videoCardInfo?.querySelector(".AvatarRich")) {
          let videoCardAvatar = document.createElement("div");
          videoCardAvatar.classList.add("VideoCard__avatar");

          let avatarRich = document.createElement("a");
          avatarRich.classList.add("AvatarRich", "vkToolsRichAvaVideoPlist");
          avatarRich.href = props.owner.href ? props.owner.href : "";

          let avaRichImg = document.createElement("img");
          avaRichImg.classList.add("AvatarRich__img");
          avaRichImg.src = props.owner.photo_50 ? props.owner.photo_50 : "";

          if (props.owner.photo_50) {
            avatarRich.append(avaRichImg);
            videoCardAvatar.append(avatarRich);
            videoCardInfo?.prepend(videoCardAvatar);
          }
        }
      });
    });
  }
};

export default oldVideoPlaylists;
