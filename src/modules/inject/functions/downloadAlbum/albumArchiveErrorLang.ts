const albumArchiveErrorLang = (lang: number, errorMessage: string) => {
  switch (lang) {
    case 0:
      return `Ошибка при формировании архива: ${errorMessage}`;
    case 1:
    case 454:
      return `Помилка під час створення архіву: ${errorMessage}`;
    case 114:
    case 2:
      return `Памылка пры фарміраванні архіва: ${errorMessage}`;
    case 777:
      return `Ошибка при формировании архива: ${errorMessage}`;
    case 97:
      return `Мұрағатты жасау кезінде қате: ${errorMessage}`;
    case 100:
      return `Ошибка при формировании архива: ${errorMessage}`;
    default:
      return `Error while creating archive: ${errorMessage}`;
  }
};

export default albumArchiveErrorLang;
