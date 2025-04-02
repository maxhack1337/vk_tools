const getDetermineText = (lang: number) => {
  switch (lang) {
    case 0:
      return "Определить";
    case 1:
      return "Визначити";
    case 2:
      return "Вызначыць";
    case 114:
      return "Вызначыць";
    case 97:
      return "Анықтау";
    case 100:
      return "Определить";
    case 454:
      return "Визначити";
    case 777:
      return "Определить";
    default:
      return "Determine";
  }
}

export default getDetermineText;
