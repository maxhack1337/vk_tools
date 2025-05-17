import convertLayout from "./convertLayout";

const toggleLayout = (element: Element) => {
  let selectedText, start, end;

  if (element instanceof HTMLElement && element.isContentEditable) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      selectedText = range.toString();
      start = range.startOffset;
      end = range.endOffset;
    }
  } else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    start = element.selectionStart;
    end = element.selectionEnd;
    selectedText = element.value.substring(start || 0, end || 0);
  }

  if (selectedText) {
    const convertedText = convertLayout(selectedText);

    if (element instanceof HTMLElement && element.isContentEditable) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      range?.deleteContents();
      range?.insertNode(document.createTextNode(convertedText));
      selection?.removeAllRanges();
      selection?.addRange(range || selection?.getRangeAt(0));
    } else if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      const beforeText = element.value.substring(0, start || 0);
      const afterText = element.value.substring(end || 0);

      element.value = beforeText + convertedText + afterText;
      element.setSelectionRange(start || 0, start || 0 + convertedText.length);
    }
  }
};

export default toggleLayout;
