import getAllChatsMsg from "./getAllChatsMsg";
import getAllMsgLang from "./getAllMsgLang";
import getCounterLang from "./getCounterLang";
import getTextTTNum from "./getTextTTNum";

const messageCounter = () => {
    document.arrive(
        ".ConvoList__scrollbar-content",
        { existing: true },
        async function lyagushka(e: Element) {
            let countermsg = document.createElement("div");
            countermsg.classList.add("ConvoList__topFiltersWrap");
            countermsg.classList.add("vkEnhancerCounterOfMessages");
            let lastMessage = await vkApi.api("messages.search", { q: "#", count: 1 });
            let idMess = 0;
            try {
                idMess = lastMessage.items[0].id;
            } catch (error) {
                idMess = 0;
            }
            let chats = await vkApi.api('messages.getConversations', {});
            let chatsCount = chats.count;
            countermsg.innerHTML = `<div role="button" tabindex="0" class="ConvoListFilter">
  <div class="ConvoListFilter__icons">
  <i role="img" style="height:20px;" class="vkEnIconWatn ConvoListFilter__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M9.99989 1.42859C14.7338 1.42859 18.5713 5.26615 18.5713 10C18.5713 14.7339 14.7338 18.5714 9.99989 18.5714C5.26603 18.5714 1.42847 14.7339 1.42847 10C1.42847 5.26615 5.26603 1.42859 9.99989 1.42859ZM9.99989 2.85716C6.055 2.85716 2.85704 6.05513 2.85704 10C2.85704 13.9449 6.055 17.1429 9.99989 17.1429C13.9448 17.1429 17.1428 13.9449 17.1428 10C17.1428 6.05513 13.9448 2.85716 9.99989 2.85716ZM10.0525 8.57145C10.2222 8.57145 10.3287 8.59797 10.4219 8.64777C10.515 8.69757 10.5881 8.77065 10.6379 8.86378C10.6877 8.9569 10.7142 9.06343 10.7142 9.23315V13.624C10.7142 13.7937 10.6877 13.9003 10.6379 13.9934C10.5881 14.0865 10.515 14.1596 10.4219 14.2094C10.3287 14.2592 10.2222 14.2857 10.0525 14.2857H9.94731C9.7776 14.2857 9.67106 14.2592 9.57794 14.2094C9.48482 14.1596 9.41174 14.0865 9.36193 13.9934C9.31213 13.9003 9.28561 13.7937 9.28561 13.624V9.23315C9.28561 9.06343 9.31213 8.9569 9.36193 8.86378C9.41174 8.77065 9.48482 8.69757 9.57794 8.64777C9.67106 8.59797 9.7776 8.57145 9.94731 8.57145H10.0525ZM9.99989 5.42859C10.5522 5.42859 10.9999 5.8763 10.9999 6.42859C10.9999 6.98087 10.5522 7.42859 9.99989 7.42859C9.44761 7.42859 8.9999 6.98087 8.9999 6.42859C8.9999 5.8763 9.44761 5.42859 9.99989 5.42859Z" fill="#2688EB"/>
</svg>
  </i>
  </div>
  <span class="ConvoListFilter__text">
  ${getCounterLang(vk.lang)}
  </span>
  <div id="vkEnhancerRebootMessageCounter" style="
    scale: .85;
    margin-left: 8px;
	margin-top: 2px;
">
  <a class="vkEnhancerRebootMessageCounter">
    <div class="vkEnhancerRebootMessageCounter__inner">
      <div style="scale: 0.75; color: var(--vkui--color_icon_secondary);" class="vkEnhancerRebootMessageCounter__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="currentColor">
          <path d="M11.7422 3.21838C10.1412 2.65442 8.40531 2.59833 6.77131 3.05777C5.66909 3.36769 4.64943 3.902 3.7732 4.62084H4.87502C5.49634 4.62084 6.00002 5.12452 6.00002 5.74584C6.00002 6.36716 5.49634 6.87084 4.87502 6.87084L1.70519 6.87085C1.61913 6.87091 1.49731 6.871 1.38711 6.86199C1.25501 6.8512 1.04417 6.82206 0.819035 6.70735C0.536792 6.56354 0.307321 6.33407 0.163511 6.05182C0.0487986 5.82669 0.0196589 5.61585 0.00886567 5.48375C-0.000138422 5.37354 -5.10709e-05 5.25173 1.07093e-05 5.16567L2.03652e-05 2C2.03652e-05 1.37868 0.5037 0.875 1.12502 0.875C1.74634 0.875 2.25002 1.37868 2.25002 2V2.96111C3.38657 2.00587 4.71877 1.29764 6.16229 0.891762C8.24222 0.306941 10.4519 0.378336 12.4897 1.0962C14.5276 1.81406 16.2943 3.1434 17.5489 4.90275C18.8034 6.6621 19.4847 8.76577 19.4998 10.9267C19.5149 13.0876 18.863 15.2006 17.6331 16.9773C16.4033 18.754 14.6553 20.1079 12.6276 20.8541C10.6 21.6004 8.39155 21.7026 6.30367 21.1469C4.6601 20.7095 3.11556 19.8787 1.86301 18.7255C1.40593 18.3047 1.37655 17.5929 1.79739 17.1359C2.21824 16.6788 2.92994 16.6494 3.38703 17.0702C4.36132 17.9673 5.57811 18.6255 6.88238 18.9726C8.52263 19.4092 10.2576 19.3289 11.8505 18.7426C13.4435 18.1563 14.8168 17.0927 15.7831 15.6967C16.7495 14.3007 17.2617 12.6404 17.2498 10.9424C17.238 9.24439 16.7026 7.59142 15.7169 6.20907C14.7312 4.82672 13.3431 3.78234 11.7422 3.21838Z"></path>
        </svg>
      </div>
    </div>
  </a>
</div>
  </div>`;

            if (idMess < 10000000) {
                if (countermsg) {
                    const convoListFilter = countermsg.querySelector(".ConvoListFilter");
                    if (convoListFilter) {
                        convoListFilter.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            showFastBox(getLang?.("me_convo_profile_info"), `${getAllMsgLang(vk.lang)} ${idMess}<br>${getAllChatsMsg(vk.lang)} ${chatsCount}<br><br>${getTextTTNum(vk.lang)[0]}`, getLang?.("global_close"));
                        });
                    }
                }
            } else if (idMess < 14000000) {
                if (countermsg) {
                    const convoListFilter = countermsg.querySelector(".ConvoListFilter");
                    if (convoListFilter) {
                        convoListFilter.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            showFastBox(getLang?.("global_warning"), `${getAllMsgLang(vk.lang)} ${idMess}<br>${getAllChatsMsg(vk.lang)} ${chatsCount}<br><br>${getTextTTNum(vk.lang)[1]}`, getLang?.("me_invite_link_qr_download"), (()=>{window.open('https://vk.com/data_protection?section=rules&scroll_to_archive=1', '_blank'); }), getLang?.("box_cancel"));
                        });
                    }
                }
            } else if (idMess < 15000000) {
                if (countermsg) {
                    const convoListFilter = countermsg.querySelector(".ConvoListFilter");
                    if (convoListFilter) {
                        convoListFilter.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            showFastBox(getLang?.("global_warning"), `${getAllMsgLang(vk.lang)} ${idMess}<br>${getAllChatsMsg(vk.lang)} ${chatsCount}<br><br>${getTextTTNum(vk.lang)[2]}`, getLang?.("me_invite_link_qr_download"), (()=>{window.open('https://vk.com/data_protection?section=rules&scroll_to_archive=1', '_blank'); }), getLang?.("box_cancel"));
                        });
                    }
                }
            }
	
            if (countermsg) {
                const rebootMessageCounter = countermsg.querySelector("#vkEnhancerRebootMessageCounter");
                if (rebootMessageCounter) {
                    rebootMessageCounter.addEventListener("click",  (s) => {
                    s.preventDefault();
                    s.stopPropagation();
                    countermsg.remove();
                    lyagushka.call(this, e);
                });
}
      }
    e.prepend(countermsg);
  }
);
}

export default messageCounter;
