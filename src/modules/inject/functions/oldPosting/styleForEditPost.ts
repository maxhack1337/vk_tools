import fromId from "../../../content/fromId";

const styleForEditPost = () => {
	let styleElement = fromId("wpeOld");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "wpeOld";
      document.head.appendChild(styleElement);
    }
	styleElement.innerHTML = `
		.wall_module .Post--redesignV3 .wall_text:has(.wpe_text_cont) {
			padding: 8px 20px 20px!important;
		}
	`;
}

export default styleForEditPost;