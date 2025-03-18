const innerNoticeStyle = () => {
    return `
    .AudioLegalNoticeIcon__root svg,
    .audio_row__legal_notice_icon svg,
    [class*="vkitAudioPlayerAudioInfo__titleNoticeIcon--"] svg,
    [class*="vkitAudioRow__rootHasHover--"] svg[class*="--error_circle_fill_gray_12"],
    [class*="vkitSecondaryAttachment__titleIcon--"] svg[class*="--error_circle_fill_gray_12"],
    [class*="vkitPrimaryAttachmentAudio__titleIcon--"] svg[class*="--error_circle_fill_gray_12"],
    .OwnerContentTabAudiosItem__legalNotice svg {
        width: 11px !important;
        height: 11px !important;
        -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="11" viewBox="0 0 11 11" width="11"><path d="m1 2.506v5.988a1.5 1.5 0 0 0 1.491 1.506h6.019c.827 0 1.49-.674 1.49-1.506v-5.988a1.5 1.5 0 0 0 -1.491-1.506h-6.019c-.827 0-1.49.674-1.49 1.506zm4 2.494v-1h2v-1h-3v5h3v-1h-2v-1h2v-1zm-5-2.494a2.496 2.496 0 0 1 2.491-2.506h6.019a2.5 2.5 0 0 1 2.49 2.506v5.988a2.496 2.496 0 0 1 -2.491 2.506h-6.019a2.5 2.5 0 0 1 -2.49-2.506z" fill="currentColor" fill-opacity=".7"/></svg>') no-repeat center;
        background-color: var(--vkui--color_icon_secondary);
        pointer-events: none;
    }

    .AudioLegalNoticeIcon__root svg use,
    .audio_row__legal_notice_icon svg use,
    [class*="vkitAudioPlayerAudioInfo__titleNoticeIcon--"] svg use,
    [class*="vkitAudioRow__rootHasHover--"] svg[class*="--error_circle_fill_gray_12"] use,
    .OwnerContentTabAudiosItem__legalNotice svg use,
    [class*="vkitPrimaryAttachmentAudio__titleIcon--"] svg[class*="--error_circle_fill_gray_12"] use,
    [class*="vkitSecondaryAttachment__titleIcon--"] svg[class*="--error_circle_fill_gray_12"] use {
        display: none
    }

    .audio_row .audio_row__title {
        display: flex;
        gap: 3px
    }

    .audio_row .audio_row__title_inner_icon {
        order: 3
    }

    .audio_row .audio_row__title_inner,
    .audio_row .audio_row__title_inner_subtitle {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    `;
}

export default innerNoticeStyle;