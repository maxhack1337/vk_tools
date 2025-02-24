const innerStyleGet = () => {
    return `.feed_wall--no-islands:has(.Post--redesignV3) {
			background-color: transparent;
			box-shadow: 0 0 0 0 transparent;
		}

		.media_link__media {
			border: 1px solid var(--vkui--vkontakte_color_snippet_border_alpha)!important;
    		border-radius: 2px 2px 0 0!important;
		}

		.Post--redesignV3 .MiniAppsSnippet::after {
			border-radius: 4px!important;
			box-shadow: 0 0 0 1px var(--vkui--vkontakte_color_snippet_border_alpha) inset!important;
			margin-top: 0px!important;
		}

		[class*='PostContentContainer__contentContainer'] {
    		display: flex;
    		flex-direction: column;
			padding-top: 6px;
		}

		[class*='PostContentContainer__contentContainer'] > .vkuiDiv:has([class*='PostText__root']) {
    		display: contents !important;
		}

		[class*='PostContentContainer__contentContainer'] > .vkuiDiv:has([class*='PostText__root']) > .vkuiDiv:has([class*='PostText__root']) {
    		order: -1 !important;
		}

		[class*='PostContentContainer__contentContainer'] > .vkuiDiv:has([class*='PostText__root']) > .vkuiDiv[style*='padding: 0px 12px'] {
    		padding: 0px 20px !important;
		}

		[class*='PostContentContainer__contentContainer'] > .vkuiDiv:has([class*='PostText__root']) > .vkuiDiv > [class*='PostText__root'] {
    		font-size: 13px;
    		line-height: 1.462;
		}

	    ._post.Post--redesignV3, ._post.topic_comment, ._post.video_post, #feed_rows .fave_photos_page_block, ._post.photo_post  {
			background-color:var(--vkui--color_background_content)!important;
			border-radius:var(--vkui--size_border_radius_paper--regular)!important;
			box-shadow:var(--page-block-shadow)!important;
		}
		.feed_wall--no-islands .page_block:has(#wall_tabs) {
			background-color:var(--vkui--color_background_content)!important;
			box-shadow:var(--page-block-shadow)!important;
			border-radius:var(--vkui--size_border_radius_paper--regular)!important;
		}
		.suggest .PostHeader--redesignV3 .PostHeaderTitle, .postponed .PostHeader--redesignV3 .PostHeaderTitle {
			height: 16px!important;
		}
		.PostHeader--redesignV3 .PostHeaderTitle {
			display:flex;
			height: 34px;
			align-items: flex-start;
			flex-direction: column;
		}
		.PostCopyQuote--redesignV3 .copy_post_header_info {
			display:flex;
			height: 32px;
			align-items: flex-start;
			flex-direction: column;
		}
		.PostCopyQuote--redesignV3 .copy_post_date {
			font-size: 12.5px!important;
			margin-left: 0px!important;
		}
		.PostHeader--redesignV3 .PostHeaderTitle__author,.PostCopyQuote--redesignV3 .CopyPost__authorLink,.PostCopyQuote--redesignV3 .CopyPost__author {
			color: var(--vkui--color_text_link)!important;
			font-size: 13px!important;
			font-weight: 500!important;
			line-height: 16px!important;			
		}
		.PostHeader--redesignV3 .PostHeaderTitle__authorBlock {
			height:16px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="vkitPrimaryAttachment__root"]) {
			padding: 6px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="VideoSnippet"]) {
			padding: 6px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="vkitSnippetAttachment__root"]) {
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"]))
		{
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="vkitMediaGrid__root"])
		{
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div > .vkuiAspectRatio:has( > [class^="vkitPrimaryAttachmentAlbum__container"])
		{
			margin: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div > .vkuiAspectRatio > [class^="vkitPrimaryAttachmentAlbum__container"] {
			border-radius: 8px;
		}
		[class^="PostContentContainer__contentContainer"] > div:has( > [class^="OnMediaAttachmentOverlay__root"])
		{
			padding: 12px 20px 0px!important;
		}
		[class^="PostContentContainer__contentContainer"] > div:has(.podcast_snippet)
		{
			padding: 12px 20px 0px!important;
		}

		[class^="PostContentContainer__contentContainer"] div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"])) [class^=VideoPrimaryAttachment]
		{
			width: 510px!important;
		}

		[class^="PostContentContainer__contentContainer"] div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"])) [class^=VideoPrimaryAttachment] .inline_video_wrap {
			width: 510px!important;
		}

		.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"] div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"])) [class^=VideoPrimaryAttachment]
		{
			width: 490px!important;
		}

		.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"] div:has( > [class^="PrimaryAttachment"]:not([class^="vkitPrimaryAttachment__root"])) [class^=VideoPrimaryAttachment] .inline_video_wrap
		{
			width: 490px!important;
		}
		.PostHeader--redesignV3 .PostHeader--hasSubtitle {
			justify-content: center;
		}
		.Post--redesignV3 [class^="vkitShowMoreText__after"] > button {
			display: inline-block;
			color: var(--vkui--color_text_link);
			font-weight: 500!important;
			-webkit-font-smoothing: subpixel-antialiased;
		}
		.Post--redesignV3 ._copy_post_img {
			width:40px!important;
			height:40px!important;
		}
		.PostCopyQuote--redesignV3 .CopyPost__headerIcon {
			display:none;
		}
		
		.PostCopyQuote--redesignV3.copy_quote {
			border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha) !important;
			margin-left: 20px !important;
			/*margin-right: 20px;*/
		}
		.PostCopyQuote--redesignV3 .copy_post_header {
			padding: 0 20px;
		}
		[class^="PostContentContainer__contentContainer"]:not(.feed_wall--no-islands [class^="PostContentContainer__contentContainer"]) {
			margin: 0!important;
		}
		.Post--redesignV3 .wl_post_body_wrap:has(.PostCopyQuote--redesignV3) {
			padding:0;
		}
		.Post--redesignV3 [class^="vkitPrimaryAttachment__root"]:not(:has([href^="/video"])),.Post--redesignV3 [class^="vkitMediaGrid__root"] {
			border-radius:8px;
			box-shadow: 0 0 0 1px var(--vkui--color_separator_secondary);
		}
		.Post--redesignV3 [class^="vkitPrimaryAttachment__root"]:not(:has([href^="/video"]))[style^="--photo-primary-ratio"] {
			padding-top: min(100%,var(--photo-primary-height, 100%));
			max-width: calc(var(--photo-primary-ratio)*100%);
		}
		#wl_post.Post--redesignV3:not(:has(.PostCopyQuote--redesignV3)) [class^="PostContentContainer__contentContainer"] {
			margin-left:-18px;
		}
		.feed_wall--no-islands .PostCopyQuote--redesignV3 .copy_post_header {
			padding: 0 20px;
		}
		.Post--redesignV3 [class^="PostContentContainer__contentContainer"] .vkuiDiv:has([class^="vkitPostText__root"]) [class*="vkitSpacing__root"] {
			--spacing-gap-size: 16px!important;
		}
		.Post--redesignV3 .vkuiDiv > [style="--spacing-gap-size: 12px;"] {
       		padding:0px;
        	height: 8px;
    	}
		.vkEnhancerGeoTip .PostHeaderSubtitle--withGeo {
			display: flex;
			align-items: center;
			margin-left: 20px;
			cursor: pointer;
		}
		.vkEnhancerGeoTip .PostHeaderSubtitle--withGeo:hover {
			text-decoration:underline;
		}
		.Post--redesignV3 .PostHeaderSubtitle__geoIcon {
			padding-right: 4px;
		}
		.Post--redesignV3 .post_replies_header::before,.Post--redesignV3 .replies_list:before {
			display:none;
		}
		.Post--redesignV3 .post_replies_header {
			border-top: 1px solid var(--vkui--color_separator_primary)!important;
		}
		.vk_enhancer_copy_post_subhead {
			display:flex!important;
			align-items:center;
		}
		.PostCopyQuote--redesignV3 .CopyPost__explain {
			margin-left:2px;
		}
		.PostCopyQuote--redesignV3 .copy_post_header {
			padding: 0 12px!important;
		}
		.PostCopyQuote--redesignV3 .PostContentContainer__root {
			margin-left:-8px;
		}
		.Post--redesignV3 [class^="vkitPostText__root"] {
			font-family:var(--palette-vk-font,-apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif);
			font-size:13px;
		}
		.PostCopyQuote--redesignV3 .published_sec_quote {
			margin-left: 12px!important;
			border-left: 2px solid var(--vkui--vkontakte_color_im_forward_line_alpha) !important;
		}
		.PostCopyQuote--redesignV3 .published_sec_quote .copy_post_header_info {
			flex-direction: column;
		}
		.Post--redesignV3 [class^="vkitShowMoreText__after"] {
			position:static!important;
		}
		.Post--redesignV3 [class^="vkitShowMoreText__root"] {
			--show-more-text-blur-size: 0px!important;
			--show-more-text-after-width: auto!important;
		}
		[class*="vkitShowMoreText__rootInline"][class*="vkitShowMoreText__rootHasAfter"]:not([class*="vkitShowMoreText__rootExpanded"]) [class*="vkitShowMoreText__in"] {
			mask: linear-gradient(to top, transparent 0px, #fff 10%)
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper,.Post--redesignV3.PostHeader__coauthorAvatarWrapper {
			width:40px;
			height:40px;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar, .PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar {
			width: 30px;
			height: 30px;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar .AvatarRich, .PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar .AvatarRich, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAuthorAvatar .AvatarRich, .Post--redesignV3 .PostHeader__coauthorAvatarWrapper .PostHeader__coauthorAvatar .AvatarRich{
			width: 30px!important;
			height: 30px!important;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper {
			margin-left: 12px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_situational_theme"], .Post--redesignV3 [data-testid="feed_action_button_situational_theme"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_donut_support"], .Post--redesignV3 [data-testid="feed_action_button_donut_support"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_donut_link"], .Post--redesignV3 [data-testid="feed_action_button_donut_link"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_open_url"], .Post--redesignV3 [data-testid="feed_action_button_open_url"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_open_conversation"], .Post--redesignV3 [data-testid="feed_action_button_open_conversation"] {
			margin: 8px 20px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 [data-testid="feed_action_button_mini_app"], .Post--redesignV3 [data-testid="feed_action_button_mini_app"] {
			margin: 8px 20px;
			border-radius: 8px;
			display: none;
		}
		.PostCopyQuote--redesignV3 .vkuiDiv > .vkuiLink[class*="vkitLink__link"].vkuiTappable.vkuiTappable--hasPointer-none.vkuiClickable__resetLinkStyle[href^="http"] > .vkuiSimpleCell, .Post--redesignV3 .vkuiDiv > .vkuiLink[class*="vkitLink__link"].vkuiTappable.vkuiTappable--hasPointer-none.vkuiClickable__resetLinkStyle[href^="http"] > .vkuiSimpleCell {
			margin: 8px 0px;
			border-radius: 8px;
		}
		.PostCopyQuote--redesignV3 .PostHeader__coauthorAvatarWrapper {
			background-color: var(--vkui--color_image_placeholder)!important;
			border-radius: 100%;
			box-shadow:inset 0 0 0 var(--vkui--size_border--regular) var(--vkui--color_image_border_alpha)!important;
		}
		.Post--redesignFooterV3 .PostBottomAction.comment {
			padding-left:14px;
		}
		.Post--redesignV3 .reply:hover {
			background-color:transparent!important;
		}
		.feed_row .Post--redesignV3 .replies:has(.reply_wrap > .AvatarRich) {
			border-top: 1px solid var(--vkui--color_separator_primary)!important;
		}
		.Post--redesignV3 .reply_date:hover {
			text-decoration: underline;
		}
		.Post--redesignV3 .wl_replies_wrap::before {
			display:none;
		}
		.Post--redesignV3 .PostDateBlock__root {
			display:none;
		}
		.Post--redesignV3 .vkuiDiv:has(>[class^="vkitPrimaryAttachment__root"] [href^="https://vk.com/app"]) {
			display:none;
		}

		.post_photos.Post--redesignV3 .vkEnhancerPostDate,.post_photos.Post--redesignV3 .PostHeaderSubtitle__separator {
			display:none;
		}
		.vkitSecondaryAttachment__rootVerticalPaddingRedesign {
			padding-top: 4px;
			padding-bottom: 4px;
		}
		.vkitSecondaryAttachment__rootNoHorizontalPadding {
			padding-left: 0;
			padding-right: 0;
		}
		.vkitSecondaryAttachment__root {
			display: flex;
			align-items: center;
			text-decoration: none;
			border-radius: var(--vkui--size_border_radius--regular);
		}
		.vkitSecondaryAttachment__before {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 8px;
		}
		.vkitSecondaryAttachment__content {
			display: grid;
			grid-template-areas:
				"title progressTime"
				"description progressTime"
				"progressBar progressBar ";
			grid-template-columns: minmax(0, 1fr) auto;
			flex-grow: 1;
			min-width: 0;
		}
		.vkitSecondaryAttachment__title {
			grid-area: title;
			max-width: 100%;
		}
		.vkitTextClamp__root.vkitTextClamp__root {
			display: -webkit-box;
		}
		.vkitSecondaryAttachment__titleText {
			color: var(--vkui--color_text_primary);
			min-width: 0;
		}
		.vkitTextClamp__rootSingleLine {
			word-break: break-all;
		}
		.vkitTextClamp__root {
			overflow: hidden;
			white-space: normal;
			word-break: break-word;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: var(--vkui_internal--textclamp-lines, 1);
			line-clamp: var(--vkui_internal--textclamp-lines, 1);
		}
		.vkitSecondaryAttachment__description {
			grid-area: description;
			display: block;
			color: var(--vkui--color_text_secondary);
			min-width: 0;
			max-width: 100%;
		}
		.vkitSecondaryAttachment__after {
			margin-left: 8px;
		}
		.vkitSecondaryAction__root {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.vkitSecondaryAction__chevron,.vkEnhancer--document_outline_24 path {
			color: var(--vkui--color_icon_secondary);
		}
		.vkEnhancer--document_outline_24 {
			display:flex;
		}
		.vkEnhancerSecondaryAttach:hover {
			opacity:.8;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="https://vk.com/doc"]) {
			display:none;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="/narrative"]) {
			display:none;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="http"]:not([class*="vkitLink__secondary"])),.Post--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="/away"]:not([class*="vkitLink__secondary"])) {
			display:none;
		}
		.Post--redesignV3 [class^="vkitChipAttachment__root"] + .vkuiSpacing--m:not(:first-child) {
			display:none;
		}
		.Post--redesignV3 .vk_enhancer_in_post_audio {
			margin: 6px 20px 0px!important;
		}
		.Post--redesignV3 [class^="vkitMusicOverlayAttachment__attachment"],.Post--redesignV3 [class^="OnMediaAttachmentOverlay__attachment"] {
			display:none;
		}
		.vkEnhancerSecondaryAttachFirst {
			/*padding:8px 8px 0px 8px!important;*/
		}
		.Post--redesignV3 .vk_enhancer_article_snippet {
			margin-top:0!important;
		}
		.vkitSecondaryAttachment__after {
			margin-left: 8px;
		}
		.vkitSecondaryAction__root {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.vkitSecondaryAction__iconButtonCircle {
			color: var(--vkui--color_icon_medium);
			background: var(--vkui--color_background_secondary_alpha);
		}	
		.vkitSecondaryAction__iconButton {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 36px;
			height: 36px;
			color: var(--vkui--color_icon_secondary);
			border-radius: 50%;
		}`;
}

export default innerStyleGet;