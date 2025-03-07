import extractPeerId from "./extractPeerId";
import onAddMessage from "./onAddMessage";

const runMessageUpdate = async (cmid: number, peer_id: number) => {
    if (peer_id === extractPeerId(window.location.href)) {
        let queryMessage = document.querySelector(`.ConvoStack__content .VirtualScrollItem[data-itemkey="${cmid}"]`) as HTMLElement;
        if (queryMessage) await onAddMessage(queryMessage);
    }
}

export default runMessageUpdate;