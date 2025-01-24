import fromId from "../../../../content/fromId";
import getId from "../../middleName/getId";
import getLangTime from "./getLangTime";
import getMyPhotoText from "./getMyPhotoText";
import getPhotoMapText from "./getPhotoMapText";
import getStoryText from "./getStoryText";
import getUserDataPhoto from "./getUserDataPhoto";
import getUserDataReact from "./getUserDataReact";
import getUserStoriesReact from "./getUserStoriesReact";

      const replaceTabsWithPhotosModule = async() => {
        let section = document.querySelector(
          "section.vkuiInternalGroup:has(>.OwnerContentTabs)"
        );

        if (!section) {
          console.error("Элемент section не найден");
          return;
        }

        let tabs = section.querySelector(".OwnerContentTabs");

        if (!tabs) {
          console.error("Элемент OwnerContentTabs не найден");
          return;
        }

        tabs.remove();

        let photosModule = document.createElement("div");
        let ownerId = await getId();
        photosModule.classList.add("module", "clear", "photos_module");
        photosModule.id = "profile_photos_module";
        let photodata = await vkApi.api("photos.getAll", {
          owner_id: ownerId,
          count: 4,
          skip_hidden: true,
        });
        let userDataPi = await getUserDataPhoto(ownerId);
        let userNamePi = userDataPi.first_name_gen;
        photosModule.innerHTML = `
        <div class="header_right_link fl_r"></div>
        <a href="/albums${ownerId}" onclick="return showAlbums(${ownerId}, {noHistory: true}, event);" class="module_header">
            <div class="header_top clear_fix">
                <span class="header_label fl_l">${getLang?.(
                  "me_convo_attaches_type_photo"
                )} ${userNamePi}</span>
                <span class="header_count fl_l">${photodata.count}</span>
            </div>
        </a>
        <div id="page_photos_module" class="page_photos_module"></div>
    `;
        let d = document.createElement("a");
        d.classList.add("fl_r");
        d.setAttribute(
          "onclick",
          `event.preventDefault(); event.stopPropagation(); window.showBox("al_places.php", {
                    act: "photos_box",
                    uid: ${ownerId}
                }, {
                    stat: ["maps.js", window.jsc("web/places.js"), "places.css", "ui_controls.js", "ui_controls.css"]
                });`
        );
        d.style.color = "var(--vkui--color_text_secondary)";
        d.style.marginRight = "-12px";
        d.textContent = getPhotoMapText(vk.lang);
        photosModule?.querySelector(".header_top")?.appendChild(d);
        if (!photodata || !photodata.items) {
          console.error("Данные фотографий не найдены");
          return;
        }

        let pagePhotosModule = photosModule.querySelector(
          "#page_photos_module"
        );
        let countAddedPhotos = 0;
          photodata.items.forEach((item: { sizes: string | any[]; owner_id: any; id: any; }) => {
              let photoLink = item.sizes[item.sizes.length - 1].url;
              let photoId = `${item.owner_id}_${item.id}`;
              let oid = Number(item.owner_id);

              let photoElement = document.createElement("a");
              photoElement.classList.add("page_square_photo", "crisp_image");
              photoElement.dataset.photoId = photoId;
              photoElement.href = `/photo${photoId}?all=1`;
              photoElement.onclick = (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (showPhoto)
                  showPhoto(photoId, `photos(${oid})`, {
                      temp: {
                          x: photoLink,
                          y: photoLink,
                          z: photoLink,
                          w: photoLink,
                          x_: [photoLink, 604, 340],
                          y_: [photoLink, 807, 454],
                          z_: [photoLink, 1280, 720],
                          w_: [photoLink, 1920, 1080],
                          base: "",
                      },
                  });
          }

          photoElement.style.backgroundImage = `url(${photoLink})`;
          photoElement.setAttribute("aria-label", "Фотография");
          photoElement.innerHTML =
            '<span class="blind_label">Фотография</span>';
          countAddedPhotos++;
          pagePhotosModule?.appendChild(photoElement);
        });
        ///ИСТОРИИ В КЛАССИК ПРОФИЛЕ///
		
        let ownerStory = await getUserDataReact();
        let stories = await getUserStoriesReact();
        if (stories.count > 0) {
          let storyElement = document.createElement("a");
          storyElement.setAttribute(
            "onclick",
            `showStory('/owner_feed${ownerStory.id}', {source: 'post_avatar'});`
          );
          storyElement.id = "profile_story";
          storyElement.classList.add("yPVSkNQu");
          storyElement.style.backgroundPosition = "50% 50%";
          storyElement.style.backgroundRepeat = "no-repeat";
          let storyStyleImage;
          try {
            storyStyleImage = `url(${
              stories.items[0].stories[0].photo.sizes.at(-1).url
            })`;
          } catch (error) {
            storyStyleImage = `url(${
              stories.items[0].stories[0].video.image.at(-1).url
            })`;
          }
          storyElement.style.backgroundImage = storyStyleImage;
          storyElement.style.backgroundSize = "cover";
          storyElement.style.cursor = "pointer";
          storyElement.style.display = "inline-block";
          storyElement.style.height = "123px";
          storyElement.style.imageRendering = "-webkit-optimize-contrast";
          storyElement.style.marginLeft = "0px";
          storyElement.style.position = "relative";
          storyElement.style.overflow = "hidden";
          storyElement.style.textAlign = "center";
          storyElement.style.textDecoration = "none";
          storyElement.style.width = `123px`;
          storyElement.innerHTML = `<span class="EoMSGvQz"></span><div class="WezUccGf">
    <div class="JDEMGFbn"></div>
    <div class="gZFGalLh">${stories.items[0].stories.length + " " + getLangTime(stories.items[0].stories.length,getStoryText(vk.lang))}</div>
  </div>
<span class="fhwwGZRs"></span>`;
          let styleElement = fromId("vks_blur");
          if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = "vks_blur";
            document.head.appendChild(styleElement);
          }
          styleElement.id = "vks_blur";
          styleElement.innerHTML = `
  .page_square_photo.crisp_image:nth-child(5) {display:none;}
  #profile_story:after{
    background-image: ${storyStyleImage};
    filter: blur(5px);
    content: '.';
    width: 123px;
    height: 123px;
    display: inline-block;
    background-size: cover;
    background-position: center;
  }`;

          pagePhotosModule?.prepend(storyElement);
        }
        ///КОНЕЦ ИСТОРИЙ В КЛАССИК ПРОФИЛЕ///
        let photosLoadModule = document.createElement("section");
        photosLoadModule.classList.add("vkEnhancerLoadPhotoModule");
        photosLoadModule.innerHTML = `
	 <a id="photos_choose_upload_area_vkEnhancer" class="photos_choose_upload_area" title="${getLang?.(
     "market_drop_to_upload"
   )}" style="display: block;" onclick="cur.meUploadPhoto ? cur.meUploadPhoto() : document.querySelector('.ProfileTabsPhotoUploadInput').click();">
    <div class="photos_choose_upload_area_uploadvkEnhancer">
	  <svg fill="none" height="32" viewBox="0 0 56 56" width="32" xmlns="http://www.w3.org/2000/svg"><clipPath id="camera_outline_56__a"><path d="M0 0h56v56H0z"></path></clipPath><g clip-path="url(#camera_outline_56__a)" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"><path d="M19.08 6.66A4.74 4.74 0 0 1 22 5.5h12c1.21 0 2.21.6 2.92 1.16a12.69 12.69 0 0 1 2.27 2.44l.98 1.23c.13.16.48.42 1.09.63.57.21 1.22.32 1.74.32h1c2.45 0 4.5 1.27 5.87 3.14A11.86 11.86 0 0 1 52 21.44h-3c0-2.12-.6-3.97-1.54-5.24A4.27 4.27 0 0 0 44 14.28h-1c-.89 0-1.87-.18-2.75-.49-.85-.3-1.8-.8-2.42-1.59l-1.02-1.27-.33-.42a50.36 50.36 0 0 0-.12-.15c-.4-.49-.84-.98-1.31-1.36-.49-.38-.83-.5-1.05-.5H22c-.22 0-.56.12-1.05.5a9.84 9.84 0 0 0-1.33 1.39l-.1.12-.33.42-1.02 1.27a5.42 5.42 0 0 1-2.42 1.6c-.88.3-1.86.48-2.75.48h-1c-1.32 0-2.53.67-3.46 1.92A8.88 8.88 0 0 0 7 21.44H4c0-2.67.76-5.16 2.13-7.02A7.26 7.26 0 0 1 12 11.28h1c.52 0 1.17-.11 1.74-.32.61-.21.96-.47 1.09-.63l.98-1.23.53-.67c.41-.49 1.02-1.2 1.74-1.77zM17 46.5V45h21c4.72 0 6.88-1.09 8.5-2.82.66-.7 1.24-1.7 1.73-2.8.35-.78.56-1.84.66-2.9.1-1.05.11-1.99.11-2.48V21.44h3V34c0 .5 0 1.56-.12 2.76a12.73 12.73 0 0 1-3.18 7.45C46.34 46.74 43.28 48 38 48H17zm-9.72-2.3a11.69 11.69 0 0 1-2.3-3.63c-.38-.9-.6-2.35-.75-3.53A30.5 30.5 0 0 1 4 34V21.44h3V34c0 .42.07 1.5.2 2.68.15 1.22.35 2.28.55 2.75.43 1.04 1.02 2 1.72 2.72l.05.05.04.05a7.25 7.25 0 0 0 3.2 2.01c1.38.5 2.9.74 4.24.74v3c-1.67 0-3.54-.3-5.25-.91a10.25 10.25 0 0 1-4.47-2.89z"></path><path d="M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"></path></g></svg>
      <span id="photos_choose_upload_area_labelvkEnhancer" class="photos_choose_upload_area_label">
        ${getLang?.("stories_create_add_photo")}
      </span>
    </div>
    <div class="photos_choose_upload_area_dropvkEnhancer">
      <div class="photos_choose_upload_area_drop_label">
        <svg fill="none" height="56" viewBox="0 0 56 56" width="56" xmlns="http://www.w3.org/2000/svg"><clipPath id="camera_outline_56__a"><path d="M0 0h56v56H0z"></path></clipPath><g clip-path="url(#camera_outline_56__a)" clip-rule="evenodd" fill="currentColor" fill-rule="evenodd"><path d="M19.08 6.66A4.74 4.74 0 0 1 22 5.5h12c1.21 0 2.21.6 2.92 1.16a12.69 12.69 0 0 1 2.27 2.44l.98 1.23c.13.16.48.42 1.09.63.57.21 1.22.32 1.74.32h1c2.45 0 4.5 1.27 5.87 3.14A11.86 11.86 0 0 1 52 21.44h-3c0-2.12-.6-3.97-1.54-5.24A4.27 4.27 0 0 0 44 14.28h-1c-.89 0-1.87-.18-2.75-.49-.85-.3-1.8-.8-2.42-1.59l-1.02-1.27-.33-.42a50.36 50.36 0 0 0-.12-.15c-.4-.49-.84-.98-1.31-1.36-.49-.38-.83-.5-1.05-.5H22c-.22 0-.56.12-1.05.5a9.84 9.84 0 0 0-1.33 1.39l-.1.12-.33.42-1.02 1.27a5.42 5.42 0 0 1-2.42 1.6c-.88.3-1.86.48-2.75.48h-1c-1.32 0-2.53.67-3.46 1.92A8.88 8.88 0 0 0 7 21.44H4c0-2.67.76-5.16 2.13-7.02A7.26 7.26 0 0 1 12 11.28h1c.52 0 1.17-.11 1.74-.32.61-.21.96-.47 1.09-.63l.98-1.23.53-.67c.41-.49 1.02-1.2 1.74-1.77zM17 46.5V45h21c4.72 0 6.88-1.09 8.5-2.82.66-.7 1.24-1.7 1.73-2.8.35-.78.56-1.84.66-2.9.1-1.05.11-1.99.11-2.48V21.44h3V34c0 .5 0 1.56-.12 2.76a12.73 12.73 0 0 1-3.18 7.45C46.34 46.74 43.28 48 38 48H17zm-9.72-2.3a11.69 11.69 0 0 1-2.3-3.63c-.38-.9-.6-2.35-.75-3.53A30.5 30.5 0 0 1 4 34V21.44h3V34c0 .42.07 1.5.2 2.68.15 1.22.35 2.28.55 2.75.43 1.04 1.02 2 1.72 2.72l.05.05.04.05a7.25 7.25 0 0 0 3.2 2.01c1.38.5 2.9.74 4.24.74v3c-1.67 0-3.54-.3-5.25-.91a10.25 10.25 0 0 1-4.47-2.89z"></path><path d="M18 28a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm10-7a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"></path></g></svg>
        <div class="photos_choose_upload_area_drop_label_tex">${getLang?.(
          "market_drop_to_upload"
        )}</div>
      </div>
    </div>
  </a>`;
        let inserBeforeThis = document.querySelector(".WallLegacy");
        if (ownerId === vk.id) {
            section.parentElement?.insertBefore(photosLoadModule, inserBeforeThis);
            let moduleQuery = photosModule.querySelector(".header_label");
            if(moduleQuery) moduleQuery.textContent = getMyPhotoText(vk.lang);
        }
        if (countAddedPhotos !== 0) {
          section.appendChild(photosModule);
        } else if (countAddedPhotos === 0) {
          section.remove();
        }
}
      
export default replaceTabsWithPhotosModule;