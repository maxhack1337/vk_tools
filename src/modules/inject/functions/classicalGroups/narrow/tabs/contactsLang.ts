const contactsLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Контакты";
    case 1:
    case 454:
      return "Контакти";
    case 114:
    case 2:
      return "Кантакты";
    case 777:
      return "Ответственные лица";
    case 100:
      return "Контакты";
    case 97:
      return "Байланыстар";
    default:
      return "Contacts";
  }
};

export default contactsLang;
