import createStyle from "../classicalProfile/scripts/createStyle";
import getImSendHash from "./getImSendHash";
import graffityBoxStyle from "./graffityBoxStyle";
import handleUpload from "./handleUpload";
import createMenuActionButton from "./menuActionButton/createMenuActionButton";
import stickerBoxStyle from "./stickerBoxStyle";
import VKEnhancerGraffitiBox from "./VKEnhancerGraffitiBox";
import VKToolsStickerBox from "./VKToolsStickerBox";

function initMenuActions() {
  document.arrive(".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper > div > .DropdownReforged__contentWrapper > .ActionsMenu:not(#member_actions)", { existing: true }, function (e) {
    const newpanel = document.querySelector(".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper > div > .DropdownReforged__contentWrapper > .ActionsMenu");
    if (!newpanel) return;
    const eventListenersSet = {
      audio: false,
      graffiti: false,
      sticker: false,
    };
    createStyle("MEPopperStyle", ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper:not(:has(#member_actions)){margin-top:-72px!important;}");
    if (!document.querySelector(".AudioMenuPopper")) {
      const clmno = createMenuActionButton({
        iconSvgElement: '<use xlink:href="#voice_outline_24" style="fill: currentcolor;"></use>',
        title: getLang?.("me_notifications_pushes_attachments_voice").toString() || "Голосовое сообщение",
        buttonClass: "AudioMenuPopper",
      });
      newpanel.appendChild(clmno);
      let appendHere = document.querySelector(".ConvoHeader");
      if (!appendHere?.querySelector("#audioFileInput")) {
        let inputWrap = document.createElement("a");
        inputWrap.innerHTML = '<input style="display:none;" type="file" id="audioFileInput" accept="audio/mp3,audio/ogg,audio/wav">';
        appendHere?.appendChild(inputWrap);
        const audioFileInput = document.getElementById("audioFileInput") as HTMLInputElement;
        audioFileInput?.addEventListener("change", function () {
          const length = audioFileInput.files?.length || 0;
          if (length > 0) {
            handleUpload();
            audioFileInput.value = "";
          }
        });
      }
    }

    if (!document.querySelector(".GraffitiMenuPopper")) {
      const clmno1 = createMenuActionButton({
        iconSvgElement:
          '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M6.66738 12.4934C5.66072 12.4934 4.89771 13.2639 4.85288 14.219C4.78943 15.5707 4.14574 16.3782 3.56758 16.8697C4.09576 17.0241 4.83625 17.0816 5.79412 16.7965C7.69684 16.2301 8.48106 15.0732 8.48106 14.1836C8.48106 13.2865 7.70617 12.4934 6.66738 12.4934ZM3.35859 14.1483C3.44019 12.4098 4.84452 10.9918 6.66738 10.9918C8.4581 10.9918 9.977 12.3845 9.977 14.1836C9.977 15.9903 8.47815 17.5638 6.21942 18.2361C4.06158 18.8784 2.57907 18.2114 1.87062 17.688C1.78649 17.6258 1.66019 17.5141 1.57758 17.3353C1.48322 17.131 1.47952 16.9126 1.54181 16.7213C1.69148 16.2618 2.17858 16.0626 2.52898 15.7829C2.9113 15.4778 3.31759 15.0219 3.35859 14.1483Z"/><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15.7019 2.00141C16.312 1.36368 17.3109 1.32806 17.9631 1.93024C18.6094 2.527 18.68 3.5332 18.1327 4.21788L12.0531 11.716C11.7923 12.0376 11.3212 12.0861 11.0008 11.8244C10.6804 11.5626 10.6321 11.0897 10.8928 10.7681L16.9669 3.27699C17.0242 3.20385 17.0127 3.09301 16.9503 3.0354C16.8833 2.97354 16.8169 3.009 16.7482 3.07474L9.74543 9.7831C9.44658 10.0694 8.97312 10.0583 8.68792 9.75831C8.40272 9.45834 8.41378 8.98309 8.71263 8.69681L15.7019 2.00141Z" fill="currentColor"/>',
        title: getLang?.("mail_added_graffiti").toString() || "Граффити",
        buttonClass: "GraffitiMenuPopper",
      });
      newpanel.appendChild(clmno1);
    }

    if (!document.querySelector(".StickerMenuPopper")) {
      const clmno2 = createMenuActionButton({
        iconSvgElement: '<use xlink:href="#smile_outline_24" style="fill: currentcolor;"></use>',
        title: getLang?.("mail_added_sticker").toString() || "Стикер",
        buttonClass: "StickerMenuPopper",
      });

      const imId1 = new URL(window.location.href).pathname.split("/").at(-1) || "";

      getImSendHash(imId1, (err: any, hash: string) => {
        if (err) {
          console.error("[VK Tools Error] Error getting sticker hash:", err);
          return;
        }
        if (hash !== "error" && hash) {
          let styleElement = document.getElementById("MEPopperStyle");
          if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "MEPopperStyle";
            document.head.appendChild(styleElement);
          }
          styleElement.innerHTML = ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper{margin-top:-96px!important;}";
          newpanel.appendChild(clmno2);
          if (!eventListenersSet.sticker) {
            const stickerElement = document.querySelector(".StickerMenuPopper");
            if (stickerElement) {
              stickerElement.addEventListener("click", async () => {
                let styleElement = document.getElementById("vkenSticker");
                if (!styleElement) {
                  styleElement = document.createElement("style");
                  styleElement.id = "vkenSticker";
                  document.head.appendChild(styleElement);
                }
                styleElement.innerHTML = stickerBoxStyle();
                await VKToolsStickerBox();
              });
              eventListenersSet.sticker = true;
            }
          }
        }
      });
    }

    if (!eventListenersSet.audio) {
      const audioElement = document.querySelector(".AudioMenuPopper");
      if (audioElement) {
        audioElement.addEventListener("click", () => {
          const audioFileInput = document.getElementById("audioFileInput");
          if (audioFileInput) audioFileInput.click();
        });
        eventListenersSet.audio = true;
      }
    }

    if (!eventListenersSet.graffiti) {
      const graffitiElement = document.querySelector(".GraffitiMenuPopper");
      if (graffitiElement) {
        graffitiElement.addEventListener("click", async () => {
          let styleElement = document.getElementById("vkenGraffity");
          if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "vkenGraffity";
            document.head.appendChild(styleElement);
          }
          styleElement.innerHTML = graffityBoxStyle();
          await VKEnhancerGraffitiBox();
        });
        eventListenersSet.graffiti = true;
      }
    }
  });
}

export default initMenuActions;
