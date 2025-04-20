const getDownloadAttachments = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Скачать вложения";
    case 1:
      return "Завантажити вкладення";
    case 454:
      return "Завантажити вкладення";
    case 114:
      return "Спампаваць укладанні";
    case 2:
      return "Спампаваць укладанні";
    case 777:
      return "Загрузить вложения";
    case 97:
      return "Қосымшаларды жүктеу";
    case 100:
      return "Скачать вложения";
    case 3:
      return "Download attachments";
    default:
      return "Download attachments";
  }
}

export default getDownloadAttachments;
