import getDownloadAttachments from "../convoButtons/getDownloadAttachments";
import getSelectAttachmentType from "./getSelectAttachmentType";

const initDownloadAttachesBox = (peer_id: number) => {
    if (!peer_id) return;
    window.stManager.add(["ImageStatusPopup.css"]);
    let x = new showFastBox();
    x.setOptions({ title: !1, hideButtons: !0 });
    x.content(`
      <div class="ImageStatusPopup__title">${getDownloadAttachments(vk.lang)}</div>
      <div class="ImageStatusPopup__description">${getSelectAttachmentType(vk.lang)}</div>
      <select id="selectAttachmentType" style="width: 100%;padding: 8px;margin-bottom: 12px;border-radius: 8px;border: 1px solid var(--vkui--color_background_accent_themed);">
        <option value="photo">${getLang?.('vkconnect_sak_scope_photos')}</option>
        <option value="video">${getLang?.('search_cat_video')}</option>
      </select>
      <div class="ImageStatusPopup__buttons">
        <div class="ImageStatusPopup__button" onclick="(function(){
                const select = document.getElementById('selectAttachmentType');
                const val = select ? select.value : 'photo';
                window.vkenh.downloadAttaches(val, ${peer_id});
            })()">
            <span class="FlatButton__in" style='color: var(--vkui--color_text_contrast_themed);background-color: var(--vkui--color_background_accent_themed);    height: 32px;    padding: 0 16px;    font-weight: 500;    font-size: 14px;    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif; border-radius: 8px; cursor: pointer;'>
              <span class="FlatButton__content">${getLang?.('video_download_video_from_modal')}</span>
            </span>
          </a>
        </div>
      </div>
    <div class="ImageStatusPopup__closeButton box_x_button" onclick="curBox() &amp;&amp; curBox().hide()" role="button">
      <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M4.72 4.72c.3-.3.77-.3 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
    </div>
    </div>`)
}

export default initDownloadAttachesBox;