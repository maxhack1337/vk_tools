const getOldAttachStyle = () => {
    return `
        
.VKCOMMessenger__integrationRoot {
    .media_desc:has(>a[onclick^="return showWiki({w: 'wall"]) {
        padding-top: 0px!important;
    }
    .media_desc.im-mess--inline-fwd {
        padding-top: 8px;
    }
    .media_desc:not(.im-mess--inline-fwd) {
        padding-top: 14px; 
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

    .post_author .page_verified {
        display: block !important;
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
        margin: 0 5px 5px 0;
    }

    .im_msg_media_wall:has(>.post) {
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
}

    `;
}

export default getOldAttachStyle;