const dropToUploadLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Отпустите, чтобы начать загрузку";
    case 1:
      return "Відпустіть, щоб почати завантаження";
    case 454:
      return "Відпустіть, щоб почати завантаження";
    case 114:
      return "Адпусціце, каб пачаць загрузку";
    case 2:
      return "Адпусціце, каб пачаць загрузку";
    case 777:
      return "Отпустите, чтобы начать загрузку";
    case 97:
      return "Жүктеуді бастау үшін жіберіңіз";
    case 100:
      return "Отпустите, чтобы начать загрузку";
    default:
      return "Drop here to upload";
  }
};

export default dropToUploadLang;
