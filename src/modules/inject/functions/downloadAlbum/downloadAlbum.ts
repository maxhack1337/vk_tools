import fromId from "../../../content/fromId";
import create from "../../create";
import parseAlbum from "./parseAlbum";

/*
 * Если сломается любая скачивалка - заходи ко мне, либо к Мирату
 */

const downloadAlbum = () => {
  let styleElement = fromId("downloadProgressBar");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "downloadProgressBar" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.vkEnhancerDownloadAlbumButton{display: flex;
    flex-direction: column;
    align-items: center;}
.pBarVkEnhAlbum {
	margin-top:2px;
    --track-background: var(--vkui--color_text_contrast_themed);
    --fill-background: var(--vkui--color_background_accent_themed);
    --border-color: var(--vkui--color_separator_primary);
    --border-radius: 10px;
    --height: 8px;
    --width: 100%;
    --value: 0;

    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    overflow: hidden;
}

.vkEnhancerDownloadAlbumButton:hover {
    opacity: .95;
}

.pBarVkEnhAlbum::-webkit-progress-bar {
    background-color: var(--track-background);
}

.pBarVkEnhAlbum::-webkit-progress-value {
    background-color: var(--fill-background);
}

.pBarVkEnhAlbum::-moz-progress-bar {
    background-color: var(--fill-background);
}

.pBarVkEnhAlbum::-ms-fill {
    background-color: var(--fill-background);
}

.pBarVkEnhAlbum::-webkit-progress-inner-element {
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
}

.pBarVkEnhAlbum::-moz-progress-bar {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
}
`;

  document.arrive("[class^='PhotosAlbumPageSubHeader__info']", { existing: true }, function (e) {
    let buttonAlbumSettings = document.querySelector('[data-testid="headerlayout-aside"] [class^="vkuiButtonGroup__host"]');
    let updateButton = document.createElement("div");
    updateButton.style.display = "flex";
    updateButton.style.justifyContent = "flex-end";
    updateButton.innerHTML = `<div class="vkEnhancerDownloadAlbumButton">
	<a style="background-color:var(--vkui--color_background_accent_themed);color:var(--vkui--color_text_contrast_themed);padding:0 16px;border-radius: 8px;text-decoration: none; height: 28px; display: flex;" class="Button-module__root--enpNU vkuiButton vkuiButton--size-m vkuiButton--appearance-accent vkuiButton--align-center vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible">
	<span class="vkuiButton__in">
  <span class="vkuiButton__before" style="display: flex; color: var(--vkui--color_text_contrast_themed);" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"></path></svg></span>
  <span style="font-size: 14px;" class="vkuiButton__content">${getLang?.("photos_album_menu_download")}</span></span></a></div>`;
    if (buttonAlbumSettings) {
      buttonAlbumSettings?.prepend(updateButton);
    } else {
      buttonAlbumSettings = document.querySelector('[data-testid="headerlayout-aside"]');
      buttonAlbumSettings?.prepend(updateButton);
    }
    updateButton.addEventListener("click", async function () {
      await parseAlbum();
    });
  });

  document.arrive(".photos_album_intro", { existing: true }, function (e) {
    let updateButton = document.createElement("div");
    let nazva = getLang?.("audio_music_album_playlist_type_album");
    let isArr = Array.isArray(nazva) ? nazva[0] : nazva || "Альбом";
    updateButton.style.marginTop = "12px";
    updateButton.innerHTML = `<span class="photos_album_info"><a>${getLang?.("video_download_video_from_modal") + " " + isArr.toLowerCase()}</a></span>`;
    e.querySelector(".photos_album_intro_info")?.appendChild(updateButton);
    updateButton.addEventListener("click", async function () {
      await parseAlbum();
    });
  });
};

export default downloadAlbum;
