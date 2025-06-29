import showCaptchaBoxApi from "../../regDate/showCaptchaBoxApi";

const handleCaptcha = async (captcha: any) => {
  try {
    const url = captcha.redirect_uri;
    const successToken = await showCaptchaBoxApi(url);

    if (successToken === "failed") {
      throw new Error("[VK Tools] Капча не пройдена или окно закрыто");
    }

    return {
      captcha_sid: captcha.captcha_sid,
      captcha_attempt: captcha.captcha_attempt,
      captcha_ts: captcha.captcha_ts,
      success_token: successToken,
      is_sound_captcha: 0,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export default handleCaptcha;
