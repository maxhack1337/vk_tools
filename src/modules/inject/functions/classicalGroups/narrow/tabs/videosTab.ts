import getMaxResolutionPreview from "../../../classicalProfile/scripts/profileVideos/getMaxResolutionPreview";
import { getVideosText } from "../../../downloadAttachments/localizationVideos";
import splitDuration from "../../../oldFeed/splitDuration";
import addBlock from "./addBlock";

interface VideoItem {
  id: number;
  owner_id: number;
  title: string;
  duration: number;
  image: { url: string; width: number; height: number }[];
}

interface VideosResponse {
  count: number;
  items: VideoItem[];
}

const videosTab = (videosGetter: VideosResponse, id: number, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", getVideosText(vk.lang));
  if (videosGetter.items.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "video_module", "_module");
    moduleDiv.id = "public_videos";

    const headerRightLink = document.createElement("a");
    headerRightLink.classList.add("header_right_link", "fl_r");
    headerRightLink.href = videosGetter.items.length > 0 ? `/videos${videosGetter.items[0].owner_id}` : "#";
    moduleDiv.appendChild(headerRightLink);

    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
      lnk.href = videosGetter.items.length > 0 ? `/videos${videosGetter.items[0].owner_id}` : "#";
      headerRightLink.append(lnk);
    }

    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.href = videosGetter.items.length > 0 ? `/videos${videosGetter.items[0].owner_id}` : "#";

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = getVideosText(vk.lang);

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = videosGetter.count.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix");

    videosGetter.items.slice(0, 2).forEach((video) => {
      const videoRow = document.createElement("div");
      videoRow.classList.add("video_row", "fl_l");

      const videoLink = document.createElement("a");
      videoLink.classList.add("video", "fl_l");
      videoLink.href = `video${video.owner_id}_${video.id}`;
      videoLink.setAttribute("onclick", `return showVideo('${video.owner_id}_${video.id}', 'videos${video.owner_id}', {autoplay: 1, module: 'community_video_block', playlistId: '${video.owner_id}_-2'}, event);`);
      videoLink.setAttribute("aria-label", video.title);

      const blindLabel = document.createElement("span");
      blindLabel.classList.add("blind_label");
      blindLabel.textContent = video.title;
      videoLink.appendChild(blindLabel);

      const videoThumbLabel = document.createElement("div");
      videoThumbLabel.classList.add("video_thumb_label");

      const emptySpan = document.createElement("span");
      emptySpan.classList.add("video_thumb_label_item");
      videoThumbLabel.appendChild(emptySpan);

      const durationSpan = document.createElement("span");
      durationSpan.classList.add("video_thumb_label_item");

      durationSpan.textContent = splitDuration(video.duration);

      videoThumbLabel.appendChild(durationSpan);
      videoLink.appendChild(videoThumbLabel);

      const playIcon = document.createElement("div");
      playIcon.classList.add("page_video_play_icon");
      videoLink.appendChild(playIcon);

      const bestPreviewUrl = getMaxResolutionPreview(video.image);
      const videoThumb = document.createElement("span");
      videoThumb.classList.add("page_video_thumb");
      videoThumb.style.backgroundImage = `url('${bestPreviewUrl?.url}')`;
      videoLink.appendChild(videoThumb);

      videoRow.appendChild(videoLink);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info", "clear");

      const infoLink = document.createElement("a");
      infoLink.href = `video${video.owner_id}_${video.id}`;
      infoLink.setAttribute("onclick", `return showVideo('${video.owner_id}_${video.id}', 'videos${video.owner_id}', {autoplay: 1, module: 'community_video_block'}, event);`);
      infoLink.textContent = video.title;

      infoDiv.appendChild(infoLink);
      videoRow.appendChild(infoDiv);

      moduleBody.appendChild(videoRow);
    });

    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addArticle = addBlock("videos", id);
      aside.append(addArticle);
    }
  }
  return aside;
};

export default videosTab;
