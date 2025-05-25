import createStyle from "../classicalProfile/scripts/createStyle";
import removeStyle from "../classicalProfile/scripts/removeStyle";

const checkIsSection = () => {
  requestAnimationFrame(() => {
    const isFeedHasSection = () => new URLSearchParams(window.location.search).has("section");
    if (isFeedHasSection()) {
      createStyle("removeFilters", ".vkToolsFeedFilter {display: none}");
    } else {
      removeStyle("removeFilters");
    }
  });
};

export default checkIsSection;
