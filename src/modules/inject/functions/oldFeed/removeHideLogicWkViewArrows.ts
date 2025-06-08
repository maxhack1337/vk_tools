import deferredCallbackNested from "../oldPosting/deferredCallbackNested";
import updateArrows from "./updateArrows";

const removeHideLogicWkViewArrows = () => {
  deferredCallbackNested(
    () => {
      window.WkView.updateArrows = updateArrows;
      Object.freeze(window.WkView.updateArrows);
    },
    { variablePath: "window.WkView.updateArrows" }
  );
};

export default removeHideLogicWkViewArrows;
