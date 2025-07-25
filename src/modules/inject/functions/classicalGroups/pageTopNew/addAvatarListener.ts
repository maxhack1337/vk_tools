// import uploadPhotoLang from "../photoPageBlock/lang/uploadPhotoLang";
// import updatePhotoLang from "../photoPageBlock/lang/updatePhotoLang";
// import updateThumbLang from "../photoPageBlock/lang/updateThumbLang";

// interface AvatarDropdownOptions {
//   id: number;
//   cropPhotoId: number | null;
//   hashes?: { avatar_cropper_hash?: string };
//   isOwner: boolean;
// }

// export function createAvatarDropdownMenu(opts: AvatarDropdownOptions): { dropdown: HTMLDivElement; positionDropdown: (elem: HTMLElement) => void } {
//   const { id, cropPhotoId, hashes } = opts;

//   const dropdown = document.createElement("div");
//   dropdown.className = "vkToolsDropdown avatarDropdown";

//   if (cropPhotoId) {
//     const update = document.createElement("div");
//     update.textContent = updatePhotoLang(vk.lang);
//     update.className = "vkToolsDropdownOption";
//     update.setAttribute("data-task-click", "Page/owner_new_photo");
//     update.setAttribute("data-options", `{"useNewForm":true,"ownerId":-${id}}`);
//     dropdown.appendChild(update);

//     const updateThumb = document.createElement("div");
//     updateThumb.textContent = updateThumbLang(vk.lang);
//     updateThumb.className = "vkToolsDropdownOption";
//     updateThumb.addEventListener("click", () => {
//       if (hashes?.avatar_cropper_hash) {
//         page.ownerAvatarEdit(-id, hashes.avatar_cropper_hash);
//       }
//     });
//     dropdown.appendChild(updateThumb);
//   } else {
//     const upload = document.createElement("div");
//     upload.textContent = uploadPhotoLang(vk.lang);
//     upload.className = "vkToolsDropdownOption";
//     upload.setAttribute("data-task-click", "Page/owner_new_photo");
//     upload.setAttribute("data-options", `{"useNewForm":true,"ownerId":-${id}}`);
//     dropdown.appendChild(upload);
//   }
//   document.body.appendChild(dropdown);

//   function positionDropdown(elem: HTMLElement): void {
//     const rect = elem.getBoundingClientRect();
//     dropdown.style.position = "absolute";
//     dropdown.style.top = `${rect.bottom + window.scrollY}px`;
//     dropdown.style.left = `${rect.left + window.scrollX}px`;
//     dropdown.style.zIndex = "10000";
//   }

//   return { dropdown, positionDropdown };
// }

interface AddAvatarListenerParams {
  avatar: HTMLElement;
  id: number;
  isOwner: boolean;
  isPermanentlyBanned: boolean;
  hasPhoto: number;
  cropPhotoId: number | null;
  hashes?: { avatar_cropper_hash?: string };
}

export const addAvatarListener = ({ avatar, id, isOwner, isPermanentlyBanned, hasPhoto, cropPhotoId }: AddAvatarListenerParams): void => {
  if (hasPhoto === 1 && cropPhotoId && !isPermanentlyBanned && !isOwner) {
    avatar.style.cursor = "pointer";
    avatar.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      showPhoto(`-${id}_${cropPhotoId}`, `album${-id}_0/rev`, {});
    });
  }

  //   if (isOwner) {
  //     let menu: HTMLDivElement | null = null;
  //     let hideTimeout: number | null = null;

  //     avatar.addEventListener("mouseenter", (e) => {
  //       e.preventDefault();
  //       e.stopImmediatePropagation();
  //       if (!menu) {
  //         const { dropdown, positionDropdown } = createAvatarDropdownMenu({ id, cropPhotoId, hashes, isOwner });
  //         menu = dropdown;
  //         positionDropdown(avatar);
  //         menu.classList.add("show");

  //         menu.addEventListener("mouseleave", () => {
  //           hideTimeout = window.setTimeout(() => menu?.classList.remove("show"), 120);
  //         });

  //         avatar.addEventListener("mouseleave", () => {
  //           hideTimeout = window.setTimeout(() => menu?.classList.remove("show"), 120);
  //         });

  //         menu.addEventListener("mouseenter", () => {
  //           if (hideTimeout) {
  //             clearTimeout(hideTimeout);
  //             hideTimeout = null;
  //           }
  //         });
  //       } else {
  //         menu.classList.add("show");
  //       }
  //     });
  //   }
};
