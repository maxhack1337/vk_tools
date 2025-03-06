import getLocalValue from "../../../getLocalValue";
import createStyle from "../../classicalProfile/scripts/createStyle";
import getPeerProps from "../../convoButtons/getPeerProps";
import addPreventDefaultListener from "./addPreventDefaultListener";
import getOldAttachStyle from "./getOldAttachStyle";

const oldAttaches = () => {
    if (getLocalValue("oldMessengerAttaches") === true) {
        createStyle('oldAttachesMessengerStyle', getOldAttachStyle());

        document.arrive('.ConvoStack__content .VirtualScrollItem[data-itemkey]', { existing: true }, async (e) => {
            let attaches = e.querySelector('.Attachments') as HTMLElement;
            let gift = e.querySelector('.AttachGift') as HTMLElement;
            let fwd = e.querySelector('.ForwardedMessagesList') as HTMLElement;
            if (gift || attaches || fwd) {
                await stManager.add(['page.css', 'post.css', 'im.css', 'common.css', window.jsc("web/imn.js")]);
                let memoizedPeer = getPeerProps(document.querySelector('.ConvoHeader')!).peer.id;
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
                                if (attaches) {
                                    attaches.classList.add('im-mess--text');
                                    let mDesc = outerDiv.querySelector('.media_desc:not(.im-mess--inline-fwd)') as HTMLElement;
                                    if (mDesc) mDesc.style.paddingTop = "14px";
                                    let mDesc2 = outerDiv.querySelector('.media_desc.im-mess--inline-fwd') as HTMLElement;
                                    if (mDesc2) mDesc2.style.paddingTop = "8px";
                                    addPreventDefaultListener(attaches);
                                    attaches.innerHTML = outerDiv.innerHTML;
                                }
                                if (fwd) {
                                    fwd.classList.add('im-mess--text');
                                    let mDesc = outerDiv.querySelector('.media_desc:not(.im-mess--inline-fwd)') as HTMLElement;
                                    if (mDesc) mDesc.style.paddingTop = "14px";
                                    let mDesc2 = outerDiv.querySelector('.media_desc.im-mess--inline-fwd') as HTMLElement;
                                    if (mDesc2) mDesc2.style.paddingTop = "8px";
                                    if (fwd.parentElement) {
                                        addPreventDefaultListener(fwd.parentElement);
                                        fwd.parentElement.innerHTML = outerDiv.innerHTML;
                                    }
                                    else {
                                        addPreventDefaultListener(fwd);
                                        fwd.innerHTML = outerDiv.innerHTML;
                                    }
                                }
                                if (gift) {
                                    gift.innerHTML = outerDiv.innerHTML;
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