const getOldAttachStyle = () => {
    return `

    .body_im #system_msg {
        display:none !important;
    }
        
.VKCOMMessenger__integrationRoot {
    .wall_audio_rows {
        margin: 5px -10px 0 0;
    }
    .audio_row {
        max-width: 384px;
    }
    .audio_row .audio_player__place {
        box-sizing: border-box!important;
    }
    .Attachments:not(.im-vktools-custom) {
        display: none;
    }

    .im-mess--inline-fwd * {
        box-sizing: initial !important;
    }

    .im-vktools-custom * {
        box-sizing: initial !important;   
    }

    .GiftSnippetContent__message {
        display: flex;
        justify-content: center;
    }
    .GiftSnippetContent__buttonBar {
        display: flex;
        flex-direction: column;
    }
    .im_msg_media_poll {
        width: 387px !important;
    }
    .media_voting_footer {
        box-sizing: initial !important;
    }
    .article_snippet {
        width: 387px !important;
    }
    .page_gif_actions > div[class^="page_gif"] {
        box-sizing: initial !important;
    }
    .im-mess-stack.im-mess-stack_fwd .im-mess-stack--mess li:last-of-type {
        margin-bottom: 4px;
    }

    .audio-msg-track--wave path {
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2px;
        fill: none;
        stroke: var(--vkui--color_icon_accent);
    }
    .Attachments:has(>.im_msg_media_audio_message), .Attachments:has(>.post_media_audio) {
        margin-bottom: 0px;
    }

    .media_desc:has(>a[onclick^="return showWiki({w: 'wall"]) {
        padding-top: 0px!important;
    }

    .Attachments {
        margin-bottom: 12px;
    }
    ._post.Post--redesignV3 {
        background: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
    }

    .post_date:hover,
    a:not(.flat_button):hover {
        text-decoration: underline;
    }

    .im_post_top_info_caption {
        background-color: transparent;
        color: var(--vkui--color_text_subhead);
        padding: 0 0 6px 0;
        margin-left: 6px;
        font-size: 13px;
        line-height: 19px;
    }

    .post_header {
        padding: 0;
        margin-left: 6px;
        margin-top: 4px;
    }

    .post_info>.wall_text {
        padding-left: 0;
        margin-left: 7px;
        padding-bottom: 10px;
        padding-top: 8px;
    }

    .post_image {
        display: block;
        float: left;
        width: 36px;
        height: 36px;
    }

    .post_image_stories {
        position: relative;
    }

    .post_image img {
        max-height: 36px;
        max-width: 36px;
    }

    .post_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: top;
    }

    .post_header_info {
        padding-top: 0px;
        margin-left: 51px;
    }

    .post_header .post_author {
        max-width: calc(100% - 24px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        vertical-align: top;
    }

    h5.post_author,
    h6.copy_post_author {
        font-size: 13px;
        margin: 0;
        font-weight: 400;
        -webkit-font-smoothing: subpixel-antialiased;
    }

    .post_author {
        color: var(--vkui--color_text_secondary);
        line-height: 16px;
        padding-right: 20px;
    }

    .post_author .author,
    .wall_module .author,
    .wall_module .copy_author {
        font-weight: 500;
        -webkit-font-smoothing: subpixel-antialiased;
        color: var(--vkui--vkontakte_color_text_name);
    }

    .im_msg_audiomsg:has(.audio-msg-track--transcript_on) .im_msg_audiomsg--transcript {
        display:block !important;
    }

    .audio-msg-track--transcriptToggle {
        margin: 2px 6px 2px -14px;
    }
    .post_author .page_verified {
        background: url(data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2012%2012%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m2.25%206.75%202.25%202.25%205.25-5.25%22%20fill%3D%22none%22%20stroke%3D%22%235c9ce6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E)no-repeat 0 center;
        margin-right: 2px;
    }

    .post_header_info .explain {
        color: var(--vkui--color_text_secondary);
    }

    .post_date,
    .post_date .post_link,
    .post_date .wall_text_name_explain_promoted_post {
        color: var(--vkui--color_text_secondary);
    }

    .post_date {
        white-space: nowrap;
        position: relative;
        font-size: 12.5px;
        padding-top: 0px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .post_content {
        margin-top: -18px;
    }

    .wall_post_text {
        --post-small-spacing-tb: 8px;
        padding-bottom: 0;
        padding-top: var(--post-small-spacing-tb, 8px);
        line-height: 1.462;
        overflow: hidden;
        word-wrap: break-word;
    }

    .wall_text .page_post_sized_thumbs:last-child {
        padding-bottom: 0;
    }

    .wall_text .page_post_sized_thumbs {
        margin-top: var(--post-large-spacing-tb, 12px);
    }

    .page_post_sized_thumbs a.page_post_thumb_last_row,
    .page_post_sized_thumbs span.page_post_thumb_last_row {
        margin-bottom: 0;
    }

    .image_cover {
        max-width: 100%;
    }

    a.page_post_thumb_wrap,
    span.page_post_thumb_wrap {
        display: block;
        overflow: hidden;
        position: relative;
        /*margin: 0 5px 5px 0;*/
    }

    .im_msg_media_wall:has(>.post), .im_msg_media_wall_reply:has(>.post) {
        border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha);
    }

    .PostHeaderActionsLegacyUiActionMenuIconContainer {
        top: 0;
        right: 0;
    }

    .PostCopyQuote--redesignV3.copy_quote {
        border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha) !important;
        padding-left: 12px !important;
        margin: 5px 0 0 0 !important;
    }

    .PostCopyQuote--redesignV3 .copy_post_header {
        display: flex;
        align-items: center;
        min-height: 24px;
        padding: 0 !important;
    }

    .CopyPost__headerIcon {
        display: none;
    }

    .copy_post_image {
        display: block;
        float: left;
    }

    .Post--redesignV3 ._copy_post_img {
        width: 36px !important;
        height: 36px !important;
    }

    .PostCopyQuote--redesignV3 .copy_post_header_info {
        margin-left: 12px;
        padding-top: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .PostCopyQuote--redesignV3 .CopyPost__author,
    .PostCopyQuote--redesignV3 .CopyPost__authorLink {
        color: var(--vkui--color_text_link) !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        line-height: 16px !important;
    }
    
    .im_srv_lnk_light._fc_call_link {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        background: var(--vkui--vkontakte_color_snippet_background);
        border: 1px solid var(--vkui--vkontakte_color_snippet_border_alpha);
        border-radius: 4px;
        color: var(--vkui--color_text_primary);
        font-size: 12.5px;
        line-height: 16px;
        font-weight: 500;
        -webkit-font-smoothing: subpixel-antialiased;
    }
    .im_srv_lnk_light._fc_call_link:before {
        background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='phone_24__Page-2' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='phone_24__phone_24'%3E%3Cpath id='phone_24__Bounds' d='M0 0h24v24H0z'%3E%3C/path%3E%3Cpath d='M14.61 14.76a3.64 3.64 0 0 1 4.9-.29l1.03.86a2.8 2.8 0 0 1 .26 3.96 3.32 3.32 0 0 1-2.2 1.14c-3.27.44-6.7-1.14-10.3-4.73-3.6-3.6-5.17-7.04-4.73-10.3a3.25 3.25 0 0 1 1.14-2.2 2.8 2.8 0 0 1 3.95.26l.87 1.03a3.63 3.63 0 0 1-.29 4.9l-.73.73c-.2.2-.26.5-.17.75.27.73.95 1.65 2.05 2.74a8.6 8.6 0 0 0 2.74 2.05c.26.1.55.03.75-.17l.73-.73Z' id='phone_24__2x' fill='%23447bba'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E") no-repeat;
        content: '';
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
}

    `;
}

export default getOldAttachStyle;