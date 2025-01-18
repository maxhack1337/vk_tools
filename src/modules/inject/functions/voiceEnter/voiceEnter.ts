const voiceEnter = () => {
    if (!("webkitSpeechRecognition" in window)) {
        console.log(
            "[VK Tools Error] Ваш браузер не поддерживает Web Speech API. Голосовой ввод недоступен"
        );
        return;
    }

    const recognition = new (window as any).webkitSpeechRecognition(); // Используем window как any для webkitSpeechRecognition
    recognition.lang = "ru-RU";
    recognition.continuous = false;
    recognition.interimResults = false;

    let currentEditableElement: HTMLElement | null = null; // Указываем, что это HTMLElement

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

    recognition.onresult = function (event:  { results: { transcript: any; }[][]; }) {
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
        if (
            ((event.ctrlKey && event.key === "'") ||
                (event.ctrlKey && event.key === "э")) &&
            !isStarted
        ) {
            isStarted = true;
            event.preventDefault();
            currentEditableElement = event.target as HTMLElement; // Приводим к HTMLElement
            recognition.start();
        } else if (
            ((event.ctrlKey && event.key === "'") ||
                (event.ctrlKey && event.key === "э")) &&
            isStarted
        ) {
            isStarted = false;
            event.preventDefault();
            currentEditableElement = event.target as HTMLElement; // Приводим к HTMLElement
            recognition.stop();
        }
    }

    document.arrive(
        `input, textarea, [contenteditable="true"]`,
        { existing: true },
        function (e: Element) {
            e.addEventListener("keydown", handleKeyPress as EventListener); // Теперь это безопасно
        }
    );
}

export default voiceEnter;
