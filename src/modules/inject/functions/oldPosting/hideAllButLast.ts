const hideAllButLast = (prefix: string) => {
  const elements = Array.from(document.querySelectorAll(`[id^="${prefix}"]`));
  elements.forEach((elem, i) => {
    if (i !== elements.length - 1) {
      (elem as HTMLElement).style.display = "none";
    }
  });
};

export default hideAllButLast;
