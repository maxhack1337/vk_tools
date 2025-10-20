import { REG_DATE_API_ENABLED } from "../../../constants";
import { escapeHtml, escapeUrl } from "../../../escapeHtml";
import createProfileInfoRow from "./createProfileInfoRow";
import createRegDateInfoRow from "./createRegDateInfoRow";
import createRegDateSkeletonClassicalRow from "./createRegDateSkeletonClassicalRow";
import formatBirthday from "./formatBirthday";
import formatRegister from "./formatRegister";
import getLangTime from "./getLangTime";
import getMoreInfoLang from "./getMoreInfoLang";
import getRegDateLabel from "./getRegDateLabel";
import getRegDateValue from "./getRegDateValue";
import getRelationText from "./getRelationText";
import getZodiacIndex from "./getZodiacIndex";
import handleCaptcha from "./handleCaptcha";

const appearStarts = async (
  preloadedGroups: any,
  userData: {
    bdate: any;
    id: number;
    relation: any;
    city: { id: any; title: any };
    occupation: any;
    site: any;
    home_town: string;
    personal: {
      langs_full?: any;
      alcohol?: any;
      life_main?: any;
      people_main?: any;
      smoking?: any;
      inspired_by?: any;
      religion?: any;
    };
    relatives: string | any[];
    home_phone: string;
    mobile_phone: string;
    skype: string;
    career: string | any[];
    universities: string | any[];
    schools: string | any[];
    military: string | any[];
    activities: string;
    interests: string;
    music: string;
    movies: string;
    tv: string;
    books: string;
    games: string;
    quotes: string;
    about: string;
    relation_partner: any;
    sex: any;
  }
) => {
  let pageCurrentInfo = document.querySelector(".ProfileHeader__info > div");

  let profileShort = document.createElement("div");
  profileShort.classList.add("profile_info", "profile_info_short");
  profileShort.id = "profile_short";

  let birthday = userData.bdate;
  if (birthday) {
    let formattedBirthday = formatBirthday(birthday);
    let ageAndZodiac = "";

    let parts = birthday.split(".");
    if (parts.length === 3) {
      let bDayFull = userData.bdate;
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

    let birthdayRow = createProfileInfoRow(getLang?.("profile_info_birth_date"), `${formattedBirthday} (${ageAndZodiac})`);
    if (birthdayRow) {
      profileShort.appendChild(birthdayRow);
    }
  }

  try {
    if (REG_DATE_API_ENABLED) {
      let regDateText = getRegDateLabel(vk.lang);
      let registrationRow = document.createElement("div");
      profileShort.appendChild(registrationRow);

      const skeleton = createRegDateSkeletonClassicalRow(regDateText);
      registrationRow.appendChild(skeleton);

      getRegDateValue(userData.id).then(function handleRegDateValue(regDateValue1: any) {
        let regDateDate;

        if (regDateValue1?.captcha_sid) {
          let regDInfoRow = createRegDateInfoRow();
          registrationRow.innerHTML = "";
          registrationRow.appendChild(regDInfoRow);

          let captchaRequired = regDInfoRow.querySelector(".captcha_vktools");
          captchaRequired?.addEventListener("click", function captchaClickHandler() {
            function handleCaptchaLoop(regVal: any): Promise<void> {
              if (regVal.redirect_uri) {
                return handleCaptcha({
                  redirect_uri: regVal.redirect_uri,
                  captcha_sid: regVal.captcha_sid,
                  captcha_attempt: regVal.captcha_attempt,
                  captcha_ts: regVal.captcha_ts,
                }).then(function (captcha: any) {
                  captcha.restoreSessionId = regVal.restoreSessionId;
                  return getRegDateValue(userData.id, captcha).then(handleCaptchaLoop);
                });
              } else {
                regDateDate = formatRegister(regVal?.[0] || "");
                regDateDate += " " + regVal?.[1];
                let newProfileInfoRow = createProfileInfoRow(regDateText, regDateDate);
                registrationRow.innerHTML = "";
                registrationRow.appendChild(newProfileInfoRow as HTMLElement);

                return Promise.resolve();
              }
            }

            handleCaptchaLoop(regDateValue1);
          });
        } else {
          regDateDate = formatRegister(regDateValue1?.[0] || "");
          regDateDate += " " + regDateValue1?.[1];
          let newProfileInfoRow = createProfileInfoRow(regDateText, regDateDate);
          registrationRow.innerHTML = "";
          registrationRow.appendChild(newProfileInfoRow as HTMLElement);
        }

        if (!regDateDate?.includes("null")) {
        } else {
          registrationRow.remove();
          console.error("[VK Tools Error]: There is no registration date for user " + userData.id);
        }
      });
    }
  } catch (error) {
    console.error("[VK Tools Error]: There is no registration date for user " + userData.id);
  }

  let relationText = await getRelationText(userData.relation, userData);
  let relationRow = createProfileInfoRow(getLang?.("profile_family"), relationText);
  if (relationRow) {
    profileShort.appendChild(relationRow);
  }

  let cityRow = createProfileInfoRow(getLang?.("Town"), userData.city ? `<a href="https://${vk.__domain || "vk.ru"}/search/people?city_id=${userData.city.id}">${userData.city.title}</a>` : null);
  if (cityRow) {
    profileShort.appendChild(cityRow);
  }

  let occupation = userData.occupation;
  let companyRow;
  if (occupation && occupation.type === "work") {
    let company = occupation.name;
    let comid = occupation.id;
    let companyLink = comid ? `https://${vk.__domain || "vk.ru"}/club${comid}` : `https://${vk.__domain || "vk.ru"}/search/people?company=${encodeURIComponent(company)}`;
    let additionalsV = "";
    if (comid) {
      additionalsV = `mention_id="club${comid}" onmouseover="mentionOver(this)"`;
    }
    companyRow = createProfileInfoRow(`${getLang?.("Work_place")}:`, `<a href="${companyLink}" ${additionalsV}>${escapeHtml(company)}</a>`);
  }
  if (occupation && occupation.type === "university") {
    let company = occupation.name;
    let comid = occupation.id;
    let graduate = "";
    let companyLink = `/search/people?education_city_id=${occupation.city_id}&university=${comid}`;
    if (occupation.graduate_year) {
      graduate = `<a href="/search/people?education_city_id=${occupation.city_id}&university=${comid}&university_year=${occupation.graduate_year}">​ '${occupation.graduate_year.toString().slice(-2)}</a>`;
    }
    companyRow = createProfileInfoRow(`${getLang?.("profile_education")}`, `<a href="${companyLink}">${company}</a>${graduate}`);
  }
  if (companyRow) {
    profileShort.appendChild(companyRow);
  }

  var site = userData.site;
  var siteRow = null;
  if (site) {
    var siteText = site;
    if (site.startsWith("[")) {
      const match = site.match(/\[id(\d+)\|([^|\]]+)\]/);
      if (match) {
        const id = match[1];
        const name = match[2];
        site = `https://${vk.__domain || "vk.ru"}/id` + id;
        siteText = name;
      }
    }
    if (!site.startsWith("http://") && !site.startsWith("https://")) {
      site = "https://" + site;
    }
    siteRow = createProfileInfoRow(getLang?.("Contact_site"), `<a href="${escapeUrl(site)}" target="_blank">${escapeHtml(siteText)}</a>`);
  }
  if (siteRow) {
    profileShort.appendChild(siteRow);
  }

  var profileMoreInfo = document.createElement("div");
  profileMoreInfo.classList.add("profile_more_info");
  var profileMoreInfoLink = document.createElement("a");
  profileMoreInfoLink.classList.add("profile_more_info_link");
  var profileLabelMore = document.createElement("span");
  profileLabelMore.classList.add("profile_label_more");
  profileLabelMore.style.display = "flex";
  profileLabelMore.textContent = getMoreInfoLang(vk.lang)[0];
  var profileLabelLess = document.createElement("span");
  profileLabelLess.classList.add("profile_label_less");
  profileLabelLess.textContent = getMoreInfoLang(vk.lang)[1];
  profileMoreInfoLink.appendChild(profileLabelMore);
  profileMoreInfoLink.appendChild(profileLabelLess);
  profileMoreInfo.appendChild(profileMoreInfoLink);
  if (
    (userData.home_town && userData.home_town !== "") ||
    (userData.personal && userData.personal.langs_full) ||
    (userData.relatives && userData.relatives.length > 0) ||
    (userData.home_phone && userData.home_phone !== "") ||
    (userData.mobile_phone && userData.mobile_phone !== "") ||
    (userData.skype && userData.skype !== "") ||
    (userData.career && userData.career.length > 0) ||
    (userData.universities && userData.universities.length > 0) ||
    (userData.schools && userData.schools.length > 0) ||
    (userData.military && userData.military.length > 0) ||
    (userData.personal &&
      ((userData.personal.alcohol && userData.personal.alcohol !== 0) ||
        (userData.personal.life_main && userData.personal.life_main !== 0) ||
        (userData.personal.people_main && userData.personal.people_main !== 0) ||
        (userData.personal.smoking && userData.personal.smoking !== 0) ||
        (userData.personal.inspired_by && userData.personal.inspired_by !== "") ||
        (userData.personal.religion && userData.personal.religion !== "")) &&
      Object.keys(userData.personal).length > 0) ||
    (userData.activities && userData.activities !== "") ||
    (userData.interests && userData.interests !== "") ||
    (userData.music && userData.music !== "") ||
    (userData.movies && userData.movies !== "") ||
    (userData.tv && userData.tv !== "") ||
    (userData.books && userData.books !== "") ||
    (userData.games && userData.games !== "") ||
    (userData.quotes && userData.quotes !== "") ||
    (userData.about && userData.about !== "") ||
    (preloadedGroups && Object.entries(preloadedGroups || {})?.length > 0)
  ) {
    profileShort.appendChild(profileMoreInfo);
  }
  pageCurrentInfo?.appendChild(profileShort);
  let shortSkeleton = document.querySelector(".vkToolsProfileShortSkeleton");
  if (shortSkeleton) shortSkeleton.remove();
};

export default appearStarts;
