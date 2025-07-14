import { escapeUrl } from "../../../escapeHtml";
import linkToObj from "./linkToObj";
import sanitizeFullLink from "./sanitizeFullLink";

const produceReplacement = (data: ReturnType<typeof linkToObj>) => {
  const { host, scheme, trail, match } = data;
  const cleanText = sanitizeFullLink(match, 55);
  const addr = host + trail;
  const vkCheck = new RegExp("^([a-zA-Z0-9\\.\\_\\-]+\\.)?(vk\\.com|vk\\.ru|vkvideo\\.ru|vkontakte\\.ru|vk\\.me|userapi\\.com|vk\\.cc)$");

  if (vkCheck.test(host)) {
    const completeHref = escapeUrl(scheme + host + trail);
    const idFinder = new RegExp("^(?:https?:\\/\\/)?(?:vk\\.com|vk\\.ru|vkvideo\\.ru)?\\/([a-zA-Z0-9\\._]+)\\??$");
    const matchResult = match.match(idFinder);
    const mentionId = matchResult ? matchResult[1] : "";
    return `<a href="${completeHref}" data-mention-id="${mentionId}">${cleanText}</a>`;
  } else {
    const cleanHref = scheme + addr;
    return `<a href="${cleanHref}" rel="nofollow noreferrer" target="_blank">${cleanText}</a>`;
  }
};

export default produceReplacement;
