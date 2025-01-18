const hoverTag = () => {
    if (localStorage.getItem("isOldHover") === 'true') {
        const hoverTags = [
            'a.MessageText__link[href^="/"]',
            'a.MessageText__link[href*="vk.com"]',
        ];
        const joinTags = hoverTags.join(', ');
        document.arrive(joinTags, { existing: true }, function (e) {
            let href = e.getAttribute("href");
            let mentionId = href?.substring(href.lastIndexOf("/") + 1);

            e.setAttribute("href", href || '');
            e.classList.add("mem_link");
            e.setAttribute("mention", "");
            e.setAttribute("mention_id", mentionId || '1');
            e.removeAttribute("onclick");
            e.setAttribute(
                "onclick",
                `window.open('${href}', '_blank'); return false;`
            );
            e.setAttribute("onmouseover", "mentionOver(this)");
        });
    }
}

export default hoverTag;