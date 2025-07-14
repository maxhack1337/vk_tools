const changeCurrentInfoLang = (lang: number) => {
  switch (lang) {
    case 0:
      addLangKeys({
        change_current_info: "установить статус",
        share_current_info: "Рассказать друзьям",
      });
      return "установить статус";
    case 1:
      addLangKeys({
        change_current_info: "встановити статус",
        share_current_info: "Розповісти друзям",
      });
      return "встановити статус";
    case 454:
      addLangKeys({
        change_current_info: "встановити статус",
        share_current_info: "Розповісти друзям",
      });
      return "встановити статус";
    case 114:
      addLangKeys({
        change_current_info: "устанавіць статус",
        share_current_info: "Паведаміць сябрам",
      });
      return "устанавіць статус";
    case 2:
      addLangKeys({
        change_current_info: "устанавіць статус",
        share_current_info: "Паведаміць сябрам",
      });
      return "устанавіць статус";
    case 777:
      addLangKeys({
        change_current_info: "изменить тезис",
        share_current_info: "Рассказать товарищам",
      });
      return "изменить тезис";
    case 97:
      addLangKeys({
        change_current_info: "жағдайды орнату",
        share_current_info: "Достарға айту",
      });
      return "жағдайды орнату";
    case 100:
      addLangKeys({
        change_current_info: "измѣнить статусъ",
        share_current_info: "Повѣдать знакомцамъ",
      });
      return "измѣнить статусъ";
    default:
      addLangKeys({
        change_current_info: "Set status",
        share_current_info: "Share with friends",
      });
      return "Set status";
  }
};

export default changeCurrentInfoLang;
