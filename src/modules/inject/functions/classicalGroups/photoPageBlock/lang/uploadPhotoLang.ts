const uploadPhotoLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Загрузить фотографию";
    case 1:
    case 454:
      return "Завантажити фотографію";
    case 114:
    case 2:
      return "Загрузіць фотаздымак";
    case 777:
    case 100:
      return "Вклеить фотокарточку";
    case 97:
      return "Фото қою";
    default:
      return "Upload a group photo"; //Upload a profile photo
  }
};

export default uploadPhotoLang;
