import createStyle from "../../createStyle";
import removeStyle from "../../removeStyle";

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
