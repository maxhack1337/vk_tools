import showSnackbar from "../../../components/snackbar/snackbar";
import deferredCallback from "../../../defferedCallback";
import getLocalValue from "../../../getLocalValue";
import getEnableLinesLang from "../getEnableLinesLang";
import { getUnsupportedLangAttaches } from "../getUnsupportedLang";
import onAddMessage from "./onAddMessage";
import onAddState from "./onAddState";

/*
 * Этот модуль использует рудиментарный kphp
 * После отключения kphp смело удаляй его
 */

const oldAttaches = () => {
  if (getLocalValue("oldMessengerAttaches") === true) {
    document.arrive(".vkmListHeader__title > h1", { existing: true }, (title) => {
      let isGim = title?.classList.contains("ConvoList__headerGroup");
      if (isGim) {
        document.unbindArrive(".ConvoHistory__flow");
        document.unbindArrive(".audio-msg-track--transcriptToggle");
        return;
      }

      deferredCallback(
        async () => {
          if (!vk.stExcludedMasks) vk.stExcludedMasks = ["loader_nav", "lang", "sw/"];
          await stManager.add(["page.css", "post.css", "im.css", "common.css", "notifier.css", window.jsc("web/imn.js")]);
        },
        { variable: "stManager" }
      );

      if (getLocalValue("oldMessengerDes") !== true) {
        deferredCallback(
          async () => {
            vkApi.api("messages.getConfig", {}).then((e: any) => {
              if (e.config.bubble_theme === true) {
                showSnackbar({
                  text: getUnsupportedLangAttaches(vk.lang),
                  timeout: 10000,
                  icon: "warning",
                  action: {
                    label: getEnableLinesLang(vk.lang),
                    href: "",
                  },
                  onClick: `vkApi.api('messages.setConfig',{config:'{"bubble_theme":0}'}); window.location.reload();`,
                });
              }
            });
          },
          { variable: "curNotifier" }
        );
      }

      document.arrive(".audio-msg-track--transcriptToggle", { existing: true }, (e) => {
        let el = e as HTMLElement;
        el.addEventListener("click", (m: MouseEvent) => {
          m.stopPropagation();
          m.preventDefault();
        });
      });
      if (!isGim) {
        document.arrive(".ConvoHistory__flow", { existing: true }, (e) => {
          onAddState(onAddMessage);
        });
      }
    });
  }
};

export default oldAttaches;
