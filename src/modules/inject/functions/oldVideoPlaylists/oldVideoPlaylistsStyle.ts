const oldVideoPlaylistsStyle = () => {
  return `
    div:has(>[class*="vkitVideoCardLayout__cardHorizontal"] [data-testid="video_card_thumb"]), div.vkuiList__host:has(>[class*="vkitDraggableVideoCard__card"] [data-testid="video_card_thumb"]) {
        display: inline-grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100% / 3, max(254px, 100% / 7)), 1fr));
        width: fit-content;
        max-width: 100%;
    }
    [class*="vkitVideoCardLayout__cardHorizontal"]:has([data-testid="video_card_thumb"]), [class*="vkitDraggableVideoCard__card"]:has([data-testid="video_card_thumb"]) {
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

    [data-testid="edit_playlist_button"] {
        color: var(--vkui--color_text_accent_themed)!important;
        background-color: var(--vkui--color_background_secondary_alpha)!important;
        padding: 5px;
        width: 32px !important;
        height: 22px !important;
        border-radius: 8px;
    }

    [class*="vkitDraggableVideoCard__card"]:has([data-testid="video_card_thumb"]) {
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
