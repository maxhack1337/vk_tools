import fromId from "../../../../content/fromId";

const classicButtons = () => {
let styleElement = fromId("vken_box_message_classic");
            if (!styleElement) {
              styleElement = document.createElement("style");
              styleElement.id = "vken_box_message_classic";
              document.head.appendChild(styleElement);
            }
            styleElement.id = "vken_box_message_classic";
            styleElement.innerHTML =
              `.ProfileHeaderButton > button:has(> span > span > svg.vkuiIcon--user_check_outline_20) > span:before{content:"` +
              getLang?.("me_in_your_friends") +
              `"}.ProfileHeaderButton>a:has(>span>span>svg.vkuiIcon--message_outline_20) > span:before,.ProfileHeaderButton >a[href*="/im"] >span:before{content: "` +
              getLang?.("profile_send_msg") +
              `"}`;
}

export default classicButtons;