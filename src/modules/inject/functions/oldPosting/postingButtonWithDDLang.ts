const postingButtonWithDDLang = (lang:number) => {
    switch (lang) {
    case 0:
      return "Настройки публикации";
    case 1:
      return "Налаштування публікації";
    case 454:
      return "Налаштування публікації";
    case 114:
      return "Налады публікацыі";
    case 2:
      return "Налады публікацыі";
    case 777:
      return "Настройки публикации";
    case 97:
      return "Жариялау параметрлері";
    case 100:
      return "Настройки публикаціи";
    default:
      return "Publishing settings";
  }
}

export default postingButtonWithDDLang;