const newDesignFunctions = [
  "vkm_chat_big_stickers",
  "vkm_mention_highlight_tertiary",
  "vkm_send_promoted_stickers",
  "vkm_settings_experimental",
  "vkm_hide_forward_author",
  "vkm_extended_reaction_picker",
  "vkm_convo_forbid_writing_all",
  "vkm_convo_member_temporary_ban",
  "vkm_message_preview_on_hover",
  "vkm_settings_hide_suggested",
  "vkm_theme_styles_settings",
  "vkm_forward_modal_multipick",
  "vkm_stickers_popup",
  "vkm_delete_chat",
  "vkm_admin_can_delete_message",
  "vkm_stickers_animation_setting",
  "vkm_gifs_autoplay",
  "vkm_show_inviter",
  "vkm_video_chat",
  "vkm_up_drafted_convos_in_list"
];

const newDesign = () => {
  localStorage.setItem("isNewDesign", 'true');
  return new Promise((resolve, reject) => {
    newDesignFunctions.forEach((flag) => {
      window.vk.pe[flag] = 1;
    });
    window.vk.pe.vkm_hide_forward_author = 1;
    window.vk.pe.vkm_theme_styles_settings = 1;
    window.vk.pe.vkm_reactions || (window.vk.pe.vkm_reactions = 20);
    localStorage.setItem("isVKMReforgedDesign", 'true');

    window.MECommonContext &&
      window.MECommonContext.then((e) => {
        if (e.store.featureFlags) {
          newDesignFunctions.forEach((flag) => {
            e.store.featureFlags[flag] = true;
          });
          try {
            if (localStorage.getItem("isDefaultTheme") === "true") {
              
            }
          } catch (error) {}
          e.store.featureFlags["vkm_reactions"] = 20;
          e.store.featureFlags["me_reactions"] = 20;
          resolve(true);
        } else {
          console.error("Feature flags object is not available");
        }
      }).catch((error) => {
        console.error("Error while setting feature flags:", error);
      });
  });
}

export default newDesign;