import videoItem from "./videoItem";

const profileVideosBlock = (userData: any, videosData: any) => {
  const profileVideosBlockGroup = document.createElement("section");
  profileVideosBlockGroup.classList.add("ProfileVideos", "ProfileVideosEnhancer");

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("vkuiGroup__header");

  const headerLink = document.createElement("a");
  headerLink.classList.add("ProfileGroupHeader");
  headerLink.href = `/video/@${userData.domain || "id" + userData.id}`;
  headerLink.setAttribute("data-allow-link-onclick-web", "1");

  const headerHostDiv = document.createElement("div");
  headerHostDiv.classList.add("ProfileGroupHeaderHost");
  headerHostDiv.setAttribute("role", "heading");
  headerHostDiv.setAttribute("aria-level", "2");

  const headerMainDiv = document.createElement("div");
  headerMainDiv.classList.add("ProfileGroupHeaderMain");

  const headerContentDiv = document.createElement("div");
  headerContentDiv.classList.add("ProfileGroupHeaderContent");

  const contentInSpan = document.createElement("span");
  contentInSpan.classList.add("ProfileGroupHeaderContentIn");

  const contentInContentDiv = document.createElement("div");
  contentInContentDiv.classList.add("ProfileGroupHeaderContentIn__content");

  const contentTextMainDiv = document.createElement("div");
  contentTextMainDiv.classList.add("ProfileGroupHeaderContentTextMain");
  contentTextMainDiv.textContent = "Видео";

  contentInContentDiv.appendChild(contentTextMainDiv);
  contentInSpan.appendChild(contentInContentDiv);
  headerContentDiv.appendChild(contentInSpan);

  const indicatorSpan = document.createElement("span");
  indicatorSpan.classList.add("ProfileGroupHeaderContentIndicator");
  indicatorSpan.textContent = videosData.count || 0;

  headerContentDiv.appendChild(indicatorSpan);

  headerMainDiv.appendChild(headerContentDiv);

  headerHostDiv.appendChild(headerMainDiv);

  headerLink.appendChild(headerHostDiv);

  const tappableStateLayerSpan = document.createElement("span");
  tappableStateLayerSpan.setAttribute("aria-hidden", "true");
  tappableStateLayerSpan.classList.add("vkuiTappable__stateLayer");
  headerLink.appendChild(tappableStateLayerSpan);

  headerDiv.appendChild(headerLink);

  const height4Div1 = document.createElement("div");
  height4Div1.classList.add("ProfileVideosHeight4");
  headerDiv.appendChild(height4Div1);

  profileVideosBlockGroup.appendChild(headerDiv);

  const height4Div2 = document.createElement("div");
  height4Div2.classList.add("ProfileVideosHeight4");
  profileVideosBlockGroup.appendChild(height4Div2);

  const profileVideosItemsDiv = document.createElement("div");
  profileVideosItemsDiv.classList.add("ProfileVideos__items");

  const profileVideosHorizontalDiv = document.createElement("div");
  profileVideosHorizontalDiv.classList.add("ProfileVideosHorizontal");

  const ownerVideosListDiv = document.createElement("div");
  ownerVideosListDiv.classList.add("OwnerVideosList");

  if (videosData?.items && Array.isArray(videosData.items)) {
    const maxVideos = 2;
    for (let i = 0; i < Math.min(videosData.items.length, maxVideos); i++) {
      const videoElement = videoItem(videosData.items[i]);
      ownerVideosListDiv.appendChild(videoElement);
    }
  }

  profileVideosHorizontalDiv.appendChild(ownerVideosListDiv);
  profileVideosItemsDiv.appendChild(profileVideosHorizontalDiv);
  profileVideosBlockGroup.appendChild(profileVideosItemsDiv);

  return profileVideosBlockGroup;
};

export default profileVideosBlock;
