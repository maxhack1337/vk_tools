import fromId from "../../../content/fromId";
import create from "../../create";
import handleUpdatePhoto from "./handleUpdatePhoto";

const swapPhoto = () => {
document.arrive("#pv_delete", { existing: true }, async function (e) {
  let updateButton = document.createElement("div");
  updateButton.style.float = "left";
  updateButton.style.marginRight = "8px";
  updateButton.style.marginTop = "-8px";
  updateButton.innerHTML = `<div class="vkEnhancerUpdateButton">
	<a style="text-decoration: none;border-radius: 8px;padding: 8px;display: flex;background-color:rgba(255, 255, 255, 0.04);color:white" class="Button-module__root--enpNU vkuiButton vkuiButton--size-m vkuiButton--mode-vkEnhancer vkuiButton--appearance-accent vkuiButton--align-center vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible">
	<span class="vkuiButton__in"><span class="vkuiButton__content">${getLang?.(
    "global_notify_refresh"
  )}</span></span></a></div>
	<input id="photoUpdateInput" class="file" type="file" size="28" accept="image/jpeg,image/png,image/gif" multiple="" name="photo" style="visibility: hidden; position: absolute;">`;
  let styleElement = fromId("mode-vkEnhancer");
  if (!styleElement) {
    styleElement = create("style", {}, { id: "mode-vkEnhancer" });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = `.vkuiButton--mode-vkEnhancer:hover{background-color:rgba(255, 255, 255, 0.08)!important;}`;
  e.parentElement?.prepend(updateButton);

  try {
      updateButton.addEventListener("click", async function () {
          let click = e.parentElement?.querySelector("#photoUpdateInput") as HTMLElement;
          click?.click();
    });
      e.parentElement?.querySelector("#photoUpdateInput")?.addEventListener("change", function () {
          let click = e.parentElement?.querySelector("#photoUpdateInput") as HTMLInputElement;
          let files = click?.files?.length || 0;
        if (
          files > 0
        ) {
          handleUpdatePhoto();
        }
      });
  } catch (error) {}
});
}

export default swapPhoto;