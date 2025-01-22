const oldStoryBlockStyle = () => {
return `
	    [class^="StoryBlock__noIslandsContainer"] {
        background-color:var(--vkui--color_background_content);
        border-radius:var(--vkui--size_border_radius_paper--regular);
        box-shadow:var(--page-block-shadow);
        padding:16px;
    }
    [class^="StoryBlock__noIslandsContainer"]:before {
        content: "`+getLang?.('reports_strikes_object_story')+`";
        font-family:var(--vk-sans-display,inherit,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai");
        font-size: 17px;
        line-height: 22px;
        font-weight: 600;
    }
    [class^="StoryBlock__noIslandsContainer"] [class^="vkitGrid__root"][class*="vkitGrid__rootHasHorizontalScroll"] {
        margin-top: 12px;
    }
    
    [class^="StoryBlock__noIslandsContainer"] button.vkuiIconButton:has(svg.vkuiIcon--gear_outline_20) {
        opacity:1!important;
        background-color:transparent;
        display:none;
    }
	[class^="StoryBlock__noIslandsContainer"]:hover {
		.vkEnhancerOldStorySettingsButton {
			opacity: 1!important;
		}
	}
	.vkEnhancerOldStorySettingsButton:hover {
		text-decoration:underline;
	}
	`
}

export default oldStoryBlockStyle;