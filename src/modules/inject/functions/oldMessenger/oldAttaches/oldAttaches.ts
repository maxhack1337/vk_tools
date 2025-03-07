import deferredCallback from "../../../defferedCallback";
import getLocalValue from "../../../getLocalValue";
import createStyle from "../../classicalProfile/scripts/createStyle";
import getOldAttachStyle from "./getOldAttachStyle";
import onAddMessage from "./onAddMessage";
import onAddState from "./onAddState";

const oldAttaches = () => {
    if (getLocalValue("oldMessengerAttaches") === true) {
        createStyle('oldAttachesMessengerStyle', getOldAttachStyle());

        deferredCallback(async () => {
            if(!vk.stExcludedMasks) vk.stExcludedMasks = ["loader_nav", "lang", "sw/"];
            await stManager.add(['page.css', 'post.css', 'im.css', 'common.css', 'notifier.css', window.jsc("web/imn.js")]);
        },
        {variable:'stManager'})

        document.arrive('.audio-msg-track--transcriptToggle', { existing: true }, (e) => {
            let el = e as HTMLElement;
            el.addEventListener('click', (m: MouseEvent) => {
                m.stopPropagation();
                m.preventDefault();
            })
        });
        document.arrive('.ConvoHistory__flow', { existing: true }, (e) => {
            onAddState(onAddMessage);
        });
    }
}

export default oldAttaches;