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
import oldFeed from "./functions/oldFeed/oldFeed";
import downloadMusic from "./functions/downloadMusic/downloadMusic";
import feedReorder from "./functions/feedReorder/feedReorder";
import feedReorderRemove from "./functions/feedReorder/feedReorderRemove";
import oldGroupsPage from "./functions/oldGroupsPage/oldGroupsPage";
import oldPosting from "./functions/oldPosting/oldPosting";
import oldMessenger from "./functions/oldMessenger/oldMessenger";
import replaceEmojisWithImages from "./functions/newDesign/replaceEmojisWithImages";
import showSnackbar from "./components/snackbar/snackbar";
import createStyle from "./functions/classicalProfile/scripts/createStyle";
import innerNoticeStyle from "./innerNoticeStyle";
import banner from "./components/banner/banner";
import createVkToolsBanners from "./functions/createVkToolsBanners/createVkToolsBanners";
import posters from "./functions/posters/posters";
import listenWall from "./functions/oldPosting/listenWall";
import tooltip from "./components/tooltip/tooltip";
import showForwardBox from "./showForwardBox";
import oldAttaches from "./functions/oldMessenger/oldAttaches/oldAttaches";
import searchHashes from "./searchHashes";
import { hook } from "./hookFunction";
import { showLoadingOverlay } from "./components/overlay/LoadingOverlay";
import checkIsSection from "./functions/feedReorder/checkIsSection";

let debugMode = false;

console.log("[VK Tools] Injected");
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

/*Стиль ломает раздел фотографии и комментарии createStyle('antiAds', `
#feed_rows > [class]:has(.post:not([onclick^='wall.postClick'])) {
  display: none;
}
`);*/

window.MotionKit = {};
Object.freeze(window.MotionKit);

if (debugMode) {
	const protectedConsole = new Proxy(console, {
		set(target, property, value, receiver) {
			return true;
		},
		deleteProperty(target, property) {
			return false;
		},
		defineProperty(target, property, descriptor) {
			return true;
		}
	});

	window.console = protectedConsole;
}

const statsVars = [
	"send_user_info_stats",
	"force_send_user_info",
	"send_user_info_on_localhost",
	"send_navigation_stats_in_spa",
	"log_send_user_info_errors",
	"web_mytracker_collect_post_stats",
	"web_stats_device_id",
	"web_stats_reduce_debounce",
	"web_stats_send_beacon",
	"web_stats_send_on_events_limit",
	"web_stats_transport_story_view",
	"sentry_js_web_request_timeouts_feature",
	"sentry_js_web_request_timeouts_forwarding",
	"sentry_js_web_timeouts_forwarding",
	"sentry_js_web_verbose",
	"sentry_log_network_errors",
	"ads_app_form_link_redirect",
	"ads_autopromotion_web_geo",
	"ads_easy_promote_goods_new_create_api",
	"ads_light_methods_protection",
	"ads_market_autopromotion_bookmarks_stats",
	"ads_use_vk_community_video_portrait_4_5",
	"clips_web_my_tracker",
	"feed_post_track_code_client_web",
	"games_send_track_visitor_activity",
	"js_errors_no_write_uncaught_errors",
	"tgb_adblock_protection",
	"post_adblock_protection_promo",
	"eager_error_monitoring",
	"mini_apps_performance_close_app_empty_event",
	"mini_apps_performance_iframe_errors",
	"mini_apps_performance_web",
	"mini_apps_send_my_tracker_activity",
	"post_click_analytics_int_ext_link_click_web",
	"posting_track_event_count",
	"unique_adblock_users",
	"audio_my_tracker_web",
	"mini_apps_send_stat_arguments_bridge_events_sdk",
	"ajax_request_parse_html_error",
	"js_errors_no_write_uncaught_errors",
	"tns_track_sections",
	"tns_track_hosts",
	"geminus_counter",
	"ads_pixels_track_new_events_web_mvk",
	"web_navigation_handlers",
	"measure_module_navigation_stats",
	"group_join_track_event_count",
	"feed_content_events_open_post_event_web",
	"feed_posts_duration_stats_fix",
	"collect_unsupported_user_info_stats",
	"log_fetch_requests",
	"log_fetch_requests_get",
	"post_adguard_protection_promo",
	"extended_ajax_logging",
	"messenger_mediascope_stats_collect",
	"audio_player_stats_web"
];
deferredCallback(
	async (_vk: any) => {
		statsVars.forEach((varName) => {
			delete window.vk.pe[varName];
		});
	},
	{ variable: "vk" }
);

window.urls = null;
if (!window.vkenh) {
	window.vkenh = {};
}
window.vkenh.profileHashes = {};
window.vkenh.showSnackbar = showSnackbar;
window.vkenh.createBanner = banner;
window.vkenh.createTT = tooltip;
window.vkenh.setEnglishMusic = 0;
window.showForwardBox = showForwardBox;
window.vkenh.messagesHistory = [];
window.vkenh.messagesDiff = {};
window.vkenh.messagesSent = [];
window.vkenh.curClassicalProfile = {};
window.vkenh.loadingOverlay = showLoadingOverlay;

convert(document);
document.arrive(".ComposerInput__input", { existing: true }, function (e) {
	convert(e);
});

deferredCallback(
	async (_vk: any) => {
		//Баннеры в сообществе VK Tools
		createVkToolsBanners();
		//Получаем фотку юзера из стореджа
		await getUserDataLocalStoragePhoto(vk.id);

		window.vkenh.profileHashes = await vkApi.api('account.getProfileDataLegacy', { owner_id: vk.id });
	},
	{ variable: "vkApi" }
);

function XHRListener() {
	XMLHttpRequest.prototype.send = hook(XMLHttpRequest.prototype.send, async (pre) => {
		const [data] = pre.args;

		const dataString = data === null ? "" : String(data);

		if (
			(/type=typing/.test(dataString) && getLocalValue("nepisalkaValue")) ||
			(/type=audiomessage/.test(dataString) && getLocalValue("nepisalkaValue")) ||
			(/act=a_mark_read/.test(dataString) && getLocalValue("nechitalkaValue")) ||
			(/act=a_mard_listened/.test(dataString) && getLocalValue("nechitalkaValue"))
		) {
			pre.abort(undefined);
			return;
		}

		if (/subsection=recent/.test(dataString)) {
			localStorage.setItem("feedValue", "recent");
			await feedReorder();
		}

		if (/subsection=top/.test(dataString)) {
			localStorage.setItem("feedValue", "top");
			await feedReorder();
		}

		if (/loaded_from=navigation/.test(dataString)) {
			feedReorderRemove();
			await feedReorder();
		}
		return undefined;
	});
}

XHRListener();

deferredCallback(
	() => {
		nav.subscribeOnModuleEvaluated(async () => {
			checkIsSection();
			await feedReorder();
		});
		nav.onLocationChange((() => {
			checkIsSection();
		}))
	},
	{ variable: "nav" }
);

deferredCallback(
	() => {
		let currentVKID = localStorage.getItem("currentVKID");
		let currID = currentVKID ? parseInt(currentVKID) : 0;
		if (vk.id !== currID && vk.id && vk.id !== 0) {
			customMessage("tokenRemove");
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

			e.browserEnv.api.fetch = async function (method: string, params: any, ...args: any[]) {
				if (method === "messages.send") {
					params.message = replaceEmojisWithImages(params.message);
				}
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
				let response = await j.apply(this, [method, params, ...args]);
				if (method === "messages.getHistory" && getLocalValue("oldMessengerAttaches")) {
					let i = Object.keys(window.vkenh.messagesHistory).length || 0;
					window.vkenh.messagesHistory[i] = {
						peer_id: response.items[0].peer_id,
						messages: response.items
					};
				}

				if (method === "messages.getDiffContent" && getLocalValue("oldMessengerAttaches")) {
					let cmidsToID: any = [];
					let i = 0;
					response.items.forEach((item: any) => {
						cmidsToID[i] = {
							peer_id: item.peer_id,
							messages: item.messages
						};
						i++;
					});
					window.vkenh.messagesDiff = cmidsToID;
				}
				if (method === "messages.send" && getLocalValue("oldMessengerAttaches")) {
					let i = Object.keys(window.vkenh.messagesSent).length || 0;
					window.vkenh.messagesSent[i] = {
						peer_id: params.peer_id,
						messages: response
					};
				}
				return Promise.resolve(response);
			};
		});
	},
	{ variable: "MECommonContext" }
);

window.addEventListener("message", async (event) => {
	let messageAct;
	try {
		messageAct = event.data.action.messageAction;
	} catch (error) {
		messageAct = "";
	}
	switch (messageAct) {
		case "oldClubEnabled": {
			localStorage.setItem("oldClubs", "true");
			break;
		}
		case "oldClubDisabled": {
			localStorage.setItem("oldClubs", "false");
			break;
		}
		case "feedOldThemeEnabled": {
			localStorage.setItem("feedOldPosts", "true");
			break;
		}
		case "feedOldThemeDisabled": {
			localStorage.setItem("feedOldPosts", "false");
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
		case "oldMessengerAttaches": {
			localStorage.setItem("oldMessengerAttaches", event.data.value.messageValue);
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
			localStorage.setItem("removePostReactions", "true");
			try {
				updateReactState();
			} catch (error) {
				console.log(error);
			}
			break;
		}
		case "backPostReactions": {
			localStorage.setItem("removePostReactions", "false");
			break;
		}
		case "videoModalEnabled": {
			localStorage.setItem("videoModal", "true");
			break;
		}
		case "videoModalDisabled": {
			localStorage.setItem("videoModal", "false");
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
		ajax.post = hook(ajax.post, (pre) => {
			if ("al_profileEdit.php" === pre.args[0] && "a_save_general" === pre.args[1].act) {
				if (pre.args[1].nickname) {
					pre.args[1].nick_name = pre.args[1].nickname;
					delete pre.args[1].nickname;
				} else if (!pre.args[1].nick_name) {
					pre.args[1].nick_name = "";
				}
				pre.modifyArgs(pre.args);
				return (result) => result;
			}
		});
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
function decodeURL(url: string, win1251: TextDecoder): string | null {
	let tempurl = url.replace(/(?:%[0-9A-F]{2})+/g, (s) => {
		const byteArray = new Uint8Array(s.match(/%[0-9A-F]{2}/g)!.map((hex) => parseInt(hex.slice(1), 16)));
		return win1251.decode(byteArray);
	});
	let URLObjParamsWindows1251 = new URL(tempurl).searchParams;
	let URLObjParamsUTF8 = new URL(url).searchParams;
	const decoded = URLObjParamsUTF8.get("utf") === "1" ? URLObjParamsUTF8.get("to") : URLObjParamsWindows1251.get("to");
	return decoded;
}
if (localStorage.getItem("removeAway") === "true") {
	const win1251 = new TextDecoder("windows-1251");
	document.arrive("a[href*='away.php']", { existing: true }, function (link) {
		const hrefable = link as HTMLAnchorElement;
		const url = new URL(hrefable.href);
		const toParam = url.searchParams.get("to");
		if (toParam) {
			const decodedUrl = decodeURL(hrefable.href, win1251);
			hrefable.href = decodedUrl!;
		}
	});
}

//Старый дизайн мессенджера
deferredCallback(() => oldMessenger(), { variable: "vk" });
//Старый дизайн вложений в мессенджере
oldAttaches();
//Стиль для старой иконки нотиса аудио 18+
createStyle("audioNoticeIcon", innerNoticeStyle());
//Постеры
listenWall((_wall) => {
	posters();
});
//Удаляем скелетоны в классик профиле
if (getLocalValue("isClassicalProfileDesign")) {
	createStyle(
		"removeSkeletonClassic",
		`
      #profile_skeleton, .ProfileSkeleton {
	      display:none!important;
      }
    `
	);
}
