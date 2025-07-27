import messagesButton from "./buttons/messagesButton";
import { subscribeButton, unSubButton } from "./buttons/subscribeButton";
import groupInfoBlock from "./infoBlock/groupInfoBlock";
import narrowBlock from "./narrow/narrowBlock";
import friendsSubsBlock from "./narrow/friendsSubsBlock";
import followersBlock from "./narrow/followersBlock";
import deferredCallback from "../../defferedCallback";
import photoPageBlock from "./photoPageBlock/photoPageBlock";
import pageTop from "./pageTop/pageTop";
import subsFriendsSkeleton from "./skeleton/subsFriendsSkeleton";
import subsribersSkeleton from "./skeleton/subsribersSkeleton";
import narrowSkeleton from "./skeleton/narrowSkeleton";

const classicalOldInterface = async (props: any) => {
  const isMessagesEnabled = props.can_message;
  const description = props.description;
  const site = props.site;
  let status = props.status;
  const tabs = props.tabs || [];
  const subscribed = props.is_member || false;
  const isClosed = props.is_closed && !subscribed;
  const memberStatus = props.member_status || 0;
  const membersCount = props.members_count || 0;
  const id = props.id;
  const level = props.admin_level || 0;
  const screen_name = props.screen_name ? props.screen_name : "club" + props.id;
  const contacts = props.contacts || [];
  const evOrganiser = props.event_organizer || {};
  const friends = props.friends || {};
  const root = document.querySelector("#page_body > #spa_root > .vkui__root");
  const hasPhoto = props.has_photo || 0;
  const cropPhotoId = props?.crop_photo?.photo?.id || false;
  const title = props.name || "";
  const cropPhotoSrc = props?.crop_photo?.photo || false;
  const isBanned = props?.ban_info || false;
  let hashes = await vkApi.api("groups.getLegacyModalsHashes", { group_id: id });

  //Хэдер сообщества(тут его скрываем, нужен только для элемента)
  const contentWrapper = root?.querySelector('[class*="CommunityHeader__contentWrapper--"]');
  const buttonGroup = contentWrapper?.querySelector("[class*='ButtonGroup__host']");
  const checkIsVkToolsGroup = document.createElement("tool");
  checkIsVkToolsGroup.classList.add("vkToolsGroupStyle", "vkToolsOldHideCommHeader");
  checkIsVkToolsGroup.style.display = "none";
  contentWrapper?.append(checkIsVkToolsGroup);

  //Основной блок
  const mainContainer = document.querySelector("[class*='TwoColumnLayoutMain__root']");
  if (document.querySelector(".vkToolsPageTopBlock")) document.querySelector(".vkToolsPageTopBlock")?.remove();
  if (document.querySelector("#page_block_group_main_info")) document.querySelector("#page_block_group_main_info")?.remove();
  const pageTopT = pageTop(title, status, level, hashes);
  mainContainer?.prepend(pageTopT);

  let groupBlockResult: any = null;

  function createOrUpdateGroupBlock(addPinnedPost = false) {
    if (groupBlockResult) return;
    groupBlockResult = groupInfoBlock(id, description, site, tabs, addPinnedPost, true);
    if (!groupBlockResult) return;
    const { subMainBlock } = groupBlockResult;
    pageTopT?.append(subMainBlock);
  }
  createOrUpdateGroupBlock(false);
  //блок в narrow c табами
  deferredCallback(
    async () => {
      let narrow = document.querySelector("[class*='TwoColumnLayoutNarrow__root'] > div");
      //Блок с авой и кнопками
      if (document.querySelector(".vkToolsNarrowPhotoBlock")) document.querySelector(".vkToolsNarrowPhotoBlock")?.remove();
      let isPermanentlyBanned = false;
      if (isBanned) {
        isPermanentlyBanned = Boolean(isBanned?.end_date === 0);
      }
      let photoPageBlockT = await photoPageBlock(cropPhotoSrc, title, id, hasPhoto, cropPhotoId, level >= 2, hashes, isClosed, isPermanentlyBanned);
      if (!isPermanentlyBanned) {
        let buttonsBlock = document.createElement("div");
        buttonsBlock.classList.add("vkToolsNarrowPhotoBlock__buttons");
        let subButtonGroup = document.createElement("div");
        subButtonGroup.classList.add("vkToolsNarrowPhotoBlock__buttons_sub");
        if (subscribed) {
          const unSubButtonT = await unSubButton(id, isClosed, memberStatus);
          subButtonGroup?.prepend(unSubButtonT);
        } else {
          const subscribeButtonT = subscribeButton(id, isClosed, memberStatus);
          subButtonGroup?.prepend(subscribeButtonT);
        }

        if (isMessagesEnabled) {
          const messagesButtonOld = contentWrapper?.querySelector('[href^="/im?sel"]');
          if (messagesButtonOld) messagesButtonOld.remove();
          const messagesButtonNew = messagesButton(id);
          buttonsBlock?.prepend(messagesButtonNew);
        }
        let moreButton = buttonGroup?.querySelector("button.vkuiButton__modeSecondary.vkuiButton__appearanceAccent");
        if (moreButton) {
          subButtonGroup.append(moreButton);
        }
        buttonsBlock.append(subButtonGroup);
        photoPageBlockT.append(buttonsBlock);
      }
      narrow?.prepend(photoPageBlockT);
      await stManager.add(["module.css"]);
      if (document.querySelector(".vkToolsFriendsContainer")) document.querySelector(".vkToolsFriendsContainer")?.remove();
      if (document.querySelector(".vkToolsFollowersBlock")) document.querySelector(".vkToolsFollowersBlock")?.remove();
      if (document.querySelector(".vkToolsNarrowBlock")) document.querySelector(".vkToolsNarrowBlock")?.remove();
      if (document.querySelector(".vkToolsSeparatorSibling")) document.querySelector(".vkToolsSeparatorSibling")?.remove();
      const isGroup = window.cur.module === "groups" || window.cur.module === "group" || window.cur.module === "public" || window.cur.module === "event";
      if (isGroup) {
        let fSubsSkeleton = subsFriendsSkeleton();
        narrow?.append(fSubsSkeleton);
        let membSkeleton = subsribersSkeleton();
        narrow?.append(membSkeleton);
        let narrSkeleton = narrowSkeleton();
        narrow?.append(narrSkeleton);
        let fSkelSubs = document.querySelector(".vkToolsFriendsContainerSkeleton");
        let skelSubs = document.querySelector(".vkToolsFollowersBlock1.vkToolsSkeleton");
        let skelNarrow = document.querySelector(".vkToolsNarrowSkeleton");
        if (friends?.count > 0) {
          const friendsSubbedBlock = friendsSubsBlock(friends, -id);
          if (friendsSubbedBlock) {
            let frSubId = friendsSubbedBlock.getAttribute("data-group-id");
            if (frSubId === id.toString() && !document.querySelector(".vkToolsFriendsContainer")) {
              if (fSkelSubs) {
                fSkelSubs.replaceWith(friendsSubbedBlock);
              } else {
                narrow?.append(friendsSubbedBlock);
              }
            }
          }
        }
        if (fSkelSubs) fSkelSubs.remove();
        if (membersCount > 0) {
          let followersBlockT;
          try {
            const othersData = await vkApi.api("groups.getMembers", {
              count: 40,
              fields: "domain,first_name,photo_100,photo_200",
              group_id: id,
            });

            const friendsData = await vkApi.api("groups.getMembers", {
              count: 6,
              fields: "domain,first_name,photo_100,photo_200",
              filter: "friends",
              group_id: id,
            });

            followersBlockT = followersBlock(
              {
                friends: friendsData.items,
                others: othersData.items,
              },
              id,
              membersCount
            );
          } catch (error) {
            try {
              const friendsData = await vkApi.api("groups.getMembers", {
                count: 6,
                fields: "domain,first_name,photo_100,photo_200",
                filter: "friends",
                group_id: id,
              });

              followersBlockT = followersBlock(
                {
                  friends: friendsData.items,
                  others: [],
                },
                id,
                membersCount
              );
            } catch (error) {
              console.error("[VK Tools Error] Failed to get community members");
            }
          }

          if (followersBlockT) {
            let followId = followersBlockT.getAttribute("data-group-id");
            if (followId === id.toString() && !document.querySelector(".vkToolsFollowersBlock")) {
              if (skelSubs) {
                skelSubs.replaceWith(followersBlockT);
              } else {
                narrow?.append(followersBlockT);
              }
            }
          }
        }
        if (skelSubs) skelSubs.remove();
        if (!document.querySelector(".vkToolsNarrowBlock")) {
          let narrowBlockT = await narrowBlock(tabs, level, id, screen_name, contacts, evOrganiser);
          if (narrowBlockT) {
            let narrowId = narrowBlockT.getAttribute("data-group-id");
            if (narrowId === id.toString()) {
              if (skelNarrow) {
                skelNarrow.replaceWith(narrowBlockT);
              } else {
                narrow?.append(narrowBlockT);
              }
              let sepaSibling = document.createElement("div");
              sepaSibling.classList.add("vkuiGroup__separatorSibling", "vkToolsSeparatorSibling");
              narrow?.append(sepaSibling);
            }
          }
        }
        if (skelNarrow) skelNarrow.remove();
        if (narrow) {
          const children = Array.from(narrow.children);
          function isVisible(elem: Element) {
            const style = window.getComputedStyle(elem);
            return style.display !== "none" && style.visibility !== "hidden";
          }
          const firstVisible = children.find(isVisible) as HTMLElement;
          if (firstVisible) {
            firstVisible.style.marginTop = "0";
          }
        }
      }
    },
    { element: "[class*='TwoColumnLayoutNarrow__root'] > div" }
  );
};

export default classicalOldInterface;
