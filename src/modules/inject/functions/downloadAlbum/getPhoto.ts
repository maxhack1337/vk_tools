const getPhoto = async(maxSizeUrl: string | URL | Request, photoItem: any, progressBar: HTMLElement) => {
  let attempts = 0;
  while (attempts < 10) {
    try {
      let response = await fetch(maxSizeUrl);
      let blob = await response.blob();
      let filename = `${photoItem.owner_id}_${photoItem.id}.jpg`;
      return [filename, blob];
    } catch (error) {
        let pBar = progressBar.querySelector(
            ".vkEnhSnackbar__content-text"
        );
        let isArr = getLang?.("calls_status_bad_internet_connection");
          if(pBar) pBar.innerHTML = Array.isArray(isArr) ? isArr[0] : isArr || 'У вас плохое интернет-соединение';
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  }
  throw new Error("Failed to fetch photo after 10 attempts");
}

export default getPhoto;