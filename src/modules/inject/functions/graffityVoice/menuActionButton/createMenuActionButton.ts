const createMenuActionButton = ({
  iconSvgElement,
  title,
  buttonClass,
}: {
  iconSvgElement: string; // SVG пути <path>...<path>
  title: string;
  buttonClass: string;
}): HTMLAnchorElement => {
  const anchor = document.createElement("a");
  anchor.style.textDecoration = "none";

  const button = document.createElement("button");
  button.classList.add("ActionsMenuAction", "ActionsMenuAction--secondary", "ActionsMenuAction--size-regular", buttonClass);

  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("aria-hidden", "true");
  svgElement.setAttribute("display", "block");
  svgElement.classList.add("vkuiIcon", "vkuiIcon--20", "vkuiIcon--w-20", "vkuiIcon--h-20", "vkuiIcon--money_transfer_outline_20");
  svgElement.setAttribute("viewBox", "0 0 20 20");
  svgElement.setAttribute("width", "20");
  svgElement.setAttribute("height", "20");
  svgElement.style.width = "20px";
  svgElement.style.height = "20px";

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
