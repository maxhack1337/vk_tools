console.log("VK Tools content script is running!");

function CheckToken() {
  if (window.location.href.indexOf('https://oauth.vk.com/blank.html') === -1) {
    location.href = 'https://oauth.vk.com/authorize?client_id=6121396&scope=196608&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1';
  }

  const closeButton = document.querySelector('.button_indent');
  if (closeButton) {
    closeButton.click();
  }
  const accessToken = new URLSearchParams(window.location.hash.slice(1)).get('access_token');
  if (accessToken) {
    console.log("Токен загружен успешно:", accessToken);
    chrome.runtime.sendMessage({
      type: 'vken_access_token',
      value: accessToken
    });
    window.location.href = "https://vk.com/feed";
  } else {
    console.log("Токен не найден в URL");
  }
}
var vkenAccessToken1 = '';

var isSecretCheck = false;
var isPostReact = false;
var isSecretEnabled = false;
var muteCallsBool = false;
var isCallsMuted = false;
var newDesignBool = false;
//NEW

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);
const fromId = document.getElementById.bind(document);

(async () => {
  await injectScript("js/modules/arrive.js");
  await injectScript("js/main.js");
  await injectScript("js/modules/hls.js");
  await injectScript("js/jszip.min.js");
  window.postMessage({ action: "Init" }, "*");
  window.postMessage(
    {
      action: "Urls",
      urls: { im_css: chrome.runtime.getURL("css/im-page-open.css"), profile_css: chrome.runtime.getURL("css/classical-profile-view.css") },
    },
    "*"
  );
  // Новый дизайн мессенджера
  chrome.storage.local.get(["newDesignState"], async ({ newDesignState }) => {
    if (newDesignState) {
      //console.log("Новый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesign" }, "*");
    } else {
      //console.log("Старый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesignOff" }, "*");
    }
  });
})();

window.addEventListener("vkNav", async (e) => {
  //console.log(e);
  chrome.storage.local.get(["newDesignState"], async ({ newDesignState }) => {
    if (newDesignState) {
      //console.log("Новый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesign" }, "*");
    } else {
      //console.log("Старый дизайн мессенджера");
      window.postMessage({ action: "vkNewDesignOff" }, "*");
    }
  });
});

function injectScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL(src);
    s.type = "module";
    s.onload = function () {
      this.remove();
      resolve();
    };
    (document.head || document.documentElement).appendChild(s);
  });
}

function create(name, styles, options) {
  let tmp = document.createElement(name);
  styles &&
    Object.keys(styles).forEach(
      (style_) => (tmp.style[style_] = styles[style_])
    );
  options &&
    Object.keys(options).forEach(
      (option_) => (tmp[option_] = options[option_])
    );
  return tmp;
}

//NEW

// Кнопка релоад функций
function createReloadButton() {
  const topNav = fromId("top_nav");
  if (!topNav) return;
  let styleElement = fromId("vkEnhButtonReload");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vkEnhButtonReload";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = "[scheme=vkcom_dark] .vkEnhancerRebootLoading > a > div > div{background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23939393%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M8%203.25a4.75%204.75%200%200%200-4.149%207.065.75.75%200%201%201-1.31.732A6.25%206.25%200%201%201%208%2014.25a.75.75%200%200%201%20.001-1.5%204.75%204.75%200%201%200%200-9.5Z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E%0A)}.vkEnhancerRebootLoading > a > div > div > svg{display:none;}.vkEnhancerRebootLoading > a > div > div{ display: inline-block; width: 28px; height: 28px; animation-name: round_spinner; animation-duration: 700ms; animation-iteration-count: infinite; animation-timing-function: linear; background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2399a2ad%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M8%203.25a4.75%204.75%200%200%200-4.149%207.065.75.75%200%201%201-1.31.732A6.25%206.25%200%201%201%208%2014.25a.75.75%200%200%201%20.001-1.5%204.75%204.75%200%201%200%200-9.5Z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E%0A); background-size: 28px; background-position: center; background-repeat: no-repeat }@keyframes round_spinner { 0% { transform: rotate(0deg) } to { transform: rotate(360deg) } }";
  const reloadButton = create(
    "li",
    {},
    {
      className: "HeaderNav__btns",
      id: "vkEnhancerReboot",
      innerHTML: `<a class="TopNavBtn"> <div class="TopNavBtn__inner"> <div style="scale: 0.75;" class="TopNavBtn__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="currentColor"><path d="M11.7422 3.21838C10.1412 2.65442 8.40531 2.59833 6.77131 3.05777C5.66909 3.36769 4.64943 3.902 3.7732 4.62084H4.87502C5.49634 4.62084 6.00002 5.12452 6.00002 5.74584C6.00002 6.36716 5.49634 6.87084 4.87502 6.87084L1.70519 6.87085C1.61913 6.87091 1.49731 6.871 1.38711 6.86199C1.25501 6.8512 1.04417 6.82206 0.819035 6.70735C0.536792 6.56354 0.307321 6.33407 0.163511 6.05182C0.0487986 5.82669 0.0196589 5.61585 0.00886567 5.48375C-0.000138422 5.37354 -5.10709e-05 5.25173 1.07093e-05 5.16567L2.03652e-05 2C2.03652e-05 1.37868 0.5037 0.875 1.12502 0.875C1.74634 0.875 2.25002 1.37868 2.25002 2V2.96111C3.38657 2.00587 4.71877 1.29764 6.16229 0.891762C8.24222 0.306941 10.4519 0.378336 12.4897 1.0962C14.5276 1.81406 16.2943 3.1434 17.5489 4.90275C18.8034 6.6621 19.4847 8.76577 19.4998 10.9267C19.5149 13.0876 18.863 15.2006 17.6331 16.9773C16.4033 18.754 14.6553 20.1079 12.6276 20.8541C10.6 21.6004 8.39155 21.7026 6.30367 21.1469C4.6601 20.7095 3.11556 19.8787 1.86301 18.7255C1.40593 18.3047 1.37655 17.5929 1.79739 17.1359C2.21824 16.6788 2.92994 16.6494 3.38703 17.0702C4.36132 17.9673 5.57811 18.6255 6.88238 18.9726C8.52263 19.4092 10.2576 19.3289 11.8505 18.7426C13.4435 18.1563 14.8168 17.0927 15.7831 15.6967C16.7495 14.3007 17.2617 12.6404 17.2498 10.9424C17.238 9.24439 16.7026 7.59142 15.7169 6.20907C14.7312 4.82672 13.3431 3.78234 11.7422 3.21838Z"/></svg> </div> </div> </a>`,
    }
  );
  reloadButton.setAttribute(
    "onmouseover",
    "showTooltip(this, { text: 'Перезагрузить функции VK Tools', black: true, shift: [4, 5] });"
  );
  reloadButton.addEventListener("click", (event) => {
    reloadButton.classList.add("vkEnhancerRebootLoading");
    chrome.storage.local.get(
      [ "garlandState",
	    "wideFeedState",
		"customLeftMenuObject",
		"messageFooterState",
		"messageCounterState",
	    "fixMenuState",
	    "oldBadgeState",
	    "defaultThemeState",
	    "tabletMenuState",
        "oldHoverState",
        "middleNameState",
        "newProfilesState",
        "removeAwayState",
        "pollResultsState",
        "nepisalkaState",
        "nechitalkaState",
        "integrationMediaState",
        "newDesignState",
        "hideButtonState",
        "cameraPhotoState",
        "addstickerState",
        "customHotbar",
        "muteCallsState",
        "altSBState",
        "recentGroupsState",
        "emojiStatusState",
        "sliderValue",
        "checkboxStateAva",
        "checkboxState",
        "checkboxState1",
        "secretFuncState",
        "postReactionsState",
        "hiderState",
        "customAccent",
        "colorPicker",
        "colorPickerText",
        "customLogo",
        "customBg",
        "customFont",
      ],
      ({
        checkboxState,
        checkboxState1,
        postReactionsState,
        secretFuncState,
        hiderState,
        customAccent,
        colorPicker,
        colorPickerText,
        customLogo,
        customBg,
        customFont,
        checkboxStateAva,
        sliderValue,
        emojiStatusState,
        recentGroupsState,
        altSBState,
        muteCallsState,
        customHotbar,
        addstickerState,
        cameraPhotoState,
        hideButtonState,
        newDesignState,
        integrationMediaState,
        nechitalkaState,
        nepisalkaState,
        pollResultsState,
        removeAwayState,
        newProfilesState,
        middleNameState,
        oldHoverState,
        tabletMenuState,
		defaultThemeState,
		oldBadgeState,
		fixMenuState,
		messageCounterState,
		customLeftMenuObject,
		garlandState,
		messageFooterState,
		wideFeedState
      }) =>
        applyStyles(
          checkboxState,
          checkboxState1,
          postReactionsState,
          secretFuncState,
          hiderState,
          customAccent,
          colorPicker,
          colorPickerText,
          customLogo,
          customBg,
          customFont,
          checkboxStateAva,
          sliderValue,
          emojiStatusState,
          recentGroupsState,
          altSBState,
          muteCallsState,
          customHotbar,
          addstickerState,
          cameraPhotoState,
          hideButtonState,
          newDesignState,
          integrationMediaState,
          nechitalkaState,
          nepisalkaState,
          pollResultsState,
          removeAwayState,
          newProfilesState,
          middleNameState,
          oldHoverState,
          tabletMenuState,
		  defaultThemeState,
		  oldBadgeState,
		  fixMenuState,
		  messageCounterState,
		  customLeftMenuObject,
		  garlandState,
		  messageFooterState,
		  wideFeedState
        )
    );
    setTimeout(() => reloadButton.classList.remove("vkEnhancerRebootLoading"), 250);
  });
  topNav.appendChild(reloadButton);
}
document.addEventListener("DOMContentLoaded", createReloadButton);
//Эмодзи-хотбар
function HotBarAppear(cHotBarValue) {
  if (cHotBarValue.includes("ВТриптакте")) {
    let styleElement = fromId("tripndrip");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "tripndrip";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = "body{filter: invert(100%);}";
  } else {
    const customStyle = fromId("tripndrip");
    if (customStyle) {
      customStyle.remove();
    }
  }
  let hotbarb = fromId("hotbarnew");
  if (!hotbarb) {
    hotbarb = document.createElement("style");
    hotbarb.id = "hotbarnew";
    document.head.appendChild(hotbarb);
  }
  hotbarb.innerHTML =
    ".ConvoMain__composer{padding-bottom:8px!important;display:flex;flex-direction: column;align-items: center;}";
  //const chatInputContainer = document.getElementsByClassName("im-chat-input--textarea fl_l _im_text_input _emoji_field_wrap");
  const chatInputContainer = document.getElementsByClassName(
    "ConvoMain__composer"
  );
  // Проверяем, есть ли уже хотбар на странице
  const existingHotbar = fromId("vkenhancerEmojiHotbarID");
  cHotBarValue = cHotBarValue.filter(function (item) {
    return item !== "" && item !== null && item !== undefined;
  });
  if (
    false /*existingHotbar && old_smile + 1 != Number(document.getElementsByClassName("page_progress_preview media_preview clear_fix")[0].id.replace(/\D+/g, ""))*/
  ) {
    existingHotbar.remove();
    /*console.log('HotBar removed')*/
  }
  if (!existingHotbar && cHotBarValue.length > 0) {
    const hotbarDiv = document.createElement("div");
    hotbarDiv.className = "vkenhancerEmojiHotbar";
    hotbarDiv.id = "vkenhancerEmojiHotbarID";
    hotbarDiv.style.marginTop = "6px"; //-10px
    //hotbarDiv.style.marginBottom = '7px';
    hotbarDiv.style.marginLeft = "9px";
    hotbarDiv.style.color = "#dee1e6";
    hotbarDiv.style.textAlign = "center";
    hotbarDiv.style.width = "420px";
    for (let i = 0; i < cHotBarValue.length; i++) {
      const emoji = cHotBarValue[i];
      const matches = emoji.match(/([a-fA-F0-9]+)\(([^)]+)\)/);
      const emojiCode = matches[1];
      const emojiUnicode = matches[2];
      const emojiImgSrc = `/emoji/e/${emojiCode}.png`;
      const aElement = document.createElement("a");
      aElement.className = "emoji_id";
      aElement.style.display = "inline-block";
      aElement.style.position = "relative";
      aElement.style.padding = "5px 4px";
      aElement.style.marginRight = "1px";
      aElement.style.cursor = "pointer";
      aElement.style.zIndex = "10";
      aElement.style.transition = "0.3s background";
      aElement.setAttribute("textmoji", emojiUnicode);
      aElement.addEventListener("mouseover", () => {
        aElement.style.background = "var(--vkui--color_transparent--active)";
        aElement.style.borderRadius = "3px";
      });
      aElement.addEventListener("mouseout", () => {
        aElement.style.background = "none";
        aElement.style.borderRadius = "0";
      });
      /*var prev = document.getElementsByClassName("page_progress_preview media_preview clear_fix");
            var v1 = 0;
            for (j = 0; j <= prev.length - 1; j++) {
                var last_id = prev[j].id;
                var last = Number(last_id.replace(/\D+/g, ""));
                if (last > v1) {
                    v1 = last;
                }
            }
            var v_smile = v1 - 1;
            old_smile = v_smile;*/
      /*console.log(v_smile + " v_smile");*/
      //aElement.setAttribute('onclick', `Emoji.addEmoji(${v_smile}, '${emojiCode}', this); return cancelEvent(event);`);
      /*aElement.addEventListener('click', function() {
                const textmoji = aElement.getAttribute('textmoji');
                const composerInput = document.querySelector('.ComposerInput__input.ConvoComposer__input');
    
                if (composerInput) {
                    composerInput.textContent = textmoji;
                }
            });*/ //старая добавлялка
      aElement.addEventListener("click", function () {
        const emojiCodeAdd = emojiCode; // Ваш emojiCode
        const textmoji = aElement.getAttribute("textmoji");
        const imgElement = document.createElement("img");
        imgElement.className = "Emoji @" + emojiCodeAdd;
        imgElement.src =
          "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        imgElement.alt = textmoji;
        const divElement = document.querySelector(
          ".ComposerInput__input.ConvoComposer__input"
        );
        const divElement1 = document.querySelector(".Composer__input");
        if (divElement) {
          divElement.appendChild(imgElement);
          divElement.focus();
        }
        if (divElement1) {
          divElement1.innerHTML += textmoji;
          divElement1.focus();
        }
      });
      const imgElement = document.createElement("img");
      imgElement.className = "emoji";
      imgElement.src = emojiImgSrc;
      aElement.appendChild(imgElement);
      hotbarDiv.appendChild(aElement);
    }
    const rebootHotbar = create(
      "a",
      {
        display: "inline-block",
        position: "absolute",
        padding: "5px 8px",
        marginRight: "1px",
        cursor: "pointer",
        zIndex: "10",
        transition: "0.3s background",
      },
      { className: "emoji_id" }
    );
    const tooltip = create(
      "span",
      {
        display: "none",
        position: "absolute",
        backgroundColor: "var(--black_alpha72)",
        borderRadius: "3px",
        padding: "5px",
        top: "-28.4219px",
        left: "50%",
        transform: "translate(-50%, 0)",
        whiteSpace: "nowrap",
        color: "#fff",
        fontSize: "12.5px",
        fontWeight: "400",
        boxShadow: "0 1px 3px var(--transparent_black)",
        zIndex: "11",
        cursor: "default",
        transition: "0.3s display",
        fontFamily:
          'var(--palette-vk-font,-apple-system,BlinkMacSystemFont,"Roboto","Helvetica Neue",Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif)',
      },
      { innerText: "Обновить хотбар" }
    );
    rebootHotbar.appendChild(tooltip);
    rebootHotbar.addEventListener("mouseover", () => {
      rebootHotbar.style.background = "var(--vkui--color_transparent--active)";
      rebootHotbar.style.borderRadius = "3px";
      tooltip.style.display = "block";
    });
    rebootHotbar.addEventListener("mouseout", () => {
      rebootHotbar.style.background = "none";
      rebootHotbar.style.borderRadius = "0";
      tooltip.style.display = "none";
    });
    const imgElementReboot = create(
      "img",
      { scale: "0.75" },
      {
        className: "emoji",
        src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'%3E%3Cpath d='M1.16003 
3.04982C1.97279 2.05297 3.07324 1.33126 4.31122 0.983177C5.54919 0.635091 6.86438 0.677585 8.07732 1.10486C9.29026 1.53213 10.3419 2.32337 11.0886 3.37061C11.8354 4.41784 12.2409 5.67005 12.2499 6.95637C12.2589 8.24268 11.8708 9.50043 11.1388 10.558C10.4067 11.6156 9.36626 12.4214 8.1594 12.8656C6.95255 13.3098 5.63808 13.3706 4.39536 13.0398C3.41275 12.7783 2.49231 12.282 1.75003 11.5986' stroke='%2399A2AD' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M0.75 1V3.09723C0.75 3.23724 0.75 3.30725 0.777248 3.36072C0.801217 3.40776 0.839462 3.44601 0.886502 3.46998C0.93998 3.49723 1.00999 3.49723 1.15 3.49723H3.25' stroke='%2399A2AD' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E`,
      }
    );
    rebootHotbar.appendChild(imgElementReboot);
    hotbarDiv.appendChild(rebootHotbar);
    rebootHotbar.addEventListener("click", function () {
      fromId("vkenhancerEmojiHotbarID").remove();
      chrome.storage.local.get(["customHotbar"], ({ customHotbar }) => {
        HotBarAppear(customHotbar);
      });
      return;
    });
    try {
      chatInputContainer[0].appendChild(hotbarDiv);
    } catch (error) { }
  }
}
// Функция для получения ID эмодзи
function getEmojiId(emoji) {
  return emoji.codePointAt(0).toString(16);
}

document.addEventListener("DOMContentLoaded", function () {
  const stylusInstalled = document.querySelector("style.stylus") !== null;
  chrome.storage.local.set(
    {
      stylusInstalled,
    },
    function () {
      /*console.log('Stylus installation status saved to cache.');*/
    }
  );
});
// Режим "не беспокоить"
function applyStyleAndMuteSpecificAudio() {
  window.postMessage({ action: "muteCalls" }, "*");
}

function removeStyleAndUnmuteSpecificAudio() {
  window.postMessage({ action: "unmuteCalls" }, "*");
}
//Возвращение фотоаппарата для пустых аватарок
function cameraPhotoRet() {
  let styleElement = fromId("cameraPhotoReturn");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "cameraPhotoReturn" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '[style*="https://pp.userapi.com/60tZWMo4SmwcploUVl9XEt8ufnTTvDUmQ6Bj1g/mmv1pcj63C4.png"],[style*="impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"] {background-image: url("https://vk.com/images/camera_a.gif")!important;} [src*="/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src^="https://sun6-22.userapi.com/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"],[src^="https://pp.userapi.com/60tZWMo4SmwcploUVl9XEt8ufnTTvDUmQ6Bj1g/mmv1pcj63C4.png"], [src^="https://pp.userapi.com/dfvmQ4fDCgEfMVVLlOKBUsaUdh7QZww8ME4IHg/2G-nzM7_pH4.png"],[src^="https://pp.userapi.com/nKpB1Qq39oLk0_S8_C9PolGFFUpM5n8FnzKC7A/ucP1cjlkpZk.png"], [src*="/impf/HnDXZID-SDmaVYd91lIag6dSg1lsaXuGBxzR6w/7oh8V3B731U.jpg"], [src*="/impf/DW4IDqvukChyc-WPXmzIot46En40R00idiUAXw/l5w5aIHioYc.jpg"] {content:url("https://vk.com/images/camera_a.gif");}';
}

function cameraPhotoDel() {
  const customStyle = fromId("cameraPhotoReturn");
  if (customStyle) {
    customStyle.remove();
  }
}
//Убрать NFT-Аватарки
function hideNFT_Avatars() {
  let styleElement = fromId("nftavatars");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "nftavatars" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
'[class^="vkitOutline__rootNft"] {display:none} .AvatarRich--nft .AvatarRich__img, .AvatarRich--nft .AvatarRich__background, .AvatarRich--nft .AvatarRich__children{clip-path:none; border-radius:100%;}.AvatarRich__outline--nft path {display:none}.AvatarRich__outline--nft{    border-radius: 100%;    outline: var(--avatar-rich-stroke-width) solid var(--vkui--color_icon_accent);    outline-offset: calc(var(--avatar-rich-stroke-width) * -1);} .OwnerPageAvatar--nft .OwnerPageAvatar__underlay:not(.OwnerPageAvatar__underlay--outlined) { top: calc(var(--stroke-width, 4px) * -1) !important; bottom: calc(var(--stroke-width, 4px) * -1) !important; left: calc(var(--stroke-width, 4px) * -1) !important; right: calc(var(--stroke-width, 4px) * -1) !important; } .OwnerPageAvatar--nft .OwnerPageAvatar__underlay, .AvatarRich--nft .AvatarRich__img, div[class*="RichAvatar-module__rootNft"] > img { clip-path: none !important; -webkit-clip-path: none !important; border-radius: 50% !important; } .OwnerPageAvatar--nft .vkuiAvatar svg, .AvatarRich__heptagonUnderlay,div[class*="RichAvatar-module__rootNft"] > svg { display: none !important; } svg[data-testid="richavatar-nft-heptagon"] { display:none; } [class*="vkitRichAvatar__rootNft"]>img { clip-path:none; border-radius:100%; }';
}

function backNFT_Avatars() {
  const customStyle = fromId("nftavatars");
  if (customStyle) {
    customStyle.remove();
  }
}
//Эмодзи-статусы
function emojiRemove() {
  let styleElement = fromId("removeES");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeES" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    '[class*="UserNameIcon__icon"]:not(:has(.vkuiIcon--verified_16)) ,[class*="OwnerNameIcon__icon"]:not(.OwnerPageName__esia, .OwnerPageName__prometheus, .OwnerPageName__verified),[class*="OwnerNameIcon-module__icon"]:not(.OwnerPageName__esia, .OwnerPageName__prometheus, .OwnerPageName__verified), .image_status__status, .PostHeaderTitle__imageStatus,span[class^="UserNameIcon-module__icon"]:has(>img),div[class^="StatusIcon"]:has(>img) { display: none !important; }';
}

function emojiBack() {
  const customStyle = fromId("removeES");
  if (customStyle) {
    customStyle.remove();
  }
}
//Недавно посещенные в группах
function recentRemove() {
  let styleElement = fromId("removeRecent");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeRecent" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "#react_rootRecentGroups {display: none !important;}";
}

function recentBack() {
  const customStyle = fromId("removeRecent");
  if (customStyle) {
    customStyle.remove();
  }
}
//Альтернативный скроллбар
function altSBadd() {
  let styleElement = fromId("altSB");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "altSB" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "::-webkit-scrollbar { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); width: 16px; } ::-webkit-scrollbar-track { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-thumb { background-color: var(--scrollbar_thumb, var(--vkui--color_icon_tertiary)); border-radius: 16px; border: 4px solid var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-button { display: none; }";
}

function altSBremove() {
  const customStyle = fromId("altSB");
  if (customStyle) {
    customStyle.remove();
  }
}
//Реакции сообщений
function removeMessageReactions() {
  let styleElement = fromId("msgReactions");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "msgReactions" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".DropdownReforged:has(.ReactionChip), .ConvoListItem__icon:not([aria-label]),.HopNavigationButton:has(.vkuiIcon--stars_20),.ConvoMessageWithoutBubble__reactions,.MessageActionsContent__reactions,.MessageReactionsPanel,.im-mess--reaction,.MessageReactions,MessageReactionsModalButton,.im-mess_reactions:hover .MessageReactionsModalButton,.im-mess .im-mess--reactions,.nim-dialog .nim-dialog--unread-badge_reaction,button.im-navigation.im-navigation--to-reaction._im_to_reaction.im-navigation_shown { display: none!important; }";
}

function backMessageReactions() {
  const customStyle = fromId("msgReactions");
  if (customStyle) {
    customStyle.remove();
  }
}
//Дополнительные функции VK Enhancer
function secretFunctionsEnabled() {
  isSecretEnabled = true;
  setTimeout(() => {
    loadScripts();
  }, "5000");
}

function secretFunctionsDisabled() {
  isSecretEnabled = false;
  /*console.log(
    "Secret functions are disabled. If you want to enable them - push checkbox and reload page"
  );*/
}
//Реакции к постам
function removePostReactions() {
  let styleElement = fromId("postReactions");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "postReactions" });
    document.head.appendChild(styleElement);
  }
  const imageUrl =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath xmlns='http://www.w3.org/2000/svg' fill-rule='nonzero' fill='%23e64646' d='M11.95 4.83l-0.09 -0.09c-1.27,-1.23 -2.96,-1.93 -4.73,-1.94 0,0 0,0 0,0 -3.62,0 -6.55,2.93 -6.56,6.54 0,3.52 1.3,5.2 7.07,9.76l3.07 2.4c0.37,0.29 0.8,0.44 1.24,0.45l0 0c0.44,-0.01 0.88,-0.16 1.24,-0.45l3.07 -2.4c5.78,-4.56 7.07,-6.24 7.07,-9.76 -0.01,-3.61 -2.94,-6.54 -6.55,-6.54 0,0 0,0 0,0 -1.77,0.01 -3.47,0.71 -4.73,1.94l-0.1 0.09z'/%3E%3C/g%3E%3C/svg%3E";
  isPostReact = true;
  styleElement.innerHTML =
    '.PostBottomAction.PostButtonReactions.PostButtonReactions--post {z-index:10; padding-right:0px!important;} .PostButtonReactionsContainer {display:flex} .PostBottomAction--withBg{padding:4px 6px!important;}.PostButtonReactions__iconAnimation{display:none!important;}.PostButtonReactions__icon.PostButtonReactions__icon--custom{background: url("' +
    imageUrl +
    '")!important;         scale:.85;} .ReactionsMenuPopperTransition-appear-done, .ReactionsMenuPopperTransition-enter-done {          display: none!important;      }                        .ReactionsMenu,    .ReactionsMenu--extraHoverArea,    .ReactionsMenu--extraHoverAreaToTop,    div.ReactionsPreview__items,.PostButtonReactions--post .PostButtonReactions__title--textual,.like_tt_reacted-count,.fans_fanph_reaction,li#likes_tab_reactions_0,    li#likes_tab_reactions_1,    li#likes_tab_reactions_2,    li#likes_tab_reactions_3,    li#likes_tab_reactions_4,    li#likes_tab_reactions_5,.ui_tab.ui_tab_group:not(.ui_tab_group_new),.like_tt_reaction {        display: none !important;    }    .PostBottomAction {        --post-bottom-action-background-color: transparent !important;    }    div.ReactionsPreview.ReactionsPreview--active .ReactionsPreview__count._counter_anim_container {        color: #e64646 !important;    }   .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count{color:var(--vkui--color_text_secondary);} [dir] .ReactionsPreview {  margin-left: -6px; z-index: 9;    }    .ReactionsPreview--isInActionStatusBar .ReactionsPreview__count {    font-size: 14px!important;    line-height: 16px;    font-weight: 500;    }    .PostButtonReactionsContainer {        width: auto !important;    }    .PostButtonReactions__iconAnimation svg    {        background: url("' +
    imageUrl +
    '") no-repeat!important;        margin-top:3px;        margin-left:3px;        scale:.85;    }    .PostButtonReactions__iconAnimation svg g    {        display:none;    }        [dir] .PostActionStatusBar--inPost {        padding-top: 0px !important;        padding-bottom: 0px !important;    }    div.like_cont.PostBottomActionLikeBtns {        border-top: 1px solid transparent !important;    }    .PostButtonReactionsContainer {        width: auto !important;    }        [dir=ltr] .post--withPostBottomAction .PostBottomActionLikeBtns .like_btns {        margin-top: 5px !important;    }    [dir] .PostBottomAction::before {        background-image: none!important;    }    [dir] .like_cont {           }    [dir] .PostBottomActionLikeBtns.like_cont {  padding-bottom:10px!important;   }';
}

function backPostReactions() {
  const customStyle = fromId("postReactions");
  if (customStyle) {
    customStyle.remove();
  }
  isPostReact = false;
}
//Скрыть имена и аватарки
function addBlur() {
  let styleElement = fromId("hider");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "hider" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".Reply__author, .ForwardedMessageNew__userName, .NestedForwardedMessageButton__header, .ForeignMessagesHistory__topAuthor, [data-testid='story_card_stories'],[hrefparams='_ref=feed_recommended_friends_right_block'],.PostHeaderTitle__authorName, .PostHeader__avatar,.feedback_header,.feedback_image,.CallsRichCell__Title,.PeerTitle__title,.PeerListItem__name,.vkuiRichCell__before, [class^='vkitUserRichCell__name'], [class^='CallHistoryScreen--friendsListItem'], .audio_friend, .ConvoListItem__message,.ConvoPinnedMessage__authorLink,.ServiceMessage__link,.BasicAvatar__img,.ConvoProfileName__longName,.ConvoProfileInformation__infoCellText,.spanPseudoText1,.bp_thumb,.bp_author,.wall_module .author_highlighted,.deep_active .replies .reply_image,.top_profile_name,.im-mess-stack--lnk, ._im_ui_peers_list .ui_rmenu_item_label, ._im_page_peer_name, .nim-dialog--name, .im-page-pinned--name, .im-replied--author,.ConvoRecommendList__name,.nim-dialog .nim-dialog--text-preview, .nim-dialog .nim-dialog--preview,.ProfileSubscriptions__item,.ProfileFriends__item,#react_rootLeftMenuRoot > div > nav > ol > li:not(#l_pr):not(#l_nwsf):not(#l_msg):not(#l_ca):not(#l_fr):not(#l_gr):not(#l_ph):not(#l_aud):not(#l_vid):not(#l_svd):not(#l_ap):not(#l_stickers):not(#l_mk):not(#l_vkfest2023):not(#l_mini_apps):not(#l_fav):not(#l_doc):not(#l_apm):not(#l_vkp):not(#l_ads) {    filter: blur(5px) !important;}.nim-peer--photo-w img, .nim-peer img,.ImUserAvatar img,.TopNavBtn__profileImg,.UsersStack__userItemSvg {    filter: blur(10px) grayscale(1) !important;} .MEAvatar,.ConvoTitle__title,.ConvoMessageAuthor,.ConvoListItem__author {filter: blur(5px) grayscale(1)!important}";
}

function removeBlur() {
  const customStyle = fromId("hider");
  if (customStyle) {
    customStyle.remove();
  }
}
//Скрыть кнопку VK Enhancer
function hideEnButton() {
  let styleElement = fromId("enbutton");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "enbutton" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = "#vkEnhancerReboot {display:none;}";
}

function backEnButton() {
  const customStyle = fromId("enbutton");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный акцент
function addCAccent(cAccentValue) {
  /*console.log("Caccent executed");*/
  let styleElement = fromId("CAccentID");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "CAccentID" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "body{    --accent:" +
    cAccentValue +
    "!important; --vkui--color_text_link: var(--accent) !important; --vkui--color_text_link: var(--accent) !important; --vkui--color_icon_accent_themed: var(--accent) !important;  --blue_400: var(--accent) !important;    --action_sheet_action_foreground: var(--accent) !important;    --attach_picker_tab_active_background: var(--accent) !important;    --attach_picker_tab_active_text: var(--accent) !important;    --cell_button_foreground: var(--accent) !important;    --control_foreground: var(--accent) !important;    --counter_primary_background: var(--accent) !important;    --header_alternate_tab_active_indicator: var(--accent) !important;    --header_tab_active_indicator: var(--accent) !important;    --header_tint: var(--accent) !important;    --header_tint_alternate: var(--accent) !important;    --im_attach_tint: var(--accent) !important;    --im_reply_sender_text: var(--accent) !important;    --im_reply_separator: var(--accent) !important;    --landing_login_button_background: var(--accent) !important;    --landing_primary_button_background: var(--accent) !important;    --landing_tertiary_button_foreground: var(--accent) !important;    --landing_text_title: var(--accent) !important;    --landing_secondary_button_foreground: var(--accent) !important;    --link_alternate: var(--accent) !important;    --loader_track_value_fill: var(--accent) !important;    --feed_recommended_friend_promo_background: var(--accent) !important;    --tabbar_active_icon: var(--accent) !important;    --tabbar_tablet_active_icon: var(--accent) !important;    --text_link: var(--accent) !important;    --text_name: var(--accent) !important;    --writebar_icon: var(--accent) !important;    --dynamic_blue: var(--accent) !important;    --text_link_hightlighted_background: var(--accent) !important;    --im_text_name: var(--accent) !important;    --button-background-color: var(--accent) !important;    --sky_100: var(--accent) !important;    --sky_200: var(--accent) !important;    --light_blue_700: var(--accent) !important;    --blue_bright: var(--accent) !important;    --vkui--color_icon_accent: var(--accent) !important;    --vkui--color_background_accent_themed: var(--accent) !important;    --vkui--color_background_accent: var(--accent) !important;    --vkui--color_background_accent--hover: var(--accent) !important;    --vkui--color_background_accent--active: var(--accent) !important;    --vkui--color_background_accent_themed--hover: var(--accent) !important;    --vkui--color_background_accent_themed--active: var(--accent) !important;    --vkui--color_background_accent_tint--hover: var(--accent) !important;    --vkui--color_background_accent_tint--active: var(--accent) !important;    --vkui--color_background_accent_alternative: var(--accent) !important;    --vkui--color_background_accent_alternative--hover: var(--accent) !important;    --vkui--color_background_accent_alternative--active: var(--accent) !important;    --vkui--color_text_accent: var(--accent) !important;    --vkui--color_text_accent--hover: var(--accent) !important;    --vkui--color_text_accent--active: var(--accent) !important;    --vkui--color_text_accent_themed: var(--accent) !important;    --vkui--color_text_accent_themed--hover: var(--accent) !important;    --vkui--color_text_accent_themed--active: var(--accent) !important;    --vkui--color_text_link: var(--accent) !important;    --vkui--color_text_link--hover: var(--accent) !important;    --vkui--color_text_link--active: var(--accent) !important;    --vkui--color_text_link_themed: var(--accent) !important;    --vkui--color_text_link_themed--hover: var(--accent) !important;    --vkui--color_text_link_themed--active: var(--accent) !important;    --vkui--color_text_link_visited--hover: var(--accent) !important;    --vkui--color_text_link_visited--active: var(--accent) !important;    --blue_a400: var(--accent) !important;    --blue_400_alpha20: var(--accent),0.2 !important;    --blue_400_alpha48: var(--accent),0.48 !important;    --blue_420: var(--accent) !important;    --blue_550: var(--accent) !important;    --blue_600: var(--accent) !important;    --blue_640: var(--accent) !important;    --blue_800: var(--accent) !important;    #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg > g > g > path:nth-child(2), #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > span > svg > path:nth-child(1){        fill: " +
    cAccentValue +
    " !important;    }}";
  // Получаем элемент SVG
  try {
    const svgElement1 = document.querySelector(
      "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg"
    );
    const pathElement1 = svgElement1.querySelector("g > g > path:nth-child(2)");
    pathElement1.setAttribute("fill", cAccentValue);
    /*console.log("logo accepted " + svgElement1);*/
  } catch (error) {
    /*console.log('logo not accepted. Trying to use DOM');*/
  }
  document.addEventListener("DOMContentLoaded", function () {
    const svgElement = document.querySelector(
      "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg"
    );
    const pathElement = svgElement.querySelector("g > g > path:nth-child(2)");
    pathElement.setAttribute("fill", cAccentValue);
    /*console.log("logo accepted reload" + svgElement);*/
  });
}

function removeCAccent() {
  const customStyle = fromId("CAccentID");
  if (customStyle) {
    customStyle.remove();
  }
  try {
    const svgElement = document.querySelector(
      "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg"
    );
    const pathElement = svgElement.querySelector("g > g > path:nth-child(2)");
    if (pathElement != null) {
      pathElement.setAttribute("fill", "#07F");
    }
  }
  catch (error) { }
}
//Цвета выделения текста
function addColorPicker(cColorValue, cTextValue) {
  let styleElement = fromId("selections");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "selections" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "::selection {                background-color: " +
    cColorValue +
    ";                color: " +
    cTextValue +
    ";                    }";
}
//Кастомный логотип
function addLogo(cLogoValue) {
  let styleElement = fromId("logos");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "logos" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    "#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink {          background:url(" +
    "'" +
    cLogoValue +
    "'" +
    ") no-repeat;          background-size: contain;          background-position: center;      }      #top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > span > svg,#top_nav > li.HeaderNav__item.HeaderNav__item--logo > a.TopHomeLink > svg{          display:none;      }";
}

function removeLogo() {
  const customStyle = fromId("logos");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный фон
function addBg(cBgValue) {
  let styleElement = fromId("custombg");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "custombg" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ProfileWrapper__root{background:transparent!important;}:root,.vknBgWrapper,.scroll_fix {          background-image:url(" +
    cBgValue +
    ')!important;          background-size: cover;          background-position: center;          background-attachment: fixed;} #side_bar_inner, .side_bar_inner {box-shadow: var(--page-block-shadow) !important;margin-top: calc(var(--header-height) + 16px) !important;position: relative !important;right: calc(var(--page-block-offset, 15px) + 7px) !important;background: var(--vkui--color_background_content) !important;border-radius: var(--vkui--size_border_radius_paper--regular) !important; padding: 4px !important;} [class^="LeftMenuItem-module__item"] {border-radius: 10px !important;}.side_bar_nav_wrap {margin: 0px !important;padding: 0px !important;}';
}

function removeBg() {
  const customStyle = fromId("custombg");
  if (customStyle) {
    customStyle.remove();
  }
}
//Кастомный шрифт
function addFont(cFontValue) {
  let styleElement = fromId("customfont");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "customfont" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `
        @font-face {
            font-family: 'customFont';
            src: url(${cFontValue}) format('woff2'); /* Укажите правильный формат */
        }
        html, body, p, h1, h2, h3, h4, h5, h6, span, div, a, ul, ol, li, input, button {
            font-family: 'customFont' !important;
        }
    `;
}

function removeFont() {
  const customStyle = fromId("customfont");
  if (customStyle) {
    customStyle.remove();
  }
}
//Убрать имя возле аватарки VK ID
function removeNameAva() {
  let styleElement = fromId("removeNA");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeNA" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = ".top_profile_name {display:none!important;}";
}
//Прозрачность блоков
function addOpacity(sliderValueCount) {
  const opacity = sliderValueCount / 100;
  const alphaHex = Math.floor(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  let rule;
  if (document.querySelector("[scheme=vkcom_light]")) {
    rule =
      ".vkui--vkBase--light,[scheme=vkcom_light]{ --vkui--color_background_content: rgba(255, 255, 255, " +
      opacity +
      ")!important;} :is( .VKCOMMessenger__integrationRoot .MEAppConfig, .VKCOMMessenger__integrationRoot.MEAppConfig ).MEAppConfig__withoutBubbles.MEAppConfig__withoutBubbles{--convoHistoryBackgroundColor:rgba(255, 255, 255, " +
      opacity +
      ")!important;} .ConvoMain__rightPanelContainer,.MEApp{background-color:rgba(237,238,240," +
      opacity +
      ")!important;} .TopNavBtn .TopNavBtn__notifyCount{border:2px solid rgb(255,255,255)!important;} .UnreadCounter.UnreadCounter--muted{color:rgb(255,255,255)!important}";
    //rule = `.im-page .im-page--history-new-bar,.im-page_classic.im-page .im-page--header::before,.im-page_classic.im-page .im-page--dialogs,GamesCatalogNav,.audio_page_layout .audio_search_wrapper,.GamesCatalogHalfBlock .GamesCatalogCardsBlock__header{background:transparent!important} .im-page_classic.im-page .im-page--chat-body-wrap-inner,.im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner,.im-page_classic.im-page .im-page--dcontent,.PageBlock,.MarketplaceCatalogBlockListFiltersLayout__block,.MarketplaceCatalogHeaderMenu,.GamesCatalogProfileBlock__header,.GamesCatalogProfileBlock__content,.GamesCatalogSearchMainContent,.page_block_header,.ui_tabs_new.ui_tabs_header,.CatalogBlock--divided,.ui_search.ui_search_old,.im-page .im-page--dialogs-footer,.im-page .im-page--header, .im-page .im-page--search-header,.redesigned-group-info,.ProfileHeader, .page_block, .vkuiGroup--mode-card,.wall_module .reply_box{background: rgba(255, 255, 255, ${opacity})!important;}`;
  } else {
    rule =
      ".vkui--vkBase--dark,[scheme=vkcom_dark]{ --vkui--color_background_content: rgba(34, 34, 34, " +
      opacity +
      ")!important;} :is( .VKCOMMessenger__integrationRoot .MEAppConfig, .VKCOMMessenger__integrationRoot.MEAppConfig ).MEAppConfig__withoutBubbles.MEAppConfig__withoutBubbles{--convoHistoryBackgroundColor:rgba(34, 34, 34, " +
      opacity +
      ")!important;} .ConvoMain__rightPanelContainer,.MEApp{background-color:rgba(20,20,20," +
      opacity +
      ")!important; .TopNavBtn .TopNavBtn__notifyCount{border:2px solid rgb(25,25,26)!important;}} .UnreadCounter.UnreadCounter--muted{color:rgb(25,25,26)!important}";
    //rule = `.im-page .im-page--history-new-bar,.im-page_classic.im-page .im-page--header::before,.im-page_classic.im-page .im-page--dialogs,GamesCatalogNav,.audio_page_layout .audio_search_wrapper,.GamesCatalogHalfBlock .GamesCatalogCardsBlock__header{background:transparent!important} .im-page_classic.im-page .im-page--chat-body-wrap-inner,.im-page.im-page_classic.im-page_group .im-group-online .im-group-online--inner,.im-page_classic.im-page .im-page--dcontent,.PageBlock,.MarketplaceCatalogBlockListFiltersLayout__block,.MarketplaceCatalogHeaderMenu,.GamesCatalogProfileBlock__header,.GamesCatalogProfileBlock__content,.GamesCatalogSearchMainContent,.page_block_header,.ui_tabs_new.ui_tabs_header,.CatalogBlock--divided,.ui_search.ui_search_old,.im-page .im-page--dialogs-footer,.im-page .im-page--header, .im-page .im-page--search-header,.redesigned-group-info,.ProfileHeader, .page_block, .vkuiGroup--mode-card,.wall_module .reply_box{background: rgba(25, 25, 26, ${opacity})!important;}`;
  }
  const existingStyle = fromId("custom-opacity-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  const styleElement = create(
    "style",
    {},
    { id: "custom-opacity-style", innerHTML: rule, type: "text/css" }
  );
  document.head.appendChild(styleElement);
  /*console.log("Opacity changed to " + opacity);*/
}
//Индикатор реконнекта
function removeReconnectIndicator() {
  let styleElement = fromId("reconnectIndicator");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "reconnectIndicator" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".ConnectionIndicator,.MEApp__reconnecting {	display: none !important;}";
}

function backReconnectIndicator() {
  const customStyle = fromId("reconnectIndicator");
  if (customStyle) {
    customStyle.remove();
  }
}
//Меню как на планшетах//
function initTabletMenu() {
  let styleElement = fromId("mvktabletMenu");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "mvktabletMenu" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.side_bar_inner { background-color: var(--block, var(--vkui--color_background_content)) !important; box-shadow: var(--page-block-shadow) !important; border-radius: 100px; } .side_bar { [class^="vkitLeftMenuItem__container"] { padding: 5px 0; } [class^="vkitLeftMenuItem__settings"] { left: -24px !important; } } .side_bar_nav_wrap { margin: 0 !important; margin-bottom: 10px !important; } body { .side_bar { width: 54px !important; padding-left: 258px !important; margin-left: -149px !important; padding-right: 0px !important; margin-right: -149px !important; .LeftMenu__separator, [class^='vkitLeftMenuOld__separator'] { margin-left: 0; margin-right: 0; } [class^='LeftMenuSection-module__hiddenItems--'], [class*=' LeftMenuSection-module__hiddenItems--'] { position: relative; width: calc(var(--left-menu-icon-size, 20px) + 21) !important; } [class^="vkitLeftMenuItem__icon"] { scale: 1.3; color: var(--vkui--color_icon_secondary); } #l_pr [class^="vkitLeftMenuItem__icon"] { width: 20px; height: 20px; background-image: url(` + localStorage.getItem("ownerPhoto200") + `); background-size: cover; margin-right: 0; border-radius: 100px; } li[class^="vkitLeftMenuItem__container"]:not(:last-child) { padding-bottom: 8px; } #l_pr [class^="vkitLeftMenuItem__icon"] svg { display: none; } .LeftMenu__itemLink, [class^='vkitLeftMenuItem__item'] { border-radius: 100px; position: relative; width: calc(var(--left-menu-icon-size, 20px) + 21) !important; .left_count_wrap, [class^='vkitLeftMenuItem__counter']:not([class^="vkitLeftMenuItem__counterLink"]):not([type="internal/link"]) { position: absolute; top: 0px; left: 12px; font-size: 14px; transform: scale(0.7); background: var(--vkui--color_background_accent_themed) !important; color: var(--vkui--color_icon_contrast_themed) !important; } .left_count_wrap, [class^='vkitLeftMenuItem__counterObject'] { position: absolute; top: 0px; left: 12px; font-size: 14px; transform: scale(0.7); background: var(--vkui--color_background_accent_themed) !important; color: var(--vkui--color_icon_contrast_themed) !important; } &:hover { .LeftMenu__itemLabel, [class^='vkitLeftMenuItem__label'] { display: block !important; position: fixed !important; background: var(--vkui--color_avatar_overlay--hover) !important; color: var(--vkui--color_background_content) !important; border-radius: 100px !important; padding: 4px 7px !important; height: auto !important; line-height: initial !important; margin-left: 36px !important; margin-top: 16px !important; margin-top: 0 !important; } } } [class^='vkitLeftMenuOld__separator'] { margin:9px 8px 9px 8px; } .LeftMenu__itemLabel, [class^='LeftMenuItem-module__label--'] { font-size: 12px; } .side_bar_inner { width: 42px !important; padding: 2px 0 !important; margin-top: 64px !important; } ol { margin: 0 5px 10px 5px !important; } .LeftMenu__itemLabel, [class^='vkitLeftMenuItem__label'], .left_menu_nav_wrap { display: none !important; } } } li.HeaderNav__item.HeaderNav__item--logo { margin: 0 !important; } [class*="LeftMenuOld-module__separator"] { margin: 4px 0px 8px 0px; } .LegalRecommendationsLinkLeftMenuAuthorized, .WideSeparator--legalRecommendationsLink { display: none; };`;
}

function closeTabletMenu() {
  const customStyle = fromId("mvktabletMenu");
  if (customStyle) {
    customStyle.remove();
  }
}
//Зафиксировать левое меню//
function fixLeftMenu() {
  let styleElement = fromId("fixMenuLeft");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "fixMenuLeft" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `#side_bar:has([data-testid="leftmenu"]){position:fixed!important; top:0px!important;}`;
}

function unFixLeftMenu() {
  const customStyle = fromId("fixMenuLeft");
  if (customStyle) {
    customStyle.remove();
  }
}
//Выключить каунтер сообщений//
function disableCounter() {
  let styleElement = fromId("removeMsgCount");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeMsgCount" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.vkEnhancerCounterOfMessages{display:none;}`;
}

function enableCounter() {
  const customStyle = fromId("removeMsgCount");
  if (customStyle) {
    customStyle.remove();
  }
}
//Скрыть футер с непрочитанными//
function disableFooter() {
  let styleElement = fromId("removeMsgFooter");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeMsgFooter" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.ConvoList__footer{display:none;}`;
}

function enableFooter() {
  const customStyle = fromId("removeMsgFooter");
  if (customStyle) {
    customStyle.remove();
  }
}
//Граффити можем или нет//
function stopLoadGraffity() {
  let styleElement = fromId("removeGraffitiInput");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "removeGraffitiInput" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.vkEnhancerGraffityInput{display:none!important;}`;
}

function canLoadGraffity() {
  const customStyle = fromId("removeGraffitiInput");
  if (customStyle) {
    customStyle.remove();
  }
}
//Старый значок непрочитанных//
function oldBadgeEnable() {
  let styleElement = fromId("oldBadgeStyle12");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "oldBadgeStyle12" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `    .ConvoListItem__outStatusIcon:has(.vkuiIcon--check_double_outline_16) {
        display:none;
    }
    .ConvoListItem__outStatusIcon .vkuiIcon--check_outline_16 {
        background-color: var(--vkui--color_background_accent_themed);
        border-radius:100px;
        width:7px!important;
        height:7px!important;
        scale: 1.143;
    }
    .ConvoListItem__outStatusIcon .vkuiIcon--check_outline_16 use {
        display:none;
    }`;
}

function oldBadgeDisable() {
  const customStyle = fromId("oldBadgeStyle12");
  if (customStyle) {
    customStyle.remove();
  }
}
//Убрать гирлянду//
function garlandRemove() {
  let styleElement = fromId("garlandRemover");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "garlandRemover" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `#page_header_wrap > div:has([class^="GarlandParts__root"]) {
		visibility:hidden;
	}`;
}

function garlandBack() {
  const customStyle = fromId("garlandRemover");
  if (customStyle) {
    customStyle.remove();
  }
}
//Широкий стиль стены//
function wideFeedEnable() {
  let styleElement = fromId("wideFeedEnabler");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "wideFeedEnabler" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    `.wide_column_left:has(#ui_rmenu_news)
    {
        --narrow-column-width:160px!important
    }`;
}

function wideFeedRemove() {
  const customStyle = fromId("wideFeedEnabler");
  if (customStyle) {
    customStyle.remove();
  }
}
// Функция для добавления стилей
function applyStyles(
  isOldAccentChecked,
  isMsgReactionsChecked,
  isPostReactionsChecked,
  isSecretChecked,
  isHiderChecked,
  cAccentValue,
  cColorValue,
  cTextValue,
  cLogoValue,
  cBgValue,
  cFontValue,
  isNameAva,
  sliderValueCount,
  emojiStatusChecked,
  recentGroupsChecked,
  altSBChecked,
  muteCallsChecked,
  cHotBarValue,
  addStickerChecked,
  cameraPhotoChecked,
  hideButtonChecked,
  newDesignChecked,
  integrationMediaChecked,
  nechitalkaChecked,
  nepisalkaChecked,
  pollResultsChecked,
  removeAwayChecked,
  newProfilesChecked,
  middleNameChecked,
  oldHoverChecked,
  tabletMenuChecked,
  defaultThemeChecked,
  oldBadgeChecked,
  fixMenuChecked,
  messageCounterСhecked,
  customLeftMenuValue,
  garlandChecked,
  messageFooterСhecked,
  wideFeedChecked
) {
  if (isOldAccentChecked) {
    hideNFT_Avatars();
  } else {
    backNFT_Avatars();
  }
  if (sliderValueCount) {
    addOpacity(sliderValueCount);
  }
  if (isMsgReactionsChecked) {
    removeMessageReactions();
  } else {
    backMessageReactions();
  }
  if (isPostReactionsChecked) {
    window.postMessage({ action: "removePostReactions" }, "*");
    removePostReactions();
  } else {
    window.postMessage({ action: "backPostReactions" }, "*");
    backPostReactions();
  }
  if (isNameAva) {
    const customStyle = fromId("removeNA");
    if (customStyle) {
      customStyle.remove();
    }
    fixname1();
  } else {
    removeNameAva();
  }
  if (isSecretChecked) {
    window.postMessage({ action: "secretFunctionsEnabled" }, "*");
    secretFunctionsEnabled();
  } else {
    window.postMessage({ action: "secretFunctionsDisabled" }, "*");
    secretFunctionsDisabled();
  }
  /*console.log("isHiderChecked now " + isHiderChecked)*/
  if (isHiderChecked) {
    addBlur();
  } else {
    removeBlur();
  }
  if (
    cAccentValue != "#FFFFFF" &&
    cAccentValue != "#ffffff" &&
    cAccentValue != undefined
  ) {
    addCAccent(cAccentValue);
  } else {
    removeCAccent();
  }
  if (cLogoValue != "" && cLogoValue != "undefined" && cLogoValue != null) {
    addLogo(cLogoValue);
  } else {
    removeLogo();
  }
  if (cBgValue != "" && cBgValue != "undefined" && cBgValue != null) {
    addBg(cBgValue);
  } else {
    removeBg();
  }
  if (cFontValue != "" && cFontValue != "undefined" && cFontValue != null) {
    addFont(cFontValue);
  } else {
    removeFont();
  }
  if (cColorValue != undefined && cTextValue != undefined) {
    addColorPicker(cColorValue, cTextValue);
  }
  if (emojiStatusChecked) {
    emojiRemove();
  } else {
    emojiBack();
  }
  if (recentGroupsChecked) {
    recentRemove();
  } else {
    recentBack();
  }
  if (altSBChecked) {
    altSBadd();
  } else {
    altSBremove();
  }
  if (muteCallsChecked) {
    muteCallsBool = true;
    applyStyleAndMuteSpecificAudio();
  } else {
    muteCallsBool = false;
    removeStyleAndUnmuteSpecificAudio();
  }
  if (cHotBarValue) {
    HotBarAppear(cHotBarValue);
    window.postMessage(
      { action: "HotBarAppear", value: cHotBarValue },
      "*"
    );
  }
  if (addStickerChecked) {
    //runStickerAdder();
    removeReconnectIndicator();
  } else {
    backReconnectIndicator();
  }
  if (cameraPhotoChecked) {
    cameraPhotoRet();
  } else {
    cameraPhotoDel();
  }
  if (hideButtonChecked) {
    backEnButton();
  } else {
    hideEnButton();
  }
  if (newDesignChecked) {
    newDesignBool = true;
	canLoadGraffity();
	chrome.storage.local.get(['vkenAccessToken'], function (result) {
		try {
		vkenAccessToken1 = result.vkenAccessToken;
		if (!vkenAccessToken1 || vkenAccessToken1 == '') {
			window.onload = () => {
				CheckToken();
			}
		}
		else {
			window.onload = () => {
				window.postMessage(
					{ action: "vkEnhancerAccessToken", value: vkenAccessToken1 },
					"*"
				);
			}
		}
		}
		catch(e) {console.error(e)}
	});
	window.addEventListener("message", async (event) => {
		switch (event.data.action) {
			case "tokenRemove": {
				chrome.runtime.sendMessage({
					type: 'vken_access_token_remove'
				});
				break;
			}
		}
	});
  } else {
    newDesignBool = false;
	stopLoadGraffity();
  }
  if (integrationMediaChecked) {
    //console.log("New int");
    window.postMessage(
      { action: "integrationMedia", value: integrationMediaChecked },
      "*"
    );
  } else {
    //console.log("Old int");
    window.postMessage(
      { action: "integrationMedia", value: integrationMediaChecked },
      "*"
    );
  }
  if (nechitalkaChecked) {
    //console.log("Nechitalka true");
    window.postMessage(
      { action: "nechitalka", value: nechitalkaChecked },
      "*"
    );
  }
  else {
    //console.log("Nechitalka false");
    window.postMessage(
      { action: "nechitalka", value: nechitalkaChecked },
      "*"
    );
  }
  if (nepisalkaChecked) {
    //console.log("Nepisalka true");
    window.postMessage(
      { action: "nepisalka", value: nepisalkaChecked },
      "*"
    );
  }
  else {
    //console.log("Nepisalka false");
    window.postMessage(
      { action: "nepisalka", value: nepisalkaChecked },
      "*"
    );
  }
  if (pollResultsChecked) {
    //console.log("Polls true");
    window.postMessage(
      { action: "pollResults", value: pollResultsChecked },
      "*"
    );
  }
  else {
    //console.log("Polls false");
    window.postMessage(
      { action: "pollResults", value: pollResultsChecked },
      "*"
    );
  }
  if (removeAwayChecked) {
    window.postMessage(
      { action: "removeAway", value: removeAwayChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "removeAway", value: removeAwayChecked },
      "*"
    );
  }
  if (newProfilesChecked) {
    window.postMessage(
      { action: "newProfiles", value: newProfilesChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "newProfiles", value: newProfilesChecked },
      "*"
    );
  }
  if (middleNameChecked) {
    window.postMessage(
      { action: "middleName", value: middleNameChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "middleName", value: middleNameChecked },
      "*"
    );

  }
  if (oldHoverChecked) {
    window.postMessage(
      { action: "oldHover", value: oldHoverChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "oldHover", value: oldHoverChecked },
      "*"
    );
  }
  if (tabletMenuChecked) {
    initTabletMenu();
  }
  else {
    closeTabletMenu();
  }
    if (defaultThemeChecked) {
    window.postMessage(
      { action: "defaultThemeFeed", value: defaultThemeChecked },
      "*"
    );
  }
  else {
    window.postMessage(
      { action: "defaultThemeFeed", value: defaultThemeChecked },
      "*"
    );
  }
      if (oldBadgeChecked) {
	oldBadgeEnable();
    window.postMessage(
      { action: "oldBadge", value: oldBadgeChecked },
      "*"
    );
  }
  else {
	oldBadgeDisable();
    window.postMessage(
      { action: "oldBadge", value: oldBadgeChecked },
      "*"
    );
  }
  if(fixMenuChecked) {
	 fixLeftMenu();  
  }
  else {
	 unFixLeftMenu();  
  }
  if(garlandChecked) {
	  garlandRemove();
  } else {
	  garlandBack();
  }
  if(messageCounterСhecked) {
	 disableCounter();  
  }
  else {
	 enableCounter();  
  }
  
  if(messageFooterСhecked) {
	 disableFooter();  
  }
  else {
	 enableFooter();  
  }
  
  if(wideFeedChecked) {
	  wideFeedEnable();
  } else {
	  wideFeedRemove();
  }

  if (customLeftMenuValue) {
    window.postMessage(
      { action: "customLeftMenu", value: customLeftMenuValue },
      "*"
    );
  }
}
// Функция для получения состояния чекбоксов из локального хранилища и применения стилей
function applySavedStyles() {
  chrome.storage.local.get(
    [
	  "messageFooterState",
	  "garlandState",
	  "wideFeedState",
	  "customLeftMenuObject",
	  "messageCounterState",
	  "fixMenuState",
	  "oldBadgeState",
	  "defaultThemeState",
      "tabletMenuState",
      "oldHoverState",
      "middleNameState",
      "newProfilesState",
      "removeAwayState",
      "pollResultsState",
      "nepisalkaState",
      "nechitalkaState",
      "integrationMediaState",
      "newDesignState",
      "hideButtonState",
      "cameraPhotoState",
      "addstickerState",
      "customHotbar",
      "muteCallsState",
      "altSBState",
      "recentGroupsState",
      "emojiStatusState",
      "sliderValue",
      "checkboxStateAva",
      "checkboxState",
      "checkboxState1",
      "secretFuncState",
      "postReactionsState",
      "hiderState",
      "customAccent",
      "colorPicker",
      "colorPickerText",
      "customLogo",
      "customBg",
      "customFont",
    ],
    function (items) {
      const isOldAccentChecked = items.checkboxState;
      const isMsgReactionsChecked = items.checkboxState1;
      const isPostReactionsChecked = items.postReactionsState;
      const isSecretChecked = items.secretFuncState;
      const isHiderChecked = items.hiderState;
      const cAccentValue = items.customAccent;
      const cColorValue = items.colorPicker;
      const cTextValue = items.colorPickerText;
      const cLogoValue = items.customLogo;
      const cBgValue = items.customBg;
      const cFontValue = items.customFont;
      const isNameAva = items.checkboxStateAva;
      const sliderValueCount = items.sliderValue;
      const emojiStatusChecked = items.emojiStatusState;
      const recentGroupsChecked = items.recentGroupsState;
      const altSBChecked = items.altSBState;
      const muteCallsChecked = items.muteCallsState;
      const cHotBarValue = items.customHotbar;
      const addStickerChecked = items.addstickerState;
      const cameraPhotoChecked = items.cameraPhotoState;
      const hideButtonChecked = items.hideButtonState;
      const newDesignChecked = items.newDesignState;
      const integrationMediaChecked = items.integrationMediaState;
      const nechitalkaChecked = items.nechitalkaState;
      const nepisalkaChecked = items.nepisalkaState;
      const pollResultsChecked = items.pollResultsState;
      const removeAwayChecked = items.removeAwayState;
      const newProfilesChecked = items.newProfilesState;
      const middleNameChecked = items.middleNameState;
      const oldHoverChecked = items.oldHoverState;
      const tabletMenuChecked = items.tabletMenuState;
	  const defaultThemeChecked = items.defaultThemeState;
	  const oldBadgeChecked = items.oldBadgeState;
	  const fixMenuChecked = items.fixMenuState;
	  const messageCounterСhecked = items.messageCounterState;
	  const messageFooterСhecked = items.messageFooterState;
	  const customLeftMenuValue = items.customLeftMenuObject;
	  const garlandChecked = items.garlandState;
	  const wideFeedChecked = items.wideFeedState;
      applyStyles(
        isOldAccentChecked,
        isMsgReactionsChecked,
        isPostReactionsChecked,
        isSecretChecked,
        isHiderChecked,
        cAccentValue,
        cColorValue,
        cTextValue,
        cLogoValue,
        cBgValue,
        cFontValue,
        isNameAva,
        sliderValueCount,
        emojiStatusChecked,
        recentGroupsChecked,
        altSBChecked,
        muteCallsChecked,
        cHotBarValue,
        addStickerChecked,
        cameraPhotoChecked,
        hideButtonChecked,
        newDesignChecked,
        integrationMediaChecked,
        nechitalkaChecked,
        nepisalkaChecked,
        pollResultsChecked,
        removeAwayChecked,
        newProfilesChecked,
        middleNameChecked,
        oldHoverChecked,
        tabletMenuChecked,
		defaultThemeChecked,
		oldBadgeChecked,
		fixMenuChecked,
		messageCounterСhecked,
		customLeftMenuValue,
		garlandChecked,
		messageFooterСhecked,
		wideFeedChecked
      );
    }
  );
}
// При загрузке страницы применяем сохраненные стили
document.addEventListener("DOMContentLoaded", applySavedStyles);
// Обработчик сообщений от background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (
    message.type === "nameAva" ||
    message.type === "toggleOldAccent" ||
    message.type === "toggleMsgReactions" ||
    message.type === "toggleSecretFunctions" ||
    message.type === "togglePostReactions" ||
    message.type === "toggleHider" ||
    message.type === "toggleEmojiStatus" ||
    message.type === "toggleRecentGroups" ||
    message.type === "toggleAltSB" ||
    message.type === "toggleMuteStatus" ||
    message.type === "customAccent" ||
    message.type === "colorPicker" ||
    message.type === "colorPickerText" ||
    message.type === "customLogo" ||
    message.type === "customBg" ||
    message.type === "customFont" ||
    message.type === "sliderValue" ||
    message.type === "customHotbar" ||
    message.type === "addSticker" ||
    message.type === "toggleCameraPhoto" ||
    message.type === "toggleHideButton" ||
    message.type === "toggleNewDesign" ||
    message.type === "toggleIntegrationMedia" ||
    message.type === "toggleNechitalka" ||
    message.type === "toggleNepisalka" ||
    message.type === "togglePollResults" ||
    message.type === "toggleRemoveAway" ||
    message.type === "toggleNewProfiles" ||
    message.type === "toggleMiddleName" ||
    message.type === "toggleOldHover" ||
    message.type === "toggleTabletMenu" ||
    message.type === "toggleDefaultTheme" ||
    message.type === "toggleOldBadge" || 
	message.type === "toggleFixMenu" || 
	message.type === "toggleMessageCounter" ||
	message.type === "toggleMessageFooter" ||
	message.type === "toggleLeftMenuLabels" || 
	message.type === "toggleGarland" || 
	message.type === "toggleWideFeed"
  ) {
    applySavedStyles();
  }
  if (message.type === "checkId") {
    checkId();
  }
});

function checkId() {
  const url = window.location.href;
  var parts = url.split("/");
  var username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }
  var objectId;
  /*console.log("Username:" + username);*/
  const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      objectId = data.response.object_id;
      chrome.runtime.sendMessage({
        greeting: objectId,
      });
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
//Добавление стикера во вложения ВК(старый мессенджер, в новом не работает)
function runStickerAdder() {
  const existingStickerLink = document.querySelector(".ms_item_sticker");
  if (existingStickerLink) {
    return;
  }
  let styleElement = fromId("vken_box_sticker");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vken_box_sticker";
    document.head.appendChild(styleElement);
  }
  styleElement.id = "vken_box_sticker";
  styleElement.innerHTML = `#vken_box_layer_bg {    top: 0;    left: 0;    width: 100%;    overflow: hidden;}#vken_box_layer_bg > div > div:nth-child(3) > svg{    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' display='block' class='vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20' viewBox='0 0 20 20' width='20' height='20' style='width: 20px; height: 20px;'%3E%3Cpath fill='%23e1e3e6' fill-rule='evenodd' d='M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E") no-repeat;}#vken_box_layer_bg > div > div:nth-child(3){    right:-40px!important;    background-color:rgba(0, 0, 0, 0.44);    border-radius:999px;    padding:4px;    cursor:pointer;}#vken_box_layer_bg > div > button{    color:var(--vkui--color_text_contrast_themed);    background-color:var(--vkui--color_background_accent_themed);    border:0px;    border-radius:5px;    padding:6px 12px 6px 12px;    cursor:pointer;}#vken_box_layer_bg > div > button:hover{    background-color:var(--vkui--color_background_accent_themed--hover);}#vken_box_layer_bg > div > input[type=text]{    background: 0 0;    padding: 8px 4px 8px 4px;    color: var(--vkui--color_text_primary);        font-size: var(--vkui--font_text--font_size--compact);    font-family: var(--palette-vk-font, -apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif);    outline: 0;    box-shadow: none;    border: 1px solid var(--vkui--vkontakte_color_input_border);    border-radius: 6px;    overflow: hidden;    position: relative;}#vken_box_layer_bg > div > div.box_title{    padding-left:0px!important;    font-size: 14px;    color: var(--vkui--color_text_primary);    line-height: 32px;    height:32px;    margin-bottom:8px;    overflow: hidden;    text-overflow: ellipsis;    white-space: nowrap;}`;
  const moreItemsContainer = document.querySelector(
    ".ms_items_more._more_items"
  );
  if (!moreItemsContainer) {
    /*console.error('Контейнер не найден');*/
    return;
  }
  const stickerLink = document.createElement("a");
  stickerLink.classList.add("ms_item", "ms_item_sticker", "_type_sticker");
  stickerLink.tabIndex = "0";
  stickerLink.innerHTML =
    '<span class="MediaSelector__mediaIcon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49a3.3 3.3 0 0 0 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13 4.04 4.04 0 0 1-.97.83 5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26Zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5Zm-3-9.4a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8ZM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0Z" clip-rule="evenodd"></path></svg></span>Стикер';
  moreItemsContainer.appendChild(stickerLink);
  stickerLink.addEventListener("click", function () {
    const overlay = create(
      "div",
      {
        height: "100vh",
        zIndex: "9999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: "1",
        background: "#000000B3",
      },
      { id: "vken_box_layer_bg", className: "fixed" }
    );
    const popupContainer = create(
      "div",
      {
        width: "400px",
        backgroundColor: "var(--vkui--color_background_modal)",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        position: "relative",
      },
      { className: "popup_box_container", tabIndex: "0" }
    );
    const title = create(
      "div",
      {},
      { className: "box_title", textContent: "Прикрепление стикера" }
    );
    const textBox = create(
      "input",
      { width: "100%", marginBottom: "10px" },
      { type: "text", placeholder: "Введите ID стикера", pattern: "d*" }
    );
    textBox.addEventListener("input", function () {
      const existingButton = document.querySelector(".add-button");
      if (existingButton) {
        existingButton.remove();
      }
      createAddButton();
    });

    function createAddButton() {
      const stickerId = textBox.value;
      const addButton = document.createElement("button");
      addButton.textContent = "Добавить";
      const command = `cur.chooseMedia('sticker', '${stickerId}', {performer: '${stickerId}', title: '${stickerId}', info: ${stickerId}, duration: '${stickerId}'});`;
      addButton.setAttribute("onclick", command);
      addButton.classList.add("add-button");
      popupContainer.appendChild(addButton);
      addButton.addEventListener("click", function () {
        overlay.remove();
      });
    }
    const closeButton = create(
      "div",
      { position: "absolute", top: "10px", right: "10px" },
      {}
    );
    closeButton.addEventListener("click", function () {
      overlay.remove();
    });
    const closeIcon = create(
      "svg",
      { width: "20px", height: "20px", display: "block" },
      {}
    );
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.classList.add(
      "vkuiIcon",
      "vkuiIcon--20",
      "vkuiIcon--w-20",
      "vkuiIcon--h-20",
      "vkuiIcon--cancel_20"
    );
    closeIcon.setAttribute("viewBox", "0 0 20 20");
    closeIcon.setAttribute("width", "20");
    closeIcon.setAttribute("height", "20");
    closeIcon.style.width = "20px";
    closeIcon.style.height = "20px";
    closeIcon.style.display = "block";
    const path = document.createElement("path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute(
      "d",
      "M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06"
    );
    overlay.addEventListener("click", function (event) {
      if (!popupContainer.contains(event.target)) {
        overlay.remove();
      }
    });
    closeIcon.appendChild(path);
    closeButton.appendChild(closeIcon);
    popupContainer.appendChild(title);
    popupContainer.appendChild(textBox);
    popupContainer.appendChild(closeButton);
    overlay.appendChild(popupContainer);
    document.body.appendChild(overlay);
  });
}
//Функция копирования в буфер обмена
function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
//Загрузка скриптов из доп. функций - ниже тоже
function loadScripts() {
  if (document.querySelector("#NNVAFTTSLJUUDLPQ")) {
    console.log(
      /*"Элемент NNVAFTTSLJUUDLPQ найден на странице. Нет смысла запускать скрипты"*/
    );
  } else {
    console.log(
      /*"Элемент NNVAFTTSLJUUDLPQ не найден на странице. Запускаю скрипты"*/
    );
    /*isSecretCheckFunc();*/
    var element = document.createElement("div");
    element.id = "NNVAFTTSLJUUDLPQ";
    var parent = document.querySelector("body");
    parent.appendChild(element);
  }
}
let isFaviconReplaced = false;
let isTitleReplaced = false;

function isSecretCheckFunc() {
  try {
    var parentlnk = document.querySelector("div#top_profile_menu");
    var lnk = document.querySelector("li#l_pr a");
    var setlnk = document.querySelector("a#top_settings_link");
    var suplnk = document.querySelector("a#top_support_link");
    var loglnk = document.querySelector("a#top_logout_link");
    var name = document.querySelector("img.TopNavBtn__profileImg");
    var name2 = document.querySelector(
      'a[href*="connect.vk.com"] div[style="color: var(--text_primary);"]'
    );
    var name3 = document.querySelector(
      '[style="background-color: var(--content_tint_background); border-radius: 8px; width: 254px; font-family: inherit;"]'
    );
    if (name) {
      var namealt = name.alt;
    }
    var s = document.querySelector("a#top_profile_link");
    var q = document.createElement("div");
    var w = document.createElement("a");
    var wtext = document.createTextNode("Моя страница");
    var ewtext = document.createTextNode("My profile");
    var n = document.createElement("a");
    var ntext = document.createTextNode("Редактировать");
    var entext = document.createTextNode("Edit");
    var u = document.createElement("div");
    var k = document.createElement("div");
    var b1;
    w.classList.add("top_profile_mrow");
    n.classList.add("top_profile_mrow");
    w.setAttribute("id", "top_myprofile_link");
    n.setAttribute("id", "top_edit_link");
    n.href = "https://vk.com/edit";
    u.classList.add("top_profile_sep");
    k.classList.add("top_profile_sep");
    if (document.querySelector(".top_profile_name")) {
      console.log(
        "Элемент top_profile_name найден на странице. Нет смысла запускать скрипт"
      );
    } else {
      q.classList.add("top_profile_name");
    }
    fromId("top_profile_menu").classList.remove("top_profile_menu_new");
    fromId("top_profile_menu").classList.add("top_profile_menu");
    if (
      document.querySelector(
        'a#top_profile_link[aria-label="Настройки страницы"]'
      )
    ) {
      w.appendChild(wtext);
      n.appendChild(ntext);
    }
    if (
      document.querySelector(
        'a#top_profile_link[aria-label="Profile settings"]'
      )
    ) {
      w.appendChild(ewtext);
      n.appendChild(entext);
    }
    if (document.querySelector(".top_profile_name")) {
      console.log(
        "Элемент top_profile_name найден на странице. Нет смысла запускать скрипт"
      );
    } else {
      q.innerHTML = `` + namealt + ``;
    }
    if (lnk) {
      w.href = lnk.href;
    }
    if (namealt != null) {
      s.insertBefore(q, s.firstChild);
      setlnk.insertAdjacentElement("beforeBegin", w);
      setlnk.insertAdjacentElement("beforeBegin", n);
      n.insertAdjacentElement("beforeBegin", u);
      loglnk.insertAdjacentElement("beforeBegin", k);
      var home = document.querySelector("a#top_home_link");
      parentlnk.insertBefore(u, setlnk);
      parentlnk.insertBefore(k, loglnk);
      parentlnk.insertBefore(n, setlnk);
    }
  } catch (e) { }
  const styleElement = document.createElement("style");
  styleElement.id = "top_name";
  styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
  document.head.appendChild(styleElement);
}

function fixname1() {
  if (document.querySelector(".top_profile_name")) {
    /*console.log(
      "Элемент top_profile_name найден на странице. Нет смысла запускать скрипт"
    );*/
  } else {
    //console.log("fixname");
    try {
      var parentlnk = document.querySelector("div#top_profile_menu");
      var lnk = document.querySelector("li#l_pr a");
      var setlnk = document.querySelector("a#top_settings_link");
      var suplnk = document.querySelector("a#top_support_link");
      var loglnk = document.querySelector("a#top_logout_link");
      var name = document.querySelector("img.TopNavBtn__profileImg");
      var name2 = document.querySelector(
        'a[href*="connect.vk.com"] div[style="color: var(--text_primary);"]'
      );
      var name3 = document.querySelector(
        '[style="background-color: var(--content_tint_background); border-radius: 8px; width: 254px; font-family: inherit;"]'
      );
      if (name) {
        var namealt = name.alt;
      }
      var s = document.querySelector("a#top_profile_link");
      var q = document.createElement("div");
      var w = document.createElement("a");
      var wtext = document.createTextNode("Моя страница");
      var ewtext = document.createTextNode("My profile");
      var n = document.createElement("a");
      var ntext = document.createTextNode("Редактировать");
      var entext = document.createTextNode("Edit");
      var u = document.createElement("div");
      var k = document.createElement("div");
      q.classList.add("top_profile_name");
      q.innerHTML = `` + namealt + ``;
      if (lnk) {
        w.href = lnk.href;
      }
      if (namealt != null) {
        s.insertBefore(q, s.firstChild);
        setlnk.insertAdjacentElement("beforeBegin", w);
        var home = document.querySelector("a#top_home_link");
        parentlnk.insertBefore(u, setlnk);
        parentlnk.insertBefore(k, loglnk);
        parentlnk.insertBefore(n, setlnk);
      }
    } catch (e) { }
    const styleElement = document.createElement("style");
    styleElement.id = "top_name";
    styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
    document.head.appendChild(styleElement);
  }
}
