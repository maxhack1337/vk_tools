import createSVG from "./createSVG";
import createTooltipText from "./createTooltipText";

const appendIcons = (roles: string[]) => {
  const iconsContainer = document.querySelector(".OwnerPageName__icons");
  if (!iconsContainer) return;

  const svg = createSVG();
  const tooltipText = createTooltipText(roles);

  const tooltip = document.createElement("div");
  tooltip.style.opacity = "0";
  tooltip.style.pointerEvents = "none";
  tooltip.style.position = "absolute";
  tooltip.style.transition = "opacity 0.3s ease";
  tooltip.style.zIndex = "999999";
  tooltip.appendChild(tooltipText);

  svg.addEventListener("mouseenter", function () {
    tooltip.style.opacity = "1";
  });

  svg.addEventListener("mouseleave", function () {
    tooltip.style.opacity = "0";
  });

  iconsContainer.appendChild(svg);
  iconsContainer.appendChild(tooltip);
}

export default appendIcons;