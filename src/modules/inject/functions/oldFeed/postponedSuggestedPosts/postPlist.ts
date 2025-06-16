import playlistAttachment from "../attachments/playlistAttachment";
import getPostAttaches from "../getPostAttaches";

const postPlist = () => {
  let selectorsPlist = [`.postponed.Post--redesignV3 [class^="vkitMusicPlaylistOverlayBadge__root"]`, `.suggest.Post--redesignV3 [class^="vkitMusicPlaylistOverlayBadge__root"]`];
  document.arrive(selectorsPlist.join(", "), { existing: true }, async function (docus) {
    let closestCheck = docus.closest(".vkEnhancerPostponedPostPlist");
    if (!closestCheck) {
      let dataAttachments;
      let postAppendClass = docus.closest(".Post--redesignV3");
      postAppendClass?.classList.add("vkEnhancerPostponedPostPlist");
      try {
        dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]')!);
      } catch (error) {
        console.log(error);
      }
      if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
        dataAttachments.item.attachments.forEach(function (music: any) {
          if (music.type === "audio_playlist" && music.style === "on_media") {
            let pListInfo = music.audio_playlist;
            let secondaryAttachPlist = document.createElement("div");
            secondaryAttachPlist.classList.add("vkuiDiv", "vkuiRootComponent", "vkEnhancerSecondaryAttach");
            secondaryAttachPlist.classList.add("vkEnhancerSecondaryAttachFirst");
            secondaryAttachPlist.style.padding = "0px 8px";
            secondaryAttachPlist.innerHTML = playlistAttachment(pListInfo);
            if (pListInfo.photo) {
              let fallBack = secondaryAttachPlist.querySelector(".vkuiInternalImage")! as HTMLElement;
              fallBack.querySelector(".vkuiImageBase__fallback")?.remove();
              fallBack.style.background = "url(" + pListInfo.photo.photo_270 + ")";
              fallBack.style.backgroundSize = "cover";
            } else {
            }
            docus?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachPlist);
          }
        });
      }
    }
  });
};

export default postPlist;
