import getTimeString from "./getTimeString";
import getUserDataReact from "./getUserDataReact";

const getUserData = async (objectId: number) => {
        try {
          let response = await getUserDataReact();
          console.info("[VKENH] Profile fetched");
          console.log(response);
          if (!response.hidden) {
            let wasInSetb = getLang?.("profile_last_seen", "raw");
            let newLangArray = Array.isArray(wasInSetb) ? wasInSetb.map((item) => item.replace(/%s/, "")) : wasInSetb ? [wasInSetb.replace(/%s/, "")] : []; 
            let index = response.sex === 1 ? 2 : 1;
            let zahodil = newLangArray[index];
            if (zahodil === "") {
              zahodil = newLangArray[response.sex];
            }
            let onlineInfo = getTimeString(response.online_info);
            let zahodilString = zahodil + " " + onlineInfo;
            try {
              let onlineBadgeByl = document.querySelector(
                ".ProfileIndicatorBadge__badgeLastSeen"
              );
              if(onlineBadgeByl) onlineBadgeByl.textContent = zahodilString;

              if (response.online_info.is_mobile) {
                let mobileDiv = document.createElement("div");
                mobileDiv.className = "vkEnhancerMobileWas";
                onlineBadgeByl?.appendChild(mobileDiv);
              }
            } catch (error) {}
            try {
              let onlineBadgeComp = document.querySelector(
                ".ProfileIndicatorBadge__badgeOnline"
              );
              if(onlineBadgeComp) onlineBadgeComp.textContent = "Online";
            } catch (error) {}
            try {
              let onlineBadgeMob = document.querySelector(
                ".ProfileIndicatorBadge__badgeOnlineMobile"
              );
              if(onlineBadgeMob) onlineBadgeMob.textContent = "Onlineᅠ​";
            } catch (error) {}
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status === "recently"
            ) {
              try {
                let lastSeenRecently = getLang?.(
                  "global_online_was_recently",
                  "raw"
                ) || [
    "",
    "заходил недавно",
    "заходила недавно"
];
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge?.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status === "last_week"
            ) {
              try {
                let lastSeenRecently = getLang?.("global_online_was_week", "raw") || [
    "",
    "заходил на этой неделе",
    "заходила на этой неделе"
];
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge?.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status === "last_month"
            ) {
              try {
                let lastSeenRecently = getLang?.(
                  "global_online_this_month",
                  "raw"
                ) || [
    "",
    "заходил в этом месяце",
    "заходила в этом месяце"
];
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge?.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          if (!response.hidden) {
            if (
              response.online_info.status &&
              response.online_info.status === "long_ago"
            ) {
              try {
                let lastSeenRecently = getLang?.("global_online_long_ago", "raw") || [
    "",
    "заходил давно",
    "заходила давно"
];
                let indexRecently = response.sex === 1 ? 2 : 1;
                let recentlyCurrent = lastSeenRecently[indexRecently];
                let parentBadge = document.querySelector(
                  ".ProfileIndicatorBadge"
                );
                let innerBadge = document.createElement("div");
                innerBadge.classList.add("ProfileIndicatorBadge__badge");
                innerBadge.setAttribute("aria-hidden", "true");
                innerBadge.innerHTML = `<span class="ProfileIndicatorBadge__badgeLastSeenWrapper"><span class="ProfileIndicatorBadge__badgeLastSeen">${recentlyCurrent}</span></span>`;
                parentBadge?.appendChild(innerBadge);
              } catch (error) {}
            }
          }
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
}
      
export default getUserData;