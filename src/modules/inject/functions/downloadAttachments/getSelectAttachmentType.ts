const getSelectAttachmentType = (lang: number): string => {
  switch (lang) {
    case 0:
      return "Выберите тип вложения:";
    case 1:
      return "Виберіть тип вкладення:";
    case 454:
      return "Виберіть тип вкладення:";
    case 114:
      return "Выберыце тып укладання:";
    case 2:
      return "Выберыце тып укладання:";
    case 777:
      return "Выберите тип вложения:";
    case 97:
      return "Қосымшаның түрін таңдаңыз:";
    case 100:
      return "Выбрать тип вложения:";
    case 3:
      return "Select attachment type:";
    default:
      return "Select attachment type:";
  }
}

export default getSelectAttachmentType;
