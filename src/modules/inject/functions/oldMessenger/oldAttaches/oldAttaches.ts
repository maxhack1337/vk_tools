import deferredCallback from "../../../defferedCallback";
import getLocalValue from "../../../getLocalValue";
import createStyle from "../../classicalProfile/scripts/createStyle";
import getPeerProps from "../../convoButtons/getPeerProps";
import addPreventDefaultListener from "./addPreventDefaultListener";
import extractPeerId from "./extractPeerId";
import getOldAttachStyle from "./getOldAttachStyle";

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

        document.arrive('.ConvoStack__content .VirtualScrollItem[data-itemkey]', { existing: true }, async (e) => {
            let attaches = e.querySelector('[class^="ConvoMessageWithoutBubble__"] > .Attachments') as HTMLElement;
            let gift = e.querySelector('.AttachGift') as HTMLElement;
            let fwd = e.querySelector('.ForwardedMessagesList') as HTMLElement;
            let story = e.querySelector('.AttachStory') as HTMLElement;
            if (gift || attaches || fwd || story) {
                let memoizedPeer;
                try {
                    memoizedPeer = getPeerProps(document.querySelector('.ConvoHeader')!).peer.id;
                } catch (e) {
                    memoizedPeer = extractPeerId(window.location.href);
                }
                let getMessageByCmid = await vkApi.api('messages.getById', { cmids: e.getAttribute('data-itemkey'), peer_id: memoizedPeer });
                let msgId = getMessageByCmid.items[0].id;

                let outerDiv = document.createElement('div');
                outerDiv.className = 'vkToolsBrowseAllImages';
                ajax.post("al_im.php", {
                    act: 'a_get_media',
                    al: 1,
                    id: msgId,
                    im_v: 3
                },
                    {
                        onDone: (response: any) => {
                            try {
                                outerDiv.innerHTML = response[1];
                                if (attaches && fwd) {
                                    attaches.classList.add('im-mess--text','im-vktools-custom');
                                    if (fwd.parentElement) {
                                        fwd.parentElement.remove();
                                    }
                                    else {
                                        fwd.remove();
                                    }
                                    addPreventDefaultListener(attaches);
                                    attaches.innerHTML = outerDiv.innerHTML;
                                }
                                else if (attaches) {
                                    attaches.classList.add('im-mess--text','im-vktools-custom');
                                    addPreventDefaultListener(attaches);
                                    attaches.innerHTML = outerDiv.innerHTML;
                                }
                                else if (fwd) {
                                    fwd.classList.add('im-mess--text','im-vktools-custom');
                                    if (fwd.parentElement) {
                                        addPreventDefaultListener(fwd.parentElement);
                                        fwd.parentElement.innerHTML = outerDiv.innerHTML;
                                    }
                                    else {
                                        addPreventDefaultListener(fwd);
                                        fwd.innerHTML = outerDiv.innerHTML;
                                    }
                                }
                                else if (gift) {
                                    gift.classList.add('im-vktools-custom');
                                    gift.innerHTML = outerDiv.innerHTML;
                                }
                                else if (story) {
                                    story.classList.add('im-vktools-custom');
                                    story.innerHTML = outerDiv.innerHTML;
                                }
                            } catch (error) {
                                console.error("Error parsing JSON or accessing payload:", error);
                            }
                        }
                    });
            }
        });
    }
}

export default oldAttaches;