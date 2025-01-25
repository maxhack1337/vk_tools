import clubPostingSignSettings from "./clubPostingSignSettings";
import postingButtonPost from "./postingButtonPost";
import postingSettingsDropdown from "./postingSettingsDropdown";

const postingSubmitBlock = (isGroup:boolean, isSuggested:boolean, onlyOfficial:boolean) => {
	const postingSubmitBlockElement = document.createElement('div');
	postingSubmitBlockElement.id = 'submit_post';
	postingSubmitBlockElement.classList.add('submit_post','clear_fix');
	postingSubmitBlockElement.setAttribute(
		'onclick',
		"if(domClosest('article_snippet', event.target)) return;event.cancelBubble=true;"
	);

	postingSubmitBlockElement.append(postingButtonPost(isSuggested), postingSettingsDropdown(isGroup, isSuggested, onlyOfficial));

	if (isSuggested) {
		postingSubmitBlockElement.appendChild(clubPostingSignSettings());
	}

	const msItems = document.createElement('div');
	msItems.id = 'page_add_media';
	msItems.classList.add('page_add_media');
	msItems.setAttribute('onclick', 'wall && wall.showEditPost()');
	postingSubmitBlockElement.appendChild(msItems);

	return postingSubmitBlockElement;
}

export default postingSubmitBlock;