import dataURItoSVG from "./dataURItoSVG";

const appendCustomIcon = (dataSVG: string) => {
  const iconsContainer = document.querySelector("#owner_page_name");
  if (!iconsContainer) return;
  const svg = dataURItoSVG(dataSVG);
    if (svg) {
        svg.style.margin = "-1px 8px";
        iconsContainer.appendChild(svg);
    }
}

export default appendCustomIcon;