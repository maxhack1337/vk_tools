import fillDiscussionsTabContent from "./fillDiscussionsTab";
import formatDescriptionText from "./formatDescriptionText";
import noInfoLang from "./noInfoLang";

function groupInfoBlock(id: number, description: string, site: string, tabs: any[], addPinnedPost = false) {
  if (!tabs) tabs = [];
  const hasDiscussionsTab = tabs.some((tab) => tab.name === "discussions");

  if (!description || description === "") {
    description = noInfoLang(vk.lang);
  }

  if (document.getElementById("page_block_group_main_info")) return;

  const mainBlock = document.createElement("div");
  mainBlock.classList.add("page_block");
  mainBlock.id = "page_block_group_main_info";

  const subMainBlock = document.createElement("div");
  subMainBlock.id = "page_block_group_submain_info";

  const headerH2 = document.createElement("h2");
  headerH2.classList.add("page_block_h2", "page_info_header_tabs");

  const ulTabs = document.createElement("ul");
  ulTabs.classList.add("ui_tabs", "clear_fix", "page_info_tabs");
  ulTabs.setAttribute("data-inited", "1");
  ulTabs.setAttribute("onmouseover", "uiTabs.tryInit(this)");

  const contentContainer = document.createElement("div");

  const tabsMap: { [key: string]: { tabLi: HTMLLIElement; tabDiv: HTMLDivElement } } = {};

  function activateTab(name: string) {
    const isSingleTab = Object.keys(tabsMap).length <= 1;
    Object.entries(tabsMap).forEach(([key, { tabLi, tabDiv }]) => {
      const isActive = key === name;
      tabLi.querySelector("div")?.classList.toggle("ui_tab_sel_vktools", isActive);
      if (isSingleTab) tabLi.querySelector("div")?.classList.add("ui_tab_sel_vktools_single");
      else {
        let allTabs = document.querySelectorAll(".ui_tab_sel_vktools_single");
        allTabs.forEach((tab) => {
          tab.classList.remove("ui_tab_sel_vktools_single");
        });
      }
      tabDiv.style.display = isActive ? "block" : "none";
    });
  }

  const liInfo = document.createElement("li");
  const divInfo = document.createElement("div");
  divInfo.classList.add("ui_tab", "ui_tab_vktools");
  divInfo.setAttribute("role", "link");
  divInfo.dataset.tab = "info";
  divInfo.textContent = getLang?.("me_convo_profile_info").toString() || "Информация";
  liInfo.appendChild(divInfo);
  ulTabs.appendChild(liInfo);

  const infoContent = document.createElement("div");
  infoContent.classList.add("vkToolsInfoIn");
  infoContent.style.display = "none";

  const groupInfoBlock = document.createElement("div");
  groupInfoBlock.classList.add("group_info_block_vktools", "info");

  const groupInfoRows = document.createElement("div");
  groupInfoRows.classList.add("group_info_rows", "group_info_rows_redesign");

  if (description && description.trim() !== "") {
    const descRow = document.createElement("div");
    descRow.classList.add("group_info_row", "info");
    descRow.setAttribute("title", "Description");

    const descLine = document.createElement("div");
    descLine.classList.add("line_value");
    descLine.innerHTML = formatDescriptionText(description);

    descRow.appendChild(descLine);
    groupInfoRows.appendChild(descRow);
  }

  if (site && site.trim() !== "") {
    const siteRow = document.createElement("div");
    siteRow.classList.add("group_info_row", "site");
    siteRow.setAttribute("title", "Website");

    const siteLine = document.createElement("div");
    siteLine.classList.add("line_value");

    const siteLink = document.createElement("a");
    siteLink.href = site;
    siteLink.target = "_blank";
    siteLink.rel = "noopener";
    siteLink.textContent = site;

    siteLine.appendChild(siteLink);
    siteRow.appendChild(siteLine);
    groupInfoRows.appendChild(siteRow);
  }

  groupInfoBlock.appendChild(groupInfoRows);
  infoContent.appendChild(groupInfoBlock);
  contentContainer.appendChild(infoContent);

  tabsMap["info"] = { tabLi: liInfo, tabDiv: infoContent };

  if (hasDiscussionsTab) {
    const discussionTabData = tabs.find((tab) => tab.name === "discussions");
    const liDiscussions = document.createElement("li");
    const divDiscussions = document.createElement("div");
    divDiscussions.classList.add("ui_tab", "ui_tab_vktools");
    divDiscussions.setAttribute("role", "link");
    divDiscussions.dataset.tab = "discussions";
    divDiscussions.textContent = getLang?.("discussions")?.toString() || "Обсуждения";
    liDiscussions.appendChild(divDiscussions);
    ulTabs.appendChild(liDiscussions);

    const discussionsContent = document.createElement("div");
    discussionsContent.style.display = "none";
    discussionsContent.classList.add("vkToolsDiscIn");
    fillDiscussionsTabContent(id, discussionsContent, discussionTabData);
    contentContainer.appendChild(discussionsContent);

    tabsMap["discussions"] = { tabLi: liDiscussions, tabDiv: discussionsContent };
  }

  Object.entries(tabsMap).forEach(([name, { tabLi }]) => {
    tabLi.querySelector("div")?.addEventListener("click", () => {
      activateTab(name);
    });
  });

  const sliderDiv = document.createElement("div");
  sliderDiv.classList.add("ui_tabs_slider", "_ui_tabs_slider");
  sliderDiv.style.width = "79.4792px";
  sliderDiv.style.marginLeft = "14px";

  headerH2.appendChild(ulTabs);
  headerH2.appendChild(sliderDiv);

  subMainBlock.appendChild(headerH2);
  subMainBlock.appendChild(contentContainer);
  mainBlock.appendChild(subMainBlock);

  if (tabsMap["info"]) {
    activateTab("info");
  } else if (tabsMap["discussions"]) {
    activateTab("discussions");
  }

  return { mainBlock, activateTab, tabsMap, ulTabs, contentContainer };
}

export default groupInfoBlock;
