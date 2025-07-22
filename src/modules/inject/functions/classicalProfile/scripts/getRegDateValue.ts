import formatRegDate from "./formatRegDate";

const getRegDateValue: any = async (id: number, captcha: any) => {
  const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
  if (regDateAlready) return formatRegDate(regDateAlready);

  try {
    let regDateReady;
    let response;
    if (captcha?.captcha_sid) {
      const regDate = await fetch(`https://vktools.dinacostudio.ru/vktools.getUserRegDate?id=${id}&captcha_sid=${captcha.captcha_sid}&success_token=${captcha.success_token}&restoreSessionId=${captcha.restoreSessionId}&captcha_attempt=${captcha.captcha_attempt}&captcha_ts=${captcha.captcha_ts}`);
      response = await regDate.json();
      regDateReady = response.vk_tools_registration_date;
      if (regDateReady && regDateReady !== "error") {
        const regDateReadyUNIX = new Date(regDateReady).getTime();
        localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
        return formatRegDate(regDateReadyUNIX);
      }
    } else {
      const foafGet = await fetch(`https://vktools.dinacostudio.ru/vktools.getUserRegDate?id=${id}`);
      response = await foafGet.json();
      regDateReady = response.vk_tools_registration_date;
    }

    if (regDateReady) {
      console.log(regDateReady);
    } else {
      const { captcha_sid, redirect_uri, restoreSessionId, captcha_attempt, captcha_ts } = response;
      return { captcha_sid, redirect_uri, restoreSessionId, captcha_attempt, captcha_ts };
    }

    if (regDateReady && regDateReady !== "error") {
      const regDateReadyUNIX = new Date(regDateReady).getTime();
      localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
      return formatRegDate(regDateReadyUNIX);
    }
  } catch (error) {
    console.log(error);
    // try {
    // 	const backupGet = await fetch(`https://api.vkenhancer.ru/getRegDate?id=${id}`);
    // 	const backupResponse = await backupGet.json();
    // 	const backupRegDateReady = backupResponse.regDate || "error";
    // 	if (backupRegDateReady && backupRegDateReady !== "error") {
    // 		const backupRegDateReadyUNIX = new Date(backupRegDateReady).getTime();
    // 		localStorage.setItem(`regDate_${id}`, backupRegDateReadyUNIX.toString());
    // 		return formatRegDate(backupRegDateReadyUNIX);
    // 	}
    // } catch (backupError) {}
  }
};

export default getRegDateValue;
