import toggleLayout from "./toggleLayout";

const convert = (e: Element | Document) => {
  e.addEventListener("keydown", function (event: KeyboardEvent) {
    if ((event.ctrlKey && event.key === "]") || (event.ctrlKey && event.key === "ъ")) {
      event.preventDefault();
      const activeElement = document.activeElement;

      if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || (activeElement as HTMLElement).isContentEditable)) {
        toggleLayout(activeElement);
      }
    }
  } as EventListener);
};

export default convert;
