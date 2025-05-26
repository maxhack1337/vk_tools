import addCounters from "./scripts/addCounters";
import addPlaceholder from "./scripts/addPlaceholder";
import appearFriends from "./scripts/friends/appearFriends";
import appearStarts from "./scripts/appearStarts";
import appearVariable from "./scripts/appearVariable";
import appendActivityText from "./scripts/appendActivityText";
import buttonRun from "./scripts/buttonRun";
import expandMore from "./scripts/expandMore";
import profileGroup from "./scripts/profileGroups";
import removeStyle from "../../removeStyle";
import replaceTabsWithPhotosModule from "./scripts/photoModule/replaceTabsWithPhotosModule";
import giftButton from "./scripts/skeleton/giftButton";
import profileShort from "./scripts/skeleton/profileShort";
import getUserDataSpa from "./scripts/spa/getUserDataSpa";
import "./styles/classical-profile-view.css";
import classicButtons from "./styles/classicButtons";
import friendsBlock from "./scripts/skeleton/friendsBlock";
import createStyle from "../../createStyle";

let cachedGroupInfo: any = {};

async function preloadGroupInfo(userData: any) {
  if (userData.career && userData.career.length > 0) {
    for (const job of userData.career) {
      if (job.group_id) {
        try {
          const groupData = await vkApi.api("groups.getById", {
            group_ids: job.group_id,
          });
          cachedGroupInfo[job.group_id] = groupData["groups"][0];
        } catch (error) {
          console.error("Error fetching group data:", error);
          cachedGroupInfo[job.group_id] = "Unknown";
        }
      }
    }
  }
}

let cachedCityInfo: any = {};

async function preloadCityInfo(userData: any) {
  if (userData.career && userData.career.length > 0) {
    for (const job of userData.career) {
      if (job.city_id) {
        try {
          const cityData = await vkApi.api("database.getCitiesById", {
            city_ids: job.city_id,
          });
          cachedCityInfo[job.city_id] = cityData[0].title;
        } catch (error) {
          console.error("Error fetching city data:", error);
          cachedCityInfo[job.city_id] = "Unknown";
        }
      }
    }
  }
}

let cachedRelativesInfo: any = {};

async function preloadRelatives(userData: any) {
  if (userData.relatives && userData.relatives.length > 0) {
    userData.relatives.forEach(async (relative: { id: string | number }) => {
      if (relative.id) {
        const relativeData = await vkApi.api("users.get", { user_ids: relative.id });
        if (relativeData[0]) {
          const name = `${relativeData[0].first_name} ${relativeData[0].last_name}`;
          cachedRelativesInfo[relative.id] = name;
        }
      }
    });
  }
}

const classicalProfile = () => {
  if (!localStorage.getItem("isClassicalProfileDesign") || localStorage.getItem("isClassicalProfileDesign") === "false") return;
  document.arrive("#profile_redesigned", { existing: true }, async function () {
    try {
      document.querySelector("html")!.classList.add("classicProfile");
      classicButtons();
      if (cur.oid !== vk.id) giftButton();
      let scrollStickyDiv = document.querySelector(".ScrollStickyWrapper > div");
      scrollStickyDiv?.prepend(friendsBlock());
      profileShort();
      let userData = await getUserDataSpa();
      let activityText = userData.activity;
      appendActivityText(activityText, userData);
      await appearFriends(userData);
      await appearStarts(userData);
      if (userData?.blacklisted !== 1 && !userData.deactivated && !userData.is_service && !userData.hidden) {
        removeStyle("classicalProfilesDELETED");
        removeStyle("classicalProfilesBlackListed");
        removeStyle("classicalProfilesDeactivated");
        removeStyle("classicalProfilesService");
        removeStyle("classicalProfilesHidden");
        removeStyle("classicalProfilesDeactDeleted");
        addCounters(userData, userData.counters);
        appearVariable();
        if (vk.id !== userData.id) {
          buttonRun(userData.id);
        }
        preloadGroupInfo(userData);
        preloadCityInfo(userData);
        preloadRelatives(userData);
        expandMore(cachedRelativesInfo, cachedCityInfo, cachedGroupInfo, userData);
      } else {
        try {
          let pMoreInfo = document.querySelector(".profile_more_info") as HTMLElement;
          if (pMoreInfo) pMoreInfo.style.display = "none";
        } catch (e) {
          console.log("[VK Tools Error] Classic profile error", e);
        }
        createStyle("classicalProfilesDELETED", '[class^="vkitGroup__group"]:has(>.PlaceholderMessageBlock) {display: none !important;}');
        addPlaceholder();
        if (userData.blacklisted === 1 && !userData.deactivated) {
          createStyle(
            "classicalProfilesBlackListed",
            `.vkToolsSkeleton__giftButton {display:none;} .ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:280px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){top:230px!important;}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in{width:100%!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in > span{display:block!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span{background:none!important;}.ProfileHeaderActions__moreButtonContainer {margin-left:0px; !important;} div.ProfileHeaderActions__moreButtonContainer > div > button {min-width:206px!important;}`
          );
        }
        if (userData.deactivated && userData.deactivated === "deleted") {
          createStyle("classicalProfilesDeactDeleted", `.ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){display:none!important}`);
        }
        if (userData.deactivated && userData.deactivated !== "deleted") {
          createStyle(
            "classicalProfilesDeactivated",
            `.vkToolsSkeleton__giftButton {display:none;} .ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:280px!important;}.ProfileHeaderActions__buttons:not(:has(>.ProfileHeaderButton a[href='/edit'])){top:230px!important;}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in{width:100%!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span.vkuiButton__in > span{display:block!important}div.ProfileHeaderActions__moreButtonContainer > div > button > span{background:none!important;}.ProfileHeaderActions__moreButtonContainer {margin-left:0px; !important;} div.ProfileHeaderActions__moreButtonContainer > div > button {min-width:206px!important;}`
          );
        }
        if (userData.is_service) {
          createStyle("classicalProfilesService", `.page_current_info.current_text{border-bottom:none!important;}.ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}`);
        }
        if (userData.hidden) {
          createStyle("classicalProfilesHidden", `.ProfileHeader:not(:has(>.ProfileHeader__in a[href='/edit'])){height:234px!important;}`);
        }
        appearVariable();
      }
    } catch (e) {
      console.log("[VK Tools Error] Classic profile error", e);
    }
  });

  document.arrive(".ProfileHeaderButton > a[href='/edit'] .vkuiButton__content", { existing: true }, async function (e) {
    e.textContent = `${getLang?.("global_edit")}`;
  });

  document.arrive(`[class^="vkitgetColorClass__colorTextSubhead"]`, { existing: true }, (e) => {
    let cont = e as HTMLElement;
    if (cont.textContent === getLang?.("profile_dead_page_label")) {
      cont.style.paddingLeft = "26px";
    }
  });
  window.friendsSection = null;
  window.aHrefSectionFrens = null;
  window.imReady = null;
  document.arrive(".ProfileGroup", { existing: true }, async function () {
    const profileGroups = document.querySelectorAll("section.ProfileGroup");
    profileGroups.forEach((profileGroup) => {
      let pGroup = profileGroup as HTMLElement;
      const content = profileGroup.textContent;

      const includesLang = (key: string) => {
        const langValue = getLang?.(key);
        return Array.isArray(langValue) ? content?.includes(langValue.join(", ")) : content?.includes(langValue || "") || false;
      };

      if (includesLang("profile_followers") || includesLang("profile_common_friends") || includesLang("profile_friends")) {
        pGroup.style.display = "none";
        let separatorSibling = pGroup.nextSibling as HTMLElement;
        if (separatorSibling?.className === "vkuiGroup__separator-sibling") {
          separatorSibling.style.display = "none";
        }
      }

      if (includesLang("profile_closed_profile_banner_closed_btn") || includesLang("profile_narratives")) {
        pGroup.style.display = "none";
      }
    });
  });

  document.arrive(".page_counter", { existing: true }, async function () {
    let i = document.querySelectorAll(".vkuiInternalGroupCard:not(.ProfileGroup)");
    let includes = getLang?.("profile_unknown_error");
    i.forEach((elem) => {
      if (elem?.textContent?.includes(Array.isArray(includes) ? includes[0] : includes || "Произошла неизвестная ошибка. Попробуйте перезагрузить страницу.")) {
        (elem as HTMLElement).style.display = "none";
      }
    });
  });

  document.arrive(".imReadyForShowingFriends", { existing: true }, async function (e) {
    if (friendsSection !== null && imReady && vkenh.curClassicalProfile?.id?.toString() === e.id) {
      document.querySelector(".ScrollStickyWrapper > div")?.prepend(friendsSection);
      document.querySelector(".vkEnhancerFrenBox")?.appendChild(aHrefSectionFrens);
    }
    let friendsSkeleton = document.querySelector(".vkToolsFriendsSkeleton");
    if (friendsSkeleton) friendsSkeleton.remove();
    let i = document.querySelectorAll(".vkuiInternalGroupCard:not(.ProfileGroup)");
    let includes = getLang?.("profile_unknown_error");
    i.forEach((elem) => {
      if (elem?.textContent?.includes(Array.isArray(includes) ? includes[0] : includes || "Произошла неизвестная ошибка. Попробуйте перезагрузить страницу.")) {
        (elem as HTMLElement).style.display = "none";
      }
    });
  });

  document.arrive(".page_current_info", { existing: true }, async function () {
    try {
      if (!document.querySelector("#profile_redesigned .ProfileHeader")?.classList.contains("ProfileHeader--noCover")) document.querySelector("#profile_redesigned .ProfileHeader")?.classList.add("ProfileHeader--noCover");
    } catch (e) {
      console.log("[VK Tools Error] Classic profile error", e);
    }
  });

  document.arrive(".label.fl_l", { existing: true }, async function () {
    appearVariable();
  });

  profileGroup();

  document.arrive(".OwnerContentTabs", { existing: true }, async function (e) {
    await replaceTabsWithPhotosModule();
  });
};

export default classicalProfile;
