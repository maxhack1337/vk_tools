import JSZip from "jszip";
import { getGeneratingArchiveText, getDownloadProgressText, getPreparingText } from "./localizationDocs";
import triggerDownload from "./triggerDownload";
import fetchPhotoBlob from "./fetchPhotoBlob";
import mimeTypes from "./mime.json";
import getExtensionFromMimeType from "./getExtensionFromMimeType";
import vkApiWithGroup from "../graffityVoice/vkApiWithGroup";

export async function downloadAllDocsArchive(peer_id: number) {
  const lang = vk.lang ?? 3;

  let startFrom: string | undefined = undefined;
  let docCount = 0;
  let totalDocs = 0;
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
        media_type: "doc",
        count: 200,
      };
      if (startFrom) params.start_from = startFrom;

      const response = await vkApiWithGroup("messages.getHistoryAttachments", params);
      const items = response.items || [];
      if (items.length === 0) break;

      totalDocs += items.length;

      for (const item of items) {
        if (isCancelled) throw new Error("Отменено пользователем");

        const doc = item.attachment?.doc;
        if (!doc) continue;
        const url = doc.url;
        if (!url) continue;

        try {
          progressText.textContent = getDownloadProgressText(lang, docCount + (archiveIndex - 1) * 500, totalDocs);

          abortController = new AbortController();

          const blob = await fetchPhotoBlob(url, abortController.signal);
          const mimeType = blob.type;
          const extension = getExtensionFromMimeType(mimeType, mimeTypes);
          const filename = extension ? `doc${doc.owner_id}_${doc.id}.${extension}` : `doc${doc.owner_id}_${doc.id}`;
          zip.file(filename, blob);
          docCount++;

          progressText.textContent = getDownloadProgressText(lang, docCount + (archiveIndex - 1) * 500, totalDocs);

          if (totalDocs > 0) {
            const progressPercent = Math.min(100, ((docCount + (archiveIndex - 1) * 500) / totalDocs) * 100);
            progressBar.style.width = `${progressPercent}%`;
          } else {
            progressBar.style.width = "0%";
          }

          if (docCount >= 500) {
            const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
            const zipFilename = `vk_docs_${peer_id}_part${archiveIndex}.zip`;
            triggerDownload(zipBlob, zipFilename);
            console.log(`[VK Tools] Архив готов: ${zipFilename}`);

            archiveIndex++;
            docCount = 0;
            zip = new JSZip();

            progressText.textContent = getPreparingText(lang);
            progressBar.style.width = "0%";
          }
        } catch (e) {
          if (isCancelled) throw e;
          console.warn(`[VK Tools] Не удалось скачать документ по URL: ${url}`, e);
        }
      }

      if (!response.next_from) break;
      startFrom = response.next_from;
    } while (!isCancelled);

    if (docCount > 0 && !isCancelled) {
      progressText.textContent = getGeneratingArchiveText(lang);
      progressBar.style.width = "100%";

      const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const zipFilename = `vk_docs_${peer_id}_part${archiveIndex}.zip`;
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
