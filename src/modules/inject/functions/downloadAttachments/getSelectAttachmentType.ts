const getSelectAttachmentType = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Выберите тип вложений:";
    case 1:
      return "Виберіть тип вкладень:";
    case 454:
      return "Виберіть тип вкладень:";
    case 114:
      return "Выберыце тып укладанняў:";
    case 2:
      return "Выберыце тып укладанняў:";
    case 777:
      return "Выберите тип вложений:";
    case 97:
      return "Қосымшалардың түрін таңдаңыз:";
    case 100:
      return "Выберите тип вложений:";
    case 3:
      return "Select attachments type:";
    default:
      return "Select attachments type:";
  }
}

export default getSelectAttachmentType;
