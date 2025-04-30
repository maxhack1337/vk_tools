import postingEmojiHint from "./postingEmojiHint";

const createEmojiSmileWrap = () => {
  const emojiWrap = document.createElement("div");
  emojiWrap.classList.add("emoji_smile_wrap", "_emoji_wrap");

  const emojiButton = document.createElement("div");
  emojiButton.classList.add("emoji_smile", "_emoji_btn");
  emojiButton.role = "button";
  emojiButton.title = postingEmojiHint(vk.lang) || "Используйте TAB, чтобы быстрее открывать смайлы";
  emojiButton.setAttribute("onmouseenter", "return Emoji.show(this, event);");
  emojiButton.setAttribute("onmouseleave", "return Emoji.hide(this, event);");
  emojiButton.setAttribute("onclick", "return cancelEvent(event);");
  emojiButton.setAttribute("aria-label", "Add emoji or sticker");

  const emojiIcon = document.createElement("div");
  emojiIcon.classList.add("emoji_smile_icon_inline_svg", "emoji_smile_icon");

  const emojiSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  emojiSvg.classList.add("vkuiIcon", "vkuiIcon--24", "vkuiIcon--w-24", "vkuiIcon--h-24", "vkuiIcon--smile_outline_24");
  emojiSvg.style.width = "24px";
  emojiSvg.style.height = "24px";
  emojiSvg.setAttribute("width", "24");
  emojiSvg.setAttribute("height", "24");
  emojiSvg.setAttribute("viewBox", "0 0 24 24");
  emojiSvg.setAttribute("fill", "currentColor");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute(
    "d",
    "M8.438 14.297a.9.9 0 0 1 1.259.133c.013.016.196.223.53.432.383.24.97.488 1.773.488a3.3 3.3 0 0 0 1.773-.488c.191-.12.382-.26.53-.432a.9.9 0 0 1 1.4 1.132 4 4 0 0 1-.976.826A5.1 5.1 0 0 1 12 17.15a5.1 5.1 0 0 1-2.727-.762 4 4 0 0 1-.976-.826.9.9 0 0 1 .14-1.265Zm1.812-4.047a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5m-3-9.4c-5.468 0-9.9 4.432-9.9 9.9s4.432 9.9 9.9 9.9 9.9-4.432 9.9-9.9-4.432-9.9-9.9-9.9M3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0"
  );
  path.setAttribute("clip-rule", "evenodd");

  emojiSvg.appendChild(path);

  emojiIcon.appendChild(emojiSvg);
  emojiButton.appendChild(emojiIcon);
  emojiWrap.appendChild(emojiButton);

  return emojiWrap;
};

export default createEmojiSmileWrap;
