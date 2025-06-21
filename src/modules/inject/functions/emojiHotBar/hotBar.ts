import hotBarAppear from "./hotBarAppear";

/*
 * Пиши мне если сломается, хотя тут простенькая логика
 */

const hotBar = () => {
  document.arrive(".ConvoComposer__inputWrapper", { existing: true }, function (e) {
    const container = document.querySelector(".ConvoMain__composer");
    if (container && document.getElementById("vkenhancerEmojiHotbarID")) {
      const emojiHotbar = document.getElementById("vkenhancerEmojiHotbarID");
      const lastDiv = container.lastElementChild;
      if (lastDiv && lastDiv !== emojiHotbar && emojiHotbar) {
        container.removeChild(emojiHotbar);
        container.appendChild(emojiHotbar);
      }
    }
    hotBarAppear(globalThis.HotBarAppearVAL);
  });
  document.arrive(".ConvoMain__composer .ComposerSelecting", { existing: true }, function (e) {
    const container = document.querySelector(".ConvoMain__composer");
    if (container && document.getElementById("vkenhancerEmojiHotbarID")) {
      const emojiHotbar = document.getElementById("vkenhancerEmojiHotbarID");
      const lastDiv = container.lastElementChild;
      if (lastDiv && lastDiv !== emojiHotbar && emojiHotbar) {
        container.removeChild(emojiHotbar);
        container.appendChild(emojiHotbar);
      }
    }
  });
};

export default hotBar;
