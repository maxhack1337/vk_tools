import getLocalValue from "../../getLocalValue";
import getYouTubeVideoId from "./getYouTubeVideoId";

const createYtPlayer = () => {
  if (getLocalValue("createYtPlayer")) {
    let sel = ['.AttachCard[href*="youtube.com"]', '.AttachCard[href*="youtu.be"]'];
    document.arrive(sel.join(","), { existing: true }, (attachCard) => {
      let videoLink = (attachCard as HTMLAnchorElement).href;
      let videoId = getYouTubeVideoId(videoLink);
      if (videoId && videoId !== null) {
        let videoYt = document.createElement("div");
        videoYt.id = "video_yt";
        videoYt.tabIndex = -1;
        videoYt.role = "complementary";
        videoYt.style.width = "100%";
        videoYt.style.height = "100%";
        videoYt.style.outline = "0";
        videoYt.innerHTML = `<iframe class="video_yt_player" onload="document.getElementById('video_yt')?.focus(); " onmouseover="if (cur && cur.incViews) cur.incViews();" width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&start=0&autohide=1&wmode=opaque&showinfo=0&origin=https://vk.com&rel=0&iv_load_policy=3" frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media" id="widget2"></iframe>`;
        attachCard.replaceWith(videoYt);
      }
    });

    let oldSel = ".im_msg_media_link";
    document.arrive(oldSel, { existing: true }, (oldLink) => {
      let videoLink = oldLink.querySelector(".mail_link")?.getAttribute("href") || "";
      if (videoLink && videoLink !== "") {
        let videoId = getYouTubeVideoId(videoLink);
        if (videoId && videoId !== null) {
          let videoYt = document.createElement("div");
          videoYt.id = "video_yt";
          videoYt.tabIndex = -1;
          videoYt.role = "complementary";
          videoYt.style.width = "100%";
          videoYt.style.height = "100%";
          videoYt.style.outline = "0";
          videoYt.innerHTML = `<iframe class="video_yt_player" onload="document.getElementById('video_yt')?.focus(); " onmouseover="if (cur && cur.incViews) cur.incViews();" width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&start=0&autohide=1&wmode=opaque&showinfo=0&origin=https://vk.com&rel=0&iv_load_policy=3" frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media" id="widget2"></iframe>`;
          oldLink.replaceWith(videoYt);
        }
      }
    });
  }
};

export default createYtPlayer;
