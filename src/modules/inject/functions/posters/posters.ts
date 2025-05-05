import createStyle from "../classicalProfile/scripts/createStyle";
import deferredCallbackNested from "../oldPosting/deferredCallbackNested";
import posterLogic from "./posterLogic";

const posters = () => {
  document.arrive(".poster__view", { existing: true }, function (e) {
    let ph = document.createElement("div");
    ph.classList.add("poster__placeholder");

    let fieldMessage = e.querySelector("#poster-field-msg") as HTMLElement;
    ph.textContent = post_field.getAttribute("aria-label");
    deferredCallbackNested(
      () => {
        setTimeout(() => {
          ph.style.color = fieldMessage?.style.color ? fieldMessage?.style.color : "#000";
        }, 100);
      },
      { variablePath: "cur.poster._activeBackground" }
    );
    if (!e.querySelector(".poster__placeholder")) e.append(ph);
  });
  document.arrive("#page_add_media > .media_selector", { existing: true }, async function (e) {
    createStyle(
      "poster",
      `               
            .poster__btns-wrapper, .feed_post_field_wrap {
                display: block !important;
            }

            .submit_post_box.shown {
               #page_add_media > .media_selector {
                    display: flex !important;
                    .fl_r:has(>.poster__open-btn-wrapper) {
                        order: -1;
                        .poster__open-btn-wrapper {
                            margin-right: 0 !important;
                        }
                    }
               }
            }
                
            .poster__input-msg:not(:empty) ~ .poster__placeholder {
                opacity: 0;
            }`
    );
    await posterLogic();

    let posters = document.createElement("a");
    posters.classList.add("fl_r");

    let posterOpenBtnWrapper = document.createElement("div");
    posterOpenBtnWrapper.classList.add("poster__open-btn-wrapper", "poster");
    posterOpenBtnWrapper.id = "page_poster_btn";
    posterOpenBtnWrapper.style.cssText += `
        display: block;
        bottom: -2px;
        padding-left: 6px;
        width: 20px;
        right: 6px;
        margin-top: 0px;
        position: relative;
    `;

    let posterBtnLayout = document.createElement("div");
    posterBtnLayout.classList.add("poster__open-btn-layout");
    posterBtnLayout.style.marginLeft = "3px";

    let posterOpenBtn = document.createElement("div");
    posterOpenBtn.classList.add("poster__open-btn", "poster");
    posterOpenBtn.addEventListener("click", () => {
      Wall.closeFancyTooltipsInPost();
      Wall.openPosterEditor();
    });

    posterOpenBtn.setAttribute("onmouseenter", `showTooltip(this, { text: getLang('wall_poster_open_tt'), black: 1, shift: [10, 9] })`);

    posterBtnLayout.append(posterOpenBtn);
    posterOpenBtnWrapper.append(posterBtnLayout);
    posters.append(posterOpenBtnWrapper);
    if (!e.querySelector(".poster__open-btn-wrapper")) e.appendChild(posters);
  });
};

export default posters;
