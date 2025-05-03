const getCategoriesLang = (lang: number): string[] => {
  switch (lang) {
    case 0:
      return ["Картинки", "Эмоции", "Градиенты"];
    case 1:
      return ["Картинки", "Емоції", "Градієнти"];
    case 454:
      return ["Картинки", "Емоції", "Градієнти"];
    case 114:
      return ["Малюнкі", "Эмацыі", "Градыенты"];
    case 2:
      return ["Малюнкі", "Эмацыі", "Градыенты"];
    case 777:
      return ["Картинки", "Пиктограммы", "Градиенты"];
    case 97:
      return ["Суреттер", "Эмоциялар", "Градиенттер"];
    case 100:
      return ["Фотокарточки", "Эмоцiи", "Градиенты"];
    default:
      return ["Pictures", "Emotions", "Gradients"];
  }
};

export default getCategoriesLang;
