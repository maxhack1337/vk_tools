import createStyle from "../../createStyle";
import removeStyle from "../../removeStyle";
import { innerStyleLoad } from "./innerStyleLoad";

export function showLoadingOverlay(duration: number): void {
  createStyle("innerStyleLoad", innerStyleLoad());

  const overlay = document.createElement("div");
  overlay.classList.add("loadingOverlay");
  overlay.id = "loadingOverlay";

  const spinner = document.createElement("img");
  spinner.classList.add("spinner");
  spinner.src = "https://vkenhancer.ru/vktools%20final.gif";
  overlay.appendChild(spinner);

  document.body.appendChild(overlay);
  document.body.classList.add("loading");
  requestAnimationFrame(() => {
    overlay.classList.add("loadingOverlay--visible");
  });

  setTimeout(() => {
    hideLoadingOverlay();
  }, duration);
}

export function hideLoadingOverlay(): void {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.classList.remove("loadingOverlay--visible");
    overlay.addEventListener(
      "transitionend",
      () => {
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
          removeStyle("innerStyleLoad");
          document.body.classList.remove("loading");
        }
      },
      { once: true }
    );
  } else {
    document.body.classList.remove("loading");
    removeStyle("innerStyleLoad");
  }
}
