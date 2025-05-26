import showSnackbar from "../../../components/snackbar/snackbar";
import deferredCallback from "../../../defferedCallback";
import getLocalValue from "../../../getLocalValue";
import getEnableLinesLang from "../getEnableLinesLang";
import getOldAttachStyle from "./getOldAttachStyle";
import { getUnsupportedLangAttaches } from "../getUnsupportedLang";
import onAddMessage from "./onAddMessage";
import onAddState from "./onAddState";
import createStyle from "../../../createStyle";

const oldAttaches = () => {
  if (getLocalValue("oldMessengerAttaches") === true) {
    createStyle("oldAttachesMessengerStyle", getOldAttachStyle());

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
    document.arrive(".ConvoHistory__flow", { existing: true }, (e) => {
      onAddState(onAddMessage);
    });
  }
};

export default oldAttaches;
