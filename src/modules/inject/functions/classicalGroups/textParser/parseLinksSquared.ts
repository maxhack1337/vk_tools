import { escapeAttr } from "../../../escapeHtml";

const squaredPattern = new RegExp("\\[([^\\$\\[\\]]+?)\\|([^\\]]+?)\\]", "g");

const squaredLinkPattern = new RegExp(
  "\\[((?:https?:\\/\\/)?(?:(?:m\\.|dev\\.)?(?:vk\\.com|vk\\.ru|vkvideo\\.ru|vkontakte\\.ru|vk\\.me|userapi\\.com|vk\\.me))" + "(?!\\/\\/)(?!\\/doc[\\d\\-])(?!\\/page[\\d\\-])(?!\\/away[\\.\\?])" + "(?:\\/[\\w\\-\\.\\/_~:\\?#\\[\\]@!\\$&'\\(\\)\\*\\+,;=%]*)*)" + "\\|([^\\]\\n\\t]*)\\]"
);

const vkLinkPattern = new RegExp("^(https?:\\/\\/)?([a-zA-Z0-9\\.\\_\\-]+\\.)?(vk\\.com|vk\\.ru|vkvideo\\.ru|vkontakte\\.ru|vk\\.me|userapi\\.com)($|\\/(.*))");

const parseLinksSquared = (input: string) => {
  return input.replace(squaredPattern, (fullMatch) => {
    const linkMatch = squaredLinkPattern.exec(fullMatch);
    if (linkMatch) {
      let [, link, textLink] = linkMatch;

      const urlObject = vkLinkPattern.exec(link);
      if (urlObject) {
        link = urlObject[4] || "/";
      }

      const safeUrl = escapeAttr(link);
      const safeText = escapeAttr(textLink);

      return `<a href="${safeUrl}" rel="nofollow noreferrer" target="_blank">${safeText}</a>`;
    }

    return fullMatch;
  });
};

export default parseLinksSquared;
