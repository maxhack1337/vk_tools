import getMonthNamePost from "../../../oldFeed/getMonthNamePost";
import addBlock from "./addBlock";
import eventsLang from "./eventsLang";

const eventsTab = (eventsGetter: { count: number; items: any[] }, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", eventsLang(vk.lang));

  if (eventsGetter.items.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "page_list_module", "_module");
    moduleDiv.id = "public_events";

    const headerRightLink = document.createElement("div");
    headerRightLink.classList.add("header_right_link", "fl_r");
    moduleDiv.appendChild(headerRightLink);

    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
      lnk.setAttribute("onclick", "Groups.showEvents()");
      headerRightLink.append(lnk);
    }

    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.setAttribute("onclick", "Groups.showEvents()");

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = eventsLang(vk.lang);

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = eventsGetter.count.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix");

    const nowTimestamp = Math.floor(Date.now() / 1000);
    const dateFormat = getLang?.("global_short_date_year_time", "raw")[1] || "{day} {month} {year} в {hour}:{minute}";

    eventsGetter.items.forEach((event) => {
      const lineCell = document.createElement("div");
      lineCell.classList.add("line_cell", "clear_fix");
      lineCell.setAttribute("data-id", event.id);

      const link = document.createElement("a");
      link.classList.add("fl_l");
      link.href = `https://${vk.__domain || "vk.ru"}/${event.screen_name || event.name}`;
      link.setAttribute("aria-label", event.name);

      const thumb = document.createElement("div");
      thumb.classList.add("thumb");
      thumb.style.backgroundImage = `url(${event.photo_100 || event.photo_base || ""})`;
      thumb.setAttribute("alt", event.name);

      link.appendChild(thumb);
      lineCell.appendChild(link);

      const descInfo = document.createElement("div");
      descInfo.classList.add("fl_l", "desc_info");

      const groupName = document.createElement("div");
      groupName.classList.add("group_name");

      const nameLink = document.createElement("a");
      nameLink.href = `https://${vk.__domain || "vk.ru"}/${event.screen_name || event.name}`;
      nameLink.textContent = event.name;

      groupName.appendChild(nameLink);
      descInfo.appendChild(groupName);

      const eventDateDiv = document.createElement("div");
      eventDateDiv.classList.add("group_desc");

      const timestampToFormat = event.start_date < nowTimestamp ? event.start_date : event.finish_date ? event.finish_date : event.start_date;

      const formatDate = (timestamp: number, formatStr: string) => {
        const d = new Date(timestamp * 1000);
        const day = d.getDate();
        const month = getMonthNamePost(d.getMonth() + 1)?.toString() || "янв.";
        const year = d.getFullYear();
        const hour = d.getHours().toString().padStart(2, "0");
        const minute = d.getMinutes().toString().padStart(2, "0");

        return formatStr.replace("{day}", day.toString()).replace("{month}", month).replace("{year}", year.toString()).replace("{hour}", hour).replace("{minute}", minute);
      };

      eventDateDiv.textContent = formatDate(timestampToFormat, dateFormat);
      if (timestampToFormat) descInfo.appendChild(eventDateDiv);

      lineCell.appendChild(descInfo);

      moduleBody.appendChild(lineCell);
    });

    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addArticle = addBlock("events");
      aside.append(addArticle);
    }
  }
  return aside;
};

export default eventsTab;
