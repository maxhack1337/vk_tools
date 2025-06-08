export const isRealClickEvent = (event: any) => {
  return event.type === "click" && event.clientX !== 0 && event.clientY !== 0;
};

export const useMeLang = async (key: string) => {
  try {
    let context = await MECommonContext;
    return context.browserEnv.lang.use(key);
  } catch (error) {
    return false;
  }
};

export const splitRaw = (raw: string) => {
  const [oidStr, idStr] = raw.split("_");
  return {
    oid: Number(oidStr),
    id: Number(idStr),
  };
};
