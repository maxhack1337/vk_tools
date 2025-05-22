const photoUploadError = (lang: number) => {
  switch (lang) {
    case 0:
      return "Произошла ошибка при загрузке фото";
    case 1:
      return "Сталася помилка під час завантаження фото";
    case 454:
      return "Сталася помилка під час завантаження фото";
    case 114:
      return "Адбылася памылка пры загрузцы фота";
    case 2:
      return "Адбылася памылка пры загрузцы фота";
    case 777:
      return "Произошла оказия при загрузке фотокарточки";
    case 97:
      return "Суретті жүктеу кезінде қате орын алды";
    case 100:
      return "Произошла ошибка при загрузке фото";
    default:
      return "An error occurred while uploading the photo";
  }
};

export default photoUploadError;
