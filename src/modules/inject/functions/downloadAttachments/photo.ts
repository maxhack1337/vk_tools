import JSZip from "jszip";
import { getGeneratingArchiveText, getDownloadProgressText, getPreparingText } from "./localizationPhoto";
import fetchPhotoBlob from "./fetchPhotoBlob";
import triggerDownload from "./triggerDownload";

export async function downloadAllPhotosArchive(peer_id: number) {
  const lang = vk.lang ?? 3;

  let startFrom: string | undefined = undefined;
  let photoCount = 0;
  let totalPhotos = 0;
  let archiveIndex = 1;
  let isCancelled = false;

  const box = new showFastBox();
  box.setOptions({ title: false, hideButtons: true });
  box.content(`
    <div style="padding: 16px; font-size: 14px; color: var(--vkui--color_text_secondary);">
      <div id="downloadProgressText">${getPreparingText(lang)}</div>
      <div id="upload2_progress" class="page_attach_progress ui_progress" style="height: 10px; display: block; margin-top: 8px;">
        <div class="ui_progress_back"></div>
        <div class="ui_progress_bar" style="width: 0%;"></div>
      </div>
      <button id="cancelDownloadBtn" style="margin-top: 12px; padding: 6px 12px; cursor: pointer; border-radius: 6px; border: none; background-color: var(--vkui--color_background_accent_themed); color: var(--vkui--color_text_contrast_themed); font-weight: 600;">
        ${getLang?.("global_cancel")}
      </button>
    </div>
  `);

  const progressText = box.bodyNode.querySelector("#downloadProgressText") as HTMLElement;
  const progressBar = box.bodyNode.querySelector(".ui_progress_bar") as HTMLDivElement;
  const cancelBtn = box.bodyNode.querySelector("#cancelDownloadBtn") as HTMLButtonElement;

  let abortController = new AbortController();

  cancelBtn.onclick = () => {
    isCancelled = true;
    abortController.abort();
    box.hide();
  };

  let zip = new JSZip();

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
          progressText.textContent = getDownloadProgressText(lang, photoCount + (archiveIndex - 1) * 1000, totalPhotos);

          abortController = new AbortController();

          const blob = await fetchPhotoBlob(url, abortController.signal);
          const filename = `photo${photo.owner_id}_${photo.id}.jpg`;
          zip.file(filename, blob);
          photoCount++;

          progressText.textContent = getDownloadProgressText(lang, photoCount + (archiveIndex - 1) * 1000, totalPhotos);

          if (totalPhotos > 0) {
            const progressPercent = Math.min(100, ((photoCount + (archiveIndex - 1) * 1000) / totalPhotos) * 100);
            progressBar.style.width = `${progressPercent}%`;
          } else {
            progressBar.style.width = "0%";
          }

          if (photoCount >= 1000) {
            const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
            const zipFilename = `vk_photos_${peer_id}_part${archiveIndex}.zip`;
            triggerDownload(zipBlob, zipFilename);
            console.log(`[VK Tools] Архив готов: ${zipFilename}`);

            archiveIndex++;
            photoCount = 0;
            zip = new JSZip();

            progressText.textContent = getPreparingText(lang);
            progressBar.style.width = "0%";
          }
        } catch (e) {
          if (isCancelled) throw e;
          console.warn(`[VK Tools] Не удалось скачать фото по URL: ${url}`, e);
        }
      }

      if (!response.next_from) break;
      startFrom = response.next_from;
    } while (!isCancelled);

    if (photoCount > 0 && !isCancelled) {
      progressText.textContent = getGeneratingArchiveText(lang);
      progressBar.style.width = "100%";

      const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const zipFilename = `vk_photos_${peer_id}_part${archiveIndex}.zip`;
      triggerDownload(zipBlob, zipFilename);
      console.log(`[VK Tools] Архив готов: ${zipFilename}`);
    }

    box.hide();
  } catch (error: any) {
    if (error.message === "Отменено пользователем") return;
    console.error(error);
    box.hide();
  }
}
