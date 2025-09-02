import getLocalValue from "../../getLocalValue";
import getYouTubeVideoId from "./getYouTubeVideoId";
import showYtPlayerFoot from "./showYtPlayerFoot";
import showYtPlayerHead from "./showYtPlayerHead";

const createYtPlayer = () => {
  if (getLocalValue("createYtPlayer")) {
    let sel = ['.AttachCard[href*="youtube.com"]', '.AttachCard[href*="youtu.be"]'];
    document.arrive(sel.join(","), { existing: true }, (attachCard) => {
      let svgInnerContainer = attachCard.querySelector(".AttachmentCell__imageBlock");
      let headLine = attachCard.querySelector(".AttachmentCell__headline");
      let footnote = attachCard.querySelector(".AttachmentCell__footnote");
      if (svgInnerContainer && headLine && footnote) {
        headLine.textContent = showYtPlayerHead(vk.lang);
        footnote.textContent = showYtPlayerFoot(vk.lang);
        svgInnerContainer.innerHTML = `
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12.9862" r="12" fill="#FF0033"></circle>
            <path d="M17.6081 12.9862L8.62964 7.89847V18.074L17.6081 12.9862Z" fill="white"></path>
          </svg>`;
        attachCard.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
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
            videoYt.innerHTML = `<iframe class="video_yt_player" onload="document.getElementById('video_yt')?.focus(); " onmouseover="if (cur && cur.incViews) cur.incViews();" width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&start=0&autohide=1&wmode=opaque&showinfo=0&origin=https://vk.ru&rel=0&iv_load_policy=3" frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media" id="widget2"></iframe>`;
            attachCard.replaceWith(videoYt);
          }
        });
      }
    });

    let oldSel = [".im_msg_media_link:has([href*='youtube.com'])", ".im_msg_media_link:has([href*='youtu.be'])"];
    document.arrive(oldSel.join(","), { existing: true }, (oldLink) => {
      let title = oldLink.querySelector(".mail_link__title");
      let subTitle = oldLink.querySelector(".mail_link__subtitle");
      let mailLink = oldLink.querySelector(".mail_link");
      if (title && subTitle) {
        title.textContent = showYtPlayerHead(vk.lang);
        subTitle.textContent = showYtPlayerFoot(vk.lang);
        mailLink?.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
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
              videoYt.innerHTML = `<iframe class="video_yt_player" onload="document.getElementById('video_yt')?.focus(); " onmouseover="if (cur && cur.incViews) cur.incViews();" width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&start=0&autohide=1&wmode=opaque&showinfo=0&origin=https://vk.ru&rel=0&iv_load_policy=3" frameborder="0" allowfullscreen="" allow="autoplay; encrypted-media" id="widget2"></iframe>`;
              oldLink.replaceWith(videoYt);
            }
          }
        });
      }
    });
  }
};

export default createYtPlayer;
