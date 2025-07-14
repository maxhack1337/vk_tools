const noInfoLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Информация отсутствует";
    case 1:
      return "Інформація відсутня";
    case 454:
      return "Інформація відсутня";
    case 114:
      return "Інфармацыя адсутнічае";
    case 2:
      return "Інфармацыя адсутнічае";
    case 777:
      return "Информация отсутствует";
    case 97:
      return "Ақпарат жоқ";
    case 100:
      return "Информация отсутствует";
    default:
      return "No information available";
  }
};

export default noInfoLang;
