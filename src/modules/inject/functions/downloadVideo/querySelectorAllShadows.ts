const querySelectorAllShadows = (selector: string, el: Element = document.body): Element[] => {
    const childShadows = Array.from(el.querySelectorAll("*"))
        .map((el) => el.shadowRoot)
        .filter(Boolean) as ShadowRoot[];
    const childResults: Element[][] = childShadows.map((child) =>
        querySelectorAllShadows(selector, child.host)
    );
    const result = Array.from(el.querySelectorAll(selector)) as Element[];
    return result.concat(...childResults).flat();
}

export default querySelectorAllShadows;
