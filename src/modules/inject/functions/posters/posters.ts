import createStyle from "../classicalProfile/scripts/createStyle";
import postingFooterLangWhatsNew from "../oldPosting/postingFooterLangWhatsNew";
import posterLogic from "./posterLogic";

const posters = () => {
    document.arrive('.poster__view', { existing: true }, function (e) {
        let ph = document.createElement('div');
        ph.classList.add('poster__placeholder');
        ph.textContent = postingFooterLangWhatsNew(vk.lang);
        e.append(ph)
    });
    document.arrive("#page_add_media > .media_selector", { existing: true }, async function (e) {
        createStyle('poster', `
            .poster__slider-item_emoji {
                background-size: 500% !important;
                background-position: top 2px right -47px!important;
                position: relative;
                border-radius: 100px;
                background-color: #fff !important;
            }
                
            .poster__btns-wrapper, .feed_post_field_wrap {
                display: block !important;
            }
                
            .poster__input-msg:not(:empty) ~ .poster__placeholder {
                opacity: 0;
            }`);
        await posterLogic();

        let posters = document.createElement('a');
        posters.classList.add('fl_r');

        let posterOpenBtnWrapper = document.createElement('div');
        posterOpenBtnWrapper.classList.add('poster__open-btn-wrapper', 'poster');
        posterOpenBtnWrapper.id = 'page_poster_btn';
        posterOpenBtnWrapper.style.cssText += `
        display: block;
        bottom: -2px;
        padding-left: 6px;
        width: 20px;
        right: 6px;
        margin-top: 0px;
        position: relative;
    `;
        
        let posterBtnLayout = document.createElement('div');
        posterBtnLayout.classList.add('poster__open-btn-layout');
        posterBtnLayout.style.marginLeft = "3px";

        let posterOpenBtn = document.createElement('div');
        posterOpenBtn.classList.add('poster__open-btn', 'poster');
        posterOpenBtn.addEventListener('click', () => {
            Wall.closeFancyTooltipsInPost();
            Wall.openPosterEditor();
        });

        posterOpenBtn.setAttribute('onmouseenter',`showTooltip(this, { text: getLang('wall_poster_open_tt'), black: 1, shift: [10, 9] })`)


        posterBtnLayout.append(posterOpenBtn);
        posterOpenBtnWrapper.append(posterBtnLayout);
        posters.append(posterOpenBtnWrapper);
        e.appendChild(posters);
    });
}

export default posters;