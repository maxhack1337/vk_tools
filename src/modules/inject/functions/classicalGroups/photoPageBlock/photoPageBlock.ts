import getCroppedPreview200 from "./getCroppedPreview200";
import deletePhotoConfirmLang from "./lang/deletePhotoConfirmLang";
import updatePhotoLang from "./lang/updatePhotoLang";
import updateThumbLang from "./lang/updateThumbLang";
import uploadPhotoLang from "./lang/uploadPhotoLang";

const createPhotoBlock = async (photosrc: any, title: string, id: number, hasPhoto: number, cropPhotoId: number, isOwner: boolean, hashes: any, isClosed: boolean, isPermanentlyBanned: boolean, photoSq: string) => {
  if (isOwner && hasPhoto === 1 && (cropPhotoId || photoSq)) {
    const container = document.createElement("div");
    container.classList.add(isOwner ? "page_block" : "page_block", "page_photo", "vkToolsNarrowPhotoBlock");
    container.style.marginBottom = "16px";

    const wrap = document.createElement("div");
    wrap.className = "owner_photo_wrap";
    wrap.id = "owner_photo_wrap";
    wrap.style.zIndex = "10";
    wrap.style.position = "relative";

    const topBubbleWrap = document.createElement("div");
    topBubbleWrap.className = "owner_photo_top_bubble_wrap";
    const topBubble = document.createElement("div");
    topBubble.className = "owner_photo_top_bubble";
    const xBtn = document.createElement("div");
    xBtn.className = "ui_thumb_x_button";
    xBtn.tabIndex = 0;
    xBtn.role = "button";
    xBtn.setAttribute("aria-label", "Удалить");
    xBtn.setAttribute("data-title", "Удалить");
    xBtn.setAttribute("onmouseover", "showTitle(this);");
    xBtn.addEventListener("click", () => {
      showFastBox(
        getLang?.("global_warning"),
        deletePhotoConfirmLang(vk.lang),
        getLang?.("global_delete"),
        () => {
          vkApi
            .api("photos.delete", {
              owner_id: -id,
              photo_id: cropPhotoId || 0,
            })
            .then(() => {
              window.curBox().hide(true);
              nav.reload();
            });
        },
        getLang?.("global_cancel")
      );
    });
    const xDiv = document.createElement("div");
    xDiv.className = "ui_thumb_x";
    xBtn.appendChild(xDiv);
    topBubble.appendChild(xBtn);
    topBubbleWrap.appendChild(topBubble);
    wrap.appendChild(topBubbleWrap);

    const avatarWrap = document.createElement("div");
    avatarWrap.className = "page_avatar_wrap";
    avatarWrap.id = "page_avatar_wrap";
    const aside = document.createElement("aside");
    aside.setAttribute("aria-label", "Фотография");
    const pageAvatar = document.createElement("div");
    pageAvatar.id = "page_avatar";
    pageAvatar.className = "page_avatar";
    const link = document.createElement("a");
    link.id = "profile_photo_link";
    link.href = `https://vk.com/photo-${id}_${cropPhotoId || 0}`;
    link.setAttribute("onclick", `return showPhoto('-${id}_${cropPhotoId || 0}', 'album${-id}_0/rev', {}, event)`);
    const img = document.createElement("img");
    img.className = "page_avatar_img";
    if (photosrc) {
      img.src = ((await getCroppedPreview200(photosrc)) as string) || "";
    } else {
      img.src = photoSq;
      img.style.width = "200px";
      img.style.height = "200px;";
    }
    img.alt = title || "";
    link.appendChild(img);
    pageAvatar.appendChild(link);
    aside.appendChild(pageAvatar);
    avatarWrap.appendChild(aside);
    wrap.appendChild(avatarWrap);

    const bubbleWrap = document.createElement("div");
    bubbleWrap.className = "owner_photo_bubble_wrap";
    const bubble = document.createElement("div");
    bubble.className = "owner_photo_bubble";

    const updateAction = document.createElement("div");
    updateAction.className = "owner_photo_bubble_action owner_photo_bubble_action_update";
    updateAction.tabIndex = 0;
    updateAction.role = "button";
    updateAction.setAttribute("data-task-click", "Page/owner_new_photo");
    updateAction.setAttribute("data-options", `{"useNewForm":true,"ownerId":-${id}}`);
    const updateSpan = document.createElement("span");
    updateSpan.className = "owner_photo_bubble_action_in";
    updateSpan.textContent = updatePhotoLang(vk.lang);
    updateAction.appendChild(updateSpan);
    bubble.appendChild(updateAction);

    const cropAction = document.createElement("div");
    cropAction.className = "owner_photo_edit_vktools owner_photo_bubble_action owner_photo_bubble_action_crop";
    cropAction.tabIndex = 0;
    cropAction.role = "button";
    const cropSpan = document.createElement("span");
    cropSpan.className = "owner_photo_bubble_action_in";
    cropSpan.textContent = updateThumbLang(vk.lang);
    cropSpan.addEventListener("click", () => {
      if (hashes?.avatar_cropper_hash) {
        page.ownerAvatarEdit(-id, hashes?.avatar_cropper_hash);
      }
    });
    cropAction.appendChild(cropSpan);
    bubble.appendChild(cropAction);

    bubbleWrap.append(bubble);
    wrap.appendChild(bubbleWrap);
    container.append(wrap);
    return container;
  }

  if (hasPhoto === 0) {
    const container = document.createElement("div");
    container.classList.add(isOwner ? "page_block" : "page_block", "page_photo", "vkToolsNarrowPhotoBlock");
    container.style.marginBottom = "16px";
    const avatarWrap = document.createElement("div");
    avatarWrap.classList.add("page_avatar_wrap");
    avatarWrap.id = "page_avatar_wrap";
    container.appendChild(avatarWrap);

    const aside = document.createElement("aside");
    aside.setAttribute("aria-label", "Photo");
    const pageAvatar = document.createElement("div");
    pageAvatar.id = "page_avatar";
    pageAvatar.className = "page_avatar no_avatar vkToolsNoAvatarCommunity";
    aside.appendChild(pageAvatar);
    if (isOwner) {
      aside.setAttribute("data-task-click", "Page/owner_new_photo");
      aside.setAttribute("data-options", `{"useNewForm":true,"ownerId":-${id}}`);
      aside.classList.add("vkToolsCursorPointer");
      const actionsWrap = document.createElement("a");
      actionsWrap.classList.add("loadPhoto");
      actionsWrap.textContent = uploadPhotoLang(vk.lang);
      pageAvatar.append(actionsWrap);
    }
    avatarWrap.appendChild(aside);

    return container;
  }

  const container = document.createElement("div");
  container.className = "page_block page_photo vkToolsNarrowPhotoBlock";
  container.style.marginBottom = "16px";

  const avatarWrap = document.createElement("div");
  avatarWrap.className = "page_avatar_wrap";
  avatarWrap.id = "page_avatar_wrap";
  container.appendChild(avatarWrap);

  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", "Фотография");
  avatarWrap.appendChild(aside);

  const pageAvatar = document.createElement("div");
  pageAvatar.id = "page_avatar";
  pageAvatar.className = "page_avatar";
  aside.appendChild(pageAvatar);

  if (!isClosed) {
    const link = document.createElement("a");
    if (!isPermanentlyBanned) {
      link.href = `https://vk.com/photo-${id}_${cropPhotoId || 0}`;
      link.setAttribute("onclick", `return showPhoto('-${id}_${cropPhotoId || 0}', 'album${-id}_0/rev', {}, event)`);
    } else {
      link.style.cursor = "default";
    }
    pageAvatar.appendChild(link);

    const img = document.createElement("img");
    img.className = "page_avatar_img";
    if (photosrc) {
      img.src = ((await getCroppedPreview200(photosrc)) as string) || "";
    } else {
      img.src = photoSq;
      img.style.width = "200px";
      img.style.height = "200px;";
    }
    img.alt = title || "";
    link.appendChild(img);
  } else {
    const img = document.createElement("img");
    img.className = "page_avatar_img";
    if (photosrc) {
      img.src = ((await getCroppedPreview200(photosrc)) as string) || "";
    } else {
      img.src = photoSq;
      img.style.width = "200px";
      img.style.height = "200px;";
    }
    img.alt = title || "";
    pageAvatar.appendChild(img);
  }

  const actionsWrap = document.createElement("div");
  actionsWrap.id = "public_actions_wrap";
  actionsWrap.className = "group_actions_wrap group_actions_wrap_redesign";
  container.appendChild(actionsWrap);

  return container;
};

export default createPhotoBlock;
