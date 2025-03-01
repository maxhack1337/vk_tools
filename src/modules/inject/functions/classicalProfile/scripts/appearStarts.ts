import createProfileInfoRow from "./createProfileInfoRow";
import formatBirthday from "./formatBirthday";
import formatRegister from "./formatRegister";
import getLangTime from "./getLangTime";
import getMoreInfoLang from "./getMoreInfoLang";
import getRegDateLabel from "./getRegDateLabel";
import getRegDateValue from "./getRegDateValue";
import getRelationText from "./getRelationText";
import getZodiacIndex from "./getZodiacIndex";

      const appearStarts = async (userData: { bdate: any; id: number; relation: any; city: { id: any; title: any; }; occupation: any; site: any; home_town: string; personal: { langs_full?: any; alcohol?: any; life_main?: any; people_main?: any; smoking?: any; inspired_by?: any; religion?: any; }; relatives: string | any[]; home_phone: string; mobile_phone: string; skype: string; career: string | any[]; universities: string | any[]; schools: string | any[]; military: string | any[]; activities: string; interests: string; music: string; movies: string; tv: string; books: string; games: string; quotes: string; about: string; relation_partner: any; sex: any; }) => {
        let pageCurrentInfo = document.querySelector(".ProfileInfo");

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
            if (
              currentMonth1 < birthMonth1 ||
              (currentMonth1 === birthMonth1 && currentDay1 < birthDay1)
            ) {
              age--;
            }
            ageAndZodiac = `${getLangTime(
              age,
              getLang?.("global_years_accusative", "raw") || [
    "",
    "%s год",
    "%s года",
    "%s лет"
]
            )}, ${getZodiacIndex(parts[0], parts[1])}`;
          } else if (parts.length === 2) {
            ageAndZodiac = `${getZodiacIndex(parts[0], parts[1])}`;
          }

          let birthdayRow = createProfileInfoRow(
            getLang?.("profile_info_birth_date"),
            `${formattedBirthday} (${ageAndZodiac})`
          );
          if (birthdayRow) {
            profileShort.appendChild(birthdayRow);
          }
        }

        try {
          let regDateText = getRegDateLabel(vk.lang);
          let regDateValue1 = await getRegDateValue(userData.id);
          let regDateDate = formatRegister(regDateValue1?.[0] || '');
          regDateDate += " " + regDateValue1?.[1];
          let registrationRow = createProfileInfoRow(regDateText, regDateDate);
            if (registrationRow && !regDateDate?.includes('null')) {
                profileShort.appendChild(registrationRow);
            } else {
                console.error(
                "[VK Tools Error]: There is no registration date for user " +
                userData.id
                 );
            }
        } catch (error) {
          console.error(
            "[VK Tools Error]: There is no registration date for user " +
              userData.id
          );
        }

        let relationText = await getRelationText(userData.relation, userData);
        let relationRow = createProfileInfoRow(
          getLang?.("profile_family"),
          relationText
        );
        if (relationRow) {
          profileShort.appendChild(relationRow);
        }

        let cityRow = createProfileInfoRow(
          getLang?.("Town"),
          userData.city
            ? `<a href="https://vk.com/search/people?city_id=${userData.city.id}">${userData.city.title}</a>`
            : null
        );
        if (cityRow) {
          profileShort.appendChild(cityRow);
        }

        let occupation = userData.occupation;
        let companyRow;
        if (occupation && occupation.type === "work") {
          let company = occupation.name;
          let comid = occupation.id;
          let companyLink = comid
            ? `https://vk.com/club${comid}`
            : `https://vk.com/search/people?company=${encodeURIComponent(company)}`;
          let additionalsV = "";
          if (comid) {
            additionalsV = `mention_id="club${comid}" onmouseover="mentionOver(this)"`;
          }
          companyRow = createProfileInfoRow(
            `${getLang?.("Work_place")}:`,
            `<a href="${companyLink}" ${additionalsV}>${company}</a>`
          );
        }
        if (occupation && occupation.type === "university") {
          let company = occupation.name;
          let comid = occupation.id;
          let graduate = "";
          let companyLink = `/search/people?education_city_id=${occupation.city_id}&university=${comid}`;
          if (occupation.graduate_year) {
            graduate = `<a href="/search/people?education_city_id=${occupation.city_id}&university=${comid}&university_year=${occupation.graduate_year}">'${occupation.graduate_year.toString().slice(-2)}</a>`;
          }
          companyRow = createProfileInfoRow(
            `${getLang?.("profile_education")}`,
            `<a href="${companyLink}">${company}</a>${graduate}`
          );
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
              site = "https://vk.com/id" + id;
              siteText = name;
            }
          }
          if (!site.startsWith("http://") && !site.startsWith("https://")) {
            site = "https://" + site;
          }
          siteRow = createProfileInfoRow(
            getLang?.("Contact_site"),
            `<a href="${site}" target="_blank">${siteText}</a>`
          );
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
              (userData.personal.life_main &&
                userData.personal.life_main !== 0) ||
              (userData.personal.people_main &&
                userData.personal.people_main !== 0) ||
              (userData.personal.smoking && userData.personal.smoking !== 0) ||
              (userData.personal.inspired_by &&
                userData.personal.inspired_by !== "") ||
              (userData.personal.religion &&
                userData.personal.religion !== "")) &&
            Object.keys(userData.personal).length > 0) ||
          (userData.activities && userData.activities !== "") ||
          (userData.interests && userData.interests !== "") ||
          (userData.music && userData.music !== "") ||
          (userData.movies && userData.movies !== "") ||
          (userData.tv && userData.tv !== "") ||
          (userData.books && userData.books !== "") ||
          (userData.games && userData.games !== "") ||
          (userData.quotes && userData.quotes !== "") ||
          (userData.about && userData.about !== "")
        ) {
          profileShort.appendChild(profileMoreInfo);
        }
        pageCurrentInfo?.appendChild(profileShort);




}
      
export default appearStarts;