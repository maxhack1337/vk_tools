const updateThumbLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Изменить миниатюру";
    case 1:
    case 454:
      return "Змінити мініатюру";
    case 114:
    case 2:
      return "Змяніць мініяцюру";
    case 100:
      return "Измѣнить минiатюру";
    case 777:
      return "Обрезать края";
    case 97:
      return "Миниатюраны өзгерту";
    default:
      return "Edit thumbnail";
  }
};

export default updateThumbLang;
