import deferredCallback from "./defferedCallback";
import getUserDataLocalStoragePhoto from "./functions/getUserDataLocalStoragePhoto";
import getLocalValue from "./getLocalValue";
import customMessage from "../content/postMessage";
import updateReactState from "./functions/removeReacts/updateReactState";
import likesMargin from "./functions/removeReacts/likesMargin";
import pollResults from "./functions/pollsResults/pollResults";
import hoverTag from "./functions/hoverTag/hoverTag";
import spamButton from "./functions/messengerButtons/spamButton";
import fromId from "../content/fromId";
import hotBar from "./functions/emojiHotBar/hotBar";
import newDesign from "./functions/newDesign/newDesign";
import updateUsers from "./functions/updateUsers/updateUsers";
import restorePhoto from "./functions/restoreOriginalPhoto/restoreOrig";
import convert from "./functions/convertLayout/convert";
import leftMenuCustom from "./functions/leftMenuCustom/leftMenuCustom";
import backSupport from "./functions/backSupport/backSupport";
import voiceEnter from "./functions/voiceEnter/voiceEnter";
import modalVideo from "./functions/modalVideo/modalVideo";
import messageCounter from "./functions/messageCounter/messageCounter";
import middleName from "./functions/middleName/middleName";
import classicalProfile from "./functions/classicalProfile/classicalProfile";

console.log('[VK Tools] Injected main intance');
const adsSelector = [
  ".page_block.feed_blog_reminder_large",
  "._ads_block_data_w",
  ".mailru-visibility-check",
  "[class^=ads_ads_box]",
  "#ads_left",
  ".page_block.apps_feedRightAppsBlock.apps_feedRightAppsBlock_single_app--",
  ".ads_ad_box.ver.repeat_ver.size_site.adaptive_ad",
  ".profile_rate_warning",
  ".post_marked_as_ads",
  ".post[data-ad-block-uid]",
  ".apps_feedRightAppsBlock__row",
  ".apps_feedRightAppsBlock",
  ".apps_feedRightAppsBlock_new_apps",
  ".NewMiniAppsRightBlock__root",
  "#achievement_game",
  ".MarketItemsPortlet"
];

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);

window.urls = null;
if (!window.vkenh) {
    window.vkenh = {};
}
window.vkenh.setEnglishMusic = 0;

convert(document);
document.arrive(".ComposerInput__input", { existing: true }, function (e) {
    convert(e);
});

deferredCallback(
  async (_vk: any) => {
    await getUserDataLocalStoragePhoto(vk.id);
  },
  { variable: "vkApi" }
);

function XHRListener() {
     const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function (data) {
    const dataString = data === null ? '' : String(data);
    if (/type=typing/.test(dataString) && getLocalValue("nepisalkaValue")) {
      return this.abort();
    }
    if (/type=audiomessage/.test(dataString) && getLocalValue("nepisalkaValue")) {
      return this.abort();
    }

    if (/act=a_mark_read/.test(dataString) && getLocalValue("nechitalkaValue")) {
      return this.abort();
    }
    if (/act=a_mard_listened/.test(dataString) && getLocalValue("nechitalkaValue")) {
      return this.abort();
    }
    return originalSend.call(this, data);
  };
}

XHRListener();

deferredCallback(
  () => {
    let currentVKID = localStorage.getItem("currentVKID");
    let currID = currentVKID ? parseInt(currentVKID) : 0;
    if (vk.id !== currID && vk.id && vk.id !== 0) {
        customMessage('tokenRemove');
      localStorage.setItem("currentVKID", vk.id.toString());
    }
    let styleElement = fromId("CheckValidationPhone");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "CheckValidationPhone";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = "#react_rootCheckValidationPhone{display: none;}";
  },
  { variable: "vkApi" }
);

deferredCallback(
  () => {
    MECommonContext.then((e) => {
      let j = e.browserEnv.api.fetch;

      e.browserEnv.api.fetch = function (method: string, params: any, ...args: any[]) {
        if (
          method === "execute" &&
          params.code &&
          params.code.includes("messages.markAsRead") &&
          getLocalValue("nechitalkaValue")
        ) {
          return new Promise(() => {});
        }
        if (method === "messages.setActivity" && getLocalValue("nepisalkaValue")) {
          return new Promise(() => {});
        }
        return j.apply(this, [method, params, ...args]);
      };
    });
  },
  { variable: "MECommonContext" }
);

window.addEventListener("message", async (event) => {
  switch (event.data.action.messageAction) {
    case "integrationMedia": {
      localStorage.setItem("intMediaValue", event.data.value.messageValue);
      break;
    }
    case "nechitalka": {
      localStorage.setItem("nechitalkaValue", event.data.value.messageValue);
      break;
    }
    case "nepisalka": {
      localStorage.setItem("nepisalkaValue", event.data.value.messageValue);
      break;
    }
    case "pollResults": {
      localStorage.setItem("pollResultsValue", event.data.value.messageValue);
      break;
    }
    case "muteCalls": {
      deferredCallback(
        () => {
          Calls.isIncomingModalHidden = true;
        },
        { variable: "Calls" }
      );
      window.addEventListener("callsQueueEvent", MuteCalls);
      break;
    }
    case "unmuteCalls": {
      window.removeEventListener("callsQueueEvent", MuteCalls);
      deferredCallback(
        () => {
          Calls.isIncomingModalHidden = false;
        },
        { variable: "Calls" }
      );
      break;
    }
      case "HotBarAppear": {
      globalThis.HotBarAppearVAL = event.data.value.messageValue;
      break;
    }
    case "removePostReactions": {
      localStorage.setItem("removePostReactions", 'true');
      try {
		updateReactState();
      } catch (error) {
		  console.log(error);
	  }
      break;
    }
    case "backPostReactions": {
      localStorage.setItem("removePostReactions", 'false');
      break;
    }
    case "videoModalEnabled": {
      localStorage.setItem("videoModal", 'true');
      break;
    }
    case "videoModalDisabled": {
      localStorage.setItem("videoModal", 'false');
      break;
    }
    case "removeAway": {
      localStorage.setItem("removeAway", event.data.value.messageValue);
      break;
    }
    case "newProfiles": {
      localStorage.setItem("isClassicalProfileDesign", event.data.value.messageValue);
      break;
    }
    case "middleName": {
      localStorage.setItem("isMiddleName", event.data.value.messageValue);
      break;
    }
    case "oldHover": {
      localStorage.setItem("isOldHover", event.data.value.messageValue);
      break;
    }
    case "defaultThemeFeed": {
      localStorage.setItem("isDefaultTheme", event.data.value.messageValue);
      break;
    }
    case "oldBadge": {
      localStorage.setItem("isOldBadge", event.data.value.messageValue);
      break;
    }
	case "oldPosting": {
      localStorage.setItem("old_post_design", event.data.value.messageValue);
      break;
    }
	case "customLeftMenu": {
      localStorage.setItem("customLeftMenuLabels", JSON.stringify(event.data.value.messageValue));
      break;
    }
    case "vkEnhancerAccessToken": {
      localStorage.setItem("vk_enhancer_access_token", event.data.value.messageValue);
      break;
    }
    case "Init": {
      window.noAdsAtAll = true;
      break;
    }
    case "Urls": {
      window.urls = event.data.urls;
      break;
    }
  }
});

function MuteCalls() {
  Calls.isIncomingModalHidden = true;
}
//Убрать реакции
updateReactState();
likesMargin();
//Результаты опроса
pollResults();
//Ховер на тег
hoverTag();

deferredCallback(
    async (_vk: any) => {
        //Дополнительные кнопки для мессенджера
        spamButton();
        //Восстановить фото
        restorePhoto();
        //Возвращение поддержки
        backSupport();
        //Классик профиль
        if (getLocalValue("isClassicalProfileDesign")) classicalProfile();
  },
  { variable: "getLang" }
);
//Эмодзи-хотбар
hotBar();
//Доп функции в мессенджере и смена отчества
      deferredCallback(
        () => {
          let orig_ajax = ajax.post;
          ajax.post = function (...e) {
            if (
              "al_profileEdit.php" === e[0] &&
              "a_save_general" === e[1].act
            ) {
              if (e[1].nickname) {
                e[1].nick_name = e[1].nickname;
                delete e[1].nickname;
              } else if (!e[1].nick_name) {
                e[1].nick_name = "";
              }
            }
            if ((newDesign(), "al_im.php" === e[0] && "im" === e[1]?.__query)) {
              const t = e[2].onDone;
              e[2].onDone = function (...e: any) {
                const n = t.apply(this, e);
                return (
                  n instanceof Promise
                    ? n.finally(() => newDesign())
                    : newDesign().catch(console.error),
                  n
                );
              };
            }
            const t = orig_ajax.apply(this, e);
            newDesign();
            return t;
          };
        },
        { variable: "ajax" }
);
//Реклама
document.arrive(adsSelector.join(","), { existing: true }, function (e) {
  e.remove();
});
//Иконки в профилях юзеров
updateUsers();
//Кастомизация левого меню
leftMenuCustom();
//Голосовой ввод
voiceEnter();
//Видео в модалке
modalVideo();
//Каунтер сообщений
messageCounter();
//Отчество
middleName();