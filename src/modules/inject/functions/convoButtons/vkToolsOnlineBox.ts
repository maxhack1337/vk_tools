import { escapeHtml } from "../../escapeHtml";
import onClose from "./onClose";

const vkToolsOnlineBox = async (onlineArr: string | any[]) => {
  const arrLen = onlineArr.length;

  const boxG = document.createElement("div");
  boxG.classList.add("vkEnhancerOnlineMainBox");

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
  h2.style.display = "flex";

  const titleText = document.createTextNode(getLang?.("mail_im_mention_online").toString() || "Все, кто сейчас онлайн");
  const arrLenDiv = document.createElement("div");
  arrLenDiv.classList.add("arrLen");
  arrLenDiv.textContent = arrLen.toString();

  h2.appendChild(titleText);
  h2.appendChild(arrLenDiv);

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

  const modalBody = document.createElement("div");
  modalBody.classList.add("RE_ModalBody", "RE_ModalBody--fullScreen", "vkEnBgWhiteOnline");

  const scrollWrapper = document.createElement("div");
  scrollWrapper.setAttribute("data-scrollbar", "cropped");
  scrollWrapper.style.position = "relative";
  scrollWrapper.style.width = "100%";
  scrollWrapper.style.height = "100%";
  scrollWrapper.style.overflow = "hidden";

  const scrollableWrapper = document.createElement("div");
  scrollableWrapper.classList.add("MessageReactedPeersModal__wrapper");
  scrollableWrapper.style.width = "100%";
  scrollableWrapper.style.height = "100%";
  scrollableWrapper.style.padding = "0";
  scrollableWrapper.style.maxWidth = "inherit";
  scrollableWrapper.style.maxHeight = "inherit";
  scrollableWrapper.style.overflow = "hidden auto";
  scrollableWrapper.setAttribute("data-scrollbar", "scrollable");

  const contentWrapper = document.createElement("div");
  contentWrapper.style.width = "100%";
  contentWrapper.style.height = "min-content";
  contentWrapper.setAttribute("data-scrollbar", "content");

  const section = document.createElement("section");
  section.classList.add("MessageReactedPeersModal__content");
  section.setAttribute("aria-label", "Реакции на сообщение");

  const peerList = document.createElement("div");
  peerList.classList.add("PeerList", "vkToolsPeerList");
  peerList.style.padding = "12px";

  section.appendChild(peerList);
  contentWrapper.appendChild(section);
  scrollableWrapper.appendChild(contentWrapper);
  scrollWrapper.appendChild(scrollableWrapper);
  modalBody.appendChild(scrollWrapper);

  modalIn.appendChild(header);
  modalIn.appendChild(modalBody);

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

  modalWrap.appendChild(modalIn);
  modalWrap.appendChild(closeButton);
  boxG.appendChild(modalWrap);

  document.body.appendChild(boxG);

  for (const user of onlineArr) {
    const peer = document.createElement("a");
    peer.title = user[0];
    peer.classList.add("PeerListItemLink");
    peer.href = `/id${user[1]}`;
    peer.target = `_blank`;

    const peerItem = document.createElement("div");
    peerItem.classList.add("PeerListItem", "PeerListItem--clickable");
    peerItem.tabIndex = -1;

    const peerMain = document.createElement("div");
    peerMain.classList.add("PeerListItem__main");

    const peerAvatar = document.createElement("div");
    peerAvatar.classList.add("PeerListItem__avatar");
    peerAvatar.style.width = "40px";
    peerAvatar.style.height = "40px";

    const figure = document.createElement("figure");
    figure.classList.add("MEAvatar", "MEAvatar--size-40");
    figure.style.margin = "0";
    figure.style.width = "40px";
    figure.style.height = "40px";

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("MEAvatar__imgWrapper");
    imgWrapper.style.clipPath = "url(#mePeerFrameOffline40Mask1)";

    const basicAvatar = document.createElement("div");
    basicAvatar.classList.add("BasicAvatar", "BasicAvatar--size-40");

    const img = document.createElement("img");
    img.classList.add("BasicAvatar__img");
    img.alt = escapeHtml(user[0]);
    img.src = user[2];

    basicAvatar.appendChild(img);
    imgWrapper.appendChild(basicAvatar);

    const svgAvatar = document.createElementNS(svgNS, "svg");
    svgAvatar.classList.add("MEAvatar__svg");

    const clipPath = document.createElementNS(svgNS, "clipPath");
    clipPath.id = "mePeerFrameOffline40Mask1";

    const useClip = document.createElementNS(svgNS, "use");
    useClip.setAttribute("href", "#mePeerFrameOffline40");

    clipPath.appendChild(useClip);
    svgAvatar.appendChild(clipPath);

    const useShadow = document.createElementNS(svgNS, "use");
    useShadow.setAttribute("href", "#mePeerFrameOffline40");
    useShadow.classList.add("MEAvatar__shadow");
    useShadow.setAttribute("clip-path", "url(#mePeerFrameOffline40Mask1)");

    svgAvatar.appendChild(useShadow);

    figure.appendChild(imgWrapper);
    figure.appendChild(svgAvatar);

    peerAvatar.appendChild(figure);
    peerMain.appendChild(peerAvatar);

    const peerContent = document.createElement("div");
    peerContent.classList.add("PeerListItem__content");

    const peerName = document.createElement("div");
    peerName.classList.add("PeerListItem__name");
    peerName.textContent = user[0];

    peerContent.appendChild(peerName);
    peerMain.appendChild(peerContent);
    peerItem.appendChild(peerMain);
    peer.appendChild(peerItem);

    peerList.appendChild(peer);
  }

  boxG.style.top = "0px";
  boxG.style.zIndex = "999999";
  boxG.style.backgroundColor = "#000000B3";

  closeButton.addEventListener("click", () => {
    onClose();
  });

  boxG.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.closest(".vkEnhancerModalPage__in-wrap")) {
      onClose();
    }
  });
};

export default vkToolsOnlineBox;
