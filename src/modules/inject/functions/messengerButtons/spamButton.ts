import fromId from "../../../content/fromId";

const spamButton = () => {
    document.arrive(".BurgerMenu__actionsMenu", { existing: true }, function (e) {
        var burgerim = document.querySelector(
            ".BurgerMenu__actionsMenu > div > div > div"
        );

        const spamButton = document.createElement("button");
        spamButton.classList.add("ActionsMenuAction");
        spamButton.classList.add("ActionsMenuAction--secondary");
        spamButton.classList.add("ActionsMenuAction--size-regular");
        const spamSVG =
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path d="M9.25 6.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zM10 13a.9.9 0 100 1.8.9.9 0 000-1.8z"/><path d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM3 10a7 7 0 1014 0 7 7 0 00-14 0z" fill-rule="evenodd"/></svg>';
        const spamText = getLang?.("reports_media_reason_its_spam");
        const spammerSVG = spamSVG;
        spamButton.innerHTML = `<i class="ActionsMenuAction__icon">${spammerSVG}</i><span class="ActionsMenuAction__title">${spamText}</span>`;
        spamButton.setAttribute(
            "onclick",
            'showTabbedBox("al_im.php", {act: "a_spam", offset: "0", gid: 0}, {params: {width: 638}})'
        );
        //showTabbedBox("al_im.php", {act: "a_important", offset: "0", gid: 0}, {params: {width: 638}}) Это важные сообщения, если вдруг пригодится
        let styleElementSpam = fromId("vken_spam_style");
        if (!styleElementSpam) {
            styleElementSpam = document.createElement("style");
            styleElementSpam.id = "vken_spam_style";
            document.head.appendChild(styleElementSpam);
        }
        styleElementSpam.id = "vken_spam_style";
        styleElementSpam.innerHTML = `.PagePostLimitedThumbsContainer, .page_post_sized_thumbs {
    padding: 10px 0 4px;
}a.page_post_thumb_wrap, span.page_post_thumb_wrap {
    display: block;
    overflow: hidden;
    margin: 0 5px 5px 0;
}.nim-peer.nim-peer_small .nim-peer--photo>img, .nim-peer.nim-peer_small .nim-peer--photo .im_grid>img { width: 36px; height: 36px; border-radius: 50%; -moz-force-broken-image-icon: 0; position: relative; background-color: inherit; } .nim-peer .im_grid { display: block; float: left; height:36px; } .nim-peer.nim-peer_small .nim-peer--photo { background-color: inherit; overflow: hidden; height:36px; width:36px; } .nim-peer .nim-peer--photo-w { overflow: hidden; border-radius: 50%; height:36px; width:36px; } .nim-peer.nim-peer_small { width: 36px; height: 36px; } .nim-peer { position: relative; border-color: inherit; background-color: inherit; } .im-mess-stack .im-mess-stack--photo { position: absolute; left: 43px; top: 8px; z-index: 2; } .im-mess-stack.im-mess-stack_full-date { line-height: 1.23; } .im-mess-stack { position: relative; } .im-mess-stack .im-mess-stack--content .im-mess-stack--pname { display: block; z-index: 2; font-size: 12.5px; position: absolute; left: 92px; top: 10px; color: var(--vkui--color_text_secondary); } .im-mess-stack .im-mess-stack--content .im-mess-stack--pname>a { font-weight: 700; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } .im-mess-stack .im-mess-stack--content .im-mess-stack--lnk { max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block; vertical-align: top; line-height: 1.23; color: var(--vkui--vkontakte_color_im_text_name); } .im-mess-stack.im-mess-stack_full-date .im-mess-stack--tools { position: absolute; right: 60px; margin-top: 11px; } .im-mess-stack .im-mess-stack--content .im-mess-stack--tools { color: var(--vkui--color_text_secondary); font-size: 12px; z-index: 2; margin-left: 4px; line-height: 1.4; } .im-mess-stack .im-mess-stack--mess li:last-of-type { margin-bottom: 4px; } .im-important .im-mess { padding-right: 110px; } .im-mess:not(._im_mess_callsnippet) { cursor: pointer; } .im-mess { padding: 6px 30px 7px 0; position: relative; margin: 0 7px 0 7px; } .im-mess-stack .im-mess-stack--mess .im-mess:first-child>.im-mess--text { padding-top: 21px; } .im-mess .im-mess--text { outline: 0; margin: 0 49px 0 86px; line-height: 18px; word-wrap: break-word; } .wall_module { --post-reply-block-padding: 12px; --post-reply-box-fix-padding: 2px; } .im-important-box .im-important-box--select { display: none; } .im-important { position: relative; padding: 10px 15px 40px 15px; } `;
        const spamSeparator = burgerim?.querySelector(".ActionsMenuAction__separator");
        burgerim?.insertBefore(spamButton, spamSeparator || null);
    });
}

export default spamButton;