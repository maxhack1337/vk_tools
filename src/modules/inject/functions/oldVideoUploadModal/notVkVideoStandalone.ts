import getLocalValue from "../../getLocalValue";
import subscribeNavLocationChange from "../listeners/subscribeNavLocationChange";

const notVkVideoStandalone = () => {
  if (getLocalValue("disableStandaloneCheckOnLoadVideo")) {
    const loadVideoButtonsSel = ['[data-testid="video_upload_load_more_videos"]', '[data-testid="add_video_button"]'];
    document.arrive(loadVideoButtonsSel.join(","), { existing: true }, (btn) => {
      btn.addEventListener(
        "click",
        () => {
          let vkOldStandalone = vk.isVideoStandalone;
          let curOldStandalone = cur.isVideoStandalone;
          vk.isVideoStandalone = false;
          cur.isVideoStandalone = false;
          subscribeNavLocationChange(() => {
            vk.isVideoStandalone = vkOldStandalone;
            cur.isVideoStandalone = curOldStandalone;
          });
        },
        true
      );
    });
  }
};

export default notVkVideoStandalone;
