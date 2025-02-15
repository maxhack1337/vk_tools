import getInterestingLang from "./getInterestingLang";

const feedReorder = async () => {
        let onOff = localStorage.getItem('feedValue') || 'recent';

        let filters = document.getElementById('feed_filters');

        let pageBlock = document.createElement('div');
        pageBlock.classList.add('page_block', 'vkToolsFeedFilter');

        let uiTogglerWrap = document.createElement('div');
        uiTogglerWrap.classList.add('ui_toggler_wrap', 'hot');

        let uiToggler = document.createElement('div')
        uiToggler.classList.add('_ui_toggler', 'ui_toggler',onOff === 'top' ? 'on' : 'vkToolsOff');

        let uiTogglerLabel = document.createElement('div');
        uiTogglerLabel.classList.add('ui_toggler_label');
        uiTogglerLabel.textContent = getInterestingLang(vk.lang);

        uiTogglerWrap.addEventListener('click', async function (event) {
            let onOffReverse = onOff === 'top' ? 'recent' : 'top';
            localStorage.setItem('feedValue',onOffReverse);
            if (onOffReverse === 'top') {
                uiToggler.classList.remove('on');
            } else {
                uiToggler.classList.add('on');
            }
            await vkApi.api('newsfeed.setFeedType', { type: onOffReverse, section: 'news' });
            nav.reload();
        });
        uiTogglerWrap.append(uiToggler, uiTogglerLabel);
        pageBlock.append(uiTogglerWrap);

        if (!document.querySelector('.vkToolsFeedFilter')) {
            filters?.prepend(pageBlock);
        } else {
            document.querySelector('.vkToolsFeedFilter .ui_toggler')!.className = `_ui_toggler ui_toggler ${onOff === 'top' ? 'on' : 'vkToolsOff'}`;
        }
}

export default feedReorder;