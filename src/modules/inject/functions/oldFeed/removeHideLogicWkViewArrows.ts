import updateArrows from "./updateArrows";

const removeHideLogicWkViewArrows = () => {
  window.WkView.updateArrows = updateArrows;
  Object.freeze(window.WkView.updateArrows);
};

export default removeHideLogicWkViewArrows;
