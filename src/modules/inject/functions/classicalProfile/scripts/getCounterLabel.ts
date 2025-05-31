import getAudioContLang from "./getAudioContLang";
import getLangTime from "./getLangTime";
import getPhotoTagText from "./getPhotoTagText";
import getPostLangKey from "./getPostLangKey";

const getCounterLabel = (counterType: string, value: number) => {
  switch (counterType) {
    case "photos": {
      let photosArr = getLang?.("profile_user_content_albums_photos_count", "raw");
      return getLangTime(value, Array.isArray(photosArr) ? photosArr.map((item) => item.replace(/%s/g, "")) : photosArr || ["", "фото", "фото", "фото"]);
    }
    case "audios": {
      return getLangTime(value, getAudioContLang(vk.lang));
    }
    case "followers": {
      let subsArr = getLang?.("profile_count_fans", "raw");
      return getLangTime(value, Array.isArray(subsArr) ? subsArr.map((item) => item.replace(/%s/g, "")) : subsArr || ["", "подписчик", "подписчика", "подписчиков"]);
    }
    case "friends": {
      let friendsArr = getLang?.("profile_count_friends_new", "raw");
      return getLangTime(value, Array.isArray(friendsArr) ? friendsArr.map((item) => item.replace(/%s/g, "")) : friendsArr || ["", "друг", "друга", "друзей"]);
    }
    case "user_photos": {
      return getLangTime(value, getPhotoTagText(vk.lang));
    }
    case "mutual_friends": {
      let mutualArr = getLang?.("profile_mutual_label_short", "raw");
      return getLangTime(value, Array.isArray(mutualArr) ? mutualArr.map((item) => item.replace(/%s/g, "")) : mutualArr || ["", "общий друг", "общих друга", "общих друзей"]);
    }
    case "videos": {
      let vidArr = getLang?.("profile_videos", "raw");
      return getLangTime(value, Array.isArray(vidArr) ? vidArr[0].toLowerCase() : vidArr?.toLowerCase() || "видео");
    }
    case "posts": {
      return getLangTime(value, getPostLangKey(vk.lang) || ["", "запись", "записи", "записей"]);
    }
  }
};

export default getCounterLabel;
