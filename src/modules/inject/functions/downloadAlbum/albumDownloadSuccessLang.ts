const albumDownloadSuccessLang = (lang: number, title: string) => {
  switch (lang) {
    case 0:
      return `Альбом "${title}" успешно скачан!`;
    case 1:
      return `Альбом "${title}" успішно завантажено!`;
    case 454:
      return `Альбом "${title}" успішно завантажено!`;
    case 114:
      return `Альбом "${title}" паспяхова спампаваны!`;
    case 2:
      return `Альбом "${title}" паспяхова спампаваны!`;
    case 777:
      return `Альбом "${title}" успешно скачан!`;
    case 97:
      return `Альбом "${title}" сәтті жүктелді!`;
    case 100:
      return `Альбом "${title}" успешно скачан!`;
    default:
      return `Album "${title}" downloaded successfully!`;
  }
};

export default albumDownloadSuccessLang;
