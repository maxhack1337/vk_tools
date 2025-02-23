import { EMOJI_HINTS } from './emojiConstants';

const replaceEmojisWithImages = (text: string) => {
    for (const [emojiCode, hint] of Object.entries(EMOJI_HINTS)) {
        const emojiTexts = Array.isArray(hint[1]) ? hint[1] : [hint[1]]; 

        for (const emojiText of emojiTexts) {
            const regex = emojiText; 

            text = text.replace(regex.toString(), () => {
                return `<img class="Emoji @${emojiCode}" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">`;
            });
        }
    }

    return text;
};

export default replaceEmojisWithImages;
