import { escapeHtml } from "../../escapeHtml";
import postingEmojiHint from "../oldPosting/postingEmojiHint";
import addPinnedPostTab from "./infoBlock/addPinnedPostTab";
import messagesButton from "./buttons/messagesButton";
import { subscribeButton, unSubButton } from "./buttons/subscribeButton";
import groupInfoBlock from "./infoBlock/groupInfoBlock";
import narrowBlock from "./narrow/narrowBlock";
import friendsSubsBlock from "./narrow/friendsSubsBlock";
import followersBlock from "./narrow/followersBlock";
import deferredCallback from "../../defferedCallback";
import changeCurrentInfoLang from "../classicalProfile/scripts/changeCurrentInfoLang";
import shareSubscribersLangKeys from "./shareLangKeys";
import { addAvatarListener } from "./pageTopNew/addAvatarListener";
import subsribersSkeleton from "./skeleton/subsribersSkeleton";
import subsFriendsSkeleton from "./skeleton/subsFriendsSkeleton";
import narrowSkeleton from "./skeleton/narrowSkeleton";
import parseAll from "./textParser/parseAll";

const classicalNewInterface = async (props: any) => {
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
  const isBanned = props?.ban_info || false;
  const hasPhoto = props.has_photo || 0;
  const cropPhotoId = props?.crop_photo?.photo?.id || false;

  let isPermanentlyBanned = false;
  if (isBanned) {
    isPermanentlyBanned = Boolean(isBanned?.end_date === 0);
  }

  //Хэдер сообщества
  const contentWrapper = root?.querySelector('[class*="CommunityHeader__contentWrapper--"]');
  const buttonGroup = contentWrapper?.querySelector("[class*='ButtonGroup__host']");
  const avatar = contentWrapper?.querySelector('[class*="CommunityHeader__avatar--"]') as HTMLElement;
  const checkIsVkToolsGroup = document.createElement("tool");
  checkIsVkToolsGroup.classList.add("vkToolsGroupStyle");
  checkIsVkToolsGroup.style.display = "none";
  contentWrapper?.append(checkIsVkToolsGroup);

  if (avatar) {
    let isOwner = Boolean(level >= 2);
    addAvatarListener({ avatar, id, isOwner, isPermanentlyBanned, hasPhoto, cropPhotoId });
  }

  if (subscribed) {
    const unSubButtonT = await unSubButton(id, isClosed, memberStatus);
    buttonGroup?.prepend(unSubButtonT);
  } else {
    const subscribeButtonT = subscribeButton(id, isClosed, memberStatus);
    buttonGroup?.prepend(subscribeButtonT);
  }

  if (isMessagesEnabled) {
    const messagesButtonOld = contentWrapper?.querySelector('[href^="/im?sel"]');
    if (messagesButtonOld) messagesButtonOld.remove();
    const messagesButtonNew = messagesButton(id);
    buttonGroup?.prepend(messagesButtonNew);
  }

  if ((status && status !== "") || level >= 2) {
    if (!status) status = "";
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("page_current_info");
    statusDiv.id = "page_current_info";
    statusDiv.style.position = "relative";
    const statusSpan = document.createElement("span");
    statusSpan.classList.add("current_text", "vk_tools_current_text");
    statusSpan.innerHTML = parseAll(status || "");

    const appendStatus = contentWrapper?.querySelector('[class*="CommunityHeader__content--"] [class*="RootComponent__host"][style="flex-basis: 450px;"]');
    statusDiv.append(statusSpan);
    if (level >= 2) {
      shareSubscribersLangKeys(vk.lang);
      let hashes = await vkApi.api("groups.getLegacyModalsHashes", { group_id: id });
      statusDiv.innerHTML = `      
  <div id="currinfo_editor" style="margin-top: -82px" class="page_status_editor clear" onclick="cancelEvent(event)">
    <div class="editor">
      <div class="page_status_input_wrap _emoji_field_wrap">
        <div class="emoji_smile_wrap  _emoji_wrap">
          <div data-testid="emoji-smile" class="emoji_smile _emoji_btn" role="button" title="${postingEmojiHint(vk.lang)}" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);">
            <div class="emoji_smile_icon"></div>
          </div>
        </div>
        <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox"></div>
      </div>
      <button class="flat_button button_small page_status_btn_save" id="currinfo_save">${getLang?.("Save")}</button>
    </div>
  </div>
  <div id="currinfo_wrap" class="vk_tools_edit_status_wrap" tabindex="0" role="button">
    <span id="current_info" class="current_info">${status === "" ? `<span class="no_current_info">${changeCurrentInfoLang(vk.lang)}</span>` : `<span class= "my_current_info" > <span class="current_text">${escapeHtml(status)}</span></span>`}
    </span>
  </div>
  <div id="currinfo_fake" class="vk_tools_currinfo_fake" style="display: none">${status === "" ? `<span class="no_current_info">${changeCurrentInfoLang(vk.lang)}</span>` : `<span class= "my_current_info"><span class="current_text">${escapeHtml(status)}</span></span>`}
  </div>
`;

      statusDiv.querySelector(".vk_tools_edit_status_wrap")?.addEventListener("click", () => {
        cur.options.info_hash = hashes.more_info_hash;
        page.infoEdit();
      });
    }

    appendStatus?.append(statusDiv);
  }

  //Удаление кнопок от ВК чтоб наши кнопки не были дупликатами
  contentWrapper?.arrive("[class*='Button__root']", { existing: true }, () => {
    if (!buttonGroup) return;

    const primaryAccentButton = buttonGroup.querySelector(".vkuiButton__modePrimary.vkuiButton__appearanceAccent");
    if (primaryAccentButton) {
      primaryAccentButton.remove();
    }
  });

  //Основной блок
  const mainContainer = document.querySelector("[class*='TwoColumnLayoutMain__root']");
  if (document.querySelector(".vkToolsPageTopBlock")) document.querySelector(".vkToolsPageTopBlock")?.remove();
  if (document.querySelector("#page_block_group_main_info")) document.querySelector("#page_block_group_main_info")?.remove();

  let groupBlockResult: any = null;
  let groupBlockState: any = {};

  function createOrUpdateGroupBlock(addPinnedPost = false) {
    if (groupBlockResult) return;
    groupBlockResult = groupInfoBlock(id, description, site, tabs, addPinnedPost);
    if (!groupBlockResult) return;
    const { mainBlock, activateTab, tabsMap, ulTabs, contentContainer } = groupBlockResult;
    mainContainer?.prepend(mainBlock);
    groupBlockState = { activateTab, tabsMap, ulTabs, contentContainer };
  }
  createOrUpdateGroupBlock(false);

  // document.arrive(".groups_page_fixed_post_block", { existing: true }, (pinnedPost) => {
  //   if (!groupBlockResult) {
  //     createOrUpdateGroupBlock(true);
  //   }
  //   const data = groupBlockState;
  //   if (data) {
  //     addPinnedPostTab(pinnedPost as HTMLElement, data.ulTabs, data.contentContainer, data.tabsMap, data.activateTab);
  //   }
  // });
  //блок в narrow c табами
  deferredCallback(
    async () => {
      let narrow = document.querySelector("[class*='TwoColumnLayoutNarrow__root'] > div");
      await stManager.add(["module.css"]);
      if (document.querySelector(".vkToolsFriendsContainer")) document.querySelector(".vkToolsFriendsContainer")?.remove();
      if (document.querySelector(".vkToolsFollowersBlock")) document.querySelector(".vkToolsFollowersBlock")?.remove();
      if (document.querySelector(".vkToolsNarrowBlock")) document.querySelector(".vkToolsNarrowBlock")?.remove();
      if (document.querySelector(".vkToolsNarrowPhotoBlock")) document.querySelector(".vkToolsNarrowPhotoBlock")?.remove();
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

export default classicalNewInterface;
