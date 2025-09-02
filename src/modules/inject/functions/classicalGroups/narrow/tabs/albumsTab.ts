import getPhotoAlbumLang from "../../../classicalProfile/scripts/getPhotoAlbumLang";

interface AlbumItem {
  owner_id: number;
  thumb_id: number;
  id: number;
  size: number;
  title: string;
  description?: string;
}

interface AlbumsResponse {
  count: number;
  items: AlbumItem[];
}

const albumsTab = async (albumsGetter: AlbumsResponse, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", getPhotoAlbumLang(vk.lang));

  const moduleDiv = document.createElement("div");
  moduleDiv.classList.add("module", "clear", "album_module", "_module");
  moduleDiv.id = "public_albums";

  const headerRightLink = document.createElement("div");
  headerRightLink.classList.add("header_right_link", "fl_r");
  if (isOwner) {
    const lnk = document.createElement("a");
    lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
    lnk.href = `/albums${albumsGetter.items.length > 0 ? albumsGetter.items[0].owner_id : ""}`;
    headerRightLink.append(lnk);
  }
  moduleDiv.appendChild(headerRightLink);

  const headerLink = document.createElement("a");
  headerLink.classList.add("module_header");
  headerLink.href = `/albums${albumsGetter.items.length > 0 ? albumsGetter.items[0].owner_id : ""}`;

  const headerTop = document.createElement("div");
  headerTop.classList.add("header_top", "clear_fix");

  const headerLabel = document.createElement("span");
  headerLabel.classList.add("header_label", "fl_l");
  headerLabel.textContent = getPhotoAlbumLang(vk.lang);

  const headerCount = document.createElement("span");
  headerCount.classList.add("header_count", "fl_l");
  headerCount.textContent = albumsGetter.count.toString();

  headerTop.appendChild(headerLabel);
  headerTop.appendChild(headerCount);
  headerLink.appendChild(headerTop);
  moduleDiv.appendChild(headerLink);

  const moduleBody = document.createElement("div");
  moduleBody.classList.add("module_body", "clear_fix");

  const albumsToShow = albumsGetter.items.slice(0, 2);

  for (const item of albumsToShow) {
    let thumbSrc = "https://vk.ru/images/camera_big.png";

    try {
      const thumb = await vkApi.api("photos.get", {
        owner_id: item.owner_id,
        photo_ids: item.thumb_id,
        album_id: item.id,
      });
      if (thumb.items?.[0]?.sizes?.length) {
        thumbSrc = thumb.items[0].sizes[thumb.items[0].sizes.length - 1].url;
      }
    } catch {}

    const pageAlbumRow = document.createElement("div");
    pageAlbumRow.classList.add("clear_fix", "clear", "page_album_row");

    const albumLink = document.createElement("a");
    albumLink.classList.add("page_album_link");
    albumLink.href = `/album${item.owner_id}_${item.id}`;
    albumLink.setAttribute("onclick", `return nav.change({z: 'album${item.owner_id}_${item.id}'}, event)`);

    const thumbWrap = document.createElement("div");
    thumbWrap.classList.add("page_album_thumb_wrap");

    const img = document.createElement("img");
    img.classList.add("page_album_thumb");
    img.src = thumbSrc;
    img.alt = item.title || "";

    thumbWrap.appendChild(img);
    albumLink.appendChild(thumbWrap);

    const albumTitle = document.createElement("div");
    albumTitle.classList.add("page_album_title");

    const albumSize = document.createElement("div");
    albumSize.classList.add("page_album_size");
    albumSize.textContent = item.size.toString();

    const albumTitleText = document.createElement("div");
    albumTitleText.classList.add("page_album_title_text");
    albumTitleText.title = item.title || "";
    albumTitleText.textContent = item.title || "";

    albumTitle.appendChild(albumSize);
    albumTitle.appendChild(albumTitleText);

    if (item.description) {
      const albumDesc = document.createElement("div");
      albumDesc.classList.add("page_album_description");
      albumDesc.textContent = item.description;
      albumTitle.appendChild(albumDesc);
    }

    albumLink.appendChild(albumTitle);
    pageAlbumRow.appendChild(albumLink);

    const bgA = document.createElement("a");
    bgA.classList.add("bg");
    pageAlbumRow.appendChild(bgA);

    moduleBody.appendChild(pageAlbumRow);
  }

  moduleDiv.appendChild(moduleBody);
  aside.appendChild(moduleDiv);

  return aside;
};

export default albumsTab;
