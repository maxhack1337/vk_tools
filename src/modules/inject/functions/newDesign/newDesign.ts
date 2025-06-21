import createStyle from "../../createStyle";
import waitMECommon from "../listeners/waitMECommon";
import deferredCallbackNested from "../oldPosting/deferredCallbackNested";

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
  "vkm_show_inviter",
  "vkm_video_chat",
  "vkm_up_drafted_convos_in_list",
];

/*
 * Тут тогглы которые ты хочешь включать
 * Плюс тогглы из toggleShop
 */

const newDesign = () => {
  createStyle(
    "ActionHover",
    `
    .VKCOMMessenger__reforgedModalRoot .ActionsMenuAction:not(:disabled):hover {
        background-color: var(--vkui--color_transparent--hover)!important;
    }
    .VKCOMMessenger__reforgedModalRoot .ActionsMenuAction--focused:not(:disabled) {
        background-color: var(--vkui--color_background_content);
    }
}  
  `
  );
  localStorage.setItem("isNewDesign", "true");
  deferredCallbackNested(
    (_vk) => {
      if (!window.vk?.pe) return;
      newDesignFunctions.forEach((flag) => {
        window.vk.pe[flag] = 1;
      });
      window.vk.pe.vkm_hide_forward_author = 1;
      window.vk.pe.vkm_theme_styles_settings = 1;
      window.vk.pe.vkm_reactions || (window.vk.pe.vkm_reactions = 20);
      try {
        let toggleShopStore = JSON.parse(localStorage.getItem("vkToolsCustomToggles") || "{}");
        Object.entries(toggleShopStore).forEach(([key, value]) => {
          window.vk.pe[key] = value;
        });
      } catch (error) {}
    },
    { variablePath: "vk.pe" }
  );

  waitMECommon().then(() => {
    window.MECommonContext &&
      window.MECommonContext.then((e) => {
        if (e.store.featureFlags) {
          newDesignFunctions.forEach((flag) => {
            e.store.featureFlags[flag] = true;
          });
          e.store.featureFlags["vkm_reactions"] = 20;
          e.store.featureFlags["me_reactions"] = 20;
        } else {
          console.error("Feature flags object is not available");
        }
      }).catch((error) => {
        console.error("Error while setting feature flags:", error);
      });
  });
};

export default newDesign;
