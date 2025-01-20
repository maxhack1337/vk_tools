import getMessageProps from "../removedMessages/getMessageProps";
import getAllMessageProps from "./getAllMessageProps";

const editMessages = () => {
document.arrive(".ConvoHistory__messageBlock", { existing: true }, function (
  e
) {
  const key =
    "convoMessage" + getMessageProps(e as HTMLElement)[1] + "_" + getMessageProps(e as HTMLElement)[0];
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, e.innerHTML);
  }
  e.addEventListener("mouseover", function () {
    let buttonShowOrig = document.createElement("a");
    buttonShowOrig.style.color = "var(--vkui--color_icon_secondary)";
    buttonShowOrig.style.padding = "4px";
    buttonShowOrig.style.width = "28px";
    buttonShowOrig.style.height = "28px";
    buttonShowOrig.style.position = "relative";
    buttonShowOrig.classList.add("vkEnButtonShowOrig");
    buttonShowOrig.innerHTML = `<svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--stars_20" viewBox="0 0 20 20" width="14" height="14" style="width: 20px; height: 20px;"><path fill="currentColor" fill-rule="evenodd" d="M12.004 8.13c-.368.835-.857 1.717-1.507 2.367s-1.532 1.14-2.367 1.507c.835.367 1.717.857 2.367 1.507s1.14 1.532 1.507 2.367c.367-.835.857-1.717 1.507-2.367s1.532-1.14 2.367-1.507c-.835-.368-1.717-.857-2.367-1.507s-1.14-1.532-1.507-2.367m-.785-2.178c-.421 1.317-1.014 2.716-1.782 3.485-.769.768-2.168 1.36-3.485 1.782a21 21 0 0 1-1.162.338c-.38.1-.38.793 0 .894a27 27 0 0 1 .912.26q.124.037.25.078c1.317.421 2.716 1.014 3.485 1.782s1.36 2.168 1.782 3.485a21 21 0 0 1 .27.907l.068.255c.1.38.793.38.894 0a28 28 0 0 1 .26-.912q.037-.124.078-.25c.421-1.317 1.014-2.717 1.782-3.485s2.168-1.36 3.485-1.782a21 21 0 0 1 .907-.27l.255-.068c.38-.1.38-.793 0-.894a28 28 0 0 1-.912-.26l-.25-.078c-1.317-.421-2.717-1.014-3.485-1.782-.768-.769-1.36-2.168-1.782-3.485a21 21 0 0 1-.338-1.162c-.1-.38-.793-.38-.894 0a27 27 0 0 1-.26.912zM4.365.763a.385.385 0 0 0-.73 0l-.414 1.24a1.93 1.93 0 0 1-1.218 1.218l-1.24.414a.385.385 0 0 0 0 .73l1.24.414a1.93 1.93 0 0 1 1.218 1.218l.414 1.24a.385.385 0 0 0 .73 0l.414-1.24a1.93 1.93 0 0 1 1.218-1.218l1.24-.414a.385.385 0 0 0 0-.73l-1.24-.414a1.93 1.93 0 0 1-1.218-1.218z"></path></svg>`;
    buttonShowOrig.setAttribute(
      "onmouseover",
      "this.style.backgroundColor = `var(--vkui--color_background_secondary)`"
    );
    buttonShowOrig.setAttribute(
      "onmouseout",
      "this.style.backgroundColor = `transparent`"
    );
    let msg = e;
    if (getAllMessageProps(msg as HTMLElement)?.updatedAt) {
      if (!e.querySelector(".vkEnButtonShowOrig")) {
        try {
          e.querySelector(".MessageActionsButtonWrapper")?.prepend(
            buttonShowOrig
          );
        } catch (error) {}
      }
      let originalProps = getMessageProps(msg as HTMLElement);
      buttonShowOrig.addEventListener("click", function () {
        msg.innerHTML = localStorage.getItem(
          "convoMessage" + originalProps[1] + "_" + originalProps[0]
        ) || '';
        buttonShowOrig.textContent =
          `${getLang?.("photos_pe_apply_changes")}`.toLowerCase() + "! ​";
        buttonShowOrig.style.pointerEvents = "none";
      });
    }
  });
});
}

export default editMessages;