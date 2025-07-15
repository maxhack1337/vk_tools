const changeCurrentInfoLang = (lang: number) => {
  switch (lang) {
    case 0:
      addLangKeys({
        change_current_info: "установить статус",
      });
      return "установить статус";
    case 1:
      addLangKeys({
        change_current_info: "встановити статус",
      });
      return "встановити статус";
    case 454:
      addLangKeys({
        change_current_info: "встановити статус",
      });
      return "встановити статус";
    case 114:
      addLangKeys({
        change_current_info: "устанавіць статус",
      });
      return "устанавіць статус";
    case 2:
      addLangKeys({
        change_current_info: "устанавіць статус",
      });
      return "устанавіць статус";
    case 777:
      addLangKeys({
        change_current_info: "изменить тезис",
      });
      return "изменить тезис";
    case 97:
      addLangKeys({
        change_current_info: "жағдайды орнату",
      });
      return "жағдайды орнату";
    case 100:
      addLangKeys({
        change_current_info: "измѣнить статусъ",
      });
      return "измѣнить статусъ";
    default:
      addLangKeys({
        change_current_info: "Set status",
      });
      return "Set status";
  }
};

export default changeCurrentInfoLang;
