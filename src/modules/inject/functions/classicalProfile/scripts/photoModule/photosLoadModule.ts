import dropToUploadLang from "../dropToUploadLang";
import { allowedTypes } from "./allowedTypes";
import isDragAndDropAvailable from "./isDragAndDropAvailable";
import photoUploadError from "./photoUploadError";
import photoUploadSuccess from "./photoUploadSuccess";
import replaceTabsWithPhotosModule from "./replaceTabsWithPhotosModule";

const photosLoadModule = () => {
  const section = document.createElement("section");
  section.classList.add("vkEnhancerLoadPhotoModule");

  const a = document.createElement("a");
  a.id = "photos_choose_upload_area_vkEnhancer";
  a.className = "photos_choose_upload_area";
  a.title = dropToUploadLang(vk.lang);
  a.style.display = "block";
  a.addEventListener("click", () => {
    if (cur.meUploadPhoto) {
      cur.meUploadPhoto();
    } else {
      let profileUploadClick = document.querySelector(".ProfileTabsPhotoUploadInput") as HTMLElement;
      if (!profileUploadClick) return;
      profileUploadClick?.click();
    }
  });
  section.appendChild(a);

  const divUpload = document.createElement("div");
  divUpload.className = "photos_choose_upload_area_uploadvkEnhancer";
  a.appendChild(divUpload);

  const svgUpload = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgUpload.setAttribute("fill", "none");
  svgUpload.setAttribute("height", "32");
  svgUpload.setAttribute("viewBox", "0 0 56 56");
  svgUpload.setAttribute("width", "32");
  svgUpload.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  divUpload.appendChild(svgUpload);

  const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  clipPath.setAttribute("id", "camera_outline_56__a");
  svgUpload.appendChild(clipPath);

  const clipPathPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  clipPathPath.setAttribute("d", "M0 0h56v56H0z");
  clipPath.appendChild(clipPathPath);

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("clip-path", "url(#camera_outline_56__a)");
  g.setAttribute("clip-rule", "evenodd");
  g.setAttribute("fill", "currentColor");
  g.setAttribute("fill-rule", "evenodd");
  svgUpload.appendChild(g);

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M19.08 6.66A4.74 4.74 0 0 1 22 5.5h12c1.21 0 2.21.6 2.92 1.16a12.69 12.69 0 0 1 2.27 2.44l.98 1.23c.13.16.48.42 1.09.63.57.21 1.22.32 1.74.32h1c2.45 0 4.5 1.27 5.87 3.14A11.86 11.86 0 0 1 52 21.44h-3c0-2.12-.6-3.97-1.54-5.24A4.27 4.27 0 0 0 44 14.28h-1c-.89 0-1.87-.18-2.75-.49-.85-.3-1.8-.8-2.42-1.59l-1.02-1.27-.33-.42a50.36 50.36 0 0 0-.12-.15c-.4-.49-.84-.98-1.31-1.36-.49-.38-.83-.5-1.05-.5H22c-.22 0-.56.12-1.05.5a9.84 9.84 0 0 0-1.33 1.39l-.1.12-.33.42-1.02 1.27a5.42 5.42 0 0 1-2.42 1.6c-.88.3-1.86.48-2.75.48h-1c-1.32 0-2.53.67-3.46 1.92A8.88 8.88 0 0 0 7 21.44H4c0-2.67.76-5.16 2.13-7.02A7.26 7.26 0 0 1 12 11.28h1c.52 0 1.17-.11 1.74-.32.61-.21.96-.47 1.09-.63l.98-1.23.53-.67c.41-.49 1.02-1.2 1.74-1.77zM17 46.5V45h21c4.72 0 6.88-1.09 8.5-2.82.66-.7 1.24-1.7 1.73-2.8.35-.78.56-1.84.66-2.9.1-1.05.11-1.99.11-2.48V21.44h3V34c0 .5 0 1.56-.12 2.76a12.73 12.73 0 0 1-3.18 7.45C46.34 46.74 43.28 48 38 48H17zm-9.72-2.3a11.69 11.69 0 0 1-2.3-3.63c-.38-.9-.6-2.35-.75-3.53A30.5 30.5 0 0 1 4 34V21.44h3V34c0 .42.07 1.5.2 2.68.15 1.22.35 2.28.55 2.75.43 1.04 1.02 2 1.72 2.72l.05.05.04.05a7.25 7.25 0 0 0 3.2 2.01c1.38.5 2.9.74 4.24.74v3c-1.67 0-3.54-.3-5.25-.91a10.25 10.25 0 0 1-4.47-2.89z"
  );
  g.appendChild(path1);

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z");
  g.appendChild(path2);

  const spanLabel = document.createElement("span");
  spanLabel.id = "photos_choose_upload_area_labelvkEnhancer";
  spanLabel.className = "photos_choose_upload_area_label";
  spanLabel.textContent = getLang?.("stories_create_add_photo").toString() || "";
  divUpload.appendChild(spanLabel);

  const divDrop = document.createElement("div");
  divDrop.className = "photos_choose_upload_area_dropvkEnhancer";
  divDrop.style.display = "none";
  a.appendChild(divDrop);

  const divDropLabel = document.createElement("div");
  divDropLabel.className = "photos_choose_upload_area_drop_label";
  divDrop.appendChild(divDropLabel);

  const svgDrop = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgDrop.setAttribute("fill", "none");
  svgDrop.setAttribute("height", "56");
  svgDrop.setAttribute("viewBox", "0 0 56 56");
  svgDrop.setAttribute("width", "56");
  svgDrop.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  divDropLabel.appendChild(svgDrop);

  const clipPathDrop = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
  clipPathDrop.setAttribute("id", "camera_outline_56__a");
  svgDrop.appendChild(clipPathDrop);

  const clipPathDropPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  clipPathDropPath.setAttribute("d", "M0 0h56v56H0z");
  clipPathDrop.appendChild(clipPathDropPath);

  const gDrop = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gDrop.setAttribute("clip-path", "url(#camera_outline_56__a)");
  gDrop.setAttribute("clip-rule", "evenodd");
  gDrop.setAttribute("fill", "currentColor");
  gDrop.setAttribute("fill-rule", "evenodd");
  svgDrop.appendChild(gDrop);

  const pathDrop1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathDrop1.setAttribute(
    "d",
    "M19.08 6.66A4.74 4.74 0 0 1 22 5.5h12c1.21 0 2.21.6 2.92 1.16a12.69 12.69 0 0 1 2.27 2.44l.98 1.23c.13.16.48.42 1.09.63.57.21 1.22.32 1.74.32h1c2.45 0 4.5 1.27 5.87 3.14A11.86 11.86 0 0 1 52 21.44h-3c0-2.12-.6-3.97-1.54-5.24A4.27 4.27 0 0 0 44 14.28h-1c-.89 0-1.87-.18-2.75-.49-.85-.3-1.8-.8-2.42-1.59l-1.02-1.27-.33-.42a50.36 50.36 0 0 0-.12-.15c-.4-.49-.84-.98-1.31-1.36-.49-.38-.83-.5-1.05-.5H22c-.22 0-.56.12-1.05.5a9.84 9.84 0 0 0-1.33 1.39l-.1.12-.33.42-1.02 1.27a5.42 5.42 0 0 1-2.42 1.6c-.88.3-1.86.48-2.75.48h-1c-1.32 0-2.53.67-3.46 1.92A8.88 8.88 0 0 0 7 21.44H4c0-2.67.76-5.16 2.13-7.02A7.26 7.26 0 0 1 12 11.28h1c.52 0 1.17-.11 1.74-.32.61-.21.96-.47 1.09-.63l.98-1.23.53-.67c.41-.49 1.02-1.2 1.74-1.77zM17 46.5V45h21c4.72 0 6.88-1.09 8.5-2.82.66-.7 1.24-1.7 1.73-2.8.35-.78.56-1.84.66-2.9.1-1.05.11-1.99.11-2.48V21.44h3V34c0 .5 0 1.56-.12 2.76a12.73 12.73 0 0 1-3.18 7.45C46.34 46.74 43.28 48 38 48H17zm-9.72-2.3a11.69 11.69 0 0 1-2.3-3.63c-.38-.9-.6-2.35-.75-3.53A30.5 30.5 0 0 1 4 34V21.44h3V34c0 .42.07 1.5.2 2.68.15 1.22.35 2.28.55 2.75.43 1.04 1.02 2 1.72 2.72l.05.05.04.05a7.25 7.25 0 0 0 3.2 2.01c1.38.5 2.9.74 4.24.74v3c-1.67 0-3.54-.3-5.25-.91a10.25 10.25 0 0 1-4.47-2.89z"
  );
  gDrop.appendChild(pathDrop1);

  const pathDrop2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathDrop2.setAttribute("d", "M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z");
  gDrop.appendChild(pathDrop2);

  const divDropText = document.createElement("div");
  divDropText.className = "photos_choose_upload_area_drop_label_tex";
  divDropText.textContent = dropToUploadLang(vk.lang);
  divDropLabel.appendChild(divDropText);

  let dragAndDropMode = false;

  const enableDragAndDrop = () => {
    if (!isDragAndDropAvailable()) return;
    if (!divDrop || !divUpload) return;
    dragAndDropMode = true;
    divDrop.style.display = "block";
    divUpload.style.display = "none";
  };

  document.addEventListener("dragenter", (e) => {
    if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
      enableDragAndDrop();
    }
  });

  divDrop.addEventListener("dragenter", (e) => {
    e.preventDefault();
    if (!dragAndDropMode) return;
    divDrop.classList.add("drag-over");
  });

  divDrop.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!dragAndDropMode) return;
    e.dataTransfer!.dropEffect = "copy";
  });

  divDrop.addEventListener("dragleave", (event) => {
    const toElement = event.relatedTarget as HTMLElement;
    if (toElement && divDrop.contains(toElement)) {
      return;
    }
    divDrop.classList.remove("drag-over");
  });

  divDrop.addEventListener(
    "drop",
    async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const target = e.target as HTMLElement;
      if (!target) return;
      if (!divDrop.contains(target)) {
        dragAndDropMode = false;
        divDrop.style.display = "none";
        divUpload.style.display = "flex";
        divDrop.classList.remove("drag-over");
      } else {
        e.preventDefault();
        if (!dragAndDropMode) return;
        divDrop.classList.remove("drag-over");
        dragAndDropMode = false;
        divDrop.style.display = "none";
        divUpload.style.display = "flex";
        divDrop.classList.remove("drag-over");

        const files = e.dataTransfer?.files;
        if (!files || files.length === 0) {
          return;
        }
        const file = files[0];
        if (!allowedTypes.includes(file.type)) {
          return;
        }
        try {
          let uploadPhotoRes = await vkApi.api("photos.getWallUploadServer", {
            album_id: -14,
            upload_v2: 1,
          });
          let uploadServer = uploadPhotoRes.upload_url;

          const formData = new FormData();
          formData.append("file1", file);

          const uploadResponseRaw = await fetch(uploadServer, {
            method: "POST",
            body: formData,
          });
          const uploadResponse = await uploadResponseRaw.json();

          const photoParam = JSON.stringify(uploadResponse);

          let uploadResult = await vkApi.api("photos.saveWallPhoto", {
            photo: photoParam,
            upload_v2: 1,
          });

          if (uploadResult && uploadResult[0] && uploadResult[0].album_id && uploadResult[0].id && uploadResult[0].owner_id) {
            vkApi.api("photos.move", { photo_ids: uploadResult[0].id, target_album_id: -183, copy_and_delete: 1 });
            showFastBox(getLang?.("photos_done"), photoUploadSuccess(vk.lang));
            let pModule = document.querySelector(".vkToolsPhotoModule");
            if (pModule) pModule.remove();
            replaceTabsWithPhotosModule();
          } else {
            showFastBox(getLang?.("global_error"), photoUploadError(vk.lang));
          }
        } catch (error) {
          showFastBox(getLang?.("global_error"), photoUploadError(vk.lang));
          console.error("[VK Tools Error] DnD Upload Error", error);
        }
      }
    },
    { capture: true }
  );

  document.addEventListener("dragleave", (e) => {
    if (e.relatedTarget === null) {
      dragAndDropMode = false;
      if (!divDrop || !divUpload) return;
      divDrop.style.display = "none";
      divUpload.style.display = "flex";
      divDrop.classList.remove("drag-over");
    }
  });
  return section;
};

export default photosLoadModule;
