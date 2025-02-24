import { EMOJI_HINTS } from './emojiConstants';

type Hint = [number, string, string];


const replaceEmojisWithImages = (text: string) => {
    for (const hint of Object.values(EMOJI_HINTS) as Hint[]) {
        const emojiTexts = Array.isArray(hint[1]) ? hint[1] : [hint[1]];

        for (const emojiText of emojiTexts) {
            text = text.replace(emojiText.toString(), hint[2]);
        }
    }

    return text;
};

export default replaceEmojisWithImages;
