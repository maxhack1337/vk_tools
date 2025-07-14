const extractExtendObject = (text: string) => {
  const match = text.match(/extend\s*\(\s*cur\s*,\s*({[\s\S]+?})\s*\)/);
  if (!match) return null;
  let objStr = match[1];
  objStr = objStr.replace(/(\w+)\s*:/g, '"$1":');
  objStr = objStr.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (match, p1) => {
    const escaped = p1.replace(/"/g, '\\"');
    return `"${escaped}"`;
  });

  try {
    return JSON.parse(objStr);
  } catch (e) {
    console.error("[VK Tools Error] Ошибка парсинга хеша для ссылок:", e, objStr);
    return null;
  }
};

export default extractExtendObject;
