import createStyle from "../classicalProfile/scripts/createStyle";
import removeStyle from "../classicalProfile/scripts/removeStyle";
import createRightMenuItem from "./createRightMenuItem";
import getEventsLabel from "./getEventsLabel";
import getPopularLabel from "./getPopularLabel";
import getSubText from "./getSubText";
import redirectIfNeeded from "./redirectIfNeeded";

const oldGroupsPage = () => {

    const rMenuTabs = [
        ["ui_rmenu_all", "/groups/my_all_groups", getLang?.("video_catalog_action_label_owner_groups").toString() || 'Мои сообщества', false],
        ["ui_rmenu_events", "/groups/my_events", getEventsLabel(vk.lang), true],
        ["ui_rmenu_search", "/search/communities", getLang?.("groups_search_communities").toString() || 'Поиск сообществ', false],
        ["ui_rmenu_recommendations", "/groups?act=recommendations", getLang?.("me_recommendations"), false],
        ["ui_rmenu_category0", "/groups/side/trends", getPopularLabel(vk.lang), false],
    ];

    let innerStyle = `
                [class^="vkitRightMenu__container"] > div:not(.ui_rmenu_sep), [class^="vkitRightMenu__container"] > [class^="vkitRightMenuItem__container"] {
                    display:none;
                }

                .vkToolsClubCreateButton > a {
                    display: block!important;
                }

                [class^="vkuiRichCell__host"] {
                    border-bottom: 1px solid var(--vkui--color_separator_primary_alpha);
                }

                [class^="vkuiRichCell__host"] > [class^="vkuiRichCell__contentAfter"] {
                    margin-top: -42px;
                }

                body:has([id^="catalog-action"]) {
                    .vkui__root:has(.vkuiInternalSearch) {
                            [class^="vkitGroup__group"]:has( > .vkuiInternalSearch) {
                                position: absolute;
                                z-index:1;
                                width:507px;
                                top:60px;
                                padding:2px;
                                left: 20px;
                            }
                            [data-testid="list"] [class=""]{
                                margin-top:48px;
                            }
        
                            [class^="vkitTwoColumnLayoutMain__root"] > .vkuiGroup__separatorSibling {
                                display:none;
                            }
                        }
                    }
            `;

    if (localStorage.getItem("oldClubs") === "true") {
        redirectIfNeeded();
        document.arrive('#l_gr', {
            existing: true
        }, async function (e) {
            let hrefElement = e.querySelector('[href="/groups"]') as HTMLAnchorElement;
            if(hrefElement) hrefElement.href = "/groups/my_all_groups";
        });
        document.arrive('a[href="/groups_create"]', {
            existing: true
        }, async function (e) {
            if(!document.querySelector('.vkToolsClubCreateButton'))
            document.arrive('.vkuiTabs__in [id^="catalog-action"]', { existing: true }, function (s) {
                if (!document.querySelector('.vkToolsClubCreateButton')) {
                    let tabs = s.closest('.vkuiTabs__in:has([id^="catalog-action"])');
                    let button = e as HTMLElement;
                    let buttonDiv = document.createElement('div');
                    buttonDiv.style.display = "flex";
                    buttonDiv.style.alignItems = "center";
                    buttonDiv.style.flexWrap = "nowrap";
                    buttonDiv.style.marginLeft = "auto";
                    buttonDiv.classList.add('vkToolsClubCreateButton');
                    if (button) {
                        let clonedButton = button.cloneNode(true) as HTMLAnchorElement;
                        clonedButton.href = "/groups/my_all_groups?w=groups_create_new";
                        button.style.display = "none";
                        clonedButton.style.minHeight = "28px";
                        buttonDiv.appendChild(clonedButton)
                        tabs?.appendChild(buttonDiv);
                    }
                }
            });
            
            document.arrive('.vkuiRichCell__bottom', { existing: true }, function (s) {
                let subText = s.querySelector('[class^="vkitgetColorClass__colorTextSecondary"]');
                if (subText) subText.textContent = getSubText(s as HTMLElement).toString();
                else return;
            });

            let rightMenu = document.querySelector('[class^="vkitRightMenu__container"]');
            createStyle('rightMenuRemoveItems', innerStyle);

            nav.subscribeOnModuleEvaluated(async () => {
                if (cur.module !== 'community_catalog' && !window.location.pathname.includes('/groups')) {
                    removeStyle('rightMenuRemoveItems')
                } else {
                createStyle('rightMenuRemoveItems', innerStyle);};
            });
            if (rightMenu) {
                rMenuTabs.forEach(rMenuTab => {
                    const tabId = typeof rMenuTab[0] === 'string' ? rMenuTab[0] : ''; 
                    const tabUrl = typeof rMenuTab[1] === 'string' ? rMenuTab[1] : ''; 
                    const tabLabel = typeof rMenuTab[2] === 'string' ? rMenuTab[2] : '';
                    const tabFlag = typeof rMenuTab[3] === 'boolean' ? rMenuTab[3] : false;
                    let isSelected = false;
                    switch (window.location.pathname) {
                        case "/groups/my_all_groups":
                            {
                                if (tabId === "ui_rmenu_all") isSelected = true;
                                break;
                            }
                        case "/groups/my_events":
                            {
                                if (tabId === "ui_rmenu_events") isSelected = true;
                                break;
                            }
                        case "/groups":
                            {
                                if (tabId === "ui_rmenu_recommendations") isSelected = true;
                                break;
                            }
                        case "/groups/side/trends":
                            {
                                if (tabId === "ui_rmenu_category0") isSelected = true;
                                break;
                            }
                    }
                    if (tabId === "ui_rmenu_category0" && !document.getElementById(tabId)) {
                        let separator = document.createElement('div');
                        separator.className = "ui_rmenu_sep";
                        rightMenu?.append(separator);
                    }
                    if(!document.getElementById(tabId)) rightMenu?.append(createRightMenuItem(tabId, tabUrl, tabLabel, tabFlag, isSelected));
                });
            }
            
        }
        );
    }
}

export default oldGroupsPage;