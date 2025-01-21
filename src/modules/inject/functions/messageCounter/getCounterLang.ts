const getCounterLang = (lang:number) => {
  switch (lang) {
    case 0:
      return "Информация о чатах";
    case 1:
      return "Інформація про чати";
    case 454:
      return "Інформація про чати";
    case 114:
      return "Інфармацыя аб чатах";
    case 2:
      return "Інфармацыя аб чатах";
    case 777:
      return "Доклад о телеграммах";
    case 97:
      return "Чат туралы ақпарат";
    case 100:
      return "Информация о чатахѣ";
    default:
      return "Chats information";
  }
}

export default getCounterLang;