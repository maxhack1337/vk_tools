import banner from "../../components/banner/banner";
import getSiteBannerLang from "./getSiteBannerLang";

const VK_TOOLS_GROUP_ID = -221416961;

/*
 * Сломается с переходом сообществ на SPA, если переход вообще будет
 */

const createVkToolsBanners = () => {
  let bannersSelectors = [`.narrow_column.narrow_redesign.group-redesigned-narrow .group_info_row.more a[href*="vkenhancer"]`, `body:has(a.vkuiButton__appearanceAccent[href*="vkenhancer"] .vkuiIcon--link_circle_outline_20) [class*='TwoColumnLayoutNarrow__root'] > div`];
  document.arrive(bannersSelectors.join(","), { existing: true }, (vktools_narrow) => {
    let narrow = vktools_narrow.closest(".narrow_column.narrow_redesign.group-redesigned-narrow");
    let bannerSite = banner({
      id: "vkToolsMessageToUsBanner",
      text: getSiteBannerLang(vk.lang)[0],
      canClose: false,
      buttonText: getSiteBannerLang(vk.lang)[1],
      customTopMargin: "-26px",
      customLeftMargin: "16px",
      buttonOnclick: `showBox("al_im.php", {act: "a_write_box", to: ${VK_TOOLS_GROUP_ID}})`,
      icon: "message",
      color: "var(--vkui--color_icon_accent)",
    });
    if (narrow) {
      narrow?.prepend(bannerSite);
    } else {
      vktools_narrow?.prepend(bannerSite);
    }
  });
};

export default createVkToolsBanners;
