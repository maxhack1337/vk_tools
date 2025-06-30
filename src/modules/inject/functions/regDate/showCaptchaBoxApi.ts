import loadVkIdCaptchaModule from "./loadVkIdCaptchaModule";

let vkidCaptchaPromise: Promise<any> | null = null;

const showCaptchaBoxApi = async (url: string) => {
  if (!window.vkidCaptcha) {
    if (!vkidCaptchaPromise) {
      vkidCaptchaPromise = loadVkIdCaptchaModule();
    }
    await vkidCaptchaPromise;
  }

  const CaptchaSDK = await window.vkidCaptcha;

  if (!CaptchaSDK) {
    throw new Error("Captcha SDK is not initialized");
  }

  const box = new CaptchaSDK.CaptchaWidget();

  try {
    const successToken = await box.show({
      iframeSrc: url,
      container: document.body,
      view: "popup",
      onClose: () => {},
    });

    return successToken;
  } catch (error) {
    return "failed";
  }
};

export default showCaptchaBoxApi;
