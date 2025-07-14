const ignoreReactErrorOnInsertBefore = () => {
  const originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.insertBefore = function <T extends Node>(child: T, before: Node | null): T {
    try {
      return originalInsertBefore.call(this, child, before) as T;
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "NotFoundError") {
        console.warn("[VK Tools Error] Something wrong...", e);
        return null as unknown as T;
      }
      throw e;
    }
  };
};

export default ignoreReactErrorOnInsertBefore;
