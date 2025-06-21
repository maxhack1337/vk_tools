/*
 * Обязательно используй если есть вероятность нарваться на XSS
 */

export const escapeHtml = (unsafe: any) => {
  return unsafe.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
};

export const escapeUrl = (url: string) => {
  return url.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export const escapeQuotes = (url: any) => {
  return url.replaceAll(/"/g, "&quot;");
};

export const escapeHtmlDownloadTrack = (unsafe: any) => {
  return unsafe.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export const unescapeAttr = (str: string) => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<");
};
