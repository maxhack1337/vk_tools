import createStyle from "../../createStyle";
import dataURItoSVG from "./dataURItoSVG";
const appendCustomIcon = (dataSVG: string, statusText: string, secondaryText: string, buttonText: string, href: string, objectId: number) => {
  const iconsContainer = document.querySelector("#owner_page_name");
  if (!iconsContainer) return;
  const svg = dataURItoSVG(dataSVG);
  if (svg) {
    svg.style.margin = "-1px 8px";
    svg.style.cursor = "pointer";
    let innerSpan = document.createElement("span");
    innerSpan.classList.add("OwnerPageName__icons");
    innerSpan.style.height = "32px";
    innerSpan.style.alignContent = "center";
    innerSpan.append(svg);
    iconsContainer.appendChild(innerSpan);
    createStyle("vkToolsImageBoxStyle", ".box_body:has(>.vkToolsImageStatus) {padding: 0}");
    svg.addEventListener("click", () => {
      window.stManager.add(["ImageStatusPopup.css"]);
      let x = new showFastBox();
      x.setOptions({
        title: !1,
        hideButtons: !0,
      });
      x.content(`
      <div class="vkToolsImageStatus" style="display: flex; flex-direction: column; align-items: center; padding: 64px 40px 40px; background-position: center 0; background-repeat: no-repeat; background-size: 100% auto; background-image: url('https://vkenhancer.ru/vktoolsstatus.png');">
      <div class="ImageStatusPopup__imageWrapper ImageStatusPopup__imageWrapper--custom" style="display: flex; justify-content: center;">
        <img class="ImageStatusPopup__image" src="${dataSVG}" draggable="false">
      </div>
      <div class="ImageStatusPopup__title">${statusText}</div>
      <div class="ImageStatusPopup__description">${secondaryText}</div>
      <div class="ImageStatusPopup__buttons">
        <div class="ImageStatusPopup__button">
          <a class="FlatButton FlatButton--primary FlatButton--size-m FlatButton--wide" draggable="false" href="${href}" target="_blank">
            <span class="FlatButton__in">
              <span class="FlatButton__content">${buttonText}</span>
            </span>
          </a>
        </div>
      </div>
    <div class="ImageStatusPopup__closeButton box_x_button" onclick="curBox() &amp;&amp; curBox().hide()" role="button">
      <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M4.72 4.72c.3-.3.77-.3 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
    </div>
    </div>`);
    });
  }
};
export default appendCustomIcon;
