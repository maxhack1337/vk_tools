export const getDownloadProgressText = (lang: number, audioCount: number, totalAudios: number): string => {
  switch (lang) {
    case 0:
      return `Скачано голосовых сообщений: ${audioCount} из ~${totalAudios}. Пожалуйста, не закрывайте окно скачивания.`;
    case 1:
    case 454:
      return `Завантажено голосових повідомлень: ${audioCount} із ~${totalAudios}. Будь ласка, не закривайте вікно завантаження.`;
    case 114:
    case 2:
      return `Спампавана галасавых паведамленняў: ${audioCount} з ~${totalAudios}. Калі ласка, не зачыняйце акно загрузкі.`;
    case 777:
      return `Скачано голосовых сообщений: ${audioCount} из ~${totalAudios}. Пожалуйста, не закрывайте окно скачивания.`;
    case 97:
      return `${audioCount} дауыстық хабарламалар жүктелді, барлығы ~${totalAudios}. Жүктеу терезесін жабыңызбаңыз.`;
    case 100:
      return `Скачано голосовых сообщений: ${audioCount} из ~${totalAudios}. Пожалуйста, не закрывайте окно скачивания.`;
    case 3:
      return `Downloaded audio messages: ${audioCount} of ~${totalAudios}. Please do not close the download window.`;
    default:
      return `Downloaded audio messages: ${audioCount} of ~${totalAudios}. Please do not close the download window.`;
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

export const getAudioMessagesText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Голосовые сообщения";
    case 1:
    case 454:
      return "Голосові повідомлення";
    case 114:
    case 2:
      return "Галасавыя паведамленні";
    case 777:
      return "Голосовые сообщения";
    case 97:
      return "Дауыс хабарламалары";
    case 100:
      return "Голосовые сообщения";
    case 3:
      return "Audio messages";
    default:
      return "Audio messages";
  }
};
