import tooltip from "../../components/tooltip/tooltip";
import createSVG from "./createSVG";
import createTooltipText from "./createTooltipText";

const appendIcons = (roles: string[]) => {
  let iconsContainer = document.querySelector(".OwnerPageName__icons");
  const svgWrapper = document.createElement('span');
  svgWrapper.classList.add('vkEnhancerBadgeStaff__wrapper');
  if (!iconsContainer) {
    iconsContainer = document.createElement('div');
    iconsContainer.classList.add('OwnerPageName__icons');
    document.querySelector('.OwnerPageName')?.append(iconsContainer);
  }

  const svg = createSVG();
  const tooltipText = createTooltipText(roles);

  svgWrapper.addEventListener("mouseenter", function (e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const tooltipElement = tooltip({
          style: colorScheme?.currentIsDark ? 'black' : 'white',
          elem: svgWrapper,
          innerHTML: tooltipText,
        });
        document.body.appendChild(tooltipElement);
        tooltipElement.style.marginTop = "-20px";
        tooltipElement.style.marginLeft = "5px";
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
        tooltipElement.style.visibility = "visible";
        setTimeout(() => {
          tooltipElement.style.transform = "scale(1)";
          tooltipElement.style.opacity = "1";
        }, 10);
  });

  svgWrapper.addEventListener("mouseleave", function (e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const tooltipElement = document.querySelector('.vkToolsTooltipBase') as HTMLElement;
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
        setTimeout(() => {
          if (document.querySelector('.vkToolsTooltipBase')) {
            document.querySelector('.vkToolsTooltipBase')?.remove();
          }
        }, 100);
  });
  svgWrapper.append(svg);
  iconsContainer.appendChild(svgWrapper);
}

export default appendIcons;