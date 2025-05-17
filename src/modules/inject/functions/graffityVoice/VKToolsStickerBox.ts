import getAddStickerText from "./getAddStickerText";
import getImSendHash from "./getImSendHash";
import runStickerAdder from "./runStickerAdder";
import splitString from "./splitString";

async function VKToolsStickerBox() {
  const boxG = document.createElement("div");
  boxG.classList.add("vkEnhancerGraffityMainBox");
  boxG.style.top = "0px";
  boxG.style.zIndex = "999999";
  boxG.style.backgroundColor = "#000000B3";

  const modalWrap = document.createElement("div");
  modalWrap.classList.add("vkEnhancerModalPage__in-wrap");
  modalWrap.style.opacity = "1";

  const modalIn = document.createElement("div");
  modalIn.classList.add("vkEnhancerModalPage__in");

  const header = document.createElement("div");
  header.classList.add("vkEnhancerModalPage__header");

  const headerDesktop = document.createElement("div");
  headerDesktop.classList.add("vkEnhancerModalPageHeader", "vkEnhancerModalPageHeader--withGaps", "vkEnhancerModalPageHeader--desktop");

  const panelHeader = document.createElement("div");
  panelHeader.classList.add("vkEnhancerPanelHeader");

  const panelHeaderIn = document.createElement("div");
  panelHeaderIn.classList.add("vkEnhancerPanelHeader__in");
  panelHeaderIn.setAttribute("data-onboarding-tooltip-container", "fixed");

  const panelHeaderContent = document.createElement("div");
  panelHeaderContent.classList.add("vkEnhancerPanelHeader__content");

  const h2 = document.createElement("h2");
  h2.classList.add("vkEnhancerPanelHeader__content-in");
  h2.id = ":r1:-label";
  h2.textContent = getLang?.("mail_added_sticker").toString() || "Стикер";

  panelHeaderContent.appendChild(h2);
  panelHeaderIn.appendChild(panelHeaderContent);
  panelHeader.appendChild(panelHeaderIn);
  headerDesktop.appendChild(panelHeader);

  const separator = document.createElement("div");
  separator.classList.add("vkEnhancerSeparator");
  const hr = document.createElement("hr");
  hr.classList.add("vkEnhancerSeparator__in");
  separator.appendChild(hr);

  headerDesktop.appendChild(separator);
  header.appendChild(headerDesktop);

  const contentWrap = document.createElement("div");
  contentWrap.classList.add("vkEnhancerModalPage__content-wrap");

  const content = document.createElement("div");
  content.classList.add("vkEnhancerModalPage__content");

  const contentIn = document.createElement("div");
  contentIn.classList.add("vkEnhancerModalPage__content-in");

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("vkEnhancerDiv");

  const stickerGroup = document.createElement("div");
  stickerGroup.classList.add("vkEnGroupInput");
  stickerGroup.style.position = "relative";
  stickerGroup.style.display = "flex";
  stickerGroup.style.alignItems = "center";

  const stickerLabel = document.createElement("div");
  stickerLabel.classList.add("vkEnText");
  stickerLabel.textContent = getLang?.("mail_added_sticker").toString() || "Стикер";
  stickerLabel.style.minWidth = "100px";

  const stickerInput = document.createElement("input");
  stickerInput.type = "text";
  stickerInput.id = "stickerInput";
  stickerInput.setAttribute("inputmode", "numeric");
  stickerInput.placeholder = getAddStickerText(vk.lang)[0];
  stickerInput.style.flex = "1";

  const previewContainer = document.createElement("div");
  previewContainer.classList.add("vkToolsPreviewContainer");

  const stickerPreview = document.createElement("img");
  stickerPreview.style.maxWidth = "100px";
  stickerPreview.style.maxHeight = "64px";
  stickerPreview.style.display = "none";
  stickerPreview.alt = "Preview";

  const errorText = document.createElement("div");
  errorText.style.color = "red";
  errorText.style.fontSize = "12px";
  errorText.style.textAlign = "center";
  errorText.style.display = "none";

  previewContainer.appendChild(stickerPreview);
  previewContainer.appendChild(errorText);

  stickerGroup.appendChild(stickerLabel);
  stickerGroup.appendChild(stickerInput);
  stickerGroup.appendChild(previewContainer);

  const attachGroup = document.createElement("div");
  attachGroup.classList.add("vkEnGroupInput");

  const attachLabel = document.createElement("div");
  attachLabel.classList.add("vkEnText");
  attachLabel.textContent = getLang?.("me_convo_attaches_app").toString() || "Вложения";
  attachLabel.style.minWidth = "100px";

  const attachInput = document.createElement("input");
  attachInput.type = "text";
  attachInput.id = "attachmentInput";
  attachInput.placeholder = getAddStickerText(vk.lang)[1];

  attachGroup.appendChild(attachLabel);
  attachGroup.appendChild(attachInput);
  attachGroup.appendChild(document.createElement("br"));

  const okButton = document.createElement("button");
  okButton.id = "okButton";
  okButton.textContent = getLang?.("box_send").toString() || "Отправить";
  okButton.disabled = true;

  contentDiv.appendChild(stickerGroup);
  contentDiv.appendChild(attachGroup);
  contentDiv.appendChild(okButton);

  contentIn.appendChild(contentDiv);
  content.appendChild(contentIn);
  contentWrap.appendChild(content);

  const closeButton = document.createElement("div");
  closeButton.classList.add("vkEnhancerCloseButton");
  closeButton.setAttribute("role", "button");
  closeButton.setAttribute("tabindex", "0");

  const closeSpan = document.createElement("span");
  closeSpan.classList.add("vkEnhancerVisuallyHidden");
  closeSpan.textContent = "Закрыть";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("display", "block");
  svg.classList.add("vkuiIcon", "vkuiIcon--20", "vkuiIcon--w-20", "vkuiIcon--h-20", "vkuiIcon--cancel_20");
  svg.setAttribute("viewBox", "0 0 20 20");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.style.width = "20px";
  svg.style.height = "20px";

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("d", "M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06");
  path.setAttribute("clip-rule", "evenodd");

  svg.appendChild(path);
  closeButton.appendChild(closeSpan);
  closeButton.appendChild(svg);

  modalIn.appendChild(header);
  modalIn.appendChild(contentWrap);
  modalIn.appendChild(closeButton);
  modalWrap.appendChild(modalIn);
  boxG.appendChild(modalWrap);

  document.body.appendChild(boxG);

  function onClose() {
    boxG.remove();
  }

  closeButton.addEventListener("click", onClose);

  boxG.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".vkEnhancerModalPage__in-wrap")) {
      onClose();
    }
  });

  let currentStickerId = "";
  let checkTimeout: number | null = null;

  async function checkSticker(id: string) {
    if (!id) {
      stickerPreview.style.display = "none";
      errorText.style.display = "none";
      okButton.disabled = true;
      return;
    }

    const url = `https://vk.com/sticker/1-${encodeURIComponent(id)}-512`;

    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        stickerPreview.src = url;
        stickerPreview.style.display = "block";
        errorText.style.display = "none";
        errorText.classList.remove("error_text");
        okButton.disabled = false;
      } else {
        stickerPreview.style.display = "none";
        errorText.textContent = getAddStickerText(vk.lang)[2];
        errorText.classList.add("error_text");
        errorText.style.display = "block";
        okButton.disabled = true;
      }
    } catch {
      stickerPreview.style.display = "none";
      errorText.textContent = getAddStickerText(vk.lang)[3];
      errorText.classList.add("error_text");
      errorText.style.display = "block";
      okButton.disabled = true;
    }
  }

  stickerInput.addEventListener("input", () => {
    const val = stickerInput.value.trim();
    currentStickerId = val;

    if (checkTimeout) clearTimeout(checkTimeout);
    checkTimeout = window.setTimeout(() => {
      if (currentStickerId === val) {
        checkSticker(val);
      }
    }, 500);

    if (!val) {
      stickerPreview.style.display = "none";
      errorText.style.display = "none";
      okButton.disabled = true;
    }
  });

  okButton.addEventListener("click", () => {
    const commonAttach = attachInput.value;
    const res = splitString(commonAttach);
    if (!res) return;
    const type1 = res.type;
    const second1 = res.secondary_attach;
    const peerId = new URL(window.location.href).pathname.split("/").at(-1);
    if (!peerId) return;
    const stickerId = stickerInput.value;
    getImSendHash(peerId, (err: any, hash: string) => {
      if (err) {
        console.error("[VK Tools Error] Error getting sticker hash:", err);
      } else {
        if (peerId) runStickerAdder(peerId, stickerId, hash, type1, second1);
      }
    });
    onClose();
  });
}

export default VKToolsStickerBox;
