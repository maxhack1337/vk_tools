const getStoryText = (lang:number) => {
  switch (lang) {
    case 0:
      return ["","история","истории","историй"];
    case 1:
      return ["","історія","історії","історій"];
    case 454:
      return ["","історія","історії","історій"];
    case 114:
      return ["","гісторыя","гісторыі","гісторый"];
    case 2:
      return ["","гісторыя","гісторыі","гісторый"];
    case 777:
      return ["","хроника","хроники","хроник"];
    case 97:
      return ["","история","истории","историй"];
    case 100:
      return ["","история","истории","историй"];
    default:
      return ["","story","story","story"];
  }
}

export default getStoryText;