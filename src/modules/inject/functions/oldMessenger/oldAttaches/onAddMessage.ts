import getPeerProps from "../../convoButtons/getPeerProps";
import addPreventDefaultListener from "./addPreventDefaultListener";
import extractPeerId from "./extractPeerId";

const onAddMessage = async (message: HTMLElement) => {
            let attaches = message.querySelector('[class^="ConvoMessageWithoutBubble__"] > .Attachments') as HTMLElement;
            let gift = message.querySelector('.AttachGift') as HTMLElement;
            let fwd = message.querySelector('.ForwardedMessagesList') as HTMLElement;
            let story = message.querySelector('.AttachStory') as HTMLElement;
            if (gift || attaches || fwd || story) {
                let memoizedPeer;
                try {
                    memoizedPeer = getPeerProps(document.querySelector('.ConvoHeader')!).peer.id;
                } catch (e) {
                    memoizedPeer = extractPeerId(window.location.href);
                }
                let getMessageByCmid = await vkApi.api('messages.getById', { cmids: message.getAttribute('data-itemkey'), peer_id: memoizedPeer });
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
                                        fwd.parentElement.style.display = 'none';
                                    }
                                    else {
                                        fwd.style.display = 'none';
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
                                    if (fwd.parentElement) {
                                        fwd.parentElement.classList.add('im-mess--text', 'im-vktools-custom');
                                        addPreventDefaultListener(fwd.parentElement);
                                        fwd.parentElement.innerHTML = outerDiv.innerHTML;
                                    }
                                    else {
                                        fwd.classList.add('im-mess--text', 'im-vktools-custom');
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
                                console.error("[VK Tools] Error parsing JSON or accessing payload:", error);
                            }
                        }
                    });
            }
}

export default onAddMessage;