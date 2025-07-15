const shareSubscribersLangKeys = (lang: number) => {
  switch (lang) {
    case 0:
      addLangKeys({
        share_current_info: "Рассказать подписчикам сообщества",
      });
      break;
    case 1:
      addLangKeys({
        share_current_info: "Розповісти підписникам спільноти",
      });
      break;
    case 454:
      addLangKeys({
        share_current_info: "Розповісти підписникам спільноти",
      });
      break;
    case 114:
      addLangKeys({
        share_current_info: "Расказаць падпісчыкам суполкі",
      });
      break;
    case 2:
      addLangKeys({
        share_current_info: "Расказаць падпісчыкам суполкі",
      });
      break;
    case 777:
      addLangKeys({
        share_current_info: "Рассказать участникам объединения",
      });
      break;
    case 97:
      addLangKeys({
        share_current_info: "бірлестікке жазылғандарға айту",
      });
      break;
    case 100:
      addLangKeys({
        share_current_info: "Повѣдать почитателямъ общества",
      });
      break;
    default:
      addLangKeys({
        share_current_info: "Post to community wall",
      });
      break;
  }
};

export default shareSubscribersLangKeys;
