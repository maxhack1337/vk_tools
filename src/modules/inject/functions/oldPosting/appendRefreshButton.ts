import showSnackbar from "../../components/snackbar/snackbar";
import refreshButtonTextLang from "./refreshButtonTextLang";

const appendRefreshButton = () => {
  const div = document.createElement("div");
  div.classList.add("flat_button", "secondary", "vkEnhancerReloadWallBtn", "_ui_load_more_btn", "with_arrow");
  div.style.width = "100%";

  const span = document.createElement("span");
  span.classList.add("ui_load_more_btn_label");
  span.textContent = refreshButtonTextLang(vk.lang)[2];

  div.append(span);

  div.addEventListener("click", () => {
    if (typeof cur !== "undefined" && cur.options) {
      Wall.init(cur.options);
    } else {
      nav.reload();
    }
    showSnackbar({
      text: getLang?.("box_loading").toString() || "Загрузка...",
      timeout: 4000,
      icon: "spinner",
    });
  });
  return div;
};

export default appendRefreshButton;
