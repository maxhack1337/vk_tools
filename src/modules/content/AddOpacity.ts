import create from "./create";
import fromId from "./fromId";

const addOpacity = (sliderValueCount: number) => {
  let opacity = sliderValueCount / 100;
  if (!opacity) opacity = 100;
  let rule;
  if (document.querySelector("[scheme=vkcom_light]")) {
    rule =
      ".vkui--vkBase--light,[scheme=vkcom_light]{ --vkui--color_background_content: rgba(255, 255, 255, " +
      opacity +
      ")!important;} :is( .VKCOMMessenger__integrationRoot .MEAppConfig, .VKCOMMessenger__integrationRoot.MEAppConfig ).MEAppConfig__withoutBubbles.MEAppConfig__withoutBubbles{--convoHistoryBackgroundColor:rgba(255, 255, 255, " +
      opacity +
      ")!important;} .ConvoMain__rightPanelContainer,.MEApp{background-color:rgba(237,238,240," +
      opacity +
      ")!important;} .TopNavBtn .TopNavBtn__notifyCount{border:2px solid rgb(255,255,255)!important;} .UnreadCounter.UnreadCounter--muted{color:rgb(255,255,255)!important}";

  } else {
    rule =
      ".vkui--vkBase--dark,[scheme=vkcom_dark]{ --vkui--color_background_content: rgba(34, 34, 34, " +
      opacity +
      ")!important;} :is( .VKCOMMessenger__integrationRoot .MEAppConfig, .VKCOMMessenger__integrationRoot.MEAppConfig ).MEAppConfig__withoutBubbles.MEAppConfig__withoutBubbles{--convoHistoryBackgroundColor:rgba(34, 34, 34, " +
      opacity +
      ")!important;} .ConvoMain__rightPanelContainer,.MEApp{background-color:rgba(20,20,20," +
      opacity +
      ")!important; .TopNavBtn .TopNavBtn__notifyCount{border:2px solid rgb(25,25,26)!important;}} .UnreadCounter.UnreadCounter--muted{color:rgb(25,25,26)!important}";
    }
  const existingStyle = fromId("custom-opacity-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  const styleElement = create(
    "style",
    {},
    { id: "custom-opacity-style", innerHTML: rule, type: "text/css" }
  );
  document.head.appendChild(styleElement);
};

export default addOpacity;
