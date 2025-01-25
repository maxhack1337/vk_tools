import postingFooterLangSuggest from "./postingFooterLangSuggest";
import postingFooterLangWhatsNew from "./postingFooterLangWhatsNew";

const getPostingFooterLabel = (onlyOfficial: boolean, isSuggested: boolean) => {
	if (onlyOfficial === false) {
		return getLang?.('profile_enter_post').toString() || 'Напишите что-нибудь...';
	}

	if (isSuggested) {
		return postingFooterLangSuggest(vk.lang);
	}

	return postingFooterLangWhatsNew(vk.lang);
};

export default getPostingFooterLabel;