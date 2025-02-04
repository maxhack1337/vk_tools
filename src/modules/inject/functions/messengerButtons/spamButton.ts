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
        spamButton.addEventListener('click', () => {
            window.stManager.add(["im.css", "page.css", window.jsc("web/imn.js"), window.jsc("web/sorter.js")])
            showTabbedBox("al_im.php", {act: "a_spam", offset: "0", gid: 0}, {params: {width: 638}})
        });
        const spamSeparator = burgerim?.querySelector(".ActionsMenuAction__separator");
        burgerim?.insertBefore(spamButton, spamSeparator || null);
    });
}

export default spamButton;