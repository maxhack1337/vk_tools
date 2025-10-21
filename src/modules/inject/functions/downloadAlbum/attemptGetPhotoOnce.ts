import getPhoto from "./getPhoto";

const attemptGetPhotoOnce = (url: string | undefined, photoItem: any, snack: HTMLElement, timeoutMs: number) => {
  if (!url) {
    return Promise.reject(new Error("no-url"));
  }
  const getPhotoPromise = getPhoto(url, photoItem, snack);
  const timeoutPromise = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject(new Error("timeout"));
    }, timeoutMs);
  });
  return Promise.race([getPhotoPromise as Promise<any>, timeoutPromise]);
};

export default attemptGetPhotoOnce;
