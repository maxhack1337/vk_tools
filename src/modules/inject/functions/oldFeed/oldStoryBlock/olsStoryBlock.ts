import fromId from "../../../../content/fromId";
import oldStoryBlockStyle from "./oldStoryBlockStyle";

const oldStoryBlock = () => {
document.arrive('[class^="StoryBlock__noIslandsContainer"]', { existing: true }, function (e) { 
	let styleElement = fromId("storyStyleOld");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "storyStyleOld";
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = oldStoryBlockStyle();
	let superPuperSettings = document.createElement('button') as HTMLElement;
	superPuperSettings.classList.add('vkEnhancerOldStorySettingsButton');
	superPuperSettings.style.color = "var(--vkui_internal--link-color,var(--vkui--color_text_link))";
	superPuperSettings.style.background = "0 0";
	superPuperSettings.style.display = "inline";
	superPuperSettings.style.fontFamily = `-apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif`;
	superPuperSettings.style.border = '0';
	superPuperSettings.style.position = "absolute";
	superPuperSettings.style.right = "12px";
	superPuperSettings.style.opacity = '0';
	superPuperSettings.style.cursor = "pointer";
	superPuperSettings.textContent = getLang?.('stories_settings').toString() || 'Настройки';
	superPuperSettings.addEventListener('click', function() {
		window.Stories.showBlackList();
	});
	e.prepend(superPuperSettings);
});
}

export default oldStoryBlock;