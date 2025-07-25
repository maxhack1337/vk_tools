import { escapeHtml } from "../../../../escapeHtml";

const appearFriends = async (userdata: any) => {
  imReady = false;
  let objectId1 = userdata.id || 0;
  let friends;
  let frenCount = { count: 0 };
  if ((!userdata.is_closed || userdata.can_access_closed) && userdata.blacklisted !== 1 && !userdata.deactivated) {
    try {
      friends = await vkApi.api("friends.get", {
        user_id: userdata.id,
        fields: "photo_100,online,domain",
        count: 6,
        order: "random",
      });
      frenCount = await vkApi.api("friends.get", {
        user_id: userdata.id,
        count: 1,
      });
    } catch (error) {}
  }
  let frensBlock = document.querySelector(".ProfileFriends") as HTMLElement;
  if ((frenCount.count > 0 && frensBlock?.style.display === "none") || (frenCount.count > 0 && !frensBlock)) {
    friendsSection = document.createElement("section");
    friendsSection.classList.add("vkuiInternalGroup", "vkuiGroup", "vkuiGroup--mode-card", "vkuiInternalGroup--mode-card", "vkuiGroup--padding-m", "vkuiInternalGroupCard", "ProfileFriends", "vkEnhancerProfileFriends", "vkuiGroup__modeCard");
    aHrefSectionFrens = document.createElement("a");
    aHrefSectionFrens.classList.add("decoration");
    if (vk.id !== objectId1) {
      aHrefSectionFrens.href = `/friends?id=${objectId1}&section=online`;
      aHrefSectionFrens.style.marginLeft = "auto";
      aHrefSectionFrens.style.marginRight = "23px";
      aHrefSectionFrens.style.maxWidth = "100px";
      aHrefSectionFrens.style.whiteSpace = "nowrap";
      aHrefSectionFrens.style.textOverflow = "ellipsis";
      aHrefSectionFrens.style.overflow = "hidden";
      aHrefSectionFrens.style.color = "var(--vkui--color_text_secondary)";
      aHrefSectionFrens.textContent = `${getLang?.("profile_friendsonln")}`.toLowerCase();
    } else {
      aHrefSectionFrens.href = `/friends?act=find`;
      aHrefSectionFrens.style.marginLeft = "auto";
      aHrefSectionFrens.style.marginRight = "23px";
      aHrefSectionFrens.style.color = "var(--vkui--color_text_secondary)";
      aHrefSectionFrens.textContent = `${getLang?.("global_search")}`.toLowerCase();
    }
    friendsSection.innerHTML =
      `
        <a href="/friends?id=${userdata.id}&section=all" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
            <div style="padding:7px 0 0 17px;" class="vkEnhancerFriendsPadding vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
                <div class="vkuiHeader__main">
                    <div class="vkEnhancerFrenBox vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
                        <span class="vkuiHeader__content-in">
                            <div class="Header-module__content--F5x_X">
                                <div class="TextClamp-module__singleLine--mRCrF">` +
      getLang?.("profile_friends") +
      `</div>
                            </div>
                        </span>
                        <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${frenCount.count}</span>
                    </div>
                </div>
                <span class="vkuiTypography vkuiHeader__aside vkuiParagraph"></span>
            </div>
        </a>
        <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
        <div class="ProfileGroupHorizontalCells vkEnhancerHorizontalCells">
		<div class="PrimaryCells"></div>
        </div>
        <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
    `;
    friendsSection.style.padding = "0px";
    const friendsContainer = friendsSection.querySelector(".ProfileGroupHorizontalCells");
    const friendsContainer1 = friendsSection.querySelector(".PrimaryCells");
    const randomFriends = friends.items.sort(() => 0.5 - Math.random()).slice(0, 6);
    randomFriends.forEach((friend: { domain: any; photo_100: any; online: number; first_name: any; online_mobile: number }) => {
      const friendItem = document.createElement("div");
      friendItem.classList.add("vkuiHorizontalCell__host", "vkuiHorizontalCell__sizeS", "vkuiHorizontalCell__sized", "vkuiHorizontalCell__noPadding", "ProfileFriends__item");
      friendItem.innerHTML = `
            <a href="/${friend.domain}" class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
                <div class="vkuiHorizontalCell__image">
                    <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;"><img class="vkuiImageBase__img" src="${friend.photo_100}">${friend.online === 1 ? "" : ""}</div>
                </div>
                <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
                    <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host"><div class="TextClamp-module__singleLine--mRCrF">${escapeHtml(friend.first_name)}</div></span>
                </div>
            </a>
        `;
      if (friend.online === 1) {
        const onlineBadge = document.createElement("div");
        onlineBadge.classList.add("vkuiImageBase__children");
        if (friend.online_mobile && friend.online_mobile === 1) {
          onlineBadge.innerHTML = `
                <div class="vkToolsOnlineFriendBadge vkuiAvatarBadge__host vkuiAvatarBadge__presetOnlineMobile vkuiImageBaseBadge__host vkuiImageBaseBadge__backgroundStroke vkuiRootComponent__host"">
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-8 vkuiIcon--h-12 vkuiIcon--online_mobile_12" viewBox="0 0 8 12" width="8" height="12" style="width: 8px; height: 12px;">
                    <path fill="currentColor" d="M5.99 0C7.1 0 8 .9 8 2.01v7.98C8 11.1 7.1 12 5.99 12H2.01C.9 12 0 11.1 0 9.99V2.01C0 .9.9 0 2.01 0zm.008 3H2.003a.5.5 0 0 0-.503.502v4.996c0 .277.225.502.503.502h3.995a.5.5 0 0 0 .502-.502V3.503A.5.5 0 0 0 5.997 3"></path>
                </svg>
                </div>
            `;
        } else {
          onlineBadge.innerHTML = `
            <div class="vkToolsOnlineFriendBadge vkuiAvatarBadge__host vkuiAvatarBadge__presetOnline vkuiImageBaseBadge__host vkuiImageBaseBadge__backgroundStroke vkuiRootComponent__host"">
              <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-12 vkuiIcon--h-12 vkuiIcon--circle_12" viewBox="0 0 12 12" width="12" height="12" style="width: 12px; height: 12px;">
					      <path fill="currentColor" d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
				      </svg>
            </div>
            `;
          onlineBadge.classList.remove("vkuiAvatarBadge--preset-onlineMobile");
          onlineBadge.classList.add("vkuiAvatarBadge--preset-online");
        }
        friendItem?.querySelector(".vkuiImageBase__host")?.appendChild(onlineBadge);
      }

      friendsContainer1?.appendChild(friendItem);
    });
    if (vk.id === userdata.id) {
      const onlineFriends = await vkApi.api("friends.getOnline", {
        user_id: vk.id,
        fields: "photo_100,online,domain",
        extended: 1,
        count: 3,
        order: "random",
      });
      const countOnlineFetch = await vkApi.api("friends.getOnline", {
        user_id: vk.id,
      });
      const countOnline = countOnlineFetch.length || 0;
      if (countOnline > 0) {
        const onlineFriendsHeader = document.createElement("a");
        onlineFriendsHeader.href = `/friends?id=${vk.id}&section=online`;
        onlineFriendsHeader.classList.add("vkuiHeader__host", "vkuiHeader__sizeM", "vkuiHeader__pi", "vkuiRootComponent__host", "ProfileGroupHeader", "vkuiTappable", "vkuiInternalTappable", "vkuiTappable--hasActive", "vkui-focus-visible", "vkEnhFriendsOnline");
        onlineFriendsHeader.innerHTML =
          `
            <div style="padding-top:0px; padding-bottom:0px;" class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
                <div class="vkuiHeader__main">
                    <div class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
                        <span class="vkuiHeader__content-in">
                            <div class="Header-module__content--F5x_X">
                                <div class="TextClamp-module__singleLine--mRCrF">` +
          getLang?.("profile_friendsonln") +
          `</div>
                            </div>
                        </span>
                        <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${countOnline}</span>
                    </div>
                </div>
            </div>
        `;
        friendsContainer?.appendChild(onlineFriendsHeader);

        const onlineFriendsContainer = document.createElement("div");
        onlineFriendsContainer.classList.add("ProfileGroupHorizontalCells");
        onlineFriendsContainer.style.paddingLeft = "8px";
        onlineFriendsContainer.style.paddingRight = "8px";
        onlineFriendsContainer.style.paddingBottom = "8px";
        onlineFriends.profiles.forEach((onlineFriend: { domain: any; photo_100: any; first_name: any; online: number; online_mobile: number }) => {
          const friendItem = document.createElement("div");
          friendItem.classList.add("vkuiHorizontalCell__host", "vkuiHorizontalCell__sizeS", "vkuiHorizontalCell__sized", "vkuiHorizontalCell__noPadding", "ProfileFriends__item");
          friendItem.innerHTML = `
                <a href="/${onlineFriend.domain}" class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
                    <div class="vkuiHorizontalCell__image">
                        <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;"><img class="vkuiImageBase__img" src="${onlineFriend.photo_100}"></div>
                    </div>
                    <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
                        <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host"><div class="TextClamp-module__singleLine--mRCrF">${escapeHtml(onlineFriend.first_name)}</div></span>
                    </div>
                </a>
            `;
          if (onlineFriend.online === 1) {
            const onlineBadge = document.createElement("div");
            onlineBadge.classList.add("vkuiImageBase__children");
            if (onlineFriend.online_mobile && onlineFriend.online_mobile === 1) {
              onlineBadge.innerHTML = `
                <div class="vkToolsOnlineFriendBadge vkuiAvatarBadge__host vkuiAvatarBadge__presetOnlineMobile vkuiImageBaseBadge__host vkuiImageBaseBadge__backgroundStroke vkuiRootComponent__host"">
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-8 vkuiIcon--h-12 vkuiIcon--online_mobile_12" viewBox="0 0 8 12" width="8" height="12" style="width: 8px; height: 12px;">
                    <path fill="currentColor" d="M5.99 0C7.1 0 8 .9 8 2.01v7.98C8 11.1 7.1 12 5.99 12H2.01C.9 12 0 11.1 0 9.99V2.01C0 .9.9 0 2.01 0zm.008 3H2.003a.5.5 0 0 0-.503.502v4.996c0 .277.225.502.503.502h3.995a.5.5 0 0 0 .502-.502V3.503A.5.5 0 0 0 5.997 3"></path>
                </svg>
                </div>
            `;
            } else {
              onlineBadge.innerHTML = `
            <div class="vkToolsOnlineFriendBadge vkuiAvatarBadge__host vkuiAvatarBadge__presetOnline vkuiImageBaseBadge__host vkuiImageBaseBadge__backgroundStroke vkuiRootComponent__host"">
              <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-12 vkuiIcon--h-12 vkuiIcon--circle_12" viewBox="0 0 12 12" width="12" height="12" style="width: 12px; height: 12px;">
					      <path fill="currentColor" d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
				      </svg>
            </div>
            `;
              onlineBadge.classList.remove("vkuiAvatarBadge--preset-onlineMobile");
              onlineBadge.classList.add("vkuiAvatarBadge--preset-online");
            }
            friendItem?.querySelector(".vkuiImageBase__host")?.appendChild(onlineBadge);
          }
          onlineFriendsContainer.appendChild(friendItem);
        });
        friendsContainer?.appendChild(onlineFriendsContainer);
      }
    }

    if (userdata.id !== vk.id) {
      let commonFriends = await vkApi.api("friends.getMutual", {
        target_uid: userdata.id,
        source_uid: vk.id,
        fields: "photo_100,online,domain",
        extended: 1,
        need_common_count: 1,
        count: 3,
        order: "random",
      });
      if (commonFriends.common_count > 0) {
        const commonFriendsHeader = document.createElement("div");
        commonFriendsHeader.tabIndex = 0;
        commonFriendsHeader.role = "button";
        commonFriendsHeader.dataset.allowLinkOnclickWeb = "1";
        commonFriendsHeader.classList.add("vkuiHeader__host", "vkuiHeader__sizeM", "vkuiHeader__pi", "vkuiRootComponent__host", "ProfileGroupHeader", "vkuiTappable", "vkuiInternalTappable", "vkuiTappable--hasActive", "vkui-focus-visible");
        commonFriendsHeader.innerHTML =
          `
	<a href="/friends?id=${userdata.id}&amp;section=common" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
        <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
            <div class="vkuiHeader__main">
                <div class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
                    <span class="vkuiHeader__content-in">
                        <div class="Header-module__content--F5x_X">
                            <div class="TextClamp-module__singleLine--mRCrF">` +
          getLang?.("profile_common_friends") +
          `</div>
                        </div>
                    </span>
                    <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${userdata.mutual.count}</span>
                </div>
            </div>
        </div>
	</a>
    `;

        const mutualFriendsContainer = document.createElement("div");
        mutualFriendsContainer.classList.add("vkEnhancerMutualFriends");
        mutualFriendsContainer.appendChild(commonFriendsHeader);
        const commonFriendsContainer = document.createElement("div");
        commonFriendsContainer.classList.add("ProfileGroupHorizontalCells");

        const commonFriendsIds = commonFriends.common_friends.join();
        const commonFriendsExtended = await vkApi.api("users.get", { user_ids: commonFriendsIds, fields: "photo_100,online,domain" });

        commonFriendsExtended.slice(0, 3).forEach((commonFriend: { domain: any; photo_100: any; first_name: any; online: number; online_mobile: number }) => {
          const friendItem = document.createElement("div");
          friendItem.classList.add("vkuiHorizontalCell__host", "vkuiHorizontalCell__sizeS", "vkuiHorizontalCell__sized", "vkuiHorizontalCell__noPadding", "ProfileFriends__item");
          friendItem.innerHTML = `
            <a href="/${commonFriend.domain}" class="vkuiHorizontalCell__body vkuiInternalTappable vkuiTappable__host vkuiTappable__hasPointerNone vkuiClickable__host vkuiClickable__realClickable vkuistyles__-focus-visible vkuiRootComponent__host vkEnhancerFriend">
                <div class="vkuiHorizontalCell__image">
                    <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;"><img class="vkuiImageBase__img" src="${
                      commonFriend.photo_100
                    }"><div aria-hidden="true" class="vkuiImageBase__border"></div></div>
                </div>
                <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
                    <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host"><div class="TextClamp-module__singleLine--mRCrF">${escapeHtml(commonFriend.first_name)}</div></span>
                </div>
            </a>
        `;
          if (commonFriend.online === 1) {
            const onlineBadge = document.createElement("div");
            onlineBadge.classList.add("vkuiImageBase__children");
            if (commonFriend.online_mobile && commonFriend.online_mobile === 1) {
              onlineBadge.innerHTML = `
                <div class="vkToolsOnlineFriendBadge vkuiAvatarBadge__host vkuiAvatarBadge__presetOnlineMobile vkuiImageBaseBadge__host vkuiImageBaseBadge__backgroundStroke vkuiRootComponent__host"">
                <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-8 vkuiIcon--h-12 vkuiIcon--online_mobile_12" viewBox="0 0 8 12" width="8" height="12" style="width: 8px; height: 12px;">
                    <path fill="currentColor" d="M5.99 0C7.1 0 8 .9 8 2.01v7.98C8 11.1 7.1 12 5.99 12H2.01C.9 12 0 11.1 0 9.99V2.01C0 .9.9 0 2.01 0zm.008 3H2.003a.5.5 0 0 0-.503.502v4.996c0 .277.225.502.503.502h3.995a.5.5 0 0 0 .502-.502V3.503A.5.5 0 0 0 5.997 3"></path>
                </svg>
                </div>
            `;
            } else {
              onlineBadge.innerHTML = `
            <div class="vkToolsOnlineFriendBadge vkuiAvatarBadge__host vkuiAvatarBadge__presetOnline vkuiImageBaseBadge__host vkuiImageBaseBadge__backgroundStroke vkuiRootComponent__host"">
              <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--12 vkuiIcon--w-12 vkuiIcon--h-12 vkuiIcon--circle_12" viewBox="0 0 12 12" width="12" height="12" style="width: 12px; height: 12px;">
					      <path fill="currentColor" d="M10 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
				      </svg>
            </div>
            `;
              onlineBadge.classList.remove("vkuiAvatarBadge--preset-onlineMobile");
              onlineBadge.classList.add("vkuiAvatarBadge--preset-online");
            }
            friendItem?.querySelector(".vkuiImageBase__host")?.appendChild(onlineBadge);
          }
          commonFriendsContainer.appendChild(friendItem);
        });
        mutualFriendsContainer.appendChild(commonFriendsContainer);
        friendsSection.prepend(mutualFriendsContainer);
      }
    }
  } else {
    friendsSection = null;
  }
  imReady = true;
  let readyElement = document.createElement("div");
  readyElement.id = objectId1;
  readyElement.classList.add("imReadyForShowingFriends");
  document.body.appendChild(readyElement);
};

export default appearFriends;
