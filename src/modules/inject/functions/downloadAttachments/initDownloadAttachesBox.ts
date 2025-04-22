import getDownloadAttachments from "../convoButtons/getDownloadAttachments";
import getSelectAttachmentType from "./getSelectAttachmentType";
import { getAudioMessagesText } from "./localizationAudioMessages";
import { getDocumentsText } from "./localizationDocs";

const initDownloadAttachesBox = (peer_id: number) => {
  if (!peer_id) return;
  window.stManager.add(["ImageStatusPopup.css"]);
  let fallback;
  let src = (document.querySelector(".ConvoHeader__avatar .ReImage__img") as HTMLImageElement)?.src;
  let text = document.querySelector(".ConvoHeader .ConvoTitle__author")?.textContent || "undefined";
  if (!src) {
    fallback = document.querySelector(".ConvoHeader__avatar .BasicAvatar__noImg")?.cloneNode(true) as HTMLDivElement;
    if (!fallback) {
      fallback = document.querySelector(".ConvoHeader__avatar .AvatarFavorites")?.cloneNode(true) as HTMLDivElement;
    }
    fallback.style.width = "32px";
    fallback.style.height = "32px";
    fallback.style.margin = "0px 8px 0 0";
  }
  let x = new showFastBox();
  x.setOptions({ title: !1, hideButtons: !0 });
  x.content(`
    <div class="vkToolsSelectAttachModalHeader" style="padding: 6px 6px 6px 20px; background: var(--vkui--color_background_secondary); border-radius: 200px; display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
      <div style="font-weight: 100; user-select: none; margin-bottom: 0px; font-size: 16px;" class="ImageStatusPopup__description">${getDownloadAttachments(vk.lang)}</div>
      <div class="ImageStatusPopup__description" style="padding: 8px 16px;border-radius: 200px;background: var(--vkui--color_background_modal);user-select: none;margin-bottom: 0px;font-size: 14px;display: flex;align-items: center;justify-content: center;">
        ${src ? `<img src=${src} style="width: 32px; height: 32px; border-radius: 100%; margin: 0px 8px 0 0;">` : fallback?.outerHTML || '<div class="BasicAvatar__noImg BasicAvatar__noImg--color-5">?</div>'}
        <b style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis; max-width: 140px;">${text}</b>
        </div>
        </div>
      <div class="vkToolsSelectAttachType" style="padding:0 20px; margin-bottom: 12px; display: flex; height: 46px; align-items: center;">
      <div class="ImageStatusPopup__description" style="margin-bottom: 0px; font-size: 13px; width: auto; white-space: nowrap; margin-right: 8px; user-select: none">${getSelectAttachmentType(vk.lang)}</div>
      <select id="selectAttachmentType" style="width: 100%;padding: 8px;border-radius: 8px;border: 1px solid var(--vkui--color_background_accent_themed);">
        <option value="photo">${getLang?.("vkconnect_sak_scope_photos")}</option>
        <option value="audio_message">${getAudioMessagesText(vk.lang)}</option>
        <option value="video">${getLang?.("search_cat_video")}</option>
        <option value="docs">${getDocumentsText(vk.lang)}</option>
      </select>
      </div>
      <div class="ImageStatusPopup__buttons">
        <div class="ImageStatusPopup__button" onclick="(function(){
                const select = document.getElementById('selectAttachmentType');
                const val = select ? select.value : 'photo';
                window.vkenh.downloadAttaches(val, ${peer_id});
            })()">
            <span class="FlatButton__in" style='color: var(--vkui--color_text_contrast_themed);background-color: var(--vkui--color_background_accent_themed);    height: 32px;    padding: 0 16px;    font-weight: 500;    font-size: 14px;    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif; border-radius: 8px; cursor: pointer;'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" style="margin-right: 4px;">
              <path d="M10.9375 2.1875C10.9375 1.66973 10.5178 1.25 10 1.25C9.48223 1.25 9.0625 1.66973 9.0625 2.1875V10.5492L6.28791 7.77459C5.9218 7.40847 5.3282 7.40847 4.96209 7.77459C4.59597 8.1407 4.59597 8.7343 4.96209 9.10041L9.33709 13.4754C9.5129 13.6512 9.75136 13.75 10 13.75C10.2486 13.75 10.4871 13.6512 10.6629 13.4754L15.0379 9.10041C15.404 8.7343 15.404 8.1407 15.0379 7.77459C14.6718 7.40847 14.0782 7.40847 13.7121 7.77459L10.9375 10.5492V2.1875Z" fill="currentColor"></path>
              <path d="M3.4375 15.625C2.91973 15.625 2.5 16.0447 2.5 16.5625C2.5 17.0803 2.91973 17.5 3.4375 17.5H16.5625C17.0803 17.5 17.5 17.0803 17.5 16.5625C17.5 16.0447 17.0803 15.625 16.5625 15.625H3.4375Z" fill="currentColor"></path>
            </svg>  
            <span class="FlatButton__content">${getLang?.("video_download_video_from_modal")}</span>
            </span>
          </a>
        </div>
      </div>
    <div class="ImageStatusPopup__closeButton box_x_button" onclick="curBox() &amp;&amp; curBox().hide()" role="button">
      <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M4.72 4.72c.3-.3.77-.3 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
    </div>
    </div>`);
};

export default initDownloadAttachesBox;
