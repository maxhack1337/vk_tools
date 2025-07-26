const subsFriendsSkeleton = () => {
  const subsFSkeleton = document.createElement("div");
  subsFSkeleton.classList.add("page_block", "vkToolsFriendsContainerSkeleton");
  subsFSkeleton.innerHTML = `<div class="vkToolsPadding">
  <div class="vkToolsAvatarWrapper">
    <a class="vkToolsAvatarLink">
      <div class="vkToolsAvatar"></div>
    </a>
  </div>
  <div class="vkToolsTextBlock">Подписан 1&nbsp;друг</div>
</div>`;

  return subsFSkeleton;
};

export default subsFriendsSkeleton;
