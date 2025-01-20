const getBeginChat = (lang:number) => {
  switch (lang) {
    case 0:
      return "Перейти в начало чата";
    case 1:
      return "На початок чату";
    case 454:
      return "На початок чату";
    case 114:
      return "Перайсці ў пачатак чата";
    case 2:
      return "Перайсці ў пачатак чата";
    case 777:
      return "Открыть первую телеграмму";
    case 97:
      return "Чаттың басына өтіңіз";
    case 100:
      return "Пѣрѣйти въ начало чата";
    case 3:
      return "Go to the beginning of the chat";
    default:
      return "Go to the beginning of the chat";
  }
}

export default getBeginChat;