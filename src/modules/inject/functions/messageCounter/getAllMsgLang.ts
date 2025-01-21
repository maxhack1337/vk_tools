const getAllMsgLang = (lang:number) => {
  switch (lang) {
    case 0:
      return "Всего сообщений:";
    case 1:
      return "Всього повідомлень:";
    case 454:
      return "Всього повідомлень:";
    case 114:
      return "Усяго паведамленняў:";
    case 2:
      return "Усяго паведамленняў:";
    case 777:
      return "Всего телеграмм:";
    case 97:
      return "Жалпы хабарлар:";
    case 100:
      return "Всѣго писем:";
    default:
      return "Total messages:";
  }
}

export default getAllMsgLang;