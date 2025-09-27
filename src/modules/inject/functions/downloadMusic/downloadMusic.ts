import appendButton from "./appendButton";
import appendButtonPlist from "./appendButtonPlist";
import appendMessengerButton from "./appendMessengerButton";
import appendPostPrimaryButton from "./appendPostPrimaryButton";
import appendPostSecondaryButton from "./appendPostSecondaryButton";
import appendTopPlayerButton from "./appendTopPlayerButton";
import getMessengerAudioUrl from "./getMessengerAudioUrl";
import getPostSecondaryAudioUrl from "./getPostSecondaryAudioUrl";
import getPrimaryAudioUrl from "./getPrimaryAudioUrl";
import getSuperAudioPropsMin from "./getSuperAudioPropsMin";

const downloadMusic = () => {
  document.arrive('[class*="AudioRow__root"] [class*="AudioRow__overlay"]', { existing: true }, async function (e) {
    let x: any = getSuperAudioPropsMin(e.querySelector('[class*="AudioRow__actions"] > div')!);
    let key = x;
    let access = key.access_key ? "_" + key.access_key : "";
    let subKey = key.owner_id + "_" + key.id + access;
    let pListID;
    let getPlistID = ajax.post("al_audio.php?act=reload_audios", {
      audio_ids: subKey,
      al: 1,
    });

    getPlistID.onload = function () {
      pListID = JSON.parse(getPlistID.response).payload[1][0][0][19][2];
    };
    let linkAudio = await vkApi.api("audio.getById", {
      audios: subKey + "_" + pListID,
    });
    let objectOf = [linkAudio[0].artist, linkAudio[0].title];
    appendButtonPlist(e.querySelector('[class*="AudioRow__actions"] > div')!, linkAudio, subKey + "_" + pListID, objectOf);
  });
  document.arrive(".audio_row:not(.audio_claimed) .audio_row__actions", { existing: true }, function (e) {
    appendButton(e as HTMLElement);
  });
  document.arrive(".AttachAudio", { existing: true }, (e) => {
    let el = e as HTMLElement;
    let ret = getMessengerAudioUrl(el);
    if (ret?.url) {
      let url = ret.url;
      let img = ret.thumb?.photo_270;
      let title = ret.artist + " - " + ret.title;
      appendMessengerButton(url, img, title, el);
    }
  });

  document.arrive('[class^="vkitSecondaryAttachment__root"]', { existing: true }, (e) => {
    let el = e as HTMLElement;
    let ret = getPostSecondaryAudioUrl(el);
    if (ret?.url) {
      let url = ret.url;
      let img = ret.thumb?.photo_270;
      let title = ret.artist + " - " + ret.title;
      appendPostSecondaryButton(url, img, title, el.querySelector('[class^="vkitSecondaryAttachment__after"]')!);
    }
  });

  document.arrive('[class^="vkitPrimaryAttachmentAudio__container"]', { existing: true }, (e) => {
    let el = e as HTMLElement;
    let ret = getPrimaryAudioUrl(el);
    if (ret?.url) {
      let url = ret.url;
      let img = ret.thumb?.photo_270;
      let title = ret.artist + " - " + ret.title;
      appendPostPrimaryButton(url, img, title, el.querySelector('[class*="ButtonGroup__host"]')!);
    }
  });

  document.arrive(".top_audio_player", { fireOnAttributesModification: true }, (e) => {
    let el = e as HTMLElement;
    if (el.classList.contains("top_audio_player_enabled")) appendTopPlayerButton(el, true);
  });

  /*top audio player react*/
  document.arrive("#web_spa_top_audio_player", { existing: true }, (topPlayer) => {
    appendTopPlayerButton(topPlayer as HTMLElement, false);
  });
};

export default downloadMusic;
