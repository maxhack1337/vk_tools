import getLocalValue from "../../getLocalValue";

const ignoreReactErrorOnInsertBefore = () => {
  if (getLocalValue("playlistsClassicalV")) {
    const originalInsertBefore = Node.prototype.insertBefore;

    Node.prototype.insertBefore = function <T extends Node>(child: T, before: Node | null): T {
      try {
        return originalInsertBefore.call(this, child, before) as T;
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "NotFoundError") {
          console.warn("[VK Tools Error] Classical video playlists error", e);
          return null as unknown as T;
        }
        throw e;
      }
    };
  }
};

export default ignoreReactErrorOnInsertBefore;
