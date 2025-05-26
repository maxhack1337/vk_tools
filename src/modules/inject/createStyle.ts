import fromId from "../content/fromId";
import create from "./create";

const createStyle = (idStyle: string, innerHTMLStyle: string) => {
  let styleElement = fromId(idStyle);
  if (!styleElement) {
    styleElement = create("style", {}, { id: idStyle });
    document.head.appendChild(styleElement);
  }
  styleElement.innerHTML = innerHTMLStyle;
};

export default createStyle;
