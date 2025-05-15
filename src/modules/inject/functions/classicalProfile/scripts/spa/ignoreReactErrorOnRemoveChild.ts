import getLocalValue from "../../../../getLocalValue";

const ignoreReactErrorOnRemoveChild = () => {
  if (getLocalValue("isClassicalProfileDesign")) {
    const originalRemoveChild = Node.prototype.removeChild;

    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "NotFoundError") {
          console.warn("[VK Tools Error] Classic profile error", e);
          return null as unknown as T;
        }
        throw e;
      }
    };
  }
};

export default ignoreReactErrorOnRemoveChild;
