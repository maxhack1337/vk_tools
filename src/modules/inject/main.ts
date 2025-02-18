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
import refreshFeed from "./functions/refreshFeed/refreshFeed";
import convoButtons from "./functions/convoButtons/convoButtons";
import removedMessages from "./functions/removedMessages/removedMessages";
import editMessages from "./functions/editMessages/editMessages";
import regDate from "./functions/regDate/regDate";
import downloadVideo from "./functions/downloadVideo/downloadVideo";
import downloadAlbum from "./functions/downloadAlbum/downloadAlbum";
import swapPhoto from "./functions/swapPhoto/swapPhoto";
import downloadAudioMessage from "./functions/downloadAudioMessage/downloadAudioMessage";
import graffityVoice from "./functions/graffityVoice/graffityVoice";
import resetFunctionsOnInstall from "./install/resetFunctionsOnInstall";
import messageTextUp from "./functions/messageTextUp/messageTextUp";
import oldFeed from "./functions/oldFeed/oldFeed";
import downloadMusic from "./functions/downloadMusic/downloadMusic";
import feedReorder from "./functions/feedReorder/feedReorder";
import feedReorderRemove from "./functions/feedReorder/feedReorderRemove";
import oldGroupsPage from "./functions/oldGroupsPage/oldGroupsPage";
import oldPosting from "./functions/oldPosting/oldPosting";
import oldMessenger from "./functions/oldMessenger/oldMessenger";
import createStyle from "./functions/classicalProfile/scripts/createStyle";

console.log('[VK Tools] Injected');
//Старый редактор постов
oldPosting();
const adsSelector = [
  ".page_block.feed_blog_reminder_large",
  "._ads_block_data_w",
  ".mailru-visibility-check",
  "[class^=ads_ads_box]",
  "#ads_left",
  ".page_block.apps_feedRightAppsBlock.apps_feedRightAppsBlock_single_app--",
  ".ads_ad_box.ver.repeat_ver.size_site.adaptive_ad",
  ".profile_rate_warning",
  ".post[data-ad-block-uid]",
  ".apps_feedRightAppsBlock__row",
  ".apps_feedRightAppsBlock",
  ".apps_feedRightAppsBlock_new_apps",
  ".NewMiniAppsRightBlock__root",
  "#achievement_game",
  ".MarketItemsPortlet",
  ".feed_row:has([id^='postad'])",
  "[id^='post'][data-ad-block-uid]"
];

createStyle('antiAds', `
#feed_rows > [class]:has(.post:not([onclick^='wall.postClick'])) {
  display: none;
}
`);

window.MotionKit = {}
Object.freeze(window.MotionKit)

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

    XMLHttpRequest.prototype.send = async function (data) {
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
      
    if (/subsection=recent/.test(dataString)) {
      localStorage.setItem('feedValue', 'recent');
      await feedReorder();
    }
      
    if (/subsection=top/.test(dataString)) {
      localStorage.setItem('feedValue', 'top');
      await feedReorder();
    }
      
    if (/loaded_from=navigation/.test(dataString)) {
      feedReorderRemove();
      await feedReorder();
    }
    return originalSend.call(this, data);
  };
}

XHRListener();

deferredCallback(
  () => {
    nav.subscribeOnModuleEvaluated(async () => {
      await feedReorder();
    });
  },
  { variable: "nav" }
);


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
  let messageAct;
  try {
    messageAct = event.data.action.messageAction;
  }
  catch (error) {
    messageAct = '';
  }
  switch (messageAct) {
    case "oldClubEnabled": {
      localStorage.setItem("oldClubs", 'true');
      break;
    }
    case "oldClubDisabled": {
      localStorage.setItem("oldClubs", 'false');
      break;
    }
    case "feedOldThemeEnabled": {
      localStorage.setItem("feedOldPosts", 'true');
      break;
    }
    case "feedOldThemeDisabled": {
      localStorage.setItem("feedOldPosts", 'false');
      break;
    }
    case "messageTextUpEnabled": {
      localStorage.setItem("isMessageTextUp", 'true');
      break;
    }
    case "messageTextUpDisabled": {
      localStorage.setItem("isMessageTextUp", 'false');
      break;
    }
    case "resetFunctions": {
      resetFunctionsOnInstall();
      break;
    }
    case "oldMessengerDesign": {
      localStorage.setItem("oldMessengerDes", event.data.value.messageValue);
      break;
    }
    case "refreshFeed": {
      localStorage.setItem("refreshFeed", event.data.value.messageValue);
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
        convoButtons();
        //Восстановить фото
        restorePhoto();
        //Возвращение поддержки
        backSupport();
        //Классик профиль
        if (getLocalValue("isClassicalProfileDesign")) classicalProfile();
        //Граффити в комментах
        //commentsGraffity();
        //Удалённые сообщения
        removedMessages();
        //Редактированные сообщения
        editMessages();
        //Дата регистрации в новом профиле
        regDate();
        //Скачивание видео
        downloadVideo();
        //Скачивание альбома
        downloadAlbum();
        //Подмена фото
        swapPhoto();
        //Скачивание гс
        downloadAudioMessage();
        //Кнопки гс и граффити в мессенджере
        graffityVoice();
        //Старый дизайн ленты и постов
        oldFeed();
        //Скачивание музыки
        downloadMusic();
        //Старый дизайн страницы сообществ
        oldGroupsPage();
        
  },
  { variable: "getLang" }
);
//Эмодзи-хотбар
hotBar();
//Доп функции в мессенджере и смена отчества
      deferredCallback(
        () => {
          let orig_ajax = ajax.post;
          ajax.post = function (...e: any) {
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
            const t = orig_ajax.apply(this, e);
            return t;
          };
        },
        { variable: "ajax" }
);
//Тогглы в новом дизайне мессенджера
newDesign();
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
//Кнопка обновления стены
refreshFeed();
//Удалить кеш удалёнок и редактированных
window.addEventListener("beforeunload", () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("convoMessage") || key.startsWith("deletedMSG")) {
      localStorage.removeItem(key);
    }
  });
});
//Удалить away.php
if (localStorage.getItem("removeAway") === "true") {
  const awayHrefs = [
    'a[href^="https://vk.com/away.php"]',
    'a[href^="/away.php"]',
  ];
  document.arrive(awayHrefs.join(', '), { existing: true }, function (link) {
    const hrefable = link as HTMLAnchorElement;
    const url = new URL(hrefable.href);
    const toParam = url.searchParams.get("to");
    if (toParam) {
      const decodedUrl = decodeURIComponent(toParam);
      hrefable.href = decodedUrl;
    }
  });
}
//Текст сверху сообщения
messageTextUp();
//Старый дизайн мессенджера
oldMessenger();

