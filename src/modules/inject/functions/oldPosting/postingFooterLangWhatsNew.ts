const postingFooterLangWhatsNew = (lang:number) => {
  switch (lang) {
    case 0:
      return "Что у вас нового?";
    case 1:
      return "Що маєте нового?";
    case 454:
      return "Що маєте нового?";
    case 114:
      return "Што ў вас новага?";
    case 2:
      return "Што ў вас новага?";
    case 777:
      return "Что у вас нового, товарищ?";
    case 97:
      return "Сізде не жаңалық?";
    case 100:
      return "Что у Васѣ новаго?";
    default:
      return "What's new?";
  }
}

export default postingFooterLangWhatsNew;