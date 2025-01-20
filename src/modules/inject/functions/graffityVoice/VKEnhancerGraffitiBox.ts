import handleGraffity from "./handleGraffity";
import onClose from "./onClose";

const VKEnhancerGraffitiBox = async() => {
      let boxG = document.createElement("div");
      boxG.classList.add("vkEnhancerGraffityMainBox");
      boxG.innerHTML =
        `<div class="vkEnhancerModalPage__in-wrap" style="opacity: 1;"> <div class="vkEnhancerModalPage__in"> <div class="vkEnhancerModalPage__header"> <div class="vkEnhancerModalPageHeader vkEnhancerModalPageHeader--withGaps vkEnhancerModalPageHeader--desktop"> <div class="vkEnhancerPanelHeader"> <div class="vkEnhancerPanelHeader__in" data-onboarding-tooltip-container="fixed"> <div class="vkEnhancerPanelHeader__content"> <h2 class="vkEnhancerPanelHeader__content-in" id=":r1:-label">` +
        getLang?.("mail_added_graffiti") +
        `</h2> </div> </div> </div> <div class="vkEnhancerSeparator"> <hr class="vkEnhancerSeparator__in"> </div> </div> </div> <div class="vkEnhancerModalPage__content-wrap"> <div class="vkEnhancerModalPage__content"> <div class="vkEnhancerModalPage__content-in"> <div class="vkEnhancerDiv"> <div class="vkEnhancerTappable vkEnhancerGraffityInput" role="button" tabindex="0"> <div class="vkEnhancerSimpleCell__before"> <img src="https://vk.com/images/icons/upload_icon.png"> </div> <div class="vkEnhancerSimpleCell__middle"> <div class="vkEnhancerSimpleCell__content"><span class="vkEnhancerTypography">` +
        getLang?.("calls_translation_planned_preview_download") +
        `<input class="vkEnhancerVisuallyHidden" type="file" accept="image/png"></span></div> </div> </div> <div class="vkEnhancerGraffitiList"> </div> </div> </div> </div> </div> <div class="vkEnhancerCloseButton" role="button" tabindex="0"><span class="vkEnhancerVisuallyHidden">Закрыть</span> <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"> <path fill="currentColor" fill-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path> </svg> </div> </div> </div>`;
      boxG.style.top = "0px";
      boxG.style.zIndex = "999999";
      boxG.style.backgroundColor = "#000000B3";
      document.body.appendChild(boxG);
      let responseGraffiti = await vkApi.api(
        "messages.getRecentGraffities",
        {}
      );
      var graffitiList = document.querySelector(".vkEnhancerGraffitiList");
      responseGraffiti.forEach(function (graffiti: { url: string; id: any; owner_id: any; }) {
        var ultraItemDiv = document.createElement("div");
        ultraItemDiv.classList.add("vkEnhancerGraffitiUltraItem");
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("vkEnhancerGraffitiList__item");
        var docDiv = document.createElement("div");
        docDiv.classList.add("vkEnhancerGraffitiList__item--doc");
        docDiv.style.backgroundImage = `url("${graffiti.url}")`;
        var removGButton = document.createElement("div");
        removGButton.classList.add("vkEnhancerRemoveGraffityButton");
        removGButton.setAttribute(
          "onclick",
          `vkApi.api("messages.hideRecentGraffiti", {
                                    doc_id: ${graffiti.id}
                                });`
        );
        removGButton.addEventListener("click", function () {
          ultraItemDiv.style.display = "none";
        });
        removGButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.84 4H2.75a.75.75 0 0 0 0 1.5h.55l.9 9.25c.05.52.1.96.16 1.31.06.37.16.71.35 1.03a2.9 2.9 0 0 0 1.25 1.13c.33.16.68.22 1.06.25.36.03.8.03 1.32.03h3.32c.53 0 .96 0 1.32-.03.38-.03.73-.1 1.06-.25a2.9 2.9 0 0 0 1.25-1.13c.19-.32.29-.66.35-1.03.06-.35.1-.79.16-1.31l.9-9.25h.55a.75.75 0 0 0 0-1.5h-4.09a3.25 3.25 0 0 0-6.32 0Zm1.58 0h3.16a1.75 1.75 0 0 0-3.16 0Zm6.78 1.5H4.8l.9 9.07c.05.56.08.94.13 1.23.05.28.1.42.17.52a1.4 1.4 0 0 0 .6.55c.1.04.25.08.53.1.3.03.68.03 1.24.03h3.26c.56 0 .94 0 1.23-.02.29-.03.43-.07.54-.11a1.4 1.4 0 0 0 .6-.55c.06-.1.11-.24.16-.52.05-.3.1-.67.15-1.23l.89-9.07Zm-2.89 2a.75.75 0 0 1 .69.81l-.5 6a.75.75 0 0 1-1.5-.12l.5-6a.75.75 0 0 1 .81-.69Zm-4.62 0a.75.75 0 0 1 .8.69l.5 6a.75.75 0 0 1-1.49.13l-.5-6a.75.75 0 0 1 .69-.82Z" clip-rule="evenodd"></path></svg>`;
        ultraItemDiv.appendChild(removGButton);
        itemDiv.appendChild(docDiv);
        ultraItemDiv.appendChild(itemDiv);
        graffitiList?.appendChild(ultraItemDiv);
        var gUrl = graffiti.url.replace("https://vk.com/", "");
        itemDiv.addEventListener("click", async function () {
          var peerId = new URL(window.location.href).pathname.split("/").at(-1);
          await vkApi.api("messages.send", {
            peer_id: peerId,
            attachment: gUrl,
            random_id: Math.floor(Math.random() * 2147483647),
          });
          onClose();
        });
      });
      let closeButton = document.querySelector(".vkEnhancerCloseButton");
      closeButton?.addEventListener("click", function () {
        onClose();
      });
        boxG.addEventListener("click", function (event) {
            const target = event.target as HTMLElement;
        if (!target?.closest(".vkEnhancerModalPage__in-wrap")) {
          onClose();
        }
      });
      const graffityFileInput = document.querySelector(
        ".vkEnhancerVisuallyHidden"
      ) as HTMLInputElement;
        graffityFileInput?.addEventListener("change", function () {
        const files = graffityFileInput.files || [];
        if (files.length > 0) {
          boxG.style.display = "none";
          handleGraffity();
        }
      });
      document.querySelector(".vkEnhancerTappable")?.addEventListener("click", function (event) {
          graffityFileInput.click();
        });
}
    
export default VKEnhancerGraffitiBox