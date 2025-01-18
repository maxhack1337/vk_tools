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
            let idMess;
            try {
                idMess = lastMessage.items[0].id;
            } catch (error) {
                idMess = 0;
            }
            countermsg.innerHTML = `<div role="button" tabindex="0" class="ConvoListFilter">
  <div class="ConvoListFilter__icons">
  <i role="img" style="height:20px;" class="vkEnIconWatn ConvoListFilter__icon">
  <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--work_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;">
  <use xlink:href="#null" style="fill: currentcolor;">
  </use>
  </svg>
  </i>
  </div>
  <span class="ConvoListFilter__text">
  ${getCounterLang(vk.lang)}
  </span>
  <div role="img" class="vkEnIconWatnCount ConvoListFilter__counter UnreadCounter UnreadCounter--size-18">
  ${idMess}
  </div>
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

            let iconn = countermsg.querySelector(".vkEnIconWatn");
            let counterColor = countermsg.querySelector(".vkEnIconWatnCount") as HTMLElement;;
            if (counterColor) counterColor.style.backgroundColor = "var(--vkui--color_icon_secondary)";
            if (idMess < 10000000) {
                if (iconn) iconn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2803 8.78033C13.5732 8.48744 13.5732 8.01256 13.2803 7.71967C12.9874 7.42678 12.5126 7.42678 12.2197 7.71967L9 10.9393L7.78033 9.71967C7.48744 9.42678 7.01256 9.42678 6.71967 9.71967C6.42678 10.0126 6.42678 10.4874 6.71967 10.7803L8.46967 12.5303C8.76256 12.8232 9.23744 12.8232 9.53033 12.5303L13.2803 8.78033Z" fill="#219653"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10ZM17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" fill="#219653"/>
</svg>
`;
                if (countermsg) {
                    const convoListFilter = countermsg.querySelector(".ConvoListFilter");
                    if (convoListFilter) {
                        convoListFilter.setAttribute(
                            `onclick`,
                            `showFastBox(getLang("me_convo_profile_info"), "${getTextTTNum(vk.lang)[0]}", getLang("global_close"));`
                        );
                    }
                }
            } else if (idMess < 14000000) {
                if (iconn) iconn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14Z" fill="#F2994A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3757 3.36327C12.2181 3.09234 11.4897 2.00101 9.99924 2.00101C8.50879 2.00101 7.79028 3.07794 7.62431 3.36327L1.52311 13.8521C1.11213 14.5586 1.03548 15.4106 1.31378 16.179C1.70981 17.2725 2.74912 18.001 3.91316 18.001H16.0868C17.2509 18.001 18.2902 17.2725 18.6862 16.179C18.9645 15.4106 18.8879 14.5586 18.4769 13.8521L12.3757 3.36327ZM16.0868 16.5025C16.6192 16.5025 17.0946 16.1693 17.2757 15.6692C17.403 15.3178 17.3679 14.9281 17.18 14.6049L11.0788 4.11615C11.0788 4.11615 10.7499 3.49487 9.99921 3.49487C9.24848 3.49487 8.92124 4.11615 8.92124 4.11615L2.82003 14.6049C2.63207 14.9281 2.59701 15.3178 2.72429 15.6692C2.90543 16.1693 3.38077 16.5025 3.91316 16.5025H16.0868Z" fill="#F2994A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 6.00003C10.4142 6.00003 10.7499 6.33582 10.7499 6.75003V11.25C10.7499 11.6642 10.4142 12 9.99994 12C9.58573 12 9.24994 11.6642 9.24994 11.25V6.75003C9.24994 6.33582 9.58573 6.00003 9.99994 6.00003Z" fill="#F2994A"/>
</svg>
`;
                if (countermsg) {
                    const convoListFilter = countermsg.querySelector(".ConvoListFilter");
                    if (convoListFilter) {
                        convoListFilter.setAttribute(
                            `onclick`,
                            `showFastBox(getLang("global_warning"), "${getTextTTNum(vk.lang)[1]
                            }", getLang("me_invite_link_qr_download"), (()=>{window.open('https://vk.com/data_protection?section=rules&scroll_to_archive=1', '_blank'); }), getLang("box_cancel"));`
                        );
                    }
                }
            } else if (idMess < 15000000) {
                if (iconn) iconn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14Z" fill="#EB5757"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3757 3.36327C12.2181 3.09234 11.4897 2.00101 9.99924 2.00101C8.50879 2.00101 7.79028 3.07794 7.62431 3.36327L1.52311 13.8521C1.11213 14.5586 1.03548 15.4106 1.31378 16.179C1.70981 17.2725 2.74912 18.001 3.91316 18.001H16.0868C17.2509 18.001 18.2902 17.2725 18.6862 16.179C18.9645 15.4106 18.8879 14.5586 18.4769 13.8521L12.3757 3.36327ZM16.0868 16.5025C16.6192 16.5025 17.0946 16.1693 17.2757 15.6692C17.403 15.3178 17.3679 14.9281 17.18 14.6049L11.0788 4.11615C11.0788 4.11615 10.7499 3.49487 9.99921 3.49487C9.24848 3.49487 8.92124 4.11615 8.92124 4.11615L2.82003 14.6049C2.63207 14.9281 2.59701 15.3178 2.72429 15.6692C2.90543 16.1693 3.38077 16.5025 3.91316 16.5025H16.0868Z" fill="#EB5757"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 6.00003C10.4142 6.00003 10.7499 6.33582 10.7499 6.75003V11.25C10.7499 11.6642 10.4142 12 9.99994 12C9.58573 12 9.24994 11.6642 9.24994 11.25V6.75003C9.24994 6.33582 9.58573 6.00003 9.99994 6.00003Z" fill="#EB5757"/>
</svg>
`;
                if (countermsg) {
                    const convoListFilter = countermsg.querySelector(".ConvoListFilter");
                    if (convoListFilter) {
                        convoListFilter.setAttribute(
                            `onclick`,
                            `showFastBox(getLang("global_warning"), "${getTextTTNum(vk.lang)[2]
                            }", getLang("me_invite_link_qr_download"), (()=>{window.open('https://vk.com/data_protection?section=rules&scroll_to_archive=1', '_blank'); }), getLang("box_cancel"));`
                        );
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
