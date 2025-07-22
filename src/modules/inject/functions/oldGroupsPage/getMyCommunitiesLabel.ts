const getMyCommunitiesLabel = (lang: number) => {
  switch (lang) {
    case 0:
      return "Мои сообщества";
    case 1:
      return "Мої спільноти";
    case 454:
      return "Мої спільноти";
    case 114:
      return "Мае суполкі";
    case 2:
      return "Мае суполкі";
    case 777:
      return "Мои объединения";
    case 97:
      return "Бірлестіктерім";
    case 100:
      return "Мои сообщества";
    default:
      return "My communities";
  }
};

export default getMyCommunitiesLabel;
