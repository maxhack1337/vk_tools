import addRelatives from "./addRelatives";
import appearVariable from "./appearVariable";
import nextExpander from "./nextExpander";

   const expandMore = async(userData: { home_town: string; relatives: string | any[]; home_phone: string; mobile_phone: string; skype: string; career: any; universities: any; schools: any; military: string | any[]; personal: { langs_full?: any; alcohol?: any; life_main?: any; people_main?: any; smoking?: any; inspired_by?: any; religion?: any; political?: any; }; activities: string; interests: string; music: string; movies: string; tv: string; books: string; games: string; quotes: string; about: string; }) => {
        let profileMoreInfo = document.querySelector(".profile_more_info") as HTMLElement;
        if (!profileMoreInfo) {
          return;
        }
        let profileLessLabel = document.querySelector(".profile_label_less") as HTMLElement;
        let profileMoreLabel = document.querySelector(".profile_label_more") as HTMLElement;
       profileMoreInfo.addEventListener("click", async function (event) {
          const target = event.target as Element;
          if (!target?.closest(".vkEnhancerMoreItems")) {
            if (profileMoreLabel?.style.display !== "none") {
              let moreItemsLoaded = document.createElement("div");
              moreItemsLoaded.classList.add("vkEnhancerMoreItems");

              if (
                (userData.home_town && userData.home_town !== "") ||
                (userData.personal && userData.personal.langs_full) ||
                (userData.relatives && userData.relatives.length > 0)
              ) {
                let commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                let innerText = document.createElement("div");
                let isArrayDiv = getLang?.("profile_private");
                innerText.textContent = Array.isArray(isArrayDiv) ? isArrayDiv[0] : isArrayDiv || 'Личная информация';
                innerText.classList.add("vkEnhancerSectionText");
                let inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);

                let hometown = userData.home_town;
                if (hometown) {
                  let hometownLink = document.createElement("a");
                  hometownLink.href = `/search/people?c[name]=0&c[hometown]=${hometown}`;
                  hometownLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                  hometownLink.textContent = hometown;
                  let hometownDiv = document.createElement("div");
                  hometownDiv.classList.add("label", "fl_l");
                  let isArrayHome = getLang?.("Nat_town")
                  hometownDiv.textContent = Array.isArray(isArrayHome) ? isArrayHome[0] : isArrayHome || 'Родной город:';
                  let hometownRow = document.createElement("div");
                  hometownRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  hometownRow.appendChild(hometownDiv);
                  hometownRow.appendChild(hometownLink);
                  moreItemsLoaded.appendChild(hometownRow);
                }
                let langsFull;
                try {
                  langsFull = userData.personal.langs_full;
                } catch (error) {
                  langsFull = "авыловаыловаылоаывллоавы";
                }
                try {
                  if (langsFull !== "авыловаыловаылоаывллоавы") {
                    let langsText = langsFull
                      .map(
                        (lang: { id: any; native_name: any; }) =>
                          `<a href="/search/people?c[name]=0&c[lang]=${lang.id}" class="vkuiLink Link-module__link--V7bkY ProfileModalInfoLink vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">${lang.native_name}</a>`
                      )
                      .join(", ");
                    let langsDiv = document.createElement("div");
                    langsDiv.classList.add("label");
                    langsDiv.classList.add("fl_l");
                    let arrLangs = getLang?.("profile_langs");
                    langsDiv.innerHTML = Array.isArray(arrLangs) ? arrLangs[0] : arrLangs || 'Языки:';
                    let langsList = document.createElement("div");
                    langsList.classList.add("labeled");
                    langsList.innerHTML = langsText;
                    let clFix = document.createElement("div");
                    clFix.classList.add("clear_fix");
                    clFix.classList.add("profile_info_row");
                    clFix.appendChild(langsDiv);
                    clFix.appendChild(langsList);
                    moreItemsLoaded.appendChild(clFix);
                  }
                } catch (error) {}
                await addRelatives(userData, moreItemsLoaded);
              }

              if (
                (userData.home_phone && userData.home_phone !== "") ||
                (userData.mobile_phone && userData.mobile_phone !== "") ||
                (userData.skype && userData.skype !== "")
              ) {
                let commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                let innerText = document.createElement("div");
                let isArrContact = getLang?.("profile_contact");
                innerText.textContent = Array.isArray(isArrContact) ? isArrContact[0] : isArrContact || 'Контактная информация';
                innerText.classList.add("vkEnhancerSectionText");
                let inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner1");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);

                let mobile_phone = userData.mobile_phone;
                if (mobile_phone) {
                  let mobile_phoneLink = document.createElement("div");
                  mobile_phoneLink.textContent = mobile_phone;
                  let mobile_phoneDiv = document.createElement("div");
                    mobile_phoneDiv.classList.add("label", "fl_l");
                  let isArrMobileContact = getLang?.("Contact_mob_tel_abbr")
                  mobile_phoneDiv.textContent = Array.isArray(isArrMobileContact) ? isArrMobileContact[0] : isArrMobileContact || 'Моб. телефон:';
                  let mobile_phoneRow = document.createElement("div");
                  mobile_phoneRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  mobile_phoneRow.appendChild(mobile_phoneDiv);
                  mobile_phoneRow.appendChild(mobile_phoneLink);
                  moreItemsLoaded.appendChild(mobile_phoneRow);
                }

                let home_phone = userData.home_phone;
                if (home_phone) {
                  let home_phoneLink = document.createElement("div");
                  home_phoneLink.textContent = home_phone;
                  let home_phoneDiv = document.createElement("div");
                    home_phoneDiv.classList.add("label", "fl_l");
                    let isArrHomeNumber = getLang?.("Contact_home_tel_abbr");
                  home_phoneDiv.textContent = Array.isArray(isArrHomeNumber) ? isArrHomeNumber[0] : isArrHomeNumber || 'Доп. телефон:';
                  let home_phoneRow = document.createElement("div");
                  home_phoneRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  home_phoneRow.appendChild(home_phoneDiv);
                  home_phoneRow.appendChild(home_phoneLink);
                  moreItemsLoaded.appendChild(home_phoneRow);
                }
                let skype = userData.skype;
                if (skype) {
                  let skypeLink = document.createElement("a");
                  skypeLink.href = `skype:` + skype + `?call`;
                  skypeLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                  skypeLink.textContent = skype;
                  let skypeDiv = document.createElement("div");
                    skypeDiv.classList.add("label", "fl_l");
                    let isArrSkype = getLang?.("profile_skype");
                  skypeDiv.textContent = Array.isArray(isArrSkype) ? isArrSkype[0] : isArrSkype || 'Skype:';
                  let skypeRow = document.createElement("div");
                  skypeRow.classList.add(
                    "labeled",
                    "clear_fix",
                    "profile_info_row"
                  );
                  skypeRow.appendChild(skypeDiv);
                  skypeRow.appendChild(skypeLink);
                  moreItemsLoaded.appendChild(skypeRow);
                }
              }

              let career = userData.career;

              if (career && career.length > 0) {
                let commonDiv = document.createElement("div");
                commonDiv.classList.add("vkEnhancerSectionProfile");
                  let innerText = document.createElement("div");
                  let isArrWork = getLang?.("Work_place");
                innerText.textContent = Array.isArray(isArrWork) ? isArrWork[0] : isArrWork || 'Место работы';
                innerText.classList.add("vkEnhancerSectionText");
                let inner = document.createElement("div");
                inner.classList.add("vkEnhancerSectionInner2");
                commonDiv.appendChild(innerText);
                commonDiv.appendChild(inner);
                moreItemsLoaded.appendChild(commonDiv);
                let jobPromises = career.map(async (job: { group_id: string; company: string | null; city_name: string | null; city_id: any; from: any; until: any; position: string; }) => {
                  let careerDiv = document.createElement("div");
                  careerDiv.classList.add("label", "fl_l");
                  careerDiv.textContent = `${getLang?.("Work_place")}`;
                  let careerList = document.createElement("div");
                  careerList.classList.add("labeled");

                  let groupName;
                  try {
                    if (job.group_id) {
                      let groupData = await vkApi.api("groups.getById", {
                        group_ids: job.group_id,
                      });
                      groupName = groupData["groups"][0].name;
                    }
                  } catch (error) {
                    console.error("Error fetching group data:", error);
                    groupName = "Unknown";
                  }

                  let groupLink;
                  if (job.group_id) {
                    groupLink = document.createElement("a");
                    groupLink.href = `https://vk.com/club${job.group_id}`;
                    groupLink.setAttribute("mention_id", `club${job.group_id}`);
                    groupLink.setAttribute("onmouseover", "mentionOver(this)");
                    groupLink.textContent = groupName;
                    groupLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  } else if (job.company) {
                    groupLink = document.createElement("a");
                    groupLink.href = `https://vk.com/search/people?c[company]=${job.company}&c[name]=0`;
                    groupLink.textContent = job.company;
                    groupLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                  }

                  let additionalS = document.createElement("div");
                  additionalS.classList.add("vkEnhancerAdditionalJob");
                  if (job.city_name) {
                    let city_nameLink = document.createElement("div");
                    city_nameLink.textContent = job.city_name;
                    additionalS.appendChild(city_nameLink);
                  } else if (job.city_id) {
                    let city_nameID = document.createElement("div");
                    let cids = await vkApi.api("database.getCitiesById", {
                      city_ids: job.city_id,
                    });
                    let cidThis = cids[0].title;
                    city_nameID.textContent = cidThis;
                    additionalS.appendChild(city_nameID);
                  }
                  if (job.city_id || job.city_name) {
                    if (job.from || job.until) {
                      let zapytaya = document.createElement("div");
                      zapytaya.textContent = ", ​";
                      additionalS.appendChild(zapytaya);
                    }
                  }
                  if (job.from && job.until) {
                    let untilAndFrom = document.createElement("div");
                    untilAndFrom.textContent = ` ${job.from}-${job.until}`;
                    additionalS.appendChild(untilAndFrom);
                  } else if (job.from) {
                      let fromLink = document.createElement("div");
                      let isArrJobFrom = getLang?.(
                          "profile_places_year_from"
                      );
                    fromLink.textContent = Array.isArray(isArrJobFrom) ? isArrJobFrom[0].replace("%s", job.from) : isArrJobFrom?.replace("%s", job.from) || `с ${job.from} г.`;
                    additionalS.appendChild(fromLink);
                  } else if (job.until) {
                      let untilLink = document.createElement("div");
                      let isArrJobTo = getLang?.(
                      "profile_places_year_to"
                    )
                    untilLink.textContent = Array.isArray(isArrJobTo) ? isArrJobTo[0].replace("%s", job.until) : isArrJobTo?.replace("%s", job.until) || `до ${job.until} г.`;;
                    additionalS.appendChild(untilLink);
                  }
                  if (job.position) {
                    let positionLink = document.createElement("a");
                    positionLink.href = `/search/people?c[name]=0&c[position]=${job.position}`;
                    positionLink.style.position = `absolute`;
                    positionLink.style.marginTop = `16px`;
                    positionLink.innerHTML = job.position + " ";
                    positionLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                    additionalS.appendChild(positionLink);
                  }
                  let jobRow = document.createElement("div");
                  jobRow.classList.add("job_row");
                  jobRow.appendChild(careerDiv);
                  if (job.group_id) {
                    let groupAva = document.createElement("a");
                    groupAva.classList.add("fl_r");
                    groupAva.classList.add("profile_career_group");
                    groupAva.setAttribute("mention", "");
                    groupAva.setAttribute("mention_id", "club" + job.group_id);
                    groupAva.setAttribute(
                      "onmouseover",
                      "mentionOver(this, {shift: [31, 9, 4]});"
                    );
                    groupAva.href = "https://vk.com/club" + job.group_id;
                    let groupAvaImg = document.createElement("img");
                    groupAvaImg.classList.add("profile_career_img");
                    groupAvaImg.style.width = "50px";
                    groupAvaImg.style.height = "50px";
                    groupAvaImg.style.borderRadius = "100px";
                    let groupInfo = await vkApi.api("groups.getById", {
                      group_ids: job.group_id,
                    });
                    groupAvaImg.src = groupInfo.groups[0].photo_50;
                    groupAva.appendChild(groupAvaImg);
                    jobRow.appendChild(groupAva);
                  }
                  if(groupLink) jobRow.appendChild(groupLink);
                  jobRow.appendChild(additionalS);

                  let careerRow = document.createElement("div");
                  careerRow.classList.add("clear_fix", "profile_info_row");
                  careerRow.appendChild(jobRow);

                  return careerRow;
                });
                Promise.all(jobPromises).then((jobRows) => {
                  jobRows.forEach((jobRow) => {
                    moreItemsLoaded.appendChild(jobRow);
                  });
                  let commonDiv;
                  let innerText;
                  let inner;
                  if (
                    (userData.schools && userData.schools.length > 0) ||
                    (userData.universities && userData.universities.length > 0)
                  ) {
                    commonDiv = document.createElement("div");
                    commonDiv.classList.add("vkEnhancerSectionProfile");
                    innerText = document.createElement("div");
                    innerText.textContent = `${getLang?.("profile_educat")}`;
                    innerText.classList.add("vkEnhancerSectionText");
                    inner = document.createElement("div");
                    inner.classList.add("vkEnhancerSectionInner3");
                    commonDiv.appendChild(innerText);
                    commonDiv.appendChild(inner);
                    moreItemsLoaded.appendChild(commonDiv);
                  }
                  nextExpander(userData, moreItemsLoaded, inner);
                });
              } else {
                  let commonDiv;
                  let innerText;
                  let inner;
                if (
                  (userData.schools && userData.schools.length > 0) ||
                  (userData.universities && userData.universities.length > 0)
                ) {
                  commonDiv = document.createElement("div");
                  commonDiv.classList.add("vkEnhancerSectionProfile");
                  innerText = document.createElement("div");
                  innerText.textContent = `${getLang?.("profile_educat")}`;
                  innerText.classList.add("vkEnhancerSectionText");
                  inner = document.createElement("div");
                  inner.classList.add("vkEnhancerSectionInner3");
                  commonDiv.appendChild(innerText);
                  commonDiv.appendChild(inner);
                  moreItemsLoaded.appendChild(commonDiv);
                }
                nextExpander(userData, moreItemsLoaded, inner);
              }

              profileMoreInfo?.appendChild(moreItemsLoaded);

              profileLessLabel.style.display = "flex";
              profileMoreLabel.style.display = "none";
            } else {
              let profileMoreLink = profileMoreInfo.querySelector(
                ".profile_more_info_link"
              );
              profileMoreInfo.innerHTML = "";
              if (profileMoreLink) {
                profileMoreInfo.appendChild(profileMoreLink);
              }
              profileLessLabel.style.display = "none";
              profileMoreLabel.style.display = "flex";
            }
          }
          appearVariable();
        });
}
      
export default expandMore;