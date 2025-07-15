import { escapeHtml } from "../../../../escapeHtml";
import splitDuration from "../../../oldFeed/splitDuration";
import addBlock from "./addBlock";
import audiosLang from "./audiosLang";

interface AudioItem {
  id: number;
  owner_id: number;
  artist: string;
  title: string;
  duration: number;
  access_key: string;
  ads: {
    duration: number | string;
    content_id: string;
    puid22: number;
    account_age_type: number;
  };
  track_code: string;
  url: string;
  thumb?: {
    photo_34?: string;
    photo_68?: string;
    photo_135?: string;
    photo_270?: string;
    photo_300?: string;
    photo_600?: string;
    photo_1200?: string;
  };
}

interface AudiosResponse {
  count: number;
  items: AudioItem[];
}

const audiosTab = (audiosGetter: AudiosResponse, id: number, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", audiosLang(vk.lang));

  if (audiosGetter.items.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "audios_module", "audio_w_covers", "_module");
    moduleDiv.id = "public_audios";

    const headerRightLink = document.createElement("div");
    headerRightLink.classList.add("header_right_link", "fl_r");
    moduleDiv.appendChild(headerRightLink);
    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
      lnk.href = audiosGetter.items.length > 0 ? `/audios${audiosGetter.items[0].owner_id}` : "#";
      headerRightLink.append(lnk);
    }
    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.href = audiosGetter.items.length > 0 ? `/audios${audiosGetter.items[0].owner_id}` : "#";

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = audiosLang(vk.lang);

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = audiosGetter.count.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix", "vkToolsModuleBody");

    audiosGetter.items.slice(0, 3).forEach((audioItem) => {
      const audioRow = document.createElement("div");
      audioRow.classList.add("audio_row", "audio_row_with_cover", "_audio_row", `_audio_row_${audioItem.owner_id}_${audioItem.id}`, "audio_can_add", "audio_row2");
      audioRow.setAttribute("tabindex", "0");

      const titleAud = audioItem.title || "";
      const artistAud = audioItem.artist || "";
      const audioData = `[${audioItem.id},${audioItem.owner_id},"","${escapeHtml(titleAud)}","${escapeHtml(artistAud)}",${audioItem.duration},0,0,"",0,34,"module:${audioItem.owner_id}","[]","62efa83eaf32d46ab7//e3727249bcd60c36ee///bca050eaeb2ae61a22/","",{"duration": ${
        audioItem.ads.duration
      },"content_id": "${audioItem.owner_id}_${audioItem.id}","puid22": ${audioItem.ads.puid22},"account_age_type": ${audioItem.ads.account_age_type},"_SITEID": 276,"vk_id": ${window.vk?.id || 0},"ver": 251116},"","","",false,"${audioItem.access_key}",false,"",false]`;

      audioRow.setAttribute("data-full-id", `${audioItem.owner_id}_${audioItem.id}`);
      audioRow.setAttribute("data-audio", audioData);

      audioRow.setAttribute("onclick", "return getAudioPlayer().toggleAudio(this, event)");
      audioRow.setAttribute("onmouseover", "AudioUtils.onRowOver(this, event)");
      audioRow.setAttribute("onmouseleave", "AudioUtils.onRowLeave(this, event)");

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("audio_row_content", "_audio_row_content");

      const playBtn = document.createElement("button");
      playBtn.classList.add("blind_label", "_audio_row__play_btn");
      playBtn.setAttribute("aria-label", `Воспроизвести ${titleAud}`);
      playBtn.setAttribute("onclick", "getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)");
      contentDiv.appendChild(playBtn);

      const coverDiv = document.createElement("div");
      coverDiv.classList.add("audio_row__cover");
      if (audioItem.thumb?.photo_300) {
        coverDiv.style.backgroundImage = `url(${audioItem.thumb.photo_300})`;
      }
      contentDiv.appendChild(coverDiv);

      const coverBack = document.createElement("div");
      coverBack.classList.add("audio_row__cover_back", "_audio_row__cover_back");
      contentDiv.appendChild(coverBack);

      const coverIcon = document.createElement("div");
      coverIcon.classList.add("audio_row__cover_icon", "_audio_row__cover_icon");
      contentDiv.appendChild(coverIcon);

      const counterDiv = document.createElement("div");
      counterDiv.classList.add("audio_row__counter");
      contentDiv.appendChild(counterDiv);

      const playBtnDiv = document.createElement("div");
      playBtnDiv.classList.add("audio_row__play_btn");
      contentDiv.appendChild(playBtnDiv);

      const innerDiv = document.createElement("div");
      innerDiv.classList.add("audio_row__inner");

      const performerTitle = document.createElement("div");
      performerTitle.classList.add("audio_row__performer_title");

      const performersDiv = document.createElement("div");
      performersDiv.classList.add("audio_row__performers");
      performersDiv.setAttribute("onmouseover", "setTitle(this)");

      const performerLink = document.createElement("a");
      performerLink.href = `/audio?performer=1&q=${encodeURIComponent(artistAud)}`;
      performerLink.textContent = artistAud;
      performersDiv.appendChild(performerLink);

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("audio_row__title", "_audio_row__title");
      titleDiv.setAttribute("onmouseover", "setTitle(this)");

      const titleSpan = document.createElement("span");
      titleSpan.classList.add("audio_row__title_inner", "_audio_row__title_inner");
      titleSpan.textContent = titleAud;

      const subtitleSpan = document.createElement("span");
      subtitleSpan.classList.add("audio_row__title_inner_subtitle", "_audio_row__title_inner_subtitle");

      titleDiv.appendChild(titleSpan);
      titleDiv.appendChild(subtitleSpan);

      performerTitle.appendChild(performersDiv);
      performerTitle.appendChild(titleDiv);
      innerDiv.appendChild(performerTitle);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("audio_row__info", "_audio_row__info");

      const durationDiv = document.createElement("div");
      durationDiv.classList.add("audio_row__duration", "audio_row__duration-s", "_audio_row__duration");
      durationDiv.style.visibility = "visible";

      durationDiv.textContent = splitDuration(audioItem.duration);

      infoDiv.appendChild(durationDiv);
      innerDiv.appendChild(infoDiv);

      contentDiv.appendChild(innerDiv);

      const playerPlace = document.createElement("div");
      playerPlace.classList.add("audio_player__place", "_audio_player__place");
      contentDiv.appendChild(playerPlace);

      audioRow.appendChild(contentDiv);
      moduleBody.appendChild(audioRow);
    });

    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addArticle = addBlock("audios", id);
      aside.append(addArticle);
    }
  }
  return aside;
};

export default audiosTab;
