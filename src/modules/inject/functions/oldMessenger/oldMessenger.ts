import getLocalValue from "../../getLocalValue";
import createStyle from "../classicalProfile/scripts/createStyle";
import getOldDialogsStyle from "./getOldDialogsStyle";
import getSwitchInterface from "./getSwitchInterface";

const oldMessenger = () => {
    if (getLocalValue('oldMessengerDes') === true) {
        createStyle('oldDialogs', getOldDialogsStyle());
        document.arrive('.ConvoMessageInfoWithoutBubbles', { existing: true }, function (e) {
            let time = e as HTMLDivElement;
            let messageAuthorLink = time.closest('.ConvoMessageWithoutBubble__wrapper')?.querySelector('.ConvoMessageHeader__sentFromInfo');
            messageAuthorLink?.append(time);
        });
    
        document.arrive('.ConvoList__footer', { existing: true }, function (e) {
            let convoFooterSettingsButton = document.querySelector('.vkmListHeader__before:has(>.ConvoList__burger)')!;
            let convoFooterNew = convoFooterSettingsButton.cloneNode();
            e.append(convoFooterNew);
        });

        document.arrive('.vkEnhancerCounterOfMessages', { existing: true }, function (e) {
            let footer = document.querySelector('.ConvoList__footer');
            footer?.append(e);
        });

        document.arrive('.ConvoHeader__avatar', { existing: true }, function (e) {
            let header = e.closest('.ConvoHeader');
            let avatar = e as HTMLDivElement;

            let convoHeaderInfo = document.querySelector('.ConvoHeader__info') as HTMLAnchorElement;
            if (convoHeaderInfo.href)
                avatar.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(convoHeaderInfo.href);
                })
            avatar.style.paddingLeft = "16px";
            avatar.style.cursor = "pointer";
            header?.append(avatar);
        });

        /*document.arrive('.ConvoListItem__date', { existing: true }, async function (e) {
            let span = e.querySelector('span') as HTMLSpanElement;
            if (span.textContent) span.textContent = span.textContent.slice(1);
        });*/

        document.arrive(".ConvoHeader__action.ConvoHeader__back", { existing: true }, function (e) {
            let inner = e as HTMLButtonElement;
            inner.style.width = "auto";
            inner.innerHTML = `<div class="im-page--back" style=""> <a class="vkToolsBack"> <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.88 18.12a1.25 1.25 0 0 1-1.76 1.76l-7-7a1.25 1.25 0 0 1 0-1.76l7-7a1.25 1.25 0 0 1 1.76 1.76L9.77 12z" fill="currentColor"></path></svg> Назад </a> </div>`;
        });

        document.arrive(".BurgerMenu__actionsMenu > div > div > div", { existing: true }, function (e) {
            let burgerim = e;

            const changeDesign = document.createElement("button");
            changeDesign.classList.add("ActionsMenuAction", "ActionsMenuAction--secondary", "ActionsMenuAction--size-regular");
            const isCentralDesign = vk.pe.vkm_reforged_in_vkcom_for_classic_interface === 1 ? true : false;

            const newInterfaceSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M4.01 2.53C4.66 2.18 5.31 2 7.08 2h5.84c1.77 0 2.42.18 3.07.53.64.34 1.14.84 1.48 1.48.35.65.53 1.3.53 3.07v5.84c0 1.77-.18 2.42-.53 3.07A3.57 3.57 0 0116 17.47c-.65.35-1.3.53-3.07.53H7.08c-1.77 0-2.42-.18-3.07-.53A3.57 3.57 0 012.53 16c-.35-.65-.53-1.3-.53-3.07V7.08c0-1.77.18-2.42.53-3.07.34-.64.84-1.14 1.48-1.48zm11.27 13.62c-.34.18-.7.35-2.36.35H9v-13h3.92c1.66 0 2.02.17 2.36.35.38.2.67.5.87.87.18.34.35.7.35 2.36v5.84c0 1.66-.17 2.02-.35 2.36-.2.38-.5.67-.87.87zM7.08 3.5c-1.66 0-2.02.17-2.36.35-.38.2-.67.5-.87.87-.18.34-.35.7-.35 2.36v5.84c0 1.66.17 2.02.35 2.36.2.38.5.67.87.87.34.18.7.35 2.36.35h.42v-13h-.42z"/></svg>';
            const classicInterfaceSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path d="M7.08 3.5c-1.66 0-2.02.17-2.36.35-.38.2-.67.5-.87.87-.18.34-.35.7-.35 2.36v5.84c0 1.66.17 2.02.35 2.36.2.38.5.67.87.87.34.18.7.35 2.36.35h5.84c1.66 0 2.02-.17 2.36-.35.38-.2.67-.5.87-.87.18-.34.35-.7.35-2.36V7.08c0-1.66-.17-2.02-.35-2.36-.2-.38-.5-.67-.87-.87-.34-.18-.7-.35-2.36-.35H7.08zm-3.07-.97C4.66 2.18 5.31 2 7.08 2h5.84c1.77 0 2.42.18 3.07.53.64.34 1.14.84 1.48 1.48.35.65.53 1.3.53 3.07v5.84c0 1.77-.18 2.42-.53 3.07A3.57 3.57 0 0116 17.47c-.65.35-1.3.53-3.07.53H7.08c-1.77 0-2.42-.18-3.07-.53A3.57 3.57 0 012.53 16c-.35-.65-.53-1.3-.53-3.07V7.08c0-1.77.18-2.42.53-3.07.34-.64.84-1.14 1.48-1.48z"/><path d="M13.5 11.55a2.15 2.15 0 01-.85 1.8c-.3.23-.64.4-1 .5-.37.1-.83.15-1.4.15H7V6h2.87c.6 0 1.05.02 1.35.07.31.04.6.14.87.28.3.15.51.36.65.62.15.25.22.55.22.89 0 .39-.1.74-.3 1.04-.2.3-.47.53-.82.67v.05c.5.1.9.31 1.2.64.3.31.46.75.46 1.29zm-2.61-3.29a.88.88 0 00-.1-.4.6.6 0 00-.32-.3c-.13-.05-.3-.08-.48-.08l-.82-.01h-.14v1.69h.26l.73-.01c.14 0 .29-.05.43-.11a.65.65 0 00.34-.32c.06-.13.1-.28.1-.46zm.5 3.25a.97.97 0 00-.14-.58.93.93 0 00-.46-.31c-.13-.05-.3-.08-.52-.08l-.86-.01h-.38v2H10.24c.2-.01.41-.06.62-.15a.8.8 0 00.4-.35c.1-.15.14-.32.14-.52z"/></svg>';
            const designText = isCentralDesign === true ? getSwitchInterface(vk.lang)[0] : getSwitchInterface(vk.lang)[1];
            const designSVG = isCentralDesign === true ? newInterfaceSVG : classicInterfaceSVG;
            changeDesign.innerHTML = `<i class="ActionsMenuAction__icon">${designSVG}</i><span class="ActionsMenuAction__title">${designText}</span>`;
            changeDesign.addEventListener('click', async () => {
                vkApi.api('messages.setConfig', {
                    config: JSON.stringify({
                        reforged_enabled: isCentralDesign === true ? 'enabled' : 'disabled'
                    })
                }).then(() => {
                    window.location.reload();
                });
            });
            burgerim.append(changeDesign);

        });

        document.arrive('#archive[class^="vkitRightMenuItem"]', { existing: true }, async function (e) {
            let div = e.querySelector('[class^="vkitRightMenuItem__content"]');
            if (div?.textContent) div.textContent = IMLang.keys.me_convo_list_important_messages || 'Важные сообщения';
            div?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.stManager.add(["im.css", "page.css", "post.css", window.jsc("web/imn.js"), window.jsc("web/sorter.js")])
                showTabbedBox("al_im.php", { act: "a_important", offset: "0", gid: 0 }, { params: { width: 638 } })
            });
        })

        document.arrive('.ConvoList__topMenu', { existing: true }, async function (e) {
            let topMenu = e;

            let importantMessagesButton = document.createElement('button');
            importantMessagesButton.classList.add('vkmListHeader__button', 'ConvoList__topMenuAction');
            importantMessagesButton.style.width = "auto";
            importantMessagesButton.style.padding = "4px";

            let importantMessagesButtonLabel = document.createElement('span');
            importantMessagesButtonLabel.classList.add('vkToolsImportantMessagesCounter');
            let importantMessagesCount = await vkApi.api('messages.getImportantMessages', { count: 0 });
            if (importantMessagesCount.messages.count > 0) {
                importantMessagesButtonLabel.textContent = importantMessagesCount.messages.count;
            }
        
            let importantMessagesButtonSVG = document.createElement('div');
            importantMessagesButtonSVG.classList.add('vkToolsIconImportant24');
            importantMessagesButtonSVG.style.scale = '.85';
            importantMessagesButtonSVG.innerHTML = `<svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3435 8.48495L19.773 8.90993C21.3143 9.0578 21.787 10.5634 20.5968 11.5525L17.129 14.4347L18.4164 19.13C18.8391 20.6719 17.5275 21.6053 16.2137 20.6773L12 17.701L7.78631 20.6773C6.47785 21.6016 5.16081 20.6721 5.58365 19.13L6.87104 14.4347L3.40318 11.5525C2.20801 10.5592 2.67885 9.05846 4.22675 8.90993L8.65551 8.48495L10.6067 3.98631C11.2177 2.57751 12.7826 2.57822 13.3932 3.98645L15.3435 8.48495Z" fill="currentColor"></path></svg>`;
            importantMessagesButton.addEventListener('click', () => {
                window.stManager.add(["im.css", "page.css", "post.css", window.jsc("web/imn.js"), window.jsc("web/sorter.js")])
                showTabbedBox("al_im.php", { act: "a_important", offset: "0", gid: 0 }, { params: { width: 638 } })
            });
            importantMessagesButton.append(importantMessagesButtonSVG, importantMessagesButtonLabel);
            topMenu?.prepend(importantMessagesButton);
        });
    }
}

export default oldMessenger;