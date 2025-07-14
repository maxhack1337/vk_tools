const ignoreReactErrorOnRemoveChild = () => {
  const originalRemoveChild = Node.prototype.removeChild;

  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    try {
      return originalRemoveChild.call(this, child) as T;
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "NotFoundError") {
        console.warn("[VK Tools Error] Something wrong...", e);
        return null as unknown as T;
      }
      throw e;
    }
  };
};

export default ignoreReactErrorOnRemoveChild;
