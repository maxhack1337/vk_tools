import { VK_ID_CAPTCHA_SCRIPT_SRC } from "../../constants";

const loadVkIdCaptchaModule = async () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = VK_ID_CAPTCHA_SCRIPT_SRC;

    script.onload = async () => {
      try {
        if (window.vkidCaptchaInit instanceof Promise) {
          const sdk = await window.vkidCaptchaInit;
          if (sdk) {
            resolve(sdk);
          } else {
            reject("Captcha SDK is undefined after init");
          }
        } else if (window.vkidCaptchaInit) {
          resolve(window.vkidCaptchaInit);
        } else {
          reject("Captcha SDK is undefined");
        }
      } catch (error) {
        reject(error);
      }
    };

    script.onerror = () => {
      reject("Failed to load Captcha SDK script");
    };

    document.body.appendChild(script);
  });
};

export default loadVkIdCaptchaModule;
