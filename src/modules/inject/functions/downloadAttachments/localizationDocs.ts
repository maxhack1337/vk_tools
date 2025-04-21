export const getDownloadProgressText = (lang: number, docCount: number, totalDocs: number): string => {
  switch (lang) {
    case 0:
      return `Скачано документов: ${docCount} из ~${totalDocs}. Пожалуйста, не закрывайте окно скачивания.`;
    case 1:
    case 454:
      return `Завантажено документів: ${docCount} із ~${totalDocs}. Будь ласка, не закривайте вікно завантаження.`;
    case 114:
    case 2:
      return `Спампавана дакументаў: ${docCount} з ~${totalDocs}. Калі ласка, не зачыняйце акно загрузкі.`;
    case 777:
      return `Скачано документов: ${docCount} из ~${totalDocs}. Пожалуйста, не закрывайте окно скачивания.`;
    case 97:
      return `${docCount} құжат жүктелді, барлығы ~${totalDocs}. Жүктеу терезесін жабыңызбаңыз.`;
    case 100:
      return `Скачано документов: ${docCount} из ~${totalDocs}. Пожалуйста, не закрывайте окно скачивания.`;
    case 3:
      return `Downloaded documents: ${docCount} of ~${totalDocs}. Please do not close the download window.`;
    default:
      return `Downloaded documents: ${docCount} of ~${totalDocs}. Please do not close the download window.`;
  }
};

export const getPreparingText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Подготовка к скачиванию документов...";
    case 1:
    case 454:
      return "Підготовка до завантаження документів...";
    case 114:
    case 2:
      return "Падрыхтоўка да загрузкі дакументаў...";
    case 777:
      return "Подготовка к скачиванию документов...";
    case 97:
      return "Құжаттарды жүктеуге дайындық...";
    case 100:
      return "Подготовка к скачиванию документов...";
    case 3:
      return "Preparing to download documents...";
    default:
      return "Preparing to download documents...";
  }
};

export const getGeneratingArchiveText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Генерация архива с документами...";
    case 1:
    case 454:
      return "Генерація архіву з документами...";
    case 114:
    case 2:
      return "Генерацыя архіва з дакументамі...";
    case 777:
      return "Генерация архива с документами...";
    case 97:
      return "Құжаттары бар мұрағат жасалуда...";
    case 100:
      return "Генерация архива с документами...";
    case 3:
      return "Generating archive with documents...";
    default:
      return "Generating archive with documents...";
  }
};

export const getDocumentsText = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Документы";
    case 1:
    case 454:
      return "Документи";
    case 114:
    case 2:
      return "Дакументы";
    case 777:
      return "Документы";
    case 97:
      return "Құжаттар";
    case 100:
      return "Документы";
    case 3:
      return "Documents";
    default:
      return "Documents";
  }
};
