import fromId from "../../../../../content/fromId";
import { escapeHtml } from "../../../../escapeHtml";
import getId from "../../../middleName/getId";
import getLangTime from "../getLangTime";
import getMyPhotoText from "../getMyPhotoText";
import getPhotoMapText from "../getPhotoMapText";
import getStoryText from "../getStoryText";
import photosLoadModule from "./photosLoadModule";
import getUserDataReactSpa from "../spa/getUserDataReactSpa";
import getUserStoriesReactSpa from "../spa/getUserStoriesReactSpa";

const replaceTabsWithPhotosModule = async () => {
  let section = document.querySelector("section.vkuiInternalGroup:has(>.OwnerContentTabs)");

  if (!section) {
    console.error("[VK Tools Error] PhotoModule: Элемент section не найден");
    return;
  }
  section.classList.add("vkToolsNoSeparator");
  let tabs = section.querySelector(".OwnerContentTabs");

  if (!tabs) {
    console.error("[VK Tools Error] PhotoModule: Элемент OwnerContentTabs не найден");
    return;
  }

  (tabs as HTMLElement).style.display = "none";

  let photoModuleSkeletonSkeleton = document.createElement("div");
  photoModuleSkeletonSkeleton.classList.add("vkToolsPhotoModuleSkeleton");
  photoModuleSkeletonSkeleton.innerHTML = `
        <div class="header_right_link fl_r"></div>
        <a class="module_header">
            <div class="header_top clear_fix">
                <span class="header_label fl_l">Фотографии чтотытутзабыл--</span>
                <span class="header_count fl_l">99</span>
            <a class="fl_r showmap">показать на карт--</a></div>
        </a>
        <div id="page_photos_module" class="page_photos_module">
        <a class="page_square_photo crisp_image"><span class="blind_label"></span></a>
        <a class="page_square_photo crisp_image"><span class="blind_label"></span></a>
        <a class="page_square_photo crisp_image"><span class="blind_label"></span></a>
        <a class="page_square_photo crisp_image"><span class="blind_label"></span></a>
        </div>`;

  section.append(photoModuleSkeletonSkeleton);

  let photosModule = document.createElement("div");
  let ownerId = await getId();
  photosModule.classList.add("module", "clear", "photos_module", "vkToolsPhotoModule");
  photosModule.id = "profile_photos_module";
  let photodata = await vkApi.api("photos.getAll", {
    owner_id: ownerId,
    count: 4,
    skip_hidden: true,
  });
  let userDataPi = await getUserDataReactSpa();
  let userNamePi = userDataPi.first_name_gen;
  photosModule.innerHTML = `
        <div class="header_right_link fl_r"></div>
        <a href="/albums${ownerId}" onclick="return showAlbums(${ownerId}, {noHistory: true}, event);" class="module_header">
            <div class="header_top clear_fix">
                <span class="header_label fl_l">${getLang?.("me_convo_attaches_type_photo")} ${escapeHtml(userNamePi)}</span>
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
    console.error("[VK Tools Error] PhotoModule: Данные фотографий не найдены");
    return;
  }

  let pagePhotosModule = photosModule.querySelector("#page_photos_module");
  let countAddedPhotos = 0;
  photodata.items.forEach((item: { sizes: string | any[]; owner_id: any; id: any }) => {
    let photoLink = item.sizes[item.sizes.length - 1].url;
    let photoId = `${item.owner_id}_${item.id}`;

    let photoElement = document.createElement("a");
    photoElement.classList.add("page_square_photo", "crisp_image");
    photoElement.dataset.photoId = photoId;
    photoElement.href = `/photo${photoId}?all=1`;
    photoElement.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (showPhoto) showPhoto(photoId, ``, {});
    };

    photoElement.style.backgroundImage = `url(${photoLink})`;
    photoElement.setAttribute("aria-label", "Фотография");
    photoElement.innerHTML = '<span class="blind_label">Фотография</span>';
    countAddedPhotos++;
    pagePhotosModule?.appendChild(photoElement);
  });
  ///ИСТОРИИ В КЛАССИК ПРОФИЛЕ///

  let stories = await getUserStoriesReactSpa();
  if (stories.count > 0) {
    let storyElement = document.createElement("a");
    storyElement.setAttribute("onclick", `showStory('/owner_feed${userDataPi.id}', {source: 'post_avatar'});`);
    storyElement.id = "profile_story";
    storyElement.classList.add("yPVSkNQu");
    storyElement.style.backgroundPosition = "50% 50%";
    storyElement.style.backgroundRepeat = "no-repeat";
    let storyStyleImage;
    try {
      storyStyleImage = `url(${stories.items[0].stories[0].photo.sizes.at(-1).url})`;
    } catch (error) {
      storyStyleImage = `url(${stories.items[0].stories[0].video.image.at(-1).url})`;
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
    <div class="gZFGalLh">${stories.items[0].stories.length + " " + getLangTime(stories.items[0].stories.length, getStoryText(vk.lang))}</div>
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
  if (ownerId === vk.id && !document.querySelector(".vkEnhancerLoadPhotoModule")) {
    let inserBeforeThis = document.querySelector(".WallLegacy");
    section.parentElement?.insertBefore(photosLoadModule(), inserBeforeThis);
    let moduleQuery = photosModule.querySelector(".header_label");
    if (moduleQuery) moduleQuery.textContent = getMyPhotoText(vk.lang);
  }
  if (countAddedPhotos !== 0) {
    let pModuleSkeleton = document.querySelector(".vkToolsPhotoModuleSkeleton");
    if (pModuleSkeleton) pModuleSkeleton?.remove();
    section.appendChild(photosModule);
  } else if (countAddedPhotos === 0) {
    (section as HTMLElement).style.display = "none";
  }
};

export default replaceTabsWithPhotosModule;
