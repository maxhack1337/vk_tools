import postingFooterLangSuggest from "./postingFooterLangSuggest";
import postingFooterLangWhatsNew from "./postingFooterLangWhatsNew";

const getPostingFooterLabel = (fromOid: any, isUser: boolean, isMyWall: boolean, onlyOfficial: boolean, isSuggested: boolean) => {
  if ((onlyOfficial === false || (isUser && !isMyWall)) && fromOid) {
    return getLang?.("profile_enter_post").toString() || "Напишите что-нибудь...";
  }

  if (isSuggested) {
    return postingFooterLangSuggest(vk.lang);
  }

  return postingFooterLangWhatsNew(vk.lang);
};

export default getPostingFooterLabel;
