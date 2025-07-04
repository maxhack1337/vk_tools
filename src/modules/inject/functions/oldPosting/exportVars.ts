/* eslint-disable no-useless-escape */
import deferredCallback from "../../defferedCallback";
import carouselGridKeys from "./carouselGridKeys";
import postingBlock from "./postingBlock";
import replacePostingBlock from "./replacePostingBlock";

const exportVars = async (
  wall_oid: number,
  public_link: string,
  loc: string,
  owner: { id: number; name: string; photo: string },
  wall_tpl: { profileData: [profileId: number, photo: string, href: string, name: string]; ownerData: [ownerId: number, photo: string, href: string, name: string] },
  wallData: any
) => {
  if (localStorage.getItem("old_post_design") === "false") return;
  console.info("[VK Tools] Wall data fetched", { wall_oid, public_link, loc, owner, wall_tpl, wallData });
  let newPostingBlock = document.querySelector("#page_block_submit_post.new_posting");
  let isFeedBlock = document.querySelector("#main_feed");
  let isWallModule = cur.module === "wall";
  let isElseProfile = document.querySelector(".ui_tabs_right_section > .PostingReactBlock__root");
  let isBeginBlock = document.querySelector("#page_block_submit_post:has(> .gtop_complex_message)");

  if (document.querySelector("#submit_post_field")) return;
  if (!isFeedBlock && !newPostingBlock && !isElseProfile && !isWallModule && !isBeginBlock) return;

  const [ownerId, ownerPhoto, ownerHref, ownerName] = wallData?.ownerData || [];
  const [profileId, profilePhoto, profileHref] = wallData?.profileData || [];
  let photoApi;
  let notMineWall;
  if (vk.id !== owner?.id && owner?.id > 0) {
    notMineWall = await vkApi.api("users.get", { user: vk.id, fields: "photo_200" });
    notMineWall = notMineWall[0].photo_200;
  }
  if (!(ownerPhoto || owner?.photo || profilePhoto)) {
    photoApi = await vkApi.api("users.get", { user: vk.id, fields: "photo_200" });
    photoApi = photoApi[0].photo_200;
  }
  if (!window.templates) {
    window.templates = {};
  }

  if (!window.templates["primary_attachments_view_template"]) {
    window.templates["primary_attachments_view_template"] = `<div class="post_action_btn primary_attachments_view" id=\'primary_attachments_view_btn%link_id%\' style=\'display: none;\'>\n  <div class="post_action_btn_layout">\n    <span class="post_action_btn_text" role="button" aria-label="${
      carouselGridKeys(vk.lang)[1] || "Сетка"
    }">${
      carouselGridKeys(vk.lang)[1] || "Сетка"
    }</span>\n    <span class="post_action_image_btn"><svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fill-rule="evenodd"/></svg></span>\n    <div class="post_action_tt_content">\n      <div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'${
      carouselGridKeys(vk.lang)[1] || "Сетка"
    }\' data-value=\'grid\'>\n  \n  <div class="FancyElementTT__itemLabel">${carouselGridKeys(vk.lang)[1] || "Сетка"}</div>\n</div><div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'${
      carouselGridKeys(vk.lang)[0] || "Карусель"
    }\' data-value=\'carousel\'>\n  \n  <div class="FancyElementTT__itemLabel">${carouselGridKeys(vk.lang)[0] || "Карусель"}</div>\n</div>\n    </div>\n  </div>\n</div>`;
  }
  const hasGroupAudioAccess = wallData?.hasGroupAudioAccess || false;
  const oid = wall_oid || ownerId || profileId;
  const isMyWall = vk.id === wall_oid?.valueOf();
  const submitPostBlock = postingBlock({
    isSuggested: wall_oid !== (ownerId || profileId) && oid < 0 && wallData.suggesting,
    oid,
    fromOid: oid,
    ownerHref: ownerHref || public_link || loc || (owner?.id ? `id${owner.id}` : undefined) || profileHref,
    ownerPhoto: notMineWall || wall_tpl?.ownerData?.at(1) || ownerPhoto || owner?.photo || profilePhoto || photoApi,
    ownerName,
    onlyOfficial: wallData.only_official?.valueOf(),
    isMyWall,
  });
  replacePostingBlock(submitPostBlock, newPostingBlock, isFeedBlock, isElseProfile, isWallModule, isBeginBlock);
  deferredCallback(
    async () => {
      if (wall_oid !== (ownerId || profileId) && oid < 0 && !hasGroupAudioAccess) {
        let audioPostSuggest = document.querySelector("#submit_post .ms_item_audio");
        if (audioPostSuggest) {
          const newElement = audioPostSuggest.cloneNode(true) as HTMLElement;
          audioPostSuggest.parentNode?.replaceChild(newElement, audioPostSuggest);
          newElement.setAttribute("onmouseover", `showTooltip(this, { text: "${getLang?.("mail_added_audios", "raw")[1]}", black: 1, shift: [10, 9] })`);
          newElement?.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            window.stManager.add([window.jsc("web/audio.js"), window.jsc("web/indexer.js"), window.jsc("web/auto_list.js"), window.jsc("web/grid_sorter.js"), "audio.css"], function () {
              AudioPage.showAttachBox(vk.id, {
                canPlaylistAttach: false,
              });
            });
          });
        }
      }
    },
    { element: "#submit_post .ms_item_audio" }
  );
};

export default exportVars;
