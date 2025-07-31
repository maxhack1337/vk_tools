const hideAllButMax = (prefix: string) => {
  const elements = Array.from(document.querySelectorAll(`[id^="${prefix}"]`));
  let maxNum = -Infinity;
  let maxElem: HTMLElement | null = null;

  elements.forEach((elem) => {
    const match = elem.id.match(new RegExp(`${prefix}(\\d+)$`));
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) {
        maxNum = num;
        maxElem = elem as HTMLElement;
      }
    }
  });

  elements.forEach((elem) => {
    if (elem !== maxElem) {
      (elem as HTMLElement).style.display = "none";
    }
  });
};

export default hideAllButMax;
