const photoUploadSuccess = (lang: number) => {
  switch (lang) {
    case 0:
      return "Фото успешно загружено";
    case 1:
      return "Фото успішно завантажено";
    case 454:
      return "Фото успішно завантажено";
    case 114:
      return "Фота паспяхова загружана";
    case 2:
      return "Фота паспяхова загружана";
    case 777:
      return "Фотокарточка успешно загружена";
    case 97:
      return "Сурет сәтті жүктелді";
    case 100:
      return "Фото успешно загружено";
    default:
      return "Photo uploaded successfully";
  }
};

export default photoUploadSuccess;
