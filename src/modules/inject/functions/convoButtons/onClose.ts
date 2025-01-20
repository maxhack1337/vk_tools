import fromId from "../../../content/fromId";

const onClose = () => {
  let customStyle = fromId("vkenOnline");
  if (customStyle) {
    customStyle.remove();
  }
  let mainGrafBox = document.querySelector(".vkEnhancerOnlineMainBox");
  mainGrafBox?.remove();
}

export default onClose;