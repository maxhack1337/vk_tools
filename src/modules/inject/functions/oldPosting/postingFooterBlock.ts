import getPostingFooterLabel from "./getPostingFooterLabel";

const postingFooterBlock = (isSuggested:boolean, onlyOfficial:boolean) => {
	const postFooter = document.createElement('div');
	postFooter.id = 'post_field';
	postFooter.classList.add('submit_post_field');

	postFooter.setAttribute('onkeyup', 'Wall && Wall.postChanged()');
	postFooter.setAttribute('onkeydown', 'onCtrlEnter(event, wall.sendPost)');
	postFooter.setAttribute('onfocus', 'wall && wall.showEditPost()');

	const label = getPostingFooterLabel(onlyOfficial, isSuggested);

	postFooter.setAttribute('placeholder', label);
	postFooter.setAttribute('contenteditable', 'true');
	postFooter.setAttribute('role', 'textbox');
	postFooter.setAttribute('aria-multiline', 'true');
	postFooter.setAttribute('aria-label', label);

	return postFooter;
}

export default postingFooterBlock;