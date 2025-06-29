import formatRegister from "../classicalProfile/scripts/formatRegister";
import getLangTime from "../classicalProfile/scripts/getLangTime";
import getRegDateLabel from "../classicalProfile/scripts/getRegDateLabel";
import getRegDateValue from "../classicalProfile/scripts/getRegDateValue";
import getZodiacIndex from "../classicalProfile/scripts/getZodiacIndex";
import handleCaptcha from "../classicalProfile/scripts/handleCaptcha";
import getUserDataReactSpa from "../classicalProfile/scripts/spa/getUserDataReactSpa";
import createProfileInfoRow3 from "./createProfileInfoRow3";
import createRegDateInfoRow2 from "./createRegDateInfoRow2";
import getUserIdUsingApi from "./getUserIdUsingApi";

/*
 * Функция под вопросом
 * Если сломается API - пиши Мирату. Если сломается метод получения - пишите мне, будем искать новый
 */

const regDate = () => {
  document.arrive(`[class^="ProfileFullInfoModal__content"]>section:nth-child(1)`, { existing: true }, async function (e) {
    try {
      let regDateText1 = getRegDateLabel(vk.lang);
      let uiddd = await getUserIdUsingApi();
      let regDateValue1 = await getRegDateValue(uiddd);
      let regDateDate1, registrationRow1;
      if (regDateValue1?.captcha_sid) {
        let regDInfoRow = createRegDateInfoRow2(regDateText1);
        let captchaRequired = regDInfoRow.querySelector(".captcha_vktools");
        captchaRequired?.addEventListener("click", async () => {
          while (regDateValue1.redirect_uri) {
            let captcha = (await handleCaptcha({
              redirect_uri: regDateValue1.redirect_uri,
              captcha_sid: regDateValue1.captcha_sid,
              captcha_attempt: regDateValue1.captcha_attempt,
              captcha_ts: regDateValue1.captcha_ts,
            })) as any;
            captcha.restoreSessionId = regDateValue1.restoreSessionId;
            regDateValue1 = await getRegDateValue(uiddd, captcha);
          }
          if (!regDateValue1.redirect_uri) {
            regDateDate1 = formatRegister(regDateValue1?.[0] || "");
            regDateDate1 += " " + regDateValue1?.[1];
            registrationRow1 = createProfileInfoRow3(regDateText1, regDateDate1 || "");
            let captcha_div = document.querySelector(".captcha_vktools")?.closest(".ProfileModalMiniInfoCell") as HTMLDivElement;
            if (captcha_div) {
              captcha_div.outerHTML = registrationRow1?.outerHTML!!;
            }
          }
        });
        registrationRow1 = regDInfoRow;
      } else {
        regDateDate1 = formatRegister(regDateValue1![0]);
        regDateDate1 += " " + regDateValue1![1];
        registrationRow1 = createProfileInfoRow3(regDateText1, regDateDate1 || "");
      }
      if (registrationRow1 && !regDateDate1?.includes("null")) {
        e.appendChild(registrationRow1);
      } else {
        console.error("[VK Tools Error]: There is no registration date for user " + uiddd);
      }
    } catch (error) {
      console.error("[VK Tools Error]: There is no registration date for user " + (await getUserIdUsingApi()) + error);
    }
  });

  document.arrive(`.ProfileModalMiniInfoCell:has(.vkuiIcon--gift_outline_20)`, { existing: true }, async function (e) {
    let respsp = await getUserDataReactSpa();
    respsp = respsp.owner;
    let birthday = respsp.bdate;
    let ageAndZodiac = "";

    let parts = birthday.split(".");
    if (parts.length === 3) {
      let bDayFull = birthday;
      let ptsOfAfe = bDayFull.split(".");
      let birthYear1 = parseInt(ptsOfAfe[2], 10);
      let birthMonth1 = parseInt(ptsOfAfe[1], 10);
      let birthDay1 = parseInt(ptsOfAfe[0], 10);
      let todayDate1 = new Date();
      let currentYear1 = todayDate1.getFullYear();
      let currentMonth1 = todayDate1.getMonth() + 1;
      let currentDay1 = todayDate1.getDate();
      let age = currentYear1 - birthYear1;
      if (currentMonth1 < birthMonth1 || (currentMonth1 === birthMonth1 && currentDay1 < birthDay1)) {
        age--;
      }
      ageAndZodiac = `${getLangTime(age, getLang?.("global_years_accusative", "raw") || ["", "%s год", "%s года", "%s лет"])}, ${getZodiacIndex(parts[0], parts[1])}`;
    } else if (parts.length === 2) {
      ageAndZodiac = `${getZodiacIndex(parts[0], parts[1])}`;
    }
    let appherenow = e.querySelector(".ProfileFullCommonInfo__caption");
    if (appherenow) appherenow.textContent += `(${ageAndZodiac})`;
  });
};

export default regDate;
