const installBoxTitle = (lang: number) => {
  switch (lang) {
    case 0:
      return "VK Tools установлен";
    case 1:
      return "VK Tools встановлено";
    case 454:
      return "VK Tools встановлено";
    case 114:
      return "VK Tools усталяваны";
    case 2:
      return "VK Tools усталяваны";
    case 777:
      return "VK Tools установлен";
    case 97:
      return "VK Tools орнатылды";
    case 100:
      return "VK Tools установлен";
    default:
      return "VK Tools successfully installed";
  }
}

export default installBoxTitle;