const getEnableLinesLang = (lang:number) => {
  switch (lang) {
    case 0:
      return 'Активировать режим "Строки"';
    case 1:
      return 'Активувати режим "Рядки"';
    case 454:
      return 'Активувати режим "Рядки"';
    case 114:
      return 'Актываваць рэжым "Радкі"';
    case 2:
      return 'Актываваць рэжым "Радкі"';
    case 777:
      return 'Активировать режим "Строки"';
    case 97:
      return "«Жолдар» режимін белсендіру";
    case 100:
      return 'Активировать режим "Строки"';
    default:
      return 'Activate "Lines" mode';
  }
}

export default getEnableLinesLang;