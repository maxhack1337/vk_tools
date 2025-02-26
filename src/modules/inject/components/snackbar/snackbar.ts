import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import renderToString from "./renderToString";
import { getIcon24CheckCircleOutline } from "../icons/getIcon24CheckCircleOutline";
import { getIcon24ClockOutline } from "../icons/getIcon24ClockOutline";
import { getIcon24ErrorCircleOutline } from "../icons/getIcon24ErrorCircleOutline";
import { getIcon24WarningTriangleOutline } from "../icons/getIcon24WarningTriangleOutline";
import { getIcon28CheckCircleOutline } from "../icons/getIcon28CheckCircleOutline";
import { getIcon28LoudspeakerSlashOutline } from "../icons/getIcon28LoudspeakerSlashOutline";
import { getIcon24VkTools } from "../icons/getIcon24VkTools";
import { getIcon28VkTools } from "../icons/getIcon28VkTools";
import { getIcon28SpinnerAnimated } from "../icons/getIcon28SpinnerAnimated";
import { getIcon24SpinnerAnimated } from "../icons/getIcon24SpinnerAnimated";

const snackbarTypeIconMap: { [key: string]: string } = {
    ok: getIcon24CheckCircleOutline().icon,
    warning: getIcon24WarningTriangleOutline().icon,
    error: getIcon24ErrorCircleOutline().icon,
    clock: getIcon24ClockOutline().icon,
    ok28: getIcon28CheckCircleOutline().icon,
    loudspeaker28: getIcon28LoudspeakerSlashOutline().icon,
    vktools: getIcon24VkTools().icon,
    vktools28: getIcon28VkTools().icon,
    spinner: getIcon24SpinnerAnimated().icon,
    spinner28: getIcon28SpinnerAnimated().icon
};

const snackbarAlignModifiersMap: { [key: string]: string } = {
    top: 'notifier_snackbar_align_top',
    center: 'notifier_snackbar_align_center',
    bottom: 'notifier_snackbar_align_bottom'
};

const snackbarTypeModifiersMap: { [key: string]: string } = {
    ok: 'notifier_snackbar_type_ok',
    warning: 'notifier_snackbar_type_warning',
    error: 'notifier_snackbar_type_error',
    ok28: 'notifier_snackbar_type_ok',
    loudspeaker28: 'notifier_snackbar_type_loudspeaker',
    clock: 'notifier_snackbar_type_clock',
    vktools: 'notifier_snackbar_type_clock',
    vktools28: 'notifier_snackbar_type_clock',
    spinner: 'notifier_snackbar_type_clock',
    spinner28: 'notifier_snackbar_type_clock'
};

interface Snackbar {
    text: string;
    subtitle?: string;
    action?: {
        href: string;
        label: string;
    };
    after?: any;
    link?: string;
    timeout: number;
    align?: keyof typeof snackbarAlignModifiersMap;
    onClick?: string;
    onClose?: any;
    icon: keyof typeof snackbarTypeIconMap;
}

const showSnackbar = async ({ text, subtitle, action, after, link, timeout, align, onClick, onClose, icon }: Snackbar) => {
    const message = renderToString(_jsxs(_Fragment, {
        children: [
            _jsx("div", {
                className: "notifier_snackbar_text",
                children: text
            }),
            subtitle && _jsx("div", {
                className: "notifier_snackbar_subtitle",
                children: subtitle
            }),
            action && _jsx("div", {
                children: _jsx("a", {
                    className: "notifier_snackbar_action",
                    href: action.href,
                    children: action.label,
                    target: "_blank"
                })
            })
        ]
    }));

    let notifierEv = {
        version: window.curNotifier.version,
        type: "done_box",
        text: message,
        onclick: onClick,
        top_count: -1,
        video_top_count: -1,
        id: Math.floor(Math.random() * (10000000000 - 1000000000 + 1)) + 1000000000,
        timeout: timeout,
        onHide: onClose,
        preventHideByClick: true,
        link: link,
        tooltipHandler: (baloonWrapEl: Element) => {
        baloonWrapEl.classList.add('notifier_snackbar');
        if (icon && snackbarTypeIconMap[icon]) {
            baloonWrapEl.classList.add('notifier_snackbar_with_custom_before');
            baloonWrapEl.classList.add(snackbarTypeModifiersMap[icon]);
        } 
        if (after?.rounded ?? true) {
            baloonWrapEl.classList.add('notifier_snackbar_with_rounded_after');
        }
        const alignmentClass = align ? snackbarAlignModifiersMap[align] : undefined;
        if (alignmentClass) {
            baloonWrapEl.classList.add(alignmentClass);
        }
        if (onClick) {
            const actionEl = baloonWrapEl.querySelector('.notifier_snackbar_action');
            actionEl?.setAttribute('click',onClick)
        }
    },
        avatar_custom_content: icon && snackbarTypeIconMap[icon] ? snackbarTypeIconMap[icon] : '' 
    };

    Notifier.pushEvent(notifierEv);
};

export default showSnackbar;
