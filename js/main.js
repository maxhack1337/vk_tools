const newDesignFunctions = [
  "vkm_chat_big_stickers",
  "vkm_mention_highlight_tertiary",
  "vkm_send_promoted_stickers",
  "vkm_settings_experimental",
  "vkm_hide_forward_author",
  "vkm_extended_reaction_picker",
  "vkm_convo_forbid_writing_all",
  "vkm_convo_member_temporary_ban",
  "vkm_message_preview_on_hover",
  "vkm_settings_hide_suggested",
  "vkm_theme_styles_settings",
  "vkm_forward_modal_multipick",
  "vkm_stickers_popup",
  "vkm_delete_chat",
  "vkm_admin_can_delete_message",
  "vkm_stickers_animation_setting",
  "vkm_gifs_autoplay",
  "vkm_show_inviter",
  "vkm_video_chat",
  "vkm_up_drafted_convos_in_list"
];
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
];
const im = /(^|\/)al_im\.php|(^|\/)im(\?|$)|\/write-?\d+|\/im\/.*/;

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);
const fromId = document.getElementById.bind(document);

let intMedia = false;
try {
  intMedia = false;
} catch (error) {}
var pollResultsValue = false;
var nechitalkaValue = false;
var nepisalkaValue = false;
var removePostReactions = false;
let ajax_replaced = null;
window.urls = null;

window.vkenh = {};
window.vkenh.setEnglishMusic = 0;

async function restoreOrig() {
  const e = new window.MessageBox();
  if (
    (await new Promise((t) => {
      e.setOptions({
        title: getLang("photos_filtered_restore"),
      }),
        e.addButton(getLang("box_restore"), () => {
          t(!0);
        }),
        e.addButton(getLang("box_cancel"), () => e.hide()),
        e.content(getLang("payments_verify_start_over_header")),
        e.show();
    }),
    !cur.pvCurPhoto)
  )
    return;
  const [t, a] = cur.pvCurPhoto.id.split("_").map((e) => parseInt(e)),
    i = cur.pvCurPhoto.peHash;
  e.showProgress(),
    window.ajax.post(
      "al_photos.php",
      {
        act: "restore_original",
        oid: t,
        pid: a,
        hash: i,
      },
      {
        onDone: async function (t, a) {
          e.hide(),
            window.showPhoto(t.id, a, t),
            (cur.pvPhoto.getElementsByTagName("img")[0].src = a);
        },
      }
    );
}

document.addEventListener("keydown", function (event) {
  if (
    (event.ctrlKey && event.key === "]") ||
    (event.ctrlKey && event.key === "ъ")
  ) {
    event.preventDefault();
    const activeElement = document.activeElement;

    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable)
    ) {
      toggleLayout(activeElement);
    }
  }
});

function toggleLayout(element) {
  let selectedText, start, end;

  if (element.isContentEditable) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      selectedText = range.toString();
      start = range.startOffset;
      end = range.endOffset;
    }
  } else {
    start = element.selectionStart;
    end = element.selectionEnd;
    selectedText = element.value.substring(start, end);
  }

  if (selectedText) {
    const convertedText = convertLayout(selectedText);

    if (element.isContentEditable) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(convertedText));
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      const beforeText = element.value.substring(0, start);
      const afterText = element.value.substring(end);

      element.value = beforeText + convertedText + afterText;
      element.setSelectionRange(start, start + convertedText.length);
    }
  }
}

function convertLayout(text) {
  const layoutMap = {
    а: "f",
    б: ",",
    в: "d",
    г: "u",
    д: "l",
    е: "t",
    ё: "`",
    ж: ";",
    з: "p",
    и: "b",
    й: "q",
    к: "r",
    л: "k",
    м: "v",
    н: "y",
    о: "j",
    п: "g",
    р: "h",
    с: "c",
    т: "n",
    у: "e",
    ф: "a",
    х: "[",
    ц: "w",
    ч: "x",
    ш: "i",
    щ: "o",
    ъ: "]",
    ы: "s",
    ь: "m",
    э: "'",
    ю: ".",
    я: "z",

    F: "А",
    ",": "Б",
    D: "В",
    U: "Г",
    L: "Д",
    T: "Е",
    "`": "Ё",
    ";": "Ж",
    P: "З",
    B: "И",
    Q: "Й",
    R: "К",
    K: "Л",
    V: "М",
    Y: "Н",
    J: "О",
    G: "П",
    H: "Р",
    C: "С",
    N: "Т",
    E: "У",
    A: "Ф",
    "[": "Х",
    W: "Ц",
    X: "Ч",
    I: "Ш",
    O: "Щ",
    "]": "Ъ",
    S: "Ы",
    M: "Ь",
    "'": "Э",
    ".": "Ю",
    Z: "Я",

    f: "а",
    ",": "б",
    d: "в",
    u: "г",
    l: "д",
    t: "е",
    "`": "ё",
    ";": "ж",
    p: "з",
    b: "и",
    q: "й",
    r: "к",
    k: "л",
    v: "м",
    y: "н",
    j: "о",
    g: "п",
    h: "р",
    c: "с",
    n: "т",
    e: "у",
    a: "ф",
    "[": "х",
    w: "ц",
    x: "ч",
    i: "ш",
    o: "щ",
    "]": "ъ",
    s: "ы",
    m: "ь",
    "'": "э",
    ".": "ю",
    z: "я",

    А: "F",
    Б: ",",
    В: "D",
    Г: "U",
    Д: "L",
    Е: "T",
    Ё: "`",
    Ж: ";",
    З: "P",
    И: "B",
    Й: "Q",
    К: "R",
    Л: "K",
    М: "V",
    Н: "Y",
    О: "J",
    П: "G",
    Р: "H",
    С: "C",
    Т: "N",
    У: "E",
    Ф: "A",
    Х: "[",
    Ц: "W",
    Ч: "X",
    Ш: "I",
    Щ: "O",
    Ъ: "]",
    Ы: "S",
    Ь: "M",
    Э: "'",
    Ю: ".",
    Я: "Z",
  };

  return text
    .split("")
    .map((char) => layoutMap[char] || char)
    .join("");
}

deferredCallback(
  async (_vk) => {
    await getUserDataLocalStoragePhoto(vk.id);
  },
  { variable: "vkApi" }
);

async function getUserDataLocalStoragePhoto(objectId) {
  try {
    var response = await vkApi.api("users.get", {
      user_ids: objectId,
      fields: "photo_id,photo_200",
    });
    localStorage.setItem("ownerPhoto200", response[0].photo_200);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function getLocalValue(item) {
  let store = localStorage.getItem(item);
  return store !== "undefined" && JSON.parse(store);
}

function XHRListener() {
  const { send } = XMLHttpRequest.prototype;

  XMLHttpRequest.prototype.send = function (data) {
    if (/type=typing/.test(data) && getLocalValue("nepisalkaValue")) {
      return this.abort();
    }
    if (/type=audiomessage/.test(data) && getLocalValue("nepisalkaValue")) {
      return this.abort();
    }

    if (/act=a_mark_read/.test(data) && getLocalValue("nechitalkaValue")) {
      return this.abort();
    }
    if (/act=a_mard_listened/.test(data) && getLocalValue("nechitalkaValue")) {
      return this.abort();
    }
    return send.apply(this, Array.prototype.slice.call(arguments));
  };
}

XHRListener();

let xuy = ["get_unread_notifications", "get_accounts"];

deferredCallback(
  () => {
    let currentVKID = localStorage.getItem("currentVKID");
    let currID = currentVKID ? parseInt(currentVKID) : 0;
    if (vk.id != currID && vk.id != false && vk.id != 0) {
      localStorage.setItem("convo_history", "[]");
      window.postMessage({ action: "tokenRemove" }, "*");
      localStorage.setItem("currentVKID", vk.id);
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
      e.browserEnv.api.fetch = function (e, n, ...o) {
        if (
          e === "execute" &&
          n.code &&
          n.code.includes("messages.markAsRead") &&
          getLocalValue("nechitalkaValue")
        ) {
          return new Promise(() => {});
        }
        if (e === "messages.setActivity" && getLocalValue("nepisalkaValue")) {
          return new Promise(() => {});
        }
        return j.apply(this, Array.prototype.slice.call(arguments));
      };
    });
  },
  { variable: "MECommonContext" }
);

window.addEventListener("message", async (event) => {
  switch (event.data.action) {
    case "integrationMedia": {
      localStorage.setItem("intMediaValue", event.data.value);
      break;
    }
    case "nechitalka": {
      localStorage.setItem("nechitalkaValue", event.data.value);
      break;
    }
    case "nepisalka": {
      localStorage.setItem("nepisalkaValue", event.data.value);
      break;
    }
    case "pollResults": {
      localStorage.setItem("pollResultsValue", event.data.value);
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
      globalThis.HotBarAppearVAL = event.data.value;
      break;
    }
    case "removePostReactions": {
      localStorage.setItem("removePostReactions", true);
      try {
		updateReactState();
      } catch (error) {
		  console.log(error);
	  }
      break;
    }
    case "backPostReactions": {
      localStorage.setItem("removePostReactions", false);
      break;
    }
    case "videoModalEnabled": {
      localStorage.setItem("videoModal", true);
      break;
    }
    case "videoModalDisabled": {
      localStorage.setItem("videoModal", false);
      break;
    }
    case "removeAway": {
      localStorage.setItem("removeAway", event.data.value);
      break;
    }
    case "newProfiles": {
      localStorage.setItem("isClassicalProfileDesign", event.data.value);
      break;
    }
    case "middleName": {
      localStorage.setItem("isMiddleName", event.data.value);
      break;
    }
    case "oldHover": {
      localStorage.setItem("isOldHover", event.data.value);
      break;
    }
    case "defaultThemeFeed": {
      localStorage.setItem("isDefaultTheme", event.data.value);
      break;
    }
    case "oldBadge": {
      localStorage.setItem("isOldBadge", event.data.value);
      break;
    }
	case "oldPosting": {
      localStorage.setItem("old_post_design", event.data.value);
      break;
    }
	case "customLeftMenu": {
      localStorage.setItem("customLeftMenuLabels", JSON.stringify(event.data.value));
      break;
    }
    case "vkEnhancerAccessToken": {
      localStorage.setItem("vk_enhancer_access_token", event.data.value);
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
              e[2].onDone = function (...e) {
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

            return newDesign, t;
          };
          ajax_replaced = true;
        },
        { variable: "ajax" }
      );

document.arrive("#owner_page_name", { existing: true }, function (e) {
  updateUsers();
});

document.arrive(".pv_more_acts", { existing: true }, function (e) {
  let i = document.createElement("button");
  i.textContent = getLang("photos_filtered_restore");
  i.classList.add("pv_more_act_item");
  i.id = "pv_more_act_orig";
  i.addEventListener("click", async function () {
    restoreOrig();
  });
  if (cur.pvCurPhoto.actions.edit && window.cur.pvCurPhoto.was_edited) {
    let styleElement = fromId("restorePhotoStyle");
    if (!styleElement) {
      styleElement = create("style", {}, { id: "restorePhotoStyle" });
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = `#pv_more_act_orig:before{
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23fff' viewBox='0 0 20 20'%3E%3Cpath fill-rule='evenodd' d='M10 5.75a.75.75 0 0 1 .75.75v2.837c0 .129 0 .2.003.255a.238.238 0 0 0 .067.164c.037.04.088.09.18.182l1.533 1.531a.75.75 0 1 1-1.06 1.062c-.523-.522-1.044-1.045-1.568-1.566a2.569 2.569 0 0 1-.397-.464 1.75 1.75 0 0 1-.21-.507c-.049-.204-.048-.414-.048-.61.002-.96 0-1.922 0-2.884a.75.75 0 0 1 .75-.75Z M8.106 3.261a7 7 0 1 1-2.847 11.89.75.75 0 0 0-1.015 1.103A8.5 8.5 0 1 0 4 3.98v-.976a.75.75 0 0 0-1.5 0v2.36c0 .058 0 .139.006.212.007.088.027.229.103.379a1 1 0 0 0 .437.437c.15.076.29.096.379.103.073.006.154.006.212.006H6A.75.75 0 0 0 6 5h-.899a7 7 0 0 1 3.005-1.739Z'%3E%3C/path%3E%3C/svg%3E")!important;
	scale: .9;
	background-position: 0;}`;
    e.prepend(i);
  } else {
    const customStyle = fromId("restorePhotoStyle");
    if (customStyle) {
      customStyle.remove();
    }
  }
});

document.arrive(".ComposerInput__input", { existing: true }, function (e) {
  e.addEventListener("keydown", function (event) {
    if (
      (event.ctrlKey && event.key === "]") ||
      (event.ctrlKey && event.key === "ъ")
    ) {
      event.preventDefault();
      const activeElement = document.activeElement;

      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        toggleLayout(activeElement);
      }
    }
  });
});
///ЛЕВОЕ МЕНЮ КАСТОМИЗАЦИЯ///
document.arrive('[class^="vkitLeftMenuItem__container"]', { existing: true }, function (e) {
	try {
		let leftTabs = JSON.parse(localStorage.getItem('customLeftMenuLabels'));
		let savedString = e.querySelector('[data-testid="leftmenuitem-text"]').textContent;
		switch(e.id) {
			case "l_pr":
				savedString = leftTabs.profileLeft;
				break;
			case "l_nwsf":
				savedString = leftTabs.feedLeft;
				break;
			case "l_msg":
				savedString = leftTabs.imLeft;
				break;
			case "l_ca":
				savedString = leftTabs.callsLeft;
				break;
			case "l_fr":
				savedString = leftTabs.friendsLeft;
				break;
			case "l_gr":
				savedString = leftTabs.groupsLeft;
				break;
			case "l_ph":
				savedString = leftTabs.photoLeft;
				break;
			case "l_aud":
				savedString = leftTabs.audioLeft;
				break;
			case "l_vid":
				savedString = leftTabs.videoLeft;
				break;
			case "l_svd":
				savedString = leftTabs.clipsLeft;
				break;
			case "l_ap":
				savedString = leftTabs.gamesLeft;
				break;
			case "l_stickers":
				savedString = leftTabs.stickersLeft;
				break;
			case "l_mk":
				savedString = leftTabs.marketLeft;
				break;
			case "l_mini_apps":
				savedString = leftTabs.appsLeft;
				break;
			case "l_vkp":
				savedString = leftTabs.vkPayLeft;
				break;
			case "l_fav":
				savedString = leftTabs.bookLeft;
				break;
			case "l_doc":
				savedString = leftTabs.docsLeft;
				break;
			case "l_ads":
				savedString = leftTabs.adsLeft;
				break;
			case "l_apm":
				savedString = leftTabs.manageLeft;
				break;
			case "l_faq":
				savedString = leftTabs.helpLeft;
				break;
				
		}
		if(savedString) {
			e.querySelector('[data-testid="leftmenuitem-text"]').textContent = savedString;
		}
	}
	catch(error) {
		
	}
  }
);
///КОНЕЦ КАСТОМИЗАЦИИ ЛЕВОГО МЕНЮ///
///ВОЗВРАЩЕНИЕ ПОДДЕРЖКИ///
document.arrive('.faq_tabs:not(:has([href="support?act=new"]))', { existing: true }, function (e) {
	let isAlready = !document.querySelector('.vkEnhancerSupportLink');
  if(isAlready) {
	let support = document.createElement('a');
	support.id = "new_link";
	support.classList.add('vkEnhancerSupportLink');
	try {
	support.innerText = getLang('support_ask_question');
	} catch(error) {
	support.innerText = 'Задать вопрос';	
	}
	support.href = "https://vk.com/support?act=new&from=pass_faq";
	support.style = "float:right;padding-bottom:0px;padding-left:10px;padding-right:10px;padding-top:16px;text-decoration-line:none;text-decoration-style:solid;text-decoration-thickness:auto;";
	e.appendChild(support);
  }
});

document.arrive('.tickets_new_link', { existing: true }, function (e) {
	e.remove();
});
///КОНЕЦ ВОЗВРАЩЕНИЯ ПОДДЕРЖКИ///
///ГОЛОСОВОЙ ВВОД///
function golos() {
  if (!("webkitSpeechRecognition" in window)) {
    console.log(
      "[VKENH Error] Ваш браузер не поддерживает Web Speech API. Голосовой ввод недоступен"
    );
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.continuous = false;
  recognition.interimResults = false;

  let currentEditableElement = null;

  recognition.onstart = function () {
    if (currentEditableElement) {
      currentEditableElement.style.backgroundColor = "#e0ffe0";
    }
  };

  recognition.onend = function () {
    if (currentEditableElement) {
      currentEditableElement.style.backgroundColor = "";
    }
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    if (currentEditableElement) {
      if (currentEditableElement.isContentEditable) {
        currentEditableElement.textContent += transcript;
      } else {
        currentEditableElement.value += transcript;
      }
    }
  };
  let isStarted = false;
  function handleKeyPress(event) {
    if (
      ((event.ctrlKey && event.key === "'") ||
        (event.ctrlKey && event.key === "э")) &&
      !isStarted
    ) {
      isStarted = true;
      event.preventDefault();
      currentEditableElement = event.target;
      recognition.start();
    } else if (
      ((event.ctrlKey && event.key === "'") ||
        (event.ctrlKey && event.key === "э")) &&
      isStarted
    ) {
      isStarted = false;
      event.preventDefault();
      currentEditableElement = event.target;
      recognition.stop();
    }
  }
  document.arrive(
    `input, textarea, [contenteditable="true"]`,
    { existing: true },
    async function (e) {
      e.addEventListener("keydown", handleKeyPress);
    }
  );
}

golos();
///КОНЕЦ ГОЛОСОВОГО ВВОДА///
///СТАРЫЕ ВИДОСЫ///

if (getLocalValue("videoModal")) {
	document.arrive(`body:not(:has(#video_choose_box)) ._video_item`,{existing:true}, async function(e) {
	e.setAttribute('onclick',`
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + e.getAttribute('data-id') + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`)
});

document.arrive(`[class^="VideoCardList__videoItem"]:has([class^="vkitVideoCardThumb__thumb"][href^="/video"])`,{existing:true}, async function(e) {
	let videoLink;
	try {
		videoLink = e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/video"]').getAttribute('href').substring(6);
	}
	catch(error) {
		
	}
	e.setAttribute('onclick',`
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`)
});

document.arrive(`[class^="vkitVideoCardLayout__card"]:has([class^="vkitVideoCardThumb__thumb"][href^="/video"])`,{existing:true}, async function(e) {
	let videoLink;
	try {
		videoLink = e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/video"]').getAttribute('href').substring(6);
	}
	catch(error) {
		
	}
	e.setAttribute('onclick',`
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`)
});


document.arrive(`[class*="vkitDraggableVideoCard__card"]:has([class^="vkitVideoCardThumb__thumb"][href^="/playlist"])`,{existing:true}, async function(e) {
	let videoLink;
	try {
		videoLink = extractVideoPart(e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]').getAttribute('href'));
	}
	catch(error) {
		
	}
	let plistID; 
	try {
		plistID = extractPlaylistPart(e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]').getAttribute('href'));
	}
	catch(error) {
		
	}
	e.setAttribute('onclick',`
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: '`+plistID+`'}, this);`)
});

document.arrive(`[class^="vkitVideoPlaylistSideBlockThumb__thumbWrapper"]:has([class^="vkitVideoCardThumb__thumb"][href^="/playlist"])`,{existing:true}, async function(e) {
	let videoLink;
	try {
		videoLink = extractVideoPart(e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]').getAttribute('href'));
	}
	catch(error) {
		
	}
	let plistID; 
	try {
		plistID = extractPlaylistPart(e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]').getAttribute('href'));
	}
	catch(error) {
		
	}
	e.setAttribute('onclick',`
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: '`+plistID+`'}, this);`);
});

document.arrive(`[class^="vkitVideoCardLayout__card"]:has([class^="vkitVideoCardThumb__thumb"][href^="/playlist"])`,{existing:true}, async function(e) {
	let videoLink;
	try {
		videoLink = extractVideoPart(e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]').getAttribute('href'));
	}
	catch(error) {
		
	}
	let plistID; 
	try {
		plistID = extractPlaylistPart(e.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]').getAttribute('href'));
	}
	catch(error) {
		
	}
	e.setAttribute('onclick',`
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: '`+plistID+`'}, this);`)
});

function extractVideoPart(href) {
  const videoIndex = href.indexOf('video');
  if (videoIndex === -1) return null;
  const videoPart = href.slice(videoIndex + 5);
  return videoPart;
}

function extractPlaylistPart(href) {
  const videoIndex = href.indexOf('video');
  if (videoIndex === -1) return null;
  const playlistPart = href.slice(10, videoIndex - 1);
 
  return playlistPart;
}
}

///КОНЕЦ СТАРЫХ ВИДОСОВ///
///ВСЕГО СООБЩЕНИЙ КОЛВО КОЛИЧЕСТВО///
function getCounterLang(lang) {
  switch (lang) {
    case 0:
      return "Всего сообщений";
      break;
    case 1:
      return "Всього повідомлень";
      break;
    case 454:
      return "Всього повідомлень";
      break;
    case 114:
      return "Усяго паведамленняў";
      break;
    case 2:
      return "Усяго паведамленняў";
      break;
    case 777:
      return "Всего телеграмм";
      break;
    case 97:
      return "Жалпы хабарлар";
      break;
    case 100:
      return "Всѣго писем";
      break;
    default:
      return "Total messages";
      break;
  }
}
function getTextTTNum(lang) {
  switch (lang) {
    case 0:
      return [
        "Количество сообщений в пределах нормы. Можете пользоваться мессенджером",
        "Количество сообщений приближается к ограничителю в 15.000.000. Будьте внимательны",
        "Количество сообщений приближается к ограничителю в 15.000.000. Рекомендуем скачать архив с сообщениями",
      ];
      break;
    case 1:
      return [
        "Кількість повідомлень у межах норми. Можете користуватися месенджером",
        "Кількість повідомлень наближається до ліміту до 15.000.000. Будьте уважні",
        "Кількість повідомлень наближається до ліміту до 15.000.000. Рекомендуємо завантажити архів із повідомленнями",
      ];
      break;
    case 454:
      return [
        "Кількість повідомлень у межах норми. Можете користуватися месенджером",
        "Кількість повідомлень наближається до ліміту до 15.000.000. Будьте уважні",
        "Кількість повідомлень наближається до ліміту до 15.000.000. Рекомендуємо завантажити архів із повідомленнями",
      ];
      break;
    case 114:
      return [
        "Колькасць паведамленняў у межах нормы. Можаце карыстацца мэсанджарам",
        "Колькасць паведамленняў набліжаецца да абмежавальніка ў 15.000.000. Будзьце ўважлівыя",
        "Колькасць паведамленняў набліжаецца да абмежавальніка ў 15.000.000. Рэкамендуем спампаваць архіў з паведамленнямі",
      ];
      break;
    case 2:
      return [
        "Колькасць паведамленняў у межах нормы. Можаце карыстацца мэсанджарам",
        "Колькасць паведамленняў набліжаецца да абмежавальніка ў 15.000.000. Будзьце ўважлівыя",
        "Колькасць паведамленняў набліжаецца да абмежавальніка ў 15.000.000. Рэкамендуем спампаваць архіў з паведамленнямі",
      ];
      break;
    case 777:
      return [
        "Количество телеграмм в пределах нормы. Можете пользоваться телеграфом",
        "Количество телеграмм приближается к ограничителю в 15.000.000. Будьте внимательны",
        "Количество телеграмм приближается к ограничителю в 15.000.000. Рекомендуем скачать досье с телеграммами",
      ];
      break;
    case 97:
      return [
        "Хабарламалар саны қалыпты шектерде. Сіз мессенджерді пайдалана аласыз",
        "Хабарламалар саны 15.000.000 шегіне жақындап қалды. Сақ болыңыз",
        "Хабарламалар саны 15.000.000 шегіне жақындап қалды. Хабарламалары бар мұрағатты жүктеп алуды ұсынамыз",
      ];
      break;
    case 100:
      return [
        "Количество сообщений в пределах нормы. Можете пользоваться мессенджером",
        "Количество сообщений приближается к ограничителю в 15.000.000. Будьте внимательны",
        "Количество сообщений приближается к ограничителю в 15.000.000. Рекомендуем скачать архив с сообщениями",
      ];
      break;
    default:
      return [
        "The number of messages is within normal limits. You can use messenger",
        "The number of messages is approaching the limit of 15.000.000. Be careful",
        "The number of messages is approaching the limit of 15.000.000. We recommend downloading the archive with messages",
      ];
      break;
  }
}
document.arrive(
  ".ConvoList__scrollbar-content",
  { existing: true },
  async function lyagushka(e) {
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
    let counterColor = countermsg.querySelector(".vkEnIconWatnCount");
    counterColor.style.backgroundColor = "var(--vkui--color_icon_secondary)";
    if (idMess < 10000000) {
      iconn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2803 8.78033C13.5732 8.48744 13.5732 8.01256 13.2803 7.71967C12.9874 7.42678 12.5126 7.42678 12.2197 7.71967L9 10.9393L7.78033 9.71967C7.48744 9.42678 7.01256 9.42678 6.71967 9.71967C6.42678 10.0126 6.42678 10.4874 6.71967 10.7803L8.46967 12.5303C8.76256 12.8232 9.23744 12.8232 9.53033 12.5303L13.2803 8.78033Z" fill="#219653"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10ZM17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" fill="#219653"/>
</svg>
`;
      countermsg
        .querySelector(".ConvoListFilter")
        .setAttribute(
          `onclick`,
          `showFastBox(getLang("me_convo_profile_info"), "${
            getTextTTNum(vk.lang)[0]
          }", getLang("global_close"));`
        );
    } else if (idMess < 14000000) {
      iconn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14Z" fill="#F2994A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3757 3.36327C12.2181 3.09234 11.4897 2.00101 9.99924 2.00101C8.50879 2.00101 7.79028 3.07794 7.62431 3.36327L1.52311 13.8521C1.11213 14.5586 1.03548 15.4106 1.31378 16.179C1.70981 17.2725 2.74912 18.001 3.91316 18.001H16.0868C17.2509 18.001 18.2902 17.2725 18.6862 16.179C18.9645 15.4106 18.8879 14.5586 18.4769 13.8521L12.3757 3.36327ZM16.0868 16.5025C16.6192 16.5025 17.0946 16.1693 17.2757 15.6692C17.403 15.3178 17.3679 14.9281 17.18 14.6049L11.0788 4.11615C11.0788 4.11615 10.7499 3.49487 9.99921 3.49487C9.24848 3.49487 8.92124 4.11615 8.92124 4.11615L2.82003 14.6049C2.63207 14.9281 2.59701 15.3178 2.72429 15.6692C2.90543 16.1693 3.38077 16.5025 3.91316 16.5025H16.0868Z" fill="#F2994A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 6.00003C10.4142 6.00003 10.7499 6.33582 10.7499 6.75003V11.25C10.7499 11.6642 10.4142 12 9.99994 12C9.58573 12 9.24994 11.6642 9.24994 11.25V6.75003C9.24994 6.33582 9.58573 6.00003 9.99994 6.00003Z" fill="#F2994A"/>
</svg>
`;
      countermsg
        .querySelector(".ConvoListFilter")
        .setAttribute(
          `onclick`,
          `showFastBox(getLang("global_warning"), "${
            getTextTTNum(vk.lang)[1]
          }", getLang("me_invite_link_qr_download"), (()=>{window.open('https://vk.com/data_protection?section=rules&scroll_to_archive=1', '_blank'); }), getLang("box_cancel"));`
        );
    } else if (idMess < 15000000) {
      iconn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14C9 13.4477 9.44772 13 10 13C10.5523 13 11 13.4477 11 14Z" fill="#EB5757"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.3757 3.36327C12.2181 3.09234 11.4897 2.00101 9.99924 2.00101C8.50879 2.00101 7.79028 3.07794 7.62431 3.36327L1.52311 13.8521C1.11213 14.5586 1.03548 15.4106 1.31378 16.179C1.70981 17.2725 2.74912 18.001 3.91316 18.001H16.0868C17.2509 18.001 18.2902 17.2725 18.6862 16.179C18.9645 15.4106 18.8879 14.5586 18.4769 13.8521L12.3757 3.36327ZM16.0868 16.5025C16.6192 16.5025 17.0946 16.1693 17.2757 15.6692C17.403 15.3178 17.3679 14.9281 17.18 14.6049L11.0788 4.11615C11.0788 4.11615 10.7499 3.49487 9.99921 3.49487C9.24848 3.49487 8.92124 4.11615 8.92124 4.11615L2.82003 14.6049C2.63207 14.9281 2.59701 15.3178 2.72429 15.6692C2.90543 16.1693 3.38077 16.5025 3.91316 16.5025H16.0868Z" fill="#EB5757"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 6.00003C10.4142 6.00003 10.7499 6.33582 10.7499 6.75003V11.25C10.7499 11.6642 10.4142 12 9.99994 12C9.58573 12 9.24994 11.6642 9.24994 11.25V6.75003C9.24994 6.33582 9.58573 6.00003 9.99994 6.00003Z" fill="#EB5757"/>
</svg>
`;
      countermsg
        .querySelector(".ConvoListFilter")
        .setAttribute(
          `onclick`,
          `showFastBox(getLang("global_warning"), "${
            getTextTTNum(vk.lang)[2]
          }", getLang("me_invite_link_qr_download"), (()=>{window.open('https://vk.com/data_protection?section=rules&scroll_to_archive=1', '_blank'); }), getLang("box_cancel"));`
        );
    }
	
	   countermsg.querySelector("#vkEnhancerRebootMessageCounter").addEventListener("click", function (s) {
		s.preventDefault();
		s.stopPropagation();
		countermsg.remove();
		lyagushka(e);
	   });
    e.prepend(countermsg);
  }
);
///КОНЕЦ ВСЕГО СООБЩЕНИЙ///
///ОТЧЕСТВО///
function getMiddleLang(lang) {
  switch (lang) {
    case 0:
      return "Отчество:";
      break;
    case 1:
      return "По-батькові:";
      break;
    case 454:
      return "По-батькові:";
      break;
    case 114:
      return "Імя па бацьку:";
      break;
    case 2:
      return "Імя па бацьку:";
      break;
    case 777:
      return "Отчество:";
      break;
    case 97:
      return "Әкенің аты:";
      break;
    case 100:
      return "Отчество:";
      break;
    default:
      return "Middle name:";
      break;
  }
}
if (getLocalValue("isMiddleName")) {
  document.arrive("#pedit_general", { existing: true }, async function (e) {
    let pedit_middle = document.createElement("div");
    pedit_middle.classList.add("pedit_row");
    pedit_middle.classList.add("clear_fix");
    pedit_middle.style.paddingTop = "20px";
    pedit_middle.innerHTML = `
        <div class="pedit_label">${getMiddleLang(vk.lang)}</div>
        <div class="pedit_labeled"><input type="text" class="dark" id="pedit_middle_name"></div>
`;
    let sep = document.createElement("div");
    sep.classList.add("pedit_separator");
    deferredCallback(
      async (_vk) => {
        let curmid = await vkApi.api("users.get", {
          fields: "nickname",
          id: vk.id,
        });
        pedit_middle.querySelector("#pedit_middle_name").value =
          curmid[0].nickname;
      },
      { variable: "vkApi" }
    );
    if (!nav.objLoc.act) {
      e.prepend(sep);
      e.prepend(pedit_middle);
    }
  });
}
///ОТЧЕСТВО КОНЕЦ///
///ДАТА РЕГИ В НОВОМ ПРОФИЛЕ///
async function getIdAntiAsync1() {
  const url = window.location.href;
  var parts = url.split("/");
  var username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }
  const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
  return fetch(url1)
    .then((response) => response.json())
    .then((data) => data.response.object_id)
    .catch((error) => {
      console.error(error);
      return 1;
    });
}
function getMonthName(month) {
  var monthNames = [
    getLang("month1_of"),
    getLang("month2_of"),
    getLang("month3_of"),
    getLang("month4_of"),
    getLang("month5_of"),
    getLang("month6_of"),
    getLang("month7_of"),
    getLang("month8_of"),
    getLang("month9_of"),
    getLang("month10_of"),
    getLang("month11_of"),
    getLang("month12_of"),
  ];
  return monthNames[parseInt(month) - 1];
}
function formatRegister(bdate) {
  if (!bdate) return null;
  var parts = bdate.split(".");
  var day = parts[0];
  var month = getMonthName(parts[1]);
  var year = parts[2];
  var formattedDate = `${day} ${month}`;
  var profileBDayYearLetter = getLang("profile_birthday_year_date");
  let regex = /{year}(.*?){\/link_year}/;
  let match = profileBDayYearLetter.match(regex);
  let formattedYearLetter = match ? match[1].replace(/\s/g, "") : "";
  var yearLink = year;
  if (year) {
    formattedDate += ` ${yearLink}`;
  }
  return `${formattedDate}`;
}
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
function formatRegDate1(unixTimestamp) {
  const date = new Date(unixTimestamp);
  const formattedDate = [
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
    `(${padZero(date.getHours())}:${padZero(date.getMinutes())})`,
  ];
  return formattedDate;
}
async function getRegDateValue1(id) {
  const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
  if (regDateAlready) return formatRegDate1(regDateAlready);

  const foafGet = await fetch(`https://vk.com/foaf.php?id=${id}`);
  const response = await foafGet.text();
  const [, regDateReady] = response.match(/ya:created dc:date="(.+?)"/) || [];
  if (regDateReady) {
    const regDateReadyUNIX = new Date(regDateReady).getTime();
    localStorage.setItem(`regDate_${id}`, regDateReadyUNIX);
    return formatRegDate1(regDateReadyUNIX);
  }
}
function getRegDateLabelNew(lang) {
  switch (lang) {
    case 0:
      return "Дата регистрации:";
      break;
    case 1:
      return "Дата реєстрації:";
      break;
    case 454:
      return "Дата реєстрації:";
      break;
    case 114:
      return "Дата рэгістрацыі:";
      break;
    case 2:
      return "Дата рэгістрацыі:";
      break;
    case 777:
      return "Дата заведения досье:";
      break;
    case 97:
      return "Тіркеу күні:";
      break;
    case 100:
      return "Дата рѣгистрацiи:";
      break;
    default:
      return "Registration date:";
      break;
  }
}
document.arrive(
  `[class^="ProfileFullInfoModal__content"]>section:nth-child(1)`,
  { existing: true },
  async function (e) {
    try {
      let regDateText1 = getRegDateLabelNew(vk.lang);
      let uiddd = await getIdAntiAsync1();
      let regDateValue1 = await getRegDateValue1(uiddd);
      let regDateDate1 = formatRegister(regDateValue1[0]);
      regDateDate1 += " " + regDateValue1[1];
      let registrationRow1 = document.createElement(`div`);
      registrationRow1.classList.add("ProfileModalMiniInfoCell");
      registrationRow1.innerHTML = `
		  <div class="ProfileModalMiniInfoCell__before">
		  <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 ProfileFullCommonInfo__icon" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;">
		  <path fill="currentColor" d="M7.13 1.323a.75.75 0 0 1 1.043-.197c.749.51 1.235 1.012 1.484 1.56.262.577.212 1.095.128 1.5a10 10 0 0 1-.086.363l-.038.154a2 2 0 0 0-.06.381c-.008.187.025.408.254.721a.75.75 0 1 1-1.21.886c-.43-.586-.565-1.141-.543-1.67.01-.248.055-.472.098-.658l.057-.233c.022-.084.04-.156.06-.249.053-.258.049-.41-.026-.575-.087-.192-.32-.503-.963-.942a.75.75 0 0 1-.198-1.041m9.844 4.73c-.211.338-.49.702-.899.99-.72.509-1.495.721-2.106.889l-.2.055c-.672.189-1.114.357-1.456.745a.75.75 0 0 1-1.124-.992c.657-.744 1.488-1.004 2.175-1.197l.193-.054c.635-.176 1.158-.322 1.653-.67.184-.13.337-.313.49-.56a6 6 0 0 0 .275-.492c.057-.109.119-.226.194-.361.167-.3.39-.662.726-.94a2.04 2.04 0 0 1 1.369-.467.75.75 0 1 1-.018 1.5c-.204-.003-.309.05-.393.12-.111.092-.224.246-.373.514-.039.07-.085.158-.135.254-.11.207-.24.456-.371.666"></path><path fill="currentColor" fill-rule="evenodd" d="M6.145 7.997a2.3 2.3 0 0 1 .505.05c.4.086.727.31 1.021.56.287.244.616.58 1.007.978l1.795 1.83c.387.395.713.727.95 1.016.242.297.457.625.536 1.023a2.25 2.25 0 0 1-.32 1.664c-.22.34-.541.566-.877.752-.327.18-.752.368-1.258.592L6.25 17.899c-.86.38-1.553.686-2.097.872-.521.178-1.088.316-1.61.15a2.25 2.25 0 0 1-1.47-1.482c-.162-.524-.02-1.089.163-1.608.19-.543.502-1.232.89-2.09l1.471-3.255c.23-.509.424-.937.61-1.265q.128-.233.293-.445a1.8 1.8 0 0 1 .472-.432 2.25 2.25 0 0 1 1.173-.347m-1.137 3.009-.809 1.79a5.32 5.32 0 0 0 2.764 3.149l2.032-.898a6.83 6.83 0 0 1-3.987-4.041m5.494 2.905a5.31 5.31 0 0 1-4.339-4.415.8.8 0 0 1 .17.017c.04.008.14.043.366.236.23.195.51.48.933.91l1.746 1.782c.418.425.695.709.883.94.186.227.219.326.227.366q.015.082.014.164m-5.22 2.775a6.8 6.8 0 0 1-1.901-2.079c-.34.752-.581 1.298-.73 1.72a3 3 0 0 0-.14.517c-.016.112-.005.154-.005.154a.75.75 0 0 0 .49.493s.041.012.153-.003c.12-.015.285-.056.519-.136.402-.138.917-.358 1.615-.666Zm8.599-4.702c.746-.137 1.704-.123 2.435.206.353.159.639.384.84.69.2.304.346.737.346 1.365a.75.75 0 0 0 1.5 0c0-.871-.207-1.601-.592-2.188a3.4 3.4 0 0 0-1.478-1.234c-1.106-.498-2.401-.483-3.322-.314a.75.75 0 1 0 .271 1.475m1.989 2.697-.556-.556a.444.444 0 0 0-.628 0l-.556.556a.443.443 0 0 0 0 .628l.556.556a.444.444 0 0 0 .628 0l.556-.556a.443.443 0 0 0 0-.628M5.314 4.129l.556.556a.443.443 0 0 1 0 .627l-.556.556a.444.444 0 0 1-.628 0l-.556-.556a.443.443 0 0 1 0-.627l.556-.556a.444.444 0 0 1 .628 0m8.556-.444-.556-.556a.444.444 0 0 0-.628 0l-.556.556a.443.443 0 0 0 0 .628l.556.556a.444.444 0 0 0 .628 0l.556-.556a.443.443 0 0 0 0-.628m4.444 4.442.556.557a.443.443 0 0 1 0 .627l-.556.556a.444.444 0 0 1-.628 0l-.556-.556a.443.443 0 0 1 0-.627l.556-.557a.444.444 0 0 1 .628 0"></path>
		  </svg>
		  </div>
		  <div class="ProfileModalMiniInfoCell__in">
		  <span class="ProfileFullCommonInfo__caption">${regDateText1}
		  <span>${regDateDate1}</span>
		  </span></div>
		  `;
      if (registrationRow1) {
        e.appendChild(registrationRow1);
      }
    } catch (error) {
      console.error(
        "[VKENH Error]: There is no registration date for user " +
          (await getIdAntiAsync1()) +
          error
      );
    }
  }
);
function formatBirthday(bdate) {
  if (!bdate) return null;
  var parts = bdate.split(".");
  var day = parts[0];
  var month = getMonthName(parts[1]);
  var year = parts[2];
  var formattedDate = `${day} ${month}`;
  var profileBDayYearLetter = getLang("profile_birthday_year_date");
  let regex = /{year}(.*?){\/link_year}/;
  let match = profileBDayYearLetter.match(regex);
  let formattedYearLetter = match ? match[1].replace(/\s/g, "") : "";
  var yearLink = year
    ? `<a href="https://vk.com/search/people?birth_year=${year}">${year} ${formattedYearLetter}</a>`
    : "";
  if (year) {
    formattedDate += ` ${yearLink}`;
  }
  return `<a href="https://vk.com/search/people?birth_day=${day}&birth_month=${parts[1]}">${formattedDate}</a>`;
}

function getLangYearsOld(e, t, n) {
  const o = window.langConfig;
  if (!t || !o) {
    if (!(0, r.isNumeric)(e)) {
      const t = new Error("Non-numeric value passed to langNumeric");
      throw (console.log(e, t), t);
    }
    return String(e);
  }
  let i;
  Array.isArray(t)
    ? ((i = t[1]),
      e != Math.floor(e)
        ? (i = t[o.numRules.float])
        : (o.numRules.int || []).some((n) => {
            if ("*" === n[0]) return (i = t[n[2]]), !0;
            const r = n[0] ? e % n[0] : e;
            return Array.isArray(n[1]) && n[1].includes(r)
              ? ((i = t[n[2]]), !0)
              : void 0;
          }))
    : (i = t);
  let a = String(e);
  if (n) {
    const e = a.split("."),
      t = [];
    for (let n = e[0].length - 3; n > -3; n -= 3)
      t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
    (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
  }
  return (i = (i || "%s").replace("%s", a)), i;
}

function getZodiacIndex(den, month) {
  var value = "";
  den = Number(den);
  month = Number(month);
  switch (month) {
    case 1:
      if (den <= 19) value = getZodiacSigns(vk.lang)[9];
      else value = getZodiacSigns(vk.lang)[10];
      break;
    case 2:
      if (den <= 18) value = getZodiacSigns(vk.lang)[10];
      else value = getZodiacSigns(vk.lang)[11];
      break;
    case 3:
      if (den <= 20) value = getZodiacSigns(vk.lang)[11];
      else value = getZodiacSigns(vk.lang)[0];
      break;
    case 4:
      if (den <= 19) value = getZodiacSigns(vk.lang)[0];
      else value = getZodiacSigns(vk.lang)[1];
      break;
    case 5:
      if (den <= 20) value = getZodiacSigns(vk.lang)[1];
      else value = getZodiacSigns(vk.lang)[2];
      break;
    case 6:
      if (den <= 21) value = getZodiacSigns(vk.lang)[2];
      else value = getZodiacSigns(vk.lang)[3];
      break;
    case 7:
      if (den <= 22) value = getZodiacSigns(vk.lang)[3];
      else value = getZodiacSigns(vk.lang)[4];
      break;
    case 8:
      if (den <= 22) value = getZodiacSigns(vk.lang)[4];
      else value = getZodiacSigns(vk.lang)[5];
      break;
    case 9:
      if (den <= 22) value = getZodiacSigns(vk.lang)[5];
      else value = getZodiacSigns(vk.lang)[6];
      break;
    case 10:
      if (den <= 22) value = getZodiacSigns(vk.lang)[6];
      else value = getZodiacSigns(vk.lang)[7];
      break;
    case 11:
      if (den <= 22) value = getZodiacSigns(vk.lang)[7];
      else value = getZodiacSigns(vk.lang)[8];
      break;
    case 12:
      if (den <= 21) value = getZodiacSigns(vk.lang)[8];
      else value = getZodiacSigns(vk.lang)[9];
      break;
    default:
      value = "Zodiac parsing failed";
  }
  return value;
}
function getZodiacSigns(lang) {
  switch (lang) {
    case 0:
      return [
        "Овен",
        "Телец",
        "Близнецы",
        "Рак",
        "Лев",
        "Дева",
        "Весы",
        "Скорпион",
        "Стрелец",
        "Козерог",
        "Водолей",
        "Рыбы",
      ];
    case 1:
    case 454:
      return [
        "Овен",
        "Телец",
        "Близнюки",
        "Рак",
        "Лев",
        "Діва",
        "Терези",
        "Скорпіон",
        "Стрілець",
        "Козеріг",
        "Водолій",
        "Риби",
      ];
    case 2:
    case 114:
      return [
        "Баран",
        "Тэлец",
        "Блізнюкі",
        "Рак",
        "Лев",
        "Дзева",
        "Вагі",
        "Шкапец",
        "Стралец",
        "Козераг",
        "Вадалей",
        "Рыбы",
      ];
    case 777:
    case 100:
      return [
        "Овен",
        "Телец",
        "Близнецы",
        "Рак",
        "Лев",
        "Дева",
        "Весы",
        "Скорпион",
        "Стрелец",
        "Козерог",
        "Водолей",
        "Рыбы",
      ];
    case 97:
      return [
        "Овен",
        "Телец",
        "Близнесін",
        "Рак",
        "Лев",
        "Дева",
        "Терезе",
        "Ақшақар",
        "Оят",
        "Козерге",
        "Суғайыр",
        "Балық",
      ];
    default:
      return [
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces",
      ];
  }
}
document.arrive(
  `.ProfileModalMiniInfoCell:has(.vkuiIcon--gift_outline_20)`,
  { existing: true },
  async function (e) {
    let pizda = _o(document.getElementById("react_rootprofile"))?.container
      ?.memoizedState?.element?.props;
    function _o(e) {
      const t = {};
      if (!e) return t;
      for (const n of Object.keys(e))
        n.startsWith("__reactFiber") && (t.fiber = e[n]),
          n.startsWith("__reactProps") && (t.props = e[n]),
          n.startsWith("__reactContainer") && (t.container = e[n]);
      return t;
    }
    let respsp = pizda.store.getState().owner;
    let birthday = respsp.bdate;
    var formattedBirthday = formatBirthday(birthday);
    var ageAndZodiac = "";

    var parts = birthday.split(".");
    if (parts.length === 3) {
      let bDayFull = birthday;
      let ptsOfAfe = bDayFull.split(".");
      let birthYear1 = parseInt(ptsOfAfe[2], 10);
      let birthMonth1 = parseInt(ptsOfAfe[1], 10);
      let birthDay1 = parseInt(ptsOfAfe[0], 10);
      let todayDate1 = new Date();
      let currentYear1 = todayDate1.getFullYear();
      let currentMonth1 = todayDate1.getMonth() + 1;
      let currentDay1 = todayDate1.getDate();
      let age = currentYear1 - birthYear1;
      if (
        currentMonth1 < birthMonth1 ||
        (currentMonth1 === birthMonth1 && currentDay1 < birthDay1)
      ) {
        age--;
      }
      ageAndZodiac = `${getLangYearsOld(
        age,
        getLang("global_years_accusative", "raw")
      )}, ${getZodiacIndex(parts[0], parts[1])}`;
    } else if (parts.length === 2) {
      ageAndZodiac = `${getZodiacIndex(parts[0], parts[1])}`;
    }
    let appherenow = e.querySelector(".ProfileFullCommonInfo__caption");
    appherenow.textContent += " (" + ageAndZodiac + ")";
  }
);
///КОНЕЦ ДАТЫ РЕГИ В НОВОМ ПРОФИЛЕ///
///СТАРЫЙ ДИЗАЙН ПОКАЗАТЬ ВЛОЖЕНИЯ - МЕНЮ ЭНХАНСЕРА///
function getPeerProps(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem)) {
    if (o.startsWith("__reactFiber")) {
      t.fiber = elem[o];
      ++n;
    } else if (o.startsWith("__reactProps")) {
      t.props = elem[o];
      ++n;
    }
    if (n === 2) break;
  }

  return t.fiber.return.memoizedProps;
}

function getBeginChat(lang) {
  switch (lang) {
    case 0:
      return "Перейти в начало чата";
      break;
    case 1:
      return "На початок чату";
      break;
    case 454:
      return "На початок чату";
      break;
    case 114:
      return "Перайсці ў пачатак чата";
      break;
    case 2:
      return "Перайсці ў пачатак чата";
      break;
    case 777:
      return "Открыть первую телеграмму";
      break;
    case 97:
      return "Чаттың басына өтіңіз";
      break;
    case 100:
      return "Пѣрѣйти въ начало чата";
      break;
    case 3:
      return "Go to the beginning of the chat";
      break;
    default:
      return "Go to the beginning of the chat";
      break;
  }
}

document.arrive(".ConvoHeader__controls", { existing: true }, async function (
  e
) {
  let upToButton = document.createElement("button");
  upToButton.classList.add("ConvoHeader__action");
  upToButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2156 12.0544C15.2156 13.8258 13.7764 15.2618 12.001 15.2618C10.2256 15.2618 8.78632 13.8258 8.78632 12.0544C8.78632 10.283 10.2256 8.84698 12.001 8.84698C13.7764 8.84698 15.2156 10.283 15.2156 12.0544ZM12.001 14.1926C13.1846 14.1926 14.1441 13.2353 14.1441 12.0544C14.1441 10.8734 13.1846 9.91611 12.001 9.91611C10.8174 9.91611 9.85787 10.8734 9.85787 12.0544C9.85787 13.2353 10.8174 14.1926 12.001 14.1926Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4516 3.43023C12.1667 3.43017 11.881 3.43628 11.5961 3.42957C11.4497 3.42613 10.9359 3.41402 10.504 3.75935C10.0803 4.09817 9.92244 4.61563 9.82732 4.99591C9.77042 5.22341 9.66028 5.51469 9.51138 5.79361C9.21102 5.91293 8.92139 6.05313 8.64429 6.21236C8.343 6.15214 8.0578 6.05703 7.85155 5.96106C7.49587 5.79556 6.9931 5.59199 6.46192 5.70814C5.92151 5.8263 5.60785 6.23276 5.51857 6.34845C5.35397 6.56175 5.18343 6.77214 5.00895 6.97747C4.91403 7.08917 4.58233 7.47952 4.57906 8.03068C4.57584 8.57215 4.87853 9.02021 5.11465 9.33381C5.25992 9.52675 5.4219 9.80562 5.54639 10.106C5.45667 10.4029 5.38692 10.7084 5.33867 11.0208C5.09846 11.2312 4.83626 11.4064 4.62525 11.514C4.2754 11.6925 3.80622 11.9629 3.57137 12.4515C3.33255 12.9484 3.45945 13.4443 3.49575 13.5862C3.56253 13.8472 3.6235 14.111 3.67792 14.3748C3.70745 14.518 3.81096 15.0199 4.24413 15.3623C4.67023 15.6992 5.21122 15.7366 5.60377 15.7437C5.83588 15.7479 6.14113 15.7889 6.44388 15.8698C6.62622 16.1346 6.82698 16.3856 7.0443 16.6211C7.05447 16.9324 7.02578 17.2368 6.97791 17.4625C6.89657 17.8462 6.81165 18.38 7.04357 18.8695C7.27988 19.3683 7.74628 19.5823 7.87951 19.6434C8.12445 19.7557 8.36795 19.8744 8.60731 19.9982C8.73719 20.0653 9.19384 20.3015 9.73392 20.1802C10.2642 20.0612 10.6335 19.6646 10.8857 19.3645C11.0397 19.1813 11.2723 18.9631 11.5342 18.7755C11.8429 18.7967 12.159 18.7967 12.4677 18.7755C12.7296 18.9631 12.9622 19.1813 13.1162 19.3645C13.3685 19.6646 13.7377 20.0612 14.268 20.1802C14.8081 20.3015 15.2647 20.0653 15.3946 19.9982C15.634 19.8744 15.8775 19.7558 16.1224 19.6434C16.2557 19.5823 16.7221 19.3683 16.9584 18.8695C17.1903 18.38 17.1054 17.8462 17.024 17.4625C16.9762 17.2368 16.9475 16.9324 16.9576 16.6211C17.1749 16.3856 17.3757 16.1346 17.558 15.8698C17.8608 15.7889 18.166 15.7479 18.3982 15.7437C18.7907 15.7366 19.3317 15.6992 19.7578 15.3623C20.191 15.0199 20.2945 14.5181 20.324 14.3748C20.3784 14.111 20.4394 13.8472 20.5062 13.5862C20.5425 13.4443 20.6694 12.9484 20.4306 12.4515C20.1957 11.9629 19.7265 11.6925 19.3767 11.514C19.1657 11.4064 18.9035 11.2312 18.6633 11.0208C18.615 10.7084 18.5453 10.4029 18.4555 10.106C18.58 9.80562 18.742 9.52675 18.8873 9.33381C19.1234 9.02021 19.4261 8.57215 19.4229 8.03068C19.4196 7.47952 19.0879 7.08917 18.993 6.97746C18.8185 6.77213 18.6479 6.56175 18.4834 6.34845C18.3941 6.23276 18.0804 5.8263 17.54 5.70814C17.0088 5.59199 16.5061 5.79556 16.1504 5.96106C15.9441 6.05703 15.6589 6.15214 15.3576 6.21236C15.0805 6.05313 14.7909 5.91293 14.4905 5.79361C14.3417 5.51469 14.2315 5.22341 14.1746 4.99591C14.0832 4.63046 13.937 4.15753 13.5737 3.82428C13.148 3.43376 12.6467 3.43123 12.4672 3.43032L12.4516 3.43023ZM15.6276 18.6942L14.9481 19.0254C14.6084 19.191 14.4385 19.2738 13.9372 18.6775C13.6562 18.3431 13.2162 17.9541 12.7349 17.6753C12.2544 17.7374 11.7476 17.7374 11.2671 17.6753C10.7858 17.9541 10.3458 18.3431 10.0647 18.6775C9.56342 19.2738 9.39355 19.191 9.05382 19.0254L8.37434 18.6942C8.0346 18.5285 7.86473 18.4457 8.02627 17.6838C8.11524 17.2641 8.15142 16.6911 8.08009 16.1489C7.71605 15.8005 7.3984 15.404 7.13733 14.9697C6.62333 14.7768 6.05396 14.6825 5.62318 14.6747C4.84406 14.6606 4.80154 14.4766 4.71651 14.1084L4.54645 13.3722C4.46142 13.0041 4.41891 12.82 5.113 12.466C5.5005 12.2683 5.97627 11.9295 6.35549 11.5258C6.40173 11.027 6.51264 10.547 6.67976 10.0941C6.51655 9.56053 6.23511 9.04193 5.97138 8.69166C5.50281 8.06933 5.62175 7.92253 5.85963 7.62892L6.33539 7.0417C6.57327 6.74809 6.69221 6.60129 7.39866 6.93C7.78581 7.11015 8.33263 7.27352 8.87449 7.32688C9.29254 7.05018 9.74942 6.82739 10.2352 6.66841C10.5407 6.21002 10.7621 5.6742 10.867 5.25479C11.056 4.49918 11.245 4.49918 11.623 4.49918L12.4437 4.49933C12.7792 4.50179 12.9571 4.54363 13.1349 5.25479C13.2398 5.6742 13.4612 6.21002 13.7667 6.66841C14.2525 6.82739 14.7094 7.05018 15.1274 7.32688C15.6693 7.27352 16.2161 7.11015 16.6033 6.93C17.3097 6.60129 17.4287 6.74809 17.6665 7.0417L18.1423 7.62892C18.3802 7.92253 18.4991 8.06933 18.0305 8.69166C17.7668 9.04193 17.4854 9.56053 17.3222 10.0941C17.4893 10.547 17.6002 11.027 17.6464 11.5258C18.0257 11.9295 18.5014 12.2683 18.8889 12.466C19.583 12.82 19.5405 13.0041 19.4555 13.3722L19.2854 14.1084C19.2004 14.4766 19.1579 14.6606 18.3787 14.6747C17.948 14.6825 17.3786 14.7768 16.8646 14.9697C16.6035 15.404 16.2859 15.8005 15.9218 16.1489C15.8505 16.6911 15.8867 17.2641 15.9757 17.6838C16.1372 18.4457 15.9673 18.5285 15.6276 18.6942Z" fill="currentColor"/>
<path d="M12.4516 3.43023C12.4565 3.43027 12.4617 3.43029 12.4672 3.43032M12.4516 3.43023L12.4672 3.43032M12.4516 3.43023C12.1667 3.43017 11.881 3.43628 11.5961 3.42957C11.4497 3.42613 10.9359 3.41402 10.504 3.75935C10.0803 4.09817 9.92244 4.61563 9.82732 4.99591C9.77042 5.22341 9.66028 5.51469 9.51138 5.79361C9.21102 5.91293 8.92139 6.05313 8.64429 6.21236C8.343 6.15214 8.0578 6.05703 7.85155 5.96106C7.49587 5.79556 6.9931 5.59199 6.46192 5.70814C5.92151 5.8263 5.60785 6.23276 5.51857 6.34845C5.35397 6.56175 5.18343 6.77214 5.00895 6.97747C4.91403 7.08917 4.58233 7.47952 4.57906 8.03068C4.57584 8.57215 4.87853 9.02021 5.11465 9.33381C5.25992 9.52675 5.4219 9.80562 5.54639 10.106C5.45667 10.4029 5.38692 10.7084 5.33867 11.0208C5.09846 11.2312 4.83626 11.4064 4.62525 11.514C4.2754 11.6925 3.80622 11.9629 3.57137 12.4515C3.33255 12.9484 3.45945 13.4443 3.49575 13.5862C3.56253 13.8472 3.6235 14.111 3.67792 14.3748C3.70745 14.518 3.81096 15.0199 4.24413 15.3623C4.67023 15.6992 5.21122 15.7366 5.60377 15.7437C5.83588 15.7479 6.14113 15.7889 6.44388 15.8698C6.62622 16.1346 6.82698 16.3856 7.0443 16.6211C7.05447 16.9324 7.02578 17.2368 6.97791 17.4625C6.89657 17.8462 6.81165 18.38 7.04357 18.8695C7.27988 19.3683 7.74628 19.5823 7.87951 19.6434C8.12445 19.7557 8.36795 19.8744 8.60731 19.9982C8.73719 20.0653 9.19384 20.3015 9.73392 20.1802C10.2642 20.0612 10.6335 19.6646 10.8857 19.3645C11.0397 19.1813 11.2723 18.9631 11.5342 18.7755C11.8429 18.7967 12.159 18.7967 12.4677 18.7755C12.7296 18.9631 12.9622 19.1813 13.1162 19.3645C13.3685 19.6646 13.7377 20.0612 14.268 20.1802C14.8081 20.3015 15.2647 20.0653 15.3946 19.9982C15.634 19.8744 15.8775 19.7558 16.1224 19.6434C16.2557 19.5823 16.7221 19.3683 16.9584 18.8695C17.1903 18.38 17.1054 17.8462 17.024 17.4625C16.9762 17.2368 16.9475 16.9324 16.9576 16.6211C17.1749 16.3856 17.3757 16.1346 17.558 15.8698C17.8608 15.7889 18.166 15.7479 18.3982 15.7437C18.7907 15.7366 19.3317 15.6992 19.7578 15.3623C20.191 15.0199 20.2945 14.5181 20.324 14.3748C20.3784 14.111 20.4394 13.8472 20.5062 13.5862C20.5425 13.4443 20.6694 12.9484 20.4306 12.4515C20.1957 11.9629 19.7265 11.6925 19.3767 11.514C19.1657 11.4064 18.9035 11.2312 18.6633 11.0208C18.615 10.7084 18.5453 10.4029 18.4555 10.106C18.58 9.80562 18.742 9.52675 18.8873 9.33381C19.1234 9.02021 19.4261 8.57215 19.4229 8.03068C19.4196 7.47952 19.0879 7.08917 18.993 6.97746C18.8185 6.77213 18.6479 6.56175 18.4834 6.34845C18.3941 6.23276 18.0804 5.8263 17.54 5.70814C17.0088 5.59199 16.5061 5.79556 16.1504 5.96106C15.9441 6.05703 15.6589 6.15214 15.3576 6.21236C15.0805 6.05313 14.7909 5.91293 14.4905 5.79361C14.3417 5.51469 14.2315 5.22341 14.1746 4.99591C14.0832 4.63046 13.937 4.15753 13.5737 3.82428C13.148 3.43376 12.6467 3.43123 12.4672 3.43032M14.9481 19.0254L15.6276 18.6942C15.9673 18.5285 16.1372 18.4457 15.9757 17.6838C15.8867 17.2641 15.8505 16.6911 15.9218 16.1489C16.2859 15.8005 16.6035 15.404 16.8646 14.9697C17.3786 14.7768 17.948 14.6825 18.3787 14.6747C19.1579 14.6606 19.2004 14.4766 19.2854 14.1084L19.4555 13.3722C19.5405 13.0041 19.583 12.82 18.8889 12.466C18.5014 12.2683 18.0257 11.9295 17.6464 11.5258C17.6002 11.027 17.4893 10.547 17.3222 10.0941C17.4854 9.56053 17.7668 9.04193 18.0305 8.69166C18.4991 8.06933 18.3802 7.92253 18.1423 7.62892L17.6665 7.0417C17.4287 6.74809 17.3097 6.60129 16.6033 6.93C16.2161 7.11015 15.6693 7.27352 15.1274 7.32688C14.7094 7.05018 14.2525 6.82739 13.7667 6.66841C13.4612 6.21002 13.2398 5.6742 13.1349 5.25479C12.9571 4.54363 12.7792 4.50179 12.4437 4.49933L11.623 4.49918C11.245 4.49918 11.056 4.49918 10.867 5.25479C10.7621 5.6742 10.5407 6.21002 10.2352 6.66841C9.74942 6.82739 9.29254 7.05018 8.87449 7.32688C8.33263 7.27352 7.78581 7.11015 7.39866 6.93C6.69221 6.60129 6.57327 6.74809 6.33539 7.0417L5.85963 7.62892C5.62175 7.92253 5.50281 8.06933 5.97138 8.69166C6.23511 9.04193 6.51655 9.56053 6.67976 10.0941C6.51264 10.547 6.40173 11.027 6.35549 11.5258C5.97627 11.9295 5.5005 12.2683 5.113 12.466C4.41891 12.82 4.46142 13.0041 4.54645 13.3722L4.71651 14.1084C4.80154 14.4766 4.84406 14.6606 5.62318 14.6747C6.05396 14.6825 6.62333 14.7768 7.13733 14.9697C7.3984 15.404 7.71605 15.8005 8.08009 16.1489C8.15142 16.6911 8.11524 17.2641 8.02627 17.6838C7.86473 18.4457 8.0346 18.5285 8.37434 18.6942L9.05382 19.0254C9.39355 19.191 9.56342 19.2738 10.0647 18.6775C10.3458 18.3431 10.7858 17.9541 11.2671 17.6753C11.7476 17.7374 12.2544 17.7374 12.7349 17.6753C13.2162 17.9541 13.6562 18.3431 13.9372 18.6775C14.4385 19.2738 14.6084 19.191 14.9481 19.0254ZM12.001 15.2618C13.7764 15.2618 15.2156 13.8258 15.2156 12.0544C15.2156 10.283 13.7764 8.84698 12.001 8.84698C10.2256 8.84698 8.78632 10.283 8.78632 12.0544C8.78632 13.8258 10.2256 15.2618 12.001 15.2618ZM14.1441 12.0544C14.1441 13.2353 13.1846 14.1926 12.001 14.1926C10.8174 14.1926 9.85787 13.2353 9.85787 12.0544C9.85787 10.8734 10.8174 9.91611 12.001 9.91611C13.1846 9.91611 14.1441 10.8734 14.1441 12.0544Z" stroke="currentColor" stroke-width="0.5"/>
</svg>
`;
  let ActionEnhancerMenu = document.createElement("div");
  ActionEnhancerMenu.classList = "ActionsMenu ConvoMainActionsMenu";
  ActionEnhancerMenu.innerHTML = `<button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkEnUp">
  <i class="ActionsMenuAction__icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19L11 7.41421L6.70711 11.7071C6.31658 12.0976 5.68342 12.0976 5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L18.7071 10.2929C19.0976 10.6834 19.0976 11.3166 18.7071 11.7071C18.3166 12.0976 17.6834 12.0976 17.2929 11.7071L13 7.41421L13 19Z" fill="currentColor"/>
</svg></i>
  <span class="ActionsMenuAction__title">${getBeginChat(vk.lang)}</span>
  </button>
  
  <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkEnAttaches">
  <i class="ActionsMenuAction__icon">
  <svg style = "padding-top: 1px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
 <path style="scale:1.2;" fill="currentColor" fill-rule="evenodd" d="M14.95 3.801a2.72 2.72 0 0 0-3.857 0L5.56 9.35a4.49 4.49 0 0 0 0 6.338 4.46 4.46 0 0 0 6.317 0l.002-.002 2.88-2.86a.75.75 0 0 1 1.057 1.064l-2.877 2.857-.002.002a5.96 5.96 0 0 1-8.439-.001 5.99 5.99 0 0 1 0-8.458l5.534-5.548a4.22 4.22 0 0 1 5.981 0 4.244 4.244 0 0 1 0 5.991l-5.534 5.548a2.486 2.486 0 0 1-3.521 0 2.497 2.497 0 0 1 0-3.525l.002-.002 3.102-3.083a.75.75 0 0 1 1.058 1.064l-3.1 3.08-.001.002a.997.997 0 0 0 0 1.405.986.986 0 0 0 1.398 0l5.534-5.548a2.744 2.744 0 0 0 0-3.873" clip-rule="evenodd"></path></svg></i>
  <span class="ActionsMenuAction__title">${getLang(
    "me_convo_action_attach"
  )}</span></button>
  
    <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkEnOnline">
  <i class="ActionsMenuAction__icon">
  <svg width="24" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75z" fill="currentColor"></path><path d="M11 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.99 3.99A8.48 8.48 0 0 1 10 1.5c2.35 0 4.47.95 6.01 2.49A8.48 8.48 0 0 1 18.5 10a8.48 8.48 0 0 1-2.49 6.01A8.48 8.48 0 0 1 10 18.5a8.48 8.48 0 0 1-6.01-2.49A8.48 8.48 0 0 1 1.5 10c0-2.35.95-4.47 2.49-6.01zM10 3a6.98 6.98 0 0 0-4.95 2.05A6.98 6.98 0 0 0 3 10c0 1.93.78 3.68 2.05 4.95A6.98 6.98 0 0 0 10 17a6.97 6.97 0 0 0 4.95-2.05A6.97 6.97 0 0 0 17 10a6.98 6.98 0 0 0-2.05-4.95A6.98 6.98 0 0 0 10 3z" fill="currentColor"></path></svg>
  </i><span class="ActionsMenuAction__title">${getLang(
    "mail_im_mention_online"
  )}</span></button>
  </div>`;
  ActionEnhancerMenu.style.position = "absolute";
  ActionEnhancerMenu.style.display = "none";
  ActionEnhancerMenu.style.marginTop = "40px";
  ActionEnhancerMenu.style.right = "20px";
  ActionEnhancerMenu.style.padding = "4px";
  upToButton.addEventListener("click", function () {
    if (ActionEnhancerMenu.style.display == "none")
      ActionEnhancerMenu.style.display = "flex";
    else ActionEnhancerMenu.style.display = "none";
  });
  e.prepend(ActionEnhancerMenu);
  let onlineArr = [];
  try {
    let onlineUsersOf = getPeerProps(e.parentElement).convo.peerId;
    let onlUsersRes = await vkApi.api("messages.getConversationMembers", {
      peer_id: onlineUsersOf,
      fields: "online_info, photo_50",
      extended: 1,
    });
    let countOnl = 0;
    let ita = 0;
    for (const o of onlUsersRes.profiles) {
      if (o.online_info.is_online) {
        countOnl++;
        onlineArr[ita] = [o.first_name + " " + o.last_name, o.id, o.photo_50];
        ita += 1;
      }
    }
    let onlUsDiv = document.createElement("div");
    onlUsDiv.classList.add("vkenhancerUsersOnline");
    if (countOnl > 1 && onlineUsersOf > 2000000000) {
      onlUsDiv.textContent =
        "​ - " + countOnl + ` ` + getLang("global_user_is_online");
      e.parentElement
        .querySelector(".ConvoHeader__infoContainer > h5")
        .appendChild(onlUsDiv);
		e.parentElement.querySelector(".ConvoHeader__infoContainer > h5").style.Display = "flex";
    } else {
      ActionEnhancerMenu.querySelector(".vkEnOnline").style.display = "none";
    }
  } catch (error) {}
  ActionEnhancerMenu.querySelector(".vkEnOnline").addEventListener(
    "click",
    async function () {
      let styleElement = fromId("vkenOnline");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "vkenOnline";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML = `
		.arrLen{color:var(--vkui--color_text_secondary); padding-left:6px;}
		::-webkit-scrollbar { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); width: 16px; } ::-webkit-scrollbar-track { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-thumb { background-color: var(--scrollbar_thumb, var(--vkui--color_icon_tertiary)); border-radius: 16px; border: 4px solid var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-button { display: none; }
		.vkEnBgWhiteOnline {
		border-radius: 8px;
		border: 1px solid var(--vkui--color_separator_primary);
		background-color: var(--vkui--color_background_modal);
		}
		.vkEnhancerModalPageHeader{
		background-color:var(--vkui--color_background_tertiary)!important; border-radius:8px 8px 0 0!important;
		} .vkEnhancerSeparator
		{ display:none!important; }
		.vkEnhancerModalPage__header
		{ border-bottom:1px solid var(--vkui--color_separator_primary)!important; }
		.vkEnhancerPanelHeader__in
		{ justify-content:flex-start!important; }
		.vkEnhancerPanelHeader__content-in
		{ font-family: var(--palette-vk-font,-apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif)!important; padding-left: 12px!important; font-size: 14px!important; color: var(--vkui--color_text_primary)!important; overflow: hidden!important; text-overflow: ellipsis!important; white-space: nowrap!important; font-weight:400!important; }
		.vkEnhancerTappable { background:var(--vkui--color_background_secondary)!important; border-radius:0px!important; --vkui_internal--icon_color:var(--vkui--color_text_link)!important; color:var(--vkui--color_text_link)!important; }
		.vkEnhancerTappable:hover { background: var(--vkui--color_background_secondary_alpha)!important;}
		.vkEnhancerDiv { padding:0!important; }
		div:has(>.vkEnhancerModalPage__in-wrap) { display:flex; justify-content:center; align-items: center; height:100%; inline-size: 100%; block-size: 100%; overflow: hidden; position: absolute; box-sizing: border-box; }
		.vkEnhancerModalPage__in-wrap { font-family:var(--vkui--font_family_base); max-inline-size: var(--vkui--size_popup_medium--regular); position: relative; align-items: initial; margin-block: 32px; margin-inline: 56px; block-size: auto; max-block-size: 640px; opacity: 0; transform: none; transition: opacity 340ms var(--vkui--animation_easing_platform); inline-size: 100%; inset-inline: 0; inset-block-end: 0; display: flex; }
		.vkEnhancerModalPage__in { block-size: auto; box-shadow: var(--vkui--elevation3); border-end-end-radius: var(--vkui--size_border_radius_paper--regular); border-end-start-radius: var(--vkui--size_border_radius_paper--regular); }
		.vkEnhancerModalPage__in { background-color: var(--vkui--color_background_modal); overflow: visible; position: relative; box-sizing: border-box; inline-size: 100%; display: flex; flex-direction: column; border-start-end-radius: var(--vkui--size_border_radius_paper--regular); border-start-start-radius: var(--vkui--size_border_radius_paper--regular); --vkui_internal--background: var(--vkui--color_background_modal); }
		.vkEnhancerModalPage__header { inline-size: 100%; }
		.vkEnhancerModalPageHeader { padding-inline: 8px; --vkui_internal--safe_area_inset_top: 0; }
		.vkEnhancerPanelHeader { position: relative; } .vkEnhancerPanelHeader__in { display:flex; justify-content:center; }
		.vkEnhancerPanelHeader__content { text-align: center; opacity: 1; transition: opacity .3s var(--vkui--animation_easing_platform); }
		.vkEnhancerPanelHeader__content-in { font-size:18px; color: var(--vkui--color_text_primary); font-weight: 500; font-family: var(--vkui--font_family_accent); user-select:none; }
		.vkEnhancerSeparator { color: var(--vkui--color_separator_primary); }
		.vkEnhancerSeparator__in { block-size: var(--vkui--size_border--regular); margin: 0; background: currentColor; color: inherit; border: 0; transform-origin: center top; }
		.vkEnhancerModalPage__content-wrap { position: relative; display: flex; block-size: 100%; flex-direction: column; overflow: hidden; border-end-start-radius: inherit; border-end-end-radius: inherit; }
		.vkEnhancerModalPage__content { overflow-y: auto; -webkit-overflow-scrolling: touch; block-size: 100%; overflow-x: hidden; box-sizing: border-box; }
		.vkEnhancerModalPage__content-in { block-size:100%; }
		.vkEnhancerDiv { padding-block: var(--vkui--size_base_padding_vertical--regular); padding-inline: var(--vkui--size_base_padding_horizontal--regular); }
		.vkEnhancerSpacing { position: relative; box-sizing: border-box; }
		.vkEnhancerTappable { min-height: 22px; --vkui_internal--icon_color: var(--vkui--color_icon_accent); color: var(--vkui--color_text_accent); justify-content: center; text-align: center; box-sizing: border-box; text-decoration: none; margin: 0; border: 0; inline-size: 100%; background: rgba(0,0,0,0); padding-block: 0; min-block-size: 44px; display: flex; align-items: center; white-space: nowrap; padding-inline: var(--vkui--size_base_padding_horizontal--regular); isolation: isolate; position: relative; border-radius: var(--vkui--size_border_radius--regular); cursor: pointer; --vkui_internal--outline_width: 2px; transition: background-color .15s ease-out; } .vkEnhancerSimpleCell__before { padding-block: 4px; flex-grow: initial; max-inline-size: initial; display: flex; align-items: center; padding-inline-end: 12px; color: var(--vkui_internal--icon_color, var(--vkui--color_icon_accent)); position: relative; z-index: var(--vkui_internal--z_index_tappable_element); } .vkEnhancerSimpleCell__middle { flex-grow: initial; max-inline-size: initial; display: flex; flex-direction: column; justify-content: center; padding-block: 10px; min-inline-size: 0; overflow: hidden; position: relative; z-index: var(--vkui_internal--z_index_tappable_element); } .vkEnhancerSimpleCell__content { justify-content: flex-start; display: flex; align-content: flex-start; align-items: center; max-inline-size: 100%; } .vkEnhancerTypography { font-weight: var(--vkui--font_weight_accent3); font-size: var(--vkui--font_headline1--font_size--compact); line-height: var(--vkui--font_headline1--line_height--compact); color: inherit; text-overflow: ellipsis; overflow: hidden; display: block; margin: 0; padding: 0; } .vkEnhancerVisuallyHidden { position: absolute !important; block-size: 1px !important; inline-size: 1px !important; padding: 0 !important; margin: -1px !important; white-space: nowrap !important; clip: rect(0, 0, 0, 0) !important; clip-path: inset(50%); overflow: hidden !important; border: 0 !important; opacity: 0; } .vkEnhancerTappable:hover{ background-color:var(--vkui--color_transparent--hover); } .vkEnhancerGraffitiList { display: grid; gap: 4px; grid-template-columns: repeat(4,1fr); } .vkEnhancerGraffitiList__item { height: 158px; width: 158px; align-items: center; background-color: var(--vkui--color_transparent--hover); border-radius: 10px; cursor: pointer; display: flex; justify-content: center; transition: all .15s ease; vertical-align: bottom; } .vkEnhancerGraffitiList__item:hover { background-color: var(--vkui--color_transparent--active); } .vkEnhancerGraffitiList__item--doc { background-position: 50%; background-repeat: no-repeat; background-size: contain; border-radius: 10px; height: 158px; width: 158px; } .vkEnhancerCloseButton { position: absolute; justify-content: center; inset-block-start: 0; inset-inline-end: -56px; inline-size: 56px; block-size: 56px; padding: 18px; box-sizing: border-box; color: var(--vkui--color_icon_contrast); transition: opacity .15s ease-out; isolation: isolate; border-radius: var(--vkui--size_border_radius--regular); cursor: pointer; --vkui_internal--outline_width: 2px; } .vkEnhancerCloseButton:before { display: block; content: ""; inset: 14px; background: var(--vkui--color_overlay_primary); border-radius: 50%; position: absolute; } .vkEnhancerCloseButton:hover:before { background:var(--vkui--color_overlay_primary--hover); } .vkEnhancerVisuallyHidden { position: absolute !important; block-size: 1px !important; inline-size: 1px !important; padding: 0 !important; margin: -1px !important; white-space: nowrap !important; clip: rect(0, 0, 0, 0) !important; clip-path: inset(50%); overflow: hidden !important; border: 0 !important; opacity: 0; z-index: var(--vkui_internal--z_index_tappable_element); }`;

      await VKEnhancerOnineBox(onlineArr);
    }
  );
  let memoizedPeer = getPeerProps(e.parentElement).peer.id;
  ActionEnhancerMenu.querySelector(".vkEnAttaches").addEventListener(
    "click",
    function () {
      window.showWiki({ w: `history${memoizedPeer}_photo` }, null, {});
      ActionEnhancerMenu.style.display = "none";
    }
  );
  let cmid;
  try {
    let reoo = await vkApi.api("messages.getHistory", {
      count: 1,
      peer_id: memoizedPeer,
      rev: 1,
    });
    cmid = reoo.items[0].conversation_message_id;
  } catch (error) {
    cmid = 1;
  }
  ActionEnhancerMenu.querySelector(".vkEnUp").addEventListener(
    "click",
    function () {
      let urlS1 = window.location.href;
      if (urlS1.includes("?")) {
        nav.go(`${urlS1}&cmid=${cmid}`);
      } else {
        nav.go(`${urlS1}?cmid=${cmid}`);
      }
      ActionEnhancerMenu.style.display = "none";
    }
  );
  try {
    e.prepend(upToButton);
  } catch (error) {}
});

function onClose() {
  let customStyle = fromId("vkenOnline");
  if (customStyle) {
    customStyle.remove();
  }
  let mainGrafBox = document.querySelector(".vkEnhancerOnlineMainBox");
  mainGrafBox.remove();
}

async function VKEnhancerOnineBox(onlineArr) {
  let arrLen = onlineArr.length;
  let boxG = document.createElement("div");
  boxG.classList.add("vkEnhancerOnlineMainBox");
  boxG.innerHTML =
    `<div class="vkEnhancerModalPage__in-wrap" style="opacity: 1;">
  <div class="vkEnhancerModalPage__in">
    <div class="vkEnhancerModalPage__header">
      <div class="vkEnhancerModalPageHeader vkEnhancerModalPageHeader--withGaps vkEnhancerModalPageHeader--desktop">
        <div class="vkEnhancerPanelHeader">
          <div class="vkEnhancerPanelHeader__in" data-onboarding-tooltip-container="fixed">
            <div class="vkEnhancerPanelHeader__content">
              <h2 class="vkEnhancerPanelHeader__content-in" id=":r1:-label" style="
    display: flex;
">` +
    getLang("mail_im_mention_online") +
    `<div class="arrLen">${arrLen}</div></h2>
            </div>
          </div>
        </div>
        <div class="vkEnhancerSeparator">
          <hr class="vkEnhancerSeparator__in">
        </div>
        <div class="RE_ModalBody RE_ModalBody--fullScreen vkEnBgWhiteOnline">
          <div data-scrollbar="cropped" style="position: relative; width: 100%; height: 100%; overflow: hidden;">
            <div class="MessageReactedPeersModal__wrapper" style="width: 96%; height: 100%; max-width: inherit; max-height: inherit; overflow: hidden auto;" data-scrollbar="scrollable">
              <div style="width: 100%; height: min-content;" data-scrollbar="content">
                <section class="MessageReactedPeersModal__content" aria-label="Реакции на сообщение">
                  <div class="PeerList vkenPeerList">
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vkEnhancerCloseButton" role="button" tabindex="0"><span class="vkEnhancerVisuallyHidden">Закрыть</span>
      <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;">
        <path fill="currentColor" fill-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path>
      </svg>
    </div>
  </div>
</div>`;
  let peerList = boxG.querySelector(".vkenPeerList");
  for (const user of onlineArr) {
    let peer = document.createElement(`a`);
    peer.title = user[0];
    peer.classList.add("PeerListItemLink");
    peer.href = `/id${user[1]}`;
    peer.target = `_blank`;
    peer.innerHTML = `
		<div class="PeerListItem PeerListItem--clickable" tabindex="-1">
  <div class="PeerListItem__main">
    <div class="PeerListItem__avatar" style="
    width: 40px;
    height: 40px;
">
      <figure class="MEAvatar MEAvatar--size-40" style="margin: 0;width: 40px;height: 40px;">
        <div class="MEAvatar__imgWrapper" style="clip-path: url(&quot;#mePeerFrameOffline40Mask265672157&quot;);">
          <div class="BasicAvatar BasicAvatar--size-40"><img class="BasicAvatar__img" alt="${user[0]}" src="${user[2]}"></div>
        </div>
        <svg class="MEAvatar__svg">
          <clipPath id="mePeerFrameOffline40Mask265672157">
            <use href="#mePeerFrameOffline40"></use>
          </clipPath>
          <use href="#mePeerFrameOffline40" class="MEAvatar__shadow" clip-path="url(#mePeerFrameOffline40Mask265672157)"></use>
        </svg>
      </figure>
    </div>
    <div class="PeerListItem__content">
      <div class="PeerListItem__name">${user[0]}</div>
    </div>
  </div>
</div>
		`;
    peerList.appendChild(peer);
  }
  let boxLayer = document.getElementById("box_layer");
  boxG.style.top = "0px";
  boxG.style.zIndex = "999999";
  boxG.style.backgroundColor = "#000000B3";
  document.body.appendChild(boxG);
  let closeButton = document.querySelector(".vkEnhancerCloseButton");
  closeButton.addEventListener("click", function () {
    onClose();
  });
  boxG.addEventListener("click", function (event) {
    if (!event.target.closest(".vkEnhancerModalPage__in-wrap")) {
      onClose();
    }
  });
}
///КОНЕЦ СТАРОГО ДИЗАЙНА ПОКАЗАТЬ ВЛОЖЕНИЯ - МЕНЮ ЭНХАНСЕРА///
///РЕДАКТОР ГРАФФИТИ В КОММЕНТАХ///
document.arrive(".ms_items_more._more_items", { existing: true }, function (e) {
  let grafelem = document.createElement("a");
  grafelem.classList.add("ms_item");
  grafelem.classList.add("ms_item_graf");
  grafelem.innerHTML = `<span class="MediaSelector__mediaIcon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M6.66738 12.4934C5.66072 12.4934 4.89771 13.2639 4.85288 14.219C4.78943 15.5707 4.14574 16.3782 3.56758 16.8697C4.09576 17.0241 4.83625 17.0816 5.79412 16.7965C7.69684 16.2301 8.48106 15.0732 8.48106 14.1836C8.48106 13.2865 7.70617 12.4934 6.66738 12.4934ZM3.35859 14.1483C3.44019 12.4098 4.84452 10.9918 6.66738 10.9918C8.4581 10.9918 9.977 12.3845 9.977 14.1836C9.977 15.9903 8.47815 17.5638 6.21942 18.2361C4.06158 18.8784 2.57907 18.2114 1.87062 17.688C1.78649 17.6258 1.66019 17.5141 1.57758 17.3353C1.48322 17.131 1.47952 16.9126 1.54181 16.7213C1.69148 16.2618 2.17858 16.0626 2.52898 15.7829C2.9113 15.4778 3.31759 15.0219 3.35859 14.1483Z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15.7019 2.00141C16.312 1.36368 17.3109 1.32806 17.9631 1.93024C18.6094 2.527 18.68 3.5332 18.1327 4.21788L12.0531 11.716C11.7923 12.0376 11.3212 12.0861 11.0008 11.8244C10.6804 11.5626 10.6321 11.0897 10.8928 10.7681L16.9669 3.27699C17.0242 3.20385 17.0127 3.09301 16.9503 3.0354C16.8833 2.97354 16.8169 3.009 16.7482 3.07474L9.74543 9.7831C9.44658 10.0694 8.97312 10.0583 8.68792 9.75831C8.40272 9.45834 8.41378 8.98309 8.71263 8.69681L15.7019 2.00141Z"></path></svg></span>${getLang(
    "mail_added_graffiti"
  )} (editor)`;
  grafelem.setAttribute(
    `onclick`,
    `showBox("al_wall.php", {act: "canvas_draw_box"}, {stat: [window.jsc("web/graffiti_new.js")],cache: 1,onDone: (e,t)=>{window.Graffiti.initDrawBox(e, t)}})`
  );
  e.appendChild(grafelem);
});
///КОНЕЦ РЕДАКТОРА ГРАФФИТИ В КОММЕНТАХ///
///ПОСТЕРЫ///
/*document.arrive("#page_add_media > .media_selector", { existing: true }, function (e) {
  let posters = document.createElement('a');
  posters.classList.add('fl_r');
  posters.innerHTML = `<div style="display:block; bottom:-1px; padding-left:6px; width:20px; right: 6px; margin-top:0px; position:relative;" class="poster__open-btn-wrapper poster " id="page_poster_btn">
    <div class="poster__open-btn-layout" style="margin-left:3px;">
      <div class="poster__open-btn poster" onclick="cur.poster.openEditor()" onmouseenter="showTooltip(this, { text: getLang('wall_poster_open_tt'), black: 1, shift: [10, 9] })"></div>
      </div>
    </div>`;
	e.appendChild(posters);
});*/
///КОНЕЦ ПОСТЕРОВ///
///УДАЛЕННОЕ СООБЩЕНИЕ///
document.arrive(
  ".ConvoHistory__messageBlock",
  { existing: true },
  async function (e) {
    try {
      let currentProps = getMessageProps(e);
      let ph = await vkApi.api("messages.getByConversationMessageId", {
        peer_id: currentProps[1],
        conversation_message_ids: currentProps[0],
      });
      if (ph.count == 0) {
        e.classList.add("vkEnhancerDeletedMessageMain");
        const appendHere = e.querySelector(
          ".ConvoMessageBottomInfo,.ConvoMessage__info"
        );
        if (appendHere) {
          const customStyle = fromId("DeletedMessageTT");
          if (customStyle) {
            customStyle.remove();
          }
          const spanDeleted = document.createElement("span");
          spanDeleted.setAttribute(
            "onmouseover",
            `showTooltip(this, { text: '${getLang(
              "mail_deleted_stop"
            )}', black: true, shift: [12, 5] });`
          );
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
            styleElement = create("style", {}, { id: "DeletedMessageTT" });
            document.head.appendChild(styleElement);
          }
          styleElement.innerHTML = `.ConvoMessageWithoutBubble__wrapper .tt_w:after{display:none;}`;
          const divDeleted = document.createElement("div");
          divDeleted.setAttribute(
            "onmouseover",
            `showTooltip(this, { text: '${getLang(
              "mail_deleted_stop"
            )}', black: true, shift: [52, 5] });`
          );
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
      const store = e.store;
      e.engine.fetchMaster = async function (...e) {
        const l = await n.apply(this, e);
        let mess = [];
        for (const e of l.updates) {
          const [n] = e;
          switch (n) {
            case 10002: {
              const [, t, n, o] = e;
              if (n > 10000) {
                document
                  .querySelectorAll(".ConvoHistory__messageBlock")
                  .forEach((se) => {
                    if (getMessagePropsMin(se) == e[1]) {
                      se.classList.add("vkEnhancerDeletedMessageMain");
                      const appendHere = se.querySelector(
                        ".ConvoMessageBottomInfo,.ConvoMessage__info"
                      );
                      if (appendHere) {
                        const customStyle = fromId("DeletedMessageTT");
                        if (customStyle) {
                          customStyle.remove();
                        }
                        const spanDeleted = document.createElement("span");
                        spanDeleted.setAttribute(
                          "onmouseover",
                          `showTooltip(this, { text: '${getLang(
                            "mail_deleted_stop"
                          )}', black: true, shift: [12, 5] });`
                        );
                        spanDeleted.classList.add("vkEnhancerDeletedMessage");
                        spanDeleted.style.width = "16px";
                        spanDeleted.style.height = "16px";
                        spanDeleted.style.margin = "4px";
                        spanDeleted.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7782 18.7782C23.0739 14.4824 23.0739 7.51761 18.7782 3.22184C14.4824 -1.07393 7.51759 -1.07393 3.22183 3.22184C-1.07394 7.51761 -1.07394 14.4824 3.22183 18.7782C7.51759 23.074 14.4824 23.074 18.7782 18.7782ZM12.4142 11L15.2426 13.8284C15.6332 14.219 15.6332 14.8521 15.2426 15.2427C14.8521 15.6332 14.219 15.6332 13.8284 15.2427L11 12.4142L8.17157 15.2427C7.78105 15.6332 7.14788 15.6332 6.75736 15.2427C6.36683 14.8521 6.36684 14.219 6.75736 13.8284L9.58579 11L6.75736 8.17159C6.36684 7.78106 6.36684 7.1479 6.75736 6.75737C7.14788 6.36685 7.78105 6.36685 8.17157 6.75737L11 9.5858L13.8284 6.75737C14.219 6.36685 14.8521 6.36685 15.2426 6.75737C15.6332 7.1479 15.6332 7.78106 15.2426 8.17159L12.4142 11Z" fill="#E64646"/>
</svg>`;
                        appendHere.append(spanDeleted);
                      }
                      const appendHere1 = se.querySelector(
                        ".ConvoMessageInfoWithoutBubbles"
                      );
                      if (appendHere1) {
                        let styleElement = fromId("DeletedMessageTT");
                        if (!styleElement) {
                          styleElement = create(
                            "style",
                            {},
                            { id: "DeletedMessageTT" }
                          );
                          document.head.appendChild(styleElement);
                        }
                        styleElement.innerHTML = `.ConvoMessageWithoutBubble__wrapper .tt_w:after{display:none;}`;
                        const divDeleted = document.createElement("div");
                        divDeleted.setAttribute(
                          "onmouseover",
                          `showTooltip(this, { text: '${getLang(
                            "mail_deleted_stop"
                          )}', black: true, shift: [52, 5] });`
                        );
                        divDeleted.classList.add(
                          "vkEnhancerDeletedMessageWithoutBubbles"
                        );
                        divDeleted.style.width = "16px";
                        divDeleted.style.height = "16px";
                        divDeleted.style.margin = "4px";
                        divDeleted.innerHTML = `<svg width="16" height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7782 18.7782C23.0739 14.4824 23.0739 7.51761 18.7782 3.22184C14.4824 -1.07393 7.51759 -1.07393 3.22183 3.22184C-1.07394 7.51761 -1.07394 14.4824 3.22183 18.7782C7.51759 23.074 14.4824 23.074 18.7782 18.7782ZM12.4142 11L15.2426 13.8284C15.6332 14.219 15.6332 14.8521 15.2426 15.2427C14.8521 15.6332 14.219 15.6332 13.8284 15.2427L11 12.4142L8.17157 15.2427C7.78105 15.6332 7.14788 15.6332 6.75736 15.2427C6.36683 14.8521 6.36684 14.219 6.75736 13.8284L9.58579 11L6.75736 8.17159C6.36684 7.78106 6.36684 7.1479 6.75736 6.75737C7.14788 6.36685 7.78105 6.36685 8.17157 6.75737L11 9.5858L13.8284 6.75737C14.219 6.36685 14.8521 6.36685 15.2426 6.75737C15.6332 7.1479 15.6332 7.78106 15.2426 8.17159L12.4142 11Z" fill="#E64646"/>
</svg>`;
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
              mess.push(e);
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
  { variable: "MECommonContext" }
);

function getMessagePropsMin(elem) {
  try {
    const t = {};
    let n = 0;
    for (const o of Object.keys(elem)) {
      if (o.startsWith("__reactFiber")) {
        t.fiber = elem[o];
        ++n;
      } else if (o.startsWith("__reactProps")) {
        t.props = elem[o];
        ++n;
      }
      if (n === 2) break;
    }

    return t.fiber.return.memoizedProps.message.cmid;
  } catch (error) {
    return [0, 0];
  }
}
///КОНЕЦ УДАЛЕННОГО СООБШЕНИЯ///
///РЕДАКТИРОВАНИЕ СООБЩЕНИЯ///
document.arrive(".ConvoHistory__messageBlock", { existing: true }, function (
  e
) {
  const key =
    "convoMessage" + getMessageProps(e)[1] + "_" + getMessageProps(e)[0];
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, e.innerHTML);
  }
  e.addEventListener("mouseover", function () {
    let buttonShowOrig = document.createElement("a");
    buttonShowOrig.style.color = "var(--vkui--color_icon_secondary)";
    buttonShowOrig.style.padding = "4px";
    buttonShowOrig.style.width = "28px";
    buttonShowOrig.style.height = "28px";
    buttonShowOrig.style.position = "relative";
    buttonShowOrig.classList.add("vkEnButtonShowOrig");
    buttonShowOrig.innerHTML = `<svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--stars_20" viewBox="0 0 20 20" width="14" height="14" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" d="M12.004 8.13c-.368.835-.857 1.717-1.507 2.367s-1.532 1.14-2.367 1.507c.835.367 1.717.857 2.367 1.507s1.14 1.532 1.507 2.367c.367-.835.857-1.717 1.507-2.367s1.532-1.14 2.367-1.507c-.835-.368-1.717-.857-2.367-1.507s-1.14-1.532-1.507-2.367m-.785-2.178c-.421 1.317-1.014 2.716-1.782 3.485-.769.768-2.168 1.36-3.485 1.782a21 21 0 0 1-1.162.338c-.38.1-.38.793 0 .894a27 27 0 0 1 .912.26q.124.037.25.078c1.317.421 2.716 1.014 3.485 1.782s1.36 2.168 1.782 3.485a21 21 0 0 1 .27.907l.068.255c.1.38.793.38.894 0a28 28 0 0 1 .26-.912q.037-.124.078-.25c.421-1.317 1.014-2.717 1.782-3.485s2.168-1.36 3.485-1.782a21 21 0 0 1 .907-.27l.255-.068c.38-.1.38-.793 0-.894a28 28 0 0 1-.912-.26l-.25-.078c-1.317-.421-2.717-1.014-3.485-1.782-.768-.769-1.36-2.168-1.782-3.485a21 21 0 0 1-.338-1.162c-.1-.38-.793-.38-.894 0a27 27 0 0 1-.26.912zM4.365.763a.385.385 0 0 0-.73 0l-.414 1.24a1.93 1.93 0 0 1-1.218 1.218l-1.24.414a.385.385 0 0 0 0 .73l1.24.414a1.93 1.93 0 0 1 1.218 1.218l.414 1.24a.385.385 0 0 0 .73 0l.414-1.24a1.93 1.93 0 0 1 1.218-1.218l1.24-.414a.385.385 0 0 0 0-.73l-1.24-.414a1.93 1.93 0 0 1-1.218-1.218z"></path></svg>`;
    buttonShowOrig.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = `var(--vkui--color_background_secondary)`"
    );
    buttonShowOrig.setAttribute(
      "onmouseout",
      "this.style.backgroundColor = `transparent`"
    );
    let msg = e;
    if (getAllMessageProps(msg)?.updatedAt) {
      if (!e.querySelector(".vkEnButtonShowOrig")) {
        try {
          e.querySelector(".MessageActionsButtonWrapper").prepend(
            buttonShowOrig
          );
        } catch (error) {}
      }
      let originalProps = getMessageProps(msg);
      buttonShowOrig.addEventListener("click", function () {
        msg.innerHTML = localStorage.getItem(
          "convoMessage" + originalProps[1] + "_" + originalProps[0]
        );
        buttonShowOrig.textContent =
          getLang("photos_pe_apply_changes").toLowerCase() + "! ​";
        buttonShowOrig.style.pointerEvents = "none";
      });
    }
  });
});

window.addEventListener("beforeunload", () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("convoMessage") || key.startsWith("deletedMSG")) {
      localStorage.removeItem(key);
    }
  });
});

function getMessageProps(elem) {
  try {
    const t = {};
    let n = 0;
    for (const o of Object.keys(elem)) {
      if (o.startsWith("__reactFiber")) {
        t.fiber = elem[o];
        ++n;
      } else if (o.startsWith("__reactProps")) {
        t.props = elem[o];
        ++n;
      }
      if (n === 2) break;
    }

    return [
      t.fiber.return.memoizedProps.message.cmid,
      t.fiber.return.memoizedProps.message.peerId,
    ];
  } catch (error) {
    return [0, 0];
  }
}
function getAllMessageProps(elem) {
  try {
    const t = {};
    let n = 0;
    for (const o of Object.keys(elem)) {
      if (o.startsWith("__reactFiber")) {
        t.fiber = elem[o];
        ++n;
      } else if (o.startsWith("__reactProps")) {
        t.props = elem[o];
        ++n;
      }
      if (n === 2) break;
    }

    return t.fiber.return.memoizedProps.message;
  } catch (error) {
    return [0, 0];
  }
}
///КОНЕЦ РЕДАКТИРОВАНИЯ СООБЩЕНИЯ///
///СКАЧИВАНИЕ ВИДЕО///
document.arrive(".videoplayer_btn_mute", { existing: true }, function (e) {
  let quality;
  let vidUrl;
  try {
    quality = Math.max(
      ...Object.keys(window.mvcur.player.media.vars)
        .filter((e) => e.startsWith("url"))
        .map((url) => parseInt(url.match(/\d+/)[0]))
    );
    vidUrl = window.mvcur.player.media.vars[`url${quality}`];
    let videoButton = document.createElement("a");
	if (vidUrl == undefined) {
      vidUrl = "";
	  videoButton.setAttribute(
      "onclick",
      `showFastBox("Ошибка", "Не удалось найти URL видео");`
    );
	}
    videoButton.href = vidUrl;
    videoButton.style.padding = "15px 10px 0 8px";
    videoButton.setAttribute(
      "onmouseover",
      `showTooltip(this, { text: '${getLang(
        "video_download_video_from_modal"
      )}', black: true, shift: [2, 24] });`
    );
    videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
    e.parentNode.insertBefore(videoButton, e);
  } 
  catch (error) {
	try {
	quality = Math.max(
      ...Object.keys(window.cur.videoInlinePlayer.media.vars)
        .filter((e) => e.startsWith("url"))
        .map((url) => parseInt(url.match(/\d+/)[0]))
    );
    vidUrl = window.cur.videoInlinePlayer.media.vars[`url${quality}`];
    let videoButton = document.createElement("a");
	    if (vidUrl == undefined) {
      vidUrl = "";
	  videoButton.setAttribute(
      "onclick",
      `showFastBox("Ошибка", "Не удалось найти URL видео");`
    );
    }
    videoButton.href = vidUrl;
    videoButton.style.padding = "15px 10px 0 8px";
    videoButton.setAttribute(
      "onmouseover",
      `showTooltip(this, { text: '${getLang(
        "video_download_video_from_modal"
      )}', black: true, shift: [2, 24] });`
    );
    videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
    e.parentNode.insertBefore(videoButton, e);  
  } catch(error) {
	console.info('[VKENH] Post with video found, nothing to worry about');
  }
  }
});

function querySelectorAllShadows(selector, el = document.body) {
  const childShadows = Array.from(el.querySelectorAll("*"))
    .map((el) => el.shadowRoot)
    .filter(Boolean);
  const childResults = childShadows.map((child) =>
    querySelectorAllShadows(selector, child)
  );
  const result = Array.from(el.querySelectorAll(selector));
  return result.concat(childResults).flat();
}

document.arrive("vk-video-player", { existing: true }, function (e) {
  let muteButton = querySelectorAllShadows(".volumeBar-container")[0];
  let props;
  let files;
  try {
    props = Object.keys(
      getVideoProps(document.querySelector(".MediaViewerVideo")).video.files
    );
    files = getVideoProps(document.querySelector(".MediaViewerVideo")).video
      .files;
  } catch (error) {
    props = Object.keys(
      getVideoProps(e.closest(".AttachVideos__base")).video.files
    );
    files = getVideoProps(e.closest(".AttachVideos__base")).video.files;
  }
  let maxNumber = -1;
  let quality;
  props.forEach((element) => {
    if (element.startsWith("mp4")) {
      const number = parseInt(element.split("_")[1]);
      if (number > maxNumber) {
        maxNumber = number;
        quality = element;
      }
    }
  });
  let vidUrl = files[quality];
  let videoButton = document.createElement("a");
  videoButton.style.padding = "5px 10px 0 8px";
  videoButton.style.cursor = "pointer";
  videoButton.setAttribute("aria-label", `${getLang("video_download_video_from_modal")}`);
  videoButton.addEventListener("click", function () {
    let linkV = document.createElement("a");
    linkV.href = vidUrl;
    linkV.click();
  });
  videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
  muteButton.parentNode.insertBefore(videoButton, muteButton);
  videoButton.title = videoButton.getAttribute("aria-label");
});

function getVideoProps(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem)) {
    if (o.startsWith("__reactFiber")) {
      t.fiber = elem[o];
      ++n;
    } else if (o.startsWith("__reactProps")) {
      t.props = elem[o];
      ++n;
    }
    if (n === 2) break;
  }

  return t.fiber.return.memoizedProps;
}
///КОНЕЦ СКАЧИВАНИЯ ВИДЕО///
///СКАЧИВАНИЕ МУЗЫКИ///
///FUCK
const _o = (t) => {
  if (~t.indexOf("audio_api_unavailable")) {
    var e = t.split("?extra=")[1].split("#"),
      o = "" === e[1] ? "" : _a(e[1]);
    if (((e = _a(e[0])), "string" != typeof o || !e)) return t;
    o = o ? o.split(String.fromCharCode(9)) : [];
    for (var s, r, n = o.length; n--; ) {
      if (
        ((r = o[n].split(String.fromCharCode(11))),
        (s = r.splice(0, 1, e)[0]),
        !_l[s])
      )
        return t;
      e = _l[s].apply(null, r);
    }
    if (e && "http" === e.substr(0, 4)) return e;
  }
  return t;
};
const _a = (t) => {
  if (!t || t.length % 4 == 1) return !1;
  for (var e, i, o = 0, a = 0, s = ""; (i = t.charAt(a++)); )
    (i = _r.indexOf(i)),
      ~i &&
        ((e = o % 4 ? 64 * e + i : i), o++ % 4) &&
        (s += String.fromCharCode(255 & (e >> ((-2 * o) & 6))));
  return s;
};
const _s = (t, e) => {
  var i = t.length,
    o = [];
  if (i) {
    var a = i;
    for (e = Math.abs(e); a--; )
      (e = ((i * (a + 1)) ^ (e + a)) % i), (o[a] = e);
  }
  return o;
};
var _r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
  _l = {
    v: function (t) {
      return t.split("").reverse().join("");
    },
    r: function (t, e) {
      t = t.split("");
      for (var i, o = _r + _r, a = t.length; a--; )
        (i = o.indexOf(t[a])), ~i && (t[a] = o.substr(i - e, 1));
      return t.join("");
    },
    s: function (t, e) {
      var i = t.length;
      if (i) {
        var o = _s(t, e),
          a = 0;
        for (t = t.split(""); ++a < i; )
          t[a] = t.splice(o[i - 1 - a], 1, t[a])[0];
        t = t.join("");
      }
      return t;
    },
    i: function (t, e) {
      return _l.s(t, e ^ vk.id);
    },
    x: function (t, e) {
      var i = [];
      return (
        (e = e.charCodeAt(0)),
        each(t.split(""), function (t, o) {
          i.push(String.fromCharCode(o.charCodeAt(0) ^ e));
        }),
        i.join("")
      );
    },
  };
/// FUCK

/*Заготовка под аудио в плейлистах*/
document.arrive('[class^="vkitAudioRow__rootHasHover"]',
  { existing: true },
  async function (e) {
    let key = getSuperAudioPropsMin(e.parentElement).fiber.alternate.key;
	let subKey = key.substring(4,key.length);
	let pListID;
	let getPlistID = ajax.post("al_audio.php?act=reload_audios", {
                        audio_ids: subKey,
                        al: 1
                    });

	getPlistID.onload = function() {
		pListID = JSON.parse(getPlistID.response).payload[1][0][0][19][2];
	};
	let linkAudio = await vkApi.api('audio.getById',{'audios':subKey + "_" + pListID});
	let objectOf = [linkAudio[0].artist,linkAudio[0].title];
	appendButtonPlist(e.querySelector('[class^="vkitAudioRow__actions"] > div'),linkAudio,subKey + "_" + pListID,objectOf)
  }
);


function getSuperAudioPropsMin(elem) {
  try {
    const t = {};
    let n = 0;
    for (const o of Object.keys(elem)) {
      if (o.startsWith("__reactFiber")) {
        t.fiber = elem[o];
        ++n;
      } else if (o.startsWith("__reactProps")) {
        t.props = elem[o];
        ++n;
      }
      if (n === 2) break;
    }

    return t;
  } catch (error) {
    return [0, 0];
  }
}

function appendButtonPlist(elem, linkAudio, subKey, objectOf) {
  const audioElement = elem.parentNode;
  const button = create(
    "button",
    {},
    {
      innerText: "",
    }
  );
  button.classList.add("vkEnhancerDownloadMusicButton");
  const div = create(
    "div",
    {},
    {
      className: "download",
      innerHTML: `<style>
		.vkEnhancerDownloadMusicButton {
	color: var(--vkui--color_icon_secondary);
    isolation: isolate;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    height: 24px;
    width: 24px;
    border: none;
    background-color: transparent;
		}
	  </style>`,
    }
  );
  const progress = create(
    "div",
    {},
    {
      className: "bar",
      innerHTML: `<style>.progress-bar {
  background-color:var(--vkui--color_text_contrast_themed) ;
  border-radius: 13px;
  height: 10px;
  width: 100%;
  margin: 10px 0;
  border: 2px var(--vkui--color_separator_primary) solid;
}

.progress-bar-inner {
  background-color: var(--vkui--color_background_accent_themed);
  height: 100%;
  line-height: 10px;
  color: white;
  text-align: right;
  padding-right: 5px;
  border-radius: 13px;
  white-space: nowrap;
  overflow: hidden;
}</style><div class="progress-bar" style="display:none;">
  <div id="progress-bar-inner" class="progress-bar-inner" style="width: 100%;">
  </div>
</div>`,
    }
  );
  button.setAttribute(
    "onmouseover",
    `showTooltip(this, { text: '${getLang(
      "video_download_video_from_modal"
    )}', black: true, shift: [7, 5] });`
  );
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
  button.dataset.title = objectOf[1];
  button.dataset.subtitle = objectOf[0];
  button.dataset.fullId = subKey;
  button.dataset.linkAudio = linkAudio;
  button.addEventListener("click", handleDownloadButtonPlist);
  div.appendChild(button);
  elem.prepend(div);
}

function handleDownloadButtonPlist(e) {
  e.preventDefault();
  e.stopPropagation();
  const bar = e.target.parentNode.querySelector(".bar > .progress-bar");
  const id = getValidIDPlist(e.target);
  const Orig = getDownloadNamePlist(e.target);
  const Orig2 = getDownloadName1Plist(e.target);
  const Url = getDownloadLinkPlist(e.target);
  let Cyr = Orig;
  let Cyr1 = Orig2;
  if (window.vkenh.setEnglishMusic == 1) {
    Cyr = parseCyr(Orig) ? parseCyr(Orig) : Orig;
    Cyr1 = parseCyr(Orig2) ? parseCyr(Orig2) : Orig2;
  }
  fetch("https://vk.com/al_audio.php?act=reload_audios", {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
    },
    body: `al=1&audio_ids=${id}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((e) => e.json())
    .then((e) => {
      let url = _o(e.payload[1][0][0][2]);
      console.log(Download_Fucking_Stream(url, Cyr1 + " - " + Cyr, bar));
    });
}
let getDownloadLinkPlist = (elem) => {
  return `${elem.closest(".vkEnhancerDownloadMusicButton").dataset.linkAudio}`;
};

let getValidIDPlist = (elem) => {
  return `${elem.closest(".vkEnhancerDownloadMusicButton").dataset.fullId}`;
};

let getDownloadNamePlist = (elem) => {
  return `${elem.closest(".vkEnhancerDownloadMusicButton").dataset.title}`;
};

let getDownloadName1Plist = (elem) => {
  return `${elem.closest(".vkEnhancerDownloadMusicButton").dataset.subtitle}`;
};

document.arrive(
  ".audio_row:not(.audio_claimed) .audio_row__actions",
  { existing: true },
  function (e) {
    appendButton(e);
  }
);

function appendButton(elem) {
  const audioElement = elem.parentNode;
  const button = create(
    "button",
    {},
    {
      innerText: "",
    }
  );
  button.classList.add("vkEnhancerDownloadMusicButton");
  const div = create(
    "div",
    {},
    {
      className: "download",
      innerHTML: `<style>
		.vkEnhancerDownloadMusicButton {
	color: var(--vkui--color_icon_secondary);
    isolation: isolate;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
    height: 24px;
    width: 24px;
    border: none;
    background-color: transparent;
		}
	  </style>`,
    }
  );
  const progress = create(
    "div",
    {},
    {
      className: "bar",
      innerHTML: `<style>.progress-bar {
  background-color:var(--vkui--color_text_contrast_themed) ;
  border-radius: 13px;
  height: 10px;
  width: 100%;
  margin: 10px 0;
  border: 2px var(--vkui--color_separator_primary) solid;
}

.progress-bar-inner {
  background-color: var(--vkui--color_background_accent_themed);
  height: 100%;
  line-height: 10px;
  color: white;
  text-align: right;
  padding-right: 5px;
  border-radius: 13px;
  white-space: nowrap;
  overflow: hidden;
}</style><div class="progress-bar" style="display:none;">
  <div id="progress-bar-inner" class="progress-bar-inner" style="width: 100%;">
  </div>
</div>`,
    }
  );
  button.setAttribute(
    "onmouseover",
    `showTooltip(this, { text: '${getLang(
      "video_download_video_from_modal"
    )}', black: true, shift: [7, 5] });`
  );
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
  button.addEventListener("click", handleDownloadButton);
  button.dataset.audio = elem.closest(".audio_row").dataset.audio;
  button.dataset.fullId = elem.closest(".audio_row").dataset.fullId;
  div.appendChild(button);
  elem.prepend(div);
}

function handleDownloadButton(e) {
  e.preventDefault();
  e.stopPropagation();
  const bar = e.target.parentNode.querySelector(".bar > .progress-bar");
  const id = getValidID(e.target);
  const Orig = getDownloadName(e.target);
  const Orig2 = getDownloadName1(e.target);
  let Cyr = Orig;
  let Cyr1 = Orig2;
  if (window.vkenh.setEnglishMusic == 1) {
    Cyr = parseCyr(Orig) ? parseCyr(Orig) : Orig;
    Cyr1 = parseCyr(Orig2) ? parseCyr(Orig2) : Orig2;
  }
  fetch("https://vk.com/al_audio.php?act=reload_audios", {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
    },
    body: `al=1&audio_ids=${id}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((e) => e.json())
    .then((e) => {
      let url = _o(e.payload[1][0][0][2]);
      console.log(Download_Fucking_Stream(url, Cyr1 + " - " + Cyr, bar));
    });
}
let getValidID = (elem) => {
  return `${elem.closest(".audio_row").dataset.fullId}_${
    JSON.parse(elem.closest(".audio_row").dataset.audio)[24]
  }`;
};

let getDownloadName = (elem) => {
  return `${JSON.parse(elem.closest(".audio_row").dataset.audio)[3]}`;
};

let getDownloadName1 = (elem) => {
  return `${JSON.parse(elem.closest(".audio_row").dataset.audio)[4]}`;
};

function Download_Fucking_Stream(url, name, elem) {
  let hls = new Hls();
  let blob_data = [],
    audio_data,
    dur,
    frag_length;
  let temp_audio = document.createElement("audio");
  let downloadInProgress = document.createElement("div");
  downloadInProgress.innerHTML = `<div class="vkEnhSnackbar vkEnhSnackbar--ios vkEnhSnackbar--desktop vkui--vkIOS--light">
  <div class="vkEnhSnackbar__in">
    <div class="vkEnhSnackbar__body vkEnhSnackbar--layout-vertical vkEnhSnackbar__snackbar">
      <div class="vkEnhSnackbar__before"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--song_outline_24" viewBox="0 0 24 24" width="24" height="24" style="width: 24px; height: 24px;"><path fill="currentColor" fill-rule="evenodd" d="m16.302 4.06-2.4.661a1.1 1.1 0 0 0-.803 1.06v.845l2.407-.681a1.1 1.1 0 0 0 .796-1.058zM13.1 8.5l2.902-.824a2.9 2.9 0 0 0 2.099-2.79V3.006a1 1 0 0 0-1.267-.964l-3.414.946a2.9 2.9 0 0 0-2.118 2.794v8.908c-2.601.018-4.222.835-5.016 2.167-.864 1.45-.5 3.188.505 4.148a3.42 3.42 0 0 0 4.06.577c1.662-1.041 2.21-2.636 2.25-4.98zm-1.796 7.989c-2.331-.045-3.144.733-3.487 1.307-.402.674-.219 1.494.23 1.919.509.499 1.2.636 1.893.305.561-.328 1.364-.982 1.364-3.531" clip-rule="evenodd"></path></svg></div>
      <div class="vkEnhSnackbar__content"><span class="vkEnhTypography vkEnhSnackbar__content-text vkEnhParagraph"></span></div>
    </div>
  </div>
</div>`;
  let styleElement = fromId("vkEnDownloadPopup");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vkEnDownloadPopup";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `
  .vkEnhSnackbar__before {
	color:var(--vkui--color_icon_accent);
	padding-right:12px;
  }
  .vkEnhSnackbar{
	margin:12px;
	user-select:none;
	z-index:var(--vkui--z_index_popout);
	position:fixed;
	inset-block-end:0;
	inset-inline-start:auto;
	inline-size:100%;
	padding-inline:var(--vkui_internal--safe_area_inset_left) var(--vkui_internal--safe_area_inset_right);
	padding-block-end:var(--vkui_internal--safe_area_inset_bottom)
}
.vkEnhSnackbar__in,.vkEnhSnackbar__snackbar{
	transition:transform 320ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar__body {
	display:flex;
	align-items:center;
}
.vkEnhSnackbar__in{
	border-radius:8px;
	background-color:var(--vkui--color_background_modal);
	box-shadow:var(--vkui--elevation3)
	padding:16px;
	animation:vkenh-snackbar-intro-vertical 340ms var(--vkui--animation_easing_platform);
}
.vkEnhRemovebar {
	animation:vkenh-snackbar-intro-vertical-remove 340ms var(--vkui--animation_easing_platform)!important;
}
.vkEnhSnackbar--ios .vkEnhSnackbar__in,.vkEnhSnackbar--ios .vkEnhSnackbar__snackbar{
	transition:transform 400ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar--desktop{
	max-inline-size:351px;
	inset-inline-start:0;
	inset-block-end:0
}
.vkEnhSnackbar--desktop .vkEnhSnackbar__in{
	padding:16px;
	animation-name:vkenh-snackbar-intro-horizontal
}
.vkEnhSnackbar--desktop.vkuiSnackbar--closing--wCurt .vkEnhSnackbar__in{
	transform:translate3d(-140%, 0, 0)
}
.vkuiSnackbar--touched--a8Qa6 .vkEnhSnackbar__snackbar{
	transition:none
}
@keyframes vkenh-snackbar-intro-vertical{
	from{
		transform:translate3d(0, 140%, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
@keyframes vkenh-snackbar-intro-vertical-remove {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-140%, 0, 0); /* Сдвигаем блок влево на 100% от его ширины */
        opacity: 0!important; /* Добавляем анимацию исчезновения */
    }
}
@keyframes vkenh-snackbar-intro-horizontal{
	from{
		transform:translate3d(-140%, 0, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
`;
  let progrText = downloadInProgress.querySelector(
    ".vkEnhSnackbar__content-text"
  );

  document.body.appendChild(downloadInProgress);
  if (Hls.isSupported()) {
    hls.loadSource(url);
    hls.attachMedia(temp_audio);
    hls.on(Hls.Events.FRAG_BUFFERED, (e, h) => {
      progrText.innerHTML =
        getLang("box_loading") +
        "<br><br>" +
        name +
        ".mp3 " +
        "".repeat((new Date() / 1e3) % 4) +
        "" +
        ((blob_data.length / frag_length) * 100).toFixed() +
        "%";
      blob_data.push(audio_data);
      temp_audio.currentTime = h.frag.start + h.frag.duration;
      if (blob_data.length >= frag_length) {
        hls.stopLoad(),
          hls.destroy(),
          downloadInProgress
            .querySelector(".vkEnhSnackbar__in")
            .classList.add("vkEnhRemovebar"),
          downloadInProgress
            .querySelector(".vkEnhSnackbar__in")
            .addEventListener("animationend", () => {
              downloadInProgress.remove();
            }),
          downloadBlob(new Blob(blob_data), name + ".mp3");
      }
    });
    hls.on(
      Hls.Events.BUFFER_CODECS,
      (e, t) => (_o = t.audio && "audio/mp4" == t.audio.container)
    );
    hls.on(Hls.Events.BUFFER_APPENDING, (e, a) => (audio_data = a.data));
    hls.on(Hls.Events.MANIFEST_PARSED, (e, t) => {
      (t = t.levels[0].details),
        (frag_length = t.fragments.length),
        (dur = t.totalduration);
    });
    temp_audio.load();
  }
}
function downloadBlob(blob, name = "file.txt") {
  if (window.navigator && window.navigator.msSaveOrOpenBlob)
    return window.navigator.msSaveOrOpenBlob(blob);
  const data = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = data;
  link.download = name;
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  setTimeout(() => {
    window.URL.revokeObjectURL(data);
    link.remove();
  }, 100);
}
function calcSize(raw) {
  let i = Math.floor(Math.log(raw) / Math.log(1024));
  return (
    (raw / Math.pow(1024, i)).toFixed(2) + " " + ["B", "KB", "MB", "GB"][i]
  );
}

///КОНЕЦ СКАЧИВАНИЯ МУЗЫКИ///
///СКАЧИВАНИЕ АЛЬБОМА///
deferredCallback(
  () => {
    let styleElement = fromId("downloadProgressBar");
    if (!styleElement) {
      styleElement = create("style", {}, { id: "downloadProgressBar" });
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = `.vkEnhancerDownloadAlbumButton{display: flex;
    flex-direction: column;
    align-items: center;}
.pBarVkEnhAlbum {
	margin-top:2px;
    --track-background: var(--vkui--color_text_contrast_themed);
    --fill-background: var(--vkui--color_background_accent_themed);
    --border-color: var(--vkui--color_separator_primary);
    --border-radius: 10px;
    --height: 8px;
    --width: 100%;
    --value: 0;

    width: var(--width);
    height: var(--height);
    border-radius: var(--border-radius);
    overflow: hidden;
}

.pBarVkEnhAlbum::-webkit-progress-bar {
    background-color: var(--track-background);
}

.pBarVkEnhAlbum::-webkit-progress-value {
    background-color: var(--fill-background);
}

.pBarVkEnhAlbum::-moz-progress-bar {
    background-color: var(--fill-background);
}

.pBarVkEnhAlbum::-ms-fill {
    background-color: var(--fill-background);
}

.pBarVkEnhAlbum::-webkit-progress-inner-element {
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
}

.pBarVkEnhAlbum::-moz-progress-bar {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
}
`;
    document.arrive(
      "[class^='PhotosAlbumPageSubHeader__info']",
      { existing: true },
      function (e) {
        let buttonAlbumSettings = document.querySelector(
          '[data-testid="headerlayout-aside"] .vkuiButtonGroup'
        );
        let updateButton = document.createElement("div");
        updateButton.style.marginRight = "8px";
        updateButton.innerHTML = `<div class="vkEnhancerDownloadAlbumButton">
	<a style="background-color:var(--vkui--color_background_accent_themed);color:var(--vkui--color_text_contrast_themed)" class="Button-module__root--enpNU vkuiButton vkuiButton--size-m vkuiButton--appearance-accent vkuiButton--align-center vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible">
	<span class="vkuiButton__in"><span class="vkuiButton__content">${getLang(
    "photos_album_menu_download"
  )}</span></span></a></div>`;
        buttonAlbumSettings.prepend(updateButton);
        updateButton.addEventListener("click", async function () {
          await parseAlbum();
        });
      }
    );

    document.arrive(".photos_album_intro", { existing: true }, function (e) {
      let buttonAlbumSettings = document.querySelector(
        ".page_block_header_extra._header_extra"
      );
      let updateButton = document.createElement("div");
      updateButton.style.marginTop = "12px";
      updateButton.innerHTML = `<span class="photos_album_info"><a>${getLang(
        "calls_qr_code_modal_download"
      ) + " " + getLang("audio_music_album_playlist_type_album").toLowerCase()}</a></span>`;
      e.querySelector(".photos_album_intro_info").appendChild(updateButton);
      updateButton.addEventListener("click", async function () {
        await parseAlbum();
      });
    });
  },
  { variable: "getLang" }
);

async function parseAlbum() {
  let styleElement = fromId("vkEnDownloadPopup");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "vkEnDownloadPopup";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `
  .vkEnhSnackbar__before {
	color:var(--vkui--color_icon_accent);
	padding-right:12px;
  }
  .vkEnhSnackbar{
	margin:12px;
	user-select:none;
	z-index:var(--vkui--z_index_popout);
	position:fixed;
	inset-block-end:0;
	inset-inline-start:auto;
	inline-size:100%;
	padding-inline:var(--vkui_internal--safe_area_inset_left) var(--vkui_internal--safe_area_inset_right);
	padding-block-end:var(--vkui_internal--safe_area_inset_bottom)
}
.vkEnhSnackbar__in,.vkEnhSnackbar__snackbar{
	transition:transform 320ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar__body {
	display:flex;
	align-items:center;
}
.vkEnhSnackbar__in{
	border-radius:8px;
	background-color:var(--vkui--color_background_modal);
	box-shadow:var(--vkui--elevation3)
	padding:16px;
	animation:vkenh-snackbar-intro-vertical 340ms var(--vkui--animation_easing_platform);
}
.vkEnhRemovebar {
	animation:vkenh-snackbar-intro-vertical-remove 340ms var(--vkui--animation_easing_platform)!important;
}
.vkEnhSnackbar--ios .vkEnhSnackbar__in,.vkEnhSnackbar--ios .vkEnhSnackbar__snackbar{
	transition:transform 400ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar--desktop{
	max-inline-size:351px;
	inset-inline-start:0;
	inset-block-end:0
}
.vkEnhSnackbar--desktop .vkEnhSnackbar__in{
	padding:16px;
	animation-name:vkenh-snackbar-intro-horizontal
}
.vkEnhSnackbar--desktop.vkuiSnackbar--closing--wCurt .vkEnhSnackbar__in{
	transform:translate3d(-140%, 0, 0)
}
.vkuiSnackbar--touched--a8Qa6 .vkEnhSnackbar__snackbar{
	transition:none
}
@keyframes vkenh-snackbar-intro-vertical{
	from{
		transform:translate3d(0, 140%, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
@keyframes vkenh-snackbar-intro-vertical-remove {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-140%, 0, 0); /* Сдвигаем блок влево на 100% от его ширины */
        opacity: 0!important; /* Добавляем анимацию исчезновения */
    }
}
@keyframes vkenh-snackbar-intro-horizontal{
	from{
		transform:translate3d(-140%, 0, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
`;
  const url = window.location.href;
  const match = url.match(/album-?(\d+_?\d*)/);
  let albumString = "";
  if (match) {
    albumString = match[0];
    albumString = albumString.replace("album", "");
  }
  if (albumString != "") {
    let oidA = albumString.split("_")[0];
    let idA = albumString.split("_")[1];
    const replaceIt = {
      "0": -6,
      "00": -7,
      "000": -15,
      "0000": -23,
      "00000": -62,
      "000000": -10,
      "0000000": -7000,
      "00000000": -165,
      "000000000": -183,
      "0000000000": -185,
    };
    if (replaceIt[idA] !== undefined) {
      idA = replaceIt[idA];
    }
    let albumsRes = await vkApi.api("photos.getAlbums", {
      owner_id: oidA,
      album_ids: idA,
    });
    if (albumsRes.items[0].size > 0) {
      let albumCount = albumsRes.items[0].size;
      let offset = 0;
      let progressBar = document.createElement("div");
      progressBar.innerHTML = `<div class="vkEnhSnackbar vkEnhSnackbar--ios vkEnhSnackbar--desktop vkui--vkIOS--light">
  <div class="vkEnhSnackbar__in">
    <div class="vkEnhSnackbar__body vkEnhSnackbar--layout-vertical vkEnhSnackbar__snackbar">
      <div class="vkEnhSnackbar__before"><svg fill="currentColor" height="28" viewBox="0 0 20 20" width="28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M6.84 16.44c.76.06 1.74.06 3.16.06 1.42 0 2.4 0 3.16-.06a3.75 3.75 0 0 0 1.43-.32 3.5 3.5 0 0 0 1.53-1.53c.15-.29.26-.69.32-1.43l.03-.63-1.3-1.3c-.3-.3-.5-.5-.67-.64a.86.86 0 0 0-.27-.18.75.75 0 0 0-.46 0 .86.86 0 0 0-.27.18c-.16.13-.36.33-.67.64l-2.3 2.3a.75.75 0 0 1-1.06 0l-.3-.3c-.3-.3-.5-.5-.67-.64a.86.86 0 0 0-.27-.18.75.75 0 0 0-.46 0 .86.86 0 0 0-.27.18c-.16.13-.36.33-.67.64L4.56 15.5c.25.24.53.45.85.6.29.16.69.27 1.43.33zm9.39-6.27.27.27V10c0-1.42 0-2.4-.06-3.16a3.75 3.75 0 0 0-.32-1.43 3.5 3.5 0 0 0-1.53-1.53 3.75 3.75 0 0 0-1.43-.32A43.2 43.2 0 0 0 10 3.5c-1.42 0-2.4 0-3.16.06-.74.06-1.14.17-1.43.32a3.5 3.5 0 0 0-1.53 1.53c-.15.29-.26.69-.32 1.43A43.2 43.2 0 0 0 3.5 10c0 1.42 0 2.4.06 3.16.04.47.1.8.17 1.05l2.04-2.04.02-.02c.28-.28.52-.52.74-.7.23-.2.47-.37.77-.47.46-.15.94-.15 1.4 0 .3.1.54.27.77.46.16.14.34.3.53.5l1.77-1.77.02-.02c.28-.28.52-.52.74-.7.23-.2.47-.37.77-.47.46-.15.94-.15 1.4 0 .3.1.54.27.77.46.22.19.46.43.74.7zM2.54 4.73C2 5.8 2 7.2 2 10c0 2.8 0 4.2.54 5.27a5 5 0 0 0 2.19 2.19C5.8 18 7.2 18 10 18c2.8 0 4.2 0 5.27-.54a5 5 0 0 0 2.19-2.19C18 14.2 18 12.8 18 10c0-2.8 0-4.2-.55-5.27a5 5 0 0 0-2.18-2.19C14.2 2 12.8 2 10 2c-2.8 0-4.2 0-5.27.54a5 5 0 0 0-2.19 2.19zM7.25 6a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
      <div class="vkEnhSnackbar__content"><span class="vkEnhTypography vkEnhSnackbar__content-text vkEnhParagraph">${getLang(
        "me_download_waiting"
      ) + "..."}</span></div>
    </div>
  </div>
</div>`;
      document.body.appendChild(progressBar);
      let counterProgress = 0;
      while (albumCount > 0) {
        let count = Math.min(1000, albumCount);
        let allPhotos = await vkApi.api("photos.get", {
          owner_id: oidA,
          album_id: idA,
          count: count,
          offset: offset,
          rev: true,
        });
        const zip = new JSZip();
        let currentZipIndex = "_" + Math.ceil((offset + 1) / 1000);
        if (albumsRes.items[0].size < 1000) {
          currentZipIndex = "";
        }
        let bolshe_kosara = 0;
        const promises = allPhotos.items.map(async (photoItem) => {
          let sizes = photoItem.sizes;
          let oldS = 0;
          let newS;
          const availableSizes = [
            "a",
            "b",
            "i",
            "p",
            "q",
            "s",
            "w",
            "z",
            "y",
            "x",
            "r",
            "o",
            "m",
            "g",
            "max",
            "l",
            "f",
            "k",
            "c",
            "e",
            "d",
            "j",
            "temp",
            "h",
            "n",
          ];
          let n = null,
            e = 0;
          let t;
          for (const curSize of sizes) {
            t = curSize.type;
            if (availableSizes.includes(t)) {
              t = (curSize.width || 0) * (curSize.height || 0);
              if (t > e || t == 0) {
                e = t;
                n = curSize;
              }
            }
          }
          let maxSizer = t[0] || n;
          let maxSizeUrl;
          try {
            maxSizeUrl = maxSizer.url;
          } catch (error) {
            console.log(maxSizer);
          }
          try {
            let [filename, blob] = await getPhoto(
              maxSizeUrl,
              photoItem,
              progressBar
            );
            zip.file(filename, blob);
            counterProgress++;
            progressBar.querySelector(
              ".vkEnhSnackbar__content-text"
            ).innerHTML =
              getLang("box_loading") +
              "<br><br>" +
              `${albumsRes.items[0].title}${currentZipIndex}.zip ` +
              counterProgress +
              "/" +
              albumsRes.items[0].size;
          } catch (error) {
            console.log("Failed ", maxSizeUrl);
          }
        });
        await Promise.all(promises);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = zipUrl;
        a.download = `${albumsRes.items[0].title}${currentZipIndex}.zip`;
        a.click();
        bolshe_kosara += 1000;
        albumCount -= count;
        offset += count;
      }
      progressBar
        .querySelector(".vkEnhSnackbar__in")
        .classList.add("vkEnhRemovebar");
      progressBar
        .querySelector(".vkEnhSnackbar__in")
        .addEventListener("animationend", () => {
          progressBar.remove();
        });
      counterProgress = 0;
    }
  }
}

async function getPhoto(maxSizeUrl, photoItem, progressBar) {
  let attempts = 0;
  while (attempts < 10) {
    try {
      let response = await fetch(maxSizeUrl);
      let blob = await response.blob();
      let filename = `${photoItem.owner_id}_${photoItem.id}.jpg`;
      return [filename, blob];
    } catch (error) {
      progressBar.querySelector(
        ".vkEnhSnackbar__content-text"
      ).innerHTML = getLang("calls_status_bad_internet_connection");
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  }
  throw new Error("Failed to fetch photo after 10 attempts");
}

///КОНЕЦ СКАЧИВАНИЯ АЛЬБОМА///
///ОБНОВЛЕНИЕ ПОДМЕНА ФОТОГРАФИИ///
document.arrive("#pv_delete", { existing: true }, async function (e) {
  let userIDHereWeGoAgain2;

  let updateButton = document.createElement("div");
  updateButton.style.float = "left";
  updateButton.style.marginRight = "8px";
  updateButton.style.marginTop = "-8px";
  updateButton.innerHTML = `<div class="vkEnhancerUpdateButton">
	<a style="background-color:rgba(255, 255, 255, 0.04);color:white" class="Button-module__root--enpNU vkuiButton vkuiButton--size-m vkuiButton--mode-vkEnhancer vkuiButton--appearance-accent vkuiButton--align-center vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible">
	<span class="vkuiButton__in"><span class="vkuiButton__content">${getLang(
    "global_notify_refresh"
  )}</span></span></a></div>
	<input id="photoUpdateInput" class="file" type="file" size="28" accept="image/jpeg,image/png,image/gif" multiple="" name="photo" style="visibility: hidden; position: absolute;">`;
  let styleElement = fromId("mode-vkEnhancer");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "mode-vkEnhancer" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.vkuiButton--mode-vkEnhancer:hover{background-color:rgba(255, 255, 255, 0.08)!important;}`;
  userIDHereWeGoAgain2 = cur.pvCurPhoto.id.split("_")[0];
  e.parentElement.prepend(updateButton);

  try {
    updateButton.addEventListener("click", async function () {
      e.parentElement.querySelector("#photoUpdateInput").click();
    });
    e.parentElement
      .querySelector("#photoUpdateInput")
      .addEventListener("change", function () {
        if (
          e.parentElement.querySelector("#photoUpdateInput").files.length > 0
        ) {
          handleUpdatePhoto();
        }
      });
  } catch (error) {}
});
async function handleUpdatePhoto() {
  const filesInputUpdate = document.getElementById("photoUpdateInput");
  const file = filesInputUpdate.files[0];
  await sendUpdatePhoto(file);
}
async function sendUpdatePhoto(fileNameOutput) {
  const uploadUrl1 = await vkApi.api("photos.getPhotoEditorUploadServer", {});
  const uploadUrl = uploadUrl1["upload_url"];

  let file = await uploadUpdatePhoto(uploadUrl, fileNameOutput);
  
  const data = JSON.parse(file);
  let photoId = cur.pvCurPhoto.id;
  let doc = await vkApi.api("photos.savePhotoEditor", {
    response_json: file,
    photo: photoId,
  });
  nav.reload();
}

async function uploadUpdatePhoto(uploadUrl, fileNameOutput) {
  const formData = new FormData();
  formData.append("file", fileNameOutput);
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error("Upload failed. Status: " + xhr.status));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Upload failed. Network error"));
    };

    xhr.open("POST", uploadUrl);
    xhr.send(formData);
  });
}
///КОНЕЦ ОБНОВЛЕНИЯ ПОДМЕНЫ ФОТОГРАФИИ///
///НАЧАЛО ДОБАВЛЕНИЯ ОТЧЕСТВА///
if (getLocalValue("isMiddleName")) {
  document.arrive("#owner_page_name", { existing: true }, async function (e) {
    let styleElement = fromId("vken_expand_username");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "vken_expand_username";
      styleElement.innerHTML = `.OwnerPageName{width:300px!important;max-width:300px!important;}`;
      document.head.appendChild(styleElement);
    }
    styleElement.id = "vken_expand_username";
    let objectId = await getId();
    let userDataMiddle = await getUserMiddleName(objectId);
    if (userDataMiddle && userDataMiddle !== "") {
      let ownerNameElement = document.querySelector(".OwnerPageName");
      let ownerName = ownerNameElement.firstChild.textContent.trim();
      let nickname = userDataMiddle.trim();

      if (ownerName.includes(" ")) {
        let lastNameIndex = ownerName.lastIndexOf(" ");
        let firstName = ownerName.substring(0, lastNameIndex);
        let lastName = ownerName.substring(lastNameIndex + 1);
        ownerNameElement.firstChild.textContent = `${firstName} ${nickname} ${lastName}`;
      } else {
        let antiIcons = document.querySelector(".OwnerPageName__noWrapText");
        if (antiIcons) {
          let antiIconsText = antiIcons.textContent.trim();
          let lastNameIndex = antiIconsText.lastIndexOf(" ");
          let firstName = antiIconsText.substring(0, lastNameIndex);
          let lastName = antiIconsText.substring(lastNameIndex + 1);
          if (antiIcons.textContent.trim().includes(" ")) {
            antiIcons.textContent = "";
            ownerNameElement.firstChild.textContent = `${firstName} ${nickname} ${lastName}`;
          } else {
            ownerNameElement.firstChild.textContent += ` ${nickname} ​`;
          }
        } else {
          ownerNameElement.firstChild.textContent += ` ${nickname} ​`;
        }
      }
    }
  });

  async function getUserMiddleName(objectId) {
    try {
      let pizda = _o(document.getElementById("react_rootprofile"))?.container
        ?.memoizedState?.element?.props;
      function _o(e) {
        const t = {};
        if (!e) return t;
        for (const n of Object.keys(e))
          n.startsWith("__reactFiber") && (t.fiber = e[n]),
            n.startsWith("__reactProps") && (t.props = e[n]),
            n.startsWith("__reactContainer") && (t.container = e[n]);
        return t;
      }
      var response = pizda.store.getState().owner.nickname;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function getId() {
    const url = window.location.href;
    var parts = url.split("/");
    var username = parts[parts.length - 1];
    if (username.includes("?")) {
      username = username.split("?")[0];
    }
    const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
    try {
      const response = await fetch(url1);
      const data = await response.json();
      return data.response.object_id;
    } catch (error) {
      console.error(error);
      return 1;
    }
  }
} else {
  const customStyle = document.getElementById("vken_expand_username");
  if (customStyle) {
    customStyle.remove();
  }
}
///КОНЕЦ ДОБАВЛЕНИЯ ОТЧЕСТВА///
///НАЧАЛО КЛАССИЧЕСКОГО ДИЗАЙНА ГРУПП///
/*
document.arrive("#page_group_info_block", { existing: true }, async function (e) {
	deferredCallback(
                async () => {
let group;
try {
	group = await vkApi.api('groups.getById',{group_ids: cur.options.public_id,fields:"activity,city,counters,description,links,place,site,status,verified,is_closed,is_admin,can_message,is_member,type"});
}

catch(error) {
	group = await vkApi.api('groups.getById',{group_ids: cur.options.group_id,fields:"activity,city,counters,description,links,place,site,status,verified,is_closed,is_admin,can_message,is_member,type"})
}
let groupMain = group.groups[0];
let groupAvatarUrl = groupMain.photo_base;
let groupName = groupMain.name;
let groupDescr = groupMain.description;
let groupCounters = groupMain.counters;
let groupLinks = groupMain.links;
let groupSite = groupMain.site;
let groupStatus = groupMain.status;
let groupClosed = groupMain.is_closed;
let groupIsAdmin = groupMain.is_admin;
let groupCanMessage = groupMain.can_message;
let groupIsMember = groupMain.is_member;
let groupType = groupMain.type;
let groupActiveButton = document.querySelector('[onclick*="Groups.processActionButton"]');
let groupMoreActions = document.querySelector('.page-group-actions--more');
let groupAdminBlock = document.querySelector('.page_block.page_action_menu_groups');
let groupAvaBlock = document.querySelector('#page_group_info_block');

document.querySelector('.group-redesigned-narrow').insertBefore(groupAdminBlock, document.querySelector('.page_block:has(#group_followers)'))

appendAvatarActionBlock(groupAvatarUrl,groupIsMember,groupCanMessage,groupActiveButton,groupMoreActions,groupType)
},
                { variable: "vkApi" }
              );
function appendAvatarActionBlock(ava,sub,canmsg,actbutton,moreaction,type) {
	let appendHere = document.querySelector('.group_info_rows');
	let superBlock = document.createElement('div');
	superBlock.classList.add('public_bottom_actions');
	let avatar = document.createElement('div');
	let avaClick = document.querySelector('[onclick^="return showPhoto"]').getAttribute('onclick').replaceAll(`"`,`'`);
	let avaLink = document.querySelector('[onclick^="return showPhoto"]').getAttribute('href');
	avatar.className = 'page_avatar_wrap';
	avatar.innerHTML = `
	<div id="page_avatar" class="page_avatar">
  <a href=${avaLink} onclick="${avaClick}"><img onmouseover="uiActionsMenu.show(document.querySelector('.page-group-actions--avatar'), null, {'delay':100});" onmouseout="uiActionsMenu.hide(document.querySelector('.page-group-actions--avatar'), null, {'delay':100});" class="page_avatar_img" src="${ava}"></a>
</div>`;
	appendHere.appendChild(avatar);
	if(canmsg == 1) {
		let messageButton = document.createElement('button');
		messageButton.classList = 'FlatButton FlatButton--primary FlatButton--size-m redesigned-group-action';
		messageButton.id = 'public_messages';
		switch(type) {
			case "group":
				messageButton.setAttribute('onclick','showWriteMessageBox(this,-cur.options.group_id)');
				break;
			case "page":
				messageButton.setAttribute('onclick','showWriteMessageBox(this,-cur.options.public_id)');
				break;
		}
		messageButton.innerHTML = `
			<span class="FlatButton__in">
			<span class="FlatButton__content">${getLang("global_write_msg")}</span>
			</span>`;
		appendHere.appendChild(messageButton);
	}
	let subButton = document.createElement('button');
	subButton.classList = 'FlatButton FlatButton--primary FlatButton--size-m redesigned-group-action';
	subButton.id = 'public_subscribe';
	switch(type) {
		case "group":
			subButton.setAttribute('onclick','Groups.subscribe(cur.options.group_id)');
			break;
		case "page":
			subButton.setAttribute('onclick','Public.subscribe(cur.options.public_id)');
			break;
	}
	subButton.innerHTML = `
	
	<span class="FlatButton__in">
    
    <span class="FlatButton__content">${getLang("me_group_join")}</span>
    
  </span>`;
  
  let unSubButton = document.createElement('button');
	unSubButton.classList = 'FlatButton FlatButton--secondary FlatButton--size-m FlatButton--wide';
	unSubButton.id = 'public_unsubscribe';
	switch(type) {
		case "group":
			unSubButton.setAttribute('onclick','Groups.leave(cur.options.group_id)');
			break;
		case "page":
			unSubButton.setAttribute('onclick','Public.unSubscribe(cur.options.public_id)');
			break;
	}
	unSubButton.innerHTML = `
	
	<span class="FlatButton__in">
    
    <span class="FlatButton__content">${getLang("groups_unsubscribe")}</span>
    
  </span>`;
	appendHere.appendChild(superBlock);
	switch(sub) {
		case 1:
			superBlock.appendChild(unSubButton);
			break;
		case 0:
			superBlock.appendChild(subButton);
			break;
	}
	
	superBlock.appendChild(moreaction);
}
});
*/
///КОНЕЦ КЛАССИЧЕСКОГО ДИЗАЙНА ГРУПП///
///НАЧАЛО КЛАССИЧЕСКОГО ДИЗАЙНА ПРОФИЛЯ///
deferredCallback(
  () => {
    if (getLocalValue("isClassicalProfileDesign")) {
      const cssLinkClassic = document.createElement("link");
      cssLinkClassic.rel = "stylesheet";
      cssLinkClassic.type = "text/css";
      cssLinkClassic.href = urls["profile_css"];

      document.head.appendChild(cssLinkClassic);
      document.arrive(
        "#profile_redesigned",
        { existing: true },
        async function (e) {
          try {
            let styleElement = fromId("vken_box_message_classic");
            if (!styleElement) {
              styleElement = document.createElement("style");
              styleElement.id = "vken_box_message_classic";
              document.head.appendChild(styleElement);
            }
            styleElement.id = "vken_box_message_classic";
            styleElement.innerHTML =
              `.ProfileHeaderButton > button:has(> span > span > svg.vkuiIcon--user_check_outline_20) > span:before{content:"` +
              getLang("me_in_your_friends") +
              `"}.ProfileHeaderButton>a:has(>span>span>svg.vkuiIcon--message_outline_20) > span:before,.ProfileHeaderButton >a[href*="/im"] >span:before{content: "` +
              getLang("profile_send_msg") +
              `"}`;
            var objectId1 = await getId();
            var userData = await getUserData(objectId1);
            if (!userData.hidden) {
              var photoUrl = userData.photo_200;
            }
            var activityText = userData.activity;
            appendActivityText(activityText);
            await appearStarts(userData);
            if (
              !userData.blacklisted == 1 &&
              !userData.deactivated &&
              !userData.is_service &&
              !userData.hidden
            ) {
              const customStyle = fromId("classicalProfilesDELETED");
              if (customStyle) {
                customStyle.remove();
              }
              const customStyle1 = fromId("classicalProfilesBlackListed");
              if (customStyle1) {
                customStyle1.remove();
              }
              const customStyle2 = fromId("classicalProfilesDeactivated");
              if (customStyle2) {
                customStyle2.remove();
              }
              const customStyle3 = fromId("classicalProfilesService");
              if (customStyle3) {
                customStyle3.remove();
              }
              const customStyle4 = fromId("classicalProfilesHidden");
              if (customStyle4) {
                customStyle4.remove();
              }
              addCounters(userData, userData.counters);
              appearVariable();
              if (vk.id != userData.id) {
                buttonrun();
              }
              expandMore(userData);
            } else {
              try {
                let pMoreInfo = document.querySelector(".profile_more_info");
                pMoreInfo.style.display = "none";
              } catch (error) {}
              let styleElement = fromId("classicalProfilesDELETED");
              if (!styleElement) {
                styleElement = create(
                  "style",
                  {},
                  { id: "classicalProfilesDELETED" }
                );
                document.head.appendChild(styleElement);
              }
              styleElement.innerHTML =
                '[class^="vkitGroup__group"]:has(>.PlaceholderMessageBlock) {display: none !important;}';
              let pInfoShort = document.querySelector(
                ".profile_info.profile_info_short"
              );
              let pModuleText = "";
              try {
                pModuleText = document.querySelector(
                  '[class^="vkitGroup__group"]:has(>.PlaceholderMessageBlock) [class^="vkitPlaceholder__text"]'
                ).innerHTML;
              } catch (error) {}
              let pModuleDiv = document.createElement("div");
              let pModuleSpan = document.createElement("span");
              pModuleSpan.innerHTML = pModuleText;
              pModuleDiv.classList.add("vkEnhancerOffProfile");
              pModuleDiv.style.display = "flex";
              pModuleDiv.style.justifyContent = "center";
              pModuleDiv.style.width = "100%";
              pModuleSpan.classList.add("vkEnhancerOffProfile__in");
              pModuleSpan.style.padding = "32px 32px";
              pModuleSpan.style.fontSize = "14px";
              pModuleSpan.style.lineHeight = "18px";
              pModuleSpan.style.fontWeight = "400";
              pModuleSpan.style.textAlign = "center";
              pModuleSpan.style.color = "var(--vkui--color_text_secondary)";
              pModuleDiv.appendChild(pModuleSpan);
              if (pModuleText != "") {
                pInfoShort.appendChild(pModuleDiv);
              }
              if (userData.blacklisted == 1 && !userData.deactivated) {
                let styleElement = fromId("classicalProfilesBlackListed");
                if (!styleElement) {
                  styleElement = create(
                    "style",
                    {},
                    { id: "classicalProfilesBlackListed" }
                  );
                  document.head.appendChild(styleElement);
                }
                styleElement.innerHTML =
                  ".ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:280px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){top:230px!important;}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in{width:100%!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in > span{display:block!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span{background:none!important;}.ProfileHeaderActions__moreButtonContainer {margin-left:0px; !important;} div.ProfileHeaderActions__moreButtonContainer > div > button {min-width:206px!important;}";
              }
              if (userData.deactivated) {
                let styleElement = fromId("classicalProfilesDeactivated");
                if (!styleElement) {
                  styleElement = create(
                    "style",
                    {},
                    { id: "classicalProfilesDeactivated" }
                  );
                  document.head.appendChild(styleElement);
                }
                styleElement.innerHTML =
                  ".ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){display:none!important}";
              }
              if (userData.is_service) {
                addCounters(userData, userData.counters);
                let styleElement = fromId("classicalProfilesService");
                if (!styleElement) {
                  styleElement = create(
                    "style",
                    {},
                    { id: "classicalProfilesService" }
                  );
                  document.head.appendChild(styleElement);
                }
                styleElement.innerHTML =
                  ".page_current_info.current_text{border-bottom:none!important;}.ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}";
              }
              if (userData.hidden) {
                let styleElement = fromId("classicalProfilesHidden");
                if (!styleElement) {
                  styleElement = create(
                    "style",
                    {},
                    { id: "classicalProfilesHidden" }
                  );
                  document.head.appendChild(styleElement);
                }
                styleElement.innerHTML =
                  ".ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}";
              }
              appearVariable();
            }
          } catch (error) {
            console.error(error);
          }
        }
      );

      document.arrive(
        ".ProfileHeaderButton > a[href='/edit'] .vkuiButton__content",
        { existing: true },
        async function (e) {
          e.textContent = getLang("global_edit");
        }
      );
      var friendsSection;
      var aHrefSectionFrens;
      var imReady;
      document.arrive(".ProfileGroup", { existing: true }, async function (e) {
        const profileGroups = document.querySelectorAll("section.ProfileGroup");
        profileGroups.forEach((profileGroup) => {
          const content = profileGroup.textContent;
          if (
            content.includes(getLang("profile_followers")) ||
            content.includes(getLang("profile_common_friends")) ||
            content.includes(getLang("profile_friends")) ||
            content.includes(
              getLang("profile_closed_profile_banner_closed_btn")
            ) ||
            content.includes(getLang("profile_narratives"))
          ) {
            //console.log("Removed: "+profileGroup.innerHTML);
            profileGroup.remove();
          }
        });
      });
      document.arrive(".page_counter", { existing: true }, async function (e) {
        let i = document.querySelectorAll(
          ".vkuiInternalGroupCard:not(.ProfileGroup)"
        );
        i.forEach((elem) => {
          if (elem.textContent.includes(getLang("profile_unknown_error"))) {
            elem.remove();
          }
        });
      });
      document.arrive(
        ".imReadyForShowingFriends",
        { existing: true },
        async function (e) {
          if (friendsSection != null && imReady) {
            document
              .querySelector(".ScrollStickyWrapper > div")
              .prepend(friendsSection);
            document
              .querySelector(".vkEnhancerFrenBox")
              .appendChild(aHrefSectionFrens);
          }
          let i = document.querySelectorAll(
            ".vkuiInternalGroupCard:not(.ProfileGroup)"
          );
          i.forEach((elem) => {
            if (elem.textContent.includes(getLang("profile_unknown_error"))) {
              elem.remove();
            }
          });
        }
      );

      document.arrive(".page_current_info", { existing: true }, async function (
        e
      ) {
        try {
          if (
            !document
              .querySelector("#profile_redesigned .ProfileHeader")
              .classList.contains("ProfileHeader--noCover")
          ) {
            document
              .querySelector("#profile_redesigned .ProfileHeader")
              .classList.add("ProfileHeader--noCover");
          }
        } catch (error) {}
      });

      document.arrive(
        "#profile_redesigned",
        { existing: true },
        async function (e) {
          imReady = false;
          let pizda = _o(document.getElementById("react_rootprofile"))
            ?.container?.memoizedState?.element?.props;
          function _o(e) {
            const t = {};
            if (!e) return t;
            for (const n of Object.keys(e))
              n.startsWith("__reactFiber") && (t.fiber = e[n]),
                n.startsWith("__reactProps") && (t.props = e[n]),
                n.startsWith("__reactContainer") && (t.container = e[n]);
            return t;
          }
          let objectId1 = await getId();
          let userdata = await getUserDataWithoutOnline(objectId1);
          let userdata1 = pizda.store.getState().owner;
          let friends;
          let frenCount = { count: 0 };
          if (
            (!userdata.is_closed || userdata.can_access_closed) &&
            !userdata.blacklisted == 1 &&
            !userdata.deactivated
          ) {
            try {
              friends = await vkApi.api("friends.get", {
                user_id: userdata.id,
                fields: "photo_100,online,domain",
                count: 10000,
              });
              frenCount = await vkApi.api("friends.get", {
                user_id: userdata.id,
                count: 10000,
              });
            } catch (error) {}
          }
          if (
            frenCount.count > 0 &&
            !document.querySelector(".ProfileFriends")
          ) {
            friendsSection = document.createElement("section");
            friendsSection.classList.add(
              "vkuiInternalGroup",
              "vkuiGroup",
              "vkuiGroup--mode-card",
              "vkuiInternalGroup--mode-card",
              "vkuiGroup--padding-m",
              "vkuiInternalGroupCard",
              "ProfileFriends",
              "vkEnhancerProfileFriends"
            );
            aHrefSectionFrens = document.createElement("a");
            if (vk.id != objectId1) {
              aHrefSectionFrens.href = `/friends?id=${objectId1}&section=online`;
              aHrefSectionFrens.style.marginLeft = "auto";
              aHrefSectionFrens.style.marginRight = "23px";
              aHrefSectionFrens.style.color =
                "var(--vkui--color_text_secondary)";
              aHrefSectionFrens.textContent = getLang(
                "profile_friendsonln"
              ).toLowerCase();
            } else {
              aHrefSectionFrens.href = `/feed?section=updates`;
              aHrefSectionFrens.style.marginLeft = "auto";
              aHrefSectionFrens.style.marginRight = "23px";
              aHrefSectionFrens.style.color =
                "var(--vkui--color_text_secondary)";
              aHrefSectionFrens.textContent = getLang("updates").toLowerCase();
            }
            friendsSection.innerHTML =
              `
        <a href="/friends?id=${userdata.id}&section=all" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
            <div style="padding:7px 0 0 17px;" class="vkEnhancerFriendsPadding vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
                <div class="vkuiHeader__main">
                    <div class="vkEnhancerFrenBox vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
                        <span class="vkuiHeader__content-in">
                            <div class="Header-module__content--F5x_X">
                                <div class="TextClamp-module__singleLine--mRCrF">` +
              getLang("profile_friends") +
              `</div>
                            </div>
                        </span>
                        <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${frenCount.count}</span>
                    </div>
                </div>
                <span class="vkuiTypography vkuiHeader__aside vkuiParagraph"></span>
            </div>
        </a>
        <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
        <div class="ProfileGroupHorizontalCells vkEnhancerHorizontalCells">
		<div class="PrimaryCells"></div>
        </div>
        <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
    `;
            friendsSection.style.padding = "0px";
            const friendsContainer = friendsSection.querySelector(
              ".ProfileGroupHorizontalCells"
            );
            const friendsContainer1 = friendsSection.querySelector(
              ".PrimaryCells"
            );
            const randomFriends = friends.items
              .sort(() => 0.5 - Math.random())
              .slice(0, 6);
            randomFriends.forEach((friend) => {
              const friendItem = document.createElement("div");
              friendItem.classList.add(
                "vkuiHorizontalCell",
                "vkuiHorizontalCell--size-s",
                "ProfileFriends__item",
                "HorizontalCell-module__root--XStwI",
                "HorizontalCell-module__rootSizeS--JwyO0"
              );
              friendItem.innerHTML = `
            <a href="/${
              friend.domain
            }" class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
                <div class="vkuiHorizontalCell__image">
                    <div class="vkuiImageBase vkuiImageBase--loaded vkuiAvatar" style="width: 52px; height: 52px;"><img class="vkuiImageBase__img" src="${
                      friend.photo_100
                    }">${friend.online === 1 ? "" : ""}</div>
                </div>
                <div class="vkuiHorizontalCell__content">
                    <span class="vkuiTypography vkuiTypography--normalize vkuiCaption--level-1"><div class="TextClamp-module__singleLine--mRCrF">${
                      friend.first_name
                    }</div></span>
                </div>
            </a>
        `;
              if (friend.online === 1) {
                const onlineBadge = document.createElement("div");
                onlineBadge.classList.add(
                  "vkuiImageBaseBadge",
                  "vkuiImageBaseBadge--background-stroke",
                  "vkuiAvatarBadge",
                  "vkuiAvatarBadge--preset-onlineMobile",
                  "Badge-module__root--dY2bH",
                  "Badge-module__rootBottomRight--HIk3W"
                );
                if (friend.online_mobile && friend.online_mobile == 1) {
                  onlineBadge.innerHTML = `
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-8 vkuiIcon--h-12 vkuiIcon--online_mobile_12" viewBox="0 0 8 12" width="8" height="12" style="width: 8px; height: 12px;">
                    <path fill="currentColor" d="M5.99 0C7.1 0 8 .9 8 2.01v7.98C8 11.1 7.1 12 5.99 12H2.01C.9 12 0 11.1 0 9.99V2.01C0 .9.9 0 2.01 0zm.008 3H2.003a.5.5 0 0 0-.503.502v4.996c0 .277.225.502.503.502h3.995a.5.5 0 0 0 .502-.502V3.503A.5.5 0 0 0 5.997 3"></path>
                </svg>
            `;
                } else {
                  onlineBadge.innerHTML = `
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-12 vkuiIcon--h-12 vkuiIcon--circle_12" viewBox="0 0 12 12" width="12" height="12" style="width: 12px; height: 12px;">
					<path fill="currentColor" d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
				</svg>
            `;
                  onlineBadge.classList.remove(
                    "vkuiAvatarBadge--preset-onlineMobile"
                  );
                  onlineBadge.classList.add("vkuiAvatarBadge--preset-online");
                }
                friendItem
                  .querySelector(".vkuiImageBase")
                  .appendChild(onlineBadge);
              }

              friendsContainer1.appendChild(friendItem);
            });
            if (vk.id === userdata.id) {
              const onlineFriends = friends.items.filter(
                (friend) => friend.online === 1
              );
              const countOnline = onlineFriends.length;
              if (countOnline > 0) {
                const onlineFriendsHeader = document.createElement("a");
                onlineFriendsHeader.href = `/friends?id=${vk.id}&section=online`;
                onlineFriendsHeader.classList.add(
                  "Header-module__tappable--mabke",
                  "ProfileGroupHeader",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible",
                  "vkEnhFriendsOnline"
                );
                onlineFriendsHeader.innerHTML =
                  `
            <div style="padding-top:0px; padding-bottom:0px;" class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
                <div class="vkuiHeader__main">
                    <div class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
                        <span class="vkuiHeader__content-in">
                            <div class="Header-module__content--F5x_X">
                                <div class="TextClamp-module__singleLine--mRCrF">` +
                  getLang("profile_friendsonln") +
                  `</div>
                            </div>
                        </span>
                        <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${countOnline}</span>
                    </div>
                </div>
            </div>
        `;
                friendsContainer.appendChild(onlineFriendsHeader);

                const onlineFriendsContainer = document.createElement("div");
                onlineFriendsContainer.classList.add(
                  "ProfileGroupHorizontalCells"
                );
                onlineFriendsContainer.style.paddingLeft = "8px";
                onlineFriendsContainer.style.paddingRight = "8px";
                onlineFriendsContainer.style.paddingBottom = "8px";
                onlineFriends
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 3)
                  .forEach((onlineFriend) => {
                    const friendItem = document.createElement("div");
                    friendItem.classList.add(
                      "vkuiHorizontalCell",
                      "vkuiHorizontalCell--size-s",
                      "ProfileFriends__item",
                      "HorizontalCell-module__root--XStwI",
                      "HorizontalCell-module__rootSizeS--JwyO0"
                    );
                    friendItem.innerHTML = `
                <a href="/${onlineFriend.domain}" class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
                    <div class="vkuiHorizontalCell__image">
                        <div class="vkuiImageBase vkuiImageBase--loaded vkuiAvatar" style="width: 52px; height: 52px;"><img class="vkuiImageBase__img" src="${onlineFriend.photo_100}"></div>
                    </div>
                    <div class="vkuiHorizontalCell__content">
                        <span class="vkuiTypography vkuiTypography--normalize vkuiCaption--level-1"><div class="TextClamp-module__singleLine--mRCrF">${onlineFriend.first_name}</div></span>
                    </div>
                </a>
            `;
                    if (onlineFriend.online === 1) {
                      const onlineBadge = document.createElement("div");
                      onlineBadge.classList.add(
                        "vkuiImageBaseBadge",
                        "vkuiImageBaseBadge--background-stroke",
                        "vkuiAvatarBadge",
                        "vkuiAvatarBadge--preset-onlineMobile",
                        "Badge-module__root--dY2bH",
                        "Badge-module__rootBottomRight--HIk3W"
                      );
                      if (
                        onlineFriend.online_mobile &&
                        onlineFriend.online_mobile == 1
                      ) {
                        onlineBadge.innerHTML = `
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-8 vkuiIcon--h-12 vkuiIcon--online_mobile_12" viewBox="0 0 8 12" width="8" height="12" style="width: 8px; height: 12px;">
                    <path fill="currentColor" d="M5.99 0C7.1 0 8 .9 8 2.01v7.98C8 11.1 7.1 12 5.99 12H2.01C.9 12 0 11.1 0 9.99V2.01C0 .9.9 0 2.01 0zm.008 3H2.003a.5.5 0 0 0-.503.502v4.996c0 .277.225.502.503.502h3.995a.5.5 0 0 0 .502-.502V3.503A.5.5 0 0 0 5.997 3"></path>
                </svg>
            `;
                      } else {
                        onlineBadge.innerHTML = `
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-12 vkuiIcon--h-12 vkuiIcon--circle_12" viewBox="0 0 12 12" width="12" height="12" style="width: 12px; height: 12px;">
					<path fill="currentColor" d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
				</svg>
            `;
                        onlineBadge.classList.remove(
                          "vkuiAvatarBadge--preset-onlineMobile"
                        );
                        onlineBadge.classList.add(
                          "vkuiAvatarBadge--preset-online"
                        );
                      }
                      friendItem
                        .querySelector(".vkuiImageBase")
                        .appendChild(onlineBadge);
                    }
                    onlineFriendsContainer.appendChild(friendItem);
                  });
                friendsContainer.appendChild(onlineFriendsContainer);
              }
            }
            let myFriendsResponse = { items: [""] };
            try {
              myFriendsResponse = await vkApi.api("friends.get", {
                user_id: vk.id,
              });
            } catch (error) {}
            let myFriends = myFriendsResponse.items;
            let commonFriends = friends.items.filter((friend) =>
              myFriends.includes(friend.id)
            );
            if (commonFriends.length > 0 && userdata.id != vk.id) {
              const commonFriendsHeader = document.createElement("div");
              commonFriendsHeader.tabIndex = "0";
              commonFriendsHeader.role = "button";
              commonFriendsHeader.dataset.allowLinkOnclickWeb = "1";
              commonFriendsHeader.classList.add(
                "Header-module__tappable--mabke",
                "ProfileGroupHeader",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              commonFriendsHeader.innerHTML =
                `
	<a href="/friends?id=${userdata.id}&amp;section=common" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
        <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
            <div class="vkuiHeader__main">
                <div class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
                    <span class="vkuiHeader__content-in">
                        <div class="Header-module__content--F5x_X">
                            <div class="TextClamp-module__singleLine--mRCrF">` +
                getLang("profile_common_friends") +
                `</div>
                        </div>
                    </span>
                    <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${userdata1.mutual.count}</span>
                </div>
            </div>
        </div>
	</a>
    `;

              const jopaContainer = document.createElement("div");
              jopaContainer.classList.add("vkEnhancerMutualFriends");
              jopaContainer.appendChild(commonFriendsHeader);
              const commonFriendsContainer = document.createElement("div");
              commonFriendsContainer.classList.add(
                "ProfileGroupHorizontalCells"
              );

              commonFriends.slice(0, 3).forEach((commonFriend) => {
                const friendItem = document.createElement("div");
                friendItem.classList.add(
                  "vkuiHorizontalCell",
                  "vkuiHorizontalCell--size-s",
                  "ProfileFriends__item",
                  "HorizontalCell-module__root--XStwI",
                  "HorizontalCell-module__rootSizeS--JwyO0"
                );
                friendItem.innerHTML = `
            <a href="/${commonFriend.domain}" class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
                <div class="vkuiHorizontalCell__image">
                    <div class="vkuiImageBase vkuiImageBase--loaded vkuiAvatar" style="width: 52px; height: 52px;"><img class="vkuiImageBase__img" src="${commonFriend.photo_100}"><div aria-hidden="true" class="vkuiImageBase__border"></div></div>
                </div>
                <div class="vkuiHorizontalCell__content">
                    <span class="vkuiTypography vkuiTypography--normalize vkuiCaption--level-1"><div class="TextClamp-module__singleLine--mRCrF">${commonFriend.first_name}</div></span>
                </div>
            </a>
        `;
                if (commonFriend.online === 1) {
                  const onlineBadge = document.createElement("div");
                  onlineBadge.classList.add(
                    "vkuiImageBaseBadge",
                    "vkuiImageBaseBadge--background-stroke",
                    "vkuiAvatarBadge",
                    "vkuiAvatarBadge--preset-onlineMobile",
                    "Badge-module__root--dY2bH",
                    "Badge-module__rootBottomRight--HIk3W"
                  );
                  if (
                    commonFriend.online_mobile &&
                    commonFriend.online_mobile == 1
                  ) {
                    onlineBadge.innerHTML = `
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-8 vkuiIcon--h-12 vkuiIcon--online_mobile_12" viewBox="0 0 8 12" width="8" height="12" style="width: 8px; height: 12px;">
                    <path fill="currentColor" d="M5.99 0C7.1 0 8 .9 8 2.01v7.98C8 11.1 7.1 12 5.99 12H2.01C.9 12 0 11.1 0 9.99V2.01C0 .9.9 0 2.01 0zm.008 3H2.003a.5.5 0 0 0-.503.502v4.996c0 .277.225.502.503.502h3.995a.5.5 0 0 0 .502-.502V3.503A.5.5 0 0 0 5.997 3"></path>
                </svg>
            `;
                  } else {
                    onlineBadge.innerHTML = `
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-12 vkuiIcon--h-12 vkuiIcon--circle_12" viewBox="0 0 12 12" width="12" height="12" style="width: 12px; height: 12px;">
					<path fill="currentColor" d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
				</svg>
            `;
                    onlineBadge.classList.remove(
                      "vkuiAvatarBadge--preset-onlineMobile"
                    );
                    onlineBadge.classList.add("vkuiAvatarBadge--preset-online");
                  }
                  friendItem
                    .querySelector(".vkuiImageBase")
                    .appendChild(onlineBadge);
                }
                commonFriendsContainer.appendChild(friendItem);
              });
              jopaContainer.appendChild(commonFriendsContainer);
              friendsSection.prepend(jopaContainer);
            }
          }
          imReady = true;
          let readyElement = document.createElement("div");
          readyElement.classList.add("imReadyForShowingFriends");
          document.body.appendChild(readyElement);
        }
      );
      document.arrive(".label.fl_l", { existing: true }, async function (e) {
        appearVariable();
      });

      async function appearVariable() {
        var profileInfo = document.querySelector(".ProfileInfo");
        var profileInfoHeight = profileInfo.offsetHeight;
        document.documentElement.style.setProperty(
          "--vkenhancer-info-height",
          profileInfoHeight + "px"
        );
      }

      async function expandMore(userData) {
        var profileMoreInfo = document.querySelector(".profile_more_info");
        if (!profileMoreInfo) {
          return;
        }
        let ProfileInfo = document.querySelector(".ProfileInfo");
        var profileLessLabel = document.querySelector(".profile_label_less");
        var profileMoreLabel = document.querySelector(".profile_label_more");
        profileMoreInfo.addEventListener("click", async function (event) {
          if (!event.target.closest(".vkEnhancerMoreItems")) {
            if (profileMoreLabel.style.display !== "none") {
              var moreItemsLoaded = document.createElement("div");
              moreItemsLoaded.classList.add("vkEnhancerMoreItems");

              if (
                (userData.home_town && userData.home_town != "") ||
                (userData.personal && userData.personal.langs_full) ||
                (userData.relatives && userData.relatives.length > 0)
              ) {
                var commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                var innerText = document.createElement("div");
                innerText.textContent = getLang("profile_private");
                innerText.classList.add("vkEnhancerSectionText");
                var inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);

                var hometown = userData.home_town;
                if (hometown) {
                  var hometownLink = document.createElement("a");
                  hometownLink.href = `/search/people?c[name]=0&c[hometown]=${hometown}`;
                  hometownLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                  hometownLink.textContent = hometown;
                  var hometownDiv = document.createElement("div");
                  hometownDiv.classList.add("label", "fl_l");
                  hometownDiv.textContent = getLang("Nat_town");
                  var hometownRow = document.createElement("div");
                  hometownRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  hometownRow.appendChild(hometownDiv);
                  hometownRow.appendChild(hometownLink);
                  moreItemsLoaded.appendChild(hometownRow);
                }

                try {
                  var langsFull = userData.personal.langs_full;
                } catch (error) {
                  var langsFull = "авыловаыловаылоаывллоавы";
                }
                try {
                  if (langsFull != "авыловаыловаылоаывллоавы") {
                    var langsText = langsFull
                      .map(
                        (lang) =>
                          `<a href="/search/people?c[name]=0&c[lang]=${lang.id}" class="vkuiLink Link-module__link--V7bkY ProfileModalInfoLink vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">${lang.native_name}</a>`
                      )
                      .join(", ");
                    var langsDiv = document.createElement("div");
                    langsDiv.classList.add("label");
                    langsDiv.classList.add("fl_l");
                    langsDiv.innerHTML = getLang("profile_langs");
                    var langsList = document.createElement("div");
                    langsList.classList.add("labeled");
                    langsList.innerHTML = langsText;
                    var clFix = document.createElement("div");
                    clFix.classList.add("clear_fix");
                    clFix.classList.add("profile_info_row");
                    clFix.appendChild(langsDiv);
                    clFix.appendChild(langsList);
                    moreItemsLoaded.appendChild(clFix);
                  }
                } catch (error) {}
                await addRelatives(userData, moreItemsLoaded);
              }

              if (
                (userData.home_phone && userData.home_phone != "") ||
                (userData.mobile_phone && userData.mobile_phone != "") ||
                (userData.skype && userData.skype != "")
              ) {
                var commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                var innerText = document.createElement("div");
                innerText.textContent = getLang("profile_contact");
                innerText.classList.add("vkEnhancerSectionText");
                var inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner1");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);

                var mobile_phone = userData.mobile_phone;
                if (mobile_phone) {
                  var mobile_phoneLink = document.createElement("div");
                  mobile_phoneLink.textContent = mobile_phone;
                  var mobile_phoneDiv = document.createElement("div");
                  mobile_phoneDiv.classList.add("label", "fl_l");
                  mobile_phoneDiv.textContent = getLang("Contact_mob_tel_abbr");
                  var mobile_phoneRow = document.createElement("div");
                  mobile_phoneRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  mobile_phoneRow.appendChild(mobile_phoneDiv);
                  mobile_phoneRow.appendChild(mobile_phoneLink);
                  moreItemsLoaded.appendChild(mobile_phoneRow);
                }

                var home_phone = userData.home_phone;
                if (home_phone) {
                  var home_phoneLink = document.createElement("div");
                  home_phoneLink.textContent = home_phone;
                  var home_phoneDiv = document.createElement("div");
                  home_phoneDiv.classList.add("label", "fl_l");
                  home_phoneDiv.textContent = getLang("Contact_home_tel_abbr");
                  var home_phoneRow = document.createElement("div");
                  home_phoneRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  home_phoneRow.appendChild(home_phoneDiv);
                  home_phoneRow.appendChild(home_phoneLink);
                  moreItemsLoaded.appendChild(home_phoneRow);
                }
                var skype = userData.skype;
                if (skype) {
                  var skypeLink = document.createElement("a");
                  skypeLink.href = `skype:` + skype + `?call`;
                  skypeLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                  skypeLink.textContent = skype;
                  var skypeDiv = document.createElement("div");
                  skypeDiv.classList.add("label", "fl_l");
                  skypeDiv.textContent = getLang("profile_skype");
                  var skypeRow = document.createElement("div");
                  skypeRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  skypeRow.appendChild(skypeDiv);
                  skypeRow.appendChild(skypeLink);
                  moreItemsLoaded.appendChild(skypeRow);
                }
              }

              var career = userData.career;

              if (career && career.length > 0) {
                var commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                var innerText = document.createElement("div");
                innerText.textContent = getLang("Work_place");
                innerText.classList.add("vkEnhancerSectionText");
                var inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner2");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);
                var jobPromises = career.map(async (job) => {
                  var careerDiv = document.createElement("div");
                  careerDiv.classList.add("label", "fl_l");
                  careerDiv.textContent = `${getLang("Work_place")}`;
                  var careerList = document.createElement("div");
                  careerList.classList.add("labeled");

                  var groupName;
                  try {
                    if (job.group_id) {
                      var groupData = await vkApi.api("groups.getById", {
                        group_ids: job.group_id,
                      });
                      groupName = groupData["groups"][0].name;
                    }
                  } catch (error) {
                    console.error("Error fetching group data:", error);
                    groupName = "Unknown";
                  }

                  var groupLink;
                  if (job.group_id) {
                    groupLink = document.createElement("a");
                    groupLink.href = `https://vk.com/club${job.group_id}`;
                    groupLink.setAttribute("mention_id", `club${job.group_id}`);
                    groupLink.setAttribute("onmouseover", "mentionOver(this)");
                    groupLink.textContent = groupName;
                    groupLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  } else if (job.company) {
                    groupLink = document.createElement("a");
                    groupLink.href = `https://vk.com/search/people?c[company]=${job.company}&c[name]=0`;
                    groupLink.textContent = job.company;
                    groupLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  }

                  var additionalS = document.createElement("div");
                  additionalS.classList.add("vkEnhancerAdditionalJob");
                  if (job.city_name) {
                    var city_nameLink = document.createElement("div");
                    city_nameLink.textContent = job.city_name;
                    additionalS.appendChild(city_nameLink);
                  } else if (job.city_id) {
                    var city_nameID = document.createElement("div");
                    let cids = await vkApi.api("database.getCitiesById", {
                      city_ids: job.city_id,
                    });
                    let cidThis = cids[0].title;
                    city_nameID.textContent = cidThis;
                    additionalS.appendChild(city_nameID);
                  }
                  if (job.city_id || job.city_name) {
                    if (job.from || job.until) {
                      let zapytaya = document.createElement("div");
                      zapytaya.textContent = ", ​";
                      additionalS.appendChild(zapytaya);
                    }
                  }
                  if (job.from && job.until) {
                    var PIZDA = document.createElement("div");
                    PIZDA.textContent = ` ${job.from}-${job.until}`;
                    additionalS.appendChild(PIZDA);
                  } else if (job.from) {
                    var fromLink = document.createElement("div");
                    fromLink.textContent = getLang(
                      "profile_places_year_from"
                    ).replace("%s", job.from);
                    additionalS.appendChild(fromLink);
                  } else if (job.until) {
                    var untilLink = document.createElement("div");
                    untilLink.textContent = getLang(
                      "profile_places_year_to"
                    ).replace("%s", job.until);
                    additionalS.appendChild(untilLink);
                  }
                  if (job.position) {
                    var positionLink = document.createElement("a");
                    positionLink.href = `/search/people?c[name]=0&c[position]=${job.position}`;
                    positionLink.style.position = `absolute`;
                    positionLink.style.marginTop = `16px`;
                    positionLink.innerHTML = job.position + " ";
                    positionLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                    additionalS.appendChild(positionLink);
                  }
                  var jobRow = document.createElement("div");
                  jobRow.classList.add("job_row");
                  jobRow.appendChild(careerDiv);
                  if (job.group_id) {
                    let groupAva = document.createElement("a");
                    groupAva.classList.add("fl_r");
                    groupAva.classList.add("profile_career_group");
                    groupAva.setAttribute("mention", "");
                    groupAva.setAttribute("mention_id", "club" + job.group_id);
                    groupAva.setAttribute(
                      "onmouseover",
                      "mentionOver(this, {shift: [31, 9, 4]});"
                    );
                    groupAva.href = "https://vk.com/club" + job.group_id;
                    let groupAvaImg = document.createElement("img");
                    groupAvaImg.classList.add("profile_career_img");
                    groupAvaImg.style.width = "50px";
                    groupAvaImg.style.height = "50px";
                    groupAvaImg.style.borderRadius = "100px";
                    let groupInfo = await vkApi.api("groups.getById", {
                      group_ids: job.group_id,
                    });
                    groupAvaImg.src = groupInfo.groups[0].photo_50;
                    groupAva.appendChild(groupAvaImg);
                    jobRow.appendChild(groupAva);
                  }
                  jobRow.appendChild(groupLink);
                  jobRow.appendChild(additionalS);

                  var careerRow = document.createElement("div");
                  careerRow.classList.add("clear_fix", "profile_info_row");
                  careerRow.appendChild(jobRow);

                  return careerRow;
                });
                Promise.all(jobPromises).then((jobRows) => {
                  jobRows.forEach((jobRow) => {
                    moreItemsLoaded.appendChild(jobRow);
                  });
                  if (
                    (userData.schools && userData.schools.length > 0) ||
                    (userData.universities && userData.universities.length > 0)
                  ) {
                    var commonDiv = document.createElement("div");
                    commonDiv.classList.add("vkEnhancerSectionProfile");
                    var innerText = document.createElement("div");
                    innerText.textContent = getLang("profile_educat");
                    innerText.classList.add("vkEnhancerSectionText");
                    var inner = document.createElement("div");
                    inner.classList.add("vkEnhancerSectionInner3");
                    commonDiv.appendChild(innerText);
                    commonDiv.appendChild(inner);
                    moreItemsLoaded.appendChild(commonDiv);
                  }
                  nextExpander(userData, moreItemsLoaded, inner);
                });
              } else {
                if (
                  (userData.schools && userData.schools.length > 0) ||
                  (userData.universities && userData.universities.length > 0)
                ) {
                  var commonDiv = document.createElement("div");
                  commonDiv.classList.add("vkEnhancerSectionProfile");
                  var innerText = document.createElement("div");
                  innerText.textContent = getLang("profile_educat");
                  innerText.classList.add("vkEnhancerSectionText");
                  var inner = document.createElement("div");
                  inner.classList.add("vkEnhancerSectionInner3");
                  commonDiv.appendChild(innerText);
                  commonDiv.appendChild(inner);
                  moreItemsLoaded.appendChild(commonDiv);
                }
                nextExpander(userData, moreItemsLoaded, inner);
              }

              profileMoreInfo.appendChild(moreItemsLoaded);

              profileLessLabel.style.display = "flex";
              profileMoreLabel.style.display = "none";
            } else {
              var profileMoreLink = profileMoreInfo.querySelector(
                ".profile_more_info_link"
              );
              profileMoreInfo.innerHTML = "";
              if (profileMoreLink) {
                profileMoreInfo.appendChild(profileMoreLink);
              }
              profileLessLabel.style.display = "none";
              profileMoreLabel.style.display = "flex";
            }
          }
          appearVariable();
        });
      }

      async function nextExpander(userData, moreItemsLoaded, educationInner) {
        var education = userData.universities;
        var educationDiv = document.createElement("div");
        if (education) {
          education.forEach((edu) => {
            var educationInfo = document.createElement("div");
            educationInfo.classList.add("education_info");
            var universityInfo = document.createElement("div");
            var facultyInfo = document.createElement("div");
            var chairInfo = document.createElement("div");
            var educationFormInfo = document.createElement("div");
            var statusInfo = document.createElement("div");
            if (edu.name) {
              var universityLink = document.createElement("a");
              universityLink.href = `/search/people?c[name]=0&c[uni_country]=${edu.country}&c[uni_city]=${edu.city}&c[university]=${edu.id}`;
              universityLink.textContent = edu.name;
              universityLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var graduationYearText = "";
              if (edu.graduation && edu.graduation != 0) {
                graduationYearText = `'${edu.graduation.toString().slice(-2)}`;
              }

              var graduationLink = document.createElement("a");
              graduationLink.href = `/search/people?c[name]=0&c[uni_country]=${edu.country}&c[uni_city]=${edu.city}&c[university]=${edu.id}&c[uni_year]=${edu.graduation}`;
              graduationLink.textContent = graduationYearText;
              graduationLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var universityDiv = document.createElement("div");
              universityDiv.classList.add("label", "fl_l");
              universityDiv.textContent = getLang("Univ");
              universityInfo.classList.add("education_row");
              universityInfo.appendChild(universityDiv);
              universityInfo.appendChild(universityLink);
              if (graduationYearText !== "") {
                universityInfo.appendChild(graduationLink);
              }
            }
            // Факультет
            if (edu.faculty_name) {
              var facultyLink = document.createElement("a");
              facultyLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=153&c[university]=${edu.university}&c[faculty]=${edu.faculty}`;
              facultyLink.textContent = edu.faculty_name;
              facultyLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var facultyDiv = document.createElement("div");
              facultyDiv.classList.add("label", "fl_l");
              facultyDiv.textContent = getLang("Faculty");
              facultyInfo.classList.add("education_row");
              facultyInfo.appendChild(facultyDiv);
              facultyInfo.appendChild(facultyLink);
            }
            // Специальность
            if (edu.chair_name) {
              var chairLink = document.createElement("a");
              chairLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=1&c[university]=2&c[faculty]=23&c[chair]=${edu.chair}`;
              chairLink.textContent = edu.chair_name;
              chairLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var chairDiv = document.createElement("div");
              chairDiv.classList.add("label", "fl_l");
              chairDiv.textContent = getLang("Chair");
              chairInfo.classList.add("education_row");
              chairInfo.appendChild(chairDiv);
              chairInfo.appendChild(chairLink);
            }

            // Форма обучения
            if (edu.education_form) {
              var educationFormLink = document.createElement("a");
              educationFormLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=153&c[university]=${edu.university}&c[edu_form]=${edu.education_form_id}`;
              educationFormLink.textContent = edu.education_form;
              educationFormLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var educationFormDiv = document.createElement("div");
              educationFormDiv.classList.add("label", "fl_l");
              educationFormDiv.textContent = getLang("Form");
              educationFormInfo.classList.add("education_row");
              educationFormInfo.appendChild(educationFormDiv);
              educationFormInfo.appendChild(educationFormLink);
            }
            // Статус
            if (edu.education_status) {
              var statusLink = document.createElement("a");
              statusLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=1&c[university]=2&c[edu_status]=${edu.education_status_id}`;
              statusLink.textContent = edu.education_status;
              statusLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              var statusDiv = document.createElement("div");
              statusDiv.classList.add("label", "fl_l");
              statusDiv.textContent = getLang("global_edustatus");
              statusInfo.classList.add("education_row");
              statusInfo.appendChild(statusDiv);
              statusInfo.appendChild(statusLink);
            }

            educationInfo.appendChild(universityInfo);
            educationInfo.appendChild(facultyInfo);
            educationInfo.appendChild(chairInfo);
            educationInfo.appendChild(educationFormInfo);
            educationInfo.appendChild(statusInfo);
            moreItemsLoaded.appendChild(educationInfo);
          });

          moreItemsLoaded.appendChild(educationDiv);
        }
        var schools = userData.schools;
        if (schools) {
          schools.forEach((school) => {
            var schoolInfo = document.createElement("div");
            schoolInfo.classList.add("school_info");

            // Школа
            if (school.name) {
              var schoolDiv = document.createElement("div");
              schoolDiv.classList.add("label", "fl_l");
              schoolDiv.textContent = getLang("admin2_school");
              schoolInfo.appendChild(schoolDiv);

              var schoolLink = document.createElement("a");
              schoolLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}`;
              schoolLink.textContent = school.name;
              schoolLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              schoolInfo.appendChild(schoolLink);
            }
            // Годы обучения и класс
            if (school.year_from && school.year_to) {
              var yearClassDiv = document.createElement("div");
              yearClassDiv.classList.add("yearClassDiv");
              if (school.city) {
                vkApi
                  .api("database.getCitiesById", { city_ids: school.city })
                  .then((cidSchool) => {
                    let schoolCity = document.createElement("div");
                    schoolCity.textContent = cidSchool[0].title + ", ​";
                    yearClassDiv.prepend(schoolCity);
                  })
                  .catch((error) => {
                    console.error("Error fetching city:", error);
                  });
              }
              var yearRangeDiv = document.createElement("div");
              yearRangeDiv.textContent = `${school.year_from}-${school.year_to} ​`;
              yearClassDiv.appendChild(yearRangeDiv);

              // Класс
              if (school.class) {
                var classLink = document.createElement("a");
                classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
                classLink.textContent = `(${school.class})`;
                classLink.classList.add(
                  "classLinkA",
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "ProfileModalInfoLink",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                yearClassDiv.appendChild(classLink);
              }

              schoolInfo.appendChild(yearClassDiv);
            } else if (school.year_from) {
              var yearFromDiv = document.createElement("div");
              yearFromDiv.classList.add("yearClassDiv");
              let yearFromString = getLang("profile_places_year_from");
              yearFromDiv.textContent = yearFromString.replace(
                "%s",
                `${school.year_from}`
              );
              if (school.city) {
                vkApi
                  .api("database.getCitiesById", { city_ids: school.city })
                  .then((cidSchool) => {
                    let schoolCity = document.createElement("div");
                    schoolCity.textContent = cidSchool[0].title + ", ​";
                    yearFromDiv.prepend(schoolCity);
                  })
                  .catch((error) => {
                    console.error("Error fetching city:", error);
                  });
              }
              schoolInfo.appendChild(yearFromDiv);

              // Класс
              if (school.class) {
                var classLink = document.createElement("a");
                classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
                classLink.textContent = `(${school.class})`;
                classLink.classList.add(
                  "classLinkA",
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "ProfileModalInfoLink",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                yearFromDiv.appendChild(classLink);
              }
            } else if (school.year_to) {
              var yearFromDiv = document.createElement("div");
              yearFromDiv.classList.add("yearClassDiv");
              let yearFromString = getLang("profile_places_year_to");
              yearFromDiv.textContent = yearFromString.replace(
                "%s",
                `${school.year_to}`
              );
              if (school.city) {
                vkApi
                  .api("database.getCitiesById", { city_ids: school.city })
                  .then((cidSchool) => {
                    let schoolCity = document.createElement("div");
                    schoolCity.textContent = cidSchool[0].title + ", ​";
                    yearFromDiv.prepend(schoolCity);
                  })
                  .catch((error) => {
                    console.error("Error fetching city:", error);
                  });
              }
              schoolInfo.appendChild(yearFromDiv);

              // Класс
              if (school.class) {
                var classLink = document.createElement("a");
                classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
                classLink.textContent = `(${school.class})`;
                classLink.classList.add(
                  "classLinkA",
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "ProfileModalInfoLink",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                yearFromDiv.appendChild(classLink);
              }
            }

            // Специальность
            if (school.speciality) {
              var specialityLink = document.createElement("a");
              specialityLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_spec]=${school.speciality}`;
              specialityLink.textContent = school.speciality;
              specialityLink.classList.add(
                "specialityLinkA",
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              schoolInfo.appendChild(specialityLink);
            }

            moreItemsLoaded.appendChild(schoolInfo);
          });
        }

        if (userData.military && userData.military.length > 0) {
          var commonDiv = document.createElement("div");
          commonDiv.classList.add("vkEnhancerSectionProfile");
          var innerText = document.createElement("div");
          innerText.textContent = getLang("profile_military");
          innerText.classList.add("vkEnhancerSectionText");
          var inner = document.createElement("div");
          inner.classList.add("vkEnhancerSectionInner6");
          commonDiv.appendChild(innerText);
          commonDiv.appendChild(inner);
          moreItemsLoaded.appendChild(commonDiv);
          var military = userData.military;
          if (military) {
            military.forEach((voin) => {
              var voinInfo = document.createElement("div");
              voinInfo.classList.add("voin_info");
			  voinInfo.style.display = "flex";
			  voinInfo.style.flexWrap = "wrap";
              // Воинская часть
              if (voin.unit) {
                var voinDiv = document.createElement("div");
                voinDiv.classList.add("label", "fl_l");
                voinDiv.textContent = getLang("Military_place");
                voinInfo.appendChild(voinDiv);

                var voinLink = document.createElement("a");
				voinLink.style.width = '335px';
                voinLink.href = `/search/people?c[name]=0&c[mil_country]=${voin.country_id}&c[mil_unit]=${voin.unit_id}`;
                voinLink.textContent = voin.unit;
                voinLink.classList.add(
                  "vkuiLink",
                  "Link-module__link--V7bkY",
                  "vkuiTappable",
                  "vkuiInternalTappable",
                  "vkuiTappable--hasActive",
                  "vkui-focus-visible"
                );
                voinInfo.appendChild(voinLink);
              }

              // Воинская часть годы службы
              if (voin.from && voin.until) {
                var voinClassDiv = document.createElement("div");
                voinClassDiv.classList.add("voinClassDiv");

                var voinRangeDiv = document.createElement("div");
                voinRangeDiv.textContent = `${voin.from}-${voin.until} `;
                voinClassDiv.appendChild(voinRangeDiv);

                voinInfo.appendChild(voinClassDiv);
              } else if (voin.from) {
                var voinFromDiv = document.createElement("div");
				voinFromDiv.classList.add("voinClassDiv");
				
                let voinFromString = getLang("profile_places_year_from");
                voinFromDiv.textContent = voinFromString.replace(
                  "%s",
                  `${voin.from}`
                );
                voinInfo.appendChild(voinFromDiv);
              } else if (voin.until) {
                var voinUntilDiv = document.createElement("div");
				voinUntilDiv.classList.add("voinClassDiv");
				
                let voinUntilString = getLang("profile_places_year_to");
                voinUntilDiv.textContent = voinUntilString.replace(
                  "%s",
                  `${voin.until}`
                );
                voinInfo.appendChild(voinUntilDiv);
              }
              moreItemsLoaded.appendChild(voinInfo);
            });
          }
        }

        if (
          userData.personal &&
          ((userData.personal.alcohol && userData.personal.alcohol != 0) ||
            (userData.personal.life_main && userData.personal.life_main != 0) ||
            (userData.personal.people_main &&
              userData.personal.people_main != 0) ||
            (userData.personal.smoking && userData.personal.smoking != 0) ||
            (userData.personal.inspired_by &&
              userData.personal.inspired_by != "") ||
            (userData.personal.religion && userData.personal.religion != "")) &&
          Object.keys(userData.personal).length > 0
        ) {
          var commonDiv = document.createElement("div");
          commonDiv.classList.add("vkEnhancerSectionProfile");
          var innerText = document.createElement("div");
          innerText.textContent = getLang("profile_beliefs");
          innerText.classList.add("vkEnhancerSectionText");
          var inner = document.createElement("div");
          inner.classList.add("vkEnhancerSectionInner5");
          commonDiv.appendChild(innerText);
          commonDiv.appendChild(inner);
          moreItemsLoaded.appendChild(commonDiv);

          var lifePos = document.createElement("div");
          lifePos.classList.add("life_info");

          // 1. Политические предпочтения
          var politicalLabels = [
            getLang("politics_comm"),
            getLang("politics_soc"),
            getLang("politics_moder"),
            getLang("politics_liber"),
            getLang("politics_cons"),
            getLang("politics_mon"),
            getLang("politics_ucons"),
            getLang("politics_indiff"),
            getLang("politics_libert"),
          ];
          var political = userData.personal.political;
          if (political) {
            var politicalDiv = document.createElement("div");
            politicalDiv.classList.add("politicalRow");

            var politicalLabel = document.createElement("div");
            politicalLabel.textContent = getLang("profile_politics");
            politicalLabel.classList.add("label", "fl_l");
            politicalDiv.appendChild(politicalLabel);

            var politicalLink = document.createElement("div");
            politicalLink.classList.add("vkEnhancerPoliticalInfo");
            politicalLink.textContent = politicalLabels[political - 1];

            politicalDiv.appendChild(politicalLink);
            lifePos.appendChild(politicalDiv);
          }

          // 2. Мировоззрение
          var religion = userData.personal.religion;
          if (religion) {
            var religionDiv = document.createElement("div");
            religionDiv.classList.add("religionRow");

            var religionLabel = document.createElement("div");
            religionLabel.textContent = getLang("profile_religion");
            religionLabel.classList.add("label", "fl_l");
            religionDiv.appendChild(religionLabel);

            var religionLink = document.createElement("a");
            religionLink.href = `/search/people?c[name]=0&c[religion]=${encodeURIComponent(
              religion
            )}`;
            religionLink.textContent = religion;
            religionLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            religionDiv.appendChild(religionLink);
            lifePos.appendChild(religionDiv);
          }

          // 3. Главное в жизни
          var lifeMainLabels = [
            getLang("Personal_priority1"),
            getLang("Personal_priority2"),
            getLang("Personal_priority3"),
            getLang("Personal_priority4"),
            getLang("Personal_priority5"),
            getLang("Personal_priority6"),
            getLang("Personal_priority7"),
            getLang("Personal_priority8"),
          ];
          var lifeMain = userData.personal.life_main;
          if (lifeMain) {
            var lifeMainDiv = document.createElement("div");
            lifeMainDiv.classList.add("lifeMainRow");

            var lifeMainLabel = document.createElement("div");
            lifeMainLabel.textContent = getLang("profile_personal_priority");
            lifeMainLabel.classList.add("label", "fl_l");
            lifeMainDiv.appendChild(lifeMainLabel);

            var lifeMainLink = document.createElement("a");
            lifeMainLink.href = `/search/people?c[name]=0&c[personal_priority]=${encodeURIComponent(
              lifeMain
            )}`;
            lifeMainLink.textContent = lifeMainLabels[lifeMain - 1];
            lifeMainLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            lifeMainDiv.appendChild(lifeMainLink);
            lifePos.appendChild(lifeMainDiv);
          }

          // 4. Главное в людях
          var peopleMainLabels = [
            getLang("Important_in_others1"),
            getLang("Important_in_others2"),
            getLang("Important_in_others3"),
            getLang("Important_in_others4"),
            getLang("Important_in_others5"),
            getLang("Important_in_others6"),
          ];
          var peopleMain = userData.personal.people_main;
          if (peopleMain) {
            var peopleMainDiv = document.createElement("div");
            peopleMainDiv.classList.add("peopleMainRow");

            var peopleMainLabel = document.createElement("div");
            peopleMainLabel.textContent = getLang(
              "profile_important_in_others"
            );
            peopleMainLabel.classList.add("label", "fl_l");
            peopleMainDiv.appendChild(peopleMainLabel);

            var peopleMainLink = document.createElement("a");
            peopleMainLink.href = `/search/people?c[name]=0&c[people_priority]=${encodeURIComponent(
              peopleMain
            )}`;
            peopleMainLink.textContent = peopleMainLabels[peopleMain - 1];
            peopleMainLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            peopleMainDiv.appendChild(peopleMainLink);
            lifePos.appendChild(peopleMainDiv);
          }

          // 5. Отношение к курению
          var smokingLabels = [
            getLang("Smoking_like1"),
            getLang("Smoking_like2"),
            getLang("Smoking_like3"),
            getLang("Smoking_like4"),
            getLang("Smoking_like5"),
          ];
          var smoking = userData.personal.smoking;
          if (smoking) {
            var smokingDiv = document.createElement("div");
            smokingDiv.classList.add("smokingRow");

            var smokingLabel = document.createElement("div");
            smokingLabel.textContent = getLang("profile_smoking_like");
            smokingLabel.classList.add("label", "fl_l");
            smokingDiv.appendChild(smokingLabel);

            var smokingLink = document.createElement("a");
            smokingLink.href = `/search/people?c[name]=0&c[smoking]=${encodeURIComponent(
              smoking
            )}`;
            smokingLink.textContent = smokingLabels[smoking - 1];
            smokingLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            smokingDiv.appendChild(smokingLink);
            lifePos.appendChild(smokingDiv);
          }

          // 6. Отношение к алкоголю
          var alcoholLabels = [
            getLang("Alcohol_like1"),
            getLang("Alcohol_like2"),
            getLang("Alcohol_like3"),
            getLang("Alcohol_like4"),
            getLang("Alcohol_like5"),
          ];
          var alcohol = userData.personal.alcohol;
          if (alcohol) {
            var alcoholDiv = document.createElement("div");
            alcoholDiv.classList.add("alcoholRow");

            var alcoholLabel = document.createElement("div");
            alcoholLabel.textContent = getLang("profile_alcohol_like");
            alcoholLabel.classList.add("label", "fl_l");
            alcoholDiv.appendChild(alcoholLabel);

            var alcoholLink = document.createElement("a");
            alcoholLink.href = `/search/people?c[name]=0&c[alcohol]=${encodeURIComponent(
              alcohol
            )}`;
            alcoholLink.textContent = alcoholLabels[alcohol - 1];
            alcoholLink.classList.add(
              "vkuiLink",
              "Link-module__link--V7bkY",
              "ProfileModalInfoLink",
              "vkuiTappable",
              "vkuiInternalTappable",
              "vkuiTappable--hasActive",
              "vkui-focus-visible"
            );

            alcoholDiv.appendChild(alcoholLink);
            lifePos.appendChild(alcoholDiv);
          }

          // 7. Источники вдохновения
          var inspiredBy = userData.personal.inspired_by;
          if (inspiredBy) {
            var inspiredByDiv = document.createElement("div");
            inspiredByDiv.classList.add("inspired_by_info");

            var inspiredByLabel = document.createElement("div");
            inspiredByLabel.textContent = getLang("profile_inspired_by");
            inspiredByLabel.classList.add("label", "fl_l");
            inspiredByDiv.appendChild(inspiredByLabel);

            var inspiredBySpan = document.createElement("span");

            var inspiredByLinks = inspiredBy.split(", ");
            inspiredByLinks.forEach((inspiration, index) => {
              var inspirationLink = document.createElement("a");
              inspirationLink.href = `/search/people?c[name]=0&c[q]=${encodeURIComponent(
                inspiration
              )}`;
              inspirationLink.textContent = inspiration;
              inspirationLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );
              inspiredBySpan.appendChild(inspirationLink);

              if (index !== inspiredByLinks.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                inspiredBySpan.appendChild(commaSpan);
              }
            });

            inspiredByDiv.appendChild(inspiredBySpan);
            lifePos.appendChild(inspiredByDiv);
          }

          moreItemsLoaded.appendChild(lifePos);
        }

        if (
          (userData.activities && userData.activities != "") ||
          (userData.interests && userData.interests != "") ||
          (userData.music && userData.music != "") ||
          (userData.movies && userData.movies != "") ||
          (userData.tv && userData.tv != "") ||
          (userData.books && userData.books != "") ||
          (userData.games && userData.games != "") ||
          (userData.quotes && userData.quotes != "") ||
          (userData.about && userData.about != "")
        ) {
          var commonDiv = document.createElement("div");
          commonDiv.classList.add("vkEnhancerSectionProfile");
          var innerText = document.createElement("div");
          innerText.textContent = getLang("profile_interests");
          innerText.classList.add("vkEnhancerSectionText");
          var inner = document.createElement("div");
          inner.classList.add("vkEnhancerSectionInner4");
          commonDiv.appendChild(innerText);
          commonDiv.appendChild(inner);
          moreItemsLoaded.appendChild(commonDiv);

          var activities = userData.activities;
          if (activities) {
            var interestsDiv = document.createElement("div");
            interestsDiv.classList.add("interests_info");

            var activitiesLabel = document.createElement("div");
            activitiesLabel.textContent = getLang("Activities");
            activitiesLabel.classList.add("label", "fl_l");
            interestsDiv.appendChild(activitiesLabel);

            var activitiesSpan = document.createElement("span");

            var interests = activities.split(", ");
            interests.forEach((interest, index) => {
              var interestLink = document.createElement("a");
              interestLink.href = `/search/people?c[name]=0&c[hometown]=${encodeURIComponent(
                interest
              )}`;
              interestLink.textContent = interest;
              interestLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              activitiesSpan.appendChild(interestLink);

              if (index !== interests.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                activitiesSpan.appendChild(commaSpan);
              }
            });

            interestsDiv.appendChild(activitiesSpan);
            moreItemsLoaded.appendChild(interestsDiv);
          }

          var interests = userData.interests;
          if (interests && interests.length > 0) {
            var interestsDiv = document.createElement("div");
            interestsDiv.classList.add("interests_info");

            var interestsLabel = document.createElement("div");
            interestsLabel.textContent = getLang("profile_interests");
            interestsLabel.classList.add("label", "fl_l");
            interestsDiv.appendChild(interestsLabel);

            var interestsSpan = document.createElement("span");

            var interestList = interests.split(", ");
            interestList.forEach((interest, index) => {
              var interestLink = document.createElement("a");
              interestLink.href = `/search/people?c[name]=0&c[q]=${encodeURIComponent(
                interest
              )}`;
              interestLink.textContent = interest;
              interestLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              interestsSpan.appendChild(interestLink);

              if (index !== interestList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                interestsSpan.appendChild(commaSpan);
              }
            });

            interestsDiv.appendChild(interestsSpan);
            moreItemsLoaded.appendChild(interestsDiv);
          }

          var music = userData.music;
          if (music) {
            var musicDiv = document.createElement("div");
            musicDiv.classList.add("music_info");

            var musicLabel = document.createElement("div");
            musicLabel.textContent = getLang("Fave_music");
            musicLabel.classList.add("label", "fl_l");
            musicDiv.appendChild(musicLabel);

            var musicSpan = document.createElement("span");

            var musicList = music.split(", ");
            musicList.forEach((genre, index) => {
              var genreLink = document.createElement("a");
              genreLink.href = `/search/audio?c[name]=0&c[q]=${encodeURIComponent(
                genre
              )}`;
              genreLink.textContent = genre;
              genreLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              musicSpan.appendChild(genreLink);

              if (index !== musicList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                musicSpan.appendChild(commaSpan);
              }
            });

            musicDiv.appendChild(musicSpan);
            moreItemsLoaded.appendChild(musicDiv);
          }

          var movies = userData.movies;
          if (movies) {
            var moviesDiv = document.createElement("div");
            moviesDiv.classList.add("movies_info");

            var moviesLabel = document.createElement("div");
            moviesLabel.textContent = getLang("Fave_movies");
            moviesLabel.classList.add("label", "fl_l");
            moviesDiv.appendChild(moviesLabel);

            var moviesSpan = document.createElement("span");

            var movieList = movies.split(", ");
            movieList.forEach((movie, index) => {
              var movieLink = document.createElement("a");
              movieLink.href = `https://vk.com/search/video?c[name]=0&c[q]=${encodeURIComponent(
                movie
              )}`;
              movieLink.textContent = movie;
              movieLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              moviesSpan.appendChild(movieLink);

              if (index !== movieList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                moviesSpan.appendChild(commaSpan);
              }
            });

            moviesDiv.appendChild(moviesSpan);
            moreItemsLoaded.appendChild(moviesDiv);
          }

          var tv = userData.tv;
          if (tv) {
            var moviesDiv = document.createElement("div");
            moviesDiv.classList.add("movies_info");

            var moviesLabel = document.createElement("div");
            moviesLabel.textContent = getLang("Fave_tvshows");
            moviesLabel.classList.add("label", "fl_l");
            moviesDiv.appendChild(moviesLabel);

            var moviesSpan = document.createElement("span");

            var movieList = tv.split(", ");
            movieList.forEach((movie, index) => {
              var movieLink = document.createElement("a");
              movieLink.href = `https://vk.com/search/video?c[name]=0&c[q]=${encodeURIComponent(
                movie
              )}`;
              movieLink.textContent = movie;
              movieLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              moviesSpan.appendChild(movieLink);

              if (index !== movieList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                moviesSpan.appendChild(commaSpan);
              }
            });

            moviesDiv.appendChild(moviesSpan);
            moreItemsLoaded.appendChild(moviesDiv);
          }

          var books = userData.books;
          if (books) {
            var booksDiv = document.createElement("div");
            booksDiv.classList.add("books_info");

            var booksLabel = document.createElement("div");
            booksLabel.textContent = getLang("Fave_books");
            booksLabel.classList.add("label", "fl_l");
            booksDiv.appendChild(booksLabel);

            var booksSpan = document.createElement("span");

            var bookList = books.split(", ");
            bookList.forEach((book, index) => {
              var bookLink = document.createElement("a");
              bookLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(
                book
              )}`;
              bookLink.textContent = book;
              bookLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              booksSpan.appendChild(bookLink);

              if (index !== bookList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                booksSpan.appendChild(commaSpan);
              }
            });

            booksDiv.appendChild(booksSpan);
            moreItemsLoaded.appendChild(booksDiv);
          }

          var games = userData.games;
          if (games) {
            var gamesDiv = document.createElement("div");
            gamesDiv.classList.add("games_info");

            var gamesLabel = document.createElement("div");
            gamesLabel.textContent = getLang("Fave_games");
            gamesLabel.classList.add("label", "fl_l");
            gamesDiv.appendChild(gamesLabel);

            var gamesSpan = document.createElement("span");

            var gameList = games.split(", ");
            gameList.forEach((game, index) => {
              var gameLink = document.createElement("a");
              gameLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(
                game
              )}`;
              gameLink.textContent = game;
              gameLink.classList.add(
                "vkuiLink",
                "Link-module__link--V7bkY",
                "ProfileModalInfoLink",
                "vkuiTappable",
                "vkuiInternalTappable",
                "vkuiTappable--hasActive",
                "vkui-focus-visible"
              );

              gamesSpan.appendChild(gameLink);

              if (index !== gameList.length - 1) {
                var commaSpan = document.createElement("span");
                commaSpan.textContent = ", ​";
                gamesSpan.appendChild(commaSpan);
              }
            });

            gamesDiv.appendChild(gamesSpan);
            moreItemsLoaded.appendChild(gamesDiv);
          }

          var quotes = userData.quotes;
          if (quotes) {
            var quotesDiv = document.createElement("div");
            quotesDiv.classList.add("quotes_info");

            var quotesLabel = document.createElement("div");
            quotesLabel.textContent = getLang("Fave_quotes");
            quotesLabel.classList.add("label", "fl_l");
            quotesDiv.appendChild(quotesLabel);

            var quotesText = quotes.replace(/\n/g, "<br>");
            var quotesSpan = document.createElement("span");
            quotesSpan.innerHTML = quotesText;

            quotesDiv.appendChild(quotesSpan);
            moreItemsLoaded.appendChild(quotesDiv);
          }

          var about = userData.about;
          if (about) {
            var aboutDiv = document.createElement("div");
            aboutDiv.classList.add("about_info");

            var aboutLabel = document.createElement("div");
            aboutLabel.textContent = getLang("Aboutme");
            aboutLabel.classList.add("label", "fl_l");
            aboutDiv.appendChild(aboutLabel);

            var aboutText = about.replace(/\n/g, "<br>");
            var aboutSpan = document.createElement("span");

            var regex = /(?:https?:\/\/|www\.)\S+/g;
            var match;
            var lastIndex = 0;
            while ((match = regex.exec(aboutText)) !== null) {
              var link = match[0];
              var linkText =
                link.length > 20 ? link.substring(0, 20) + "..." : link;
              if (!link.startsWith("http://") && !link.startsWith("https://")) {
                link = "https://" + link;
              }
              var beforeText = aboutText.substring(lastIndex, match.index);
              lastIndex = match.index + link.length;
              aboutSpan.innerHTML += beforeText;
              aboutSpan.innerHTML += `<a href="${link}">${linkText}</a>`;
            }
            aboutSpan.innerHTML += aboutText.substring(lastIndex);

            aboutDiv.appendChild(aboutSpan);
            moreItemsLoaded.appendChild(aboutDiv);
          }
        }
      }

      function sortObject(obj, order) {
        let sorted = {};
        order.forEach((key) => {
          if (obj.hasOwnProperty(key)) {
            sorted[key] = obj[key];
            delete obj[key];
          }
        });
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            sorted[key] = obj[key];
          }
        }
        return sorted;
      }

      function formatCounterValue(value) {
        if (value >= 1000000000) {
          return (value / 1000000000).toFixed(1) + "B";
        } else if (value >= 1000000) {
          return (value / 1000000).toFixed(1) + "M";
        } else if (value >= 10000) {
          return (value / 1000).toFixed(1) + "K";
        } else {
          return value.toString();
        }
      }

      function formatValueInt(value) {
        if (value >= 1000000000) {
          return Math.floor(value / 1000000000) * 1000000000;
        } else if (value >= 1000000) {
          return Math.floor(value / 1000000) * 1000000;
        } else if (value >= 10000) {
          return Math.floor(value / 1000) * 1000;
        } else {
          return value;
        }
      }

      function addCounters(userData, countersData) {
        var countsModule = document.createElement("div");
        countsModule.classList.add("counts_module");
        let order = [
          "mutual_friends",
          "friends",
          "followers",
          "photos",
          "user_photos",
          "videos",
          "audios",
          "posts",
        ];
        if (countersData) {
          countersData = sortObject(countersData, order);
        } else {
          return;
        }
        for (var counterType in countersData) {
          var value = countersData[counterType];
          if (value !== 0) {
            var formValue = formatCounterValue(value);
            var counterDiv = document.createElement("a");
            counterDiv.classList.add("counter");
            value = formatValueInt(value);
            var valueDiv = document.createElement("div");
            valueDiv.classList.add("value");
            valueDiv.textContent = formValue;
            counterDiv.appendChild(valueDiv);

            var labelDiv = document.createElement("div");
            labelDiv.classList.add("label");

            labelDiv.textContent = getCounterLabel(counterType, value);
            if (labelDiv.textContent != "") {
              counterDiv.appendChild(labelDiv);
              countsModule.appendChild(counterDiv);
            }
            let labelHref;
            let labelOnclick;
            let labelClass;
            switch (counterType) {
              case "photos":
                labelClass = "vkenhancerCounterPhoto";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/albums${userData.id}?profile=1`;
                  labelOnclick = `return showAlbums(${userData.id}, {noHistory: true}, event);`;
                }
                break;
              case "audios":
                labelClass = "vkenhancerCounterAudios";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/audios${userData.id}`;
                  labelOnclick = `return page.showPageAudios(event, ${userData.id});`;
                }
                break;
              case "followers":
                labelClass = "vkenhancerCounterFollowers";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/friends?id=${userData.id}&section=subscribers`;
                  labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'followers');`;
                }
                break;
              case "friends":
                labelClass = "vkenhancerCounterFriends";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/friends?id=${userData.id}&section=friends`;
                  labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'friends');`;
                }
                break;
              case "user_photos":
                labelClass = "vkenhancerCounterUserPhotos";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/tag${userData.id}`;
                  labelOnclick = `return showPhotoTags(${userData.id}, {noHistory: true}, event);`;
                }
                break;
              case "mutual_friends":
                labelClass = "vkenhancerCounterMutual";
                labelHref = `https://vk.com/friends?id=${userData.id}&section=common`;
                labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'common');`;
                break;
              case "videos":
                labelClass = "vkenhancerCounterVideos";
                if (userData.can_access_closed) {
                  labelHref = `https://vk.com/videos${userData.id}`;
                  labelOnclick = `return page.showPageVideos(event, ${userData.id});`;
                }
                break;
              case "posts":
                labelClass = "vkenhancerCounterPages";
                counterDiv.classList.add(labelClass);
                break;
            }
            if (labelHref && counterDiv) {
              counterDiv.href = labelHref;
              counterDiv.classList.add(labelClass);
              counterDiv.setAttribute("onclick", labelOnclick);
            }
            if (counterType == "posts" && userData.can_access_closed) {
              try {
                countsModule.querySelector(".vkenhancerCounterPages").remove();
              } catch (error) {}
            }
          }
        }

        var pageCounter = document.createElement("a");
        pageCounter.classList.add("page_counter");
        pageCounter.appendChild(countsModule);

        if (countsModule.children.length > 0) {
          var countsContainer = document.querySelector(".ProfileInfo");
          countsContainer.appendChild(pageCounter);
        }
      }

      function getLangBottom(e, t, n) {
        const o = window.langConfig;
        if (!t || !o) {
          if (!(0, r.isNumeric)(e)) {
            const t = new Error("Non-numeric value passed to langNumeric");
            throw (console.log(e, t), t);
          }
          return String(e);
        }
        let i;
        Array.isArray(t)
          ? ((i = t[1]),
            e != Math.floor(e)
              ? (i = t[o.numRules.float])
              : (o.numRules.int || []).some((n) => {
                  if ("*" === n[0]) return (i = t[n[2]]), !0;
                  const r = n[0] ? e % n[0] : e;
                  return Array.isArray(n[1]) && n[1].includes(r)
                    ? ((i = t[n[2]]), !0)
                    : void 0;
                }))
          : (i = t);
        let a = String(e);
        if (n) {
          const e = a.split("."),
            t = [];
          for (let n = e[0].length - 3; n > -3; n -= 3)
            t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
          (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
        }
        return (i = (i || "%s").replace("%s", "")), i;
      }

      function getLang1(key, type) {
        let arr = getLang(key, type);
        if (type === "raw") {
          arr = arr.map((item) => item.replace("{count} ", ""));
        }
        return arr;
      }

      function removeStringsVideo(arr) {
        return arr.map((item) => item.replace(/^.+?%s /, ""));
      }

      function getCounterLabel(counterType, value) {
        switch (counterType) {
          case "photos": {
            return getLangBottom(
              value,
              getLang("profile_user_content_albums_photos_count", "raw")
            );
          }
          case "audios": {
            return getLangBottom(
              value,
              getLang1("audio_playlist_audios_count", "raw")
            );
          }
          case "followers": {
            return getLangBottom(value, getLang("profile_count_fans", "raw"));
          }
          case "friends": {
            return getLangBottom(
              value,
              getLang("profile_count_friends_new", "raw")
            );
          }
          case "user_photos": {
            return getLangBottom(
              value,
              getPhotoTagText(vk.lang)
            );
          }
          case "mutual_friends": {
            return getLangBottom(
              value,
              getLang("profile_mutual_label_short", "raw")
            );
          }
          case "videos": {
            return getLangBottom(value, getLang("profile_videos", "raw").toLowerCase());
            //return getLangBottom(value,removeStringsVideo(getLang("video_found_videos_global", "raw")))
          }
          case "posts": {
            return getLangBottom(value, getPostLangKey(vk.lang));
          }
        }
      }
	  
function getPhotoTagText(lang) {
  switch (lang) {
    case 0:
      return ["","отметка","отметки","отметок"];
      break;
    case 1:
      return ["","позначка","відмітки","відміток"];
      break;
    case 454:
      return ["","позначка","відмітки","відміток"];
      break;
    case 114:
      return ["","адзнака","адзнакі","адзнак"];
      break;
    case 2:
      return ["","адзнака","адзнакі","адзнак"];
      break;
    case 777:
      return ["","отметка","отметки","отметок"];
      break;
    case 97:
      return ["","белгі","белгілер","белгілер"];
      break;
    case 100:
      return ["","отметка","отметки","отметок"];
      break;
    default:
      return ["","mark","marks","marks"];
      break;
  }
}

      function getPostLangKey(lang) {
        switch (lang) {
          case 0:
            addLangKeys({
              vkenhancer_wall_counts: ["", "запись", "записи", "записей"],
            });
            break;
          case 3:
            addLangKeys({
              vkenhancer_wall_counts: ["", "post", "posts", "posts"],
            });
            break;
          case 777:
            addLangKeys({
              vkenhancer_wall_counts: ["", "тема", "темы", "тем"],
            });
            break;
          case 57:
            addLangKeys({
              vkenhancer_wall_counts: ["", "yazı", "yazı", "yazı"],
            });
            break;
          case 69:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "pucuk pesan",
                "pucuk pesan",
                "pucuk pesan",
              ],
            });
            break;
          case 72:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s post", "%s posta", "%s postova"],
            });
            break;
          case 64:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s opslag",
                "%s opslag",
                "%s opslag",
              ],
            });
            break;
          case 6:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s Eintrag",
                "%s Einträge",
                "%s Einträge",
              ],
            });
            break;
          case 22:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s sissekanne",
                "%s sissekannet",
                "%s sissekannet",
              ],
            });
            break;
          case 4:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s entrada",
                "%s entradas",
                "%s entradas",
              ],
            });
            break;
          case 555:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s afiŝo",
                "%s afiŝoj",
                "%s afiŝoj",
              ],
            });
            break;
          case 183:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "argitalpen bat",
                "%s argitalpen",
                "%s argitalpen",
              ],
            });
            break;
          case 16:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s statut",
                "%s statuts",
                "%s statuts",
              ],
            });
            break;
          case 7:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s messaggio",
                "%s messaggi",
                "%s messaggi",
              ],
            });
            break;
          case 9:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s zapis",
                "%s zapisa",
                "%s zapisa",
              ],
            });
            break;
          case 95:
            addLangKeys({
              vkenhancer_wall_counts: ["", "Posti %s", "Posti %s", "Posti %s"],
            });
            break;
          case 56:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s pieraksts",
                "%s pieraksti",
                "%s pieraksti",
              ],
            });
            break;
          case 19:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s įrašas",
                "%s įrašų",
                "%s įrašai",
              ],
            });
            break;
          case 10:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s bejegyzés",
                "%s bejegyzés",
                "%s bejegyzés",
              ],
            });
            break;
          case 66:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s postare",
                "%s postări",
                "%s postări",
              ],
            });
            break;
          case 61:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s bericht",
                "%s berichten",
                "%s berichten",
              ],
            });
            break;
          case 55:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s innlegg", "%s innlegg"],
            });
            break;
          case 65:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s yozuv", "%s yozuv", "%s yozuv"],
            });
            break;
          case 15:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s post", "%s posty", "%s postów"],
            });
            break;
          case 12:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s entrada",
                "%s entradas",
                "%s entradas",
              ],
            });
            break;
          case 73:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s recado",
                "%s recados",
                "%s recados",
              ],
            });
            break;
          case 54:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s postare",
                "%s postări",
                "%s de postări",
              ],
            });
            break;
          case 71:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s komentar",
                "%s komentarja",
                "%s komentarji",
                "%s komentarjev",
              ],
            });
            break;
          case 5:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s viesti",
                "%s viestiä",
                "%s viestiä",
              ],
            });
            break;
          case 60:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s post", "%s poster", "%s poster"],
            });
            break;
          case 79:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s paskil",
                "%s mga paskil",
                "%s mga paskil",
              ],
            });
            break;
          case 75:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s đăng tải",
                "%s đăng tải",
                "%s đăng tải",
              ],
            });
            break;
          case 373:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s гылә нывыштәj",
                "%s гылә нывыштәj",
                "%s гылә нывыштәj",
              ],
            });
            break;
          case 62:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s ýazgy", "%s ýazgy", "%s ýazgy"],
            });
            break;
          case 82:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s yazı", "%s yazı", "%s yazı"],
            });
            break;
          case 21:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s zpráva",
                "%s zprávy",
                "%s zpráv",
                "",
              ],
            });
            break;
          case 14:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s καταχώριση",
                "%s καταχωρίσεις",
                "%s καταχωρίσεις",
              ],
            });
            break;
          case 379:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s kirjutuš",
                "%s kirjutušta",
                "%s kirjutušta",
              ],
            });
            break;
          case 53:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s zápis", "%s zápisy", ""],
            });
            break;
          case 102:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "зы тхыгъэ",
                "тхыгъэ %s",
                "тхыгъэ %s",
              ],
            });
            break;
          case 103:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s нҵамҭак",
                "%s нҵамҭак",
                "%s нҵамҭақәа",
              ],
            });
            break;
          case 51:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s яҙма", "%s яҙма", "%s яҙма"],
            });
            break;
          case 114:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запіс",
                "%s запісы",
                "%s запісаў",
              ],
            });
            break;
          case 2:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запіс",
                "%s запісы",
                "%s запісаў",
              ],
            });
            break;
          case 8:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s публикация",
                "%s публикации",
                "%s публикации",
              ],
            });
            break;
          case 100:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s высказыванiе",
                "%s высказыванiя",
                "%s высказыванiй",
              ],
            });
            break;
          case 91:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s фыст", "%s фысты", "%s фысты"],
            });
            break;
          case 375:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s гижöд", "%s гижöд", "%s гижöд"],
            });
            break;
          case 87:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s жазуу", "%s жазуу", "%s жазуу"],
            });
            break;
          case 118:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s кхьин", "%s кхьин", "%s кхьин"],
            });
            break;
          case 108:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s возымаш",
                "%s возымаш",
                "%s возымаш",
              ],
            });
            break;
          case 80:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s бичлэг",
                "%s бичлэг",
                "%s бичлэг",
              ],
            });
            break;
          case 298:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s запис", "%s записӱв"],
            });
            break;
          case 50:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s язма", "%s язма", "%s язма"],
            });
            break;
          case 105:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s суруйуу",
                "%s суруйуу",
                "%s суруйуу",
              ],
            });
            break;
          case 70:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s сабт", "%s сабтҳо", "%s сабтҳо"],
            });
            break;
          case 11:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запис",
                "%s записа",
                "%s записа",
              ],
            });
            break;
          case 52:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s çырни", "%s çырни", "%s çырни"],
            });
            break;
          case 230:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s пазылых",
                "%s пазылых",
                "%s пазылых",
              ],
            });
            break;
          case 357:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s бичлг", "%s бичлг", "%s бичлг"],
            });
            break;
          case 107:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s гожтэм",
                "%s гожтэм",
                "%s гожтэм",
              ],
            });
            break;
          case 1:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запис",
                "%s записи",
                "%s записів",
              ],
            });
            break;
          case 454:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s запись",
                "%s записей",
                "%s записей",
              ],
            });
            break;
          case 97:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s жазба", "%s жазба", "%s жазба"],
            });
            break;
          case 83:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s पोस्ट",
                "%s पोस्टहरु",
                "%s पोस्टहरु",
              ],
            });
            break;
          case 76:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s घोषणा ",
                "%s घोषणाएँ",
                "%s घोषणाएँ",
              ],
            });
            break;
          case 78:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s টি পোস্ট",
                "%s টি পোস্ট",
                "%s টি পোস্ট",
              ],
            });
            break;
          case 94:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s ಅಂಚೆ",
                "%s ಅಂಚೆಗಳು",
                "%s ಅಂಚೆಗಳು",
              ],
            });
            break;
          case 77:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                " පෝස්ට් %s",
                "පෝස්ට්ස් %s ",
                "පෝස්ට්ස් %s ",
              ],
            });
            break;
          case 68:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "โพสต์ %s โพสต์",
                "โพสต์ %s โพสต์",
                "โพสต์ %s โพสต์",
              ],
            });
            break;
          case 63:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s ჩანაწერი",
                "%s ჩანაწერი",
                "%s ჩანაწერი",
              ],
            });
            break;
          case 81:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "မှတ်တမ်း %s ခု",
                "မှတ်တမ်း %s ခု",
                "မှတ်တမ်း %s ခု",
              ],
            });
            break;
          case 20:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s件の投稿",
                "%s件の投稿",
                "%s件の投稿",
              ],
            });
            break;
          case 13:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s条动态", "%s条动态", "%s条动态"],
            });
            break;
          case 119:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s 公告", "%s 公告 ", "%s 公告 "],
            });
            break;
          case 17:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s개의 글",
                "%s개의 글",
                "%s개의 글",
              ],
            });
            break;
          case 58:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s գրառում",
                "%s գրառում",
                "%s գրառում",
              ],
            });
            break;
          case 99:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "רשימה %s",
                "%s רשימות",
                "%s רשימות",
              ],
            });
            break;
          case 85:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s پوسٹ", "%s پوسٹس", "%s پوسٹس"],
            });
            break;
          case 98:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s كتابة ",
                "%s كتابات",
                "%s كتابات",
              ],
            });
            break;
          case 74:
            addLangKeys({
              vkenhancer_wall_counts: [
                "",
                "%s نوشته",
                "%s نوشته ",
                "%s نوشته ",
              ],
            });
            break;
          case 90:
            addLangKeys({
              vkenhancer_wall_counts: ["", "%s پوسٹ", "%s پوسٹس", "%s پوسٹس"],
            });
            break;
        }
        return getLang("vkenhancer_wall_counts", "raw");
      }

      function declOfNum(number, words) {
        return words[
          number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
        ];
      }

      async function addRelatives(userData, moreItemsLoaded) {
        var relatives = userData.relatives;
        if (relatives) {
          var relativesByType = {};

          relatives.forEach((relative) => {
            if (relative.type) {
              if (!relativesByType[relative.type]) {
                relativesByType[relative.type] = [];
              }
              relativesByType[relative.type].push(relative);
            }
          });

          // Добавление родственников по типам
          Object.keys(relativesByType).forEach(async (type) => {
            var relativesOfType = relativesByType[type];
            var relativesDiv = document.createElement("div");
            relativesDiv.classList.add("label", "fl_l");
            relativesDiv.textContent = `${getTypeName(type)} `;
            var relativesList = document.createElement("div");
            relativesList.classList.add("labeled");
            var isFirst = true;
            relativesOfType.forEach(async (relative) => {
              var relativeLink;
              if (relative.name) {
                var id = relative.id.toString();
                if (id.startsWith("-")) {
                  id = id.substring(1);
                  relativeLink = document.createTextNode(relative.name);
                } else {
                  relativeLink = document.createElement("a");
                  relativeLink.href = `/id${id}`;
                  relativeLink.textContent = relative.name;
                  relativeLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                }
              } else if (relative.id) {
                var relativeData = await getUserDataWithoutOnline(relative.id);
                if (relativeData) {
                  var name = `${relativeData.first_name} ${relativeData.last_name}`;
                  var id = relative.id.toString();
                  if (id.startsWith("-")) {
                    id = id.substring(1);
                    relativeLink = document.createTextNode(name);
                  } else {
                    relativeLink = document.createElement("a");
                    relativeLink.href = `/id${id}`;
                    relativeLink.textContent = name;
                    relativeLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                    relativeLink.setAttribute("mention_id", `id${id}`);
                    relativeLink.setAttribute(
                      "onmouseover",
                      "mentionOver(this)"
                    );
                  }
                }
              }
              if (relativeLink) {
                if (!isFirst) {
                  relativesList.appendChild(document.createTextNode(", "));
                } else {
                  isFirst = false;
                }
                relativesList.appendChild(relativeLink);
              }
            });
            var relativesRow = document.createElement("div");
            relativesRow.classList.add("clear_fix", "profile_info_row");
            relativesRow.appendChild(relativesDiv);
            relativesRow.appendChild(relativesList);
            moreItemsLoaded.appendChild(relativesRow);
          });
        }
      }

      function getTypeName(type) {
        switch (type) {
          case "child":
            return getLang("profile_children_label");
          case "sibling":
            return getLang("profile_siblings_label");
          case "parent":
            return getLang("profile_parents_label");
          case "grandparent":
            return getLang("profile_grandparents_label");
          case "grandchild":
            return getLang("profile_grandchildren_label");
          default:
            return "";
        }
      }

      function buttonrun() {
        var count = 0;
        var interval = setInterval(function () {
          if (count >= 1) {
            clearInterval(interval);
            return;
          }
          let pizda = _o(document.getElementById("react_rootprofile"))
            ?.container?.memoizedState?.element?.props;
          function _o(e) {
            const t = {};
            if (!e) return t;
            for (const n of Object.keys(e))
              n.startsWith("__reactFiber") && (t.fiber = e[n]),
                n.startsWith("__reactProps") && (t.props = e[n]),
                n.startsWith("__reactContainer") && (t.container = e[n]);
            return t;
          }
          var objectId = pizda.store.getState().owner.id;

          var newElement = document.createElement("div");
          newElement.className = "ProfileGifts__all";
          newElement.innerHTML = `
                        <a onclick="window.Profile.showGiftBox(${objectId},${
            vk.id
          },'profile_module')" class="Button-module__root--enpNU vkuiButton vkuiButton--size-s vkuiButton--mode-secondary vkuiButton--appearance-accent vkuiButton--align-center vkuiButton--stretched vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible">
                            <span class="vkuiButton__in">
								<svg><g fill="none" fill-rule="evenodd"><path d="M0 0h20v20H0z"></path><path fill="currentColor" fill-rule="nonzero" d="M14.846 2.314c1.026 1.026 1.23 2.875-.257 4.186h.911a3 3 0 0 1 3 3v.49c0 .827-.093 1.16-.267 1.487-.174.326-.43.582-.756.756a1.9 1.9 0 0 1-.477.182v1.618c0 1.56-.162 2.126-.467 2.696a3.2 3.2 0 0 1-1.324 1.324l-.202.101c-.48.224-1.037.349-2.229.364l-5.291.002c-1.56 0-2.126-.162-2.696-.467a3.2 3.2 0 0 1-1.324-1.324l-.101-.202c-.224-.48-.349-1.037-.364-2.229L3 12.415a1.9 1.9 0 0 1-.477-.182 1.8 1.8 0 0 1-.756-.756c-.16-.299-.251-.605-.265-1.29L1.5 9.5a3 3 0 0 1 3-3h.911c-1.487-1.31-1.283-3.16-.257-4.186C6.369 1.099 8.738 1.038 10 3.569c1.262-2.531 3.631-2.47 4.846-1.255M9.25 12.499 4.5 12.5l.001 1.762.009.399c.021.604.083.924.202 1.2l.078.161q.246.462.708.708l.162.078c.33.143.724.203 1.598.211l1.991-.001zm6.251.001-4.751-.001v4.519l1.993.001.399-.009c.604-.021.924-.083 1.2-.202l.161-.078a1.7 1.7 0 0 0 .708-.708c.186-.348.267-.688.286-1.551l.004-.438zM9.159 7.999 4.5 8A1.5 1.5 0 0 0 3 9.5v.638l.007.232c.012.227.037.315.083.4a.32.32 0 0 0 .14.14c.11.059.223.085.632.09l5.387-.001.002-3L9.16 8zM15.5 8l-4.661-.001h-.09v3h5.39c.408-.004.521-.03.63-.089a.32.32 0 0 0 .141-.14c.065-.122.09-.248.09-.78V9.5A1.5 1.5 0 0 0 15.5 8M9.223 6.159c-.43-3.101-1.96-3.834-3.009-2.785C5.165 4.424 5.898 5.952 9 6.384l.257.032Zm1.554 0-.024.191.007.062.241-.029c3.101-.43 3.834-1.96 2.785-3.009-1.05-1.049-2.578-.316-3.01 2.785"></path></g></svg>
                                <span class="vkuiButton__content">${getLang(
                                  "profile_send_gift"
                                )}</span>
                            </span>
                        </a>
                    `;
          var headerButtons = document.querySelector(
            ".ProfileHeader__wrapper .ProfileHeaderActions__buttons"
          );
          var theFirstChild = headerButtons.firstChild;
          headerButtons.insertBefore(newElement, theFirstChild);
          count++;
        }, 1);
      }
      function FuckName(relation, sex, user) {
        switch (relation) {
          case 2:
          case 3:
          case 5:
          case 8: {
            return `${user.first_name_ins} ${user.last_name_ins}`;
          }
          case 4: {
            return sex === 2
              ? `${user.first_name_dat} ${user.last_name_dat}`
              : `${user.first_name_ins} ${user.last_name_ins}`;
          }
          case 7: {
            return `${user.first_name_acc} ${user.last_name_acc}`;
          }
        }
      }

      function getMoreInfoLang(lang) {
        switch (lang) {
          case 0:
            return [
              "Показать подробную информацию",
              "Скрыть подробную информацию",
            ];
            break;
          case 1:
            return [
              "Показати детальну інформацію",
              "Приховати детальну інформацію",
            ];
            break;
          case 454:
            return [
              "Показати детальну інформацію",
              "Приховати детальну інформацію",
            ];
            break;
          case 114:
            return [
              "Паказаць падрабязную інфармацыю",
              "Схаваць падрабязную інфармацыю",
            ];
            break;
          case 2:
            return [
              "Паказаць падрабязную інфармацыю",
              "Схаваць падрабязную інфармацыю",
            ];
            break;
          case 777:
            return ["Раскрыть детальное досье", "Убрать детальное досье"];
            break;
          case 97:
            return ["Толық ақпаратты көрсету", "Толық ақпаратты жасыру"];
            break;
          case 100:
            return [
              "Показать подробную информацiю",
              "Скрыть подробную информацiю",
            ];
            break;
          default:
            return ["Show detailed information", "Hide detailed information"];
            break;
        }
      }

      function getRegDateLabel(lang) {
        switch (lang) {
          case 0:
            return "Дата регистрации:";
            break;
          case 1:
            return "Дата реєстрації:";
            break;
          case 454:
            return "Дата реєстрації:";
            break;
          case 114:
            return "Дата рэгістрацыі:";
            break;
          case 2:
            return "Дата рэгістрацыі:";
            break;
          case 777:
            return "Дата заведения досье:";
            break;
          case 97:
            return "Тіркеу күні:";
            break;
          case 100:
            return "Дата рѣгистрацiи:";
            break;
          default:
            return "Registration date:";
            break;
        }
      }

      function getZodiacSigns(lang) {
        switch (lang) {
          case 0:
            return [
              "Овен",
              "Телец",
              "Близнецы",
              "Рак",
              "Лев",
              "Дева",
              "Весы",
              "Скорпион",
              "Стрелец",
              "Козерог",
              "Водолей",
              "Рыбы",
            ];
          case 1:
          case 454:
            return [
              "Овен",
              "Телец",
              "Близнюки",
              "Рак",
              "Лев",
              "Діва",
              "Терези",
              "Скорпіон",
              "Стрілець",
              "Козеріг",
              "Водолій",
              "Риби",
            ];
          case 2:
          case 114:
            return [
              "Баран",
              "Тэлец",
              "Блізнюкі",
              "Рак",
              "Лев",
              "Дзева",
              "Вагі",
              "Шкапец",
              "Стралец",
              "Козераг",
              "Вадалей",
              "Рыбы",
            ];
          case 777:
          case 100:
            return [
              "Овен",
              "Телец",
              "Близнецы",
              "Рак",
              "Лев",
              "Дева",
              "Весы",
              "Скорпион",
              "Стрелец",
              "Козерог",
              "Водолей",
              "Рыбы",
            ];
          case 97:
            return [
              "Овен",
              "Телец",
              "Близнесін",
              "Рак",
              "Лев",
              "Дева",
              "Терезе",
              "Ақшақар",
              "Оят",
              "Козерге",
              "Суғайыр",
              "Балық",
            ];
          default:
            return [
              "Aries",
              "Taurus",
              "Gemini",
              "Cancer",
              "Leo",
              "Virgo",
              "Libra",
              "Scorpio",
              "Sagittarius",
              "Capricorn",
              "Aquarius",
              "Pisces",
            ];
        }
      }

      async function getRegDateValue(id) {
        const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
        if (regDateAlready) return formatRegDate(regDateAlready);

        const foafGet = await fetch(`https://vk.com/foaf.php?id=${id}`);
        const response = await foafGet.text();
        const [, regDateReady] =
          response.match(/ya:created dc:date="(.+?)"/) || [];
        if (regDateReady) {
          const regDateReadyUNIX = new Date(regDateReady).getTime();
          localStorage.setItem(`regDate_${id}`, regDateReadyUNIX);
          return formatRegDate(regDateReadyUNIX);
        }
      }

      function formatRegDate(unixTimestamp) {
        const date = new Date(unixTimestamp);
        const formattedDate = [
          `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
          `(${padZero(date.getHours())}:${padZero(date.getMinutes())})`,
        ];
        return formattedDate;
      }

      function padZero(num) {
        return num < 10 ? `0${num}` : num;
      }

      function getZodiacIndex(den, month) {
        var value = "";
        den = Number(den);
        month = Number(month);
        switch (month) {
          case 1:
            if (den <= 19) value = getZodiacSigns(vk.lang)[9];
            else value = getZodiacSigns(vk.lang)[10];
            break;
          case 2:
            if (den <= 18) value = getZodiacSigns(vk.lang)[10];
            else value = getZodiacSigns(vk.lang)[11];
            break;
          case 3:
            if (den <= 20) value = getZodiacSigns(vk.lang)[11];
            else value = getZodiacSigns(vk.lang)[0];
            break;
          case 4:
            if (den <= 19) value = getZodiacSigns(vk.lang)[0];
            else value = getZodiacSigns(vk.lang)[1];
            break;
          case 5:
            if (den <= 20) value = getZodiacSigns(vk.lang)[1];
            else value = getZodiacSigns(vk.lang)[2];
            break;
          case 6:
            if (den <= 21) value = getZodiacSigns(vk.lang)[2];
            else value = getZodiacSigns(vk.lang)[3];
            break;
          case 7:
            if (den <= 22) value = getZodiacSigns(vk.lang)[3];
            else value = getZodiacSigns(vk.lang)[4];
            break;
          case 8:
            if (den <= 22) value = getZodiacSigns(vk.lang)[4];
            else value = getZodiacSigns(vk.lang)[5];
            break;
          case 9:
            if (den <= 22) value = getZodiacSigns(vk.lang)[5];
            else value = getZodiacSigns(vk.lang)[6];
            break;
          case 10:
            if (den <= 22) value = getZodiacSigns(vk.lang)[6];
            else value = getZodiacSigns(vk.lang)[7];
            break;
          case 11:
            if (den <= 22) value = getZodiacSigns(vk.lang)[7];
            else value = getZodiacSigns(vk.lang)[8];
            break;
          case 12:
            if (den <= 21) value = getZodiacSigns(vk.lang)[8];
            else value = getZodiacSigns(vk.lang)[9];
            break;
          default:
            value = "Zodiac parsing failed";
        }
        return value;
      }

      function getLangYearsOld(e, t, n) {
        const o = window.langConfig;
        if (!t || !o) {
          if (!(0, r.isNumeric)(e)) {
            const t = new Error("Non-numeric value passed to langNumeric");
            throw (console.log(e, t), t);
          }
          return String(e);
        }
        let i;
        Array.isArray(t)
          ? ((i = t[1]),
            e != Math.floor(e)
              ? (i = t[o.numRules.float])
              : (o.numRules.int || []).some((n) => {
                  if ("*" === n[0]) return (i = t[n[2]]), !0;
                  const r = n[0] ? e % n[0] : e;
                  return Array.isArray(n[1]) && n[1].includes(r)
                    ? ((i = t[n[2]]), !0)
                    : void 0;
                }))
          : (i = t);
        let a = String(e);
        if (n) {
          const e = a.split("."),
            t = [];
          for (let n = e[0].length - 3; n > -3; n -= 3)
            t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
          (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
        }
        return (i = (i || "%s").replace("%s", a)), i;
      }

      async function appearStarts(userData) {
        var pageCurrentInfo = document.querySelector(".ProfileInfo");

        var profileShort = document.createElement("div");
        profileShort.classList.add("profile_info", "profile_info_short");
        profileShort.id = "profile_short";

        var birthday = userData.bdate;
        if (birthday) {
          var formattedBirthday = formatBirthday(birthday);
          var ageAndZodiac = "";

          var parts = birthday.split(".");
          if (parts.length === 3) {
            let bDayFull = userData.bdate;
            let ptsOfAfe = bDayFull.split(".");
            let birthYear1 = parseInt(ptsOfAfe[2], 10);
            let birthMonth1 = parseInt(ptsOfAfe[1], 10);
            let birthDay1 = parseInt(ptsOfAfe[0], 10);
            let todayDate1 = new Date();
            let currentYear1 = todayDate1.getFullYear();
            let currentMonth1 = todayDate1.getMonth() + 1;
            let currentDay1 = todayDate1.getDate();
            let age = currentYear1 - birthYear1;
            if (
              currentMonth1 < birthMonth1 ||
              (currentMonth1 === birthMonth1 && currentDay1 < birthDay1)
            ) {
              age--;
            }
            ageAndZodiac = `${getLangYearsOld(
              age,
              getLang("global_years_accusative", "raw")
            )}, ${getZodiacIndex(parts[0], parts[1])}`;
          } else if (parts.length === 2) {
            ageAndZodiac = `${getZodiacIndex(parts[0], parts[1])}`;
          }

          var birthdayRow = createProfileInfoRow(
            getLang("profile_info_birth_date"),
            `${formattedBirthday} (${ageAndZodiac})`
          );
          if (birthdayRow) {
            profileShort.appendChild(birthdayRow);
          }
        }

        try {
          var regDateText = getRegDateLabel(vk.lang);
          let regDateValue1 = await getRegDateValue(userData.id);
          var regDateDate = formatRegister(regDateValue1[0]);
          regDateDate += " " + regDateValue1[1];
          var registrationRow = createProfileInfoRow(regDateText, regDateDate);
          if (registrationRow) {
            profileShort.appendChild(registrationRow);
          }
        } catch (error) {
          console.error(
            "[VKENH Error]: There is no registration date for user " +
              userData.id
          );
        }

        var relationText = await getRelationText(userData.relation);
        var relationRow = createProfileInfoRow(
          getLang("profile_family"),
          relationText
        );
        if (relationRow) {
          profileShort.appendChild(relationRow);
        }

        var cityRow = createProfileInfoRow(
          getLang("Town"),
          userData.city
            ? `<a href="https://vk.com/search?c[name]=0&c[section]=people&c[country]=1&c[city]=${userData.city.id}">${userData.city.title}</a>`
            : null
        );
        if (cityRow) {
          profileShort.appendChild(cityRow);
        }

        var occupation = userData.occupation;
        var companyRow;
        if (occupation && occupation.type === "work") {
          var company = occupation.name;
          var comid = occupation.id;
          var companyLink = comid
            ? `https://vk.com/club${comid}`
            : `https://vk.com/search/people?c[company]=${company}&c[name]=0`;
          let additionalsV = "";
          if (comid) {
            additionalsV = `mention_id="club${comid}" onmouseover="mentionOver(this)"`;
          }
          companyRow = createProfileInfoRow(
            `${getLang("Work_place")}:`,
            `<a href="${companyLink}" ${additionalsV}>${company}</a>`
          );
        }
        if (occupation && occupation.type === "university") {
          var company = occupation.name;
          var comid = occupation.id;
          var graduate = "";
          var companyLink = `/search/people?c[name]=10&c[uni_country]=${occupation.country_id}&c[uni_city]=${occupation.city_id}&c[university]=${comid}`;
          if (occupation.graduate_year) {
            graduate = `<a href="/search/people?c[name]=20&c[uni_country]=${
              occupation.country_id
            }&c[uni_city]=${
              occupation.city_id
            }&c[university]=${comid}&c[uni_year]=${
              occupation.graduate_year
            }">'${occupation.graduate_year.toString().slice(-2)}</a>`;
          }
          companyRow = createProfileInfoRow(
            `${getLang("profile_education")}`,
            `<a href="${companyLink}">${company}</a>${graduate}`
          );
        }
        if (companyRow) {
          profileShort.appendChild(companyRow);
        }

        var site = userData.site;
        var siteRow = null;
        if (site) {
          var siteText = site;
          if (site.startsWith("[")) {
            const match = site.match(/\[id(\d+)\|([^|\]]+)\]/);
            if (match) {
              const id = match[1];
              const name = match[2];
              site = "https://vk.com/id" + id;
              siteText = name;
            }
          }
          if (!site.startsWith("http://") && !site.startsWith("https://")) {
            site = "https://" + site;
          }
          siteRow = createProfileInfoRow(
            getLang("Contact_site"),
            `<a href="${site}" target="_blank">${siteText}</a>`
          );
        }
        if (siteRow) {
          profileShort.appendChild(siteRow);
        }

        var profileMoreInfo = document.createElement("div");
        profileMoreInfo.classList.add("profile_more_info");
        var profileMoreInfoLink = document.createElement("a");
        profileMoreInfoLink.classList.add("profile_more_info_link");
        var profileLabelMore = document.createElement("span");
        profileLabelMore.classList.add("profile_label_more");
        profileLabelMore.style.display = "flex";
        profileLabelMore.textContent = getMoreInfoLang(vk.lang)[0];
        var profileLabelLess = document.createElement("span");
        profileLabelLess.classList.add("profile_label_less");
        profileLabelLess.textContent = getMoreInfoLang(vk.lang)[1];
        profileMoreInfoLink.appendChild(profileLabelMore);
        profileMoreInfoLink.appendChild(profileLabelLess);
        profileMoreInfo.appendChild(profileMoreInfoLink);
        if (
          (userData.home_town && userData.home_town !== "") ||
          (userData.personal && userData.personal.langs_full) ||
          (userData.relatives && userData.relatives.length > 0) ||
          (userData.home_phone && userData.home_phone !== "") ||
          (userData.mobile_phone && userData.mobile_phone !== "") ||
          (userData.skype && userData.skype !== "") ||
          (userData.career && userData.career.length > 0) ||
          (userData.universities && userData.universities.length > 0) ||
          (userData.schools && userData.schools.length > 0) ||
          (userData.military && userData.military.length > 0) ||
          (userData.personal &&
            ((userData.personal.alcohol && userData.personal.alcohol !== 0) ||
              (userData.personal.life_main &&
                userData.personal.life_main !== 0) ||
              (userData.personal.people_main &&
                userData.personal.people_main !== 0) ||
              (userData.personal.smoking && userData.personal.smoking !== 0) ||
              (userData.personal.inspired_by &&
                userData.personal.inspired_by !== "") ||
              (userData.personal.religion &&
                userData.personal.religion !== "")) &&
            Object.keys(userData.personal).length > 0) ||
          (userData.activities && userData.activities !== "") ||
          (userData.interests && userData.interests !== "") ||
          (userData.music && userData.music !== "") ||
          (userData.movies && userData.movies !== "") ||
          (userData.tv && userData.tv !== "") ||
          (userData.books && userData.books !== "") ||
          (userData.games && userData.games !== "") ||
          (userData.quotes && userData.quotes !== "") ||
          (userData.about && userData.about !== "")
        ) {
          profileShort.appendChild(profileMoreInfo);
        }
        pageCurrentInfo.appendChild(profileShort);
        function createProfileInfoRow(label, content) {
          if (!content) return null;
          var clearFix = document.createElement("div");
          clearFix.classList.add("clear_fix", "profile_info_row");
          var labelDiv = document.createElement("div");
          labelDiv.classList.add("label", "fl_l");
          labelDiv.textContent = label;
          var labeledDiv = document.createElement("div");
          labeledDiv.classList.add("labeled");
          labeledDiv.innerHTML = content;
          clearFix.appendChild(labelDiv);
          clearFix.appendChild(labeledDiv);
          return clearFix;
        }

        function formatBirthday(bdate) {
          if (!bdate) return null;
          var parts = bdate.split(".");
          var day = parts[0];
          var month = getMonthName(parts[1]);
          var year = parts[2];
          var formattedDate = `${day} ${month}`;
          var profileBDayYearLetter = getLang("profile_birthday_year_date");
          let regex = /{year}(.*?){\/link_year}/;
          let match = profileBDayYearLetter.match(regex);
          let formattedYearLetter = match ? match[1].replace(/\s/g, "") : "";
          var yearLink = year
            ? `<a href="https://vk.com/search/people?birth_year=${year}">${year} ${formattedYearLetter}</a>`
            : "";
          if (year) {
            formattedDate += ` ${yearLink}`;
          }
          return `<a href="https://vk.com/search/people?birth_day=${day}&birth_month=${parts[1]}">${formattedDate}</a>`;
        }

        function formatRegister(bdate) {
          if (!bdate) return null;
          var parts = bdate.split(".");
          var day = parts[0];
          var month = getMonthName(parts[1]);
          var year = parts[2];
          var formattedDate = `${day} ${month}`;
          var profileBDayYearLetter = getLang("profile_birthday_year_date");
          let regex = /{year}(.*?){\/link_year}/;
          let match = profileBDayYearLetter.match(regex);
          let formattedYearLetter = match ? match[1].replace(/\s/g, "") : "";
          var yearLink = year;
          if (year) {
            formattedDate += ` ${yearLink}`;
          }
          return `${formattedDate}`;
        }

        function langReplacePrep(e, t) {
          if (!t) return e;
          const n = window.langConfig.prep;
          if (n.length) {
            const r = n
              .map((t) => {
                const [n, r, o] = t,
                  [i, a] = n.split(","),
                  [s, l] = o.split(","),
                  c = new RegExp(i).test(e),
                  u = new RegExp(a).test(e);
                return c ? [i, r, s] : !!u && [a, r, l];
              })
              .filter((e) => !!e);
            if (2 === r.length) {
              const [n, o] = r,
                [i, a, s] = o;
              if (
                !a.split(",").find((e) => {
                  const n = e.replace("*", "");
                  return n && new RegExp(`^${n}`).test(t);
                })
              ) {
                const [r, o, i] = n;
                if (
                  o.split(",").find((e) => {
                    const n = e.replace("*", "");
                    return n && new RegExp(`^${n}`).test(t);
                  })
                )
                  return e.replace(r, i);
              }
              return e.replace(i, s);
            }
          }
          return e;
        }
        async function getRelationText(relation) {
          if (!relation) return "";
          var relationText = "";
          var relationPartner = userData.relation_partner;
          var sex = userData.sex;
          if (relationPartner) {
            var partnerData = relationPartner.id
              ? await getUserDataWithoutOnline(relationPartner.id)
              : null;
            var formatted_name = FuckName(relation, sex, partnerData);
          }
          switch (relation) {
            case 1:
              relationText =
                sex === 2
                  ? getLang("profile_m_not_married")
                  : getLang("profile_fm_not_married");
              break;
            case 2:
              relationText =
                sex === 2
                  ? getLang("profile_m_has_friend")
                  : getLang("profile_fm_has_friend");
              if (relationPartner) {
                relationText = langReplacePrep(
                  getLang("profile_meet_with_partner"),
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`
                );
              }
              break;
            case 3:
              relationText =
                sex === 2
                  ? getLang("profile_m_engaged")
                  : getLang("profile_fm_engaged");
              if (relationPartner) {
                relationText =
                  sex === 2
                    ? getLang("profile_engaged_with_partner", "raw")[1]
                    : getLang("profile_engaged_with_partner", "raw")[2];
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id} mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)"">${formatted_name}</a>`
                );
              }
              break;
            case 4:
              relationText =
                sex === 2
                  ? getLang("profile_m_married")
                  : getLang("profile_fm_married");
              if (relationPartner) {
                relationText =
                  sex === 2
                    ? getLang("profile_married_with_partner", "raw")[1]
                    : getLang("profile_married_with_partner", "raw")[2];
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`
                );
              }
              break;
            case 5:
              relationText = getLang("profile_complicated");
              if (relationPartner) {
                relationText = getLang("profile_complic_with_partner", "raw");
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`
                );
              }
              break;
            case 6:
              relationText = getLang("profile_in_search");
              break;
            case 7:
              relationText =
                sex === 2
                  ? getLang("profile_m_in_love")
                  : getLang("profile_f_in_love");
              if (relationPartner) {
                relationText =
                  sex === 2
                    ? getLang("profile_love_with_partner", "raw")[1]
                    : getLang("profile_love_with_partner", "raw")[2];
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`
                );
              }
              break;
            case 8:
              relationText = getLang("profile_civil_married");
              if (relationPartner) {
                relationText = getLang("profile_civil_married_with", "raw");
                relationText = langReplacePrep(
                  relationText,
                  formatted_name
                ).replace(
                  "%s",
                  `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`
                );
              }
              break;
            default:
              return "";
          }
          return relationText;
        }

        function getMonthName(month) {
          var monthNames = [
            getLang("month1_of"),
            getLang("month2_of"),
            getLang("month3_of"),
            getLang("month4_of"),
            getLang("month5_of"),
            getLang("month6_of"),
            getLang("month7_of"),
            getLang("month8_of"),
            getLang("month9_of"),
            getLang("month10_of"),
            getLang("month11_of"),
            getLang("month12_of"),
          ];
          return monthNames[parseInt(month) - 1];
        }
      }

      function getTimeString(onlineInfo) {
        let currentTime = Math.floor(Date.now() / 1000); 
        let secondsAgo = currentTime - onlineInfo.last_seen;
        let justNow = getLang("global_just_now");
        let secsAgo = getLang("global_secs_ago", "raw");
        let minsAgo = getLang("global_mins_ago", "raw");
        let hoursAgo = getLang("global_hours_ago", "raw");
        let hours12345 = getLang("global_word_hours_ago", "raw");
        let minutes12345 = getLang(
          "mobile_profile_status_word_mins_ago",
          "raw"
        );
        let longAgo = getLang("global_short_date_time", "raw");

        if (secondsAgo == 0) {
          return justNow;
        } else if (secondsAgo < 60) {
          let secString = getLangTime(secondsAgo, secsAgo);
          return secString;
        } else if (secondsAgo < 3600) {
          let minutesAgo = Math.floor(secondsAgo / 60);
          let minString;
          if (minutesAgo < 6) {
            minString = minutes12345[minutesAgo];
          } else {
            minString = getLangTime(minutesAgo, minsAgo);
          }
          return minString;
        } else if (secondsAgo < 14400) {
          let hourssAgo = Math.floor(secondsAgo / 3600);
          let hourString;
          hourString = hours12345[hourssAgo];
          return hourString;
        } else {
          let lastSeenDate = new Date(onlineInfo.last_seen * 1000);
          let day = lastSeenDate.getDate();
          let month = getMonthNameOnline(lastSeenDate.getMonth() + 1);
          let hour = lastSeenDate.getHours();
          let minute = lastSeenDate.getMinutes().toString().padStart(2, "0");

          let dateString;
          if (secondsAgo < 86400) {
            dateString = longAgo[3]
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else if (secondsAgo < 172800) {
            dateString = longAgo[2]
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else {
            dateString = longAgo[1]
              .replace("{day}", day)
              .replace("{month}", month)
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          }

          if (dateString.includes("{am_pm}")) {
            let am_pm = hour >= 12 ? "PM" : "AM";
            let newHour = hour % 12 || 12; 
            dateString = dateString
              .replace(hour, newHour)
              .replace("{am_pm}", am_pm);
          }

          return dateString;
        }
      }

      function getLangTime(e, t, n) {
        const o = window.langConfig;
        if (!t || !o) {
          if (!(0, r.isNumeric)(e)) {
            const t = new Error("Non-numeric value passed to langNumeric");
            throw (console.log(e, t), t);
          }
          return String(e);
        }
        let i;
        Array.isArray(t)
          ? ((i = t[1]),
            e != Math.floor(e)
              ? (i = t[o.numRules.float])
              : (o.numRules.int || []).some((n) => {
                  if ("*" === n[0]) return (i = t[n[2]]), !0;
                  const r = n[0] ? e % n[0] : e;
                  return Array.isArray(n[1]) && n[1].includes(r)
                    ? ((i = t[n[2]]), !0)
                    : void 0;
                }))
          : (i = t);
        let a = String(e);
        if (n) {
          const e = a.split("."),
            t = [];
          for (let n = e[0].length - 3; n > -3; n -= 3)
            t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
          (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
        }
        return (i = (i || "%s").replace("%s", a)), i;
      }

      function getMonthNameOnline(month) {
        var monthNames = [
          getLang("month1_of"),
          getLang("month2_of"),
          getLang("month3_of"),
          getLang("month4_of"),
          getLang("month5_of"),
          getLang("month6_of"),
          getLang("month7_of"),
          getLang("month8_of"),
          getLang("month9_of"),
          getLang("month10_of"),
          getLang("month11_of"),
          getLang("month12_of"),
        ];
        return monthNames[parseInt(month) - 1];
      }
      async function getUserData(objectId) {
        try {
          let pizda = _o(document.getElementById("react_rootprofile"))
            ?.container?.memoizedState?.element?.props;
          function _o(e) {
            const t = {};
            if (!e) return t;
            for (const n of Object.keys(e))
              n.startsWith("__reactFiber") && (t.fiber = e[n]),
                n.startsWith("__reactProps") && (t.props = e[n]),
                n.startsWith("__reactContainer") && (t.container = e[n]);
            return t;
          }
          var response = pizda.store.getState().owner;
          console.info("[VKENH] Profile fetched");
          console.log(response);
          if (!response.hidden) {
            let wasInSetb = getLang("profile_last_seen", "raw");
            let newLangArray = wasInSetb.map((item) => item.replace(/%s/, ""));
            let index = response.sex === 1 ? 2 : 1;
            let zahodil = newLangArray[index];
            if (zahodil == "") {
              zahodil = newLangArray[response.sex];
            }
            let onlineInfo = getTimeString(response.online_info);
            let zahodilString = zahodil + " " + onlineInfo;
            try {
              let onlineBadgeByl = document.querySelector(
                ".ProfileIndicatorBadge__badgeLastSeen"
              );
              onlineBadgeByl.textContent = zahodilString;

              if (response.online_info.is_mobile) {
                let mobileDiv = document.createElement("div");
                mobileDiv.className = "vkEnhancerMobileWas";
                onlineBadgeByl.appendChild(mobileDiv);
              }
            } catch (error) {}
            try {
              let onlineBadgeComp = document.querySelector(
                ".ProfileIndicatorBadge__badgeOnline"
              );
              onlineBadgeComp.textContent = "Online";
            } catch (error) {}
            try {
              let onlineBadgeMob = document.querySelector(
                ".ProfileIndicatorBadge__badgeOnlineMobile"
              );
              onlineBadgeMob.textContent = "Onlineᅠ​";
            } catch (error) {}
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status == "recently"
            ) {
              try {
                let lastSeenRecently = getLang(
                  "global_online_was_recently",
                  "raw"
                );
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status == "last_week"
            ) {
              try {
                let lastSeenRecently = getLang("global_online_was_week", "raw");
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status == "last_month"
            ) {
              try {
                let lastSeenRecently = getLang(
                  "global_online_this_month",
                  "raw"
                );
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status == "long_ago"
            ) {
              try {
                let lastSeenRecently = getLang("global_online_long_ago", "raw");
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
      }

      async function getUserDataWithoutOnline(objectId) {
        try {
          var response = await vkApi.api("users.get", {
            user_ids: objectId,
            fields:
              "quotes, games, movies, music, photo_400_orig, universities, activities, about, books, bdate, can_see_audio, can_write_private_message, career, city, connections, contacts, counters, country, crop_photo, education, has_photo, home_town, interests, military, nickname, occupation, online, personal, quotes, relatives, relation, schools, sex, site, tv, id,first_name,first_name_gen,first_name_acc,last_name,last_name_gen,last_name_acc,sex,has_photo,photo_id,photo_50,photo_100,photo_200,contact_name,occupation,bdate,city,screen_name,online_info,verified,blacklisted,blacklisted_by_me,can_call,can_write_private_message,can_send_friend_request,can_invite_to_chats,friend_status,followers_count,profile_type,contacts,employee_mark,employee_working_state,is_service_account,image_status,name,type,members_count,member_status,is_closed,can_message,deactivated,activity,ban_info,is_messages_blocked,can_post_donut,site,reposts_disabled,description,action_button,menu,role,first_name_nom,first_name_gen,first_name_dat,first_name_acc,first_name_ins,last_name_gen,last_name_dat,last_name_acc,last_name_ins,nickname,maiden_name,screen_name,first_name,last_name",
          });
          return response[0];
        } catch (error) {
          console.error(error);
          return [];
        }
      }

      async function getId() {
        const url = window.location.href;
        var parts = url.split("/");
        var username = parts[parts.length - 1];
        if (username.includes("?")) {
          username = username.split("?")[0];
        }
        const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
        try {
          const response = await fetch(url1);
          const data = await response.json();
          return data.response.object_id;
        } catch (error) {
          console.error(error);
          return 1;
        }
      }

      function appendProfilePhoto(photoUrl) {
        var img = document.createElement("img");
        img.src = photoUrl;
        var profileAva = document.querySelector(
          ".ProfileWrapper__root .ProfileHeader__ava"
        );
        profileAva.appendChild(img);
      }

      function getIdAntiAsync() {
        const url = window.location.href;
        var parts = url.split("/");
        var username = parts[parts.length - 1];
        if (username.includes("?")) {
          username = username.split("?")[0];
        }
        const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
        return fetch(url1)
          .then((response) => response.json())
          .then((data) => data.response.object_id)
          .catch((error) => {
            console.error(error);
            return 1;
          });
      }

      async function changeBroadcastState() {
        let expVa = await ajax.promisifiedPost(
          "al_audio.php?act=status_tt",
          {}
        );
        let expVal = expVa[1].is_profile_active;
        let j = ap.getCurrentAudio();
        let o;
        try {
          o = `${j[1]}_${j[0]}`;
        } catch (error) {
          return;
        }
        await ajax.promisifiedPost("al_audio.php?act=toggle_status", {
          exp: +!expVal,
          oid: window.vk.id,
          hash: window.vk.statusExportHash,
          id: o,
          top: 0,
          access_key: "",
        });
        let statusVK = document.querySelector(".page_current_info");
        statusVK.remove();
      }

      function getPhotoEditHash() {
        let script = Array.from(document.querySelectorAll("script")).find((e) =>
          e.innerHTML.includes("window.initReactApplication")
        );
        let scriptContent = script.innerHTML;
        let startIndex = scriptContent.indexOf('"hashes":{');
        if (startIndex === -1) return undefined;
        let endIndex = scriptContent.indexOf("}", startIndex) + 1;
        let hashesString = scriptContent.substring(startIndex, endIndex);
        let braceIndex = hashesString.indexOf("{");
        hashesString = hashesString.substring(braceIndex);
        let hashesObject = JSON.parse(hashesString);
        let avatarEditHash = hashesObject.avatarEdit;
        return avatarEditHash;
      }
	  
	 function getPhotoMapText(lang) {
  switch (lang) {
    case 0:
      return "показать на карте";
      break;
    case 1:
      return "показати на карті";
      break;
    case 454:
      return "показати на карті";
      break;
    case 114:
      return "паказаць на карце";
      break;
    case 2:
      return "паказаць на карце";
      break;
    case 777:
      return "показать на атласе";
      break;
    case 97:
      return "картада көрсету";
      break;
    case 100:
      return "показать на атласѣ";
      break;
    default:
      return "show on map";
      break;
  }
}

function getMyPhotoText(lang) {
  switch (lang) {
    case 0:
      return "Мои фотографии";
      break;
    case 1:
      return "Мої фотографії";
      break;
    case 454:
      return "Мої фотографії";
      break;
    case 114:
      return "Мае фатаграфіі";
      break;
    case 2:
      return "Мае фатаграфіі";
      break;
    case 777:
      return "Мои фотокарточки";
      break;
    case 97:
      return "Менің фотоларым";
      break;
    case 100:
      return "Мои фотокарточки";
      break;
    default:
      return "My photos";
      break;
  }
}

function getStoryText(lang) {
  switch (lang) {
    case 0:
      return ["","история","истории","историй"];
      break;
    case 1:
      return ["","історія","історії","історій"];
      break;
    case 454:
      return ["","історія","історії","історій"];
      break;
    case 114:
      return ["","гісторыя","гісторыі","гісторый"];
      break;
    case 2:
      return ["","гісторыя","гісторыі","гісторый"];
      break;
    case 777:
      return ["","хроника","хроники","хроник"];
      break;
    case 97:
      return ["","история","истории","историй"];
      break;
    case 100:
      return ["","история","истории","историй"];
      break;
    default:
      return ["","story","story","story"];
      break;
  }
}

      async function replaceTabsWithPhotosModule() {
        let section = document.querySelector(
          "section.vkuiInternalGroup:has(>.OwnerContentTabs)"
        );

        if (!section) {
          console.error("Элемент section не найден");
          return;
        }

        let tabs = section.querySelector(".OwnerContentTabs");

        if (!tabs) {
          console.error("Элемент OwnerContentTabs не найден");
          return;
        }

        tabs.remove();

        let photosModule = document.createElement("div");
        let ownerId = await getId();
        photosModule.classList.add("module", "clear", "photos_module");
        photosModule.id = "profile_photos_module";
        let photodata = await vkApi.api("photos.getAll", {
          owner_id: ownerId,
          count: 4,
          skip_hidden: true,
        });
        let userDataPi = await getUserDataPhoto(ownerId);
        let userNamePi = userDataPi.first_name_gen;
        photosModule.innerHTML = `
        <div class="header_right_link fl_r"></div>
        <a href="/albums${ownerId}" onclick="return showAlbums(${ownerId}, {noHistory: true}, event);" class="module_header">
            <div class="header_top clear_fix">
                <span class="header_label fl_l">${getLang(
                  "me_convo_attaches_type_photo"
                )} ${userNamePi}</span>
                <span class="header_count fl_l">${photodata.count}</span>
            </div>
        </a>
        <div id="page_photos_module" class="page_photos_module"></div>
    `;
        let d = document.createElement("a");
        d.classList.add("fl_r");
        d.setAttribute(
          "onclick",
          `event.preventDefault(); event.stopPropagation(); window.showBox("al_places.php", {
                    act: "photos_box",
                    uid: ${ownerId}
                }, {
                    stat: ["maps.js", window.jsc("web/places.js"), "places.css", "ui_controls.js", "ui_controls.css"]
                });`
        );
        d.style.color = "var(--vkui--color_text_secondary)";
        d.style.marginRight = "-12px";
        d.textContent = getPhotoMapText(vk.lang);
        photosModule.querySelector(".header_top").appendChild(d);
        if (!photodata || !photodata.items) {
          console.error("Данные фотографий не найдены");
          return;
        }

        let pagePhotosModule = photosModule.querySelector(
          "#page_photos_module"
        );
        let countAddedPhotos = 0;
        photodata.items.forEach((item) => {
          let photoLink = item.sizes[item.sizes.length - 1].url;
          let photoId = `${item.owner_id}_${item.id}`;

          let photoElement = document.createElement("a");
          photoElement.classList.add("page_square_photo", "crisp_image");
          photoElement.dataset.photoId = photoId;
          photoElement.href = `/photo${photoId}?all=1`;
          photoElement.onclick = () =>
            showPhoto(photoId, `photos(${item.owner_id})`, {
              temp: {
                x: photoLink,
                y: photoLink,
                z: photoLink,
                w: photoLink,
                x_: [photoLink, 604, 340],
                y_: [photoLink, 807, 454],
                z_: [photoLink, 1280, 720],
                w_: [photoLink, 1920, 1080],
                base: "",
              },
            });

          photoElement.style.backgroundImage = `url(${photoLink})`;
          photoElement.setAttribute("aria-label", "Фотография");
          photoElement.innerHTML =
            '<span class="blind_label">Фотография</span>';
          countAddedPhotos++;
          pagePhotosModule.appendChild(photoElement);
        });
        ///ИСТОРИИ В КЛАССИК ПРОФИЛЕ///
		
        let pizda = _o(document.getElementById("react_rootprofile"))?.container
          ?.memoizedState?.element?.props;
        function _o(e) {
          const t = {};
          if (!e) return t;
          for (const n of Object.keys(e))
            n.startsWith("__reactFiber") && (t.fiber = e[n]),
              n.startsWith("__reactProps") && (t.props = e[n]),
              n.startsWith("__reactContainer") && (t.container = e[n]);
          return t;
        }
        let ownerStory = pizda.store.getState().owner;
        let stories = pizda.store.getState().stories;
        if (stories.count > 0) {
          let storyElement = document.createElement("a");
          storyElement.setAttribute(
            "onclick",
            `showStory('/owner_feed${ownerStory.id}', {source: 'post_avatar'});`
          );
          storyElement.id = "profile_story";
          storyElement.classList.add("yPVSkNQu");
          storyElement.style.backgroundPosition = "50% 50%";
          storyElement.style.backgroundRepeat = "no-repeat";
          let storyStyleImage;
          try {
            storyStyleImage = `url(${
              stories.items[0].stories[0].photo.sizes.at(-1).url
            })`;
          } catch (error) {
            storyStyleImage = `url(${
              stories.items[0].stories[0].video.image.at(-1).url
            })`;
          }
          storyElement.style.backgroundImage = storyStyleImage;
          storyElement.style.backgroundSize = "cover";
          storyElement.style.cursor = "pointer";
          storyElement.style.display = "inline-block";
          storyElement.style.height = "123px";
          storyElement.style.imageRendering = "-webkit-optimize-contrast";
          storyElement.style.marginLeft = "0px";
          storyElement.style.position = "relative";
          storyElement.style.overflow = "hidden";
          storyElement.style.textAlign = "center";
          storyElement.style.textDecoration = "none";
          storyElement.style.width = `123px`;
          storyElement.innerHTML = `<span class="EoMSGvQz"></span><div class="WezUccGf">
    <div class="JDEMGFbn"></div>
    <div class="gZFGalLh">${stories.items[0].stories.length + " " + getLangBottom(stories.items[0].stories.length,getStoryText(vk.lang))}</div>
  </div>
<span class="fhwwGZRs"></span>`;
          let styleElement = fromId("vks_blur");
          if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "vks_blur";
            document.head.appendChild(styleElement);
          }
          styleElement.id = "vks_blur";
          styleElement.innerHTML = `
  .page_square_photo.crisp_image:nth-child(5) {display:none;}
  #profile_story:after{
    background-image: ${storyStyleImage};
    filter: blur(5px);
    content: '.';
    width: 123px;
    height: 123px;
    display: inline-block;
    background-size: cover;
    background-position: center;
  }`;

          pagePhotosModule.prepend(storyElement);
        }
        ///КОНЕЦ ИСТОРИЙ В КЛАССИК ПРОФИЛЕ///
        let photosLoadModule = document.createElement("section");
        photosLoadModule.classList.add("vkEnhancerLoadPhotoModule");
        photosLoadModule.innerHTML = `
	 <a id="photos_choose_upload_area_vkEnhancer" class="photos_choose_upload_area" title="${getLang(
     "market_drop_to_upload"
   )}" style="display: block;" onclick="cur.meUploadPhoto ? cur.meUploadPhoto() : document.querySelector('.ProfileTabsPhotoUploadInput').click();">
    <div class="photos_choose_upload_area_uploadvkEnhancer">
	  <svg fill="none" height="32" viewBox="0 0 56 56" width="32" xmlns="http://www.w3.org/2000/svg"><clipPath id="camera_outline_56__a"><path d="M0 0h56v56H0z"></path></clipPath><g clip-path="url(#camera_outline_56__a)" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"><path d="M19.08 6.66A4.74 4.74 0 0 1 22 5.5h12c1.21 0 2.21.6 2.92 1.16a12.69 12.69 0 0 1 2.27 2.44l.98 1.23c.13.16.48.42 1.09.63.57.21 1.22.32 1.74.32h1c2.45 0 4.5 1.27 5.87 3.14A11.86 11.86 0 0 1 52 21.44h-3c0-2.12-.6-3.97-1.54-5.24A4.27 4.27 0 0 0 44 14.28h-1c-.89 0-1.87-.18-2.75-.49-.85-.3-1.8-.8-2.42-1.59l-1.02-1.27-.33-.42a50.36 50.36 0 0 0-.12-.15c-.4-.49-.84-.98-1.31-1.36-.49-.38-.83-.5-1.05-.5H22c-.22 0-.56.12-1.05.5a9.84 9.84 0 0 0-1.33 1.39l-.1.12-.33.42-1.02 1.27a5.42 5.42 0 0 1-2.42 1.6c-.88.3-1.86.48-2.75.48h-1c-1.32 0-2.53.67-3.46 1.92A8.88 8.88 0 0 0 7 21.44H4c0-2.67.76-5.16 2.13-7.02A7.26 7.26 0 0 1 12 11.28h1c.52 0 1.17-.11 1.74-.32.61-.21.96-.47 1.09-.63l.98-1.23.53-.67c.41-.49 1.02-1.2 1.74-1.77zM17 46.5V45h21c4.72 0 6.88-1.09 8.5-2.82.66-.7 1.24-1.7 1.73-2.8.35-.78.56-1.84.66-2.9.1-1.05.11-1.99.11-2.48V21.44h3V34c0 .5 0 1.56-.12 2.76a12.73 12.73 0 0 1-3.18 7.45C46.34 46.74 43.28 48 38 48H17zm-9.72-2.3a11.69 11.69 0 0 1-2.3-3.63c-.38-.9-.6-2.35-.75-3.53A30.5 30.5 0 0 1 4 34V21.44h3V34c0 .42.07 1.5.2 2.68.15 1.22.35 2.28.55 2.75.43 1.04 1.02 2 1.72 2.72l.05.05.04.05a7.25 7.25 0 0 0 3.2 2.01c1.38.5 2.9.74 4.24.74v3c-1.67 0-3.54-.3-5.25-.91a10.25 10.25 0 0 1-4.47-2.89z"></path><path d="M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"></path></g></svg>
      <span id="photos_choose_upload_area_labelvkEnhancer" class="photos_choose_upload_area_label">
        ${getLang("stories_create_add_photo")}
      </span>
    </div>
    <div class="photos_choose_upload_area_dropvkEnhancer">
      <div class="photos_choose_upload_area_drop_label">
        <svg fill="none" height="56" viewBox="0 0 56 56" width="56" xmlns="http://www.w3.org/2000/svg"><clipPath id="camera_outline_56__a"><path d="M0 0h56v56H0z"></path></clipPath><g clip-path="url(#camera_outline_56__a)" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"><path d="M19.08 6.66A4.74 4.74 0 0 1 22 5.5h12c1.21 0 2.21.6 2.92 1.16a12.69 12.69 0 0 1 2.27 2.44l.98 1.23c.13.16.48.42 1.09.63.57.21 1.22.32 1.74.32h1c2.45 0 4.5 1.27 5.87 3.14A11.86 11.86 0 0 1 52 21.44h-3c0-2.12-.6-3.97-1.54-5.24A4.27 4.27 0 0 0 44 14.28h-1c-.89 0-1.87-.18-2.75-.49-.85-.3-1.8-.8-2.42-1.59l-1.02-1.27-.33-.42a50.36 50.36 0 0 0-.12-.15c-.4-.49-.84-.98-1.31-1.36-.49-.38-.83-.5-1.05-.5H22c-.22 0-.56.12-1.05.5a9.84 9.84 0 0 0-1.33 1.39l-.1.12-.33.42-1.02 1.27a5.42 5.42 0 0 1-2.42 1.6c-.88.3-1.86.48-2.75.48h-1c-1.32 0-2.53.67-3.46 1.92A8.88 8.88 0 0 0 7 21.44H4c0-2.67.76-5.16 2.13-7.02A7.26 7.26 0 0 1 12 11.28h1c.52 0 1.17-.11 1.74-.32.61-.21.96-.47 1.09-.63l.98-1.23.53-.67c.41-.49 1.02-1.2 1.74-1.77zM17 46.5V45h21c4.72 0 6.88-1.09 8.5-2.82.66-.7 1.24-1.7 1.73-2.8.35-.78.56-1.84.66-2.9.1-1.05.11-1.99.11-2.48V21.44h3V34c0 .5 0 1.56-.12 2.76a12.73 12.73 0 0 1-3.18 7.45C46.34 46.74 43.28 48 38 48H17zm-9.72-2.3a11.69 11.69 0 0 1-2.3-3.63c-.38-.9-.6-2.35-.75-3.53A30.5 30.5 0 0 1 4 34V21.44h3V34c0 .42.07 1.5.2 2.68.15 1.22.35 2.28.55 2.75.43 1.04 1.02 2 1.72 2.72l.05.05.04.05a7.25 7.25 0 0 0 3.2 2.01c1.38.5 2.9.74 4.24.74v3c-1.67 0-3.54-.3-5.25-.91a10.25 10.25 0 0 1-4.47-2.89z"></path><path d="M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"></path></g></svg>
        <div class="photos_choose_upload_area_drop_label_tex">${getLang(
          "market_drop_to_upload"
        )}</div>
      </div>
    </div>
  </a>`;
        let inserBeforeThis = document.querySelector(".WallLegacy");
        if (ownerId == vk.id) {
          section.parentElement.insertBefore(photosLoadModule, inserBeforeThis);
          photosModule.querySelector(".header_label").textContent = getMyPhotoText(vk.lang);
        }
        if (countAddedPhotos != 0) {
          section.appendChild(photosModule);
        } else if (countAddedPhotos == 0) {
          section.remove();
        }
      }

      document.arrive(".ProfileGroup", { existing: true }, async function (e) {
        let scrollSticky = document.querySelector(".ScrollStickyWrapper > div");
        ///ДЛЯ ФОТОАЛЬБОМОВ///
        let userIDHereWeGoAgain = await getId();
        let profileCheckIsClosed = await getUserDataWithoutOnline(
          userIDHereWeGoAgain
        );
        let albumsGetter;
        if (
          !profileCheckIsClosed.is_closed ||
          profileCheckIsClosed.can_access_closed
        ) {
          try {
            albumsGetter = await vkApi.api("photos.getAlbums", {
              owner_id: userIDHereWeGoAgain,
              need_covers: true,
            });
          } catch (error) {
            albumsGetter = { count: 0 };
          }
        } else {
          albumsGetter = { count: 0 };
        }
        let newAlbumElement = document.createElement("section");
        newAlbumElement.classList =
          "vkuiInternalGroup vkuiGroup vkuiGroup--mode-card vkuiInternalGroup--mode-card vkuiGroup--padding-m Group-module__group--lRMIn Group-module__groupPaddingM Group-module__groupModeCard vkuiInternalGroupCard ProfileGroupEnhancer ProfileAlbumsEnhancer";
        newAlbumElement.innerHTML = ` <div class="vkuiGroup__header">
    <a href="/albums${userIDHereWeGoAgain}" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
      <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
        <div class="vkuiHeader__main">
          <div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1"><span class="vkuiHeader__content-in"><div class="Header-module__content--F5x_X"><div class="TextClamp-module__singleLine--mRCrF">${getLang(
            "profile_user_content_albums"
          )}</div></div></span><span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${
          albumsGetter.count
        }</span></div>
        </div>
      </div>
    </a>
    <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
  </div>
  <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
  <div class="ProfileVideos__items">
    <div class="Group-module__horizontalContentExpanded--yxlH5 vkuiInternalGroupExpandedContent">
      <div class="OwnerVideosList">
        <div class="vkuiHorizontalScroll vkuiInternalHorizontalScroll">
          <div class="vkuiHorizontalScroll__in">
            <div class="vkuiHorizontalScroll__in-wrapper">
              <div class="OwnerAlbumsList__items"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="vkuiSpacing" style="height: 12px; padding: 6px 0px;"></div>`;
        if (
          albumsGetter.count > 0 &&
          !document.querySelector(".ProfileAlbumsEnhancer")
        ) {
          scrollSticky.appendChild(newAlbumElement);

          let appendHereAlbum = document.querySelector(
            ".OwnerAlbumsList__items"
          );
          albumsGetter.items.slice(0, 2).forEach(async (item) => {
            let thumb = await vkApi.api("photos.get", {
              owner_id: item.owner_id,
              photo_ids: item.thumb_id,
              album_id: item.id,
            });
            let thumbSrc;
            try {
              thumbSrc =
                thumb.items[0].sizes[thumb.items[0].sizes.length - 1].url;
            } catch (error) {
              thumbSrc = "https://vk.com/images/camera_big.png";
            }
            let albumElement = document.createElement("div");
            if (item.thumb_id != 0) {
              albumElement.innerHTML = `<a href="/album${item.owner_id}_${item.id}" data-href="album${item.owner_id}_${item.id}?rev=1" onclick="return showPhoto('${item.owner_id}_${item.thumb_id}', 'album${item.owner_id}_${item.id}/rev', {&quot;temp&quot;:{&quot;x&quot;:&quot;${thumbSrc}&quot;,&quot;y&quot;:&quot;${thumbSrc}&quot;,&quot;z&quot;:&quot;${thumbSrc}&quot;,&quot;w&quot;:&quot;${thumbSrc}&quot;,&quot;x_&quot;:[&quot;${thumbSrc}&quot;,431,604],&quot;y_&quot;:[&quot;${thumbSrc}&quot;,576,807],&quot;z_&quot;:[&quot;${thumbSrc}&quot;,771,1080],&quot;w_&quot;:[&quot;${thumbSrc}&quot;,1542,2160],&quot;base&quot;:&quot;&quot;},&quot;jumpTo&quot;:{&quot;z&quot;:&quot;albums${item.owner_id}&quot;}}, event); return nav.go(this, event)" class="img_link  photos_album_w_description vkenh">
    <div class="photos_album_thumb_wrap vkenh">
      <div class="photos_album_thumb crisp_image vkenh" style="background-image: url(${thumbSrc})">
        
        <div class="photos_album_title_wrap vkenh">
          <div class="clear_fix">
            <div class="photos_album_counter vkenh fl_r">${item.size}</div>
            <div class="photos_album_title ge_photos_album vkenh" title="${item.title}">${item.title}</div>
          </div>
          <div class="photos_album_description_wrap"><div class="photos_album_description description"></div></div>
        </div>
      </div>
    </div>
  </a>`;
            } else {
              albumElement.innerHTML = `<a href="/album${item.owner_id}_${item.id}" data-href="album${item.owner_id}_${item.id}?rev=1" class="img_link  photos_album_w_description vkenh">
    <div class="photos_album_thumb_wrap vkenh">
      <div class="photos_album_thumb crisp_image vkenh" style="background-image: url(${thumbSrc}); background-size: 60px 48px; background-position: center;">
        
        <div class="photos_album_title_wrap vkenh">
          <div class="clear_fix">
            <div class="photos_album_counter vkenh fl_r">${item.size}</div>
            <div class="photos_album_title ge_photos_album vkenh" title="${item.title}">${item.title}</div>
          </div>
          <div class="photos_album_description_wrap"><div class="photos_album_description description"></div></div>
        </div>
      </div>
    </div>
  </a>`;
            }
            appendHereAlbum.appendChild(albumElement);
          });
        }
        ///ДЛЯ ВИДЕО///
        try {
          let videos = document.querySelector(".ProfileVideos").innerHTML;
          let popec = document.querySelector(".ProfileVideos");
          popec.remove();
          let newElem = document.createElement("section");
          newElem.classList =
            "vkuiInternalGroup vkuiGroup vkuiGroup--mode-card vkuiInternalGroup--mode-card vkuiGroup--padding-m Group-module__group--lRMIn Group-module__groupPaddingM Group-module__groupModeCard vkuiInternalGroupCard ProfileGroupEnhancer ProfileVideosEnhancer";
          newElem.innerHTML = videos;
          scrollSticky.appendChild(newElem); //ДОБАВЛЕНИЕ БЛОКА ВИДЕО
          let allVideos = document.querySelectorAll(".OwnerVideosListItem");
          allVideos.forEach((videoItem) => {
            let href = videoItem.querySelector("a").getAttribute("href");
            let videoId = href.split("/").pop().replace("video", "");

            videoItem.setAttribute(
              "onclick",
              `event.preventDefault(); event.stopPropagation(); window.showVideo('${videoId}','0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`
            );
          });
        } catch (error) {}
        let audioResponse;
        try {
          audioResponse = await vkApi.api("audio.get", {
            owner_id: userIDHereWeGoAgain,
          });
          if (
            audioResponse.count > 0 &&
            !document.querySelector(".vkEnAudioRow")
          ) {
            let newAudioElement = document.createElement("section");
            newAudioElement.classList =
              "vkuiInternalGroup vkuiGroup vkuiGroup--mode-card vkuiInternalGroup--mode-card vkuiGroup--padding-m Group-module__group--lRMIn Group-module__groupPaddingM Group-module__groupModeCard vkuiInternalGroupCard ProfileGroupEnhancer ProfileAlbumsEnhancer";
            newAudioElement.innerHTML = ` <div class="vkuiGroup__header">
				<a href="/audios${userIDHereWeGoAgain}?section=all" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
					<div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
						<div class="vkuiHeader__main">
						<div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1"><span class="vkuiHeader__content-in"><div class="Header-module__content--F5x_X"><div class="TextClamp-module__singleLine--mRCrF">${getLang(
              "profile_user_content_audio"
            )}</div></div></span><span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${
              audioResponse.count
            }</span></div>
						</div>
					</div>
					</a>
					<div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
				</div>
				<div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
				<div class="ProfileVideos__items">
					<div class="Group-module__horizontalContentExpanded--yxlH5 vkuiInternalGroupExpandedContent">
					<div class="OwnerVideosList">
						<div class="vkuiHorizontalScroll vkuiInternalHorizontalScroll" style="overflow: visible;">
						<div class="vkuiHorizontalScroll__in" style="overflow: visible;">
							<div class="vkuiHorizontalScroll__in-wrapper">
							<div class="OwnerAudiosList__items"></div>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				<div class="vkuiSpacing" style="height: 12px; padding: 6px 0px;"></div>`;
            scrollSticky.appendChild(newAudioElement);
            let appendHereAudio = document.querySelector(
              ".OwnerAudiosList__items"
            );
            audioResponse.items.slice(0, 6).forEach(async (audioItem) => {
              let audioElement = document.createElement("div");
			  let titleAud = audioItem.title.replaceAll('"',"'");
			  let artistAud = audioItem.artist.replaceAll('"',"'");
              audioElement.innerHTML = `<div tabindex="0" class="audio_row audio_row_with_cover _audio_row _audio_row_${
                audioItem.owner_id
              }_${
                audioItem.id
              } audio_can_add audio_lpb audio_row2 audio_row_playable audio_new_lyrics" data-full-id="${
                audioItem.owner_id
              }_${
                audioItem.id
              }" onclick="return getAudioPlayer().toggleAudio(this, event)" data-audio="[${
                audioItem.id
              },${audioItem.owner_id},&quot;&quot;,&quot;${
                titleAud
              }&quot;,&quot;${
                artistAud
              }&quot;,157,0,0,&quot;&quot;,0,34,&quot;module:${
                audioItem.owner_id
              }&quot;,&quot;[]&quot;,&quot;62efa83eaf32d46ab7\/\/e3727249bcd60c36ee\/\/\/bca050eaeb2ae61a22\/&quot;,&quot;&quot;,{&quot;duration&quot;:${
                audioItem.ads.duration
              },&quot;content_id&quot;:&quot;${audioItem.owner_id}_${
                audioItem.id
              }&quot;,&quot;puid22&quot;:${
                audioItem.ads.puid22
              },&quot;account_age_type&quot;:${
                audioItem.ads.account_age_type
              },&quot;_SITEID&quot;:276,&quot;vk_id&quot;:${
                vk.id
              },&quot;ver&quot;:251116},&quot;&quot;,&quot;&quot;,&quot;&quot;,false,&quot;9c91d4359kPPl-j5wiDD-N-q4xNYySV8d1i8YjJXvg6StjuAn436s3dh-U5Vim743w&quot;,0,0,true,&quot;${
                audioItem.access_key
              }&quot;,false,&quot;&quot;,false]" onmouseover="window.AudioUtils &amp;&amp; window.AudioUtils.onRowOver(this, event, false, '', '${
                audioItem.access_key
              }')" onmouseleave="window.AudioUtils &amp;&amp; window.AudioUtils.onRowLeave(this, event)">
  <div class="audio_row_content _audio_row_content vkEnAudioRow">
    <button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " data-testid="audio_row_play_pause_button" onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button>
    <div class="audio_row__cover audio_row__without_cover"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="song_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="song_24__song_24"><path id="song_24__Bounds" d="M0 0h24v24H0z"></path><path d="M13 11.48v5.65c0 4.52-.87 5.39-4.37 5.85C6.96 23.19 5 22.44 5 19.8c0-1.28.8-2.5 2.46-2.81 1.27-.25-.09.02 2.78-.52.7-.13.77-.37.77-.9V3.97c0-1.24.67-1.69 2.66-2.09l4.68-.87c.37-.07.65.07.65.49v4.05c0 .42-.17.6-.59.68l-4.86.86c-.38.1-.55.36-.55.74v3.64Z" id="song_24__Mask" fill="currentColor"></path></g></g></svg></div>
    <div class="audio_row__cover_back _audio_row__cover_back"></div>
    <div class="audio_row__cover_icon _audio_row__cover_icon">
      <div class="audio_row__play_btn_icon--pause"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6.6c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C6.76 5 7.04 5 7.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45C6 18.24 6 17.96 6 17.4V6.6Zm8 0c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C14.76 5 15.04 5 15.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45c-.11-.21-.11-.49-.11-1.05V6.6Z"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 11.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 8 17.2V6.8a1 1 0 0 1 1.5-.86l9 5.2Z"></path></svg></div>
    </div>
    <div class="audio_row__counter"></div>
    <div class="audio_row__play_btn">
      <div class="audio_row__play_btn_icon--pause"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM10.6 7.1c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3zm5 0c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm5.02-11.13c.64-.39.64-1.36 0-1.74l-6.6-4C9.77 6.75 9 7.23 9 8v8c0 .76.78 1.25 1.41.87z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
    </div>

    <div class="audio_row__inner">
      <div class="audio_row__chart_info">
        
        
      </div>
      <div class="audio_row__performer_title">
        <div onmouseover="setTitle(this)" class="audio_row__performers" data-testid="audio_row_performers"><a href="/audio?performer=1&amp;q=${
          audioItem.artist
        }">${audioItem.artist}</a></div>
        <div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)">
          <a href="" class="audio_row__title_inner _audio_row__title_inner" data-testid="audio_row_title">${
            audioItem.title
          }</a>
          <span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span>
          
        </div>
      </div>
      <div class="audio_row__info _audio_row__info"><div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">${splitDuration(
        audioItem.duration
      )}</div></div>
    </div>

    <div class="audio_player__place _audio_player__place"></div>
  </div>
</div>`;
              function splitDuration(dura) {
                let hours = Math.floor(dura / 3600);
                let minutes = Math.floor((dura % 3600) / 60);
                let seconds = dura % 60;

                if (hours === 0) {
                  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                } else {
                  return `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                }
              }
              appendHereAudio.appendChild(audioElement);
            });
          }
        } catch (error) {}
      });

      document.arrive(".OwnerContentTabs", { existing: true }, async function (
        e
      ) {
        await replaceTabsWithPhotosModule();
      });

      function appendActivityText(activityText) {
        getIdAntiAsync().then((objectId) => {
          let broadcast = document.querySelector(".ProfileInfo__broadcast");
          if (!broadcast) {
            if (vk.id != objectId) {
              var activitySpan = document.createElement("span");
              activitySpan.classList.add("page_current_info");
              activitySpan.classList.add("current_text");
              activitySpan.textContent = activityText;

              var ownerPageName = document.getElementById("owner_page_name");
              ownerPageName.insertAdjacentElement("afterend", activitySpan);
            } else {
              var ip_h = vk.ip_h;
              var activitySpan = document.createElement("div");
              activitySpan.style.width = "100%";
              if (activityText != "") {
                activitySpan.innerHTML =
                  '<div class="page_current_info" id="page_current_info"><div id="currinfo_editor" class="page_status_editor clear" onclick="cancelEvent(event)" style="display: none;"> <div class="editor"> <div class="page_status_input_wrap _emoji_field_wrap"> <div class="emoji_smile_wrap _emoji_wrap"> <div class="emoji_smile _emoji_btn" role="button" title="' +
                  getLang("global_emoji_hint") +
                  '" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);" aria-label="Добавить эмодзи или стикер"> <div class="emoji_smile_icon_inline_svg emoji_smile_icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49s1.39-.25 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13c-.27.33-.61.6-.97.83a5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" fill="currentColor"></path></svg></div> </div> </div> <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox">' +
                  activityText +
                  '</div> </div> <div class="page_status_audio checkbox" id="currinfo_audio" onclick="checkbox(this);" role="checkbox" aria-checked="false" tabindex="0">' +
                  getLang("profile_broadcast_audio_status") +
                  '</div> <div class="page_status_app checkbox on unshown" id="currinfo_app" onclick="checkbox(this); Profile.appStatusUpdate(`' +
                  ip_h +
                  '`)" role="checkbox" aria-checked="true" tabindex="0">Показывать приложение в статусе</div> <button class="flat_button button_small page_status_btn_save" id="currinfo_save">' +
                  getLang("Save") +
                  '</button> </div> </div> <div id="currinfo_wrap" onclick="return Page.infoEdit();" tabindex="0" role="button" style="display: block;"> <span id="current_info" class="current_info"><span class="my_current_info"><span class="current_text">' +
                  activityText +
                  '</span></span></span> </div> <div id="currinfo_fake" style="display: none;"><span class="my_current_info"><span class="current_text">' +
                  activityText +
                  "</span></span></div></div>";
              } else {
                activitySpan.innerHTML =
                  '<div class="page_current_info" id="page_current_info"><div id="currinfo_editor" class="page_status_editor clear" onclick="cancelEvent(event)" style="display: none;"> <div class="editor"> <div class="page_status_input_wrap _emoji_field_wrap"> <div class="emoji_smile_wrap _emoji_wrap"> <div class="emoji_smile _emoji_btn" role="button" title="' +
                  getLang("global_emoji_hint") +
                  '" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);" aria-label="Добавить эмодзи или стикер"> <div class="emoji_smile_icon_inline_svg emoji_smile_icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49s1.39-.25 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13c-.27.33-.61.6-.97.83a5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" fill="currentColor"></path></svg></div> </div> </div> <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox"></div> </div> <div class="page_status_audio checkbox" id="currinfo_audio" onclick="checkbox(this);" role="checkbox" aria-checked="false" tabindex="0">' +
                  getLang("profile_broadcast_audio_status") +
                  '</div> <div class="page_status_app checkbox on unshown" id="currinfo_app" onclick="checkbox(this); Profile.appStatusUpdate(`' +
                  ip_h +
                  '`)"="" role="checkbox" aria-checked="true" tabindex="0">Показывать приложение в статусе</div> <button class="flat_button button_small page_status_btn_save" id="currinfo_save" style="">' +
                  getLang("Save") +
                  '</button> </div> </div> <div id="currinfo_wrap" onclick="return Page.infoEdit();" tabindex="0" role="button" style="display: block;"> <span id="current_info" class="current_info"><span class="no_current_info">' +
                  getLang("change_current_info") +
                  '</span></span> </div> <div id="currinfo_fake" style="display: none;"><span class="no_current_info">' +
                  getLang("change_current_info") +
                  "</span></div></div>";
              }
              var ownerPageName = document.getElementById("owner_page_name");
              ownerPageName.insertAdjacentElement("afterend", activitySpan);
              var checkBoxChecked;
              document.arrive("#currinfo_audio", { existing: true }, function (
                e
              ) {
                e.addEventListener("click", function () {
                  checkBoxChecked = e.getAttribute("aria-checked");
                  var saveButtonStatus = document.querySelector(
                    "#currinfo_save"
                  );
                  if (checkBoxChecked == "true") {
                    let statusInput = document.querySelector(
                      ".page_status_input"
                    );
                    statusInput.setAttribute("contenteditable", false);
                    saveButtonStatus.addEventListener(
                      "click",
                      changeBroadcastState
                    );
                  } else {
                    let statusInput = document.querySelector(
                      ".page_status_input"
                    );
                    statusInput.setAttribute("contenteditable", true);
                    saveButtonStatus.removeEventListener(
                      "click",
                      changeBroadcastState
                    );
                  }
                });
              });
              document.arrive(
                ".ProfileBroadcast__checkbox",
                { existing: true },
                function (e) {
                  e.addEventListener("click", () => {
                    page.audioStatusUpdate(window.vk.statusExportHash);
                  });
                }
              );
            }
          }
          if (vk.id == objectId) {
            let pHeaderAva = document.querySelectorAll(".OwnerPageAvatar")[1];
            pHeaderAva.remove();
            let pHeaderAva1 = document.querySelectorAll(
              ".ProfileHeader__ava"
            )[1];
            pHeaderAva1.style.position = "relative";
            pHeaderAva1.style.left = "-200px";
            let pHeaderIn = document.querySelectorAll(".ProfileHeader__in")[1];
            let jopa = document.createElement("div");
            jopa.classList.add("owner_photo_wrap");
            jopa.classList.add("actions_with_effects");
            jopa.style.zIndex = "10";
            jopa.style.position = "relative";
            jopa.style.left = "-8px";
            jopa.style.top = "-5px";
            jopa.id = "owner_photo_wrap";
            let userDataOwner;
            getUserDataPhoto(vk.id).then((e) => {
              userDataOwner = e;
              let userPhotoAva = userDataOwner.photo_id;
              let photo200 = userDataOwner.photo_200;
              deferredCallback(
                () => {
                  try {
                    jopa.innerHTML =
                      `<div class="owner_photo_top_bubble_wrap"> <div class="owner_photo_top_bubble"> <div class="ui_thumb_x_button" onclick="showFastBox(getLang('global_warning'), getLang('profile_really_delete_photo'), getLang('global_delete'),()=>{ vkApi.api('users.get',{fields:'photo_id'}).then(e=>{ vkApi.api('photos.delete',{owner_id:` +
                      vk.id +
                      `,photo_id:` +
                      userDataOwner.photo_id.split("_")[1] +
                      `}).then(e=>{ window.curBox().hide(true);nav.reload(); }) }) },getLang('global_cancel'))" data-title=` +
                      getLang("profile_delete_photo") +
                      ` onmouseover="showTitle(this);" tabindex="0" role="button" aria-label=` +
                      getLang("profile_delete_photo") +
                      `> <div class="ui_thumb_x"></div> </div> </div> </div> <div class="page_avatar_wrap" id="page_avatar_wrap"> <aside aria-label="Фотография"> <div id="page_avatar" class="page_avatar"><a id="profile_photo_link" href="https://vk.com/photo` +
                      userPhotoAva +
                      `" onclick="return showPhoto('` +
                      userPhotoAva +
                      `', 'album` +
                      vk.id +
                      `_0/rev', {&quot;temp&quot;:{&quot;x&quot;:&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,&quot;y&quot;:&quot;` +
                      photo200 +
                      `;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,&quot;z&quot;:&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;w&quot;:&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;x_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,604,499],&quot;y_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,807,667],&quot;z_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;w_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;base&quot;:&quot;&quot;},&quot;jumpTo&quot;:{&quot;z&quot;:&quot;albums` +
                      vk.id +
                      `&quot;}}, event)"><img class="page_avatar_img" src="` +
                      photo200 +
                      `"></a> </div> </aside> </div> <div class="owner_photo_bubble_wrap"> <div class="owner_photo_bubble"> <div class="owner_photo_bubble_action owner_photo_bubble_action_update" data-task-click="Page/owner_new_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` +
                      vk.id +
                      `}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">` +
                      getLang("profile_update_photo") +
                      `</span> </div> <div class="owner_photo_bubble_action owner_photo_bubble_action_crop" data-task-click="Page/owner_edit_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` +
                      vk.id +
                      `,&quot;hash&quot;:&quot;` +
                      getPhotoEditHash() +
                      `&quot;}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">` +
                      getLang("profile_edit_small_copy") +
                      `</span> </div> <div class="owner_photo_bubble_action owner_photo_bubble_action_effects" onclick="Page.ownerPhotoEffects('` +
                      userPhotoAva +
                      `', ` +
                      vk.id +
                      `)" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">` +
                      getLang("profile_photo_action_effects") +
                      `</span> </div> </div> </div>`;
                  } catch (error) {
                    jopa.innerHTML =
                      `<div class="page_avatar_wrap" id="page_avatar_wrap"> <aside aria-label="Фотография"> <div id="page_avatar" class="page_avatar"> <a id="profile_photo_link"><img class="page_avatar_img" src="` +
                      photo200 +
                      `"></a> </div> </aside> </div> <a class="owner_photo_bubble_action owner_photo_bubble_action_update owner_photo_no_ava" data-task-click="Page/owner_new_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` +
                      vk.id +
                      `}" tabindex="0" role="button" style="
    position: absolute;
    top: 0px;
    padding: 0 0px;
    width: 100%;
    height: 206px;
    text-align: center;
"> <span class="loadPhoto" style="line-height: 360px;">` +
                      getLang("profile_load_photo") +
                      `</span> </a>`;
                    let styleElement = fromId("vkenNoAva");
                    if (!styleElement) {
                      styleElement = document.createElement("style");
                      styleElement.id = "vkenNoAva";
                      document.head.appendChild(styleElement);
                    }
                    styleElement.id = "vkenNoAva";
                    styleElement.innerHTML = `.owner_photo_bubble_wrap:has(>.owner_photo_bubble>.owner_photo_no_ava){margin-top:-35px;height:36px;}`;
                  }
                  if (!getPhotoEditHash()) {
                    console.info(
                      "[VKENH] Failed to parse PhotoEditHash. Location will be rebooted if you try to edit photo"
                    );
                    try {
                      let rebootThis = jopa.querySelector(
                        '[data-task-click="Page/owner_edit_photo"]'
                      );
                      rebootThis.setAttribute(
                        "onclick",
                        "window.location.reload()"
                      );
                    } catch (error) {}
                  }
                },
                { variable: "MECommonContext" }
              );
              pHeaderIn.prepend(jopa);
            });
          }
          appearVariable();
        });
      }

      async function getUserDataPhoto(objectId) {
        try {
          let pizda = _o(document.getElementById("react_rootprofile"))
            ?.container?.memoizedState?.element?.props;
          function _o(e) {
            const t = {};
            if (!e) return t;
            for (const n of Object.keys(e))
              n.startsWith("__reactFiber") && (t.fiber = e[n]),
                n.startsWith("__reactProps") && (t.props = e[n]),
                n.startsWith("__reactContainer") && (t.container = e[n]);
            return t;
          }
          var response = pizda.store.getState().owner;
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
      }
    }
  },
  { variable: "urls" }
);
///КОНЕЦ КЛАССИЧЕСКОГО ДИЗАЙНА ПРОФИЛЯ///
///ЗНАЧКИ В ПРОФИЛЯХ///
document.arrive(adsSelector, { existing: true }, function (e) {
  e.remove();
});
async function updateUsers() {
  const url = window.location.href;
  var parts = url.split("/");
  var objectId;
  var username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }
  var i = await vkApi.api("users.get", { user_ids: username });
  objectId = i[0].id;
  switch (objectId) {
    case 185853506:
      appendIcons(["founder", "dev", "designer"]);
      break;
    case 539793061:
      appendIcons(["former", "old"]);
      break;
    case 86322416:
      appendIcons(["help", "old"]);
      break;
    case 861962176:
      appendIcons(["help"]);
      break;
    default:
      let serverIconsJson = "";
      fetch("https://vkenhancer.ru/api/vip.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "[VKENH Error] Failed to parse VIP users: " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          serverIconsJson = data;
          if (serverIconsJson != "") {
            if (serverIconsJson[objectId]) {
              appendCustomIcon(serverIconsJson[objectId]);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });

      break;
  }
}

function dataURItoSVG(dataURI) {
  const svgString = decodeURIComponent(dataURI.split(",")[1]);
  const div = document.createElement("div");
  div.innerHTML = svgString;
  const svgElement = div.querySelector("svg");
  return svgElement;
}

function appendCustomIcon(dataSVG) {
  const iconsContainer = document.querySelector("#owner_page_name");
  if (!iconsContainer) return;
  const svg = dataURItoSVG(dataSVG);
  svg.style.margin = "-1px 8px";
  iconsContainer.appendChild(svg);
}

function createSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.setAttribute("viewBox", "0 0 72 72");
  svg.setAttribute("fill", "none");
  svg.classList.add("vkEnhancerBadgeStaff");
  svg.style.marginLeft = "8px";
  svg.style.marginTop = "6px";

  svg.innerHTML = `
<path d="M0 33.12C0 17.507 0 9.70062 4.85031 4.85031C9.70062 0 17.507 0 33.12 0H35.88C51.4929 0 59.2993 0 64.1498 4.85031C69 9.70062 69 17.507 69 33.12V35.88C69 51.4929 69 59.2993 64.1498 64.1498C59.2993 69 51.4929 69 35.88 69H33.12C17.507 69 9.70062 69 4.85031 64.1498C0 59.2993 0 51.4929 0 35.88V33.12Z" fill="#2961F4"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M63.9062 64.3869C59.0385 69 51.2343 69 35.88 69H33.12C17.766 69 9.96169 69 5.09409 64.3872V59.7384C5.09409 53.728 9.96636 48.8557 15.9766 48.8557H53.0235C59.0339 48.8557 63.9062 53.728 63.9062 59.7384V64.3869Z" fill="#589AFA"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M41.7103 34.4176C41.7103 38.5041 38.3901 41.8168 34.2944 41.8168C30.1987 41.8168 26.8784 38.5041 26.8784 34.4176C26.8784 30.3311 30.1987 27.0184 34.2944 27.0184C38.3901 27.0184 41.7103 30.3311 41.7103 34.4176ZM34.2944 39.3504C37.0249 39.3504 39.2384 37.1419 39.2384 34.4176C39.2384 31.6933 37.0249 29.4848 34.2944 29.4848C31.5639 29.4848 29.3504 31.6933 29.3504 34.4176C29.3504 37.1419 31.5639 39.3504 34.2944 39.3504Z" fill="white"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.334 14.5223C34.6767 14.5222 34.0176 14.5363 33.3604 14.5208C33.0227 14.5129 31.8373 14.485 30.841 15.2816C29.8635 16.0632 29.4994 17.257 29.28 18.1343C29.1487 18.6591 28.8946 19.331 28.5511 19.9745C27.8582 20.2498 27.19 20.5732 26.5508 20.9405C25.8557 20.8016 25.1978 20.5822 24.722 20.3608C23.9015 19.979 22.7416 19.5094 21.5162 19.7773C20.2695 20.0499 19.5459 20.9876 19.34 21.2545C18.9603 21.7465 18.5668 22.2319 18.1643 22.7056C17.9453 22.9633 17.1801 23.8638 17.1726 25.1353C17.1652 26.3844 17.8635 27.418 18.4082 28.1415C18.7433 28.5866 19.117 29.2299 19.4041 29.9228C19.1972 30.6078 19.0363 31.3126 18.925 32.0332C18.3708 32.5187 17.7659 32.9228 17.2791 33.1711C16.4721 33.5828 15.3897 34.2066 14.8479 35.3338C14.297 36.48 14.5897 37.6241 14.6735 37.9513C14.8275 38.5534 14.9682 39.1621 15.0937 39.7708C15.1619 40.1011 15.4006 41.2589 16.3999 42.0489C17.3829 42.8259 18.6309 42.9122 19.5365 42.9285C20.072 42.9382 20.7762 43.0328 21.4746 43.2194C21.8953 43.8303 22.3584 44.4095 22.8597 44.9526C22.8832 45.6709 22.817 46.373 22.7066 46.8939C22.5189 47.779 22.323 49.0104 22.858 50.1397C23.4032 51.2903 24.4791 51.7839 24.7865 51.9249C25.3516 52.1841 25.9133 52.4579 26.4655 52.7434C26.7651 52.8983 27.8186 53.4431 29.0645 53.1634C30.2878 52.8887 31.1396 51.9739 31.7216 51.2816C32.0768 50.859 32.6134 50.3557 33.2176 49.9228C33.9298 49.9716 34.659 49.9716 35.3712 49.9228C35.9754 50.3557 36.512 50.859 36.8672 51.2816C37.4491 51.9739 38.301 52.8887 39.5243 53.1634C40.7702 53.4431 41.8237 52.8983 42.1233 52.7434C42.6755 52.4579 43.2372 52.1842 43.8023 51.9249C44.1097 51.7839 45.1856 51.2903 45.7307 50.1397C46.2658 49.0104 46.0699 47.779 45.8822 46.8939C45.7718 46.373 45.7056 45.6709 45.729 44.9526C46.2304 44.4095 46.6935 43.8303 47.1142 43.2194C47.8126 43.0328 48.5168 42.9382 49.0522 42.9285C49.9578 42.9122 51.2059 42.8259 52.1888 42.0489C53.1881 41.2589 53.4269 40.1011 53.495 39.7708C53.6206 39.1621 53.7613 38.5535 53.9153 37.9513C53.999 37.6241 54.2918 36.48 53.7409 35.3338C53.1991 34.2066 52.1167 33.5828 51.3096 33.1711C50.8228 32.9228 50.218 32.5187 49.6638 32.0332C49.5525 31.3126 49.3916 30.6078 49.1846 29.9228C49.4718 29.2299 49.8455 28.5866 50.1806 28.1415C50.7253 27.418 51.4236 26.3844 51.4162 25.1353C51.4086 23.8637 50.6434 22.9633 50.4244 22.7056C50.022 22.2319 49.6285 21.7465 49.2488 21.2545C49.0428 20.9876 48.3193 20.0499 47.0726 19.7773C45.8472 19.5094 44.6873 19.979 43.8668 20.3608C43.391 20.5822 42.7331 20.8016 42.038 20.9405C41.3987 20.5732 40.7306 20.2498 40.0377 19.9745C39.6942 19.331 39.4401 18.6591 39.3088 18.1343C39.0979 17.2912 38.7606 16.2002 37.9226 15.4314C36.9406 14.5305 35.784 14.5246 35.3699 14.5225L35.334 14.5223ZM42.6607 49.7351L41.0932 50.4993C40.3095 50.8813 39.9176 51.0724 38.7612 49.6967C38.1128 48.9253 37.0978 48.0278 35.9874 47.3847C34.879 47.5278 33.7098 47.5278 32.6014 47.3847C31.491 48.0278 30.476 48.9253 29.8276 49.6967C28.6712 51.0724 28.2793 50.8813 27.4955 50.4993L25.928 49.7351C25.1443 49.353 24.7524 49.162 25.125 47.4043C25.3303 46.436 25.4138 45.1142 25.2492 43.8634C24.4094 43.0596 23.6766 42.145 23.0743 41.1431C21.8886 40.6982 20.5751 40.4805 19.5813 40.4625C17.7839 40.4301 17.6858 40.0054 17.4897 39.1562L17.0974 37.4578C16.9012 36.6085 16.8031 36.1839 18.4044 35.3672C19.2983 34.9112 20.3959 34.1295 21.2707 33.1982C21.3773 32.0475 21.6332 30.9401 22.0187 29.8954C21.6422 28.6645 20.993 27.4681 20.3846 26.6601C19.3036 25.2244 19.578 24.8857 20.1268 24.2084L21.2243 22.8537C21.7731 22.1764 22.0475 21.8377 23.6772 22.5961C24.5703 23.0116 25.8318 23.3885 27.0818 23.5116C28.0463 22.8733 29.1002 22.3593 30.2209 21.9926C30.9257 20.9351 31.4364 19.699 31.6784 18.7315C32.1144 16.9883 32.5504 16.9883 33.4224 16.9883L35.3158 16.9887C36.0897 16.9944 36.5 17.0909 36.9104 18.7315C37.1524 19.699 37.6631 20.9351 38.3679 21.9926C39.4885 22.3593 40.5425 22.8733 41.5069 23.5116C42.757 23.3885 44.0184 23.0116 44.9116 22.5961C46.5413 21.8377 46.8157 22.1764 47.3645 22.8537L48.462 24.2084C49.0108 24.8857 49.2852 25.2244 48.2042 26.6601C47.5958 27.4681 46.9465 28.6645 46.57 29.8954C46.9556 30.9401 47.2114 32.0475 47.3181 33.1982C48.1929 34.1295 49.2905 34.9112 50.1844 35.3672C51.7856 36.1839 51.6876 36.6085 51.4914 37.4578L51.0991 39.1562C50.9029 40.0054 50.8048 40.4301 49.0075 40.4625C48.0137 40.4805 46.7002 40.6982 45.5144 41.1431C44.9122 42.145 44.1794 43.0596 43.3396 43.8634C43.175 45.1142 43.2585 46.436 43.4637 47.4043C43.8364 49.162 43.4445 49.353 42.6607 49.7351Z" fill="white"></path>
<path d="M18 25.5L22 21H28.5L31.5 15.5H36L39 21L42 22.5L48.5 21L49.5 25.5L48.5 30.5L49.5 33L52 35.5V39.5L49.5 41L44.5 44.5V50.5L39 52L36 49H33L28.5 52L23.5 49V43.5L18 41L15.5 35.5L22 30.5L18 25.5Z" fill="white"></path>

<circle cx="34.5" cy="34.5" r="7.5" fill="#2961F4"></circle>`;

  return svg;
}

function createTooltipText(roles) {
  const tooltipText = document.createElement("div");
  tooltipText.style.position = "absolute";
  tooltipText.style.fontSize = "13px";
  tooltipText.style.fontWeight = "400";
  tooltipText.style.backgroundColor = "var(--vkui--color_background_tertiary)";
  tooltipText.style.borderRadius = "8px";
  tooltipText.style.border =
    "2px solid 1px solid var(--vkui--color_separator_primary)";
  tooltipText.style.color =
    "2px solid 1px solid var(--vkui--color_text_primary)";
  tooltipText.style.padding = "4px 24px";
  tooltipText.style.boxShadow = "var(--vkui--elevation3)";
  tooltipText.style.zIndex = "999999";

  roles.forEach((role) => {
    let text;
    switch (role) {
      case "founder":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1132)"/><path d="M11.9853 7.37283L14.614 7.63087C15.5287 7.72065 15.8092 8.6348 15.1029 9.23539L13.0449 10.9854L13.8089 13.8362C14.0598 14.7724 13.2814 15.3392 12.5018 14.7757L10.0012 12.9686L7.50063 14.7757C6.72414 15.3369 5.94255 14.7726 6.19348 13.8362L6.95747 10.9854L4.8995 9.23539C4.19024 8.63228 4.46965 7.72106 5.38824 7.63087L8.01645 7.37283L9.17437 4.64137C9.53698 3.78598 10.4656 3.78641 10.828 4.64146L11.9853 7.37283Z" fill="white"/><defs><linearGradient id="paint0_linear_35635_1132" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#70B2FF"/><stop offset="1" stop-color="#5C9CE6"/></linearGradient></defs></svg><div style="margin-left: 8px;">Создатель расширения VK Tools</div></div>';
        break;
      case "dev":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="url(#paint0_linear_35635_1242)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.63935 15.1031C3.78688 14.2515 3.78688 12.8706 4.63935 12.0189L6.19473 10.465C6.30756 10.3522 6.34834 10.1873 6.31179 10.032C6.22658 9.67008 6.18151 9.29268 6.18151 8.90475C6.18151 6.19593 8.37945 4 11.0908 4C11.693 4 12.2699 4.10833 12.803 4.30656C13.0793 4.40932 13.1349 4.76017 12.9269 4.96912L11.036 6.86858C10.9546 6.95036 10.9089 7.06105 10.9089 7.17644V8.65467C10.9089 8.89567 11.1043 9.09104 11.3453 9.09104H12.8209C12.9362 9.09104 13.0469 9.04535 13.1287 8.96397L15.0309 7.07085C15.2398 6.86297 15.5905 6.91843 15.6933 7.19461C15.8916 7.72708 16 8.30328 16 8.90475C16 11.6136 13.8021 13.8095 11.0908 13.8095C10.7081 13.8095 10.3356 13.7658 9.97808 13.683C9.82346 13.6472 9.65948 13.688 9.5472 13.8002L7.98473 15.3612C7.13226 16.2129 5.75014 16.2129 4.89767 15.3612L4.63935 15.1031Z" fill="white"/><defs><linearGradient id="paint0_linear_35635_1242" x1="-11.3295" y1="-12.7168" x2="18.3815" y2="17.4567" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB73D"/><stop offset="1" stop-color="#FFA000"/></linearGradient></defs></svg><div style="margin-left: 8px;">Разработчик расширения VK Tools</div></div>';
        break;
      case "designer":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="url(#paint0_radial_35635_1237)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.2494 4.7288C11.8594 5.41811 11.7951 6.47143 11.1058 7.08144L9.69121 8.33333H13.83C15.6712 8.33333 16.5343 10.6109 15.1554 11.8311L11.1058 15.4148C10.4165 16.0248 9.3632 15.9605 8.75319 15.2712C8.14317 14.5819 8.20746 13.5286 8.89678 12.9185L10.3114 11.6667H6.17262C4.3314 11.6667 3.46838 9.38911 4.84719 8.16892L8.89678 4.58521C9.58609 3.9752 10.6394 4.03948 11.2494 4.7288Z" fill="white"/><defs><radialGradient id="paint0_radial_35635_1237" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.52601 2.36994) rotate(45.4424) scale(21.173 27.2409)"><stop offset="0.0433247" stop-color="#FFD44C"/><stop offset="0.353531" stop-color="#FF962E"/><stop offset="0.702496" stop-color="#FF5773"/><stop offset="1" stop-color="#FA60A3"/></radialGradient></defs></svg><div style="margin-left: 8px;">Дизайнер расширения VK Tools</div></div>';
        break;
      case "help":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1261)"/> <path d="M6.2 6.5C6.53137 6.5 6.8 6.76863 6.8 7.1V9.3498C6.8 9.59833 7.00147 9.7998 7.25 9.7998V9.7998C7.49853 9.7998 7.7 9.59833 7.7 9.3498V5.6C7.7 5.26863 7.96863 5 8.3 5V5C8.63137 5 8.9 5.26863 8.9 5.6V8.8498C8.9 9.09833 9.10147 9.2998 9.35 9.2998V9.2998C9.59853 9.2998 9.8 9.09833 9.8 8.8498V4.89981C9.8 4.56843 10.0686 4.2998 10.4 4.2998V4.2998C10.7314 4.2998 11 4.56843 11 4.8998V8.8498C11 9.09833 11.2015 9.2998 11.45 9.2998V9.2998C11.6985 9.2998 11.9 9.09833 11.9 8.8498V5.8998C11.9 5.56843 12.1686 5.2998 12.5 5.2998V5.2998C12.8314 5.2998 13.1 5.56843 13.1 5.8998V11.3698L14.5154 9.80029C14.805 9.47916 15.3045 9.46601 15.6106 9.77146V9.77146C15.8876 10.048 15.9083 10.4895 15.6575 10.7901C15.0449 11.5242 13.9413 12.8469 13.2986 13.6182C12.2472 14.8799 10.7073 15.2999 9.54876 15.2999C5.76833 15.2999 5.6 12.7544 5.6 11.8928L5.6 7.1C5.6 6.76863 5.86863 6.5 6.2 6.5V6.5Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35635_1261" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#70B2FF"/> <stop offset="1" stop-color="#5C9CE6"/> </linearGradient> </defs> </svg><div style="margin-left: 8px;">Тестер расширения VK Tools</div></div>';
        break;
      case "old":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"> <rect width="20" height="20" rx="10" fill="url(#paint0_linear_35635_1259)"/> <path d="M9.54691 4.03936C9.5956 4.00469 9.65761 3.99211 9.71676 4.00488C9.82904 4.02913 9.89958 4.13616 9.87432 4.24395L9.87428 4.24394C9.84477 4.36985 9.80783 4.46569 9.76346 4.53147C8.19037 6.86335 8.88126 8.26503 9.94201 8.41565C11.0392 8.57145 11.8417 7.86577 11.67 6.3426C11.6404 6.08032 11.6157 5.85929 11.5958 5.67949C11.5912 5.63709 11.602 5.59444 11.6264 5.55884C11.6846 5.474 11.8035 5.45056 11.8919 5.50647L11.8919 5.50645C12.2484 5.73205 12.6751 6.14228 13.172 6.73714C14.9401 8.85418 15.0092 10.6262 14.9993 11.3883C14.9636 14.1208 12.8566 16 9.99964 16C7.1427 16 5 14.1212 5 11.3883C5.01265 9.31934 6.1013 6.40699 9.10674 4.34818C9.21899 4.27128 9.36571 4.16834 9.54691 4.03936Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35635_1259" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#FF5263"/> <stop offset="1" stop-color="#FF3347"/> </linearGradient> </defs> </svg><div style="margin-left: 8px;">Установил VK Tools до релиза в магазине Chrome</div></div>';
        break;
	  case "former":
        text =
          '<div style="display:flex;align-items:center;" class="optionContainer"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="url(#paint0_linear_35678_1233)"/> <path d="M13.1787 10.0009C13.1787 10.6356 13.1706 11.2081 13.1569 11.7228C13.1547 11.7953 13.1528 11.8666 13.1506 11.9366C13.1453 12.1122 13.1391 12.2806 13.1325 12.4419C13.1297 12.5147 13.1266 12.5856 13.1234 12.6556C13.0553 14.1434 12.9419 15.0009 12.8794 15.3834C12.8559 15.5266 12.7322 15.6275 12.5875 15.6222C9.61594 15.5106 7.16687 13.0006 7.16687 10.0009C7.16687 7.00125 9.61594 4.49156 12.5875 4.38C12.7322 4.37437 12.8559 4.47562 12.8794 4.61844C12.9725 5.18812 13.1787 6.81125 13.1787 10.0009Z" fill="url(#paint1_radial_35678_1233)"/> <path d="M13.1787 10.0009C13.1787 10.6356 13.1706 11.2081 13.1569 11.7228C13.1547 11.7953 13.1528 11.8666 13.1506 11.9366C13.1453 12.1122 13.1391 12.2806 13.1325 12.4419C13.1297 12.5147 13.1266 12.5856 13.1234 12.6556C13.0553 14.1434 12.9419 15.0009 12.8794 15.3834C12.8559 15.5266 12.7322 15.6275 12.5875 15.6222C9.61594 15.5106 7.16687 13.0006 7.16687 10.0009C7.16687 7.00125 9.61594 4.49156 12.5875 4.38C12.7322 4.37437 12.8559 4.47562 12.8794 4.61844C12.9725 5.18812 13.1787 6.81125 13.1787 10.0009Z" fill="url(#paint2_radial_35678_1233)"/> <path d="M13.1787 10.0009C13.1787 10.6356 13.1706 11.2081 13.1569 11.7228C13.1547 11.7953 13.1528 11.8666 13.1506 11.9366C13.1453 12.1122 13.1391 12.2806 13.1325 12.4419C13.1297 12.5147 13.1266 12.5856 13.1234 12.6556C13.0553 14.1434 12.9419 15.0009 12.8794 15.3834C12.8559 15.5266 12.7322 15.6275 12.5875 15.6222C9.61594 15.5106 7.16687 13.0006 7.16687 10.0009C7.16687 7.00125 9.61594 4.49156 12.5875 4.38C12.7322 4.37437 12.8559 4.47562 12.8794 4.61844C12.9725 5.18812 13.1787 6.81125 13.1787 10.0009Z" fill="white" fill-opacity="0.8"/> <path d="M13.1787 10.0009C13.1787 10.6356 13.1706 11.2081 13.1569 11.7228C13.1547 11.7953 13.1528 11.8666 13.1506 11.9366C13.1453 12.1122 13.1391 12.2806 13.1325 12.4419C13.1297 12.5147 13.1266 12.5856 13.1234 12.6556C13.0553 14.1434 12.9419 15.0009 12.8794 15.3834C12.8559 15.5266 12.7322 15.6275 12.5875 15.6222C9.61594 15.5106 7.16687 13.0006 7.16687 10.0009C7.16687 7.00125 9.61594 4.49156 12.5875 4.38C12.7322 4.37437 12.8559 4.47562 12.8794 4.61844C12.9725 5.18812 13.1787 6.81125 13.1787 10.0009Z" fill="white" fill-opacity="0.8"/> <path d="M12.0712 9.28438C12.0712 9.91438 11.7034 10.425 11.2497 10.425C10.7959 10.425 10.4281 9.91438 10.4281 9.28438C10.4281 8.65438 10.7959 8.14375 11.2497 8.14375C11.7034 8.14375 12.0712 8.65438 12.0712 9.28438Z" fill="#816BED"/> <path d="M11.8912 9.28438C11.8912 9.81063 11.6041 10.2375 11.2497 10.2375C10.8953 10.2375 10.6081 9.81063 10.6081 9.28438C10.6081 8.75813 10.8953 8.33125 11.2497 8.33125C11.6041 8.33125 11.8912 8.75782 11.8912 9.28438Z" fill="#816BED"/> <path opacity="0.25" d="M8.9894 8.64425C9.71716 7.79846 10.0195 6.86533 9.66469 6.56005C9.30989 6.25476 8.43231 6.69293 7.70456 7.53872C6.97681 8.38451 6.67447 9.31764 7.02927 9.62293C7.38407 9.92821 8.26165 9.49004 8.9894 8.64425Z" fill="#816BED"/> <path d="M13.1569 11.7228C13.1547 11.7953 13.1528 11.8666 13.1506 11.9366C13.1453 12.1122 13.1391 12.2806 13.1325 12.4419C13.1297 12.5147 13.1266 12.5856 13.1234 12.6556C12.0769 12.6556 11.2819 12.5803 11.2819 12.5803C11.0616 12.5522 10.9372 12.4037 10.9372 12.1862C10.9372 11.9687 11.0994 11.8153 11.2819 11.7919C11.2819 11.7919 12.5841 11.7228 13.1472 11.7228H13.1569Z" fill="white"/> <path d="M13.1506 11.9366C13.1453 12.1122 13.1391 12.2806 13.1325 12.4419C12.1703 12.4419 11.4381 12.4012 11.4381 12.4012C11.2366 12.3859 11.1225 12.3056 11.1225 12.1875C11.1225 12.0694 11.2397 11.9844 11.4381 11.9737C11.4381 11.9737 12.6312 11.9366 13.1472 11.9366H13.1506Z" fill="#816BED"/> <path d="M7.84781 8.89719C8.39813 8.39281 7.78281 7.96375 7.49625 8.11C6.73188 8.5 5.95656 9.07 5.26094 9.42156L5.61281 10.1322C6.34656 9.83406 7.4075 9.30062 7.8475 8.89719H7.84781Z" fill="url(#paint3_linear_35678_1233)"/> <path opacity="0.6" d="M5.77313 10.0637L5.425 9.25843C6.33406 8.71281 6.53594 8.57437 6.79219 8.4025C6.49875 8.91531 6.54031 9.71468 6.14906 9.89906C6.01094 9.96406 5.8775 10.0237 5.77313 10.0637Z" fill="#816BED"/> <path d="M8.89625 7.17638C9.44656 6.672 8.83125 6.24294 8.54469 6.38919C7.78031 6.77919 5.23937 8.34294 4.64406 8.7345L5.08062 9.72013C5.71219 9.35325 8.45625 7.57982 8.89625 7.17638Z" fill="url(#paint4_linear_35678_1233)"/> <path opacity="0.7" d="M8.20031 6.86593C8.56187 6.61031 8.69781 6.48562 8.62062 6.35968C8.93406 6.57968 8.80281 6.74906 8.45937 7.07218C7.95156 7.54999 7.63875 7.98093 7.06687 8.45687C6.84094 8.62312 6.2325 9.06249 5.98 9.23281L5.91156 8.54437C6.23469 8.35031 7.74594 7.22374 8.20031 6.86593Z" fill="#816BED"/> <path d="M8.68063 6.71938C9.23094 6.215 8.61563 5.78594 8.32906 5.93219C7.56469 6.32219 5.02375 7.88594 4.42844 8.2775L4.865 9.26344C5.49656 8.89656 8.24063 7.12313 8.68063 6.71969V6.71938Z" fill="white"/> <path d="M7.65656 7.01531C8.0425 6.60031 8.56031 6.25437 8.28438 5.99374C8.59781 6.21374 8.54375 6.54281 8.20031 6.86624C8.01031 7.04499 7.74563 7.35468 7.27 7.72218C6.88313 7.99281 6.45125 8.30499 6 8.56374L5.84313 8.26656C6.16625 8.07249 7.27125 7.43062 7.65688 7.01562L7.65656 7.01531Z" fill="#816BED"/> <path d="M8.19469 6.66407C8.745 6.15969 8.19719 5.72438 7.75688 5.97657C6.9925 6.36657 5.49969 7.27625 4.90438 7.6675L5.42031 8.54407C6.05219 8.17719 7.75469 7.06719 8.195 6.66375L8.19469 6.66407Z" fill="white"/> <path d="M6.98 7.38499C7.36594 6.96968 7.33219 6.61249 7.255 6.48656C7.47625 6.60187 7.72187 6.95124 7.48531 7.23531C7.37281 7.37062 7.24375 7.46406 7.12563 7.55874C6.77813 7.83656 6.01938 8.39437 5.63156 8.63374L5.52812 8.48562C5.85125 8.29156 6.59438 7.79999 6.98 7.38499Z" fill="#816BED"/> <path d="M5.75219 10.1403C6.43375 9.61969 5.99938 8.38625 5.75219 7.9125C4.97281 7.79781 2.70469 8.24187 2.71437 9.65562C2.72187 10.7944 4.37688 11.2044 5.75219 10.1403Z" fill="#816BED"/> <path d="M7.24625 7.24937C7.68563 6.85437 7.3275 6.29531 6.96187 6.4275C6.76281 6.49937 5.85875 6.92906 4.8475 7.51812C4.235 7.875 3.48563 8.36 3.12875 8.67718C1.87094 9.79594 3.39781 11.1256 4.48813 10.6666C5.78969 10.1184 6.00313 8.84312 5.77188 8.36031C6.39625 8.01343 6.83125 7.6225 7.23187 7.26218L7.24563 7.24968L7.24625 7.24937Z" fill="white"/> <defs> <linearGradient id="paint0_linear_35678_1233" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse"> <stop stop-color="#937FF5"/> <stop offset="1" stop-color="#735CE6"/> </linearGradient> <radialGradient id="paint1_radial_35678_1233" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.6287 4.50031) scale(11.0456)"> <stop stop-color="#FFF1B6"/> <stop offset="0.43" stop-color="#FFD400"/> <stop offset="0.7" stop-color="#FFD400"/> <stop offset="1" stop-color="#FF8E00"/> </radialGradient> <radialGradient id="paint2_radial_35678_1233" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.71625 5.23469) scale(11.5931)"> <stop offset="0.61" stop-color="#FFE437" stop-opacity="0"/> <stop offset="0.86" stop-color="#FF79B1" stop-opacity="0.45"/> <stop offset="0.99" stop-color="#FF3673" stop-opacity="0.56"/> </radialGradient> <linearGradient id="paint3_linear_35678_1233" x1="7.82656" y1="7.98906" x2="6.09625" y2="9.58094" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint4_linear_35678_1233" x1="8.72687" y1="6.2045" x2="5.90031" y2="8.73388" gradientUnits="userSpaceOnUse"> <stop stop-color="white"/> <stop offset="1" stop-color="white"/> </linearGradient> </defs> </svg> <div style="margin-left: 8px;">Бывший разработчик VK Tools</div></div>';
        break;
      default:
        text = "";
        break;
    }
    tooltipText.insertAdjacentHTML("beforeend", text);
  });

  return tooltipText;
}

function appendIcons(roles) {
  const iconsContainer = document.querySelector(".OwnerPageName__icons");
  if (!iconsContainer) return;

  const svg = createSVG();
  const tooltipText = createTooltipText(roles);

  const tooltip = document.createElement("div");
  tooltip.style.opacity = "0";
  tooltip.style.pointerEvents = "none";
  tooltip.style.position = "absolute";
  tooltip.style.transition = "opacity 0.3s ease";
  tooltip.style.zIndex = "999999";
  tooltip.appendChild(tooltipText);

  svg.addEventListener("mouseenter", function () {
    tooltip.style.opacity = "1";
  });

  svg.addEventListener("mouseleave", function () {
    tooltip.style.opacity = "0";
  });

  iconsContainer.appendChild(svg);
  iconsContainer.appendChild(tooltip);
}
///СТАРЫЙ ДИЗАЙН ЛЕНТЫ И ТАК ДАЛЕЕ///
if (localStorage.getItem("isDefaultTheme") == "true") {
document.arrive('[class^="StoryBlock__noIslandsContainer"]', { existing: true }, function (e) { 
	let styleElement = fromId("storyStyleOld");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "storyStyleOld";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = `
	    [class^="StoryBlock__noIslandsContainer"] {
        background-color:var(--vkui--color_background_content);
        border-radius:var(--vkui--size_border_radius_paper--regular);
        box-shadow:var(--page-block-shadow);
        padding:16px;
    }
    [class^="StoryBlock__noIslandsContainer"]:before {
        content: "`+getLang('reports_strikes_object_story')+`";
        font-family:var(--vk-sans-display,inherit,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai");
        font-size: 17px;
        line-height: 22px;
        font-weight: 600;
    }
    [class^="StoryBlock__noIslandsContainer"] [class^="vkitGrid__root"][class*="vkitGrid__rootHasHorizontalScroll"] {
        margin-top: 12px;
    }
    
    [class^="StoryBlock__noIslandsContainer"] button.vkuiIconButton:has(svg.vkuiIcon--gear_outline_20) {
        opacity:1!important;
        background-color:transparent;
        display:none;
    }
	[class^="StoryBlock__noIslandsContainer"]:hover {
		.vkEnhancerOldStorySettingsButton {
			opacity: 1!important;
		}
	}
	.vkEnhancerOldStorySettingsButton:hover {
		text-decoration:underline;
	}
	`;
	let superPuperSettings = document.createElement('button');
	superPuperSettings.classList.add('vkEnhancerOldStorySettingsButton');
	superPuperSettings.style.color = "var(--vkui_internal--link-color,var(--vkui--color_text_link))";
	superPuperSettings.style.background = "0 0";
	superPuperSettings.style.display = "inline";
	superPuperSettings.style.fontFamily = `-apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif`;
	superPuperSettings.style.border = 0;
	superPuperSettings.style.position = "absolute";
	superPuperSettings.style.right = "12px";
	superPuperSettings.style.opacity = 0;
	superPuperSettings.style.cursor = "pointer";
	superPuperSettings.textContent = getLang('stories_settings');
	superPuperSettings.addEventListener('click', function() {
		window.Stories.showBlackList();
	});
	e.prepend(superPuperSettings);
});

window.onload  = () => {
console.info("[VKENH] Window loaded, awaiting posts");
/*Отложенные и предложенные посты*/
let selectorsText = [`.postponed.Post--redesignV3 [class^='vkitPostText__root']`,`.suggest.Post--redesignV3 [class^='vkitPostText__root']`];
document.arrive(selectorsText, { existing: true }, async function (e) {
		if(!e.querySelector('.PostCopyQuote--redesignV3')) {
		try {
			let postText = e.parentElement;
			let postContent = e.closest('[class^="PostContentContainer__contentContainer"]');
			postText.style.padding = "0px 20px";
			postText.querySelector('[class^="vkitPostText__root"]').style.fontSize = "13px";
			postText.querySelector('[class^="vkitPostText__root"]').style.lineHeight = "1.462";
			e.parentElement.remove();
			postContent.prepend(postText);
		}
		catch(error) {
			console.log(error);
		}
		}
});

let selectorsSub = [`.postponed.Post--redesignV3 .PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item`,`.suggest.Post--redesignV3 .PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item`];
document.arrive(selectorsSub, { existing: true }, async function (e) {
			try {
				let sub = e;
				let removeThis = e.closest('.PostHeaderInfo > .PostHeaderSubtitle');
				let appHere = e.closest('.Post--redesignV3').querySelector('.post_date');
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere.appendChild(separatorInPost);
				appHere.appendChild(sub);
				removeThis.remove();
			}
			catch(error) {
				console.log(error);
			}
});

let selectorsAuthor = [`.postponed.Post--redesignV3 [class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)`,`.suggest.Post--redesignV3 [class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)`];
document.arrive(selectorsAuthor, { existing: true }, async function (e) {
			try {
				
				let isRepost;
				if(!e.closest('.PostCopyQuote--redesignV3'))
				{
					isRepost = '';
				}
				else {
					isRepost = '.PostCopyQuote--redesignV3 ';
				}
				let sub = e.closest(isRepost + '[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]');
				sub.classList.add('vkEnhancerPostAuthorTip');
				let appHere;
				if(isRepost == '') {
					appHere = e.closest('.Post--redesignV3').querySelector('.post_date');
				}
				else {
					appHere = e.closest('.vk_enhancer_copy_post_subhead');
				}
				appHere.style.display = "flex";
				appHere.style.alignItems = "center";
				sub.style.fontSize = "12.5px";
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere.appendChild(separatorInPost);
				appHere.appendChild(sub);
			}
			catch(error) {
				console.log(error);
			}
});

let selectorsDocs = [`.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]`,`.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]`]
document.arrive(selectorsDocs, { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let dataAttachments;
		let dataRepostAttachments;
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass.classList.add('vkEnhancerPostponedPost');
		try {
			dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			console.log(error);
		}
		try {
			dataRepostAttachments = getPostAttaches(docus.closest('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			
		}

			let allDocs = docus;
			let count = 0;
			dataAttachments.item.attachments.forEach(async function (docu) {
			if(docu.doc) {
			let documentCurrent = docu.doc;
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count == 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+documentCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="22" height="22" viewBox="0 0 20 20" style="width: 22px; height: 22px;">
              <path fill="currentColor" fill-rule="evenodd" d="M10.175 1.5H9c-.806 0-1.465.006-2.01.05-.63.052-1.172.16-1.67.413a4.25 4.25 0 0 0-1.857 1.858c-.253.497-.361 1.04-.413 1.67C3 6.103 3 6.864 3 7.816v4.366c0 .952 0 1.713.05 2.327.052.63.16 1.172.413 1.67a4.25 4.25 0 0 0 1.858 1.857c.497.253 1.04.361 1.67.413.613.05 1.374.05 2.326.05h1.366c.952 0 1.713 0 2.327-.05.63-.052 1.172-.16 1.67-.413a4.25 4.25 0 0 0 1.857-1.857c.253-.498.361-1.04.413-1.67.05-.614.05-1.375.05-2.327V8.325c0-.489 0-.733-.055-.963q-.075-.309-.24-.579c-.123-.201-.296-.374-.642-.72l-3.626-3.626c-.346-.346-.519-.519-.72-.642a2 2 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055M15.5 12.15c0 .992 0 1.692-.045 2.238-.044.537-.127.86-.255 1.11A2.75 2.75 0 0 1 14 16.7c-.252.128-.574.21-1.111.255-.546.044-1.245.045-2.238.045h-1.3c-.992 0-1.692 0-2.238-.045-.537-.044-.86-.127-1.11-.255A2.75 2.75 0 0 1 4.8 15.5c-.128-.252-.21-.574-.255-1.111-.044-.546-.045-1.245-.045-2.238v-4.3c0-.992 0-1.692.045-2.238.044-.537.127-.86.255-1.11A2.75 2.75 0 0 1 6.002 3.3c.25-.128.573-.21 1.11-.255C7.658 3.001 8.358 3 9.35 3H10v2.35c0 .409 0 .761.024 1.051.026.306.083.61.238.902.21.398.537.724.935.935.291.155.596.212.902.238.29.024.642.024 1.051.024h2.35zM14.879 7 11.5 3.621V5.32c0 .447 0 .736.02.955.017.21.047.288.067.326a.75.75 0 0 0 .312.312c.038.02.116.05.326.068.22.018.508.019.955.019z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+documentCurrent.title+`</div>
        </div>
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+getDocSize(documentCurrent.size)+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <use xlink:href="#chevron_right_outline_20" style="fill: currentcolor;"></use>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`;
			if(documentCurrent.preview) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+documentCurrent.preview.photo.sizes[0].src+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allDocs.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachDoc);
			}});
		}
});

let selectorsLinks = [`.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])`,`.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])`,`.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])`,`.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])`]
document.arrive(selectorsLinks, { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let dataAttachments;
		let dataRepostAttachments;
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass.classList.add('vkEnhancerPostponedPost');
		try {
			dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			console.log(error);
		}
		try {
			dataRepostAttachments = getPostAttaches(docus.closest('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			
		}

			let allLinks = docus;
			let count = 0;
			dataAttachments.item.attachments.forEach(async function (linkChip) {
			if(linkChip.link) {
			let linkCurrent = linkChip.link;
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count == 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+linkCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.146 3.634c.762-.407 1.512-.534 3.082-.534H10.1a.9.9 0 1 1 0 1.8H8.228c-1.487 0-1.87.128-2.233.322q-.504.27-.773.773c-.194.362-.322.746-.322 2.233v7.544c0 1.487.128 1.87.322 2.233q.27.504.773.774c.362.193.746.321 2.233.321h7.544c1.487 0 1.87-.128 2.233-.321q.504-.27.774-.774c.193-.362.321-.746.321-2.233V13.9a.9.9 0 1 1 1.8 0v1.872c0 1.57-.127 2.32-.534 3.082a3.65 3.65 0 0 1-1.512 1.512c-.763.407-1.512.534-3.082.534H8.228c-1.57 0-2.32-.127-3.082-.534a3.65 3.65 0 0 1-1.512-1.512c-.407-.762-.534-1.512-.534-3.082V8.228c0-1.57.127-2.32.534-3.082a3.65 3.65 0 0 1 1.512-1.512"></path><path d="M14 4a.9.9 0 0 1 .9-.9H20a.9.9 0 0 1 .9.9v5.1a.9.9 0 1 1-1.8 0V6.173l-6.564 6.563a.9.9 0 1 1-1.272-1.272L17.827 4.9H14.9A.9.9 0 0 1 14 4"></path></g>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.title+`</div>
        </div>
        <div class="linkDescr vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.description+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <path fill="currentColor" fill-rule="evenodd" d="M7.47 4.217a.75.75 0 0 0 0 1.06L12.185 10l-4.716 4.72a.75.75 0 1 0 1.062 1.06l5.245-5.25a.75.75 0 0 0 0-1.061L8.531 4.218a.75.75 0 0 0-1.061-.001" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`;
			if(!linkCurrent.description) {
				secondaryAttachDoc.querySelector('.linkDescr').textContent = linkCurrent.url;
			}
			if(linkCurrent.photo) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+linkCurrent.photo.sizes[0].url+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allLinks.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachDoc);
			}});
		}
});

let selectorsArticle = [`.postponed.Post--redesignV3 [class^="vkitSnippetAttachment__root"]`,`.suggest.Post--redesignV3 [class^="vkitSnippetAttachment__root"]`]
document.arrive(selectorsArticle, { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let dataAttachments;
		let dataRepostAttachments;
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass.classList.add('vkEnhancerPostponedPost');
		try {
			dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			console.log(error);
		}
		try {
			dataRepostAttachments = getPostAttaches(docus.closest('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			
		}
			let articleSetClosest = postAppendClass.querySelector('.vkuiDiv [class^="vkitSnippetAttachment__root"]');
			let getArticle = articleSetClosest.parentElement;
			let swapArticle = articleSetClosest.firstChild;
			let f = getArticleInfo(getArticle);
			try {
			if(f.attachment.type == "article") {
				let articleInfo = f.attachment.article;
				let articleUrlShort = articleInfo.url.slice(14)
				let newArticlePreset = document.createElement('a');
				newArticlePreset.classList.add('vk_enhancer_article_snippet','article_snippet','clear_fix')
				newArticlePreset.setAttribute('onclick',`return nav.go('${articleInfo.url}', event);`);
				newArticlePreset.setAttribute('onmouseenter',`articlePrepare('${articleUrlShort}', { ref: '' })`);
				newArticlePreset.setAttribute('data-article-raw-id',articleInfo.owner_id+'_'+articleInfo.id);
				newArticlePreset.setAttribute('data-post-id','');
				newArticlePreset.innerHTML = `
				<div class="article_snippet__image_wrap">
    <div class="article_snippet__image"></div>
  </div>
  <div class="article_snippet__fade"></div>
  <div class="article_snippet__info">

    <div class="article_snippet__deleted_text">Статья удалена</div>
    <div class="article_snippet__title">${articleInfo.title}</div>
    <div class="article_snippet__author">${articleInfo.owner_name}<span class=""></span></div>
    <button style="display:none;" class="PageSnippetFaveButton PageSnippetFaveButton--white" data-state="" data-add="${getLang('fave_add')}" data-remove="${getLang('fave_delete')}" onmouseover="bookmarkTooltip(this)" onclick="bookmarkArticle(event, this, ${articleInfo.owner_id}, ${articleInfo.id}, 'article', '${articleInfo.access_key}', false, true)">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M11.08 3h1.84c1.05 0 1.9 0 2.59.06.7.05 1.31.17 1.88.46.9.46 1.63 1.2 2.09 2.1.29.56.4 1.17.46 1.87.06.69.06 1.54.06 2.6v7.6c0 .78 0 1.42-.05 1.92-.04.5-.14 1.03-.48 1.46-.46.58-1.15.92-1.9.93-.54 0-1.02-.24-1.44-.5-.42-.27-.93-.66-1.55-1.13l-1.61-1.24c-.61-.47-.72-.53-.8-.55a.66.66 0 0 0-.34 0c-.08.02-.19.08-.8.55l-1.61 1.24c-.62.47-1.13.86-1.55 1.13-.42.26-.9.5-1.45.5a2.46 2.46 0 0 1-1.9-.93 2.68 2.68 0 0 1-.47-1.46C4 19.11 4 18.47 4 17.7v-7.62c0-1.05 0-1.9.06-2.59.05-.7.17-1.31.46-1.88.46-.9 1.2-1.63 2.1-2.09.56-.29 1.17-.4 1.87-.46C9.18 3 10.03 3 11.1 3zM8.64 4.85c-.6.05-.94.14-1.2.28-.57.28-1.03.74-1.31 1.3-.14.27-.23.62-.28 1.21-.05.6-.05 1.38-.05 2.48v7.53c0 .83 0 1.4.04 1.8.04.41.1.5.1.5.12.16.3.25.5.25 0 0 .12 0 .47-.22.34-.22.79-.56 1.45-1.07l1.58-1.2.1-.09c.44-.33.85-.65 1.32-.78.42-.1.86-.1 1.28 0 .47.13.88.45 1.32.78l.1.08 1.58 1.21c.66.5 1.1.85 1.45 1.07.35.22.46.22.46.22.2 0 .39-.1.5-.25 0 0 .07-.09.11-.5.04-.4.04-.97.04-1.8v-7.53c0-1.1 0-1.88-.05-2.48-.05-.6-.14-.94-.28-1.2a2.99 2.99 0 0 0-1.3-1.31 3.17 3.17 0 0 0-1.21-.28 33.8 33.8 0 0 0-2.48-.05h-1.76c-1.1 0-1.88 0-2.48.05z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
    </button>
    <div class="article_snippet__buttons">
      <button class="article_snippet__action_btn article_snippet__action_btn--read flat_button">
        <div class="article_snippet__action_btn_icon article_snippet__action_btn_icon--read"></div>
        <div class="article_snippet__action_btn_text">Читать</div>
      </button>
    </div>
  </div>
				`;
				if(articleInfo.photo) {
					newArticlePreset.querySelector('.article_snippet__image').style.backgroundImage = `url(${articleInfo.photo.orig_photo.url})`;
				}
				swapArticle.remove();
				articleSetClosest.appendChild(newArticlePreset);
			}
			} catch(error) {
				console.log(error);
			}
			
		}
});

let selectorsMusic = [`.postponed.Post--redesignV3 [class^="vkitMusicTrackOverlayBadge__root"]`,`.suggest.Post--redesignV3 [class^="vkitMusicTrackOverlayBadge__root"]`]
document.arrive(selectorsMusic, { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let dataAttachments;
		let dataRepostAttachments;
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass.classList.add('vkEnhancerPostponedPost');
		try {
			dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			console.log(error);
		}
		try {
			dataRepostAttachments = getPostAttaches(docus.closest('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			
		}
			if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
                    dataAttachments.item.attachments.forEach(function(music) {
                        if(music.type === "audio" && music.style === "on_media") {
                            let audioElement = document.createElement("div");
			  let titleAud = music.audio.title.replaceAll('"',"'");
			  let artistAud = music.audio.artist.replaceAll('"',"'");
			  let isRestrickted = '';
			  let isAvailableTrack = music.audio.content_restricted?.valueOf() > 0;
			  if(isAvailableTrack?.valueOf() == true) {
								isRestrickted = 'audio_claimed';
			  }
			  
              audioElement.innerHTML = `<div tabindex="0" class="vk_enhancer_in_post_audio audio_row ${isRestrickted} audio_row_with_cover _audio_row _audio_row_${
                music.audio.owner_id
              }_${
                music.audio.id
              } audio_can_add audio_lpb audio_row2 audio_row_playable audio_new_lyrics" data-full-id="${
                music.audio.owner_id
              }_${
                music.audio.id
              }" onclick="return getAudioPlayer().toggleAudio(this, event)" data-audio="[${
                music.audio.id
              },${music.audio.owner_id},&quot;&quot;,&quot;${
                titleAud
              }&quot;,&quot;${
                artistAud
              }&quot;,157,0,0,&quot;&quot;,0,34,&quot;module:${
                music.audio.owner_id
              }&quot;,&quot;[]&quot;,&quot;62efa83eaf32d46ab7\/\/e3727249bcd60c36ee\/\/\/bca050eaeb2ae61a22\/&quot;,&quot;&quot;,{&quot;duration&quot;:${
                music.audio.ads.duration
              },&quot;content_id&quot;:&quot;${music.audio.owner_id}_${
                music.audio.id
              }&quot;,&quot;puid22&quot;:${
                music.audio.ads.puid22
              },&quot;account_age_type&quot;:${
                music.audio.ads.account_age_type
              },&quot;_SITEID&quot;:276,&quot;vk_id&quot;:${
                vk.id
              },&quot;ver&quot;:251116},&quot;&quot;,&quot;&quot;,&quot;&quot;,false,&quot;9c91d4359kPPl-j5wiDD-N-q4xNYySV8d1i8YjJXvg6StjuAn436s3dh-U5Vim743w&quot;,0,0,true,&quot;${
                music.audio.access_key
              }&quot;,false,&quot;&quot;,false]" onmouseover="window.AudioUtils &amp;&amp; window.AudioUtils.onRowOver(this, event, false, '', '${
                music.audio.access_key
              }')" onmouseleave="window.AudioUtils &amp;&amp; window.AudioUtils.onRowLeave(this, event)">
  <div class="audio_row_content _audio_row_content vkEnAudioRow">
    <button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " data-testid="audio_row_play_pause_button" onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button>
    <div class="audio_row__cover audio_row__without_cover"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="song_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="song_24__song_24"><path id="song_24__Bounds" d="M0 0h24v24H0z"></path><path d="M13 11.48v5.65c0 4.52-.87 5.39-4.37 5.85C6.96 23.19 5 22.44 5 19.8c0-1.28.8-2.5 2.46-2.81 1.27-.25-.09.02 2.78-.52.7-.13.77-.37.77-.9V3.97c0-1.24.67-1.69 2.66-2.09l4.68-.87c.37-.07.65.07.65.49v4.05c0 .42-.17.6-.59.68l-4.86.86c-.38.1-.55.36-.55.74v3.64Z" id="song_24__Mask" fill="currentColor"></path></g></g></svg></div>
    <div class="audio_row__cover_back _audio_row__cover_back"></div>
    <div class="audio_row__cover_icon _audio_row__cover_icon">
      <div class="audio_row__play_btn_icon--pause"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6.6c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C6.76 5 7.04 5 7.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45C6 18.24 6 17.96 6 17.4V6.6Zm8 0c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C14.76 5 15.04 5 15.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45c-.11-.21-.11-.49-.11-1.05V6.6Z"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 11.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 8 17.2V6.8a1 1 0 0 1 1.5-.86l9 5.2Z"></path></svg></div>
    </div>
    <div class="audio_row__counter"></div>
    <div class="audio_row__play_btn">
      <div class="audio_row__play_btn_icon--pause"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM10.6 7.1c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3zm5 0c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm5.02-11.13c.64-.39.64-1.36 0-1.74l-6.6-4C9.77 6.75 9 7.23 9 8v8c0 .76.78 1.25 1.41.87z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
    </div>

    <div class="audio_row__inner">
      <div class="audio_row__chart_info">
        
        
      </div>
      <div class="audio_row__performer_title">
        <div onmouseover="setTitle(this)" class="audio_row__performers" data-testid="audio_row_performers"><a href="/audio?performer=1&amp;q=${
          music.audio.artist
        }">${music.audio.artist}</a></div>
        <div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)">
          <a href="" class="audio_row__title_inner _audio_row__title_inner" data-testid="audio_row_title">${
            music.audio.title
          }</a>
          <span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span>
          
        </div>
      </div>
      <div class="audio_row__info _audio_row__info"><div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">${splitDuration(
        music.audio.duration
      )}</div></div>
    </div>

    <div class="audio_player__place _audio_player__place"></div>
  </div>
</div>`;
              function splitDuration(dura) {
                let hours = Math.floor(dura / 3600);
                let minutes = Math.floor((dura % 3600) / 60);
                let seconds = dura % 60;

                if (hours === 0) {
                  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                } else {
                  return `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                }
              }
              docus.closest('[class^="PostContentContainer__contentContainer"]').appendChild(audioElement);
                        }
                    });
                }
		
			
		}
});
/*Обычные посты*/
let wallSelectors = [`[class^='PostDateBlock__root'] > .vkui__root`,`._post.postponed ._post_content`];
document.arrive(wallSelectors, { existing: true }, async function (s) { 
	let e = s.closest('._post.Post--redesignV3');
	if(!e) {
		e = s.closest('.wl_post.Post--redesignV3');
	}
	let styleElement = fromId("postStyleOld");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "postStyleOld";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = `
		.feed_wall--no-islands:has(.Post--redesignV3) {
			background-color: transparent;
			box-shadow: 0 0 0 0 transparent;
		}
	    ._post.Post--redesignV3, ._post.topic_comment, ._post.video_post, #feed_rows .fave_photos_page_block, ._post.photo_post  {
			background-color:var(--vkui--color_background_content)!important;
			border-radius:var(--vkui--size_border_radius_paper--regular)!important;
			box-shadow:var(--page-block-shadow)!important;
		}
		.feed_wall--no-islands .page_block:has(#wall_tabs) {
			background-color:var(--vkui--color_background_content)!important;
			box-shadow:var(--page-block-shadow)!important;
			border-radius:var(--vkui--size_border_radius_paper--regular)!important;
		}
		.PostHeader--redesignV3 .PostHeaderTitle {
			display:flex;
			height: 34px;
			align-items: flex-start;
			flex-direction: column;
		}
		.PostCopyQuote--redesignV3 .copy_post_header_info {
			display:flex;
			height: 32px;
			align-items: flex-start;
			flex-direction: column;
		}
		.PostCopyQuote--redesignV3 .copy_post_date {
			font-size: 12.5px!important;
			margin-left: 0px!important;
		}
		.PostHeader--redesignV3 .PostHeaderTitle__author,.PostCopyQuote--redesignV3 .CopyPost__authorLink,.PostCopyQuote--redesignV3 .CopyPost__author {
			color: var(--vkui--color_text_link)!important;
			font-size: 13px!important;
			font-weight: 500!important;
			line-height: 16px!important;			
		}
		.PostHeader--redesignV3 .PostHeaderTitle__authorBlock {
			height:16px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="vkitPrimaryAttachment__root"]) {
			padding: 6px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="vkitSnippetAttachment__root"]) {
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"]))
		{
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="vkitMediaGrid__root"])
		{
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div > .vkuiAspectRatio:has( > [class^="vkitPrimaryAttachmentAlbum__container"])
		{
			margin: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div > .vkuiAspectRatio > [class^="vkitPrimaryAttachmentAlbum__container"] {
			border-radius: 8px;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="OnMediaAttachmentOverlay__root"])
		{
			padding: 12px 20px 0px!important;
		}

		[class^="PostContentContainer__contentContainer"] div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"])) [class^=VideoPrimaryAttachment]
		{
			width: 510px!important;
		}
		.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"] div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"])) [class^=VideoPrimaryAttachment]
		{
			width: 490px!important;
		}
		.PostHeader--redesignV3 .PostHeader--hasSubtitle {
			justify-content: center;
		}
		.Post--redesignV3 [class^="vkitShowMoreText__after"] > button {
			display: inline-block;
			color: var(--vkui--color_text_link);
			font-weight: 500!important;
			-webkit-font-smoothing: subpixel-antialiased;
		}
		.Post--redesignV3 ._copy_post_img {
			width:40px!important;
			height:40px!important;
		}
		.PostCopyQuote--redesignV3 .CopyPost__headerIcon {
			display:none;
		}
		
		.PostCopyQuote--redesignV3.copy_quote {
			border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha) !important;
			margin-left: 20px !important;
			/*margin-right: 20px;*/
		}
		.PostCopyQuote--redesignV3 .copy_post_header {
			padding: 0 20px;
		}
		[class^="PostContentContainer__contentContainer"]:not(.feed_wall--no-islands [class^="PostContentContainer__contentContainer"]) {
			margin: 0;
		}
		.Post--redesignV3 .wl_post_body_wrap:has(.PostCopyQuote--redesignV3) {
			padding:0;
		}
		.Post--redesignV3 [class^="vkitPrimaryAttachment__root"]:not(:has([href^="/video"])),.Post--redesignV3 [class^="vkitMediaGrid__root"] {
			border-radius:8px;
			box-shadow: 0 0 0 1px var(--vkui--color_separator_secondary);
		}
		#wl_post.Post--redesignV3:not(:has(.PostCopyQuote--redesignV3)) [class^="PostContentContainer__contentContainer"] {
			margin-left:-18px;
		}
		.feed_wall--no-islands .PostCopyQuote--redesignV3 .copy_post_header {
			padding: 0 20px;
		}
		.Post--redesignV3 [class^="PostContentContainer__contentContainer"] .vkuiDiv:has([class^="vkitPostText__root"]) [class*="vkitSpacing__root"] {
			--spacing-gap-size: 6px!important;
		}
		.vkEnhancerGeoTip .PostHeaderSubtitle--withGeo {
			display: flex;
			align-items: center;
			margin-left: 20px;
			cursor: pointer;
		}
		.vkEnhancerGeoTip .PostHeaderSubtitle--withGeo:hover {
			text-decoration:underline;
		}
		.Post--redesignV3 .PostHeaderSubtitle__geoIcon {
			padding-right: 4px;
		}
		.Post--redesignV3 .post_replies_header::before,.Post--redesignV3 .replies_list:before {
			display:none;
		}
		.Post--redesignV3 .post_replies_header {
			border-top: 1px solid var(--vkui--color_separator_primary)!important;
		}
		.vk_enhancer_copy_post_subhead {
			display:flex!important;
			align-items:center;
		}
		.PostCopyQuote--redesignV3 .CopyPost__explain {
			margin-left:2px;
		}
		.PostCopyQuote--redesignV3 .copy_post_header {
			padding: 0 12px!important;
		}
		.PostCopyQuote--redesignV3 .PostContentContainer__root {
			margin-left:-8px;
		}
		.Post--redesignV3 [class^="vkitPostText__root"] {
			font-family:var(--palette-vk-font,-apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif);
			font-size:13px;
		}
		.PostCopyQuote--redesignV3 .published_sec_quote {
			margin-left: 12px!important;
			border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha) !important;
		}
		.PostCopyQuote--redesignV3 .published_sec_quote .copy_post_header_info {
			flex-direction: column;
		}
		.Post--redesignV3 [class^="vkitShowMoreText__after"] {
			position:static!important;
		}
		.Post--redesignV3 [class^="vkitShowMoreText__root"] {
			--show-more-text-blur-size: 0px!important;
			--show-more-text-after-width: auto!important;
		}
		[class*="vkitShowMoreText__rootInline"][class*="vkitShowMoreText__rootHasAfter"]:not([class*="vkitShowMoreText__rootExpanded"]) [class*="vkitShowMoreText__in"] {
			mask: linear-gradient(to top, transparent 0px, #fff 10%)
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper,.Post--redesignV3.PostHeader__coauthorAvatarWrapper {
			width:40px;
			height:40px;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar, .PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar {
			width: 30px;
			height: 30px;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar .AvatarRich, .PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar .AvatarRich, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar .AvatarRich, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar .AvatarRich{
			width: 30px!important;
			height: 30px!important;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper {
			margin-left: 12px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_situational_theme"], .Post--redesignV3 [data-testid="feed_action_button_situational_theme"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_open_url"], .Post--redesignV3 [data-testid="feed_action_button_open_url"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_open_conversation"], .Post--redesignV3 [data-testid="feed_action_button_open_conversation"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_mini_app"], .Post--redesignV3 [data-testid="feed_action_button_mini_app"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 .vkuiDiv > .vkuiLink[class*="vkitLink__link"].vkuiTappable.vkuiTappable--hasPointer-none.vkuiClickable__resetLinkStyle[href^="http"] > .vkuiSimpleCell, .Post--redesignV3 .vkuiDiv > .vkuiLink[class*="vkitLink__link"].vkuiTappable.vkuiTappable--hasPointer-none.vkuiClickable__resetLinkStyle[href^="http"] > .vkuiSimpleCell {
			margin: 8px 0px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper {
			background-color: var(--vkui--color_image_placeholder)!important;
			border-radius: 100%;
			box-shadow:inset 0 0 0 var(--vkui--size_border--regular) var(--vkui--color_image_border_alpha)!important;
		}
		.Post--redesignFooterV3 .PostBottomAction.comment {
			padding-left:14px;
		}
		.Post--redesignV3 .reply:hover {
			background-color:transparent!important;
		}
		.feed_row .Post--redesignV3 .replies:has(.reply_wrap > .AvatarRich) {
			border-top: 1px solid var(--vkui--color_separator_primary)!important;
		}
		.Post--redesignV3 .reply_date:hover {
			text-decoration: underline;
		}
		.Post--redesignV3 .wl_replies_wrap::before {
			display:none;
		}
		.Post--redesignV3 .PostDateBlock__root {
			display:none;
		}
		.post_photos.Post--redesignV3 .vkEnhancerPostDate,.post_photos.Post--redesignV3 .PostHeaderSubtitle__separator {
			display:none;
		}
		.vkitSecondaryAttachment__rootVerticalPaddingRedesign {
			padding-top: 4px;
			padding-bottom: 4px;
		}
		.vkitSecondaryAttachment__rootNoHorizontalPadding {
			padding-left: 0;
			padding-right: 0;
		}
		.vkitSecondaryAttachment__root {
			display: flex;
			align-items: center;
			text-decoration: none;
			border-radius: var(--vkui--size_border_radius--regular);
		}
		.vkitSecondaryAttachment__before {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 8px;
		}
		.vkitSecondaryAttachment__content {
			display: grid;
			grid-template-areas:
				"title progressTime"
				"description progressTime"
				"progressBar progressBar ";
			grid-template-columns: minmax(0, 1fr) auto;
			flex-grow: 1;
			min-width: 0;
		}
		.vkitSecondaryAttachment__title {
			grid-area: title;
			max-width: 100%;
		}
		.vkitTextClamp__root.vkitTextClamp__root {
			display: -webkit-box;
		}
		.vkitSecondaryAttachment__titleText {
			color: var(--vkui--color_text_primary);
			min-width: 0;
		}
		.vkitTextClamp__rootSingleLine {
			word-break: break-all;
		}
		.vkitTextClamp__root {
			overflow: hidden;
			white-space: normal;
			word-break: break-word;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: var(--vkui_internal--textclamp-lines, 1);
			line-clamp: var(--vkui_internal--textclamp-lines, 1);
		}
		.vkitSecondaryAttachment__description {
			grid-area: description;
			display: block;
			color: var(--vkui--color_text_secondary);
			min-width: 0;
			max-width: 100%;
		}
		.vkitSecondaryAttachment__after {
			margin-left: 8px;
		}
		.vkitSecondaryAction__root {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.vkitSecondaryAction__chevron,.vkEnhancer--document_outline_24 path {
			color: var(--vkui--color_icon_secondary);
		}
		.vkEnhancer--document_outline_24 {
			display:flex;
		}
		.vkEnhancerSecondaryAttach:hover {
			opacity:.8;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="https://vk.com/doc"]) {
			display:none;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="http"]:not([class*="vkitLink__secondary"])),.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="/away"]:not([class*="vkitLink__secondary"])) {
			display:none;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"] + .vkuiSpacing--m:not(:first-child) {
			display:none;
		}
		.Post--redesignV3 .vk_enhancer_in_post_audio {
			margin: 6px 20px 0px!important;
		}
		.Post--redesignV3 [class^="vkitMusicOverlayAttachment__attachment"],.Post--redesignV3 [class^="OnMediaAttachmentOverlay__attachment"] {
			display:none;
		}
		.vkEnhancerSecondaryAttachFirst {
			padding:8px 8px 0px 8px!important;
		}
		.Post--redesignV3 .vk_enhancer_article_snippet {
			margin-top:0!important;
		}
		.vkitSecondaryAttachment__after {
			margin-left: 8px;
		}
		.vkitSecondaryAction__root {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.vkitSecondaryAction__iconButtonCircle {
			color: var(--vkui--color_icon_medium);
			background: var(--vkui--color_background_secondary_alpha);
		}	
		.vkitSecondaryAction__iconButton {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 36px;
			height: 36px;
			color: var(--vkui--color_icon_secondary);
			border-radius: 50%;
		}
	`;
	try {
		let postBottom = e.querySelector('[class^="PostDateBlock__root"]');
		let postParentBottom = e.querySelector('[class^="PostDateBlock__root"]').parentElement;
		postBottom.style.display = "none";
		let postBottomNew = document.createElement('div');
		postBottomNew.classList.add('vkEnhancerPostViews');
		let postData;
		try {
		postData = getPostData(postBottom);
		} catch(error) {
		postData = getPostDataNew(postBottom.querySelector('div'));
		}
		/*Просмотры*/
		let isViews;
		if(postData.viewsCount && postData.viewsCount != null && !e.querySelector('.vkEnhancerPostViews')) {
		postBottomNew.innerHTML = `
		<div class="like_views like_views--inActionPanel" role="img" onmouseover="Likes &amp;&amp; Likes.updateViews('wall`+postData.postRaw+`', event);" title="`+getLang('video_N_views_list',postData.viewsCount)+`">
			<span class="like_views__icon "><svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path><path clip-rule="evenodd" d="M15.5 8c0-1-3-5-7.5-5S.5 7 .5 8s3 5 7.5 5 7.5-4 7.5-5zm-4 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" fill-rule="evenodd"></path></g></svg></span>
			<span class="_views" data-count="`+postData.viewsCount+`">`+getFormattedViews(postData.viewsCount)+`</span>
			</div>
		`;
		postParentBottom.appendChild(postBottomNew);
		}
		/*Дата поста*/
		if(!e.querySelector('.vkEnhancerPostDate')) {
			try {
				let postHeader = e.querySelector('[class^="PostHeaderTitle"]');
				let postDate = document.createElement('div');
				postDate.classList.add("PostHeaderSubtitle","PostHeaderSubtitle--layoutDefault","vk_enhancer_post_subhead");
				let xDataPost = '';
				if(postData.author != null) {
					xDataPost += `<b style="font-weight:500">${getLang('wall_post_author_data_author_title')}</b><br><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" href="${postData.author.url}">${postData.author.username}</a>`;
				}
				if(postData.publisher != null) {
					let sex = postData.publisher.sex = postData.publisher.sex === 1 ? 2 : 1; 
					xDataPost += `<br><span style="height:6px; display:block;"></span><b style="font-weight:500">${getLang('wall_post_author_data_published_by_title',sex)}</b><br><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" href="${postData.publisher.url}">${postData.publisher.username}</a>`;
				}
				if(postData.editInfo != null) {
					xDataPost += `<br><span style="height:6px; display:block;"></span><b style="font-weight:500">${getLang('wall_post_author_data_editor_title')}</b><br><div style="display:flex"><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" href="${postData.editInfo.url}">${postData.editInfo.username}</a><div style="color: var(--vkui--color_text_secondary);">​ ​${postData.editInfo.time}</div></div>`;
				}
				postDate.setAttribute('onmouseover',`showHint(this, { 
				text: '${xDataPost}',
				shift: [5, 7],
				hasover: 1,
				width: !1,
				toup: !0,
				forcetodown: !0
				})`);
				postDate.innerHTML = `
				<a class="vkEnhancerPostDate PostHeaderSubtitle__link" href="/wall`+postData.postRaw+`" onclick="return showWiki({w: 'wall`+postData.postRaw+`'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					<time class="PostHeaderSubtitle__item">`+getFormattedPostDate(postData.date)+`</time>
				</a>
				`;
				postHeader.appendChild(postDate);
			}
			catch(error) {
				console.log(error);
			}
		}
		/*Текст поста*/			
		if(!e.querySelector('.PostCopyQuote--redesignV3')) {
		try {
			let postText = e.querySelector('[class^="vkitPostText__root"]').parentElement;
			let postContent = e.querySelector('[class^="PostContentContainer__contentContainer"]');
			postText.style.padding = "0px 20px";
			postText.querySelector('[class^="vkitPostText__root"]').style.fontSize = "13px";
			postText.querySelector('[class^="vkitPostText__root"]').style.lineHeight = "1.462";
			e.querySelector('[class^="vkitPostText__root"]').parentElement.remove();
			postContent.prepend(postText);
		}
		catch(error) {
			/*console.log(error);*/
		}
		}
		/*Репост поста*/
		else {
			try {
			let postType = "post";
			let postText;
			let isCase = '';
			try {
				postText = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitPostText__root"]').parentElement;
				postText.style.padding = "0px 20px";
				postText.querySelector('.PostCopyQuote--redesignV3 [class^="vkitPostText__root"]').style.fontSize = "13px";
				postText.querySelector('.PostCopyQuote--redesignV3 [class^="vkitPostText__root"]').style.lineHeight = "1.462";
				e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitPostText__root"]').parentElement.remove();
			}
			catch(error) {
				postText = document.createElement('div');
			}
			let postContent = e.querySelector('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]');
			try {
				postContent.prepend(postText);
			}
			catch(error) {
				console.log(error);
			}
			/*Дата репоста*/
			let repost = e.querySelector('.PostCopyQuote--redesignV3');
			if(!repost.querySelector('.vkEnhancerPostDate')) {
				let repostID;
				try { 
					repostID = repost.querySelector('.copy_post_image').getAttribute('data-post-id');
				} catch(error) {
					try {
						repostID = repost.querySelector('.PostHeader__coauthorAvatarWrapper').getAttribute('data-item-owner-id') + "_" + repost.querySelector('.PostHeader__coauthorAvatarWrapper').getAttribute('data-item-id');
					}
					catch(error) {
						console.error('[VKENH Error] Не удалось получить данные о репосте - данные о репосте отсутствуют в HTML');
					}
				}
				let repostData;
				try {
					repostData = await vkApi.api('wall.getById',{'posts':repostID});	
				}
				catch(error) {
					try {
						let x = await vkApi.api('wall.getById',{posts:postData.postRaw,extended:1});
						let postInner = x.items[0].copy_history[0];
						repostID = postInner.from_id + "_" + postInner.id;
						repostData = {items:[{date:postInner.date}]};
						postType = postInner.post_type;
						isCase = postType;
						}
					catch (error) {
						console.error('[VKENH Error] Не удалось получить данные о репосте - не найден ID репоста. Вероятнее всего, у репоста удалён соавтор');
					}
				}
				
				let postHeader = repost.querySelector('[class^="copy_post_header_info"]');
				let postDuoHeader = repost.querySelector('[class="CopyPost__author"]').parentElement;
				let postDate = document.createElement('div');
				postDate.classList.add("copy_post_date","vk_enhancer_copy_post_subhead");
				if(isCase == '' || isCase == 'post') {
				try {
				postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall`+repostID+`" onclick="return showWiki({w: 'wall`+repostID+`'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					`+getFormattedPostDate(repostData.items[0].date)+`
				</a>
				`;}
				catch(error) {
					let copyPostQuery = await vkApi.api('wall.getById',{posts:postData.postRaw,extended:1});
					let copyItem = copyPostQuery.items[0].copy_history[0];
					postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall`+copyItem.owner_id+`_`+copyItem.id+`" onclick="return showWiki({w: 'wall`+copyItem.owner_id+`_`+copyItem.id+`'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					`+getFormattedPostDate(copyItem.date)+`
				</a>
				`;
				}
				} else {
				postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/`+postType+repostID+`" onclick="event.preventDefault(); event.stopPropagation(); window.showVideo('` + repostID + `','0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);">
					`+getFormattedPostDate(repostData.items[0].date)+`
				</a>
			`;
				}
			try {
				postHeader.appendChild(postDate);
			}
			catch(error) {
				postDuoHeader.appendChild(postDate);
			}
			}
			}
			catch(error) {
				console.log(error);
			}
		}
		/*сабтайтл перенос в мой*/
		if(e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item')) {
			try {
				let sub = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item');
				let removeThis = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle');
				let appHere = e.querySelector('.vk_enhancer_post_subhead');
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere.appendChild(separatorInPost);
				appHere.appendChild(sub);
				removeThis.remove();
			}
			catch(error) {
				console.log(error);
			}
		}
		if(e.querySelector('.PostHeaderSubtitle:has(.PostHeaderSubtitle--withGeo):not(.vkEnhancerGeoTip)')) {
			try {
				let sub = e.querySelector('.PostHeaderSubtitle:has(.PostHeaderSubtitle--withGeo)');
				sub.classList.add('vkEnhancerGeoTip');
				let removeThis = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle');
				let appHere = e.querySelector('[class^="PostContentContainer__contentContainer"]');
				appHere.appendChild(sub);
			}
			catch(error) {
				console.log(error);
			}
		}
		if(e.querySelector('[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)')) {
			try {
				
				let isRepost;
				if(!e.querySelector('[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)').closest('.PostCopyQuote--redesignV3'))
				{
					isRepost = '';
				}
				else {
					isRepost = '.PostCopyQuote--redesignV3 ';
				}
				let sub = e.querySelector(isRepost + '[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]');
				sub.classList.add('vkEnhancerPostAuthorTip');
				let removeThis = e.querySelector(isRepost + '[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)');
				let appHere;
				if(isRepost == '') {
					appHere = e.querySelector('.vk_enhancer_post_subhead');
				}
				else {
					appHere = e.querySelector('.vk_enhancer_copy_post_subhead');
				}
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere.appendChild(separatorInPost);
				appHere.appendChild(sub);
			}
			catch(error) {
				console.log(error);
			}
			
		}
		/*Пост в посте в посте(кто бы мог подумать)*/
		if(e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .CopyPost__authorLink')) {
			try {
				let appHere = e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .copy_post_header_info');
				let dataSet = e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .CopyPost__authorLink');
				let postOpen = document.createElement('div');
				postOpen.classList.add("copy_post_date","vk_enhancer_copy2_post_subhead");
				postOpen.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall`+dataSet.getAttribute('data-item-owner-id') + "_" + dataSet.getAttribute('data-item-id') + `" onclick="return showWiki({w: 'wall`+dataSet.getAttribute('data-item-owner-id') + "_" + dataSet.getAttribute('data-item-id') + `'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					`+getLang('me_fc_open_wall_post')+`
				</a>`
				appHere.appendChild(postOpen);
			}
			catch(error) {
				console.log(error);
			}
		}
		/*видео название и просмотры в посте*/
		if(e.querySelector('.vkuiDiv > [class^="vkitPrimaryAttachment__root"] [class^="vkitInteractiveWrapper__root"][href^="/video"]:not(.vkEnhancerVideoDescAlready)')) {
			try {
				let v = e.querySelector('[class^="vkitPrimaryAttachment__root"] [class^="vkitInteractiveWrapper__root"][href^="/video"]');
				v.classList.add('vkEnhancerVideoDescAlready');
				let videoDesc = document.createElement('div');
				videoDesc.classList.add('media_desc', 'post_video_desc', 'vk_enhancer_video_desc');
				videoDesc.style.padding = "12px 0 0 0";
				let videoName = v.getAttribute('aria-label');
				let videoList;
				let videoDur = v.getAttribute('data-duration');
				try {
					videoList = v.getAttribute('data-list');
				} catch(error) {
					videoList = '';
				}
				let videoID = v.getAttribute('data-video');
				let x;
				if(videoList != '') {
					x = await vkApi.api('video.get',{'videos':videoID + "_" + videoList});
				} else {
					x = await vkApi.api('video.get',{'videos':videoID});
				}
				let videoViews = x.items[0].views;
				videoDesc.innerHTML = `
				<a class="lnk" id="post_media_lnk" onclick="return showVideo('`+videoID+`',
				'`+videoList+`',
				{'autoplay':1,'queue':1,'user_id':`+vk.id+`,'module':'','skip_checks':false,'addParams':{'post_id':'`+postData.postRaw+`'}},
				event,
				this);"
				href="/video`+videoID+`?`+videoList+`"
				data-video="`+videoID+`"
				data-list="`+videoList+`"
				data-duration="`+videoDur+`"
				aria-label="`+videoName+`"
				>
				<div class="a post_video_title">
				`+videoName+`
				</div>
				<div class="post_video_views_count">`+getLang('video_showcase_N_viewers',videoViews)+`</div>
				</a>
				`;
				v.closest('[class^="vkitPrimaryAttachment__root"]').parentElement.appendChild(videoDesc);
			} catch(error) {
				console.error(error);
			}
			
		}
		/*Кнопка показать следующие комментарии в ленте*/
		/*
		if(e.querySelector('button.replies_next.replies_next_inline[href=""][onclick=""]')) {
			let buttonNextComments = e.querySelector('button.replies_next.replies_next_inline[href=""][onclick=""]');
			try {
				buttonNextComments.setAttribute('onclick','return wall.showNextReplies(this, "'+postData.postRaw+'", event);')
			}
			catch (error) {
				console.error(error);
			}
		}
		*/
		/*Аттач-чипс: документы*/
		let dataAttachments;
		let dataRepostAttachments;
		try {
			dataAttachments = getPostAttaches(e.querySelector('[class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			
		}
		try {
			dataRepostAttachments = getPostAttaches(e.querySelector('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]'));
		} catch(error) {
			
		}
		if(e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="https://vk.com/doc"])') && dataAttachments.item.attachments) {
			let allDocs = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]');
			let count = 0;
			dataAttachments.item.attachments.forEach(async function (docu) {
			if(docu.doc) {
			let documentCurrent = docu.doc;
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count == 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+documentCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="22" height="22" viewBox="0 0 20 20" style="width: 22px; height: 22px;">
              <path fill="currentColor" fill-rule="evenodd" d="M10.175 1.5H9c-.806 0-1.465.006-2.01.05-.63.052-1.172.16-1.67.413a4.25 4.25 0 0 0-1.857 1.858c-.253.497-.361 1.04-.413 1.67C3 6.103 3 6.864 3 7.816v4.366c0 .952 0 1.713.05 2.327.052.63.16 1.172.413 1.67a4.25 4.25 0 0 0 1.858 1.857c.497.253 1.04.361 1.67.413.613.05 1.374.05 2.326.05h1.366c.952 0 1.713 0 2.327-.05.63-.052 1.172-.16 1.67-.413a4.25 4.25 0 0 0 1.857-1.857c.253-.498.361-1.04.413-1.67.05-.614.05-1.375.05-2.327V8.325c0-.489 0-.733-.055-.963q-.075-.309-.24-.579c-.123-.201-.296-.374-.642-.72l-3.626-3.626c-.346-.346-.519-.519-.72-.642a2 2 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055M15.5 12.15c0 .992 0 1.692-.045 2.238-.044.537-.127.86-.255 1.11A2.75 2.75 0 0 1 14 16.7c-.252.128-.574.21-1.111.255-.546.044-1.245.045-2.238.045h-1.3c-.992 0-1.692 0-2.238-.045-.537-.044-.86-.127-1.11-.255A2.75 2.75 0 0 1 4.8 15.5c-.128-.252-.21-.574-.255-1.111-.044-.546-.045-1.245-.045-2.238v-4.3c0-.992 0-1.692.045-2.238.044-.537.127-.86.255-1.11A2.75 2.75 0 0 1 6.002 3.3c.25-.128.573-.21 1.11-.255C7.658 3.001 8.358 3 9.35 3H10v2.35c0 .409 0 .761.024 1.051.026.306.083.61.238.902.21.398.537.724.935.935.291.155.596.212.902.238.29.024.642.024 1.051.024h2.35zM14.879 7 11.5 3.621V5.32c0 .447 0 .736.02.955.017.21.047.288.067.326a.75.75 0 0 0 .312.312c.038.02.116.05.326.068.22.018.508.019.955.019z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+documentCurrent.title+`</div>
        </div>
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+getDocSize(documentCurrent.size)+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <path fill="currentColor" fill-rule="evenodd" d="M7.47 4.217a.75.75 0 0 0 0 1.06L12.185 10l-4.716 4.72a.75.75 0 1 0 1.062 1.06l5.245-5.25a.75.75 0 0 0 0-1.061L8.531 4.218a.75.75 0 0 0-1.061-.001" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`;
			if(documentCurrent.preview) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+documentCurrent.preview.photo.sizes[0].src+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allDocs.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachDoc);
			}});
		} 
		
		if(e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="https://vk.com/doc"])') && dataRepostAttachments.item.attachments) {
			let allDocs = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]');
			let count = 0;
			dataRepostAttachments.item.attachments.forEach(async function (docu) {
			if(docu.doc) {
			let documentCurrent = docu.doc;
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count == 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+documentCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="22" height="22" viewBox="0 0 20 20" style="width: 22px; height: 22px;">
              <path fill="currentColor" fill-rule="evenodd" d="M10.175 1.5H9c-.806 0-1.465.006-2.01.05-.63.052-1.172.16-1.67.413a4.25 4.25 0 0 0-1.857 1.858c-.253.497-.361 1.04-.413 1.67C3 6.103 3 6.864 3 7.816v4.366c0 .952 0 1.713.05 2.327.052.63.16 1.172.413 1.67a4.25 4.25 0 0 0 1.858 1.857c.497.253 1.04.361 1.67.413.613.05 1.374.05 2.326.05h1.366c.952 0 1.713 0 2.327-.05.63-.052 1.172-.16 1.67-.413a4.25 4.25 0 0 0 1.857-1.857c.253-.498.361-1.04.413-1.67.05-.614.05-1.375.05-2.327V8.325c0-.489 0-.733-.055-.963q-.075-.309-.24-.579c-.123-.201-.296-.374-.642-.72l-3.626-3.626c-.346-.346-.519-.519-.72-.642a2 2 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055M15.5 12.15c0 .992 0 1.692-.045 2.238-.044.537-.127.86-.255 1.11A2.75 2.75 0 0 1 14 16.7c-.252.128-.574.21-1.111.255-.546.044-1.245.045-2.238.045h-1.3c-.992 0-1.692 0-2.238-.045-.537-.044-.86-.127-1.11-.255A2.75 2.75 0 0 1 4.8 15.5c-.128-.252-.21-.574-.255-1.111-.044-.546-.045-1.245-.045-2.238v-4.3c0-.992 0-1.692.045-2.238.044-.537.127-.86.255-1.11A2.75 2.75 0 0 1 6.002 3.3c.25-.128.573-.21 1.11-.255C7.658 3.001 8.358 3 9.35 3H10v2.35c0 .409 0 .761.024 1.051.026.306.083.61.238.902.21.398.537.724.935.935.291.155.596.212.902.238.29.024.642.024 1.051.024h2.35zM14.879 7 11.5 3.621V5.32c0 .447 0 .736.02.955.017.21.047.288.067.326a.75.75 0 0 0 .312.312c.038.02.116.05.326.068.22.018.508.019.955.019z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+documentCurrent.title+`</div>
        </div>
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+getDocSize(documentCurrent.size)+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <path fill="currentColor" fill-rule="evenodd" d="M7.47 4.217a.75.75 0 0 0 0 1.06L12.185 10l-4.716 4.72a.75.75 0 1 0 1.062 1.06l5.245-5.25a.75.75 0 0 0 0-1.061L8.531 4.218a.75.75 0 0 0-1.061-.001" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`;
			if(documentCurrent.preview) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+documentCurrent.preview.photo.sizes[0].src+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allDocs.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachDoc);
			}});
		}
		/*Музыка на фото*/
		if(e.querySelector('[class^="vkitMusicTrackOverlayBadge__root"]')) {
			let x = e.querySelector('[class^="vkitMusicTrackOverlayBadge__root"]');
			if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
                    dataAttachments.item.attachments.forEach(function(music) {
                        if(music.type === "audio" && music.style === "on_media") {
                            let audioElement = document.createElement("div");
							//audioElement.classList.add('audio_w_covers');
							let isAvailableTrack = music.audio.content_restricted?.valueOf() > 0;
							let isRestrickted = '';
							if(isAvailableTrack?.valueOf() == true) {
								isRestrickted = 'audio_claimed';
							}
			  let titleAud = music.audio.title.replaceAll('"',"'");
			  let artistAud = music.audio.artist.replaceAll('"',"'");
              audioElement.innerHTML = `<div tabindex="0" class="vk_enhancer_in_post_audio audio_row ${isRestrickted} audio_row_with_cover _audio_row _audio_row_${
                music.audio.owner_id
              }_${
                music.audio.id
              } audio_can_add audio_row2 audio_row_playable" data-full-id="${
                music.audio.owner_id
              }_${
                music.audio.id
              }" onclick="return getAudioPlayer().toggleAudio(this, event)" data-audio="[${
                music.audio.id
              },${music.audio.owner_id},&quot;&quot;,&quot;${
                titleAud
              }&quot;,&quot;${
                artistAud
              }&quot;,157,0,0,&quot;&quot;,0,34,&quot;my:my_audios&quot;,&quot;[]&quot;,&quot;3e8cdfd5a11f7bb4a5\/8aaf2d333742261dd0\/c475d689c9416c918c\/461c9aa17f026bb20c\/\/0e75de100e99ef17ec\/3e835a4ecc5ff99a2a&quot;,&quot;&quot;,{&quot;duration&quot;:${
                music.audio.ads.duration
              },&quot;content_id&quot;:&quot;${music.audio.owner_id}_${
                music.audio.id
              }&quot;,&quot;puid22&quot;:${
                music.audio.ads.puid22?.valueOf() || 11
              },&quot;account_age_type&quot;:${
                music.audio.ads.account_age_type
              },&quot;_SITEID&quot;:276,&quot;vk_id&quot;:${
                vk.id
              },&quot;ver&quot;:251116},&quot;&quot;,&quot;&quot;,&quot;&quot;,false,&quot;e4cff92eZml8iFLTMTK-fJ2P469iWcmgLIP03FFV2E6sfIYHm7xfWzPLQtJmMrpuhZesiXJXx7Y2m_-QaYwIryRPtjG3lx4FdZQJiiR160y_tQM8nyMnVdJ4z-1p&quot;,0,0,true,&quot;${
                music.audio.access_key
              }&quot;,false,&quot;&quot;,false,&quot;&quot;,&quot;&quot;,0]" onmouseover="window.AudioUtils &amp;&amp; window.AudioUtils.onRowOver(this, event, false, '', '${
                music.audio.access_key
              }')" onmouseleave="window.AudioUtils &amp;&amp; window.AudioUtils.onRowLeave(this, event)">
  <div class="audio_row_content _audio_row_content vkEnAudioRow">
    <button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " data-testid="audio_row_play_pause_button" onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button>
    <div class="audio_row__cover audio_row__without_cover">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="song_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="song_24__song_24">
            <path id="song_24__Bounds" d="M0 0h24v24H0z"></path>
            <path d="M13 11.48v5.65c0 4.52-.87 5.39-4.37 5.85C6.96 23.19 5 22.44 5 19.8c0-1.28.8-2.5 2.46-2.81 1.27-.25-.09.02 2.78-.52.7-.13.77-.37.77-.9V3.97c0-1.24.67-1.69 2.66-2.09l4.68-.87c.37-.07.65.07.65.49v4.05c0 .42-.17.6-.59.68l-4.86.86c-.38.1-.55.36-.55.74v3.64Z" id="song_24__Mask" fill="currentColor"></path>
          </g>
        </g>
      </svg>
    </div>
    <div class="audio_row__cover_back _audio_row__cover_back"></div>
    <div class="audio_row__cover_icon _audio_row__cover_icon">
      <div class="audio_row__play_btn_icon--pause">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6.6c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C6.76 5 7.04 5 7.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45C6 18.24 6 17.96 6 17.4V6.6Zm8 0c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C14.76 5 15.04 5 15.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45c-.11-.21-.11-.49-.11-1.05V6.6Z"></path>
        </svg>
      </div>
      <div class="audio_row__play_btn_icon--play">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.5 11.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 8 17.2V6.8a1 1 0 0 1 1.5-.86l9 5.2Z"></path>
        </svg>
      </div>
    </div>
    <div class="audio_row__counter"></div>
    <div class="audio_row__play_btn">
      <div class="audio_row__play_btn_icon--pause">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM10.6 7.1c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3zm5 0c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3z" fill="currentColor" fill-rule="evenodd"></path>
        </svg>
      </div>
      <div class="audio_row__play_btn_icon--play">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm5.02-11.13c.64-.39.64-1.36 0-1.74l-6.6-4C9.77 6.75 9 7.23 9 8v8c0 .76.78 1.25 1.41.87z" fill="currentColor" fill-rule="evenodd"></path>
        </svg>
      </div>
    </div>

    <div class="audio_row__inner">
      <div class="audio_row__chart_info">

      </div>
      <div class="audio_row__performer_title">
        <div onmouseover="setTitle(this)" class="audio_row__performers" data-testid="audio_row_performers"><a href="/audio?performer=1&amp;q=${
          music.audio.artist
        }">${music.audio.artist}</a></div>
        <div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)" title="${
            music.audio.title
          }">
          <span class="audio_row__title_inner_icon"></span>
          <a href="" class="audio_row__title_inner _audio_row__title_inner" data-testid="audio_row_title">${
            music.audio.title
          }</a>
          <span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span>

        </div>
      </div>
      <div class="audio_row__info _audio_row__info">
        <div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">${splitDuration(
        music.audio.duration
      )}</div>
      </div>
    </div>

    <div class="audio_player__place _audio_player__place"></div>
  </div>
</div>`;
              function splitDuration(dura) {
                let hours = Math.floor(dura / 3600);
                let minutes = Math.floor((dura % 3600) / 60);
                let seconds = dura % 60;

                if (hours === 0) {
                  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                } else {
                  return `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                }
              }
              x.closest('[class^="PostContentContainer__contentContainer"]').appendChild(audioElement);
                        }
                    });
                }
		}
		
		if(e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicTrackOverlayBadge__root"]')) {
			let x = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicTrackOverlayBadge__root"]');
			if (dataRepostAttachments && dataRepostAttachments.item && dataRepostAttachments.item.attachments) {
                    dataRepostAttachments.item.attachments.forEach(function(music) {
                        if(music.type === "audio" && music.style === "on_media") {
                            let audioElement = document.createElement("div");
							let titleAud = music.audio.title.replaceAll('"',"'");
							let artistAud = music.audio.artist.replaceAll('"',"'");
							let isAvailableTrack = music.audio.content_restricted?.valueOf() > 0;
							let isRestrickted = '';
							if(isAvailableTrack?.valueOf() == true) {
								isRestrickted = 'audio_claimed';
							}
              audioElement.innerHTML = `<div tabindex="0" class="vk_enhancer_in_post_audio audio_row ${isRestrickted} audio_row_with_cover _audio_row _audio_row_${
                music.audio.owner_id
              }_${
                music.audio.id
              } audio_can_add audio_lpb audio_row2 audio_row_playable audio_new_lyrics" data-full-id="${
                music.audio.owner_id
              }_${
                music.audio.id
              }" onclick="return getAudioPlayer().toggleAudio(this, event)" data-audio="[${
                music.audio.id
              },${music.audio.owner_id},&quot;&quot;,&quot;${
                titleAud
              }&quot;,&quot;${
                artistAud
              }&quot;,157,0,0,&quot;&quot;,0,34,&quot;module:${
                music.audio.owner_id
              }&quot;,&quot;[]&quot;,&quot;62efa83eaf32d46ab7\/\/e3727249bcd60c36ee\/\/\/bca050eaeb2ae61a22\/&quot;,&quot;&quot;,{&quot;duration&quot;:${
                music.audio.ads.duration
              },&quot;content_id&quot;:&quot;${music.audio.owner_id}_${
                music.audio.id
              }&quot;,&quot;puid22&quot;:${
                music.audio.ads.puid22?.valueOf() || 11
              },&quot;account_age_type&quot;:${
                music.audio.ads.account_age_type
              },&quot;_SITEID&quot;:276,&quot;vk_id&quot;:${
                vk.id
              },&quot;ver&quot;:251116},&quot;&quot;,&quot;&quot;,&quot;&quot;,false,&quot;9c91d4359kPPl-j5wiDD-N-q4xNYySV8d1i8YjJXvg6StjuAn436s3dh-U5Vim743w&quot;,0,0,true,&quot;${
                music.audio.access_key
              }&quot;,false,&quot;&quot;,false]" onmouseover="window.AudioUtils &amp;&amp; window.AudioUtils.onRowOver(this, event, false, '', '${
                music.audio.access_key
              }')" onmouseleave="window.AudioUtils &amp;&amp; window.AudioUtils.onRowLeave(this, event)">
  <div class="audio_row_content _audio_row_content vkEnAudioRow">
    <button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " data-testid="audio_row_play_pause_button" onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button>
    <div class="audio_row__cover audio_row__without_cover"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="song_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="song_24__song_24"><path id="song_24__Bounds" d="M0 0h24v24H0z"></path><path d="M13 11.48v5.65c0 4.52-.87 5.39-4.37 5.85C6.96 23.19 5 22.44 5 19.8c0-1.28.8-2.5 2.46-2.81 1.27-.25-.09.02 2.78-.52.7-.13.77-.37.77-.9V3.97c0-1.24.67-1.69 2.66-2.09l4.68-.87c.37-.07.65.07.65.49v4.05c0 .42-.17.6-.59.68l-4.86.86c-.38.1-.55.36-.55.74v3.64Z" id="song_24__Mask" fill="currentColor"></path></g></g></svg></div>
    <div class="audio_row__cover_back _audio_row__cover_back"></div>
    <div class="audio_row__cover_icon _audio_row__cover_icon">
      <div class="audio_row__play_btn_icon--pause"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6.6c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C6.76 5 7.04 5 7.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45C6 18.24 6 17.96 6 17.4V6.6Zm8 0c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C14.76 5 15.04 5 15.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45c-.11-.21-.11-.49-.11-1.05V6.6Z"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 11.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 8 17.2V6.8a1 1 0 0 1 1.5-.86l9 5.2Z"></path></svg></div>
    </div>
    <div class="audio_row__counter"></div>
    <div class="audio_row__play_btn">
      <div class="audio_row__play_btn_icon--pause"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM10.6 7.1c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3zm5 0c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm5.02-11.13c.64-.39.64-1.36 0-1.74l-6.6-4C9.77 6.75 9 7.23 9 8v8c0 .76.78 1.25 1.41.87z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
    </div>

    <div class="audio_row__inner">
      <div class="audio_row__chart_info">
        
        
      </div>
      <div class="audio_row__performer_title">
        <div onmouseover="setTitle(this)" class="audio_row__performers" data-testid="audio_row_performers"><a href="/audio?performer=1&amp;q=${
          music.audio.artist
        }">${music.audio.artist}</a></div>
        <div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)">
          <a href="" class="audio_row__title_inner _audio_row__title_inner" data-testid="audio_row_title">${
            music.audio.title
          }</a>
          <span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span>
          
        </div>
      </div>
      <div class="audio_row__info _audio_row__info"><div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">${splitDuration(
        music.audio.duration
      )}</div></div>
    </div>

    <div class="audio_player__place _audio_player__place"></div>
  </div>
</div>`;
              function splitDuration(dura) {
                let hours = Math.floor(dura / 3600);
                let minutes = Math.floor((dura % 3600) / 60);
                let seconds = dura % 60;

                if (hours === 0) {
                  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
                } else {
                  return `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                }
              }
              x.closest('[class^="PostContentContainer__contentContainer"]').appendChild(audioElement);
                        }
                    });
                }
		}
		/*Плейлист на фото*/
		if(e.querySelector('[class^="vkitMusicPlaylistOverlayBadge__root"]')) {
			let x = e.querySelector('[class^="vkitMusicPlaylistOverlayBadge__root"]');
			if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
                    dataAttachments.item.attachments.forEach(function(music) {
                        if(music.type === "audio_playlist" && music.style === "on_media") {
							let pListInfo = music.audio_playlist;
                            let secondaryAttachPlist = document.createElement('div');
			secondaryAttachPlist.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			secondaryAttachPlist.classList.add('vkEnhancerSecondaryAttachFirst');
			secondaryAttachPlist.style.padding = "0px 8px";
			secondaryAttachPlist.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
			<div onclick="return AudioUtils.showAudioPlaylist(${pListInfo.owner_id}, ${pListInfo.id}, '', 'group_wall', event);" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
  <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
    <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
      <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
	    <div class="vkuiImageBase__fallback">
    <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--playlist_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
      <g fill="currentColor"><path d="M11.295 19.247c1.87 1.896 5.505.02 5.505-3.548v-5.054l2.399-.697A2.74 2.74 0 0 0 21 7.364l-.01-1.72a.75.75 0 0 0-.906-.623l-.267.061c-.941.215-1.886.431-2.807.721-1.332.45-2.03 1.614-2.01 3.077V14c-3.887.196-5.639 3.286-3.705 5.247M3.9 5.1a.9.9 0 1 0 0 1.8h8.197a.9.9 0 1 0 0-1.8zM3.9 10.1a.9.9 0 1 0 0 1.8h7.196a.9.9 0 1 0 0-1.8zM3 16a.9.9 0 0 1 .9-.9h4.183a.9.9 0 0 1 0 1.8H3.9A.9.9 0 0 1 3 16"></path></g>
    </svg>
  </div>
        <div class="vkuiImageBase__children"></div>
        <div aria-hidden="true" class="vkuiImageBase__border"></div>
      </div>
    </div>
    <div class="vkitSecondaryAttachment__content">
      <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">
		${pListInfo.title}
		</div>
      </div>
      <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">
	  ${pListInfo.description}
	  </div>
      <div class="vkitSecondaryAttachment__progressBarContent">
        <div class="vkitSecondaryAttachment__progressBar"></div>
      </div>
    </div>
    <div onclick="event.preventDefault(); event.stopPropagation(); getAudioPlayer().playPlaylist(${pListInfo.owner_id}, ${pListInfo.id}, '', 'group_wall')" class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
      <div class="vkitSecondaryAction__root">
        <div class="vkitSecondaryAction__iconButton vkitSecondaryAction__iconButtonCircle vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--play_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
            <path fill="currentColor" d="M18.5 11.134a1 1 0 0 1 0 1.732l-9 5.196a1 1 0 0 1-1.5-.866V6.804a1 1 0 0 1 1.5-.866z"></path>
          </svg><span aria-hidden="true" class="vkuiTappable__stateLayer"></span></div>
      </div>
    </div>
  </div>
</div>
</div>`;
			if(pListInfo.photo) {
				let fallBack = secondaryAttachPlist.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+pListInfo.photo.photo_270+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
              x.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachPlist);
                        }
                    });
                }
		}
		
		if(e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicPlaylistOverlayBadge__root"]')) {
			let x = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicPlaylistOverlayBadge__root"]');
			if (dataRepostAttachments && dataRepostAttachments.item && dataRepostAttachments.item.attachments) {
                    dataRepostAttachments.item.attachments.forEach(function(music) {
                        if(music.type === "audio_playlist" && music.style === "on_media") {
							let pListInfo = music.audio_playlist;
                            let secondaryAttachPlist = document.createElement('div');
			secondaryAttachPlist.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			secondaryAttachPlist.classList.add('vkEnhancerSecondaryAttachFirst');
			secondaryAttachPlist.style.padding = "0px 8px";
			secondaryAttachPlist.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
			<div onclick="return AudioUtils.showAudioPlaylist(${pListInfo.owner_id}, ${pListInfo.id}, '', 'group_wall', event);" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
  <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
    <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
      <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
	    <div class="vkuiImageBase__fallback">
    <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--playlist_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
      <g fill="currentColor"><path d="M11.295 19.247c1.87 1.896 5.505.02 5.505-3.548v-5.054l2.399-.697A2.74 2.74 0 0 0 21 7.364l-.01-1.72a.75.75 0 0 0-.906-.623l-.267.061c-.941.215-1.886.431-2.807.721-1.332.45-2.03 1.614-2.01 3.077V14c-3.887.196-5.639 3.286-3.705 5.247M3.9 5.1a.9.9 0 1 0 0 1.8h8.197a.9.9 0 1 0 0-1.8zM3.9 10.1a.9.9 0 1 0 0 1.8h7.196a.9.9 0 1 0 0-1.8zM3 16a.9.9 0 0 1 .9-.9h4.183a.9.9 0 0 1 0 1.8H3.9A.9.9 0 0 1 3 16"></path></g>
    </svg>
  </div>
        <div class="vkuiImageBase__children"></div>
        <div aria-hidden="true" class="vkuiImageBase__border"></div>
      </div>
    </div>
    <div class="vkitSecondaryAttachment__content">
      <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">
		${pListInfo.title}
		</div>
      </div>
      <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">
	  ${pListInfo.description}
	  </div>
      <div class="vkitSecondaryAttachment__progressBarContent">
        <div class="vkitSecondaryAttachment__progressBar"></div>
      </div>
    </div>
    <div onclick="event.preventDefault(); event.stopPropagation(); getAudioPlayer().playPlaylist(${pListInfo.owner_id}, ${pListInfo.id}, '', 'group_wall')" class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
      <div class="vkitSecondaryAction__root">
        <div class="vkitSecondaryAction__iconButton vkitSecondaryAction__iconButtonCircle vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--play_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
            <path fill="currentColor" d="M18.5 11.134a1 1 0 0 1 0 1.732l-9 5.196a1 1 0 0 1-1.5-.866V6.804a1 1 0 0 1 1.5-.866z"></path>
          </svg><span aria-hidden="true" class="vkuiTappable__stateLayer"></span></div>
      </div>
    </div>
  </div>
</div>
</div>`;
			if(pListInfo.photo) {
				let fallBack = secondaryAttachPlist.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+pListInfo.photo.photo_270+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
              x.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachPlist);
                        }
                    });
                }
		}
		
		/*Аттач-чипс - ссылки*/
		
		if((e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="http"]:not([class*="vkitLink__secondary"]))') || e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="/away"]:not([class*="vkitLink__secondary"]))')) && dataAttachments.item.attachments) {
			let allLinks = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])');
			if(!allLinks) {
				allLinks = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])')
			}
			let count = 0;
			dataAttachments.item.attachments.forEach(async function (linkChip) {
			if(linkChip.link) {
			let linkCurrent = linkChip.link;
			//console.log(linkCurrent);
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count == 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+linkCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.146 3.634c.762-.407 1.512-.534 3.082-.534H10.1a.9.9 0 1 1 0 1.8H8.228c-1.487 0-1.87.128-2.233.322q-.504.27-.773.773c-.194.362-.322.746-.322 2.233v7.544c0 1.487.128 1.87.322 2.233q.27.504.773.774c.362.193.746.321 2.233.321h7.544c1.487 0 1.87-.128 2.233-.321q.504-.27.774-.774c.193-.362.321-.746.321-2.233V13.9a.9.9 0 1 1 1.8 0v1.872c0 1.57-.127 2.32-.534 3.082a3.65 3.65 0 0 1-1.512 1.512c-.763.407-1.512.534-3.082.534H8.228c-1.57 0-2.32-.127-3.082-.534a3.65 3.65 0 0 1-1.512-1.512c-.407-.762-.534-1.512-.534-3.082V8.228c0-1.57.127-2.32.534-3.082a3.65 3.65 0 0 1 1.512-1.512"></path><path d="M14 4a.9.9 0 0 1 .9-.9H20a.9.9 0 0 1 .9.9v5.1a.9.9 0 1 1-1.8 0V6.173l-6.564 6.563a.9.9 0 1 1-1.272-1.272L17.827 4.9H14.9A.9.9 0 0 1 14 4"></path></g>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.title+`</div>
        </div>
        <div class="linkDescr vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.description+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <path fill="currentColor" fill-rule="evenodd" d="M7.47 4.217a.75.75 0 0 0 0 1.06L12.185 10l-4.716 4.72a.75.75 0 1 0 1.062 1.06l5.245-5.25a.75.75 0 0 0 0-1.061L8.531 4.218a.75.75 0 0 0-1.061-.001" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`;
			if(!linkCurrent.description) {
				secondaryAttachDoc.querySelector('.linkDescr').textContent = linkCurrent.url;
			}
			if(linkCurrent.photo) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+linkCurrent.photo.sizes[0].url+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allLinks.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachDoc);
			allLinks.closest('[class^="vkitChipAttachment__root"]').remove();
			}});
		}
		
		if((e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="http"]:not([class*="vkitLink__secondary"]))') || e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="/away"]:not([class*="vkitLink__secondary"]))')) && dataRepostAttachments.item.attachments) {
			let allLinks = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])');
			if(!allLinks) {
				allLinks = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])')
			}
			let count = 0;
			dataRepostAttachments.item.attachments.forEach(async function (linkChip) {
			if(linkChip.link) {
			let linkCurrent = linkChip.link;
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count == 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+linkCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.146 3.634c.762-.407 1.512-.534 3.082-.534H10.1a.9.9 0 1 1 0 1.8H8.228c-1.487 0-1.87.128-2.233.322q-.504.27-.773.773c-.194.362-.322.746-.322 2.233v7.544c0 1.487.128 1.87.322 2.233q.27.504.773.774c.362.193.746.321 2.233.321h7.544c1.487 0 1.87-.128 2.233-.321q.504-.27.774-.774c.193-.362.321-.746.321-2.233V13.9a.9.9 0 1 1 1.8 0v1.872c0 1.57-.127 2.32-.534 3.082a3.65 3.65 0 0 1-1.512 1.512c-.763.407-1.512.534-3.082.534H8.228c-1.57 0-2.32-.127-3.082-.534a3.65 3.65 0 0 1-1.512-1.512c-.407-.762-.534-1.512-.534-3.082V8.228c0-1.57.127-2.32.534-3.082a3.65 3.65 0 0 1 1.512-1.512"></path><path d="M14 4a.9.9 0 0 1 .9-.9H20a.9.9 0 0 1 .9.9v5.1a.9.9 0 1 1-1.8 0V6.173l-6.564 6.563a.9.9 0 1 1-1.272-1.272L17.827 4.9H14.9A.9.9 0 0 1 14 4"></path></g>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.title+`</div>
        </div>
        <div class="linkDescr vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.description+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <path fill="currentColor" fill-rule="evenodd" d="M7.47 4.217a.75.75 0 0 0 0 1.06L12.185 10l-4.716 4.72a.75.75 0 1 0 1.062 1.06l5.245-5.25a.75.75 0 0 0 0-1.061L8.531 4.218a.75.75 0 0 0-1.061-.001" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`;
			if(!linkCurrent.description) {
				secondaryAttachDoc.querySelector('.linkDescr').textContent = linkCurrent.url;
			}
			if(linkCurrent.photo) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage');
				fallBack.querySelector('.vkuiImageBase__fallback').remove();
				fallBack.style.background = "url("+linkCurrent.photo.sizes[0].url+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allLinks.closest('[class^="PostContentContainer__contentContainer"]').appendChild(secondaryAttachDoc);
			allLinks.closest('[class^="vkitChipAttachment__root"]').remove();
			}});
		}
		
		/*Статьи*/
		if(e.querySelector('[class^="vkitSnippetAttachment__root"]:not(:has(.vkuiIcon--delete_outline_56))') && dataAttachments.item.attachments) {
			let articleSetClosest = e.querySelector('.vkuiDiv [class^="vkitSnippetAttachment__root"]');
			let getArticle = articleSetClosest.parentElement;
			let swapArticle = articleSetClosest.firstChild;
			let f = getArticleInfo(getArticle);
			try {
			if(f.attachment.type == "article") {
				let articleInfo = f.attachment.article;
				let articleUrlShort = articleInfo.url.slice(14)
				let newArticlePreset = document.createElement('a');
				newArticlePreset.classList.add('vk_enhancer_article_snippet','article_snippet','clear_fix')
				newArticlePreset.setAttribute('onclick',`return nav.go('${articleInfo.url}', event);`);
				newArticlePreset.setAttribute('onmouseenter',`articlePrepare('${articleUrlShort}', { ref: '' })`);
				newArticlePreset.setAttribute('data-article-raw-id',articleInfo.owner_id+'_'+articleInfo.id);
				newArticlePreset.setAttribute('data-post-id','');
				newArticlePreset.innerHTML = `
				<div class="article_snippet__image_wrap">
    <div class="article_snippet__image"></div>
  </div>
  <div class="article_snippet__fade"></div>
  <div class="article_snippet__info">

    <div class="article_snippet__deleted_text">Статья удалена</div>
    <div class="article_snippet__title">${articleInfo.title}</div>
    <div class="article_snippet__author">${articleInfo.owner_name}<span class=""></span></div>
    <button style="display:none;" class="PageSnippetFaveButton PageSnippetFaveButton--white" data-state="" data-add="${getLang('fave_add')}" data-remove="${getLang('fave_delete')}" onmouseover="bookmarkTooltip(this)" onclick="bookmarkArticle(event, this, ${articleInfo.owner_id}, ${articleInfo.id}, 'article', '${articleInfo.access_key}', false, true)">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M11.08 3h1.84c1.05 0 1.9 0 2.59.06.7.05 1.31.17 1.88.46.9.46 1.63 1.2 2.09 2.1.29.56.4 1.17.46 1.87.06.69.06 1.54.06 2.6v7.6c0 .78 0 1.42-.05 1.92-.04.5-.14 1.03-.48 1.46-.46.58-1.15.92-1.9.93-.54 0-1.02-.24-1.44-.5-.42-.27-.93-.66-1.55-1.13l-1.61-1.24c-.61-.47-.72-.53-.8-.55a.66.66 0 0 0-.34 0c-.08.02-.19.08-.8.55l-1.61 1.24c-.62.47-1.13.86-1.55 1.13-.42.26-.9.5-1.45.5a2.46 2.46 0 0 1-1.9-.93 2.68 2.68 0 0 1-.47-1.46C4 19.11 4 18.47 4 17.7v-7.62c0-1.05 0-1.9.06-2.59.05-.7.17-1.31.46-1.88.46-.9 1.2-1.63 2.1-2.09.56-.29 1.17-.4 1.87-.46C9.18 3 10.03 3 11.1 3zM8.64 4.85c-.6.05-.94.14-1.2.28-.57.28-1.03.74-1.31 1.3-.14.27-.23.62-.28 1.21-.05.6-.05 1.38-.05 2.48v7.53c0 .83 0 1.4.04 1.8.04.41.1.5.1.5.12.16.3.25.5.25 0 0 .12 0 .47-.22.34-.22.79-.56 1.45-1.07l1.58-1.2.1-.09c.44-.33.85-.65 1.32-.78.42-.1.86-.1 1.28 0 .47.13.88.45 1.32.78l.1.08 1.58 1.21c.66.5 1.1.85 1.45 1.07.35.22.46.22.46.22.2 0 .39-.1.5-.25 0 0 .07-.09.11-.5.04-.4.04-.97.04-1.8v-7.53c0-1.1 0-1.88-.05-2.48-.05-.6-.14-.94-.28-1.2a2.99 2.99 0 0 0-1.3-1.31 3.17 3.17 0 0 0-1.21-.28 33.8 33.8 0 0 0-2.48-.05h-1.76c-1.1 0-1.88 0-2.48.05z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
    </button>
    <div class="article_snippet__buttons">
      <button class="article_snippet__action_btn article_snippet__action_btn--read flat_button">
        <div class="article_snippet__action_btn_icon article_snippet__action_btn_icon--read"></div>
        <div class="article_snippet__action_btn_text">Читать</div>
      </button>
    </div>
  </div>
				`;
				if(articleInfo.photo) {
					newArticlePreset.querySelector('.article_snippet__image').style.backgroundImage = `url(${articleInfo.photo.orig_photo.url})`;
				}
				swapArticle.remove();
				articleSetClosest.appendChild(newArticlePreset);
			}
			} catch(error) {
				console.log(error);
			}
		}
		
		
	}
	catch(error) {
		console.log(error);
	}
});
}
}

function getArticleInfo(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedProps.children.props;
}

function getPostFiber(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber;
}

function getPostAttaches(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedProps.children[0].props;
}

function getDocSize(docSize) {
	if (!docSize) return "";
    switch (!0) {
        case docSize >= (2 ** 30):
            return getLang("calls_decoded_page_doc_size_gb").replace(/{size}/g, String(Number((docSize / (2 ** 30)).toFixed(1))) + " ").toUpperCase();
        case docSize >= (2 ** 20):
            return getLang("calls_decoded_page_doc_size_mb").replace(/{size}/g, String(Number((docSize / (2 ** 20)).toFixed(1))) + " ").toUpperCase();
        case docSize >= 1024:
            return getLang("calls_decoded_page_doc_size_kb").replace(/{size}/g, String(Math.round(docSize / 1024)) + " ").toUpperCase();
        default:
            return getLang("calls_decoded_page_doc_size_kb").replace(/{size}/g, String(Number((docSize / 1024).toFixed(1))) + " ").toUpperCase();
    }
}

function extractDocId(url) {
  const regex = /doc(-?\d+_\d+)/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  return null;
}

function getPostDataText(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedProps.children[0].props.text;
}

	function getLangTimeSuper(e, t, n) {
        const o = window.langConfig;
        if (!t || !o) {
          if (!(0, r.isNumeric)(e)) {
            const t = new Error("Non-numeric value passed to langNumeric");
            throw (console.log(e, t), t);
          }
          return String(e);
        }
        let i;
        Array.isArray(t)
          ? ((i = t[1]),
            e != Math.floor(e)
              ? (i = t[o.numRules.float])
              : (o.numRules.int || []).some((n) => {
                  if ("*" === n[0]) return (i = t[n[2]]), !0;
                  const r = n[0] ? e % n[0] : e;
                  return Array.isArray(n[1]) && n[1].includes(r)
                    ? ((i = t[n[2]]), !0)
                    : void 0;
                }))
          : (i = t);
        let a = String(e);
        if (n) {
          const e = a.split("."),
            t = [];
          for (let n = e[0].length - 3; n > -3; n -= 3)
            t.unshift(e[0].slice(n > 0 ? n : 0, n + 3));
          (e[0] = t.join(o.numDel)), (a = e.join(o.numDec));
        }
        return (i = (i || "%s").replace("%s", a)), i;
      }

      function getFormattedPostDate(onlineInfo) {
        let currentTime = Math.floor(Date.now() / 1000);
        let secondsAgo = currentTime - onlineInfo;
        let justNow = getLang("global_just_now");
        let secsAgo = getLang("global_secs_ago", "raw");
        let minsAgo = getLang("global_mins_ago", "raw");
        let hoursAgo = getLang("global_hours_ago", "raw");
        let hours12345 = getLang("global_word_hours_ago", "raw");
        let minutes12345 = getLang(
          "mobile_profile_status_word_mins_ago",
          "raw"
        );
        let longAgo = getLang("global_short_date_time", "raw");
		let longAgoYear = getLang("global_short_date_year_time", "raw");

        if (secondsAgo <= 0) {
          return justNow;
        } else if (secondsAgo < 60) {
          let secString = getLangTimeSuper(secondsAgo, secsAgo);
          return secString;
        } else if (secondsAgo < 3600) {
          let minutesAgo = Math.floor(secondsAgo / 60);
          let minString;
          if (minutesAgo < 6) {
            minString = minutes12345[minutesAgo];
          } else {
            minString = getLangTimeSuper(minutesAgo, minsAgo);
          }
          return minString;
        } else if (secondsAgo < 14400) {
          let hourssAgo = Math.floor(secondsAgo / 3600);
          let hourString;
          hourString = hours12345[hourssAgo];
          return hourString;
        } else {
          let lastSeenDate = new Date(onlineInfo * 1000);
          let day = lastSeenDate.getDate();
          let month = getMonthNamePost(lastSeenDate.getMonth() + 1);
          let hour = lastSeenDate.getHours();
		  let nowDate = new Date();
		  let dayNow = nowDate.getDate();
		  let monthNow = nowDate.getMonth() + 1;
		  let monthPost = lastSeenDate.getMonth() + 1;
		  let yearNow = nowDate.getYear() + 1900;
		  let yearNewNew = lastSeenDate.getYear()+ 1900;
          let minute = lastSeenDate.getMinutes().toString().padStart(2, "0");

          let dateString;
          if (day == dayNow && monthNow == monthPost && yearNow == yearNewNew) {
            dateString = longAgo[3]
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else if (dayNow-day == 1 && monthNow == monthPost && yearNow == yearNewNew) {
            dateString = longAgo[2]
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else if (yearNewNew == yearNow){
            dateString = longAgo[1]
              .replace("{day}", day)
              .replace("{month}", month)
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          } else {
            dateString = longAgoYear[1]
              .replace("{day}", day)
              .replace("{month}", month)
			  .replace("{year}", yearNewNew)
              .replace("{hour}", hour)
              .replace("{minute}", minute);
          }

          if (dateString.includes("{am_pm}")) {
            let am_pm = hour >= 12 ? "PM" : "AM";
            let newHour = hour % 12 || 12; 
            dateString = dateString
              .replace(hour, newHour)
              .replace("{am_pm}", am_pm);
          }

          return dateString;
        }
      }
	  
	function getMonthNamePost(month) {
        var monthNames = [
          getLang("month1sm_of"),
          getLang("month2sm_of"),
          getLang("month3sm_of"),
          getLang("month4sm_of"),
          getLang("month5sm_of"),
          getLang("month6sm_of"),
          getLang("month7sm_of"),
          getLang("month8sm_of"),
          getLang("month9sm_of"),
          getLang("month10sm_of"),
          getLang("month11sm_of"),
          getLang("month12sm_of"),
        ];
        return monthNames[parseInt(month) - 1];
      }

function getFormattedViews(views) {
	if(views >= 1e9) {
		const k = views / 1e9;
		return k.toFixed(1) + 'B';
	}
	else if(views >= 1e6) {
		const k = views / 1e6;
		return k.toFixed(1) + 'M';
	}
	else if(views >= 1e3) {
		const k = views / 1e3;
		return k.toFixed(1) + 'K';	
	}
	return views.toString();
}

function getPostData(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactContainer")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedState.element.props;
}

function getPostDataNew(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedProps.children.props;
}
///КОНЕЦ СТАРОГО ДИЗАЙНА ЛЕНТЫ///
///КОНЕЦ ЗНАЧКОВ В ПРОФИЛЯХ///
///КНОПКА ОБНОВЛЕНИЯ СТЕНЫ///
if (localStorage.getItem("intMediaValue") == "true") {
  const tabsSelectors = [
    '#wall_tabs.ui_tabs .ui_tabs_right_section',
  ];
  document.arrive(tabsSelectors, { existing: true }, function (e) {
	let updateBtn = document.createElement('div');
	updateBtn.classList.add('ui_tab_search_wrap','ui_tab_item');
	updateBtn.innerHTML = `
	<a class="ui_tab_plain ui_tab_plain_new ui_tab_search" onclick="cur.wallNextFrom = 0; Wall.showMore(0);"><span class="ui_tab_search_icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="currentColor"><path d="M11.7422 3.21838C10.1412 2.65442 8.40531 2.59833 6.77131 3.05777C5.66909 3.36769 4.64943 3.902 3.7732 4.62084H4.87502C5.49634 4.62084 6.00002 5.12452 6.00002 5.74584C6.00002 6.36716 5.49634 6.87084 4.87502 6.87084L1.70519 6.87085C1.61913 6.87091 1.49731 6.871 1.38711 6.86199C1.25501 6.8512 1.04417 6.82206 0.819035 6.70735C0.536792 6.56354 0.307321 6.33407 0.163511 6.05182C0.0487986 5.82669 0.0196589 5.61585 0.00886567 5.48375C-0.000138422 5.37354 -5.10709e-05 5.25173 1.07093e-05 5.16567L2.03652e-05 2C2.03652e-05 1.37868 0.5037 0.875 1.12502 0.875C1.74634 0.875 2.25002 1.37868 2.25002 2V2.96111C3.38657 2.00587 4.71877 1.29764 6.16229 0.891762C8.24222 0.306941 10.4519 0.378336 12.4897 1.0962C14.5276 1.81406 16.2943 3.1434 17.5489 4.90275C18.8034 6.6621 19.4847 8.76577 19.4998 10.9267C19.5149 13.0876 18.863 15.2006 17.6331 16.9773C16.4033 18.754 14.6553 20.1079 12.6276 20.8541C10.6 21.6004 8.39155 21.7026 6.30367 21.1469C4.6601 20.7095 3.11556 19.8787 1.86301 18.7255C1.40593 18.3047 1.37655 17.5929 1.79739 17.1359C2.21824 16.6788 2.92994 16.6494 3.38703 17.0702C4.36132 17.9673 5.57811 18.6255 6.88238 18.9726C8.52263 19.4092 10.2576 19.3289 11.8505 18.7426C13.4435 18.1563 14.8168 17.0927 15.7831 15.6967C16.7495 14.3007 17.2617 12.6404 17.2498 10.9424C17.238 9.24439 16.7026 7.59142 15.7169 6.20907C14.7312 4.82672 13.3431 3.78234 11.7422 3.21838Z"></path></svg></span></a>
	`;
	updateBtn.style.scale = '0.75';
	updateBtn.style.marginLeft = '16px';
	e.appendChild(updateBtn);
  });
}
///КОНЕЦ КНОПКИ ОБНОВЛЕНИЯ СТЕНЫ///
///УБРАТЬ AWAY.PHP///
if (localStorage.getItem("removeAway") == "true") {
  const awayHrefs = [
    'a[href^="https://vk.com/away.php"]',
    'a[href^="/away.php"]',
  ];
  document.arrive(awayHrefs, { existing: true }, function (link) {
    const url = new URL(link.href);
    const toParam = url.searchParams.get("to");
    if (toParam) {
      const decodedUrl = decodeURIComponent(toParam);
      link.href = decodedUrl;
    }
  });
}

function removeAway(str) {
  const decodeMap = {};
  const win1251 = new TextDecoder("windows-1251");
  for (let i = 0x00; i <= 0xff; i++) {
    const hex = (i <= 0x0f ? "0" : "") + i.toString(16).toUpperCase();
    decodeMap[hex] = win1251.decode(Uint8Array.from([i]));
  }
  return str.replace(/%([0-9A-F]{2})/g, (match, hex) => decodeMap[hex]);
}
///КОНЕЦ УБРАТЬ AWAY.PHP///
///ДЛЯ НОВОГО ДИЗАЙНА ССЫЛКИ В ЛС ИЗ ПРОФИЛЯ///
deferredCallback(
  () => {
    document.body.innerHTML = `<div id="vk_ui--layer" style="
    position: relative;
    z-index: 9999;
    background-color: black;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 921px;
" class=""><div id="msgboxlayer" style="
    line-height: 32px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #494949;
    background: white;
    border-radius: 16px;
    padding: 24px;
    font-family: 'VK Sans Display Faux';
    flex-direction: column;
"><img src="https://vk.com/sticker/1-4539-512" style="
    width: 128px;
    padding: 12px;
">Пожалуйста, удалите следующие расширения для нормальной работы<span id="vtools" style="
    /* color: #5c9ce6; */
    font-weight: 1000;
">VK Tools:</span><br><span id="malware" style="
    color: #ff8383;
    font-family: 'VK Sans Display';
">• VK Next(вредоносное расширение)</span></div></div>`;
  },
  { variable: "vknext" }
);
///КОНЕЦ ДЛЯ НОВОГО ДИЗАЙНА ССЫЛКИ В ЛС ИЗ ПРОФИЛЯ///

///СКАЧИВАНИЕ ГС///
document.arrive(
  ".AttachVoice",
  {
    existing: true,
  },
  function (e) {
    let styleElement = fromId("vkEnhancerDownloadAudioButtonStyle");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "vkEnhancerDownloadAudioButtonStyle";
      document.head.appendChild(styleElement);
    }
    var bgImageUri = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath fill='%23447bba' fill-rule='evenodd' d='M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");`;
    styleElement.innerHTML =
      ".vkEnhancerDownloadAudioButton:hover:before{background:#8fadc880;opacity:1}.vkEnhancerDownloadAudioButton{color:var(--vkui--color_icon_accent);" +
      bgImageUri +
      'background-position: center;background-repeat: no-repeat;isolation: isolate;position: relative; align-items:center; justify-content: center;display: flex;cursor: pointer;border-radius: 100px; margin-left: 6px; margin-right: 4px; order: 3; top: 2px;height: 24px; width: 24px;}.vkEnhancerDownloadAudioButton:before {background: #8fadc84d;color: var(--blue_400);opacity: 1;transition: background-color .14s; border-radius:100px; bottom: 0;content: "";left: 0; position: absolute;right: 0;top: 0;z-index:-1;}';
    let download_name = getLink(document.querySelector(".AttachVoice"))
      .split("/")
      .at(-1);
    let link = getLink(e);
    let fileNameAud = getAudioId(e);
    let download = create(
      "a",
      {},
      {
        href: getLink(e),
        innerHTML: "",
        download: download_name,
        "data-link": link,
      }
    );
    download.classList.add("vkEnhancerDownloadAudioButton");
    download.addEventListener("click", async function (e) {
      e.preventDefault();
      const a = document.createElement("a");
      a.rel = "noopener";
      a.target = "_blank";
      a.download = fileNameAud;
      const a_ = await globalThis.fetch(e.target.href, {
        method: "GET",
      });
      let o = await a_.blob();
      a.href = URL.createObjectURL(o);
      setTimeout(() => {
        URL.revokeObjectURL(o);
      }, 4e4);
      setTimeout(() => {
        const a__ = document.createEvent("MouseEvents");
        a__.initMouseEvent(
          "click",
          !0,
          !0,
          window,
          0,
          0,
          0,
          80,
          20,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        );
        a.dispatchEvent(a__);
      }, 0);
    });
    e.children[0].appendChild(download);
  }
);

function getLink(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.return.memoizedProps.voice.linkMp3;
}

function getAudioId(elem) {
  const t = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  var o = t.fiber.return.memoizedProps.voice.ownerId;
  var a = t.fiber.return.memoizedProps.voice.id;
  var i = [o, a].join("_");
  return `audio_message${i}.mp3`;
}
///КОНЕЦ СКАЧИВАНИЯ ГС///
///ОТПРАВКА АУДИО КАК ГОЛОСОВОГО///
function getAudioDescriptionText(lang) {
  switch (lang) {
    case 0:
      return "Прежде чем загружать аудиосообщение, убедитесь в том, что оно записано не в стерео, а в моно. Иначе оно не будет воспроизводиться в приложении на смартфонах";
      break;
    case 1:
      return "Перш ніж завантажувати аудіоповідомлення, переконайтеся в тому, що воно записане не в стерео, а в моно. Інакше воно не буде відтворюватися в додатку на смартфонах";
      break;
    case 454:
      return "Перш ніж завантажувати аудіоповідомлення, переконайтеся в тому, що воно записане не в стерео, а в моно. Інакше воно не буде відтворюватися в додатку на смартфонах";
      break;
    case 114:
      return "Перш чым загружаць аўдыяпаведамленне, пераканайцеся ў тым, што яно запісана не ў стэрэа, а ў мона. Інакш яно не будзе прайгравацца ў праграме на смартфонах";
      break;
    case 2:
      return "Перш чым загружаць аўдыяпаведамленне, пераканайцеся ў тым, што яно запісана не ў стэрэа, а ў мона. Інакш яно не будзе прайгравацца ў праграме на смартфонах";
      break;
    case 777:
      return "Прежде чем загружать радиограмму, убедитесь в том, что оно записано не в стерео, а в моно. Иначе оно не будет воспроизводиться в программе на карманных ЭВМ";
      break;
    case 97:
      return "Аудио хабарламаны жүктеп салу алдында оның стерео емес, моно форматта жазылғанына көз жеткізіңіз. Әйтпесе, ол смартфондардағы қолданбада ойнатылмайды";
      break;
    case 100:
      return "Прѣждѣ чемъ загружать аудiосообщенiя, убѣдитѣсь въ томъ, что оно записано не въ стѣрѣо, а въ моно. Иначе оно не будѣтъ воспроизводиться въ прiложѣнiи на смартфонахъ";
      break;
    default:
      return "Before you upload an audio message, make sure that it is not recorded in stereo, but in mono. Otherwise it will not play in the app on smartphones";
      break;
  }
}
document.arrive(
  ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper > div > .DropdownReforged__contentWrapper > .ActionsMenu:not(#member_actions)",
  { existing: true },
  function (e) {
    let styleElement = fromId("MEPopperStyle");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "MEPopperStyle";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML =
      ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper:not(:has(#member_actions)){margin-top:-72px!important;}";
    var clmno = document.createElement("a");
	clmno.style.textDecoration = "none";
    clmno.innerHTML =
      '<button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular AudioMenuPopper"><i class="ActionsMenuAction__icon"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--money_transfer_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><use xlink:href="#voice_outline_24" style="fill: currentcolor;"></use></svg></i><span class="ActionsMenuAction__title">' +
      getLang("me_notifications_pushes_attachments_voice") +
      "</span></button>";

    var clmno1 = document.createElement("a");
	clmno1.style.textDecoration = "none";
    clmno1.innerHTML =
      '<button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular GraffitiMenuPopper"><i class="ActionsMenuAction__icon"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--money_transfer_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M6.66738 12.4934C5.66072 12.4934 4.89771 13.2639 4.85288 14.219C4.78943 15.5707 4.14574 16.3782 3.56758 16.8697C4.09576 17.0241 4.83625 17.0816 5.79412 16.7965C7.69684 16.2301 8.48106 15.0732 8.48106 14.1836C8.48106 13.2865 7.70617 12.4934 6.66738 12.4934ZM3.35859 14.1483C3.44019 12.4098 4.84452 10.9918 6.66738 10.9918C8.4581 10.9918 9.977 12.3845 9.977 14.1836C9.977 15.9903 8.47815 17.5638 6.21942 18.2361C4.06158 18.8784 2.57907 18.2114 1.87062 17.688C1.78649 17.6258 1.66019 17.5141 1.57758 17.3353C1.48322 17.131 1.47952 16.9126 1.54181 16.7213C1.69148 16.2618 2.17858 16.0626 2.52898 15.7829C2.9113 15.4778 3.31759 15.0219 3.35859 14.1483Z"/><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M15.7019 2.00141C16.312 1.36368 17.3109 1.32806 17.9631 1.93024C18.6094 2.527 18.68 3.5332 18.1327 4.21788L12.0531 11.716C11.7923 12.0376 11.3212 12.0861 11.0008 11.8244C10.6804 11.5626 10.6321 11.0897 10.8928 10.7681L16.9669 3.27699C17.0242 3.20385 17.0127 3.09301 16.9503 3.0354C16.8833 2.97354 16.8169 3.009 16.7482 3.07474L9.74543 9.7831C9.44658 10.0694 8.97312 10.0583 8.68792 9.75831C8.40272 9.45834 8.41378 8.98309 8.71263 8.69681L15.7019 2.00141Z" fill="currentColor"/></svg></i><span class="ActionsMenuAction__title">' +
      getLang("mail_added_graffiti") +
      "</span></button>";
    var clmno2 = document.createElement("a");
    clmno2.innerHTML =
      '<button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular StickerMenuPopper"><i class="ActionsMenuAction__icon"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--money_transfer_outline_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"><use xlink:href="#smile_outline_24" style="fill: currentcolor;"></use></svg></i><span class="ActionsMenuAction__title">' +
      getLang("mail_added_sticker") +
      "</span></button>";
    var newpanel = document.querySelector(
      ".VKCOMMessenger__reforgedModalRoot > .MEConfig > .MEPopper > div > .DropdownReforged__contentWrapper > .ActionsMenu"
    );
    var setElement = document.querySelector(".AudioMenuPopper");
    if (!setElement) {
      newpanel.appendChild(clmno);
    }
    var setElement1 = document.querySelector(".GraffitiMenuPopper");
    if (!setElement1) {
      newpanel.appendChild(clmno1);
    }
    setElement1 = document.querySelector(".GraffitiMenuPopper");
    setElement = document.querySelector(".AudioMenuPopper");
    var eventListenerSet = false;
    if (!eventListenerSet) {
      setElement.addEventListener("click", function () {
        var contAudio = getAudioDescriptionText(vk.lang);
        VKEnhancerMessageBox(
          getLang("global_warning"),
          contAudio,
          getLang("calls_translation_planned_preview_download"),
          getLang("global_cancel"),
          "yes",
          "no",
          function () {
            audioFileInput.click();
          }
        );
      });
      eventListenerSet = true;
    }
    var eventListenerSet1 = false;
    if (!eventListenerSet1) {
      setElement1.addEventListener("click", async function () {
        let styleElement = fromId("vkenGraffity");
        if (!styleElement) {
          styleElement = document.createElement("style");
          styleElement.id = "vkenGraffity";
          document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = `.vkEnhancerRemoveGraffityButton{
    position: relative;
    height: 0px!important;
    width: 0px!important;
    color: white;
    top: 5px;
    left: 5px;
	cursor: pointer;
		}.vkEnhancerRemoveGraffityButton svg{ 
	cusros:pointer;
	background: var(--vkui--color_overlay_primary);
    border-radius: 100%;
    padding: 3px;}
	.vkEnhancerRemoveGraffityButton svg:hover{
	background:var(--vkui--color_overlay_primary--hover);
	}.vkEnhancerGraffitiList{padding:8px;}.vkEnhancerModalPageHeader{ background-color:var(--vkui--color_background_tertiary)!important; border-radius:8px 8px 0 0!important; } .vkEnhancerSeparator { display:none!important; } .vkEnhancerModalPage__header { border-bottom:1px solid var(--vkui--color_separator_primary)!important; } .vkEnhancerPanelHeader__in { justify-content:flex-start!important; } .vkEnhancerPanelHeader__content-in { font-family: var(--palette-vk-font,-apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif)!important; padding-left: 12px!important; font-size: 14px!important; color: var(--vkui--color_text_primary)!important; overflow: hidden!important; text-overflow: ellipsis!important; white-space: nowrap!important; font-weight:400!important; } .vkEnhancerTappable { background:var(--vkui--color_background_secondary)!important; border-radius:0px!important; --vkui_internal--icon_color:var(--vkui--color_text_link)!important; color:var(--vkui--color_text_link)!important; } .vkEnhancerTappable:hover { background: var(--vkui--color_background_secondary_alpha)!important; } .vkEnhancerDiv { padding:0!important; } div:has(>.vkEnhancerModalPage__in-wrap) { display:flex; justify-content:center; align-items: center; height:100%; inline-size: 100%; block-size: 100%; overflow: hidden; position: absolute; box-sizing: border-box; } .vkEnhancerModalPage__in-wrap { font-family:var(--vkui--font_family_base); max-inline-size: var(--vkui--size_popup_medium--regular); position: relative; align-items: initial; margin-block: 32px; margin-inline: 56px; block-size: auto; max-block-size: 640px; opacity: 0; transform: none; transition: opacity 340ms var(--vkui--animation_easing_platform); inline-size: 100%; inset-inline: 0; inset-block-end: 0; display: flex; } .vkEnhancerModalPage__in { block-size: auto; box-shadow: var(--vkui--elevation3); border-end-end-radius: var(--vkui--size_border_radius_paper--regular); border-end-start-radius: var(--vkui--size_border_radius_paper--regular); } .vkEnhancerModalPage__in { background-color: var(--vkui--color_background_modal); overflow: visible; position: relative; box-sizing: border-box; inline-size: 100%; display: flex; flex-direction: column; border-start-end-radius: var(--vkui--size_border_radius_paper--regular); border-start-start-radius: var(--vkui--size_border_radius_paper--regular); --vkui_internal--background: var(--vkui--color_background_modal); } .vkEnhancerModalPage__header { inline-size: 100%; } .vkEnhancerModalPageHeader { padding-inline: 8px; --vkui_internal--safe_area_inset_top: 0; } .vkEnhancerPanelHeader { position: relative; } .vkEnhancerPanelHeader__in { display:flex; justify-content:center; } .vkEnhancerPanelHeader__content { text-align: center; opacity: 1; transition: opacity .3s var(--vkui--animation_easing_platform); } .vkEnhancerPanelHeader__content-in { font-size:18px; color: var(--vkui--color_text_primary); font-weight: 500; font-family: var(--vkui--font_family_accent); user-select:none; } .vkEnhancerSeparator { color: var(--vkui--color_separator_primary); } .vkEnhancerSeparator__in { block-size: var(--vkui--size_border--regular); margin: 0; background: currentColor; color: inherit; border: 0; transform-origin: center top; } .vkEnhancerModalPage__content-wrap { position: relative; display: flex; block-size: 100%; flex-direction: column; overflow: hidden; border-end-start-radius: inherit; border-end-end-radius: inherit; } .vkEnhancerModalPage__content { overflow-y: auto; -webkit-overflow-scrolling: touch; block-size: 100%; overflow-x: hidden; box-sizing: border-box; } .vkEnhancerModalPage__content-in { block-size:100%; } .vkEnhancerDiv { padding-block: var(--vkui--size_base_padding_vertical--regular); padding-inline: var(--vkui--size_base_padding_horizontal--regular); } .vkEnhancerSpacing { position: relative; box-sizing: border-box; } .vkEnhancerTappable { min-height: 22px; --vkui_internal--icon_color: var(--vkui--color_icon_accent); color: var(--vkui--color_text_accent); justify-content: center; text-align: center; box-sizing: border-box; text-decoration: none; margin: 0; border: 0; inline-size: 100%; background: rgba(0,0,0,0); padding-block: 0; min-block-size: 44px; display: flex; align-items: center; white-space: nowrap; padding-inline: var(--vkui--size_base_padding_horizontal--regular); isolation: isolate; position: relative; border-radius: var(--vkui--size_border_radius--regular); cursor: pointer; --vkui_internal--outline_width: 2px; transition: background-color .15s ease-out; } .vkEnhancerSimpleCell__before { padding-block: 4px; flex-grow: initial; max-inline-size: initial; display: flex; align-items: center; padding-inline-end: 12px; color: var(--vkui_internal--icon_color, var(--vkui--color_icon_accent)); position: relative; z-index: var(--vkui_internal--z_index_tappable_element); } .vkEnhancerSimpleCell__middle { flex-grow: initial; max-inline-size: initial; display: flex; flex-direction: column; justify-content: center; padding-block: 10px; min-inline-size: 0; overflow: hidden; position: relative; z-index: var(--vkui_internal--z_index_tappable_element); } .vkEnhancerSimpleCell__content { justify-content: flex-start; display: flex; align-content: flex-start; align-items: center; max-inline-size: 100%; } .vkEnhancerTypography { font-weight: var(--vkui--font_weight_accent3); font-size: var(--vkui--font_headline1--font_size--compact); line-height: var(--vkui--font_headline1--line_height--compact); color: inherit; text-overflow: ellipsis; overflow: hidden; display: block; margin: 0; padding: 0; } .vkEnhancerVisuallyHidden { position: absolute !important; block-size: 1px !important; inline-size: 1px !important; padding: 0 !important; margin: -1px !important; white-space: nowrap !important; clip: rect(0, 0, 0, 0) !important; clip-path: inset(50%); overflow: hidden !important; border: 0 !important; opacity: 0; } .vkEnhancerTappable:hover{ background-color:var(--vkui--color_transparent--hover); } .vkEnhancerGraffitiList { display: grid; gap: 4px; grid-template-columns: repeat(4,1fr); } .vkEnhancerGraffitiList__item { height: 158px; width: 158px; align-items: center; background-color: var(--vkui--color_transparent--hover); border-radius: 10px; cursor: pointer; display: flex; justify-content: center; transition: all .15s ease; vertical-align: bottom; } .vkEnhancerGraffitiList__item:hover { background-color: var(--vkui--color_transparent--active); } .vkEnhancerGraffitiList__item--doc { background-position: 50%; background-repeat: no-repeat; background-size: contain; border-radius: 10px; height: 158px; width: 158px; } .vkEnhancerCloseButton { position: absolute; justify-content: center; inset-block-start: 0; inset-inline-end: -56px; inline-size: 56px; block-size: 56px; padding: 18px; box-sizing: border-box; color: var(--vkui--color_icon_contrast); transition: opacity .15s ease-out; isolation: isolate; border-radius: var(--vkui--size_border_radius--regular); cursor: pointer; --vkui_internal--outline_width: 2px; } .vkEnhancerCloseButton:before { display: block; content: ""; inset: 14px; background: var(--vkui--color_overlay_primary); border-radius: 50%; position: absolute; } .vkEnhancerCloseButton:hover:before { background:var(--vkui--color_overlay_primary--hover); } .vkEnhancerVisuallyHidden { position: absolute !important; block-size: 1px !important; inline-size: 1px !important; padding: 0 !important; margin: -1px !important; white-space: nowrap !important; clip: rect(0, 0, 0, 0) !important; clip-path: inset(50%); overflow: hidden !important; border: 0 !important; opacity: 0; z-index: var(--vkui_internal--z_index_tappable_element); }`;
        await VKEnhancerGraffitiBox();
      });
      eventListenerSet1 = true;
    }

    async function VKEnhancerGraffitiBox() {
      let boxG = document.createElement("div");
      boxG.classList.add("vkEnhancerGraffityMainBox");
      boxG.innerHTML =
        `<div class="vkEnhancerModalPage__in-wrap" style="opacity: 1;"> <div class="vkEnhancerModalPage__in"> <div class="vkEnhancerModalPage__header"> <div class="vkEnhancerModalPageHeader vkEnhancerModalPageHeader--withGaps vkEnhancerModalPageHeader--desktop"> <div class="vkEnhancerPanelHeader"> <div class="vkEnhancerPanelHeader__in" data-onboarding-tooltip-container="fixed"> <div class="vkEnhancerPanelHeader__content"> <h2 class="vkEnhancerPanelHeader__content-in" id=":r1:-label">` +
        getLang("mail_added_graffiti") +
        `</h2> </div> </div> </div> <div class="vkEnhancerSeparator"> <hr class="vkEnhancerSeparator__in"> </div> </div> </div> <div class="vkEnhancerModalPage__content-wrap"> <div class="vkEnhancerModalPage__content"> <div class="vkEnhancerModalPage__content-in"> <div class="vkEnhancerDiv"> <div class="vkEnhancerTappable vkEnhancerGraffityInput" role="button" tabindex="0"> <div class="vkEnhancerSimpleCell__before"> <img src="https://vk.com/images/icons/upload_icon.png"> </div> <div class="vkEnhancerSimpleCell__middle"> <div class="vkEnhancerSimpleCell__content"><span class="vkEnhancerTypography">` +
        getLang("calls_translation_planned_preview_download") +
        `<input class="vkEnhancerVisuallyHidden" type="file" accept="image/png"></span></div> </div> </div> <div class="vkEnhancerGraffitiList"> </div> </div> </div> </div> </div> <div class="vkEnhancerCloseButton" role="button" tabindex="0"><span class="vkEnhancerVisuallyHidden">Закрыть</span> <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--cancel_20" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;"> <path fill="currentColor" fill-rule="evenodd" d="M4.72 4.72a.75.75 0 0 1 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path> </svg> </div> </div> </div>`;
      let boxLayer = document.getElementById("box_layer");
      boxG.style.top = "0px";
      boxG.style.zIndex = "999999";
      boxG.style.backgroundColor = "#000000B3";
      document.body.appendChild(boxG);
      let responseGraffiti = await vkApi.api(
        "messages.getRecentGraffities",
        {}
      );
      var graffitiList = document.querySelector(".vkEnhancerGraffitiList");
      responseGraffiti.forEach(function (graffiti) {
        var ultraItemDiv = document.createElement("div");
        ultraItemDiv.classList.add("vkEnhancerGraffitiUltraItem");
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("vkEnhancerGraffitiList__item");
        var docDiv = document.createElement("div");
        docDiv.classList.add("vkEnhancerGraffitiList__item--doc");
        docDiv.style.backgroundImage = `url("${graffiti.url}")`;
        var removGButton = document.createElement("div");
        removGButton.classList.add("vkEnhancerRemoveGraffityButton");
        removGButton.setAttribute(
          "onclick",
          `vkApi.api("messages.hideRecentGraffiti", {
                                    doc_id: ${graffiti.id}
                                });`
        );
        removGButton.addEventListener("click", function () {
          ultraItemDiv.style.display = "none";
        });
        removGButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.84 4H2.75a.75.75 0 0 0 0 1.5h.55l.9 9.25c.05.52.1.96.16 1.31.06.37.16.71.35 1.03a2.9 2.9 0 0 0 1.25 1.13c.33.16.68.22 1.06.25.36.03.8.03 1.32.03h3.32c.53 0 .96 0 1.32-.03.38-.03.73-.1 1.06-.25a2.9 2.9 0 0 0 1.25-1.13c.19-.32.29-.66.35-1.03.06-.35.1-.79.16-1.31l.9-9.25h.55a.75.75 0 0 0 0-1.5h-4.09a3.25 3.25 0 0 0-6.32 0Zm1.58 0h3.16a1.75 1.75 0 0 0-3.16 0Zm6.78 1.5H4.8l.9 9.07c.05.56.08.94.13 1.23.05.28.1.42.17.52a1.4 1.4 0 0 0 .6.55c.1.04.25.08.53.1.3.03.68.03 1.24.03h3.26c.56 0 .94 0 1.23-.02.29-.03.43-.07.54-.11a1.4 1.4 0 0 0 .6-.55c.06-.1.11-.24.16-.52.05-.3.1-.67.15-1.23l.89-9.07Zm-2.89 2a.75.75 0 0 1 .69.81l-.5 6a.75.75 0 0 1-1.5-.12l.5-6a.75.75 0 0 1 .81-.69Zm-4.62 0a.75.75 0 0 1 .8.69l.5 6a.75.75 0 0 1-1.49.13l-.5-6a.75.75 0 0 1 .69-.82Z" clip-rule="evenodd"></path></svg>`;
        ultraItemDiv.appendChild(removGButton);
        itemDiv.appendChild(docDiv);
        ultraItemDiv.appendChild(itemDiv);
        graffitiList.appendChild(ultraItemDiv);
        var idG = graffiti.id;
        var oidG = graffiti.owner_id;
        var gUrl = graffiti.url.replace("https://vk.com/", "");
        itemDiv.addEventListener("click", async function () {
          var peerId = new URL(window.location.href).pathname.split("/").at(-1);
          await vkApi.api("messages.send", {
            peer_id: peerId,
            attachment: gUrl,
            random_id: Math.floor(Math.random() * 2147483647),
          });
          onClose();
        });
      });
      let closeButton = document.querySelector(".vkEnhancerCloseButton");
      closeButton.addEventListener("click", function () {
        onClose();
      });
      boxG.addEventListener("click", function (event) {
        if (!event.target.closest(".vkEnhancerModalPage__in-wrap")) {
          onClose();
        }
      });
      const graffityFileInput = document.querySelector(
        ".vkEnhancerVisuallyHidden"
      );
      graffityFileInput.addEventListener("change", function () {
        if (graffityFileInput.files.length > 0) {
          boxG.style.display = "none";
          handleGraffity();
        }
      });
      document
        .querySelector(".vkEnhancerTappable")
        .addEventListener("click", function (event) {
          graffityFileInput.click();
        });
    }

    async function handleGraffity() {
      const graffityFileInput = document.querySelector(
        ".vkEnhancerVisuallyHidden"
      );
      const file = graffityFileInput.files[0];
      await sendGraffity(file);
    }
    async function sendGraffity(fileNameOutput) {
      const url1 =
        "https://api.vk.com/method/docs.getMessagesUploadServer?v=5.231&client_id=5776857&access_token=" +
        localStorage.getItem("vk_enhancer_access_token") +
        "&type=graffiti";

      fetch(url1)
        .then((response) => response.json())
        .then(async (data) => {
          const uploadUrlGraf = data.response.upload_url;

          let file = await uploadFile123(uploadUrlGraf, fileNameOutput);

          const parsedData = JSON.parse(file);
          console.info("[VKENH] File uploaded");
          console.log(parsedData["file"]);
          let doc = await vkApi.api("docs.save", { file: parsedData["file"] });
          doc = doc.graffiti;

          var peerId = new URL(window.location.href).pathname.split("/").at(-1);
          await vkApi.api("messages.send", {
            peer_id: peerId,
            attachment: `doc${doc.owner_id}_${doc.id}_${doc.access_key}`,
            random_id: Math.floor(Math.random() * 2147483647),
          });
          onClose();
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    }
    async function uploadFile123(uploadUrl, file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Upload failed. Status: " + response.status);
        }
      } catch (error) {
        throw new Error("Upload failed. Network error: " + error.message);
      }
    }

    function onClose() {
      let customStyle = fromId("vkenGraffity");
      if (customStyle) {
        customStyle.remove();
      }
      customStyle = fromId("vkenSticker");
      if (customStyle) {
        customStyle.remove();
      }
      let mainGrafBox = document.querySelector(".vkEnhancerGraffityMainBox");
      mainGrafBox.remove();
    }
    async function VKEnhancerMessageBox(
      title,
      content,
      buttonCont,
      buttonCont2,
      color,
      color2,
      callback
    ) {
      var i = new MessageBox();
      i.addButton(
        buttonCont,
        function () {
          if (callback) {
            callback();
          }
        },
        color
      );
      i.addButton(buttonCont2, !1, color2);
      i.setOptions({
        title: title,
        bodyStyle:
          "overflow: hidden; text-overflow: ellipsis; color: var(--vkenhancer)",
      });
      i.content(content);
      i.show();
      const appendHere = document.querySelector(
        '.box_body[style="overflow: hidden; text-overflow: ellipsis; color: var(--vkenhancer);"]'
      );
      var inputWrap = document.createElement("a");
      inputWrap.innerHTML =
        '<input style="display:none;" type="file" id="audioFileInput" accept="audio/mp3,audio/ogg,audio/wav">';
      appendHere.appendChild(inputWrap);
      const audioFileInput = document.getElementById("audioFileInput");
      audioFileInput.addEventListener("change", function () {
        if (audioFileInput.files.length > 0) {
          handleUpload();
          i.hide();
        }
      });
    }

    async function handleUpload() {
      const audioFileInput = document.getElementById("audioFileInput");
      const file = audioFileInput.files[0];
      await sendAudioMessage(file);
    }
    async function sendAudioMessage(fileNameOutput) {
      const uploadUrl1 = await vkApi.api("docs.getMessagesUploadServer", {
        peer_id: vk.id,
        type: "audio_message",
      });
      const uploadUrl = uploadUrl1["upload_url"];

      let file = await uploadFile(uploadUrl, fileNameOutput);

      const data = JSON.parse(file);
      console.info("[VKENH] File uploaded");
      console.log(data["file"]);
      let doc = await vkApi.api("docs.save", { file: data["file"] });
      doc = doc.audio_message;

      var peerId = new URL(window.location.href).pathname.split("/").at(-1);
      await vkApi.api("messages.send", {
        peer_id: peerId,
        attachment: `doc${doc.owner_id}_${doc.id}_${doc.access_key}`,
        random_id: Math.floor(Math.random() * 2147483647),
      });
    }

    async function uploadFile(uploadUrl, fileNameOutput) {
      const formData = new FormData();
      formData.append("file", fileNameOutput);
      const xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error("Upload failed. Status: " + xhr.status));
          }
        };

        xhr.onerror = function () {
          reject(new Error("Upload failed. Network error"));
        };

        xhr.open("POST", uploadUrl);
        xhr.send(formData);
      });
    }
  }
);

///КОНЕЦ ОТПРАВКИ АУДИО КАК ГОЛОСОВОГО///
///МАРГИН ДЛЯ ЛАЙКОВ ПРИ ВЫКЛЮЧЕННЫХ РЕАКЦИЯХ///
if (
  localStorage.getItem("removePostReactions") == "true"
) {
  const wallSel = [".PostActionStatusBar--inPost"];
  document.arrive(wallSel, { existing: true }, function (e) {
	 try {
		let likesInWl = e.querySelector('.ReactionsPreview--isInActionStatusBar');
		let appendHereLikes;
		try {
			appendHereLikes = e.closest('.wl_post_actions_wrap').querySelector('.like_btns .PostButtonReactionsContainer');
		} catch(error) {
			appendHereLikes = e.closest('.post_info').querySelector('.like_btns .PostButtonReactionsContainer');
		}
		appendHereLikes.appendChild(likesInWl);
	 } catch(error) {
		 
	 }
  });
  document.arrive(
    ".post--withPostBottomAction:not(.post--withActionStatusBar)",
    { existing: true },
    function (e) {
      var postId = e.getAttribute("id");
      var postButton = e.querySelector(
        ".PostBottomAction.PostBottomAction--withBg.PostButtonReactions.PostButtonReactions--post"
      );
      if (postButton) {
        postButton.removeAttribute("onmouseenter");
        postButton.removeAttribute("onkeydown");
        postButton.setAttribute(
          "onmouseover",
          "Likes.showLikes(this, '" +
            postId.replace("post", "wall") +
            "', {isFromReactionsPreview:1})"
        );
      }
    }
  );
}

updateReactState();

function updateReactState() {
	if (localStorage.getItem("removePostReactions") == "true") 
  {
	try {
		document.arrive(
		".PostBottomActionLikeBtns--withTransparentButtons .like_btns>.PostBottomActionContainer:first-child > .PostButtonReactions--post",
		{ existing: true },
			function (e) {
				var postId;
				try {
					postId = e.closest('.Post--redesign.Post--redesignV3[id^="post"]').getAttribute("id");
				}
				catch(error) {
					postId = '';
				}
				e.removeAttribute("onmouseenter");
				e.removeAttribute("onkeydown");
				e.setAttribute(
					"onmouseover",
					"Likes.showLikes(this, '" +
						postId.replace("post", "wall") +
					"', {isFromReactionsPreview:1})"
			);
			}
		);
	}
	catch(error) {console.info('[VKENH] Post opened');}
  }
}
///КОНЕЦ МАРГИНА ДЛЯ ЛАЙКОВ ПРИ ВЫКЛЮЧЕННЫХ РЕАКЦИЯХ///
///РЕЗУЛЬТАТЫ ОПРОСА БЕЗ ГОЛОСОВАНИЯ///
if (localStorage.getItem("pollResultsValue") == "true") {
  document.arrive(
    "[class^='vkitPrimaryAttachmentPoll__voting']",
    { existing: true },
    function (e) {
      let styleElement = fromId("PollResultsShow");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "PollResultsShow";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML =
        '.VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionVotes"] { opacity: .4; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionRight"] { opacity: 1; transform: translateX(0); } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionRight"] { margin-right: 0px !important; } div:has(>[class^="vkitPollOptions__votingOptionCheckboxIcon"]>svg)>[class^="vkitPollOptions__votingOptionRight"] { margin-right: 28px; } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionCheckboxIcon"] { display: none !important; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .06 } [class*="vkitPollOptions__votingOptionsDark"].VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .12 }';
      var polls = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptions"]'
      );
      for (var poll of polls) {
        poll.classList.add("VKEnhancer-module__votingOptionsVoted");
      }
      var percentageElements = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptionRight"]'
      );
      percentageElements.forEach(function (element) {
        var percentage = parseFloat(element.textContent.replace("%", ""));
        var parentElement = element.closest(
          '[class^="vkitPollOptions__votingOptionWrapper"]'
        );
        var fillElement = parentElement.querySelector(
          '[class^="vkitPollOptions__votingOptionFill"]'
        );
        fillElement.style.width = percentage + "%";
      });
    }
  );
    document.arrive(
    "[class^='vkitModalBody__container'] > [class^='vkitPollOptions__votingOptionsWrapper']",
    { existing: true },
    function (e) {
      let styleElement = fromId("PollResultsShow");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "PollResultsShow";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML =
        '.VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionVotes"] { opacity: .4; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionRight"] { opacity: 1; transform: translateX(0); } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionRight"] { margin-right: 0px !important; } div:has(>[class^="vkitPollOptions__votingOptionCheckboxIcon"]>svg)>[class^="vkitPollOptions__votingOptionRight"] { margin-right: 28px; } [class*="vkitPollOptions__votingOptionsVoted"] [class^="vkitPollOptions__votingOptionCheckboxIcon"] { display: none !important; } .VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .06 } [class*="vkitPollOptions__votingOptionsDark"].VKEnhancer-module__votingOptionsVoted [class^="vkitPollOptions__votingOptionFill"] { opacity: .12 }';
      var polls = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptions"]'
      );
      for (var poll of polls) {
        poll.classList.add("VKEnhancer-module__votingOptionsVoted");
      }
      var percentageElements = document.querySelectorAll(
        '[class^="vkitPollOptions__votingOptionRight"]'
      );
      percentageElements.forEach(function (element) {
        var percentage = parseFloat(element.textContent.replace("%", ""));
        var parentElement = element.closest(
          '[class^="vkitPollOptions__votingOptionWrapper"]'
        );
        var fillElement = parentElement.querySelector(
          '[class^="vkitPollOptions__votingOptionFill"]'
        );
        fillElement.style.width = percentage + "%";
      });
    }
  );
  document.arrive(".media_voting", { existing: true }, async function (e) {
    let pollOid = e.dataset.ownerId;
    let pollId = e.dataset.id;
    let pollRes = await vkApi.api("polls.getById", {
      owner_id: pollOid,
      poll_id: pollId,
    });

    pollRes.answers.forEach((option) => {
      let optionWrap = document.querySelector(
        `._media_voting_option${option.id}`
      );
      if (optionWrap) {
        let percentElem = optionWrap.querySelector(
          ".media_voting_option_percent"
        );
        percentElem.textContent = option.rate;

        let barElem = optionWrap.querySelector(".media_voting_option_bar");
        barElem.style.transform = `scaleX(${option.rate / 100})`;

        let countElem = optionWrap.querySelector(".media_voting_option_count");
        countElem.classList.remove("media_voting_option_count_hidden");
        countElem.querySelector(
          ".media_voting_option_counter"
        ).innerHTML = `<span class="media_voting_separator">⋅</span><span>${option.votes}</span>`;
      }
    });
    let styleElement = fromId("PollResultsShowSecondary");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "PollResultsShowSecondary";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML =
      ".media_voting_multiple .media_voting_option_text::after{right:52px!important;}";
  });

  document.arrive(".AttachPoll__answers", { existing: true }, async function (
    e
  ) {
    const answerElements = e.querySelectorAll(".AttachPoll__answer");
    answerElements.forEach((element) => {
      const [votes, rate] = getAnswerProps(element);
      const revealAnswers = document.createElement("span");
      revealAnswers.classList.add("vkEnAnswerCount");
      revealAnswers.textContent = `${rate}%`;
      const rightAnswer = element.getElementsByClassName(
        "AttachPoll__answerRight"
      )[0];
      rightAnswer.prepend(revealAnswers);
      const revealVotes = document.createElement("span");
      revealVotes.classList.add("vkEnAnswerVotes");
      revealVotes.textContent = ` ⋅ ${votes}`;
      rightAnswer.parentNode.insertBefore(revealVotes, rightAnswer);
      const answerBar = element.getElementsByClassName(
        "AttachPoll__answerBar"
      )[0];
      answerBar.style.transform = `scaleX(${rate / 100})`;
    });
  });

  let styleElement = fromId("PollResultsShowAttach");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "PollResultsShowAttach";
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML =
    ".AttachPoll__answer--voted .vkEnAnswerVotes, .AttachPoll__answer--voted .vkEnAnswerCount{display:none!important;}.vkEnAnswerVotes{display:contents;color:var(--vkui--color_text_subhead);}.vkEnAnswerCount{padding-right: 6px; line-height: 16px; font-size: 13px; color: var(--vkui--color_text_primary); font-weight: 600; -webkit-font-smoothing: subpixel-antialiased; -moz-osx-font-smoothing: auto; white-space: nowrap; text-align: right; z-index: 1; transition: opacity .1s,transform .1s;}";

  function getAnswerProps(elem) {
    const t = {};
    let n = 0;
    for (const o of Object.keys(elem)) {
      if (o.startsWith("__reactFiber")) {
        t.fiber = elem[o];
        ++n;
      } else if (o.startsWith("__reactProps")) {
        t.props = elem[o];
        ++n;
      }
      if (n === 2) break;
    }
    const votes = t.fiber.return.memoizedProps.answer.votes;
    const rate = t.fiber.return.memoizedProps.answer.rate;
    return [votes, rate];
  }
}
///КОНЕЦ РЕЗУЛЬТАТОВ ОПРОСА БЕЗ ГОЛОСОВАНИЯ///
///НАЧАЛО ХОВЕРА НА ТЕГ В НОВОМ ДИЗАЙНЕ///
if (getLocalValue("isOldHover")) {
  var hoverTags = [
    'a.MessageText__link[href^="/"]',
    'a.MessageText__link[href*="vk.com"]',
  ];

  document.arrive(hoverTags, { existing: true }, function (e) {
    let href = e.getAttribute("href");
    let mentionId = href.substring(href.lastIndexOf("/") + 1);

    e.setAttribute("href", href);
    e.classList.add("mem_link");
    e.setAttribute("mention", "");
    e.setAttribute("mention_id", mentionId);
    e.removeAttribute("onclick");
    e.setAttribute(
      "onclick",
      `window.open('${href}', '_blank'); return false;`
    );
    e.setAttribute("onmouseover", "mentionOver(this)");
  });
}
///КОНЕЦ ХОВЕРА НА ТЕГ В НОВОМ ДИЗАЙНЕ///
///СПАМ///
document.arrive(".BurgerMenu__actionsMenu", { existing: true }, function (e) {
  var burgerim = document.querySelector(
    ".BurgerMenu__actionsMenu > div > div > div"
  );

  const spamButton = document.createElement("button");
  spamButton.classList.add("ActionsMenuAction");
  spamButton.classList.add("ActionsMenuAction--secondary");
  spamButton.classList.add("ActionsMenuAction--size-regular");
  const spamSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path d="M9.25 6.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zM10 13a.9.9 0 100 1.8.9.9 0 000-1.8z"/><path d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM3 10a7 7 0 1014 0 7 7 0 00-14 0z" fill-rule="evenodd"/></svg>';
  const spamText = getLang("reports_media_reason_its_spam");
  const spammerSVG = spamSVG;
  spamButton.innerHTML = `<i class="ActionsMenuAction__icon">${spammerSVG}</i><span class="ActionsMenuAction__title">${spamText}</span>`;
  spamButton.setAttribute(
    "onclick",
    'showTabbedBox("al_im.php", {act: "a_spam", offset: "0", gid: 0}, {params: {width: 638}})'
  );
  //showTabbedBox("al_im.php", {act: "a_important", offset: "0", gid: 0}, {params: {width: 638}}) Это важные сообщения, если вдруг пригодится
  let styleElementSpam = fromId("vken_spam_style");
  if (!styleElementSpam) {
    styleElementSpam = document.createElement("style");
    styleElementSpam.id = "vken_spam_style";
    document.head.appendChild(styleElementSpam);
  }
  styleElementSpam.id = "vken_spam_style";
  styleElementSpam.innerHTML = `.PagePostLimitedThumbsContainer, .page_post_sized_thumbs {
    padding: 10px 0 4px;
}a.page_post_thumb_wrap, span.page_post_thumb_wrap {
    display: block;
    overflow: hidden;
    margin: 0 5px 5px 0;
}.nim-peer.nim-peer_small .nim-peer--photo>img, .nim-peer.nim-peer_small .nim-peer--photo .im_grid>img { width: 36px; height: 36px; border-radius: 50%; -moz-force-broken-image-icon: 0; position: relative; background-color: inherit; } .nim-peer .im_grid { display: block; float: left; height:36px; } .nim-peer.nim-peer_small .nim-peer--photo { background-color: inherit; overflow: hidden; height:36px; width:36px; } .nim-peer .nim-peer--photo-w { overflow: hidden; border-radius: 50%; height:36px; width:36px; } .nim-peer.nim-peer_small { width: 36px; height: 36px; } .nim-peer { position: relative; border-color: inherit; background-color: inherit; } .im-mess-stack .im-mess-stack--photo { position: absolute; left: 43px; top: 8px; z-index: 2; } .im-mess-stack.im-mess-stack_full-date { line-height: 1.23; } .im-mess-stack { position: relative; } .im-mess-stack .im-mess-stack--content .im-mess-stack--pname { display: block; z-index: 2; font-size: 12.5px; position: absolute; left: 92px; top: 10px; color: var(--vkui--color_text_secondary); } .im-mess-stack .im-mess-stack--content .im-mess-stack--pname>a { font-weight: 700; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } .im-mess-stack .im-mess-stack--content .im-mess-stack--lnk { max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block; vertical-align: top; line-height: 1.23; color: var(--vkui--vkontakte_color_im_text_name); } .im-mess-stack.im-mess-stack_full-date .im-mess-stack--tools { position: absolute; right: 60px; margin-top: 11px; } .im-mess-stack .im-mess-stack--content .im-mess-stack--tools { color: var(--vkui--color_text_secondary); font-size: 12px; z-index: 2; margin-left: 4px; line-height: 1.4; } .im-mess-stack .im-mess-stack--mess li:last-of-type { margin-bottom: 4px; } .im-important .im-mess { padding-right: 110px; } .im-mess:not(._im_mess_callsnippet) { cursor: pointer; } .im-mess { padding: 6px 30px 7px 0; position: relative; margin: 0 7px 0 7px; } .im-mess-stack .im-mess-stack--mess .im-mess:first-child>.im-mess--text { padding-top: 21px; } .im-mess .im-mess--text { outline: 0; margin: 0 49px 0 86px; line-height: 18px; word-wrap: break-word; } .wall_module { --post-reply-block-padding: 12px; --post-reply-box-fix-padding: 2px; } .im-important-box .im-important-box--select { display: none; } .im-important { position: relative; padding: 10px 15px 40px 15px; } `;
  ///КОНЕЦ СПАМА///
  const spamSeparator = burgerim.querySelector(".ActionsMenuAction__separator");
  burgerim.insertBefore(spamButton, spamSeparator);
});

///ЭМОДЗИ-ХОТБАР///
document.arrive(".ConvoComposer__inputWrapper", { existing: true }, function (
  e
) {
  const container = document.querySelector(".ConvoMain__composer");
  if (container && document.getElementById("vkenhancerEmojiHotbarID")) {
    const emojiHotbar = document.getElementById("vkenhancerEmojiHotbarID");
    const lastDiv = container.lastElementChild;
    if (lastDiv && lastDiv !== emojiHotbar) {
      container.removeChild(emojiHotbar);
      container.appendChild(emojiHotbar);
    }
  }
  HotBarAppear(globalThis.HotBarAppearVAL);
});
document.arrive(
  ".ConvoMain__composer .ComposerSelecting",
  { existing: true },
  function (e) {
    const container = document.querySelector(".ConvoMain__composer");
    if (container && document.getElementById("vkenhancerEmojiHotbarID")) {
      const emojiHotbar = document.getElementById("vkenhancerEmojiHotbarID");
      const lastDiv = container.lastElementChild;
      if (lastDiv && lastDiv !== emojiHotbar) {
        container.removeChild(emojiHotbar);
        container.appendChild(emojiHotbar);
      }
    }
  }
);


function newDesign() {
  localStorage.setItem("isNewDesign", true);
  return new Promise((resolve, reject) => {
    let url = window.location.href;
    newDesignFunctions.forEach((flag) => {
      window.vk.pe[flag] = 1;
    });
    window.vk.pe.vkm_hide_forward_author = 1;
    window.vk.pe.vkm_theme_styles_settings = 1;
    window.vk.pe.vkm_reactions || (window.vk.pe.vkm_reactions = 20);
    localStorage.setItem("isVKMReforgedDesign", true);

    window.MECommonContext &&
      window.MECommonContext.then((e) => {
        if (e.store.featureFlags) {
          newDesignFunctions.forEach((flag) => {
            e.store.featureFlags[flag] = true;
          });
          try {
            if (localStorage.getItem("isDefaultTheme") == "true") {
              
            }
          } catch (error) {}
          e.store.featureFlags["vkm_reactions"] = 20;
          e.store.featureFlags["me_reactions"] = 20;
          resolve(true);
        } else {
          console.error("Feature flags object is not available");
        }
      }).catch((error) => {
        console.error("Error while setting feature flags:", error);
      });
  });
}
function HotBarAppear(cHotBarValue) {
  if (!cHotBarValue) return;
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
  const chatInputContainer = document.getElementsByClassName(
    "ConvoMain__composer"
  );
  const existingHotbar = fromId("vkenhancerEmojiHotbarID");
  cHotBarValue = cHotBarValue.filter(function (item) {
    return item !== "" && item !== null && item !== undefined;
  });
  if (!existingHotbar && cHotBarValue.length > 0) {
    const hotbarDiv = document.createElement("div");
    hotbarDiv.className = "vkenhancerEmojiHotbar";
    hotbarDiv.id = "vkenhancerEmojiHotbarID";
    hotbarDiv.style.marginTop = "6px";
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
	  aElement.addEventListener(
        "click",
        function () {
          const emojiCodeAdd = emojiCode; 
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
        }
      );
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
      HotBarAppear(globalThis.HotBarAppearVAL);
      return;
    });
    try {
      chatInputContainer[0].appendChild(hotbarDiv);
    } catch (error) {}
  }
}
function MuteCalls() {
  Calls.isIncomingModalHidden = true;
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
function deferredCallback(callback, opt) {
  let { variable, element } = opt;
  let updated = variable ? window[variable] : document.querySelector(element);
  if (!updated) {
    setTimeout(() => {
      deferredCallback(callback, opt);
    }, 10);
  } else {
    callback(updated);
  }
}
