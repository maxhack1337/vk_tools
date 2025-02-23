import replaceEmojisWithImages from "./replaceEmojiWithText";

const arriveComposerEmoji = () => {
    document.arrive(".ComposerInput__input.ConvoComposer__input", { existing: true }, (e: any) => {
        e.addEventListener("keyup", function (event: KeyboardEvent) {
            if (event.ctrlKey && event.key === '\\') {
                const inputText = e.innerText || e.value;
                const replacedText = replaceEmojisWithImages(inputText);
                e.innerHTML = replacedText;
                e.focus();
            }
        });
    });
};

export default arriveComposerEmoji;