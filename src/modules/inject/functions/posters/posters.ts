import createStyle from "../../createStyle";
import deferredCallbackNested from "../oldPosting/deferredCallbackNested";
import posterLogic from "./posterLogic";

/*
 * Рудиментарная функция которая к тому же поддерживается только со стороны kphp
 * Удалить как только поддержка будет окончательно прекращена
 */

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

  let caretPositionSelectors = [".poster__marker_start", ".poster__marker_end"];
  document.arrive(caretPositionSelectors.join(","), { existing: true }, (e) => e.remove());

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
               }
            }

            #submit_post_box:not(.shown):has(.poster__open-btn-wrapper) {
              .page_add_media {
                right: 43px!important;
              }
              .poster__open-btn-wrapper {
                padding-left: 8px !important;
              }
            }
                
            .poster__input-msg:not(:empty) ~ .poster__placeholder {
                opacity: 0;
            }
                
            .poster__settings-btn-wrapper .PostOption {
              margin-top: 0px!important;
            }`
    );
    await posterLogic();

    let posterOpenBtnWrapper = document.createElement("div");
    posterOpenBtnWrapper.classList.add("poster__open-btn-wrapper", "poster");
    posterOpenBtnWrapper.id = "page_poster_btn";
    posterOpenBtnWrapper.style.cssText += `
      display: inline-block;
    `;

    let posterBtnLayout = document.createElement("div");
    posterBtnLayout.classList.add("poster__open-btn-layout");
    posterBtnLayout.style.marginLeft = "0px";

    let posterOpenBtn = document.createElement("div");
    posterOpenBtn.classList.add("poster__open-btn", "poster");
    posterOpenBtn.addEventListener("click", () => {
      Wall.closeFancyTooltipsInPost();
      Wall.openPosterEditor();
    });

    posterOpenBtn.setAttribute("onmouseenter", `showTooltip(this, { text: getLang('wall_poster_open_tt'), black: 1, shift: [10, 9] })`);

    posterBtnLayout.append(posterOpenBtn);
    posterOpenBtnWrapper.append(posterBtnLayout);
    let subPost = e.closest("#submit_post");
    let pAddMedia = e.closest("#page_add_media");
    if (!e.closest("#submit_post")?.querySelector(".poster__open-btn-wrapper") && subPost) subPost.insertBefore(posterOpenBtnWrapper, pAddMedia);
  });
};

export default posters;
