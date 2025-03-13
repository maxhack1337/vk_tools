const getPhotoAlbumLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Фотоальбомы";
    case 1:
      return "Фотоальбоми";
    case 454:
      return "Фотоальбоми";
    case 114:
      return "Фотаальбомы";
    case 2:
      return "Фотаальбомы";
    case 777:
      return "Фотоальбомы";
    case 97:
      return "Фотоальбомдар";
    case 100:
      return "Фотоальбомы";
    default:
      return "Photo albums";
  }
}

export default getPhotoAlbumLang;