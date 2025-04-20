import JSZip from "jszip";
import {getGeneratingArchiveText, getDownloadProgressText, getPreparingText } from "./localizationPhoto";
import fetchPhotoBlob from "./fetchPhotoBlob";
import triggerDownload from "./triggerDownload";

export async function downloadAllPhotosArchive(peer_id: number) {
  const lang = vk.lang ?? 3;

  const zip = new JSZip();
  let startFrom: string | undefined = undefined;
  let photoCount = 0;
  let totalPhotos = 0;
  let isCancelled = false;

  const box = new showFastBox();
  box.setOptions({ title: false, hideButtons: true });
  box.content(`
    <div style="padding: 16px; font-size: 14px; color: var(--vkui--color_text_secondary);">
      <div id="downloadProgressText">${getPreparingText(lang)}</div>
      <progress id="downloadProgressBar" value="0" max="100" style="width: 100%; margin-top: 8px;"></progress>
      <button id="cancelDownloadBtn" style="margin-top: 12px; padding: 6px 12px; cursor: pointer; border-radius: 6px; border: none; background-color: var(--vkui--color_background_accent_themed); color: var(--vkui--color_text_contrast_themed); font-weight: 600;">
        ${getLang?.('global_cancel')}
      </button>
    </div>
  `);

  const progressText = box.bodyNode.querySelector("#downloadProgressText") as HTMLElement;
  const progressBar = box.bodyNode.querySelector("#downloadProgressBar") as HTMLProgressElement;
  const cancelBtn = box.bodyNode.querySelector("#cancelDownloadBtn") as HTMLButtonElement;

  let abortController = new AbortController();

  cancelBtn.onclick = () => {
    isCancelled = true;
    abortController.abort();
    box.hide();
  };

  try {
    do {
      const params: any = {
        peer_id,
        media_type: "photo",
        count: 200,
      };
      if (startFrom) params.start_from = startFrom;

      const response = await vkApi.api("messages.getHistoryAttachments", params);
      const items = response.items || [];
      if (items.length === 0) break;
      totalPhotos += items.length;

      for (const item of items) {
        if (isCancelled) throw new Error("Отменено пользователем");

        const photo = item.attachment?.photo;
        if (!photo || !photo.orig_photo?.url) continue;

        const url = photo.orig_photo.url;
        try {
          progressText.textContent = getDownloadProgressText(vk.lang,photoCount,totalPhotos);
          progressBar.max = totalPhotos;
          progressBar.value = photoCount;
          abortController = new AbortController();

          const blob = await fetchPhotoBlob(url, abortController.signal);
          const filename = `${photo.owner_id}_${photo.id}.jpg`;
          zip.file(filename, blob);
          photoCount++;

          progressText.textContent = `Скачано фото: ${photoCount} из ~${totalPhotos}`;
          progressBar.value = photoCount;
        } catch (e) {
          if (isCancelled) throw e;
          console.warn(`Не удалось скачать фото по URL: ${url}`, e);
        }
      }

      if (!response.next_from) break;
      startFrom = response.next_from;
    } while (!isCancelled);

    if (photoCount === 0) {
      box.hide();
      return;
    }

    progressText.textContent = getGeneratingArchiveText(lang);
    progressBar.removeAttribute("value");
    progressBar.removeAttribute("max");

    const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });

    if (isCancelled) {
      box.hide();
      return;
    }

    const zipFilename = `vk_photos_${peer_id}.zip`;
    triggerDownload(zipBlob, zipFilename);
    console.log(`[VK Tools] ${getLang?.('global_archive_ready') || 'Архив готов'}: vk_photos_${peer_id}.zip`);
    box.hide();

  } catch (error: any) {
    if (error.message === "Отменено пользователем") return;
    console.error(error);
    box.hide();
  }
}
