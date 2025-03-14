const emptyAlbumLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "В альбоме отсутствуют фото";
    case 1:
      return "У альбомі немає фотографій";
    case 454:
      return "У альбомі немає фотографій"
    case 114:
      return "У альбоме няма фатаграфій";
    case 2:
      return "У альбоме няма фатаграфій";
    case 777:
      return "В альбоме отсутствуют фото";
    case 97:
      return "Альбомда фотосуреттер жоқ";
    case 100:
      return "В альбоме отсутствуют фото";
    default:
      return "There are no photos in the album";
  }
}

export default emptyAlbumLang;