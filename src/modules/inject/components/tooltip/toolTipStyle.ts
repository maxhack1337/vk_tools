const toolTipStyle=()=> {
    return `
    
    .vkToolsTooltipBase {
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        position: fixed;
        width: max-content;
        pointer-events: none;
        z-index: 1100;
    }

    .vkToolsTooltipSubhead {
        font-size: 14px;
        line-height: 18px;
        font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif;
        font-weight: 400;
    }

    .vkToolsFloatingArrowIn {
        content: "";
        display: block;
        transform: translateY(1px);
    }

    .vkToolsFloatingArrow {
        position: absolute;
        bottom: 100%;
    }

    .vkToolsTooltipBaseContent {
        background-color: var(--vkui--color_background_contrast_themed);
        border-radius: 8px;
        box-shadow: var(--vkui--elevation3);
        color: var(--vkui--color_text_primary);
        padding: 9px 12px 10px;
    }

    .vkToolsTooltipBaseArrow {
        color: var(--vkui--color_background_contrast_themed)
    }

    .vkToolsTooltipAccent {
        .vkToolsTooltipBaseContent {
            background-color: var(--vkui--color_background_accent_tint);
            color: var(--vkui--color_text_contrast);
        }

        .vkToolsTooltipBaseArrow {
            color: var(--vkui--color_background_accent_tint);
        }
    }

    .vkToolsTooltipWhite {
        .vkToolsTooltipBaseContent {
            background-color: var(--vkui--color_background_contrast);
            color: var(--vkui--color_text_primary_invariably);
        }

        .vkToolsTooltipBaseArrow {
            color: var(--vkui--color_background_contrast);
        }
    }

    .vkToolsTooltipBlack {
        .vkToolsTooltipBaseContent {
            background-color: var(--vkui--color_background_contrast_inverse);
            color: var(--vkui--color_text_contrast);
        }

        .vkToolsTooltipBaseArrow {
            color: var(--vkui--color_background_contrast_inverse);
        }
    }

    .vkToolsTooltipInversion {
        .vkToolsTooltipBaseContent {
            background-color: var(--vkui--color_background_modal_inverse);
            color: var(--vkui--color_text_contrast_themed);
        }

        .vkToolsTooltipBaseArrow {
            color: var(--vkui--color_background_modal_inverse);
        }
    }

    `
}

export default toolTipStyle;