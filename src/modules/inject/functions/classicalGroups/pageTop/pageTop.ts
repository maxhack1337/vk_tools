import { escapeHtml } from "../../../escapeHtml";
import changeCurrentInfoLang from "../../classicalProfile/scripts/changeCurrentInfoLang";
import postingEmojiHint from "../../oldPosting/postingEmojiHint";
import shareSubscribersLangKeys from "../shareLangKeys";
import parseAll from "../textParser/parseAll";

const pageTop = (name: string, status: string, level: number, hashes: any) => {
  const container = document.createElement("div");
  container.classList.add("page_top", "page_block", "vkToolsPageTopBlock");
  container.style.marginTop = "0";

  const pseudoForBorder = document.createElement("div");
  pseudoForBorder.classList.add("vkToolsPseudoBlock");

  const h2 = document.createElement("h2");
  h2.classList.add("page_name");
  h2.textContent = name;
  pseudoForBorder.appendChild(h2);

  if ((status && status !== "") || level >= 2) {
    if (!status) status = "";

    const statusDiv = document.createElement("div");
    statusDiv.classList.add("page_current_info", "vkToolsAntiZindex");
    statusDiv.id = "page_current_info";
    statusDiv.style.position = "relative";
    if (level >= 2) {
      shareSubscribersLangKeys(vk.lang);

      statusDiv.innerHTML = `
  <div id="currinfo_editor" style="margin-top: 32px z-index: 101" class="page_status_editor clear" onclick="cancelEvent(event)">
    <div class="editor">
      <div class="page_status_input_wrap _emoji_field_wrap">
        <div class="emoji_smile_wrap  _emoji_wrap">
          <div data-testid="emoji-smile" class="emoji_smile _emoji_btn" role="button" title="${postingEmojiHint(vk.lang)}" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);">
            <div class="emoji_smile_icon"></div>
          </div>
        </div>
        <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox"></div>
      </div>
      <button class="flat_button button_small page_status_btn_save" id="currinfo_save">${getLang?.("Save")}</button>
    </div>
  </div>
  <div id="currinfo_wrap" class="vk_tools_edit_status_wrap" tabindex="0" role="button">
    <span id="current_info" class="current_info">${status === "" ? `<span class="no_current_info">${changeCurrentInfoLang(vk.lang)}</span>` : `<span class="my_current_info"><span class="current_text">${escapeHtml(status)}</span></span>`}
    </span>
  </div>
  <div id="currinfo_fake" class="vk_tools_currinfo_fake" style="display: none">${status === "" ? `<span class="no_current_info">${changeCurrentInfoLang(vk.lang)}</span>` : `<span class="my_current_info"><span class="current_text">${escapeHtml(status)}</span></span>`}
  </div>
      `;

      statusDiv.querySelector(".vk_tools_edit_status_wrap")?.addEventListener("click", () => {
        cur.options.info_hash = hashes.more_info_hash;
        page.infoEdit();
      });
    } else {
      const statusSpan = document.createElement("span");
      statusSpan.classList.add("current_text", "vk_tools_current_text");
      statusSpan.innerHTML = parseAll(status || "");
      statusDiv.appendChild(statusSpan);
    }

    pseudoForBorder.appendChild(statusDiv);
  }

  container.append(pseudoForBorder);
  return container;
};

export default pageTop;
