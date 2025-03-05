import { escapeHtml } from "../../escapeHtml";
import onClose from "./onClose";

const vkToolsOnlineBox = async(onlineArr: string | any[]) => {
  let arrLen = onlineArr.length;
  let boxG = document.createElement("div");
  boxG.classList.add("vkEnhancerOnlineMainBox");
  boxG.innerHTML =
    `<div class="vkEnhancerModalPage__in-wrap" style="opacity: 1;">
  <div class="vkEnhancerModalPage__in">
    <div class="vkEnhancerModalPage__header">
      <div class="vkEnhancerModalPageHeader vkEnhancerModalPageHeader--withGaps vkEnhancerModalPageHeader--desktop">
        <div class="vkEnhancerPanelHeader">
          <div class="vkEnhancerPanelHeader__in" data-onboarding-tooltip-container="fixed">
            <div class="vkEnhancerPanelHeader__content">
              <h2 class="vkEnhancerPanelHeader__content-in" id=":r1:-label" style="
    display: flex;
">` +
    getLang?.("mail_im_mention_online") +
    `<div class="arrLen">${arrLen}</div></h2>
            </div>
          </div>
        </div>
        <div class="vkEnhancerSeparator">
          <hr class="vkEnhancerSeparator__in">
        </div>
        <div class="RE_ModalBody RE_ModalBody--fullScreen vkEnBgWhiteOnline">
          <div data-scrollbar="cropped" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
            <div class="MessageReactedPeersModal__wrapper" style="width: 96%; height: 100%; max-width: inherit; max-height: inherit; overflow: hidden auto;" data-scrollbar="scrollable">
              <div style="width: 100%; height: min-content;" data-scrollbar="content">
                <section class="MessageReactedPeersModal__content" aria-label="Реакции на сообщение">
                  <div class="PeerList vkenPeerList">
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vkEnhancerCloseButton" role="button" tabindex="0"><span class="vkEnhancerVisuallyHidden">Закрыть</span>
      <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;">
        <path fill="currentColor" fill-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path>
      </svg>
    </div>
  </div>
</div>`;
  let peerList = boxG.querySelector(".vkenPeerList");
  for (const user of onlineArr) {
    let peer = document.createElement(`a`);
    peer.title = user[0];
    peer.classList.add("PeerListItemLink");
    peer.href = `/id${user[1]}`;
    peer.target = `_blank`;
    peer.innerHTML = `
		<div class="PeerListItem PeerListItem--clickable" tabindex="-1">
  <div class="PeerListItem__main">
    <div class="PeerListItem__avatar" style="
    width: 40px;
    height: 40px;
">
      <figure class="MEAvatar MEAvatar--size-40" style="margin: 0;width: 40px;height: 40px;">
        <div class="MEAvatar__imgWrapper" style="clip-path: url(&quot;#mePeerFrameOffline40Mask265672157&quot;);">
          <div class="BasicAvatar BasicAvatar--size-40"><img class="BasicAvatar__img" alt="${escapeHtml(user[0])}" src="${user[2]}"></div>
        </div>
        <svg class="MEAvatar__svg">
          <clipPath id="mePeerFrameOffline40Mask265672157">
            <use href="#mePeerFrameOffline40"></use>
          </clipPath>
          <use href="#mePeerFrameOffline40" class="MEAvatar__shadow" clip-path="url(#mePeerFrameOffline40Mask265672157)"></use>
        </svg>
      </figure>
    </div>
    <div class="PeerListItem__content">
      <div class="PeerListItem__name">${user[0]}</div>
    </div>
  </div>
</div>
		`;
    peerList?.appendChild(peer);
  }
  boxG.style.top = "0px";
  boxG.style.zIndex = "999999";
  boxG.style.backgroundColor = "#000000B3";
  document.body.appendChild(boxG);
  let closeButton = document.querySelector(".vkEnhancerCloseButton");
  closeButton?.addEventListener("click", function () {
    onClose();
  });
    boxG.addEventListener("click", function (event) {
    let target = event.target as HTMLElement;
    if (!target.closest(".vkEnhancerModalPage__in-wrap")) {
      onClose();
    }
  });
}

export default vkToolsOnlineBox;