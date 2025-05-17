const graffityBoxStyle = () => {
  return `.vkEnhancerRemoveGraffityButton {
    position: relative;
    height: 0px !important;
    width: 0px !important;
    color: white;
    top: 5px;
    left: 5px;
    cursor: pointer;
}

.vkEnhancerRemoveGraffityButton svg {
    cusros: pointer;
    background: var(--vkui--color_overlay_primary);
    border-radius: 100%;
    padding: 3px;
}

.vkEnhancerRemoveGraffityButton svg:hover {
    background: var(--vkui--color_overlay_primary--hover);
}

.vkEnhancerGraffitiList {
    padding: 8px;
}

.vkEnhancerModalPageHeader {
    background-color: var(--vkui--color_background_tertiary) !important;
    border-radius: 8px 8px 0 0 !important;
}

.vkEnhancerSeparator {
    display: none !important;
}

.vkEnhancerModalPage__header {
    border-bottom: 1px solid var(--vkui--color_separator_primary) !important;
}

.vkEnhancerPanelHeader__in {
    justify-content: flex-start !important;
}

.vkEnhancerPanelHeader__content-in {
    font-family: var(--palette-vk-font, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif) !important;
    padding-left: 12px !important;
    font-size: 14px !important;
    color: var(--vkui--color_text_primary) !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    font-weight: 400 !important;
}

.vkEnhancerTappable {
    background: var(--vkui--color_background_secondary) !important;
    border-radius: 0px !important;
    --vkui_internal--icon_color: var(--vkui--color_text_link) !important;
    color: var(--vkui--color_text_link) !important;
}

.vkEnhancerTappable:hover {
    background: var(--vkui--color_background_secondary_alpha) !important;
}

.vkEnhancerDiv {
    padding: 0 !important;
}

div:has(>.vkEnhancerModalPage__in-wrap) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    inline-size: 100%;
    block-size: 100%;
    overflow: hidden;
    position: absolute;
    box-sizing: border-box;
}

.vkEnhancerModalPage__in-wrap {
    font-family: var(--vkui--font_family_base);
    max-inline-size: var(--vkui--size_popup_medium--regular);
    position: relative;
    align-items: initial;
    margin-block: 32px;
    margin-inline: 56px;
    block-size: auto;
    max-block-size: 640px;
    opacity: 0;
    transform: none;
    transition: opacity 340ms var(--vkui--animation_easing_platform);
    inline-size: 100%;
    inset-inline: 0;
    inset-block-end: 0;
    display: flex;
}

.vkEnhancerModalPage__in {
    block-size: auto;
    box-shadow: var(--vkui--elevation3);
    border-end-end-radius: var(--vkui--size_border_radius_paper--regular);
    border-end-start-radius: var(--vkui--size_border_radius_paper--regular);
}

.vkEnhancerModalPage__in {
    background-color: var(--vkui--color_background_modal);
    overflow: visible;
    position: relative;
    box-sizing: border-box;
    inline-size: 100%;
    display: flex;
    flex-direction: column;
    border-start-end-radius: var(--vkui--size_border_radius_paper--regular);
    border-start-start-radius: var(--vkui--size_border_radius_paper--regular);
    --vkui_internal--background: var(--vkui--color_background_modal);
}

.vkEnhancerModalPage__header {
    inline-size: 100%;
}

.vkEnhancerModalPageHeader {
    padding-inline: 8px;
    --vkui_internal--safe_area_inset_top: 0;
}

.vkEnhancerPanelHeader {
    position: relative;
}

.vkEnhancerPanelHeader__in {
    display: flex;
    justify-content: center;
}

.vkEnhancerPanelHeader__content {
    text-align: center;
    opacity: 1;
    transition: opacity .3s var(--vkui--animation_easing_platform);
}

.vkEnhancerPanelHeader__content-in {
    font-size: 18px;
    color: var(--vkui--color_text_primary);
    font-weight: 500;
    font-family: var(--vkui--font_family_accent);
    user-select: none;
}

.vkEnhancerSeparator {
    color: var(--vkui--color_separator_primary);
}

.vkEnhancerSeparator__in {
    block-size: var(--vkui--size_border--regular);
    margin: 0;
    background: currentColor;
    color: inherit;
    border: 0;
    transform-origin: center top;
}

.vkEnhancerModalPage__content-wrap {
    position: relative;
    display: flex;
    block-size: 100%;
    flex-direction: column;
    overflow: hidden;
    border-end-start-radius: inherit;
    border-end-end-radius: inherit;
}

.vkEnhancerModalPage__content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    block-size: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
}

.vkEnhancerModalPage__content-in {
    block-size: 100%;
}

.vkEnhancerDiv {
    padding-block: var(--vkui--size_base_padding_vertical--regular);
    padding-inline: var(--vkui--size_base_padding_horizontal--regular);
}

.vkEnhancerSpacing {
    position: relative;
    box-sizing: border-box;
}

.vkEnhancerTappable {
    min-height: 22px;
    --vkui_internal--icon_color: var(--vkui--color_icon_accent);
    color: var(--vkui--color_text_accent);
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    border: 0;
    inline-size: 100%;
    background: rgba(0, 0, 0, 0);
    padding-block: 0;
    min-block-size: 44px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding-inline: var(--vkui--size_base_padding_horizontal--regular);
    isolation: isolate;
    position: relative;
    border-radius: var(--vkui--size_border_radius--regular);
    cursor: pointer;
    --vkui_internal--outline_width: 2px;
    transition: background-color .15s ease-out;
}

.vkEnhancerSimpleCell__before {
    padding-block: 4px;
    flex-grow: initial;
    max-inline-size: initial;
    display: flex;
    align-items: center;
    padding-inline-end: 12px;
    color: var(--vkui_internal--icon_color, var(--vkui--color_icon_accent));
    position: relative;
    z-index: var(--vkui_internal--z_index_tappable_element);
}

.vkEnhancerSimpleCell__middle {
    flex-grow: initial;
    max-inline-size: initial;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-block: 10px;
    min-inline-size: 0;
    overflow: hidden;
    position: relative;
    z-index: var(--vkui_internal--z_index_tappable_element);
}

.vkEnhancerSimpleCell__content {
    justify-content: flex-start;
    display: flex;
    align-content: flex-start;
    align-items: center;
    max-inline-size: 100%;
}

.vkEnhancerTypography {
    font-weight: var(--vkui--font_weight_accent3);
    font-size: var(--vkui--font_headline1--font_size--compact);
    line-height: var(--vkui--font_headline1--line_height--compact);
    color: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    margin: 0;
    padding: 0;
}

.vkEnhancerVisuallyHidden {
    position: absolute !important;
    block-size: 1px !important;
    inline-size: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    white-space: nowrap !important;
    clip: rect(0, 0, 0, 0) !important;
    clip-path: inset(50%);
    overflow: hidden !important;
    border: 0 !important;
    opacity: 0;
}

.vkEnhancerTappable:hover {
    background-color: var(--vkui--color_transparent--hover);
}

.vkEnhancerGraffitiList {
    display: grid;
    gap: 4px;
    grid-template-columns: repeat(4, 1fr);
}

.vkEnhancerGraffitiList__item {
    height: 158px;
    width: 158px;
    align-items: center;
    background-color: var(--vkui--color_transparent--hover);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: all .15s ease;
    vertical-align: bottom;
}

.vkEnhancerGraffitiList__item:hover {
    background-color: var(--vkui--color_transparent--active);
}

.vkEnhancerGraffitiList__item--doc {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 10px;
    height: 158px;
    width: 158px;
}

.vkEnhancerCloseButton {
    position: absolute;
    justify-content: center;
    inset-block-start: 0;
    inset-inline-end: -56px;
    inline-size: 56px;
    block-size: 56px;
    padding: 18px;
    box-sizing: border-box;
    color: var(--vkui--color_icon_contrast);
    transition: opacity .15s ease-out;
    isolation: isolate;
    border-radius: var(--vkui--size_border_radius--regular);
    cursor: pointer;
    --vkui_internal--outline_width: 2px;
}

.vkEnhancerCloseButton:before {
    display: block;
    content: "";
    inset: 14px;
    background: var(--vkui--color_overlay_primary);
    border-radius: 50%;
    position: absolute;
}

.vkEnhancerCloseButton:hover:before {
    background: var(--vkui--color_overlay_primary--hover);
}

.vkEnhancerVisuallyHidden {
    position: absolute !important;
    block-size: 1px !important;
    inline-size: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    white-space: nowrap !important;
    clip: rect(0, 0, 0, 0) !important;
    clip-path: inset(50%);
    overflow: hidden !important;
    border: 0 !important;
    opacity: 0;
    z-index: var(--vkui_internal--z_index_tappable_element);
}`;
};

export default graffityBoxStyle;
