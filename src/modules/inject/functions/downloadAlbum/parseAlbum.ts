/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-loop-func */
import progressSnack from "../../components/progressSnack/progressSnack";
import showSnackbar from "../../components/snackbar/snackbar";
import JSZip from "jszip";
import isNotAlbumLang from "./isNotAlbumLang";
import { escapeHtmlDownloadTrack } from "../../escapeHtml";
import emptyAlbumLang from "./emptyAlbumLang";
import albumDownloadSuccessLang from "./albumDownloadSuccessLang";
import albumDownloadFailLang from "./albumDownloadFailLang";
import attemptGetPhotoOnce from "./attemptGetPhotoOnce";
import albumArchiveErrorLang from "./albumArchiveErrorLang";
import albumRetryDownloadLang from "./albumRetryDownloadLang";

const DEFAULT_GETPHOTO_TIMEOUT = 15000;
const DEFAULT_MAX_RETRIES = 3;

const parseAlbum = async () => {
  const url = window.location.href;
  const match = url.match(/album-?(\d+_?\d*)/);
  let albumString = "";
  if (match) {
    albumString = match[0].replace("album", "");
  } else {
    showSnackbar({
      text: isNotAlbumLang(vk.lang),
      timeout: 4000,
      icon: "error",
    });
    return;
  }

  if (!albumString) return;

  let oidA = albumString.split("_")[0];
  let idA = albumString.split("_")[1];
  const replaceIt: { [key: string]: number } = {
    "0": -6,
    "00": -7,
    "000": -15,
    "0000": -23,
    "00000": -62,
    "000000": -10,
    "0000000": -7000,
    "00000000": -165,
    "000000000": -183,
    "0000000000": -185,
  };
  if (replaceIt[idA] !== undefined) idA = replaceIt[idA].toString();

  const albumsRes = await vkApi.api("photos.getAlbums", {
    owner_id: oidA,
    album_ids: idA,
  });

  if (!albumsRes?.items?.[0] || albumsRes.items[0].size <= 0) {
    showSnackbar({
      text: emptyAlbumLang(vk.lang),
      timeout: 4000,
      icon: "warning",
    });
    return;
  }

  let albumCount = albumsRes.items[0].size;
  let offset = 0;

  let snackBarStack = document.querySelector(".snackBarStack");
  if (!snackBarStack) {
    snackBarStack = document.createElement("div");
    snackBarStack.classList.add("snackBarStack");
    document.body.appendChild(snackBarStack);
  }

  const snacky = progressSnack(getLang?.("me_download_waiting") + "...", "album", "", true);
  snackBarStack?.append(snacky);

  const cancelButton = snacky?.querySelector(".vkToolsSnackbar__calcel-button") as HTMLButtonElement;
  cancelButton.style.display = "none";

  let counterProgress = 0;
  const failedPhotosGlobal: any[] = [];

  while (albumCount > 0) {
    const count = Math.min(1000, albumCount);
    const allPhotos = await vkApi.api("photos.get", {
      owner_id: oidA,
      album_id: idA,
      count,
      offset,
      rev: true,
    });

    const zip = new JSZip();
    let currentZipIndex = "_" + Math.ceil((offset + 1) / 1000);
    if (albumsRes.items[0].size < 1000) currentZipIndex = "";

    const maxRetries = DEFAULT_MAX_RETRIES;
    const failedPhotos: any[] = [];

    const promises = allPhotos.items.map(async (photoItem: { sizes: any }) => {
      const sizes = photoItem.sizes || [];
      const availableSizes = ["a", "b", "i", "p", "q", "s", "w", "z", "y", "x", "r", "o", "m", "g", "max", "l", "f", "k", "c", "e", "d", "j", "temp", "h", "n", "base"];
      let best: any = null;
      let bestArea = 0;
      for (const curSize of sizes) {
        if (!curSize) continue;
        const area = (curSize.width || 0) * (curSize.height || 0);
        if (availableSizes.includes(curSize.type) && area >= bestArea) {
          bestArea = area;
          best = curSize;
        }
      }
      const maxSizeUrl = best?.url;

      let success = false;

      for (let attempt = 1; attempt <= maxRetries && !success; attempt++) {
        try {
          if (attempt > 1) {
            const pBar = snacky.querySelector(".vkToolsSnackbar__content-text");
            if (pBar) {
              pBar.innerHTML = albumRetryDownloadLang(vk.lang, counterProgress + 1, albumsRes.items[0].size);
            }
          }

          const res = await attemptGetPhotoOnce(maxSizeUrl, photoItem, snacky, DEFAULT_GETPHOTO_TIMEOUT);
          if (!res || !Array.isArray(res) || res.length < 2) throw new Error("invalid-res");

          const [filename, blob] = res as [string, Blob];
          if (!blob || !(blob instanceof Blob) || (blob.size ?? 0) === 0) throw new Error("empty-blob");

          zip.file(filename.toString(), blob);
          success = true;
        } catch (err) {
          console.warn(`[VK Tools] Ошибка загрузки фото (попытка ${attempt}/${maxRetries}):`, err);
          if (attempt === maxRetries) failedPhotos.push(photoItem);
          else await new Promise((r) => setTimeout(r, 300));
        }
      }

      counterProgress++;
      const pBar = snacky.querySelector(".vkToolsSnackbar__content-text");
      if (pBar) {
        pBar.innerHTML = getLang?.("box_loading") + `<br><br>${escapeHtmlDownloadTrack(albumsRes.items[0].title)}${currentZipIndex}.zip ` + counterProgress + "/" + albumsRes.items[0].size;
      }

      cancelButton.style.display = "flex";
      if (localStorage.getItem("abortTask") === "true") {
        localStorage.setItem("abortTask", "false");
        snacky.querySelector(".vkToolsSnackbar__in")?.classList.add("vkToolsRemovebar");
        snacky.querySelector(".vkToolsSnackbar__in")?.addEventListener("animationend", () => {
          snacky.remove();
        });
        throw new Error("[VK Tools] Скачивание отменено");
      }
    });

    const settled = await Promise.allSettled(promises);
    const rejectedCount = settled.filter((s: any) => s.status === "rejected").length;
    if (rejectedCount > 0) {
      console.warn(`[VK Tools] ${rejectedCount} промисов завершились с ошибкой (возможно отмена).`);
    }

    failedPhotosGlobal.push(...failedPhotos);

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = zipUrl;
      a.download = `${albumsRes.items[0].title}${currentZipIndex}.zip`;
      a.click();
    } catch (err) {
      console.error("[VK Tools] Ошибка при генерации zip:", err);
      showSnackbar({
        text: albumArchiveErrorLang(vk.lang, (err as Error).message || String(err)),
        timeout: 6000,
        icon: "error",
      });
      break;
    }

    albumCount -= count;
    offset += count;
  }

  snacky.querySelector(".vkToolsSnackbar__in")?.classList.add("vkToolsRemovebar");
  snacky.querySelector(".vkToolsSnackbar__in")?.addEventListener("animationend", () => {
    snacky.remove();
  });

  counterProgress = 0;

  if (failedPhotosGlobal.length > 0) {
    showSnackbar({
      text: albumDownloadFailLang(vk.lang, failedPhotosGlobal.length, escapeHtmlDownloadTrack(albumsRes.items[0].title)),
      timeout: 6000,
      icon: "warning",
    });
  } else {
    showSnackbar({
      text: albumDownloadSuccessLang(vk.lang, escapeHtmlDownloadTrack(albumsRes.items[0].title)),
      timeout: 4000,
      icon: "ok",
    });
  }
};

export default parseAlbum;
