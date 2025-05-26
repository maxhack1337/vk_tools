import createStyle from "../../createStyle";
import { getIconFloatingArrow } from "../icons/getIconFloatingArrow";
import toolTipStyle from "./toolTipStyle";

type ToolTip = {
  style: string;
  elem: HTMLElement;
  text?: string;
  innerHTML?: string;
};

const tooltip = ({ style, elem, text, innerHTML }: ToolTip) => {
  createStyle("vkToolsTooltip", toolTipStyle());
  let tooltipBase = document.createElement("div");
  tooltipBase.classList.add("vkToolsTooltipBase");
  switch (style) {
    case "accent":
      tooltipBase.classList.add("vkToolsTooltipAccent");
      break;
    case "white":
      tooltipBase.classList.add("vkToolsTooltipWhite");
      break;
    case "black":
      tooltipBase.classList.add("vkToolsTooltipBlack");
      break;
    case "inversion":
      tooltipBase.classList.add("vkToolsTooltipInversion");
      break;
    default:
      break;
  }

  let floatingArrow = document.createElement("div");
  floatingArrow.classList.add("vkToolsFloatingArrow");
  floatingArrow.innerHTML = getIconFloatingArrow().icon;

  let tooltipBaseContent = document.createElement("div");
  tooltipBaseContent.classList.add("vkToolsTooltipBaseContent");

  let tooltipSubhead = document.createElement("span");
  tooltipSubhead.classList.add("vkToolsTooltipSubhead");
  if (text) tooltipSubhead.textContent = text;
  if (innerHTML) tooltipSubhead.innerHTML = innerHTML;

  tooltipBaseContent.append(tooltipSubhead);
  tooltipBase.append(floatingArrow, tooltipBaseContent);
  document.body.prepend(tooltipBase);

  const elemRect = elem.getBoundingClientRect();
  const tooltipRect = tooltipBase.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  let elBox = elem.closest("#box_layer_wrap");
  const scrollTop = elBox ? 0 : 0;

  let top = Math.max(60, elemRect.top + elemRect.height + tooltipRect.height / 2 / 2);
  let left = elemRect.left + elemRect.width / 2 - tooltipRect.width / 2;

  if (top + tooltipRect.height > viewportHeight) {
    top = viewportHeight - tooltipRect.height * 2.5;
    floatingArrow.style.bottom = "-9px";
    floatingArrow.style.transform = "rotate(180deg)";
  }

  tooltipBase.style.cssText = `
        position: fixed;
        top: ${top - scrollTop}px;
        left: ${left}px;
        pointer-events: none;
        z-index: 1100;
    `;

  let arrowLeft = tooltipSubhead.getBoundingClientRect().width / 2;
  floatingArrow.style.left = `${arrowLeft}px`;

  window.addEventListener("scroll", () => {
    const elemRect = elem.getBoundingClientRect();
    const tooltipRect = tooltipBase.getBoundingClientRect();

    let top = Math.max(60, elemRect.top + elemRect.height + tooltipRect.height / 2);
    let left = elemRect.left + elemRect.width / 2 - tooltipRect.width / 2;

    if (top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - tooltipRect.height * 2;
      floatingArrow.style.bottom = "-9px";
      floatingArrow.style.transform = "rotate(180deg)";
    } else {
      floatingArrow.style.bottom = "";
      floatingArrow.style.transform = "";
    }

    tooltipBase.style.top = `${top}px`;
    tooltipBase.style.left = `${left}px`;
  });

  return tooltipBase;
};

export default tooltip;
