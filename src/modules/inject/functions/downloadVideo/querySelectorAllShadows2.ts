const querySelectorAllShadows2 = (selector: string, root: any): Element[] => {
  const result: Element[] = [];

  result.push(...root.querySelectorAll(selector));

  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null);

  let node = treeWalker.nextNode();

  while (node) {
    if ((node as Element).shadowRoot) {
      const shadowRoot = (node as Element).shadowRoot!;
      result.push(...querySelectorAllShadows2(selector, shadowRoot));
    }
    node = treeWalker.nextNode();
  }

  return Array.from(new Set(result));
};

export default querySelectorAllShadows2;
