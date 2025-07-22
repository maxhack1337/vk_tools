import "./vk-captcha-sdk.js";

if (!window.vkidCaptchaInit) {
  window.vkidCaptchaInit = new Promise((resolve, reject) => {
    const checkInterval = 50;
    const maxAttempts = 100;
    let attempts = 0;

    const checkWidget = () => {
      attempts++;
      if (window._vkidCaptchaWidget) {
        resolve(window._vkidCaptchaWidget);
      } else if (attempts >= maxAttempts) {
        reject("Failed to init Captcha SDK Widget");
      } else {
        setTimeout(checkWidget, checkInterval);
      }
    };
    checkWidget();
  });
}

if (!window.vkidCaptcha) {
  window.vkidCaptcha = window.vkidCaptchaInit.then(() => {
    if (window._vkidCaptchaWidget && window._vkidCaptchaCheckError) {
      return {
        CaptchaWidget: window._vkidCaptchaWidget,
        checkCaptchaError: window._vkidCaptchaCheckError,
      };
    } else {
      return Promise.reject("Failed to init Captcha SDK Widget");
    }
  });
}

const loadVkIdCaptchaModule = async () => {
  return new Promise((resolve, reject) => {
    if (typeof window.vkidCaptchaInit !== "undefined") {
      if (window.vkidCaptchaInit instanceof Promise) {
        window.vkidCaptchaInit
          .then((sdk) => {
            if (sdk) {
              resolve(sdk);
            } else {
              reject("Captcha SDK is undefined after promise init");
            }
          })
          .catch(reject);
      } else {
        resolve(window.vkidCaptchaInit);
      }
    } else {
      console.error("window.vkidCaptchaInit is not defined immediately. This might indicate an issue with SDK initialization or execution order.");
      reject("Captcha SDK not initialized.");
    }
  });
};

export default loadVkIdCaptchaModule;
