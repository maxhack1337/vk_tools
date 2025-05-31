const changeCurrentInfoLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "установить статус";
    case 1:
      return "встановити статус";
    case 454:
      return "встановити статус";
    case 114:
      return "устанавіць статус";
    case 2:
      return "устанавіць статус";
    case 777:
      return "изменить тезис";
    case 97:
      return "жағдайды орнату";
    case 100:
      return "измѣнить статусъ";
    default:
      return "Set status";
  }
};

export default changeCurrentInfoLang;
