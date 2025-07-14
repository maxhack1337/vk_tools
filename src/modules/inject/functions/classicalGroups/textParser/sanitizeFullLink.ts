import { escapeUrl } from "../../../escapeHtml";

const sanitizeFullLink = (raw: string, cap: number) => {
  let cleaned = raw;
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {}
  if (cleaned.length > cap) {
    cleaned = cleaned.substring(0, cap - 2) + "..";
  }
  return escapeUrl(cleaned).replace(/\n/g, " ");
};

export default sanitizeFullLink;
