import JSZip from "jszip";
import { getGeneratingArchiveText, getDownloadProgressText, getPreparingText } from "./localizationVideos";
import triggerDownload from "./triggerDownload";
import { downloadVideoBlob } from "./downloadVideoBlob";

export async function downloadAllVideosArchive(peer_id: number) {
  const lang = vk.lang ?? 3;

  let startFrom: string | undefined = undefined;
  let videoCount = 0;
  let totalVideos = 0;
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
        media_type: "video",
        count: 200,
      };
      if (startFrom) params.start_from = startFrom;

      const response = await vkApi.api("messages.getHistoryAttachments", params);
      const items = response.items || [];
      if (items.length === 0) break;

      totalVideos += items.length;

      for (const item of items) {
        if (isCancelled) throw new Error("Отменено пользователем");

        const video = item.attachment?.video;
        if (!video) continue;

        let maxQualityUrl: string | undefined;
        if (video.files) {
          const mp4Qualities = Object.keys(video.files)
            .filter((key) => key.startsWith("mp4_"))
            .map((key) => parseInt(key.substring(4), 10))
            .sort((a, b) => b - a);

          if (mp4Qualities.length > 0) {
            maxQualityUrl = video.files[`mp4_${mp4Qualities[0]}`];
          }
        }

        if (!maxQualityUrl) continue;

        try {
          progressText.textContent = getDownloadProgressText(lang, videoCount + (archiveIndex - 1) * 100, totalVideos);

          abortController = new AbortController();

          const blob = await downloadVideoBlob(maxQualityUrl, abortController.signal);
          const filename = `video${video.owner_id}_${video.id}.mp4`;
          zip.file(filename, blob);
          videoCount++;

          progressText.textContent = getDownloadProgressText(lang, videoCount + (archiveIndex - 1) * 100, totalVideos);

          if (totalVideos > 0) {
            const progressPercent = Math.min(100, ((videoCount + (archiveIndex - 1) * 100) / totalVideos) * 100);
            progressBar.style.width = `${progressPercent}%`;
          } else {
            progressBar.style.width = "0%";
          }

          if (videoCount >= 100) {
            const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
            const zipFilename = `vk_videos_${peer_id}_part${archiveIndex}.zip`;
            triggerDownload(zipBlob, zipFilename);
            console.log(`[VK Tools] Архив готов: ${zipFilename}`);

            archiveIndex++;
            videoCount = 0;
            zip = new JSZip();

            progressText.textContent = getPreparingText(lang);
            progressBar.style.width = "0%";
          }
        } catch (e) {
          if (isCancelled) throw e;
          console.warn(`[VK Tools] Не удалось скачать видео по URL: ${maxQualityUrl}`, e);
        }
      }

      if (!response.next_from) break;
      startFrom = response.next_from;
    } while (!isCancelled);

    if (videoCount > 0 && !isCancelled) {
      progressText.textContent = getGeneratingArchiveText(lang);
      progressBar.style.width = "100%";

      const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const zipFilename = `vk_videos_${peer_id}_part${archiveIndex}.zip`;
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
