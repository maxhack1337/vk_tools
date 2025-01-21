const getAllChatsMsg = (lang:number) => {
  switch (lang) {
    case 0:
      return "Всего чатов:";
    case 1:
      return "Усього чатів:";
    case 454:
      return "Усього чатів:";
    case 114:
      return "Усяго чатаў:";
    case 2:
      return "Усяго чатаў:";
    case 777:
      return "Всего докладов:";
    case 97:
      return "Жалпы чаттар:";
    case 100:
      return "Всѣго беседъ:";
    default:
      return "Total chats:";
  }
}

export default getAllChatsMsg;