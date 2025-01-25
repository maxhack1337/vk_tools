const postingButtonSettingsListNotifyLang = (lang:number) => {
  switch (lang) {
    case 0:
      return "Не отправлять уведомления";
    case 1:
      return "Не надсилати повідомлення";
    case 454:
      return "Не надсилати повідомлення";
    case 114:
      return "Не адпраўляць апавяшчэння";
    case 2:
      return "Не адпраўляць апавяшчэння";
    case 777:
      return "Не отправлять извещения";
    case 97:
      return "Хабарландыруларды жібермеңіз";
    case 100:
      return "Не отправлять увѣдомленія ";
    default:
      return "Don't send notification";
  }
}

export default postingButtonSettingsListNotifyLang;