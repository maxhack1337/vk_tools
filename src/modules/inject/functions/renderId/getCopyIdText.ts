const getCopyIdText = (lang: number) => {
  switch (lang) {
    case 0:
      return "Скопировать ID";
    case 1:
      return "Скопіювати ID";
    case 454:
      return "Скопіювати ID";
    case 114:
      return "Скапіяваць ID";
    case 2:
      return "Скапіяваць ID";
    case 777:
      return "Скопировать ID";
    case 97:
      return "ID көшіру";
    case 100:
      return "Скопировать ID";
    default:
      return "Copy ID";
  }
}

export default getCopyIdText;
