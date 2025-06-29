import splitDuration from "../splitDuration";
import formatViewsValue from "./formatViewsValue";
import getMaxResolutionPreview from "./getMaxResolutionPreview";

type PreviewImage = {
  url: string;
  width: number;
  height: number;
};

type VideoItem = {
  id: number;
  owner_id: number;
  title: string;
  duration: number;
  views: number;
  image: PreviewImage[];
};

const videoItem = (video: VideoItem): HTMLElement => {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("OwnerVideosListItem");
  itemDiv.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    showVideo(`${video.owner_id}_${video.id}`);
  });

  const linkHref = `/video${video.owner_id}_${video.id}`;
  const videoLink = document.createElement("a");
  videoLink.classList.add("VideoPreview");
  videoLink.setAttribute("data-testid", "video_preview");
  videoLink.href = linkHref;

  const bestPreview = getMaxResolutionPreview(video.image);

  const img = document.createElement("img");
  img.classList.add("VideoPreview__videoImage");
  img.loading = "lazy";
  img.src = bestPreview ? bestPreview.url : "";
  videoLink.appendChild(img);

  if (video.duration && video.duration > 0) {
    const durationSpan = document.createElement("span");
    durationSpan.classList.add("VideoPreview__videoDuration");
    durationSpan.textContent = splitDuration(video.duration);
    videoLink.appendChild(durationSpan);
  }

  itemDiv.appendChild(videoLink);

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("OwnerVideosListItem__details");

  const titleLink = document.createElement("a");
  titleLink.classList.add("OwnerVideosListItem__title");
  titleLink.href = linkHref;
  titleLink.textContent = video.title;

  detailsDiv.appendChild(titleLink);

  const viewsDiv = document.createElement("div");
  viewsDiv.classList.add("OwnerVideosListItem__views");
  viewsDiv.textContent = formatViewsValue(video.views);

  detailsDiv.appendChild(viewsDiv);

  itemDiv.appendChild(detailsDiv);

  return itemDiv;
};

export default videoItem;
