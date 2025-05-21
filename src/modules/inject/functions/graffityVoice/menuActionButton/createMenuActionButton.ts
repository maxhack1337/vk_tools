const createMenuActionButton = ({ iconSvgElement, title, buttonClass, viewBox, width, height }: { iconSvgElement: string; title: string; buttonClass: string; viewBox: string; width: string; height: string }): HTMLAnchorElement => {
  const anchor = document.createElement("a");
  anchor.style.textDecoration = "none";

  const button = document.createElement("button");
  button.classList.add("ActionsMenuAction", "ActionsMenuAction--secondary", "ActionsMenuAction--size-regular", buttonClass);

  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("aria-hidden", "true");
  svgElement.setAttribute("display", "block");
  svgElement.classList.add("vkuiIcon", "vkuiIcon--20", "vkuiIcon--w-20", "vkuiIcon--h-20", "vkuiIcon--money_transfer_outline_20");
  svgElement.setAttribute("viewBox", viewBox);
  svgElement.setAttribute("width", width);
  svgElement.setAttribute("height", height);
  svgElement.style.width = `${width}px`;
  svgElement.style.height = `${height}px`;

  svgElement.innerHTML = iconSvgElement;

  const iconWrapper = document.createElement("i");
  iconWrapper.classList.add("ActionsMenuAction__icon");
  iconWrapper.appendChild(svgElement);

  const span = document.createElement("span");
  span.classList.add("ActionsMenuAction__title");
  span.textContent = title;

  button.appendChild(iconWrapper);
  button.appendChild(span);
  anchor.appendChild(button);

  return anchor;
};

export default createMenuActionButton;
