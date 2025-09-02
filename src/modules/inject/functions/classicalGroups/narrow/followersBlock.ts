interface Member {
  id: number;
  domain: string;
  photo_100: string;
  photo_200: string;
  photo_base?: string;
  first_name: string;
  last_name?: string;
  can_access_closed?: boolean;
  is_closed?: boolean;
}

interface FollowersData {
  friends: Member[];
  others: Member[];
}

const followersBlock = (data: FollowersData, id: number, members_count: number) => {
  const { friends, others } = data;

  const friendsIds = new Set(friends.map((f) => f.id));

  const filteredOthers = shuffle(others.filter((o) => !friendsIds.has(o.id)));

  const combinedMembers = [...friends, ...filteredOthers].slice(0, 6);

  const pageBlock = document.createElement("div");
  pageBlock.classList.add("page_block", "vkToolsFollowersBlock");
  pageBlock.setAttribute("data-group-id", id.toString());

  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", getLang?.("vkui_post_stats_subscribers").toString() || "Подписчики");

  const moduleDiv = document.createElement("div");
  moduleDiv.classList.add("module", "clear", "people_module", "_module");
  moduleDiv.id = "public_followers";

  const headerRightLink = document.createElement("div");
  headerRightLink.classList.add("header_right_link", "fl_r");
  moduleDiv.appendChild(headerRightLink);

  const headerLink = document.createElement("a");
  headerLink.href = `https://${vk.__domain || "vk.ru"}/search/people?group_id=${id}`;
  headerLink.setAttribute("onclick", `return page.showPageMembers(event, ${-id}, 'members')`);
  headerLink.classList.add("module_header");

  const headerTop = document.createElement("div");
  headerTop.classList.add("header_top", "clear_fix");

  const headerLabel = document.createElement("span");
  headerLabel.classList.add("header_label", "fl_l");
  headerLabel.textContent = getLang?.("vkui_post_stats_subscribers").toString() || "Подписчики";

  const headerCount = document.createElement("span");
  headerCount.classList.add("header_count", "fl_l");
  headerCount.innerHTML = members_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "<span class='num_delim'> </span>");

  headerTop.appendChild(headerLabel);
  headerTop.appendChild(headerCount);
  headerLink.appendChild(headerTop);
  moduleDiv.appendChild(headerLink);

  const moduleBody = document.createElement("div");
  moduleBody.classList.add("module_body", "clear_fix", "vkToolsModuleBodySubs");

  for (let i = 0; i < combinedMembers.length; i += 3) {
    const peopleRow = document.createElement("div");
    peopleRow.classList.add("people_row");

    combinedMembers.slice(i, i + 3).forEach((member) => {
      const peopleCell = document.createElement("div");
      peopleCell.classList.add("people_cell");

      const profileLink = document.createElement("a");
      profileLink.classList.add("people_cell_ava");
      profileLink.href = `https://${vk.__domain || "vk.ru"}/${member.domain}`;
      profileLink.title = `${member.first_name}${member.last_name ? " " + member.last_name : ""}`;
      profileLink.setAttribute("onclick", `return nav.go(this, event, {cl_id: 0})`);

      const img = document.createElement("img");
      img.classList.add("people_cell_img");
      img.src = member.photo_100 || member.photo_200 || member.photo_base || "";
      img.alt = profileLink.title;

      const blindLabel = document.createElement("span");
      blindLabel.classList.add("blind_label");
      blindLabel.textContent = ".";

      profileLink.appendChild(img);
      profileLink.appendChild(blindLabel);

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("people_cell_name");

      const nameLink = document.createElement("a");
      nameLink.href = profileLink.href;
      nameLink.title = profileLink.title;
      nameLink.textContent = member.first_name;

      nameDiv.appendChild(nameLink);

      peopleCell.appendChild(profileLink);
      peopleCell.appendChild(nameDiv);

      peopleRow.appendChild(peopleCell);
    });

    moduleBody.appendChild(peopleRow);
  }

  moduleDiv.appendChild(moduleBody);
  aside.appendChild(moduleDiv);
  pageBlock.appendChild(aside);

  return pageBlock;
};

export default followersBlock;
