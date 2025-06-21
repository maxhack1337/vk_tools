const voiceEnter = () => {
  if (!("webkitSpeechRecognition" in window)) {
    console.log("[VK Tools Error] Ваш браузер не поддерживает Web Speech API. Голосовой ввод недоступен");
    return;
  }

  /*
   * Функция особо не нужна, если что, удаляй
   * И добавь поддержку других языков
   */

  const recognition = new (window as any).webkitSpeechRecognition();
  recognition.lang = "ru-RU";
  recognition.continuous = false;
  recognition.interimResults = false;

  let currentEditableElement: HTMLElement | null = null;

  recognition.onstart = function () {
    if (currentEditableElement) {
      currentEditableElement.style.backgroundColor = "#e0ffe0";
    }
  };

  recognition.onend = function () {
    if (currentEditableElement) {
      currentEditableElement.style.backgroundColor = "";
    }
  };

  recognition.onresult = function (event: { results: { transcript: any }[][] }) {
    const transcript = event.results[0][0].transcript;
    if (currentEditableElement) {
      if (currentEditableElement.isContentEditable) {
        currentEditableElement.textContent += transcript;
      } else if (currentEditableElement instanceof HTMLInputElement || currentEditableElement instanceof HTMLTextAreaElement) {
        currentEditableElement.value += transcript;
      }
    }
  };

  let isStarted = false;

  function handleKeyPress(event: KeyboardEvent) {
    if (((event.ctrlKey && event.key === "'") || (event.ctrlKey && event.key === "э")) && !isStarted) {
      isStarted = true;
      event.preventDefault();
      currentEditableElement = event.target as HTMLElement;
      recognition.start();
    } else if (((event.ctrlKey && event.key === "'") || (event.ctrlKey && event.key === "э")) && isStarted) {
      isStarted = false;
      event.preventDefault();
      currentEditableElement = event.target as HTMLElement;
      recognition.stop();
    }
  }

  document.arrive(`input, textarea, [contenteditable="true"]`, { existing: true }, function (e: Element) {
    e.addEventListener("keydown", handleKeyPress as EventListener);
  });
};

export default voiceEnter;
