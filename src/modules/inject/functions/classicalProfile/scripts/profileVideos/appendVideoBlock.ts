import profileVideosBlock from "./profileVideosBlock";

const appendVideoBlock = async (profileOwnerData: any) => {
  if (!document.querySelector(".ProfileVideosEnhancer")) {
    if (profileOwnerData.id === cur.oid) {
      try {
        let profileVideosData = await vkApi.api("video.get", { count: 9, owner_id: profileOwnerData.id });
        if (profileVideosData && profileVideosData.items && profileVideosData.items.length > 0) {
          let profileVideos = profileVideosBlock(profileOwnerData, profileVideosData);
          let hasAudios = document.querySelector(".ProfileAudiosEnhancer");
          hasAudios ? document.querySelector(".page_block_vktools")?.insertBefore(profileVideos, hasAudios) : document.querySelector(".page_block_vktools")?.append(profileVideos);
          let vLang = getLang?.("videofile_num") || "видеозаписи";
          vLang = vLang[0].toUpperCase() + vLang.slice(1);
          let count = profileVideos.querySelector(".ProfileGroupHeaderContentIndicator")?.textContent || "0";
          let href = profileVideos.querySelector(".vkuiGroup__header > a")?.getAttribute("href") || "";
          profileVideos.querySelector(".vkuiGroup__header")!.innerHTML = `
    <a href=${href} data-allow-link-onclick-web="1"  style="padding: 0 8px;" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
      <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
        <div class="vkuiHeader__main">
          <div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
          <span class="vkuiHeader__content-in">
          <div class="Header-module__content--F5x_X">
          <div class="TextClamp-module__singleLine--mRCrF">
          ${vLang}
          </div></div></span>
          <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${count}</span></div>
        </div>
      </div>
    </a>
    <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>`;
        }
      } catch (error) {
        let videosBlock = document.querySelector(".ProfileVideosEnhancer");
        if (videosBlock) videosBlock.remove();
      }
    }
  }
};

export default appendVideoBlock;
