interface FriendPreview {
  first_name: string;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  photo_base: string;
}

interface FriendsData {
  count: number;
  preview: number[];
  preview_profiles: FriendPreview[];
}

const friendsSubsBlock = (data: FriendsData, id: number) => {
  if (data.preview_profiles.length > 0) {
    const container = document.createElement("div");
    container.classList.add("vkToolsFriendsContainer", "page_block");
    container.setAttribute("data-group-id", (-id).toString());

    const mainBlock = document.createElement("div");
    mainBlock.classList.add("vkToolsPadding");
    mainBlock.addEventListener("click", () => {
      page.showPageMembers(this, id, "friends");
    });

    const avatarWrapper = document.createElement("div");
    avatarWrapper.classList.add("vkToolsAvatarWrapper");

    const profile = data.preview_profiles[0];
    const link = document.createElement("a");
    link.href = `https://vk.com/id${data.preview[0]}`;
    link.title = profile.first_name;
    link.target = "_blank";
    link.rel = "noopener";
    link.classList.add("vkToolsAvatarLink");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    });

    const avatar = document.createElement("div");
    avatar.classList.add("vkToolsAvatar");
    avatar.style.backgroundImage = `url('${profile.photo_50}')`;

    link.appendChild(avatar);
    avatarWrapper.appendChild(link);

    mainBlock.appendChild(avatarWrapper);

    const textBlock = document.createElement("div");
    textBlock.classList.add("vkToolsTextBlock");
    textBlock.textContent = getLang?.("groups_friend_followers_group_title", data.count).toString() || "Подписан 1 друг";

    mainBlock.appendChild(textBlock);
    container.appendChild(mainBlock);

    return container;
  } else {
    return false;
  }
};

export default friendsSubsBlock;
