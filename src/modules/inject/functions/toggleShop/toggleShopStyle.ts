const toggleShopStyle = () => {
  return `
        .toggleShop {
            padding: 16px;
        }

        .toggleShopHeader {
            display: flex;
            justify-content: space-between;
            padding: 0 8px 14px;
            border-bottom: 1px solid var(--vkui--color_separator_primary_alpha);
        }

        .toggleShopHead {
            font-size: 16px;
            color: var(--vkui--color_text_primary);
            line-height: 20px;
            display: flex;
            align-items: center;
        }

        .toggleShopSubhead {
            color: var(--vkui--color_text_secondary);
            font-size: 13px;
            font-weight: 500;
            text-transform: uppercase;
            padding-top: 12px;
            margin-left: 8px;
        }

        .toggleShopToggles__host {
            display: inline-grid;
            grid-template-columns: calc(50% - 4px) calc(50% - 4px);
            gap: 8px;
            margin-top: 12px;
            max-width: 100%;
            width: 100%;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--vkui--color_separator_primary_alpha);
        }

        .toggleShopAlert__text {
            padding-left: 8px;
        }

        .toggleShopAlert {
            display: flex;
            align-items: center;
            padding: 12px 8px;
            border-bottom: 1px solid var(--vkui--color_separator_primary_alpha);
        }

        .toggleShopAlertButton {
            height: 24px;
            width: 24px;
        }

        .toggleShopAddRuleButton {
            text-decoration: none!important;
            border-radius: 8px;
            padding: 8px;
            background-color: var(--vkui--color_background_accent_themed);
            color: var(--vkui--color_text_contrast_themed);
            font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Geneva, "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Cherokee", "Noto Sans Devanagari", "Noto Sans Ethiopic", "Noto Sans Georgian", "Noto Sans Hebrew", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Osmanya", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", arial, Tahoma, verdana, sans-serif;
            font-size: 14px;
            font-weight: 500;
        }

        .toggleShopCell__host {
            display: flex;
            align-items: center;
            padding: 8px;
            justify-content: space-between;
            border-radius: 8px;
            cursor: pointer;
        }

        .toggleShopCell__host:hover {
            background-color: var(--vkui--color_transparent--hover);
        }

        .toggleShopCell__content {
            color: var(--vkui--color_text_secondary);
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }

        .toggleShopCell__after {
            color: var(--vkui--color_icon_secondary);
        }
    `;
};
export default toggleShopStyle;
