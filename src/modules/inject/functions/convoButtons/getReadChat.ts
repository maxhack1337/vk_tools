const getReadChat = (lang:number) => {
  switch (lang) {
    case 0:
      return "Отметить прочитанным";
    case 1:
      return "Позначити як прочитаний";
    case 454:
      return "Позначити як прочитаний";
    case 114:
      return "Адзначыць як прачытаны";
    case 2:
      return "Адзначыць як прачытаны";
    case 777:
      return "Рассмотреть";
    case 97:
      return "Оқылған деп белгілеңіз";
    case 100:
      return "Отмѣтить прочитанным";
    default:
      return "Mark as read";
  }
}

export default getReadChat;