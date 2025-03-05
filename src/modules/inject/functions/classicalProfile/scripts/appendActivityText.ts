import fromId from "../../../../content/fromId";
import showSnackbar from "../../../components/snackbar/snackbar";
import deferredCallback from "../../../defferedCallback";
import { escapeHtml } from "../../../escapeHtml";
import appearVariable from "./appearVariable";
import changeBroadcastState from "./changeBroadcastState";
import getIdAntiAsync from "./getIdAntiAsync";
import getPhotoEditHash from "./getPhotoEditHash";
import getUserDataPhoto from "./getUserDataPhoto";
import refreshLocForMini from "./refreshLocForMini";

      const appendActivityText = (activityText: string | null) => {
        getIdAntiAsync().then((objectId) => {
          let broadcast = document.querySelector(".ProfileInfo__broadcast");
          if (!broadcast) {
            if (vk.id !== objectId) {
              let activitySpan = document.createElement("span");
              activitySpan.classList.add("page_current_info");
              activitySpan.classList.add("current_text");
              activitySpan.classList.add("vkToolsActivityText");
              activitySpan.textContent = activityText;

              let ownerPageName = document.getElementById("owner_page_name");
              if(!document.querySelector(".vkToolsActivityText")) ownerPageName?.insertAdjacentElement("afterend", activitySpan);
            } else {
              let ip_h = vk.ip_h;
              let activitySpan = document.createElement("div");
              activitySpan.style.width = "100%";
              if (activityText !== "") {
                activitySpan.innerHTML =
                  '<div class="page_current_info" id="page_current_info"><div id="currinfo_editor" class="page_status_editor clear" onclick="cancelEvent(event)" style="display: none;"> <div class="editor"> <div class="page_status_input_wrap _emoji_field_wrap"> <div class="emoji_smile_wrap _emoji_wrap"> <div class="emoji_smile _emoji_btn" role="button" title="' +
                  getLang?.("global_emoji_hint") +
                  '" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);" aria-label="Добавить эмодзи или стикер"> <div class="emoji_smile_icon_inline_svg emoji_smile_icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49s1.39-.25 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13c-.27.33-.61.6-.97.83a5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" fill="currentColor"></path></svg></div> </div> </div> <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox">' +
                  escapeHtml(activityText) +
                  '</div> </div> <div class="page_status_audio checkbox" id="currinfo_audio" onclick="checkbox(this);" role="checkbox" aria-checked="false" tabindex="0">' +
                  getLang?.("profile_broadcast_audio_status") +
                  '</div> <div class="page_status_app checkbox on unshown" id="currinfo_app" onclick="checkbox(this); Profile.appStatusUpdate(`' +
                  ip_h +
                  '`)" role="checkbox" aria-checked="true" tabindex="0">Показывать приложение в статусе</div> <button class="flat_button button_small page_status_btn_save" id="currinfo_save">' +
                  getLang?.("Save") +
                  '</button> </div> </div> <div id="currinfo_wrap" onclick="return Page.infoEdit();" tabindex="0" role="button" style="display: block;"> <span id="current_info" class="current_info"><span class="my_current_info"><span class="current_text">' +
                  escapeHtml(activityText) +
                  '</span></span></span> </div> <div id="currinfo_fake" style="display: none;"><span class="my_current_info"><span class="current_text">' +
                  escapeHtml(activityText) +
                  "</span></span></div></div>";
              } else {
                activitySpan.innerHTML =
                  '<div class="page_current_info" id="page_current_info"><div id="currinfo_editor" class="page_status_editor clear" onclick="cancelEvent(event)" style="display: none;"> <div class="editor"> <div class="page_status_input_wrap _emoji_field_wrap"> <div class="emoji_smile_wrap _emoji_wrap"> <div class="emoji_smile _emoji_btn" role="button" title="' +
                  getLang?.("global_emoji_hint") +
                  '" onmouseenter="return Emoji.show(this, event);" onmouseleave="return Emoji.hide(this, event);" onclick="return cancelEvent(event);" aria-label="Добавить эмодзи или стикер"> <div class="emoji_smile_icon_inline_svg emoji_smile_icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.44 14.3a.9.9 0 0 1 1.26.13c.01.02.2.22.53.43.38.24.97.49 1.77.49s1.39-.25 1.77-.49c.2-.12.39-.26.53-.43a.9.9 0 0 1 1.4 1.13c-.27.33-.61.6-.97.83a5.1 5.1 0 0 1-2.73.76 5.1 5.1 0 0 1-2.73-.76 3.99 3.99 0 0 1-.97-.83.9.9 0 0 1 .14-1.26zm1.81-4.05a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8zM3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0z" fill="currentColor"></path></svg></div> </div> </div> <div class="page_status_input" id="currinfo_input" contenteditable="true" role="textbox"></div> </div> <div class="page_status_audio checkbox" id="currinfo_audio" onclick="checkbox(this);" role="checkbox" aria-checked="false" tabindex="0">' +
                  getLang?.("profile_broadcast_audio_status") +
                  '</div> <div class="page_status_app checkbox on unshown" id="currinfo_app" onclick="checkbox(this); Profile.appStatusUpdate(`' +
                  ip_h +
                  '`)"="" role="checkbox" aria-checked="true" tabindex="0">Показывать приложение в статусе</div> <button class="flat_button button_small page_status_btn_save" id="currinfo_save" style="">' +
                  getLang?.("Save") +
                  '</button> </div> </div> <div id="currinfo_wrap" onclick="return Page.infoEdit();" tabindex="0" role="button" style="display: block;"> <span id="current_info" class="current_info"><span class="no_current_info">' +
                  getLang?.("change_current_info") +
                  '</span></span> </div> <div id="currinfo_fake" style="display: none;"><span class="no_current_info">' +
                  getLang?.("change_current_info") +
                  "</span></div></div>";
              }
              let ownerPageName = document.getElementById("owner_page_name");
              ownerPageName?.insertAdjacentElement("afterend", activitySpan);
              let checkBoxChecked;
              document.arrive("#currinfo_audio", { existing: true }, function (
                e
              ) {
                e.addEventListener("click", function () {
                  checkBoxChecked = e.getAttribute("aria-checked");
                  let saveButtonStatus = document.querySelector(
                    "#currinfo_save"
                  );
                  if (checkBoxChecked === "true") {
                    let statusInput = document.querySelector(
                      ".page_status_input"
                    );
                    statusInput?.setAttribute("contenteditable", 'false');
                    saveButtonStatus?.addEventListener(
                      "click",
                      changeBroadcastState
                    );
                  } else {
                    let statusInput = document.querySelector(
                      ".page_status_input"
                    );
                    statusInput?.setAttribute("contenteditable", 'true');
                    saveButtonStatus?.removeEventListener(
                      "click",
                      changeBroadcastState
                    );
                  }
                });
              });
              document.arrive(
                ".ProfileBroadcast__checkbox",
                { existing: true },
                function (e) {
                  e.addEventListener("click", () => {
                    page.audioStatusUpdate(window.vk.statusExportHash);
                  });
                }
              );
            }
          }
          if (vk.id === objectId) {
            let pHeaderAva = document.querySelectorAll(".OwnerPageAvatar")[1];
            pHeaderAva.remove();
            let pHeaderAva1 = document.querySelectorAll(
              ".ProfileHeader__ava"
            )[1] as HTMLElement;
            pHeaderAva1.style.position = "relative";
            pHeaderAva1.style.left = "-200px";
            let pHeaderIn = document.querySelectorAll(".ProfileHeader__in")[1];
            let ownerPhotoWrap = document.createElement("div");
            ownerPhotoWrap.classList.add("owner_photo_wrap");
            ownerPhotoWrap.classList.add("actions_with_effects");
            ownerPhotoWrap.style.zIndex = "10";
            ownerPhotoWrap.style.position = "relative";
            ownerPhotoWrap.style.left = "-8px";
            ownerPhotoWrap.style.top = "-5px";
            ownerPhotoWrap.id = "owner_photo_wrap";
            let userDataOwner: { photo_id: string; photo_200: any; } | null = null;
            getUserDataPhoto(vk.id).then((e) => {
              userDataOwner = e;
              let userPhotoAva = userDataOwner?.photo_id;
              let photo200 = userDataOwner?.photo_200;
              deferredCallback(
                () => {
                  try {
                    ownerPhotoWrap.innerHTML =
                      `<div class="owner_photo_top_bubble_wrap"> <div class="owner_photo_top_bubble"> <div class="ui_thumb_x_button" onclick="showFastBox(getLang('global_warning'), getLang('profile_really_delete_photo'), getLang('global_delete'),()=>{ vkApi.api('users.get',{fields:'photo_id'}).then(e=>{ vkApi.api('photos.delete',{owner_id:` +
                      vk.id +
                      `,photo_id:` +
                      userDataOwner?.photo_id.split("_")[1] +
                      `}).then(e=>{ window.curBox().hide(true);nav.reload(); }) }) },getLang('global_cancel'))" data-title=` +
                      getLang?.("profile_delete_photo") +
                      ` onmouseover="showTitle(this);" tabindex="0" role="button" aria-label=` +
                      getLang?.("profile_delete_photo") +
                      `> <div class="ui_thumb_x"></div> </div> </div> </div> <div class="page_avatar_wrap" id="page_avatar_wrap"> <aside aria-label="Фотография"> <div id="page_avatar" class="page_avatar"><a id="profile_photo_link" href="https://vk.com/photo` +
                      userPhotoAva +
                      `" onclick="return showPhoto('` +
                      userPhotoAva +
                      `', 'album` +
                      vk.id +
                      `_0/rev', {&quot;temp&quot;:{&quot;x&quot;:&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,&quot;y&quot;:&quot;` +
                      photo200 +
                      `;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,&quot;z&quot;:&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;w&quot;:&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,&quot;x_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=0449f67717df7848702286a3d078dbf3&amp;type=album&quot;,604,499],&quot;y_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=850d65bf30f3e8721f1a76410c013d90&amp;type=album&quot;,807,667],&quot;z_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;w_&quot;:[&quot;` +
                      photo200 +
                      `&amp;quality=95&amp;sign=b773a90b10ef745b855e460559bff0d3&amp;type=album&quot;,1080,893],&quot;base&quot;:&quot;&quot;},&quot;jumpTo&quot;:{&quot;z&quot;:&quot;albums` +
                      vk.id +
                      `&quot;}}, event)"><img class="page_avatar_img" src="` +
                      photo200 +
                      `"></a> </div> </aside> </div> <div class="owner_photo_bubble_wrap"> <div class="owner_photo_bubble"> <div class="owner_photo_bubble_action owner_photo_bubble_action_update" data-task-click="Page/owner_new_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` +
                      vk.id +
                      `}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">` +
                      getLang?.("profile_update_photo") +
                      `</span> </div> <div class="owner_photo_bubble_action owner_photo_bubble_action_crop" data-task-click="Page/owner_edit_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` +
                      vk.id +
                      `,&quot;hash&quot;:&quot;` +
                      getPhotoEditHash() +
                      `&quot;}" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">` +
                      getLang?.("profile_edit_small_copy") +
                      `</span> </div> <div class="owner_photo_bubble_action owner_photo_bubble_action_effects" onclick="Page.ownerPhotoEffects('` +
                      userPhotoAva +
                      `', ` +
                      vk.id +
                      `)" tabindex="0" role="button"> <span class="owner_photo_bubble_action_in">` +
                      getLang?.("profile_photo_action_effects") +
                      `</span> </div> </div> </div>`;
                  } catch (error) {
                    ownerPhotoWrap.innerHTML =
                      `<div class="page_avatar_wrap" id="page_avatar_wrap"> <aside aria-label="Фотография"> <div id="page_avatar" class="page_avatar"> <a id="profile_photo_link"><img class="page_avatar_img" src="` +
                      photo200 +
                      `"></a> </div> </aside> </div> <a class="owner_photo_bubble_action owner_photo_bubble_action_update owner_photo_no_ava" data-task-click="Page/owner_new_photo" data-options="{&quot;useNewForm&quot;:true,&quot;ownerId&quot;:` +
                      vk.id +
                      `}" tabindex="0" role="button" style="
    position: absolute;
    top: 0px;
    padding: 0 0px;
    width: 100%;
    height: 206px;
    text-align: center;
"> <span class="loadPhoto" style="line-height: 360px;">` +
                      getLang?.("profile_load_photo") +
                      `</span> </a>`;
                    let styleElement = fromId("vkenNoAva");
                    if (!styleElement) {
                      styleElement = document.createElement("style");
                      styleElement.id = "vkenNoAva";
                      document.head.appendChild(styleElement);
                    }
                    styleElement.id = "vkenNoAva";
                    styleElement.innerHTML = `.owner_photo_bubble_wrap:has(>.owner_photo_bubble>.owner_photo_no_ava){margin-top:-35px;height:36px;}`;
                  }
                  if (!getPhotoEditHash()) {
                    console.info(
                      "[VK Tools] Failed to parse PhotoEditHash. Location will be rebooted if you try to edit photo"
                    );
                    try {
                      let rebootThis = ownerPhotoWrap.querySelector(
                        '[data-task-click="Page/owner_edit_photo"]'
                      );
                      rebootThis?.addEventListener('click', () => {
                        showSnackbar(
                          {
                            text: getLang?.('global_error_occured').toString() || 'Произошла ошибка',
                            subtitle: refreshLocForMini(vk.lang),
                            timeout: 4000,
                            icon: 'error'
                          });
                        window.location.reload();
                      }
                      );
                    } catch (error) {}
                  }
                },
                { variable: "MECommonContext" }
              );
              pHeaderIn.prepend(ownerPhotoWrap);
            });
          }
          appearVariable();
        });
}
      
export default appendActivityText;