import addBlock from "./addBlock";

const linksTab = (isOwner: boolean, screen_name: string, id: number) => {
  const curClassicalGroup = window.vkenh.curClassicalGroup;
  const links = curClassicalGroup?.links || [];

  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", getLang?.("me_convo_attaches_type_links").toString() || "Ссылки");

  if (links.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "page_list_module", "_module");
    moduleDiv.id = "public_links";

    const headerRightLink = document.createElement("div");
    headerRightLink.classList.add("header_right_link", "fl_r");
    moduleDiv.appendChild(headerRightLink);

    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
      lnk.addEventListener("click", () => {
        window.nav.go(`/${screen_name}?act=links`);
      });
      headerRightLink.append(lnk);
    }

    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.addEventListener("click", () => {
      if (window.Groups) {
        Groups.showLinks();
      }
    });

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = getLang?.("me_convo_attaches_type_links").toString() || "Ссылки";

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = links.length.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix");

    links.slice(0, 5).forEach((link: any) => {
      const lineCell = document.createElement("div");
      lineCell.classList.add("line_cell", "clear_fix", "vkToolsLineCell");
      lineCell.setAttribute("data-id", link.id);

      const linkA = document.createElement("a");
      linkA.classList.add("fl_l");
      linkA.href = link.url;
      linkA.target = "_blank";
      linkA.rel = "noopener";

      const thumbDiv = document.createElement("div");
      thumbDiv.classList.add("thumb");
      const urlString = link.url;
      let shouldUseVKPlaceholder = false;

      try {
        const url = new URL(urlString);
        shouldUseVKPlaceholder = url.hostname === "vk.com" || url.hostname.endsWith(".vk.com") || url.hostname === "vk.ru" || url.hostname.endsWith(".vk.ru");
      } catch (e) {
        shouldUseVKPlaceholder = false;
      }
      const bgUrl = link.photo_100 || link.photo_50 || (shouldUseVKPlaceholder ? "/images/lnkinner.png" : "/images/lnkouter.png");
      thumbDiv.style.backgroundImage = `url(${bgUrl})`;
      thumbDiv.setAttribute("alt", link.name || "");

      linkA.appendChild(thumbDiv);
      lineCell.appendChild(linkA);

      const descInfo = document.createElement("div");
      descInfo.classList.add("fl_l", "desc_info");

      const groupName = document.createElement("div");
      groupName.classList.add("group_name");

      const nameLink = document.createElement("a");
      nameLink.href = link.url;
      nameLink.target = "_blank";
      nameLink.rel = "noopener";
      nameLink.textContent = link.name || "";

      groupName.appendChild(nameLink);
      descInfo.appendChild(groupName);

      const groupDesc = document.createElement("div");
      groupDesc.classList.add("group_desc");
      groupDesc.textContent = link.desc || "";

      descInfo.appendChild(groupDesc);
      lineCell.appendChild(descInfo);

      moduleBody.appendChild(lineCell);
    });

    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addLink = addBlock("links", 0, screen_name);
      aside.append(addLink);
    }
  }
  return aside;
};

export default linksTab;
