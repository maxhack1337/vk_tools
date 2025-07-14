import { escapeAttr } from "../../../escapeHtml";

const memPattern = new RegExp("\\[(id|club)(\\d+)(?:\\:([a-z0-9_\\-]+))?\\|([^\\$]+?)\\]", "g");

type MentionParts = {
  type: string;
  id: string;
  alias: string | undefined;
  displayName: string;
};

const parseMentions = (input: string) => {
  let output = input;

  output = output.replace(memPattern, (_fullMatch, type, id, alias, displayName) => {
    const parsed: MentionParts = {
      type,
      id,
      alias,
      displayName,
    };

    const safeType = escapeAttr(parsed.type);
    const safeId = escapeAttr(parsed.id);
    const safeAlias = escapeAttr(parsed.alias || "");
    const safeName = escapeAttr(parsed.displayName);

    const href = `/${safeType}${safeId}`;
    const mentionListeners = ` mention_id="${safeType}${safeId}" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"`;

    return `<a href="${href}" class="mem_link" mention="${safeAlias}"${mentionListeners}>${safeName}</a>`;
  });

  return output;
};

export default parseMentions;
