import fromId from "../../../content/fromId";
import tooltip from "../../components/tooltip/tooltip";
import create from "../../create";
import hotBarRebootLang from "./hotBarRebootLang";

let rebootText = ''
if (typeof vk !== 'undefined') {
  rebootText = hotBarRebootLang(vk?.lang || 0);
} else {
  rebootText = hotBarRebootLang(0);
}


const hotBarAppear = (cHotBarValue: string[]) => {
  if (!cHotBarValue) return;
  if (cHotBarValue.includes("ВТриптакте")) {
    let styleElement = fromId("tripndrip");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "tripndrip";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = "body{filter: invert(100%);}";
  } else {
    const customStyle = fromId("tripndrip");
    if (customStyle) {
      customStyle.remove();
    }
  }
  let hotbarb = fromId("hotbarnew");
  if (!hotbarb) {
    hotbarb = document.createElement("style");
    hotbarb.id = "hotbarnew";
    document.head.appendChild(hotbarb);
  }
  hotbarb.innerHTML =
    ".ConvoMain__composer{padding-bottom:8px!important;display:flex;flex-direction: column;align-items: center;}";
  const chatInputContainer = document.getElementsByClassName(
    "ConvoMain__composer"
  );
  const existingHotbar = fromId("vkenhancerEmojiHotbarID");
  cHotBarValue = cHotBarValue.filter(function (item) {
    return item !== "" && item !== null && item !== undefined;
  });
  if (!existingHotbar && cHotBarValue.length > 0) {
    const hotbarDiv = document.createElement("div");
    hotbarDiv.className = "vkenhancerEmojiHotbar";
    hotbarDiv.id = "vkenhancerEmojiHotbarID";
    hotbarDiv.style.marginTop = "6px";
    hotbarDiv.style.marginLeft = "9px";
    hotbarDiv.style.color = "#dee1e6";
    hotbarDiv.style.textAlign = "center";
    hotbarDiv.style.width = "420px";
    for (let i = 0; i < cHotBarValue.length; i++) {
      const emoji = cHotBarValue[i];
      const matches = emoji.match(/([a-fA-F0-9]+)\(([^)]+)\)/);
      const emojiCode = matches?.[1];
      const emojiUnicode = matches?.[2];
      const emojiImgSrc = `/emoji/e/${emojiCode}.png`;
      const aElement = document.createElement("a");
      aElement.className = "emoji_id";
      aElement.style.display = "inline-block";
      aElement.style.position = "relative";
      aElement.style.padding = "5px 4px";
      aElement.style.marginRight = "1px";
      aElement.style.cursor = "pointer";
      aElement.style.zIndex = "10";
      aElement.style.transition = "0.3s background";
      aElement.setAttribute("textmoji", emojiUnicode || '');
      aElement.addEventListener("mouseover", () => {
        aElement.style.background = "var(--vkui--color_transparent--active)";
        aElement.style.borderRadius = "3px";
      });
      aElement.addEventListener("mouseout", () => {
        aElement.style.background = "none";
        aElement.style.borderRadius = "0";
      });
      aElement.addEventListener(
        "click",
        function () {
          const emojiCodeAdd = emojiCode;
          const textmoji = aElement.getAttribute("textmoji");
          const imgElement = document.createElement("img");
          imgElement.className = "Emoji @" + emojiCodeAdd;
          imgElement.src =
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
          imgElement.alt = textmoji || '';
          const divElement = document.querySelector(
            ".ComposerInput__input.ConvoComposer__input"
          );
          const divElement1 = document.querySelector(".Composer__input");
          if (divElement instanceof HTMLElement) {
            divElement.appendChild(imgElement);
            divElement.focus();
          }
          if (divElement1 instanceof HTMLElement) {
            divElement1.innerHTML += textmoji;
            divElement1.focus();
          }
        }
      );
      const imgElement = document.createElement("img");
      imgElement.className = "emoji";
      imgElement.src = emojiImgSrc;
      aElement.appendChild(imgElement);
      hotbarDiv.appendChild(aElement);
    }

    const rebootHotbar = create(
      "a",
      {
        display: "inline-block",
        position: "relative",
        padding: "5px 8px",
        marginRight: "1px",
        cursor: "pointer",
        zIndex: "10",
        transition: "0.3s background",
      },
      { className: "emoji_id" }
    );

    const imgElementReboot = create(
      "img",
      { scale: "0.75" },
      {
        className: "emoji",
        src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'%3E%3Cpath d='M1.16003 
3.04982C1.97279 2.05297 3.07324 1.33126 4.31122 0.983177C5.54919 0.635091 6.86438 0.677585 8.07732 1.10486C9.29026 1.53213 10.3419 2.32337 11.0886 3.37061C11.8354 4.41784 12.2409 5.67005 12.2499 6.95637C12.2589 8.24268 11.8708 9.50043 11.1388 10.558C10.4067 11.6156 9.36626 12.4214 8.1594 12.8656C6.95255 13.3098 5.63808 13.3706 4.39536 13.0398C3.41275 12.7783 2.49231 12.282 1.75003 11.5986' stroke='%2399A2AD' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M0.75 1V3.09723C0.75 3.23724 0.75 3.30725 0.777248 3.36072C0.801217 3.40776 0.839462 3.44601 0.886502 3.46998C0.93998 3.49723 1.00999 3.49723 1.15 3.49723H3.25' stroke='%2399A2AD' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E`,
      }
    );
    rebootHotbar.appendChild(imgElementReboot);

    hotbarDiv.appendChild(rebootHotbar);

    rebootHotbar.addEventListener("click", function () {
      fromId("vkenhancerEmojiHotbarID")?.remove();
      const tooltipElement = document.querySelector('.vkToolsTooltipBase') as HTMLElement;
      tooltipElement?.remove();
      hotBarAppear(globalThis.HotBarAppearVAL);
      return;
    });

    try {
      chatInputContainer[0].appendChild(hotbarDiv);

      rebootHotbar.addEventListener("mouseenter", () => {
        const tooltipText = rebootText;
        const tooltipElement = tooltip({
          style: 'black',
          elem: rebootHotbar,
          text: tooltipText,
        });
        document.body.appendChild(tooltipElement);
        rebootHotbar.style.background = "var(--vkui--color_transparent--active)";
        rebootHotbar.style.borderRadius = "3px";
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
        tooltipElement.style.visibility = "visible";
        setTimeout(() => {
          tooltipElement.style.transform = "scale(1)";
          tooltipElement.style.opacity = "1";
        }, 10);
      });

      rebootHotbar.addEventListener("mouseleave", () => {
        rebootHotbar.style.background = "none";
        rebootHotbar.style.borderRadius = "0";
        const tooltipElement = document.querySelector('.vkToolsTooltipBase') as HTMLElement;
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
        setTimeout(() => {
          if (document.querySelector('.vkToolsTooltipBase')) {
            document.querySelector('.vkToolsTooltipBase')?.remove();
          }
        }, 100);
      });
    } catch (error) { }
  }
}


export default hotBarAppear;
