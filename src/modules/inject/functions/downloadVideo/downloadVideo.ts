import getVideoProps from "./getVideoProps";
import querySelectorAllShadows2 from "./querySelectorAllShadows2";

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
        videoButton.setAttribute("onclick", `showFastBox("Ошибка", "Не удалось найти URL видео");`);
      }
      videoButton.href = vidUrl;
      videoButton.style.padding = "15px 10px 0 8px";
      videoButton.setAttribute("onmouseover", `showTooltip(this, { text: '${getLang?.("video_download_video_from_modal")}', black: true, shift: [2, 24] });`);
      videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
      e.parentNode?.insertBefore(videoButton, e);
    } catch (error) {
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
          videoButton.setAttribute("onclick", `showFastBox("Ошибка", "Не удалось найти URL видео");`);
        }
        videoButton.href = vidUrl;
        videoButton.style.padding = "15px 10px 0 8px";
        videoButton.setAttribute("onmouseover", `showTooltip(this, { text: '${getLang?.("video_download_video_from_modal")}', black: true, shift: [2, 24] });`);
        videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
        e.parentNode?.insertBefore(videoButton, e);
      } catch (error) {
        console.info("[VK Tools] Post with video found, nothing to worry about");
      }
    }
  });

  document.arrive("vk-video-player", { existing: true }, (videoPlayerElement) => {
    const MAX_ATTEMPTS = 50;
    let attempts = 0;

    const findAndProcessMuteButton = () => {
      let muteButton = querySelectorAllShadows2(".volumeBar-container", videoPlayerElement)[0];

      if (muteButton) {
        let vidUrl: any;

        if (window.cur && window.cur.videoInlinePlayer) {
          const varsSource = window.cur.videoInlinePlayer.media?.vars || window.cur.videoInlinePlayer.vars;

          if (varsSource) {
            let quality = Math.max(
              ...Object.keys(varsSource)
                .filter((key) => key.startsWith("url"))
                .map((url) => {
                  const match = url.match(/\d+/);
                  return match ? parseInt(match[0]) : -Infinity;
                })
            );
            if (quality !== -Infinity && varsSource[`url${quality}`]) {
              vidUrl = varsSource[`url${quality}`];
            }
          }
        } else if (window.mvcur && window.mvcur.player?.vars) {
          const varsSource = window.mvcur.player.vars;

          if (varsSource) {
            let quality = Math.max(
              ...Object.keys(varsSource)
                .filter((key) => key.startsWith("url"))
                .map((url) => {
                  const match = url.match(/\d+/);
                  return match ? parseInt(match[0]) : -Infinity;
                })
            );
            if (quality !== -Infinity && varsSource[`url${quality}`]) {
              vidUrl = varsSource[`url${quality}`];
            }
          }
        }

        if (!vidUrl) {
          let props: any;
          let files: any;
          try {
            const videoElem = document.querySelector(".MediaViewerVideo") as HTMLElement;
            if (videoElem) {
              props = Object.keys(getVideoProps(videoElem).video.files);
              files = getVideoProps(videoElem).video.files;
            } else {
              const baseElem = videoPlayerElement.closest(".AttachVideos__base") as HTMLElement;
              if (baseElem) {
                props = Object.keys(getVideoProps(baseElem).video.files);
                files = getVideoProps(baseElem).video.files;
              } else {
                console.warn("Could not find .MediaViewerVideo or .AttachVideos__base for video files.");
                return;
              }
            }
          } catch (error) {
            console.error("Error getting video properties:", error);
            return;
          }

          if (props && files) {
            let maxNumber = -1;
            let qualityKey = "";
            props.forEach((element: string) => {
              if (element.startsWith("mp4")) {
                const number = parseInt(element.split("_")[1]);
                if (number > maxNumber) {
                  maxNumber = number;
                  qualityKey = element;
                }
              }
            });
            if (files[qualityKey]) {
              vidUrl = files[qualityKey];
            }
          }
        }

        if (!vidUrl) {
          console.warn("[VK Tools Error] Final: Could not determine video URL.");
          return;
        }

        const videoButton = document.createElement("a");
        videoButton.style.cssText = "padding: 5px 10px 0 8px; cursor: pointer;";
        videoButton.setAttribute("aria-label", `${getLang?.("video_download_video_from_modal") || "Download Video"}`);
        videoButton.addEventListener("click", function () {
          const linkV = document.createElement("a");
          linkV.href = vidUrl;
          linkV.download = "";
          linkV.click();
        });
        videoButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;

        if (muteButton.parentNode) {
          muteButton.parentNode.insertBefore(videoButton, muteButton);
        } else {
          console.warn("[VK Tools Error] muteButton has no parentNode to insert the button.");
        }
        videoButton.title = videoButton.getAttribute("aria-label") || "";
      } else if (attempts < MAX_ATTEMPTS) {
        attempts++;
        setTimeout(findAndProcessMuteButton, 100);
      } else {
        console.warn("[VK Tools Error] Failed to find .volumeBar-container within vk-video-player after multiple attempts.");
      }
    };

    findAndProcessMuteButton();
  });
};

export default downloadVideo;
