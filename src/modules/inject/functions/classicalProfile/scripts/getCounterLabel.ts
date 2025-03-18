import getAudioContLang from "./getAudioContLang";
import getLang1 from "./getLang1";
import getLangTime from "./getLangTime";
import getPhotoTagText from "./getPhotoTagText";
import getPostLangKey from "./getPostLangKey";

const getCounterLabel = (counterType: string, value: number) => {
        switch (counterType) {
          case "photos": {
            return getLangTime(
              value,
              getLang?.("profile_user_content_albums_photos_count", "raw") || [
    "",
    "фото",
    "фото",
    "фото"
]
            );
          }
          case "audios": {
            return getLangTime(
              value,
              getAudioContLang(vk.lang)
            );
          }
          case "followers": {
            return getLangTime(value, getLang?.("profile_count_fans", "raw") || [
    "",
    "подписчик",
    "подписчика",
    "подписчиков"
]);
          }
          case "friends": {
            return getLangTime(
              value,
              getLang?.("profile_count_friends_new", "raw") || [
    "",
    "друг",
    "друга",
    "друзей"
]
            );
          }
          case "user_photos": {
            return getLangTime(
              value,
              getPhotoTagText(vk.lang)
            );
          }
            case "mutual_friends": {
            let mutualArr = getLang?.("profile_mutual_label_short", "raw");
            return getLangTime(
              value,
              Array.isArray(mutualArr) ? mutualArr.map(item => item.replace(/%s/g, '')) : mutualArr || [
    "",
    "общий друг",
    "общих друга",
    "общих друзей"
]
            );
          }
            case "videos": {
            let vidArr = getLang?.("profile_videos", "raw");
            return getLangTime(value, Array.isArray(vidArr) ? vidArr[0].toLowerCase() : vidArr?.toLowerCase() || 'видео');
            //return getLangBottom(value,removeStringsVideo(getLang("video_found_videos_global", "raw")))
          }
          case "posts": {
            return getLangTime(value, getPostLangKey(vk.lang) || ["", "запись", "записи", "записей"]);
          }
        }
}
      
export default getCounterLabel;
