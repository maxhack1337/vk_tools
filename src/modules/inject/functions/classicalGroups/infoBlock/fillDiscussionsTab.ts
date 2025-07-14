async function fillDiscussionsTabContent(groupId: number, discussionsContainer: HTMLElement, discussionTabData: any) {
  try {
    const response = await vkApi.api("groups.getContentForTabs", {
      group_id: groupId,
      tabs: "discussions",
    });

    const discussions = response.discussions?.items || [];
    const totalCount = response.discussions?.count || 0;

    discussionsContainer.innerHTML = "";

    for (const item of discussions.slice(0, 3)) {
      const a = document.createElement("a");
      a.href = `/topic-${groupId}_${item.id}`;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "vkToolsDiscussionLink";

      const titleDiv = document.createElement("div");
      titleDiv.className = "vkToolsDiscussionTitle";
      titleDiv.textContent = item.title;

      const infoDiv = document.createElement("div");
      infoDiv.className = "vkToolsDiscussionInfo";

      const postsText = document.createElement("span");
      postsText.textContent = getLang?.("groups_discussions_n_posts", item.comments).toString() || "0 комментариев";

      const separator = document.createElement("span");
      separator.className = "vkToolsDiscussionSeparator";
      separator.textContent = "⋅";

      const latestPostDate = document.createElement("a");
      latestPostDate.className = "vkToolsDiscussionDate";
      latestPostDate.href = `/topic-${groupId}_${item.id}?offset=last&scroll=1`;
      latestPostDate.textContent = getDateText(item.updated, 0);

      infoDiv.append(postsText, separator, latestPostDate);

      a.append(titleDiv, infoDiv);
      discussionsContainer.appendChild(a);
    }

    if (totalCount > 3) {
      const showAllWrapper = document.createElement("div");
      showAllWrapper.className = "vkToolsShowAllWrapper";

      const showAllLink = document.createElement("a");
      showAllLink.href = `/board${groupId}`;
      showAllLink.target = "_blank";
      showAllLink.rel = "noopener";
      showAllLink.className = "vkToolsShowAllLink";
      showAllLink.textContent = `${getLang?.("global_notify_show_all").toString()} ${totalCount}`;

      showAllWrapper.appendChild(showAllLink);
      discussionsContainer.appendChild(showAllWrapper);
    }

    if (discussionTabData?.main_type_count === 0) {
      const placeholder = document.createElement("div");
      placeholder.classList.add("vkToolsDiscussionsPlaceholder");
      placeholder.textContent = getLang?.("groups_tab_discussions_placeholder")?.toString() || "Обсуждений пока нет";

      discussionsContainer.appendChild(placeholder);
    }

    if (discussionTabData?.can_add) {
      const addDiscDiv = document.createElement("div");
      addDiscDiv.classList.add("vkToolsAddDiscussionBtnWrapper");

      const addDiscussionBtn = document.createElement("a");
      addDiscussionBtn.type = "button";
      addDiscussionBtn.href = `/board${groupId}?act=create`;
      addDiscussionBtn.classList.add("vkToolsAddDiscussionBtn");
      addDiscussionBtn.textContent = getLang?.("groups_tab_add_discussions")?.toString() || "Добавить обсуждение";

      addDiscDiv.append(addDiscussionBtn);
      discussionsContainer.appendChild(addDiscDiv);
    }
  } catch (error) {
    console.error("[VK Tools Error] Ошибка загрузки обсуждений:", error);
    discussionsContainer.textContent = "Ошибка загрузки обсуждений.";
  }
}

export default fillDiscussionsTabContent;
