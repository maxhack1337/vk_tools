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
        iconSvgElement:
          '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.06079 4.7619C3.06079 3.49897 3.56249 2.28776 4.45552 1.39473C5.34855 0.501699 6.55976 0 7.8227 0C9.08563 0 10.2968 0.501699 11.1899 1.39473C12.0829 2.28776 12.5846 3.49897 12.5846 4.7619V8.7619C12.5846 10.0248 12.0829 11.236 11.1899 12.1291C10.2968 13.0221 9.08563 13.5238 7.8227 13.5238C6.55976 13.5238 5.34855 13.0221 4.45552 12.1291C3.56249 11.236 3.06079 10.0248 3.06079 8.7619V4.7619ZM10.8703 4.7619V8.7619C10.8703 9.57018 10.5492 10.3454 9.97769 10.9169C9.40615 11.4884 8.63097 11.8095 7.8227 11.8095C7.01442 11.8095 6.23924 11.4884 5.6677 10.9169C5.09616 10.3454 4.77508 9.57018 4.77508 8.7619V4.7619C4.77508 3.95363 5.09616 3.17845 5.6677 2.60691C6.23924 2.03537 7.01442 1.71429 7.8227 1.71429C8.63097 1.71429 9.40615 2.03537 9.97769 2.60691C10.5492 3.17845 10.8703 3.95363 10.8703 4.7619Z" fill="currentColor"/><path d="M1.06732 11.4286C1.41779 11.4286 1.73303 11.6333 1.90827 11.9371C3.08732 13.9695 5.32351 15.4286 7.82255 15.4286C10.3216 15.4286 12.5683 13.9676 13.7473 11.9343C13.8305 11.784 13.9517 11.6582 14.0988 11.5694C14.2459 11.4807 14.4137 11.4321 14.5854 11.4286C15.2102 11.4286 15.6426 12.0505 15.3426 12.6C14.0216 15.0209 11.5387 16.7981 8.6797 17.0981V19.1428C8.6797 19.2554 8.65753 19.3669 8.61445 19.4709C8.57138 19.5749 8.50824 19.6693 8.42865 19.7489C8.34905 19.8285 8.25456 19.8917 8.15057 19.9347C8.04658 19.9778 7.93512 20 7.82255 20C7.70999 20 7.59853 19.9778 7.49454 19.9347C7.39055 19.8917 7.29606 19.8285 7.21646 19.7489C7.13687 19.6693 7.07373 19.5749 7.03066 19.4709C6.98758 19.3669 6.96541 19.2554 6.96541 19.1428V17.0981C4.10827 16.799 1.62732 15.0238 0.305412 12.6057C0.00445937 12.0533 0.438745 11.4286 1.06732 11.4286Z" fill="currentColor"/>',
        title: getLang?.("me_notifications_pushes_attachments_voice").toString() || "Голосовое сообщение",
        buttonClass: "AudioMenuPopper",
        viewBox: "0 0 16 22",
        width: "20",
        height: "20",
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
        viewBox: "0 0 20 20",
        width: "20",
        height: "20",
      });
      newpanel.appendChild(clmno1);
    }

    if (!document.querySelector(".StickerMenuPopper")) {
      const clmno2 = createMenuActionButton({
        iconSvgElement:
          '<path d="M6.52824 12.3202C6.71519 12.1706 6.95361 12.1008 7.19171 12.126C7.42982 12.1511 7.64839 12.2692 7.79996 12.4545C7.81309 12.4707 7.99794 12.6798 8.33531 12.8909C8.72218 13.1333 9.31511 13.3838 10.1262 13.3838C10.7578 13.3925 11.3789 13.2216 11.9171 12.8909C12.1101 12.7697 12.303 12.6283 12.4525 12.4545C12.6041 12.267 12.824 12.1474 13.0638 12.122C13.3037 12.0966 13.5437 12.1676 13.7313 12.3192C13.9188 12.4708 14.0384 12.6907 14.0638 12.9306C14.0892 13.1704 14.0183 13.4105 13.8666 13.598C13.5849 13.9272 13.252 14.2089 12.8808 14.4323C12.0536 14.9437 11.0986 15.2106 10.1262 15.202C9.1538 15.2106 8.1988 14.9437 7.37168 14.4323C7.00044 14.2089 6.66757 13.9272 6.38582 13.598C6.23514 13.4098 6.16539 13.1694 6.19191 12.9298C6.21843 12.6902 6.34006 12.4709 6.52824 12.3202ZM8.35854 8.23232C8.35854 8.56719 8.22552 8.88835 7.98873 9.12514C7.75194 9.36192 7.43079 9.49495 7.09592 9.49495C6.76105 9.49495 6.43989 9.36192 6.20311 9.12514C5.96632 8.88835 5.83329 8.56719 5.83329 8.23232C5.83329 7.89745 5.96632 7.5763 6.20311 7.33951C6.43989 7.10272 6.76105 6.9697 7.09592 6.9697C7.43079 6.9697 7.75194 7.10272 7.98873 7.33951C8.22552 7.5763 8.35854 7.89745 8.35854 8.23232ZM13.1565 9.49495C13.4914 9.49495 13.8125 9.36192 14.0493 9.12514C14.2861 8.88835 14.4192 8.56719 14.4192 8.23232C14.4192 7.89745 14.2861 7.5763 14.0493 7.33951C13.8125 7.10272 13.4914 6.9697 13.1565 6.9697C12.8217 6.9697 12.5005 7.10272 12.2637 7.33951C12.0269 7.5763 11.8939 7.89745 11.8939 8.23232C11.8939 8.56719 12.0269 8.88835 12.2637 9.12514C12.5005 9.36192 12.8217 9.49495 13.1565 9.49495ZM10.1262 0C4.60299 0 0.126221 4.47677 0.126221 10C0.126221 15.5232 4.60299 20 10.1262 20C15.6495 20 20.1262 15.5232 20.1262 10C20.1262 4.47677 15.6495 0 10.1262 0ZM1.9444 10C1.9444 7.83005 2.80641 5.74897 4.3408 4.21458C5.87519 2.68019 7.95627 1.81818 10.1262 1.81818C12.2962 1.81818 14.3773 2.68019 15.9116 4.21458C17.446 5.74897 18.308 7.83005 18.308 10C18.308 12.17 17.446 14.251 15.9116 15.7854C14.3773 17.3198 12.2962 18.1818 10.1262 18.1818C7.95627 18.1818 5.87519 17.3198 4.3408 15.7854C2.80641 14.251 1.9444 12.17 1.9444 10Z" fill="currentColor"/>',
        title: getLang?.("mail_added_sticker").toString() || "Стикер",
        buttonClass: "StickerMenuPopper",
        viewBox: "0 0 18 20",
        width: "20",
        height: "18",
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
