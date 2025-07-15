const updatePhotoLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Обновить фото";
    case 1:
    case 454:
      return "Змінити фото";
    case 114:
    case 2:
      return "Змяніць фота";
    case 100:
      return "Обновить портретъ";
    case 777:
      return "Переклеить фотокарточку";
    case 97:
      return "Фотоны ауыстыру";
    default:
      return "Edit photo";
  }
};

export default updatePhotoLang;
