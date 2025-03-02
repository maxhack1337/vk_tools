const bannerStyle = () => {
    return `
    .vkToolsBannerRoot {
    padding: 8px;
}

.vkToolsOnboardingBannerRoot {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: 550px;
}

.vkToolsOnboardingBannerRoot__stretched {
    height: 100%;
    color: var(--vkui--color_text_primary);
    isolation: isolate;
}

.vkToolsOnboardingBannerIn {
    background-color: transparent;
    height: 100%;
    box-sizing: border-box;
    overflow: visible;
    border-radius: 8px;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    padding: 12px;
    position: relative;
}

.vkToolsOnboardingBannerIn:before {
    border: 0;
    border-radius: inherit;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
}

.vkToolsOnboardingBannerContent {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: stretch;
    min-width: 0;
    position: relative;
    z-index: 1;
}

.vkToolsOnboardingBannerContent__text {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
}

.vkToolsOnboardingBannerContent__textIn {
    font-weight: 600;
    font-family: 'VK Sans Display', 'VK Sans Display Faux'
}

.vkToolsOnboardingBannerActions {
    flex: 1;
    display: flex;
    align-items: flex-end;
    margin-top: 12px;
}

.vkToolsOnboardingBannerActionsWrap {
    position: relative;
    --vkui--color_background_accent_themed: var(--vkui--color_background_modal_inverse);
    --vkui--color_background_accent_themed--hover: var(--vkui--color_background_modal_inverse--hover);
    --vkui--color_background_accent_themed--active: var(--vkui--color_background_modal_inverse--active);
}

.vkToolsOnboardingBannerActionsButton {
    --vkui_internal--counter_inherit_background: var(--vkui--color_background_content);
    --vkui_internal--counter_inherit_color: var(--vkui--color_text_accent_themed);
    color: var(--vkui--color_text_contrast_themed);
    background-color: var(--vkui--color_background_accent_themed);
    border: 0;
    border-radius: 8px;
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    max-width: 100%;
    min-height: 28px;
    min-width: 80px;
    padding: 0;
    position: relative;
    transition: background-color .15s ease-out, color .15s ease-out;
    cursor: pointer;
}

.vkToolsOnboardingBannerActionsButton__in {
    font-family: 'VK Sans Display', 'VK Sans Display Faux';
    padding-right: 16px;
    padding-left: 16px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.vkToolsOnboardingBannerActionsWrap svg {
    display: inline-block;
    position: absolute;
    pointer-events: none;
}

.vkToolsOnboardingBannerAside {
    align-items: center;
    color: var(--vkui--color_icon_secondary);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    width: 28px;
}

.vkToolsOnboardingBannerAsideButton {
    justify-content: center;
    position: absolute;
    right: 2px;
    top: 2px;
    z-index: 2;
    align-items: center;
    color: var(--vkui--color_icon_secondary);
    display: flex;
    flex-flow: row nowrap;
    height: 44px;
    appearance: none;
    background: 0 0;
    border: 0;
    border-radius: 9999px;
    box-shadow: none;
    margin: 0;
    padding: 0;
    width: fit-content;
    isolation: isolate;
    user-select: none;
    -webkit-user-drag: none;
    cursor: pointer;
}

.vkToolsOnboardingBannerAsideButton:hover {
    background-color: var(--vkui--color_background_tertiary_alpha);
}
    `
}

export default bannerStyle;