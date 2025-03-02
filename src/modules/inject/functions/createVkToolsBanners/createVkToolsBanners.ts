import banner from "../../components/banner/banner";
import getSiteBannerLang from "./getSiteBannerLang";
import listenCur from "./listenCur";

const VK_TOOLS_GROUP_ID = -221416961;

const createVkToolsBanners = () => {
    listenCur(() => {
        if (!document.getElementById('vkToolsMessageToUsBanner') && cur.oid &&cur.oid === VK_TOOLS_GROUP_ID) {
            let narrow = document.querySelector('.narrow_column.narrow_redesign.group-redesigned-narrow');
            let bannerSite = banner({
                id: "vkToolsMessageToUsBanner",
                text: getSiteBannerLang(vk.lang)[0],
                canClose: false,
                buttonText: getSiteBannerLang(vk.lang)[1],
                customTopMargin: '-26px',
                buttonOnclick: `showBox("al_im.php", {act: "a_write_box", to: ${VK_TOOLS_GROUP_ID}})`,
                icon: "message",
                color: "var(--vkui--color_icon_accent)"
            });

            narrow?.prepend(bannerSite);
        }
        });
}

export default createVkToolsBanners;