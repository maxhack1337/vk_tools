function findClubInfo(rootObj: any) {
  const stack = [rootObj];
  const seen = new Set();

  while (stack.length > 0) {
    const currentObj = stack.pop();

    if (currentObj === null || typeof currentObj !== "object") continue;
    if (seen.has(currentObj)) continue;
    seen.add(currentObj);

    if ("can_message" in currentObj && "has_photo" in currentObj && "id" in currentObj && "screen_name" in currentObj) {
      try {
        return JSON.parse(JSON.stringify(currentObj));
      } catch (e) {
        return currentObj;
      }
    }

    for (const key in currentObj) {
      if (!Object.prototype.hasOwnProperty.call(currentObj, key)) continue;

      let value;
      try {
        value = currentObj[key];
      } catch (e) {
        continue;
      }

      if (value && typeof value === "object") {
        stack.push(value);
      }
    }
  }

  return null;
}

export default findClubInfo;
