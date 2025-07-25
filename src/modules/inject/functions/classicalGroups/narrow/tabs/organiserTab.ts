import organisersLang from "./organisersLang";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  photo_200: string;
  screen_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
}

const organiserTab = async (userId: number, id: number, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", organisersLang(vk.lang));

  const moduleDiv = document.createElement("div");
  moduleDiv.classList.add("module", "clear", "page_list_module", "_module");
  moduleDiv.id = "public_contacts";

  const headerRightLink = document.createElement("div");
  headerRightLink.classList.add("header_right_link", "fl_r");
  moduleDiv.appendChild(headerRightLink);

  if (isOwner) {
    const lnk = document.createElement("a");
    lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
    lnk.setAttribute("onclick", `showBox('groupsedit.php', {act: 'main_admin', id: ${id}, from: 'page'}, {stat: ['groups_edit.css', 'dist/web/groups_edit.js'], params: {bodyStyle: 'padding: 20px;'}}, event);`);
    headerRightLink.append(lnk);
  }

  const headerLink = document.createElement("a");
  headerLink.classList.add("module_header");
  if (isOwner) headerLink.setAttribute("onclick", `showBox('groupsedit.php', {act: 'main_admin', id: ${id}, from: 'page'}, {stat: ['groups_edit.css', 'dist/web/groups_edit.js'], params: {bodyStyle: 'padding: 20px;'}}, event);`);

  const headerTop = document.createElement("div");
  headerTop.classList.add("header_top", "clear_fix");

  const headerLabel = document.createElement("span");
  headerLabel.classList.add("header_label", "fl_l");
  headerLabel.textContent = organisersLang(vk.lang);

  const headerCount = document.createElement("span");
  headerCount.classList.add("header_count", "fl_l");
  headerCount.textContent = "1";

  headerTop.appendChild(headerLabel);
  headerTop.appendChild(headerCount);
  headerLink.appendChild(headerTop);
  moduleDiv.appendChild(headerLink);

  const moduleBody = document.createElement("div");
  moduleBody.classList.add("module_body", "clear_fix");

  let usersData: UserData[] = [];
  usersData = await vkApi.api("users.get", {
    user_ids: userId,
    fields: "photo_200,screen_name,is_closed,can_access_closed",
  });

  const usersMap = new Map<number, UserData>();
  usersData.forEach((user) => usersMap.set(user.id, user));

  const lineCell = document.createElement("div");
  lineCell.classList.add("line_cell", "clear_fix", "vkToolsLineCell");

  lineCell.setAttribute("data-id", userId.toString());

  const thumbDiv = document.createElement("div");
  thumbDiv.classList.add("fl_l", "thumb");

  const user = usersMap.get(userId)!;
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

  lineCell.appendChild(thumbDiv);

  const descDiv = document.createElement("div");
  descDiv.classList.add("fl_l", "desc_info");

  const peopleName = document.createElement("div");
  peopleName.classList.add("people_name");

  const nameLink = document.createElement("a");
  nameLink.href = `https://vk.com/${user.screen_name}`;
  nameLink.target = "_blank";
  nameLink.rel = "noopener";
  nameLink.textContent = `${user.first_name} ${user.last_name}`;

  peopleName.appendChild(nameLink);
  descDiv.appendChild(peopleName);

  lineCell.appendChild(descDiv);

  moduleBody.appendChild(lineCell);

  moduleDiv.appendChild(moduleBody);
  aside.appendChild(moduleDiv);

  return aside;
};

export default organiserTab;
