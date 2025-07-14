function addPinnedPostTab(pinnedPost: HTMLElement, ulTabs: HTMLElement, contentContainer: HTMLElement, tabsMap: { [key: string]: { tabLi: HTMLLIElement; tabDiv: HTMLDivElement } }, activateTab: (name: string) => void) {
  if (ulTabs.querySelector(".ui_tab[data-tab='pinned']")) return;

  const liPinned = document.createElement("li");
  const divPinned = document.createElement("div");
  divPinned.classList.add("ui_tab", "ui_tab_vktools");
  divPinned.setAttribute("role", "link");
  divPinned.dataset.tab = "pinned";
  divPinned.textContent = "Закреплённый пост";
  liPinned.appendChild(divPinned);

  if (ulTabs.firstChild) {
    ulTabs.insertBefore(liPinned, ulTabs.firstChild);
  } else {
    ulTabs.appendChild(liPinned);
  }

  const pinnedContent = document.createElement("div");
  pinnedContent.classList.add("vkToolsPinnedPostIn");
  pinnedContent.style.display = "none";

  pinnedContent.appendChild(pinnedPost);
  contentContainer.appendChild(pinnedContent);

  tabsMap["pinned"] = { tabLi: liPinned, tabDiv: pinnedContent };

  divPinned.addEventListener("click", () => {
    activateTab("pinned");
  });

  activateTab("pinned");
}

export default addPinnedPostTab;
