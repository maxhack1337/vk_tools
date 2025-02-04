const getEndStoryLang = (lang:number) => {
  switch (lang) {
    case 0:
      return "ㅤПерейти в конец истории";
    case 1:
      return "ㅤПерейти в кінець історії";
    case 454:
      return "ㅤПерейти в кінець історії";
    case 114:
      return "ㅤПерайсці ў канец гісторыі";
    case 2:
      return "ㅤПерайсці ў канец гісторыі";
    case 777:
      return "ㅤПерейти в конец истории";
    case 97:
      return "ㅤӘңгіменің соңына өту";
    case 100:
      return "ㅤПерейти в конец истории";
    default:
      return "ㅤGo to the end";
  }
}

export default getEndStoryLang;