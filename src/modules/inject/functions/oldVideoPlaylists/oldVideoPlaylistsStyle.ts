const oldVideoPlaylistsStyle = () => {
  return `
    div:has(>[class*="vkitVideoCardLayout__cardHorizontal"] [href^="/playlist"]), div.vkuiList__host:has(>[class*="vkitDraggableVideoCard__card"] [href^="/playlist"]) {
        display: inline-grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100% / 3, max(254px, 100% / 5)), 1fr));
        width: fit-content;
        max-width: 100%;
    }
    [class*="vkitVideoCardLayout__cardHorizontal"]:has([href^="/playlist"]), [class*="vkitDraggableVideoCard__card"]:has([href^="/playlist"]) {
        flex-direction: column;
        max-width: 254px;
        [class^="vkitVideoCardLayout__videoContainer"][style*="width: 160px;"] {
            width: 254px!important;
        }
        [class*="vkitVideoCardInfoLayout__containerHorizontal"] {
            margin-left: 0px;
            align-items: flex-start
        }
        .vkuiCellDragger__host {
            display: none;
        }
    }

    [class*="vkitDraggableVideoCard__card"]:has([href^="/playlist"]) {
        width: 254px;
        .vkuiCell__content {
            flex-direction: column;
        }
        .vkuiSimpleCell__before {
            padding: 0;
        }
        .vkuiSimpleCell__before [class^="vkitDraggableVideoCard__videoContainer"] {
            flex: 0 0 234px!important;
            width: 234px!important;
            margin-top: 8px;
        }
    }
    [class^="vkitTwoColumnLayoutNarrow__root"]:has([class^='PlaylistInfo__container']) {
        display: none;
    }

    .VkToolsButton__actions-plist > button {
        color: var(--vkui--color_text_accent_themed)!important;
        background-color: var(--vkui--color_background_secondary_alpha)!important;
    }

    .vkToolsRichAvaVideoPlist {
        width: 32px;
        height: 32px;
    }
    `;
};

export default oldVideoPlaylistsStyle;
