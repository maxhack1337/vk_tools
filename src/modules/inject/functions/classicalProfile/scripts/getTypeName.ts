const getTypeName = (type: string) => {
  switch (type) {
    case "child":
      return getLang?.("profile_children_label"); //'Дети:'
    case "sibling":
      return getLang?.("profile_siblings_label"); //'Братья, сёстры:'
    case "parent":
      return getLang?.("profile_parents_label"); //'Родители:'
    case "grandparent":
      return getLang?.("profile_grandparents_label"); //'Дедушки, бабушки:'
    case "grandchild":
      return getLang?.("profile_grandchildren_label"); //'Внуки:'
    default:
      return "";
  }
};

export default getTypeName;
