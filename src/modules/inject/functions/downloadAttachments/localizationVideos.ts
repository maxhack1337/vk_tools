export const getDownloadProgressText = (lang: number, videoCount: number, totalVideos: number): string => {
  switch (lang) {
    case 0:
      return `Скачано видеозаписей: ${videoCount} из ~${totalVideos}. Пожалуйста, не закрывайте окно скачивания.`;
    case 1:
    case 454:
      return `Завантажено відеозаписів: ${videoCount} із ~${totalVideos}. Будь ласка, не закривайте вікно завантаження.`;
    case 114:
    case 2:
      return `Спампавана відэазапісаў: ${videoCount} з ~${totalVideos}. Калі ласка, не зачыняйце акно загрузкі.`;
    case 777:
      return `Скачано видеозаписей: ${videoCount} из ~${totalVideos}. Пожалуйста, не закрывайте окно скачивания.`;
    case 97:
      return `${videoCount} бейнежазба жүктелді, барлығы ~${totalVideos}. Жүктеу терезесін жабыңызбаңыз.`;
    case 100:
      return `Скачано видеозаписей: ${videoCount} из ~${totalVideos}. Пожалуйста, не закрывайте окно скачивания.`;
    case 3:
      return `Downloaded videos: ${videoCount} of ~${totalVideos}. Please do not close the download window.`;
    default:
      return `Downloaded videos: ${videoCount} of ~${totalVideos}. Please do not close the download window.`;
  }
};

export const getPreparingText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Подготовка к скачиванию...";
    case 1:
    case 454:
      return "Підготовка до завантаження...";
    case 114:
    case 2:
      return "Падрыхтоўка да загрузкі...";
    case 777:
      return "Подготовка к скачиванию...";
    case 97:
      return "Жүктеуге дайындалуда...";
    case 100:
      return "Подготовка к скачиванию...";
    case 3:
      return "Preparing download...";
    default:
      return "Preparing download...";
  }
};

export const getGeneratingArchiveText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Генерация архива...";
    case 1:
    case 454:
      return "Генерація архіву...";
    case 114:
    case 2:
      return "Генерацыя архіва...";
    case 777:
      return "Генерация архива...";
    case 97:
      return "Архив жасалуда...";
    case 100:
      return "Генерация архива...";
    case 3:
      return "Generating archive...";
    default:
      return "Generating archive...";
  }
};

export const getVideosText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Видеозаписи";
    case 1:
    case 454:
      return "Відеозаписи";
    case 114:
    case 2:
      return "Відэазапісы";
    case 777:
      return "Видеозаписи";
    case 97:
      return "Бейнежазбалар";
    case 100:
      return "Видеозаписи";
    case 3:
      return "Videos";
    default:
      return "Videos";
  }
};
