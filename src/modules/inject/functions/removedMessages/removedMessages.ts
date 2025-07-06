/* eslint-disable no-sequences */
import fromId from "../../../content/fromId";
import create from "../../create";
import deferredCallback from "../../defferedCallback";
import getLocalValue from "../../getLocalValue";
import runMessageUpdate from "../oldMessenger/oldAttaches/runMessageUpdate";
import getGroupIdFromUrl from "./getGroupIdFromUrl";
import getMessageProps from "./getMessageProps";
import getMessagePropsMin from "./getMessagePropsMin";
const removedMessages = () => {
  document.arrive(
    ".ConvoHistory__messageBlock",
    {
      existing: true,
    },
    async function (e) {
      try {
        let isGim = Boolean(document?.querySelector(".ConvoList__headerGroup"));
        let currentProps = getMessageProps(e as HTMLElement);
        let params: any = {
          peer_id: currentProps[1],
          conversation_message_ids: currentProps[0],
        };
        if (isGim) params.group_id = getGroupIdFromUrl();
        let ph = await vkApi.api("messages.getByConversationMessageId", params);
        if (ph.count === 0) {
          e.classList.add("vkEnhancerDeletedMessageMain");
          const appendHere = e.querySelector(".ConvoMessageBottomInfo,.ConvoMessage__info");
          if (appendHere) {
            const customStyle = fromId("DeletedMessageTT");
            if (customStyle) {
              customStyle.remove();
            }
            const spanDeleted = document.createElement("span");
            spanDeleted.setAttribute("onmouseover", `showTooltip(this, { text: '${getLang?.("mail_deleted_stop")}', black: true, shift: [12, 5] });`);
            spanDeleted.classList.add("vkEnhancerDeletedMessage");
            spanDeleted.style.width = "16px";
            spanDeleted.style.height = "16px";
            spanDeleted.style.margin = "4px";
            spanDeleted.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7782 18.7782C23.0739 14.4824 23.0739 7.51761 18.7782 3.22184C14.4824 -1.07393 7.51759 -1.07393 3.22183 3.22184C-1.07394 7.51761 -1.07394 14.4824 3.22183 18.7782C7.51759 23.074 14.4824 23.074 18.7782 18.7782ZM12.4142 11L15.2426 13.8284C15.6332 14.219 15.6332 14.8521 15.2426 15.2427C14.8521 15.6332 14.219 15.6332 13.8284 15.2427L11 12.4142L8.17157 15.2427C7.78105 15.6332 7.14788 15.6332 6.75736 15.2427C6.36683 14.8521 6.36684 14.219 6.75736 13.8284L9.58579 11L6.75736 8.17159C6.36684 7.78106 6.36684 7.1479 6.75736 6.75737C7.14788 6.36685 7.78105 6.36685 8.17157 6.75737L11 9.5858L13.8284 6.75737C14.219 6.36685 14.8521 6.36685 15.2426 6.75737C15.6332 7.1479 15.6332 7.78106 15.2426 8.17159L12.4142 11Z" fill="#E64646"/>
</svg>`;
            appendHere.append(spanDeleted);
          }
          const appendHere1 = e.querySelector(".ConvoMessageInfoWithoutBubbles");
          if (appendHere1) {
            let styleElement = fromId("DeletedMessageTT");
            if (!styleElement) {
              styleElement = create(
                "style",
                {},
                {
                  id: "DeletedMessageTT",
                }
              );
              document.head.appendChild(styleElement);
            }
            styleElement.innerHTML = `.ConvoMessageWithoutBubble__wrapper .tt_w:after{display:none;}`;
            const divDeleted = document.createElement("div");
            divDeleted.setAttribute("onmouseover", `showTooltip(this, { text: '${getLang?.("mail_deleted_stop")}', black: true, shift: [52, 5] });`);
            divDeleted.classList.add("vkEnhancerDeletedMessageWithoutBubbles");
            divDeleted.style.width = "16px";
            divDeleted.style.height = "16px";
            divDeleted.style.margin = "4px";
            divDeleted.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7782 18.7782C23.0739 14.4824 23.0739 7.51761 18.7782 3.22184C14.4824 -1.07393 7.51759 -1.07393 3.22183 3.22184C-1.07394 7.51761 -1.07394 14.4824 3.22183 18.7782C7.51759 23.074 14.4824 23.074 18.7782 18.7782ZM12.4142 11L15.2426 13.8284C15.6332 14.219 15.6332 14.8521 15.2426 15.2427C14.8521 15.6332 14.219 15.6332 13.8284 15.2427L11 12.4142L8.17157 15.2427C7.78105 15.6332 7.14788 15.6332 6.75736 15.2427C6.36683 14.8521 6.36684 14.219 6.75736 13.8284L9.58579 11L6.75736 8.17159C6.36684 7.78106 6.36684 7.1479 6.75736 6.75737C7.14788 6.36685 7.78105 6.36685 8.17157 6.75737L11 9.5858L13.8284 6.75737C14.219 6.36685 14.8521 6.36685 15.2426 6.75737C15.6332 7.1479 15.6332 7.78106 15.2426 8.17159L12.4142 11Z" fill="#E64646"/>
</svg>`;
            appendHere1.prepend(divDeleted);
          }
        }
      } catch (error) {}
    }
  );
  deferredCallback(
    () => {
      MECommonContext.then((e) => {
        const n = e.engine.fetchMaster;
        e.engine.fetchMaster = async function (...e: any) {
          const l = await n.apply(this, e);
          let mess = [];
          for (const e of l.updates) {
            const [n] = e;
            switch (n) {
              case 10002: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [, t, n, o] = e;
                if (n > 10000) {
                  document.querySelectorAll(".ConvoHistory__messageBlock").forEach((se) => {
                    if (getMessagePropsMin(se as HTMLElement) === e[1]) {
                      se.classList.add("vkEnhancerDeletedMessageMain");
                      const appendHere = se.querySelector(".ConvoMessageBottomInfo,.ConvoMessage__info");
                      if (appendHere) {
                        const customStyle = fromId("DeletedMessageTT");
                        if (customStyle) {
                          customStyle.remove();
                        }
                        const spanDeleted = document.createElement("span");
                        spanDeleted.setAttribute("onmouseover", `showTooltip(this, { text: '${getLang?.("mail_deleted_stop")}', black: true, shift: [12, 5] });`);
                        spanDeleted.classList.add("vkEnhancerDeletedMessage");
                        spanDeleted.style.width = "16px";
                        spanDeleted.style.height = "16px";
                        spanDeleted.style.margin = "4px";
                        spanDeleted.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.7782 18.7782C23.0739 14.4824 23.0739 7.51761 18.7782 3.22184C14.4824 -1.07393 7.51759 -1.07393 3.22183 3.22184C-1.07394 7.51761 -1.07394 14.4824 3.22183 18.7782C7.51759 23.074 14.4824 23.074 18.7782 18.7782ZM12.4142 11L15.2426 13.8284C15.6332 14.219 15.6332 14.8521 15.2426 15.2427C14.8521 15.6332 14.219 15.6332 13.8284 15.2427L11 12.4142L8.17157 15.2427C7.78105 15.6332 7.14788 15.6332 6.75736 15.2427C6.36683 14.8521 6.36684 14.219 6.75736 13.8284L9.58579 11L6.75736 8.17159C6.36684 7.78106 6.36684 7.1479 6.75736 6.75737C7.14788 6.36685 7.78105 6.36685 8.17157 6.75737L11 9.5858L13.8284 6.75737C14.219 6.36685 14.8521 6.36685 15.2426 6.75737C15.6332 7.1479 15.6332 7.78106 15.2426 8.17159L12.4142 11Z" fill="#E64646"/></svg>`;
                        appendHere.append(spanDeleted);
                      }
                      const appendHere1 = se.querySelector(".ConvoMessageInfoWithoutBubbles");
                      if (appendHere1) {
                        let styleElement = fromId("DeletedMessageTT");
                        if (!styleElement) {
                          styleElement = create(
                            "style",
                            {},
                            {
                              id: "DeletedMessageTT",
                            }
                          );
                          document.head.appendChild(styleElement);
                        }
                        styleElement.innerHTML = `.ConvoMessageWithoutBubble__wrapper .tt_w:after{display:none;}`;
                        const divDeleted = document.createElement("div");
                        divDeleted.setAttribute("onmouseover", `showTooltip(this, { text: '${getLang?.("mail_deleted_stop")}', black: true, shift: [52, 5] });`);
                        divDeleted.classList.add("vkEnhancerDeletedMessageWithoutBubbles");
                        divDeleted.style.width = "16px";
                        divDeleted.style.height = "16px";
                        divDeleted.style.margin = "4px";
                        divDeleted.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.7782 18.7782C23.0739 14.4824 23.0739 7.51761 18.7782 3.22184C14.4824 -1.07393 7.51759 -1.07393 3.22183 3.22184C-1.07394 7.51761 -1.07394 14.4824 3.22183 18.7782C7.51759 23.074 14.4824 23.074 18.7782 18.7782ZM12.4142 11L15.2426 13.8284C15.6332 14.219 15.6332 14.8521 15.2426 15.2427C14.8521 15.6332 14.219 15.6332 13.8284 15.2427L11 12.4142L8.17157 15.2427C7.78105 15.6332 7.14788 15.6332 6.75736 15.2427C6.36683 14.8521 6.36684 14.219 6.75736 13.8284L9.58579 11L6.75736 8.17159C6.36684 7.78106 6.36684 7.1479 6.75736 6.75737C7.14788 6.36685 7.78105 6.36685 8.17157 6.75737L11 9.5858L13.8284 6.75737C14.219 6.36685 14.8521 6.36685 15.2426 6.75737C15.6332 7.1479 15.6332 7.78106 15.2426 8.17159L12.4142 11Z" fill="#E64646"/></svg>`;
                        appendHere1.prepend(divDeleted);
                      }
                    }
                  });
                } else {
                  mess.push(e);
                }
                break;
              }
              case 10019: {
                mess.push(e);
                break;
              }
              case 10005: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [, t, n, o] = e;
                mess.push(e);
                if (getLocalValue("oldMessengerAttaches")) {
                  setTimeout(() => runMessageUpdate(t, o), 1000);
                }
                break;
              }
              default: {
                mess.push(e);
                break;
              }
            }
            //console.log(store.getState(),e)
          }
          return (l.updates = mess), l;
        };
      });
    },
    {
      variable: "MECommonContext",
    }
  );
};
export default removedMessages;
