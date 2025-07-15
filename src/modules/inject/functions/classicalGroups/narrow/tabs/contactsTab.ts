import addBlock from "./addBlock";
import contactsLang from "./contactsLang";

interface Contact {
  user_id?: number;
  desc: string;
  phone?: string;
  email?: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  photo_200: string;
  screen_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
}

const contactsTab = async (contacts: Contact[], id: number, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", contactsLang(vk.lang));

  if (contacts.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "page_list_module", "_module");
    moduleDiv.id = "public_contacts";

    const headerRightLink = document.createElement("div");
    headerRightLink.classList.add("header_right_link", "fl_r");
    moduleDiv.appendChild(headerRightLink);

    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
      lnk.setAttribute("onclick", `Page.showContacts(${id})`);
      headerRightLink.append(lnk);
    }

    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.setAttribute("onclick", `Page.showContacts(${id})`);

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = contactsLang(vk.lang);

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = contacts.length.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix");

    const contactsToShow = contacts.slice(0, 5);
    const userIds = contactsToShow
      .filter((c) => c.user_id)
      .map((c) => c.user_id)
      .join(",");

    let usersData: UserData[] = [];
    if (userIds.length > 0) {
      usersData = await vkApi.api("users.get", {
        user_ids: userIds,
        fields: "photo_200,screen_name,is_closed,can_access_closed",
      });
    }

    const usersMap = new Map<number, UserData>();
    usersData.forEach((user) => usersMap.set(user.id, user));

    for (const contact of contactsToShow) {
      const lineCell = document.createElement("div");
      lineCell.classList.add("line_cell", "clear_fix", "vkToolsLineCell");
      if (contact.user_id) {
        lineCell.setAttribute("data-id", contact.user_id.toString());
      }

      const thumbDiv = document.createElement("div");
      thumbDiv.classList.add("fl_l", "thumb");

      if (contact.user_id && usersMap.has(contact.user_id)) {
        const user = usersMap.get(contact.user_id)!;
        const userLink = document.createElement("a");
        userLink.href = `https://vk.com/${user.screen_name}`;
        userLink.target = "_blank";
        userLink.rel = "noopener";

        const img = document.createElement("img");
        img.classList.add("cell_img");
        img.src = user.photo_200;
        img.alt = `${user.first_name} ${user.last_name}`;

        userLink.appendChild(img);
        thumbDiv.appendChild(userLink);
      } else {
        const img = document.createElement("img");
        img.classList.add("cell_img");
        img.src = "https://vk.com/images/contact.png";
        img.alt = contact.desc || "Контакт";

        thumbDiv.appendChild(img);
      }

      lineCell.appendChild(thumbDiv);

      const descDiv = document.createElement("div");

      if (contact.user_id && usersMap.has(contact.user_id)) {
        descDiv.classList.add("fl_l", "desc_info");
        const user = usersMap.get(contact.user_id)!;

        const peopleName = document.createElement("div");
        peopleName.classList.add("people_name");

        const nameLink = document.createElement("a");
        nameLink.href = `https://vk.com/${user.screen_name}`;
        nameLink.target = "_blank";
        nameLink.rel = "noopener";
        nameLink.textContent = `${user.first_name} ${user.last_name}`;

        peopleName.appendChild(nameLink);
        descDiv.appendChild(peopleName);

        const peopleDesc = document.createElement("div");
        peopleDesc.classList.add("people_desc");
        peopleDesc.textContent = contact.desc;

        descDiv.appendChild(peopleDesc);
        if (contact.phone || contact.email) {
          const peopleExtra = document.createElement("div");
          peopleExtra.classList.add("people_extra");
          if (contact.phone) peopleExtra.textContent = contact.phone;
          if (contact.email) {
            if (contact.phone) peopleExtra.append(document.createElement("br"));
            let peopleExtraLnk = document.createElement("a");
            peopleExtraLnk.classList.add("people_extra_lnk");
            peopleExtraLnk.textContent = contact.email;
            peopleExtraLnk.href = `mailto:${contact.email}`;
            peopleExtra.append(peopleExtraLnk);
          }
          descDiv.appendChild(peopleExtra);
        }
      } else {
        descDiv.classList.add("fl_l", "extra_info");
        descDiv.style.paddingTop = "3px";

        const peopleDesc = document.createElement("div");
        peopleDesc.classList.add("people_desc");
        peopleDesc.textContent = contact.desc;

        descDiv.appendChild(peopleDesc);

        if (contact.phone || contact.email) {
          const peopleExtra = document.createElement("div");
          peopleExtra.classList.add("people_extra");
          if (contact.phone) peopleExtra.textContent = contact.phone;
          if (contact.email) {
            if (contact.phone) peopleExtra.append(document.createElement("br"));
            let peopleExtraLnk = document.createElement("a");
            peopleExtraLnk.classList.add("people_extra_lnk");
            peopleExtraLnk.textContent = contact.email;
            peopleExtraLnk.href = `mailto:${contact.email}`;
            peopleExtra.append(peopleExtraLnk);
          }
          descDiv.appendChild(peopleExtra);
        }
      }

      lineCell.appendChild(descDiv);

      moduleBody.appendChild(lineCell);
    }

    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addArticle = addBlock("contacts", id);
      aside.append(addArticle);
    }
  }
  return aside;
};

export default contactsTab;
