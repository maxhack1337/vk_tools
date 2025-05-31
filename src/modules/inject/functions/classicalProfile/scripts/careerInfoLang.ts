const careerInfoLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Карьера";
    case 1:
      return "Кар'єра";
    case 454:
      return "Кар'єра";
    case 114:
      return "Кар'ера";
    case 2:
      return "Кар'ера";
    case 777:
      return "Стаж";
    case 97:
      return "Мансап";
    case 100:
      return "Служба";
    default:
      return "Career";
  }
};

export default careerInfoLang;
