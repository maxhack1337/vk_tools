import createEmojiSmileWrap from "./createEmojiSmileWrap";
import postingFooterBlock from "./postingFooterBlock";
import postingWarningTooMuchSymbols from "./postingWarningTooMuchSymbols";

const postingWrap = (isSuggested:boolean, onlyOfficial:boolean) => {
	const postingWrapElement = document.createElement('div');
	postingWrapElement.classList.add('post_field_wrap','_emoji_field_wrap');

	const emojiAddButton = createEmojiSmileWrap();

	postingWrapElement.appendChild(emojiAddButton);

	const postFooter = postingFooterBlock(isSuggested, onlyOfficial);

	postingWrapElement.appendChild(postFooter);

	postingWrapElement.appendChild(postingWarningTooMuchSymbols());

	return postingWrapElement;
}

export default postingWrap;