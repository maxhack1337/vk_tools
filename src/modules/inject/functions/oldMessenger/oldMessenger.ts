import createStyle from "../classicalProfile/scripts/createStyle";
import getOldDialogsStyle from "./getOldDialogsStyle";

const oldMessenger = () => {
    createStyle('oldDialogs',getOldDialogsStyle());
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
            showTabbedBox("al_im.php", {act: "a_important", offset: "0", gid: 0}, {params: {width: 638}})
        });
        importantMessagesButton.append(importantMessagesButtonSVG, importantMessagesButtonLabel);
        topMenu?.prepend(importantMessagesButton);
    });
}

export default oldMessenger;