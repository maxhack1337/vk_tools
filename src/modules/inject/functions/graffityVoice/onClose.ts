import fromId from "../../../content/fromId";

    const onClose = () => {
      let customStyle = fromId("vkenGraffity");
      if (customStyle) {
        customStyle.remove();
      }
      customStyle = fromId("vkenSticker");
      if (customStyle) {
        customStyle.remove();
      }
      let mainGrafBox = document.querySelector(".vkEnhancerGraffityMainBox");
      mainGrafBox?.remove();
}
    
export default onClose;