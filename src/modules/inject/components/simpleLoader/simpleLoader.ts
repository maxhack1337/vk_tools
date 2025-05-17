export function appearSimpleLoader(): void {
  if (document.querySelector(".vkToolsLoaderWrap")) return;

  const wrap = document.createElement("div");
  wrap.id = "box_layer_wrap";
  wrap.classList.add("scroll_fix_wrap", "fixed", "vkToolsLoaderWrap");
  wrap.style.display = "block";

  const boxLayer = document.createElement("div");
  boxLayer.id = "box_layer";
  boxLayer.style.width = "100%";
  boxLayer.style.height = "100%";
  boxLayer.style.padding = "0";
  boxLayer.style.display = "flex";
  boxLayer.style.alignItems = "center";
  boxLayer.style.justifyContent = "center";

  const boxLoader = document.createElement("div");
  boxLoader.id = "box_loader";
  boxLoader.style.display = "block";

  const spinnerHost = document.createElement("div");
  spinnerHost.classList.add("vkuiScreenSpinner__host", "vkuiScreenSpinner__modeOverlay", "vkuiRootComponent__host");

  const iconSlot = document.createElement("div");
  iconSlot.classList.add("vkuiScreenSpinner__iconSlot");

  const spinnerSpan = document.createElement("span");
  spinnerSpan.classList.add("vkuiScreenSpinner__spinner", "vkuiScreenSpinner__spinnerTransition", "vkuiSpinner__host", "vkuiSpinner__noColor", "vkuiRootComponent__host");
  spinnerSpan.setAttribute("role", "status");

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("display", "block");
  svg.classList.add("vkuiIcon", "vkuiIcon--44", "vkuiIcon--w-44", "vkuiIcon--h-44", "vkuiIcon--spinner_44");
  svg.setAttribute("width", "44");
  svg.setAttribute("height", "44");
  svg.setAttribute("viewBox", "0 0 44 44");
  svg.style.width = "44px";
  svg.style.height = "44px";

  svg.innerHTML = `
    <use xlink:href="#spinner_44" style="fill: currentcolor;">
      <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 22 22" to="360 22 22" dur="0.7s" repeatCount="indefinite"></animateTransform>
    </use>
  `;

  const visuallyHiddenSpan = document.createElement("span");
  visuallyHiddenSpan.classList.add("vkuiVisuallyHidden__host", "vkuiRootComponent__host");
  visuallyHiddenSpan.textContent = "Загружается...";

  spinnerSpan.appendChild(svg);
  spinnerSpan.appendChild(visuallyHiddenSpan);
  iconSlot.appendChild(spinnerSpan);
  spinnerHost.appendChild(iconSlot);
  boxLoader.appendChild(spinnerHost);
  boxLayer.appendChild(boxLoader);
  wrap.appendChild(boxLayer);

  document.body.appendChild(wrap);
}

export function removeSimpleLoader(): void {
  const loader = document.querySelector(".vkToolsLoaderWrap");
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}
