import getEndStoryLang from "./getEndStoryLang";

const getOldDialogsStyle = () => {
    return `
        .vkToolsBack {
            display: flex;
            color: var(--steel_gray_400);
            align-items: center;
        }
        .ConvoMessageHeader__sentFromInfo {
            flex-direction: row!important;
        }
        .BurgerMenu__actionsMenu .ActionsMenuAction:has(.vkuiIcon--user_square_outline_20),
        .BurgerMenu__actionsMenu .ActionsMenuAction:has(.vkuiIcon--favorite_outline_20)
        {
            display: none!important;
        }
        .VKCOMMessenger__reforgedRightColumn:has(#unread[class^="vkitRightMenuItem__container"])
        {
            width: 230px !important;
            border-radius: 0px!important;
            [class^="vkitGroup__group"]:has(>[class^="vkitRightMenu__container"]) {
                border-radius:0px;
                padding:0px!important;
                border: 1px solid var(--vkui--color_separator_primary);
                [class^="vkitRightMenu__container"] {
                    padding: 6px 0;
                }
                [class^="vkitRightMenuItem__container"] {
                    border-radius:0px;
                    padding: 0 20px;
                }
        
                [class^="vkitRightMenuItem__content"] {
                    color: var(--vkui--color_text_link);
                }
        
                [class^="vkitRightMenuItem__before"] {
                    display: none;
                }
        
                [class*="vkitRightMenuItem__containerActive"] {
                    border-left-color: var(--vkui--color_accent_blue);
                    border-width: medium medium medium 2px;
                    border-style: none none none solid;
                }
        
                [class*="vkitRightMenuItem__containerActive"] [class^="vkitRightMenuItem__content"] {
                    font-weight: 500;
                    color: var(--vkui--color_text_primary);
                }
            }
        }
    [class^="vkitGroup__group"]:has(>[class^="vkitRightMenu__container"]):before {
        display: none;
    }
    body:has(.VKCOMMessenger__reforgedRightColumn) {
        .ConvoHeader__infoContainer {
            flex-flow: column;
            align-items: center;
        }
        .ConvoHeader__status {
            padding-left: 0px;
        }
        header#page_header {
            width: 970px;
        }
        div#page_layout {
            left: 50px;
        }
    }

    .vkui__root:has(.VKCOMMessenger__skeletonWrapper) {
        display: none;
    }

    .VKCOMMessenger__reforgedRoot {
        border-radius:0px!important;
        box-shadow:0 1px 0 0 var(--vkui--color_separator_primary), 0 0 0 1px var(--vkui--color_separator_primary)!important;
        .ConvoListItem:not(.ConvoListItem--selected)::after {
            content: '';
            border-bottom: 1px solid var(--vkui--color_separator_primary);
            margin-left: 60px;
            width: 800%
        }
        .ConvoListItem {
            height: 71px!important;
            padding: 3px 0 0 18px;
        }
        .ConvoListItem__header {
            padding-top: 10px;
        }
        .ConvoList__item .ConvoListItem__message {
            padding-top: 2px;
        }
        .ConvoListItem__header, .ConvoListItem__icons{
            padding-right: 18px!important;
        }
        .ConvoListItem__avatar {
            scale: 1.0418;
        }
        .ConvoList__organiserSection {
            padding: 5px 0;
        }
        .ForwardedMessagesList--withoutBubbles {
            border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha);
            padding-left: 12px;
        }
    
        .ForwardedMessagesList__info {
            display: none;
        }
        .NestedForwardedMessageButton::before {
            background: transparent;
        }
        .NestedForwardedMessageButton {
            border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha);
        }
        .HopNavigationButton:has(.vkuiIcon--dropdown_20) {
        --arrow-down-mxh: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAAEH5aXCAAABN2lDQ1BBZG9iZSBSR0IgKDE5OTgpAAAokZWPv0rDUBSHvxtFxaFWCOLgcCdRUGzVwYxJW4ogWKtDkq1JQ5ViEm6uf/oQjm4dXNx9AidHwUHxCXwDxamDQ4QMBYvf9J3fORzOAaNi152GUYbzWKt205Gu58vZF2aYAoBOmKV2q3UAECdxxBjf7wiA10277jTG+38yH6ZKAyNguxtlIYgK0L/SqQYxBMygn2oQD4CpTto1EE9AqZf7G1AKcv8ASsr1fBBfgNlzPR+MOcAMcl8BTB1da4Bakg7UWe9Uy6plWdLuJkEkjweZjs4zuR+HiUoT1dFRF8jvA2AxH2w3HblWtay99X/+PRHX82Vun0cIQCw9F1lBeKEuf1UYO5PrYsdwGQ7vYXpUZLs3cLcBC7dFtlqF8hY8Dn8AwMZP/fNTP8gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAZvaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDYtMDZUMTY6MjM6MzMrMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDYtMDZUMTY6MjM6MzMrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA2LTA2VDE2OjIzOjMzKzAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE3ZDk3NDVlLTgwYjYtYjk0NC04MTU0LTMzYWUzOTMwMGFmYiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjdiNDY4MzNkLTFkMmYtYzk0Mi1iYjNkLTE3NjlmNmU0ZTVkZiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmIxMmFlMzA5LTUzMGUtMTc0Yy04MTE0LTYyOGNlNjUxNzg5OSIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmIxMmFlMzA5LTUzMGUtMTc0Yy04MTE0LTYyOGNlNjUxNzg5OSIgc3RFdnQ6d2hlbj0iMjAyMy0wNi0wNlQxNjoyMzozMyswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDphN2Q5NzQ1ZS04MGI2LWI5NDQtODE1NC0zM2FlMzkzMDBhZmIiIHN0RXZ0OndoZW49IjIwMjMtMDYtMDZUMTY6MjM6MzMrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1w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);
        .HopNavigationButton__icon {
            display: none;
        }
        background: var(--vkui--color_background_modal) var(--arrow-down-mxh) left 14px no-repeat;
        background-position: top 8px left 12px;
        background-size: 6.5%;
        width: 210px;
        border-radius: 40px;
        height: 30px;
        left: 180px;
        position: absolute;
        bottom: 0px;
    }
    .HopNavigationButton:has(.vkuiIcon--dropdown_20):hover {
        background: var(--vkui--color_background_modal--hover) var(--arrow-down-mxh) left 14px no-repeat;
        background-position: top 8px left 12px;
        background-size: 6.5%;
    }
    .HopNavigationButton:has(.vkuiIcon--dropdown_20):after {
        content: "${getEndStoryLang(vk.lang)}";
        font-weight: 500;
        text-align: center;
        color: var(--blue_420) !important;
        line-height: 30px;
    }
    .ConvoListItem__outStatusIcon:has(.vkuiIcon--check_double_outline_16) {
        display:none;
    }
    .ConvoListItem__outStatusIcon .vkuiIcon--check_outline_16 {
        background-color: var(--vkui--color_background_accent_themed);
        border-radius:100px;
        width:7px!important;
        height:7px!important;
        scale: 1.143;
    }
    .ConvoListItem__outStatusIcon .vkuiIcon--check_outline_16 use {
        display:none;
    }
    .ConvoHistory__messageWrapper--withoutBubbles:has(.vkuiIcon--check_outline_16) {
        background-color:var(--vkui--color_background_secondary);
    }
    .ConvoHistory__messageBlock--withoutBubbles {
        padding: 0 22px;
    }
    .ConvoHistory__messageWrapper--withoutBubbles .vkuiIcon--check_outline_16,.ConvoHistory__messageWrapper--withoutBubbles .vkuiIcon--check_double_outline_16 {
        display:none;
    }
    .ConvoMessageWithoutBubble:hover {
        background:transparent;
    }
        
    .ConvoHistory__messageWrapper--withoutBubbles {
        cursor:pointer;
    }

    .ConvoHeader__action.ConvoHeader__back:hover {
        background: linear-gradient(to right, var(--vkui--vkontakte_background_hover_alpha) 50%, transparent);
        text-decoration: none;
    }
    .VKCOMMessenger__reforgedRightColumn {
        border-radius: 0px!important;
    }
    .ConvoMessageInfoWithoutBubbles__date {
        display: none;
    }

    .ConvoHeader {
        --convoHeaderHeight: 49.5px;
    }

    .ConvoMessageInfoWithoutBubbles__date:hover {
        text-decoration: underline;
    }
    
    .ConvoMessageWithoutBubble:has(.ConvoMessageWithoutBubble__avatar) .ConvoMessageInfoWithoutBubbles__date {
        display: block;
    }
    
    .ConvoMessageInfoWithoutBubbles__date {
        font-size: 12px;
    }

    .ConvoMessage__actions--withoutBubbles {
        bottom: calc(100% - 28px)!important;
        right: 10px!important;
    }

    .MessageActionsButtonWrapper {
        background: transparent!important;
        box-shadow: none!important;
    }

    .MessageActionsButton {
        opacity: .5;
        color: var(--vkui--color_icon_secondary);
        background-color: transparent!important;
    }

    .MessageActionsButton:focus, .MessageActionsButton:hover {
        opacity: .7;
    }

    .MessageActionsButton:active {
        opacity: 1;
    }

    .ConvoMessageInfoWithoutBubbles__views {
        display:none;
    }

    .ConvoMessageInfoWithoutBubbles {
        margin: 1px 2px 0 4px!important;
    }

    .ConvoMessageWithoutBubble__mediaAttachments .AttachesGrid{
        border-radius: 0;
        border: 0;
    }

    .ConvoMessageWithoutBubble__wrapper {
        width: 85%!important;
    }
    .ConvoList__footerIcon,.vkmListHeader__title,.ConvoList__topMenu > button:not(:has(.vkToolsImportantMessagesCounter)),.CollapsibleContainer__widthControllerButton {
        display:none;
    }
    .ConvoMain__composerWrapper .ConvoComposer__button:has(.vkuiIcon--add_circle_outline_24) {
        scale:.96;
        background:url('data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%200h24v24h-24z%22%2F%3E%3Cpath%20d%3D%22m20.0291094%2015.0279907-5.384726%205.2303888c-2.5877049%202.513536-6.71408829%202.4838066-9.26530792-.0667538-2.6116233-2.6109485-2.61217034-6.8446794-.00122186-9.4563027.00760974-.0076117.01523784-.015205.02288425-.0227799l8.06657363-7.99110563c1.7601202-1.7436532%204.6004898-1.73030402%206.344143.02981623.0091252.00921136.0182104.01846224.0272554.02775238%201.7500823%201.79751906%201.7306631%204.66777042-.0435807%206.44144506l-8.1308667%208.12825806c-.8479169.8476448-2.20023168.9147308-3.12787932.1551687l-.1337127-.1094846c-.8947528-.7326277-1.02618115-2.0518803-.29355343-2.9466331.03855837-.047091.0791516-.0924786.12166404-.1360332l5.46733261-5.60136864%22%20stroke%3D%22%23828a99%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.8%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E') no-repeat 8px;
    }
    
    .ConvoMain__composerWrapper .ConvoComposer__button:has(.vkuiIcon--add_circle_outline_24)  svg {
        display:none;
    }
    
    .ConvoList__folders {
        display:none;
    }
    :is(.ConvoListItem--selected )::before {
        background-color:var(--vkui--color_background_accent_themed) !important;
    }
    .ConvoListItemWrapper {
        padding: 1px 0;
    }
    .ConvoListItem {
        border-radius:0px;
    }
    .ConvoListItem__date {    
        position: absolute;
        top: 15px;
        right: 20px;
    }
    .ConvoList__item:hover .ConvoListItem__date {
        display:none;
    }
    .ConvoListItem--selected .ConvoListItem__action {
        color: var(--vkui--color_icon_contrast_themed);
        opacity: .7!important;
    }
    .ConvoListItem--selected .MEAvatar__online, .ConvoListItem--selected .MEAvatar__mobile {
        filter:contrast(1.12) brightness(1.16);
        color:#8ac176!important;
    }
    .ConvoListItem--selected .ConvoListItem__date {
        color: var(--vkui--color_icon_contrast_themed);
        opacity: .7;
    }
    .ConvoListItem--selected .ConvoTitle__author, .ConvoListItem--selected .MessagePreview, .ConvoListItem--selected .ConvoListItem__author, .ConvoListItem--selected .ConvoListItem__typing, .ConvoListItem--selected .ConvoListItem__text, .ConvoListItem--selected .ConvoListItem__typingIndicator,.ConvoListItem--selected .MessagePreview__attach {
        color:var(--vkui--color_icon_contrast_themed);
    }
    .ConvoListItem--selected .UnreadCounter,.ConvoListItem--selected.ConvoListItem--muted .ConvoListItem__icon--unmute, .ConvoListItem--selected.ConvoListItem--muted .ConvoListItem__icon {
        color: var(--vkui--color_background_accent_themed)!important;
        background: var(--vkui--color_icon_contrast_themed);
    }
    .ConvoListItem--selected .ConvoListItem__outStatusIcon svg {
        border-radius: 100px;
        background-color:var(--vkui--color_icon_contrast_themed)!important;
    }
    .ConvoListItem--selected .ConvoListItem__outStatusIcon:has(.vkuiIcon--check_outline_16):before {
    background-color: var(--vkui--color_icon_contrast_themed)!important;;
    }
        .ConvoListItem--selected .ConvoTitle {
            color: var(--vkui--color_icon_contrast_themed);
        }
    .ConvoList__item--separator::before {
        display:none;
    }
    .ConvoMain__composer {
        padding: 16px!important;
        background-color: var(--vkui--color_background_tertiary);
        box-shadow: var(--page-block-shadow);
    }
    .ConvoMain__composerContent {
        border-radius: 6px;
        box-shadow: none;
        border: 1px solid var(--vkui--color_field_border_alpha);
        width: 88%;
        margin-left: 32px;
    }
    .DropdownReforged:has(.ConvoComposer__buttonIcon--submit),
    .DropdownReforged:has(.ConvoComposer__buttonIcon--postponed),
    .DropdownReforged:has(.ConvoComposer__buttonIcon--mic),
    .DropdownReforged:has(.ConvoComposer__buttonIcon--delete),
    .DropdownReforged:has(.ConvoComposer__buttonIcon--edit),
    .DropdownReforged:has(.ConvoComposer__buttonIcon--loading),
    .DropdownReforged:has(.ConvoComposer__buttonIcon--limit)
    {
        position:absolute;
        right: -42px;
        margin: 0;
        bottom: -3px;
    }
    
    .DropdownReforged:has(.ConvoComposer__button .vkuiIcon--add_circle_outline_24) {
        position:absolute;
        left: -42px;
        bottom: -4px;
    }
    .ConvoComposer__inputPlaceholder {
        padding: 6px 0;
    }
    
    .ConvoComposer__input.ConvoComposer__input.ConvoComposer__input {
        margin: 6px 0;
    }
    .ConvoComposer__button:has(.vkuiIcon--smile_outline_24) {
        margin: 0;
    }
        
    .vkmListHeader {
        display: flex;
        flex-direction: row-reverse;
        min-height: 46px;
    }
    .ConvoList__header {
        padding-bottom:1px;
        border-bottom:1px solid var(--vkui--color_separator_primary);
    }
    .ConvoList__search .vkuiSearch__field {
        background-color:transparent;
    }

    .ConvoHeader__infoContainer {
        flex-flow: row;
    }
    .Reply::after {
        background: var(--vkui--vkontakte_im_reply_separator);
        opacity: .16;
    }
    .Reply--clickable:not(.Reply--withoutBubble):hover::before {
        background: transparent;
    }
    .Reply--clickable:not(.Reply--withoutBubble):hover::after {
        opacity: .4;
    }
    .MEApp__route:not(:has(> .MEApp__oneColumn)) .ConvoListItem .ConvoTitle__title{
        max-width: 134px;
    }
    .ConvoHeader__status {
        padding-left:8px;
    }
    .MEApp__route:not(:has(> .MEApp__oneColumn)) .MEApp__content .ConvoHeader__action.ConvoHeader__back {
        visibility: hidden;
        width: 8px!important;
    }
    div:has(> .ConvoList__search){
        position:absolute;
        top:8px;
        left:-4px;
        width:92%;
    }
    .ConvoList__search {
        padding-left:0px;
    }
        
    .ComposerFormattingMenu {
        display:none;
    }
    .ConvoList__topMenu {
        z-index: 1;
    }
        .ConvoMessageWithoutBubble__wrapper {
            max-width: 88%;
        }
        .ConvoComposer__stickersPanel {
            border-radius: 0px;
            border: 1px solid var(--vkui--color_separator_primary);
            box-shadow: 0 1px 3px var(--transparent_black);
        }
        .AttachesGrid--radiusTop {
            border-radius: 0px;
        }
        .ConvoList__footer:has(.ConvoList__footerIcon--active) .ConvoList__footerText{
           color: var(--vkui--color_text_link); 
        }
        .ConvoList__footerSwitch {
            display: none;
        }
        .ConvoList__footer {
            padding-right: 12px;
        }
        .ConvoList__burger svg {
            background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.2156 12.0544C15.2156 13.8258 13.7764 15.2618 12.001 15.2618C10.2256 15.2618 8.78632 13.8258 8.78632 12.0544C8.78632 10.283 10.2256 8.84698 12.001 8.84698C13.7764 8.84698 15.2156 10.283 15.2156 12.0544ZM12.001 14.1926C13.1846 14.1926 14.1441 13.2353 14.1441 12.0544C14.1441 10.8734 13.1846 9.91611 12.001 9.91611C10.8174 9.91611 9.85787 10.8734 9.85787 12.0544C9.85787 13.2353 10.8174 14.1926 12.001 14.1926Z' fill='%2399a2ad'%3E%3C/path%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.4516 3.43023C12.1667 3.43017 11.881 3.43628 11.5961 3.42957C11.4497 3.42613 10.9359 3.41402 10.504 3.75935C10.0803 4.09817 9.92244 4.61563 9.82732 4.99591C9.77042 5.22341 9.66028 5.51469 9.51138 5.79361C9.21102 5.91293 8.92139 6.05313 8.64429 6.21236C8.343 6.15214 8.0578 6.05703 7.85155 5.96106C7.49587 5.79556 6.9931 5.59199 6.46192 5.70814C5.92151 5.8263 5.60785 6.23276 5.51857 6.34845C5.35397 6.56175 5.18343 6.77214 5.00895 6.97747C4.91403 7.08917 4.58233 7.47952 4.57906 8.03068C4.57584 8.57215 4.87853 9.02021 5.11465 9.33381C5.25992 9.52675 5.4219 9.80562 5.54639 10.106C5.45667 10.4029 5.38692 10.7084 5.33867 11.0208C5.09846 11.2312 4.83626 11.4064 4.62525 11.514C4.2754 11.6925 3.80622 11.9629 3.57137 12.4515C3.33255 12.9484 3.45945 13.4443 3.49575 13.5862C3.56253 13.8472 3.6235 14.111 3.67792 14.3748C3.70745 14.518 3.81096 15.0199 4.24413 15.3623C4.67023 15.6992 5.21122 15.7366 5.60377 15.7437C5.83588 15.7479 6.14113 15.7889 6.44388 15.8698C6.62622 16.1346 6.82698 16.3856 7.0443 16.6211C7.05447 16.9324 7.02578 17.2368 6.97791 17.4625C6.89657 17.8462 6.81165 18.38 7.04357 18.8695C7.27988 19.3683 7.74628 19.5823 7.87951 19.6434C8.12445 19.7557 8.36795 19.8744 8.60731 19.9982C8.73719 20.0653 9.19384 20.3015 9.73392 20.1802C10.2642 20.0612 10.6335 19.6646 10.8857 19.3645C11.0397 19.1813 11.2723 18.9631 11.5342 18.7755C11.8429 18.7967 12.159 18.7967 12.4677 18.7755C12.7296 18.9631 12.9622 19.1813 13.1162 19.3645C13.3685 19.6646 13.7377 20.0612 14.268 20.1802C14.8081 20.3015 15.2647 20.0653 15.3946 19.9982C15.634 19.8744 15.8775 19.7558 16.1224 19.6434C16.2557 19.5823 16.7221 19.3683 16.9584 18.8695C17.1903 18.38 17.1054 17.8462 17.024 17.4625C16.9762 17.2368 16.9475 16.9324 16.9576 16.6211C17.1749 16.3856 17.3757 16.1346 17.558 15.8698C17.8608 15.7889 18.166 15.7479 18.3982 15.7437C18.7907 15.7366 19.3317 15.6992 19.7578 15.3623C20.191 15.0199 20.2945 14.5181 20.324 14.3748C20.3784 14.111 20.4394 13.8472 20.5062 13.5862C20.5425 13.4443 20.6694 12.9484 20.4306 12.4515C20.1957 11.9629 19.7265 11.6925 19.3767 11.514C19.1657 11.4064 18.9035 11.2312 18.6633 11.0208C18.615 10.7084 18.5453 10.4029 18.4555 10.106C18.58 9.80562 18.742 9.52675 18.8873 9.33381C19.1234 9.02021 19.4261 8.57215 19.4229 8.03068C19.4196 7.47952 19.0879 7.08917 18.993 6.97746C18.8185 6.77213 18.6479 6.56175 18.4834 6.34845C18.3941 6.23276 18.0804 5.8263 17.54 5.70814C17.0088 5.59199 16.5061 5.79556 16.1504 5.96106C15.9441 6.05703 15.6589 6.15214 15.3576 6.21236C15.0805 6.05313 14.7909 5.91293 14.4905 5.79361C14.3417 5.51469 14.2315 5.22341 14.1746 4.99591C14.0832 4.63046 13.937 4.15753 13.5737 3.82428C13.148 3.43376 12.6467 3.43123 12.4672 3.43032L12.4516 3.43023ZM15.6276 18.6942L14.9481 19.0254C14.6084 19.191 14.4385 19.2738 13.9372 18.6775C13.6562 18.3431 13.2162 17.9541 12.7349 17.6753C12.2544 17.7374 11.7476 17.7374 11.2671 17.6753C10.7858 17.9541 10.3458 18.3431 10.0647 18.6775C9.56342 19.2738 9.39355 19.191 9.05382 19.0254L8.37434 18.6942C8.0346 18.5285 7.86473 18.4457 8.02627 17.6838C8.11524 17.2641 8.15142 16.6911 8.08009 16.1489C7.71605 15.8005 7.3984 15.404 7.13733 14.9697C6.62333 14.7768 6.05396 14.6825 5.62318 14.6747C4.84406 14.6606 4.80154 14.4766 4.71651 14.1084L4.54645 13.3722C4.46142 13.0041 4.41891 12.82 5.113 12.466C5.5005 12.2683 5.97627 11.9295 6.35549 11.5258C6.40173 11.027 6.51264 10.547 6.67976 10.0941C6.51655 9.56053 6.23511 9.04193 5.97138 8.69166C5.50281 8.06933 5.62175 7.92253 5.85963 7.62892L6.33539 7.0417C6.57327 6.74809 6.69221 6.60129 7.39866 6.93C7.78581 7.11015 8.33263 7.27352 8.87449 7.32688C9.29254 7.05018 9.74942 6.82739 10.2352 6.66841C10.5407 6.21002 10.7621 5.6742 10.867 5.25479C11.056 4.49918 11.245 4.49918 11.623 4.49918L12.4437 4.49933C12.7792 4.50179 12.9571 4.54363 13.1349 5.25479C13.2398 5.6742 13.4612 6.21002 13.7667 6.66841C14.2525 6.82739 14.7094 7.05018 15.1274 7.32688C15.6693 7.27352 16.2161 7.11015 16.6033 6.93C17.3097 6.60129 17.4287 6.74809 17.6665 7.0417L18.1423 7.62892C18.3802 7.92253 18.4991 8.06933 18.0305 8.69166C17.7668 9.04193 17.4854 9.56053 17.3222 10.0941C17.4893 10.547 17.6002 11.027 17.6464 11.5258C18.0257 11.9295 18.5014 12.2683 18.8889 12.466C19.583 12.82 19.5405 13.0041 19.4555 13.3722L19.2854 14.1084C19.2004 14.4766 19.1579 14.6606 18.3787 14.6747C17.948 14.6825 17.3786 14.7768 16.8646 14.9697C16.6035 15.404 16.2859 15.8005 15.9218 16.1489C15.8505 16.6911 15.8867 17.2641 15.9757 17.6838C16.1372 18.4457 15.9673 18.5285 15.6276 18.6942Z' fill='%2399a2ad'%3E%3C/path%3E%3Cpath d='M12.4516 3.43023C12.4565 3.43027 12.4617 3.43029 12.4672 3.43032M12.4516 3.43023L12.4672 3.43032M12.4516 3.43023C12.1667 3.43017 11.881 3.43628 11.5961 3.42957C11.4497 3.42613 10.9359 3.41402 10.504 3.75935C10.0803 4.09817 9.92244 4.61563 9.82732 4.99591C9.77042 5.22341 9.66028 5.51469 9.51138 5.79361C9.21102 5.91293 8.92139 6.05313 8.64429 6.21236C8.343 6.15214 8.0578 6.05703 7.85155 5.96106C7.49587 5.79556 6.9931 5.59199 6.46192 5.70814C5.92151 5.8263 5.60785 6.23276 5.51857 6.34845C5.35397 6.56175 5.18343 6.77214 5.00895 6.97747C4.91403 7.08917 4.58233 7.47952 4.57906 8.03068C4.57584 8.57215 4.87853 9.02021 5.11465 9.33381C5.25992 9.52675 5.4219 9.80562 5.54639 10.106C5.45667 10.4029 5.38692 10.7084 5.33867 11.0208C5.09846 11.2312 4.83626 11.4064 4.62525 11.514C4.2754 11.6925 3.80622 11.9629 3.57137 12.4515C3.33255 12.9484 3.45945 13.4443 3.49575 13.5862C3.56253 13.8472 3.6235 14.111 3.67792 14.3748C3.70745 14.518 3.81096 15.0199 4.24413 15.3623C4.67023 15.6992 5.21122 15.7366 5.60377 15.7437C5.83588 15.7479 6.14113 15.7889 6.44388 15.8698C6.62622 16.1346 6.82698 16.3856 7.0443 16.6211C7.05447 16.9324 7.02578 17.2368 6.97791 17.4625C6.89657 17.8462 6.81165 18.38 7.04357 18.8695C7.27988 19.3683 7.74628 19.5823 7.87951 19.6434C8.12445 19.7557 8.36795 19.8744 8.60731 19.9982C8.73719 20.0653 9.19384 20.3015 9.73392 20.1802C10.2642 20.0612 10.6335 19.6646 10.8857 19.3645C11.0397 19.1813 11.2723 18.9631 11.5342 18.7755C11.8429 18.7967 12.159 18.7967 12.4677 18.7755C12.7296 18.9631 12.9622 19.1813 13.1162 19.3645C13.3685 19.6646 13.7377 20.0612 14.268 20.1802C14.8081 20.3015 15.2647 20.0653 15.3946 19.9982C15.634 19.8744 15.8775 19.7558 16.1224 19.6434C16.2557 19.5823 16.7221 19.3683 16.9584 18.8695C17.1903 18.38 17.1054 17.8462 17.024 17.4625C16.9762 17.2368 16.9475 16.9324 16.9576 16.6211C17.1749 16.3856 17.3757 16.1346 17.558 15.8698C17.8608 15.7889 18.166 15.7479 18.3982 15.7437C18.7907 15.7366 19.3317 15.6992 19.7578 15.3623C20.191 15.0199 20.2945 14.5181 20.324 14.3748C20.3784 14.111 20.4394 13.8472 20.5062 13.5862C20.5425 13.4443 20.6694 12.9484 20.4306 12.4515C20.1957 11.9629 19.7265 11.6925 19.3767 11.514C19.1657 11.4064 18.9035 11.2312 18.6633 11.0208C18.615 10.7084 18.5453 10.4029 18.4555 10.106C18.58 9.80562 18.742 9.52675 18.8873 9.33381C19.1234 9.02021 19.4261 8.57215 19.4229 8.03068C19.4196 7.47952 19.0879 7.08917 18.993 6.97746C18.8185 6.77213 18.6479 6.56175 18.4834 6.34845C18.3941 6.23276 18.0804 5.8263 17.54 5.70814C17.0088 5.59199 16.5061 5.79556 16.1504 5.96106C15.9441 6.05703 15.6589 6.15214 15.3576 6.21236C15.0805 6.05313 14.7909 5.91293 14.4905 5.79361C14.3417 5.51469 14.2315 5.22341 14.1746 4.99591C14.0832 4.63046 13.937 4.15753 13.5737 3.82428C13.148 3.43376 12.6467 3.43123 12.4672 3.43032M14.9481 19.0254L15.6276 18.6942C15.9673 18.5285 16.1372 18.4457 15.9757 17.6838C15.8867 17.2641 15.8505 16.6911 15.9218 16.1489C16.2859 15.8005 16.6035 15.404 16.8646 14.9697C17.3786 14.7768 17.948 14.6825 18.3787 14.6747C19.1579 14.6606 19.2004 14.4766 19.2854 14.1084L19.4555 13.3722C19.5405 13.0041 19.583 12.82 18.8889 12.466C18.5014 12.2683 18.0257 11.9295 17.6464 11.5258C17.6002 11.027 17.4893 10.547 17.3222 10.0941C17.4854 9.56053 17.7668 9.04193 18.0305 8.69166C18.4991 8.06933 18.3802 7.92253 18.1423 7.62892L17.6665 7.0417C17.4287 6.74809 17.3097 6.60129 16.6033 6.93C16.2161 7.11015 15.6693 7.27352 15.1274 7.32688C14.7094 7.05018 14.2525 6.82739 13.7667 6.66841C13.4612 6.21002 13.2398 5.6742 13.1349 5.25479C12.9571 4.54363 12.7792 4.50179 12.4437 4.49933L11.623 4.49918C11.245 4.49918 11.056 4.49918 10.867 5.25479C10.7621 5.6742 10.5407 6.21002 10.2352 6.66841C9.74942 6.82739 9.29254 7.05018 8.87449 7.32688C8.33263 7.27352 7.78581 7.11015 7.39866 6.93C6.69221 6.60129 6.57327 6.74809 6.33539 7.0417L5.85963 7.62892C5.62175 7.92253 5.50281 8.06933 5.97138 8.69166C6.23511 9.04193 6.51655 9.56053 6.67976 10.0941C6.51264 10.547 6.40173 11.027 6.35549 11.5258C5.97627 11.9295 5.5005 12.2683 5.113 12.466C4.41891 12.82 4.46142 13.0041 4.54645 13.3722L4.71651 14.1084C4.80154 14.4766 4.84406 14.6606 5.62318 14.6747C6.05396 14.6825 6.62333 14.7768 7.13733 14.9697C7.3984 15.404 7.71605 15.8005 8.08009 16.1489C8.15142 16.6911 8.11524 17.2641 8.02627 17.6838C7.86473 18.4457 8.0346 18.5285 8.37434 18.6942L9.05382 19.0254C9.39355 19.191 9.56342 19.2738 10.0647 18.6775C10.3458 18.3431 10.7858 17.9541 11.2671 17.6753C11.7476 17.7374 12.2544 17.7374 12.7349 17.6753C13.2162 17.9541 13.6562 18.3431 13.9372 18.6775C14.4385 19.2738 14.6084 19.191 14.9481 19.0254ZM12.001 15.2618C13.7764 15.2618 15.2156 13.8258 15.2156 12.0544C15.2156 10.283 13.7764 8.84698 12.001 8.84698C10.2256 8.84698 8.78632 10.283 8.78632 12.0544C8.78632 13.8258 10.2256 15.2618 12.001 15.2618ZM14.1441 12.0544C14.1441 13.2353 13.1846 14.1926 12.001 14.1926C10.8174 14.1926 9.85787 13.2353 9.85787 12.0544C9.85787 10.8734 10.8174 9.91611 12.001 9.91611C13.1846 9.91611 14.1441 10.8734 14.1441 12.0544Z' stroke='%2399a2ad' stroke-width='0.5'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
        }
        .ConvoList__burger svg use {
            display: none;
        }
        .ConvoList__topMenuAction:has(> .vkuiIcon--write_outline_24) svg {
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 4C12.5523 4 13 4.44772 13 5V11L19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L13 13L13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19L10.999 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L10.999 11L11 5C11 4.44772 11.4477 4 12 4Z' fill='%2399A2AD'/%3E%3C/svg%3E") no-repeat center;
        }
        .ConvoList__topMenuAction:has(> .vkuiIcon--write_outline_24) svg use {
            display: none;
        }
        .DropdownReforged:has(.ConvoList__topMenuAction > .vkuiIcon--phone_add_outline_24) {
            display: none;
        }
        .vkEnhancerCounterOfMessages .ConvoListFilter__text, .vkEnhancerCounterOfMessages #vkEnhancerRebootMessageCounter {
            display: none;
        }
        .vkEnhancerCounterOfMessages .ConvoListFilter {
            justify-content: center;
            margin: 0;
            width: 32px;
            padding: 0;
            height: 32px;
        }
        .vkEnhancerCounterOfMessages svg path {
            fill: var(--vkui--color_text_secondary);
        }
        .ConvoList__footerText:hover {
            text-decoration:underline;
        }
    }
    .VKCOMMessenger__reforgedModalRoot .ActionsMenu {
        border-radius: 0px!important;
    }
    `;
}

export default getOldDialogsStyle;