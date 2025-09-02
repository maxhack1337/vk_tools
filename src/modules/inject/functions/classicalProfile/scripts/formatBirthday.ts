import getMonthNameOnline from "./getMonthNameOnline";

const formatBirthday = (bdate: string) => {
  if (!bdate) return null;
  let parts = bdate.split(".");
  let day = parts[0];
  let month = getMonthNameOnline(Number(parts[1]));
  let year = parts[2];
  let formattedDate = `${day} ${month}`;
  let profileBDayYearLetter = getLang?.("profile_birthday_year_date") || "{link_day}{day} {month}{/link_day} {link_year}{year} г.{/link_year}";
  let regex = /{year}(.*?){\/link_year}/;
  let match;
  if (Array.isArray(profileBDayYearLetter)) {
    match = profileBDayYearLetter[0].match(regex);
  } else {
    match = profileBDayYearLetter.match(regex);
  }
  let formattedYearLetter = match ? match[1].replace(/\s/g, "") : "";
  let yearLink = year ? `<a href="https://${vk.__domain || "vk.ru"}/search/people?birth_year=${year}">${year} ${formattedYearLetter}</a>` : "";
  if (year) {
    formattedDate += ` ${yearLink}`;
  }
  return `<a href="https://${vk.__domain || "vk.ru"}/search/people?birth_day=${day}&birth_month=${parts[1]}">${formattedDate}</a>`;
};

export default formatBirthday;
