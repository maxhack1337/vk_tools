import waitVK from "../listeners/waitVK";
import constants from "./constants";
import getCategories from "./getCategories";

const posterLogic = async () => {
  await window.stManager.add([window.jsc("web/poster.js")]);
  waitVK().then(() => {
    let lang = vk.lang || 0;
    let config = {
      poster_config: {
        constants: constants(),
        events_hash: "",
        uploadBkgsEnabled: true,
        custom_enabled: true,
        custom_layer_placeholder: "VK Tools",
        categories: getCategories(lang),
        bkgs: [{ id: "0_34" }],
      },
    };
    Wall.initPosterEditor(config);
  });
};

export default posterLogic;
