import getVideoProps from "./getVideoProps";
import querySelectorAllShadows from "./querySelectorAllShadows";

const downloadVideo = () => {
document.arrive(".videoplayer_btn_mute", { existing: true }, function (e) {
  let quality;
  let vidUrl;
  try {
    quality = Math.max(
        ...Object.keys(window.mvcur.player.media.vars)
            .filter((e) => e.startsWith("url"))
            .map((url) => {
                const match = url.match(/\d+/); 
                return match ? parseInt(match[0]) : -Infinity;
            })
    );
    vidUrl = window.mvcur.player.media.vars[`url${quality}`];
    let videoButton = document.createElement("a");
	if (vidUrl === undefined) {
      vidUrl = "";
	  videoButton.setAttribute(
      "onclick",
      `showFastBox("Ошибка", "Не удалось найти URL видео");`
    );
	}
    videoButton.href = vidUrl;
    videoButton.style.padding = "15px 10px 0 8px";
    videoButton.setAttribute(
      "onmouseover",
      `showTooltip(this, { text: '${getLang?.(
        "video_download_video_from_modal"
      )}', black: true, shift: [2, 24] });`
    );
    videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
    e.parentNode?.insertBefore(videoButton, e);
  } 
  catch (error) {
	try {
	quality = Math.max(
      ...Object.keys(window.cur.videoInlinePlayer.media.vars)
        .filter((e) => e.startsWith("url"))
        .map((url) => {
            const match = url.match(/\d+/); 
            return match ? parseInt(match[0]) : -Infinity; 
        })
    );
    vidUrl = window.cur.videoInlinePlayer.media.vars[`url${quality}`];
    let videoButton = document.createElement("a");
	    if (vidUrl === undefined) {
      vidUrl = "";
	  videoButton.setAttribute(
      "onclick",
      `showFastBox("Ошибка", "Не удалось найти URL видео");`
    );
    }
    videoButton.href = vidUrl;
    videoButton.style.padding = "15px 10px 0 8px";
    videoButton.setAttribute(
      "onmouseover",
      `showTooltip(this, { text: '${getLang?.(
        "video_download_video_from_modal"
      )}', black: true, shift: [2, 24] });`
    );
    videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
    e.parentNode?.insertBefore(videoButton, e);  
  } catch(error) {
	console.info('[VK Tools] Post with video found, nothing to worry about');
  }
  }
});
    
    document.arrive("vk-video-player", { existing: true }, function (e) {
  let muteButton = querySelectorAllShadows(".volumeBar-container")[0];
  let props;
  let files;
  try {
    props = Object.keys(
      getVideoProps(document.querySelector(".MediaViewerVideo")!).video.files
    );
    files = getVideoProps(document.querySelector(".MediaViewerVideo")!).video
      .files;
  } catch (error) {
    props = Object.keys(
      getVideoProps(e.closest(".AttachVideos__base")!).video.files
    );
    files = getVideoProps(e.closest(".AttachVideos__base")!).video.files;
  }
  let maxNumber = -1;
  let quality = '';
  props.forEach((element) => {
    if (element.startsWith("mp4")) {
      const number = parseInt(element.split("_")[1]);
      if (number > maxNumber) {
        maxNumber = number;
        quality = element;
      }
    }
  });
  let vidUrl = files[quality];
  let videoButton = document.createElement("a");
  videoButton.style.padding = "5px 10px 0 8px";
  videoButton.style.cursor = "pointer";
  videoButton.setAttribute("aria-label", `${getLang?.("video_download_video_from_modal")}`);
  videoButton.addEventListener("click", function () {
    let linkV = document.createElement("a");
    linkV.href = vidUrl;
    linkV.click();
  });
  videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
  muteButton.parentNode?.insertBefore(videoButton, muteButton);
  videoButton.title = videoButton.getAttribute("aria-label") || '';
});
}

export default downloadVideo;