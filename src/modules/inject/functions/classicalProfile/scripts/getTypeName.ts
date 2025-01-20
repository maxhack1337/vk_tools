const getTypeName = (type:string) => {
        switch (type) {
          case "child":
            return getLang?.("profile_children_label");
          case "sibling":
            return getLang?.("profile_siblings_label");
          case "parent":
            return getLang?.("profile_parents_label");
          case "grandparent":
            return getLang?.("profile_grandparents_label");
          case "grandchild":
            return getLang?.("profile_grandchildren_label");
          default:
            return "";
        }
}
      
export default getTypeName;