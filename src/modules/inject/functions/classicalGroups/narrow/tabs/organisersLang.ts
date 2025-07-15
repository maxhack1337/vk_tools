const organisersLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Организаторы";
    case 1:
    case 454:
      return "Організатори";
    case 114:
    case 2:
      return "Арганізатары";
    case 777:
      return "Оргсовет";
    case 100:
      return "Устроители";
    case 97:
      return "Ұйымдастырушылар";
    default:
      return "Organisers";
  }
};

export default organisersLang;
