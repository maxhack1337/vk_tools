const albumRetryDownloadLang = (lang: number, current: number, total: number) => {
  switch (lang) {
    case 0:
      return `Попытка скачивания ${current}/${total} фото с ошибкой...`;
    case 1:
    case 454:
      return `Спроба завантаження ${current}/${total} фото з помилкою...`;
    case 114:
    case 2:
      return `Спроба спампаваць ${current}/${total} фота з памылкай...`;
    case 777:
      return `Попытка скачивания ${current}/${total} фото с ошибкой...`;
    case 97:
      return `${current}/${total} қате фотосуреттерді жүктеп көру...`;
    case 100:
      return `Попытка скачивания ${current}/${total} фото с ошибкой...`;
    default:
      return `Retrying download of ${current}/${total} failed photos...`;
  }
};

export default albumRetryDownloadLang;
