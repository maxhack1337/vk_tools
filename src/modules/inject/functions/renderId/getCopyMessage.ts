const getCopyMessage = (lang: number) => {
  switch (lang) {
    case 0: 
      return "ID скопирован в буфер обмена";
    case 1: 
      return "ID скопійовано в буфер обміну";
    case 454: 
      return "ID скопійовано в буфер обміну";
    case 114: 
      return "ID скапіяваны ў буфер абмену";
    case 2: 
      return "ID скапіяваны ў буфер абмену";
    case 777: 
      return "ID скопирован в буфер обмена";
    case 97: 
      return "ID буферге көшірілді";
    case 100: 
      return "ID скопирован в буфер обмена";
    default:
      return "ID copied to clipboard";
  }
}

export default getCopyMessage;
