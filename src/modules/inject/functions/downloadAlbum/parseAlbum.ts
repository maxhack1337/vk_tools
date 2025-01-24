/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-loop-func */
import fromId from "../../../content/fromId";
import getPhoto from "./getPhoto";
import JSZip from 'jszip';

const parseAlbum = async() => {
  let styleElement = fromId("vkEnDownloadPopup");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vkEnDownloadPopup";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `
  .vkEnhSnackbar__before {
	color:var(--vkui--color_icon_accent);
	padding-right:12px;
  }
  .vkEnhSnackbar{
	margin:12px;
	user-select:none;
	z-index:var(--vkui--z_index_popout);
	position:fixed;
	inset-block-end:0;
	inset-inline-start:auto;
	inline-size:100%;
	padding-inline:var(--vkui_internal--safe_area_inset_left) var(--vkui_internal--safe_area_inset_right);
	padding-block-end:var(--vkui_internal--safe_area_inset_bottom)
}
.vkEnhSnackbar__in,.vkEnhSnackbar__snackbar{
	transition:transform 320ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar__body {
	display:flex;
	align-items:center;
}
.vkEnhSnackbar__in{
	border-radius:8px;
	background-color:var(--vkui--color_background_modal);
	box-shadow:var(--vkui--elevation3)
	padding:16px;
	animation:vkenh-snackbar-intro-vertical 340ms var(--vkui--animation_easing_platform);
}
.vkEnhRemovebar {
	animation:vkenh-snackbar-intro-vertical-remove 340ms var(--vkui--animation_easing_platform)!important;
}
.vkEnhSnackbar--ios .vkEnhSnackbar__in,.vkEnhSnackbar--ios .vkEnhSnackbar__snackbar{
	transition:transform 400ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar--desktop{
	max-inline-size:351px;
	inset-inline-start:0;
	inset-block-end:0
}
.vkEnhSnackbar--desktop .vkEnhSnackbar__in{
	padding:16px;
	animation-name:vkenh-snackbar-intro-horizontal
}
.vkEnhSnackbar--desktop.vkuiSnackbar--closing--wCurt .vkEnhSnackbar__in{
	transform:translate3d(-140%, 0, 0)
}
.vkuiSnackbar--touched--a8Qa6 .vkEnhSnackbar__snackbar{
	transition:none
}
@keyframes vkenh-snackbar-intro-vertical{
	from{
		transform:translate3d(0, 140%, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
@keyframes vkenh-snackbar-intro-vertical-remove {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-140%, 0, 0); /* Сдвигаем блок влево на 100% от его ширины */
        opacity: 0!important; /* Добавляем анимацию исчезновения */
    }
}
@keyframes vkenh-snackbar-intro-horizontal{
	from{
		transform:translate3d(-140%, 0, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
`;
  const url = window.location.href;
  const match = url.match(/album-?(\d+_?\d*)/);
  let albumString = "";
  if (match) {
    albumString = match[0];
    albumString = albumString.replace("album", "");
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
      progressBar.innerHTML = `<div class="vkEnhSnackbar vkEnhSnackbar--ios vkEnhSnackbar--desktop vkui--vkIOS--light">
  <div class="vkEnhSnackbar__in">
    <div class="vkEnhSnackbar__body vkEnhSnackbar--layout-vertical vkEnhSnackbar__snackbar">
      <div class="vkEnhSnackbar__before"><svg fill="currentColor" height="28" viewBox="0 0 20 20" width="28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M6.84 16.44c.76.06 1.74.06 3.16.06 1.42 0 2.4 0 3.16-.06a3.75 3.75 0 0 0 1.43-.32 3.5 3.5 0 0 0 1.53-1.53c.15-.29.26-.69.32-1.43l.03-.63-1.3-1.3c-.3-.3-.5-.5-.67-.64a.86.86 0 0 0-.27-.18.75.75 0 0 0-.46 0 .86.86 0 0 0-.27.18c-.16.13-.36.33-.67.64l-2.3 2.3a.75.75 0 0 1-1.06 0l-.3-.3c-.3-.3-.5-.5-.67-.64a.86.86 0 0 0-.27-.18.75.75 0 0 0-.46 0 .86.86 0 0 0-.27.18c-.16.13-.36.33-.67.64L4.56 15.5c.25.24.53.45.85.6.29.16.69.27 1.43.33zm9.39-6.27.27.27V10c0-1.42 0-2.4-.06-3.16a3.75 3.75 0 0 0-.32-1.43 3.5 3.5 0 0 0-1.53-1.53 3.75 3.75 0 0 0-1.43-.32A43.2 43.2 0 0 0 10 3.5c-1.42 0-2.4 0-3.16.06-.74.06-1.14.17-1.43.32a3.5 3.5 0 0 0-1.53 1.53c-.15.29-.26.69-.32 1.43A43.2 43.2 0 0 0 3.5 10c0 1.42 0 2.4.06 3.16.04.47.1.8.17 1.05l2.04-2.04.02-.02c.28-.28.52-.52.74-.7.23-.2.47-.37.77-.47.46-.15.94-.15 1.4 0 .3.1.54.27.77.46.16.14.34.3.53.5l1.77-1.77.02-.02c.28-.28.52-.52.74-.7.23-.2.47-.37.77-.47.46-.15.94-.15 1.4 0 .3.1.54.27.77.46.22.19.46.43.74.7zM2.54 4.73C2 5.8 2 7.2 2 10c0 2.8 0 4.2.54 5.27a5 5 0 0 0 2.19 2.19C5.8 18 7.2 18 10 18c2.8 0 4.2 0 5.27-.54a5 5 0 0 0 2.19-2.19C18 14.2 18 12.8 18 10c0-2.8 0-4.2-.55-5.27a5 5 0 0 0-2.18-2.19C14.2 2 12.8 2 10 2c-2.8 0-4.2 0-5.27.54a5 5 0 0 0-2.19 2.19zM7.25 6a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
      <div class="vkEnhSnackbar__content"><span class="vkEnhTypography vkEnhSnackbar__content-text vkEnhParagraph">${getLang?.(
        "me_download_waiting"
      ) + "..."}</span></div>
    </div>
  </div>
</div>`;
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
                  ".vkEnhSnackbar__content-text"
                );
              if(pBar) pBar.innerHTML =
              getLang?.("box_loading") +
              "<br><br>" +
              `${albumsRes.items[0].title}${currentZipIndex}.zip ` +
              counterProgress +
              "/" +
              albumsRes.items[0].size;
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
      progressBar.querySelector(".vkEnhSnackbar__in")?.classList.add("vkEnhRemovebar");
      progressBar.querySelector(".vkEnhSnackbar__in")?.addEventListener("animationend", () => {
          progressBar.remove();
        });
      counterProgress = 0;
    }
  }
}

export default parseAlbum;