import { EMOJI_HINTS } from './emojiConstants';

type Hint = [number, string, string];

const replaceEmojisWithImages = (text: string) => {
    for (const hint of Object.values(EMOJI_HINTS) as Hint[]) {
        const emojiTexts = Array.isArray(hint[1]) ? hint[1] : [hint[1]];

        for (const emojiText of emojiTexts) {
            const regex = new RegExp(`(^|\\s)${escapeRegExp(emojiText)}(\\s|$)`, 'g');
            text = text.replace(regex, (match, p1, p2) => {
                return (p1 === '' ? '' : ' ') + hint[2] + (p2 === '' ? '' : ' ');
            });
        }
    }

    return text;
};

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default replaceEmojisWithImages;
