/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-loop-func */
import progressSnack from "../../components/progressSnack/progressSnack";
import showSnackbar from "../../components/snackbar/snackbar";
import getPhoto from "./getPhoto";
import JSZip from 'jszip';
import isNotAlbumLang from "./isNotAlbumLang";
import { escapeHtmlDownloadTrack } from "../../escapeHtml";
import emptyAlbumLang from "./emptyAlbumLang";

const parseAlbum = async() => {
  const url = window.location.href;
  const match = url.match(/album-?(\d+_?\d*)/);
  let albumString = "";
  if (match) {
    albumString = match[0];
    albumString = albumString.replace("album", "");
  } else {
    showSnackbar({
        text: isNotAlbumLang(vk.lang),
        timeout: 4000,
        icon: 'error'
    });
  }
  if (albumString !== "") {
    let oidA = albumString.split("_")[0];
    let idA = albumString.split("_")[1];
    const replaceIt:{ [key: string]: number } = {
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
    if (replaceIt[idA] !== undefined) {
      idA = replaceIt[idA].toString();
    }
    let albumsRes = await vkApi.api("photos.getAlbums", {
      owner_id: oidA,
      album_ids: idA,
    });
    if (albumsRes.items[0].size > 0) {
      let albumCount = albumsRes.items[0].size;
      let offset = 0;
      let progressBar = document.createElement("div");
      progressBar.append(progressSnack(getLang?.("me_download_waiting") + "...", "album", '', true));
      let cancelButton = progressBar.querySelector('.vkToolsSnackbar__calcel-button') as HTMLButtonElement;
      cancelButton.style.display = "none";
      document.body.appendChild(progressBar);
      let counterProgress = 0;
      while (albumCount > 0) {
        let count = Math.min(1000, albumCount);
        let allPhotos = await vkApi.api("photos.get", {
          owner_id: oidA,
          album_id: idA,
          count: count,
          offset: offset,
          rev: true,
        });
        const zip = new JSZip();
        let currentZipIndex = "_" + Math.ceil((offset + 1) / 1000);
        if (albumsRes.items[0].size < 1000) {
          currentZipIndex = "";
        }
        let bolshe_kosara = 0;
        const promises = allPhotos.items.map(async (photoItem: { sizes: any; }) => {
          let sizes = photoItem.sizes;
          const availableSizes = [
            "a",
            "b",
            "i",
            "p",
            "q",
            "s",
            "w",
            "z",
            "y",
            "x",
            "r",
            "o",
            "m",
            "g",
            "max",
            "l",
            "f",
            "k",
            "c",
            "e",
            "d",
            "j",
            "temp",
            "h",
            "n",
          ];
          let n = null,
            e = 0;
          let t;
          for (const curSize of sizes) {
            t = curSize.type;
            if (availableSizes.includes(t)) {
              t = (curSize.width || 0) * (curSize.height || 0);
              if (t > e || t === 0) {
                e = t;
                n = curSize;
              }
            }
          }
          let maxSizer = t[0] || n;
          let maxSizeUrl;
          try {
            maxSizeUrl = maxSizer.url;
          } catch (error) {
            console.log(maxSizer);
          }
          try {
            let [filename, blob] = await getPhoto(
              maxSizeUrl,
              photoItem,
              progressBar
            );
            zip.file(filename.toString(), blob);
            counterProgress++;
            let pBar = progressBar.querySelector(
              ".vkToolsSnackbar__content-text"
            );
            if (pBar) pBar.innerHTML =
              getLang?.("box_loading") +
              "<br><br>" +
              `${escapeHtmlDownloadTrack(albumsRes.items[0].title)}${currentZipIndex}.zip ` +
              counterProgress +
              "/" +
              albumsRes.items[0].size;
            cancelButton.style.display = "flex";
            if (localStorage.getItem('abortTask') === 'true') {
              localStorage.setItem('abortTask', 'false');
              progressBar.querySelector(".vkToolsSnackbar__in")?.classList.add("vkToolsRemovebar");
              progressBar.querySelector(".vkToolsSnackbar__in")?.addEventListener("animationend", () => {
                progressBar.remove();
              });
              return Promise.reject('[VK Tools] Скачивание отменено');
            }
          } catch (error) {
            console.log("Failed ", maxSizeUrl);
          }
        });
        await Promise.all(promises);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = zipUrl;
        a.download = `${albumsRes.items[0].title}${currentZipIndex}.zip`;
        a.click();
        bolshe_kosara += 1000;
        albumCount -= count;
        offset += count;
      }
      progressBar.querySelector(".vkToolsSnackbar__in")?.classList.add("vkToolsRemovebar");
      progressBar.querySelector(".vkToolsSnackbar__in")?.addEventListener("animationend", () => {
        progressBar.remove();
      });
      counterProgress = 0;
    } else {
      showSnackbar({
        text: emptyAlbumLang(vk.lang),
        timeout: 4000,
        icon: 'warning'
      });
    }
  }
}

export default parseAlbum;