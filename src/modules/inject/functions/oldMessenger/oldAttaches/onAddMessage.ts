import getPeerProps from "../../convoButtons/getPeerProps";
import addPreventDefaultListener from "./addPreventDefaultListener";
import extractPeerId from "./extractPeerId";

const onAddMessage = async (message: HTMLElement) => {
  let attaches = message.querySelector('[class^="ConvoMessageWithoutBubble__"] > .Attachments') as HTMLElement;
  let gift = message.querySelector(".AttachGift") as HTMLElement;
  let fwd = message.querySelector(".ForwardedMessagesList") as HTMLElement;
  let story = message.querySelector(".AttachStory") as HTMLElement;
  let vidMsg = message.querySelector(".ConvoMessageWithoutBubble__videoMessage") as HTMLElement;
  if (gift || attaches || fwd || story || vidMsg) {
    let memoizedPeer: number;
    try {
      memoizedPeer = getPeerProps(document.querySelector(".ConvoHeader")!).peer.id;
    } catch (e) {
      memoizedPeer = extractPeerId(window.location.href) || 1;
    }
    let diff = window.vkenh.messagesDiff;
    let history = window.vkenh.messagesHistory;
    let sentMessages = window.vkenh.messagesSent;

    let findCurrMessagesFromPeerDiff = diff.length > 0 ? diff.find((item: any) => item.peer_id === memoizedPeer)?.messages : null;
    let findCurrMessagesFromPeerHistory = history.length > 0 ? history.filter((item: any) => item.peer_id === memoizedPeer) : null;
    let findCurrMessagesFromPeerSent = sentMessages.length > 0 ? sentMessages.filter((item: any) => item.peer_id === memoizedPeer) : null;

    if (findCurrMessagesFromPeerHistory) {
      let combinedMessages = findCurrMessagesFromPeerHistory.reduce((acc: any, curr: any) => {
        return acc.concat(curr.messages);
      }, []);

      findCurrMessagesFromPeerHistory = combinedMessages;
    }

    if (findCurrMessagesFromPeerSent) {
      let combinedMessages = findCurrMessagesFromPeerSent.reduce((acc: any, curr: any) => {
        return acc.concat(curr.messages);
      }, []);

      findCurrMessagesFromPeerSent = combinedMessages;
    }

    let cmidsToIdsObj: any = {};
    if (findCurrMessagesFromPeerDiff) {
      findCurrMessagesFromPeerDiff.forEach((message: any) => {
        cmidsToIdsObj[message.conversation_message_id] = message.id;
      });
    }
    if (findCurrMessagesFromPeerHistory) {
      findCurrMessagesFromPeerHistory.forEach((message: any) => {
        cmidsToIdsObj[message.conversation_message_id] = message.id;
      });
    }
    if (findCurrMessagesFromPeerSent) {
      findCurrMessagesFromPeerSent.forEach((message: any) => {
        cmidsToIdsObj[message.cmid] = message.message_id;
      });
    }

    let cmidCur = message.getAttribute("data-itemkey") || "";
    let outerDiv = document.createElement("div");
    outerDiv.className = "vkToolsBrowseAllImages";
    let cmidToAjax = 0;
    if (cmidsToIdsObj[cmidCur]) {
      cmidToAjax = cmidsToIdsObj[cmidCur];
    } else {
      let vkApiAwaitMsgId = await vkApi.api("messages.getById", {
        cmids: message.getAttribute("data-itemkey"),
        peer_id: memoizedPeer,
      });
      cmidToAjax = vkApiAwaitMsgId.items?.at(0)?.id;
    }
    ajax.post(
      "al_im.php",
      {
        act: "a_get_media",
        al: 1,
        id: cmidToAjax,
        im_v: 3,
      },
      {
        onDone: (response: any) => {
          try {
            outerDiv.innerHTML = response[1];
            if (attaches && fwd) {
              attaches.classList.add("im-mess--text", "im-vktools-custom");
              if (fwd.parentElement) {
                fwd.parentElement.style.display = "none";
              } else {
                fwd.style.display = "none";
              }
              addPreventDefaultListener(attaches);
              attaches.innerHTML = outerDiv.innerHTML;
            } else if (attaches) {
              attaches.classList.add("im-mess--text", "im-vktools-custom");
              addPreventDefaultListener(attaches);
              attaches.innerHTML = outerDiv.innerHTML;
            } else if (fwd) {
              if (fwd.parentElement) {
                fwd.parentElement.classList.add("im-mess--text", "im-vktools-custom");
                addPreventDefaultListener(fwd.parentElement);
                fwd.parentElement.innerHTML = outerDiv.innerHTML;
              } else {
                fwd.classList.add("im-mess--text", "im-vktools-custom");
                addPreventDefaultListener(fwd);
                fwd.innerHTML = outerDiv.innerHTML;
              }
            } else if (gift) {
              gift.classList.add("im-vktools-custom");
              gift.innerHTML = outerDiv.innerHTML;
            } else if (story) {
              story.classList.add("im-vktools-custom");
              story.innerHTML = outerDiv.innerHTML;
            } else if (vidMsg) {
              vidMsg.classList.add("im-vktools-custom");
              vidMsg.innerHTML = outerDiv.innerHTML;
            }
          } catch (error) {
            console.error("[VK Tools Error] Error parsing JSON or accessing payload:", error);
          }
        },
      }
    );
  }
};

export default onAddMessage;
