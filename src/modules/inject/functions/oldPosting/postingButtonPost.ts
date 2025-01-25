import postingButtonPostSuggestLang from "./postingButtonPostSuggestLang";

const postingButtonPost = (isSuggested: boolean) => {
	const postingButtonPostElement = document.createElement('div');
	postingButtonPostElement.classList.add('addpost_button_wrap');

	const postingButtonPostButton = document.createElement('button');
	postingButtonPostButton.classList.add('FlatButton','FlatButton--primary','FlatButton--size-m','addpost_button');
	postingButtonPostButton.type = 'button';
	postingButtonPostButton.id = 'send_post';
	postingButtonPostButton.setAttribute('onclick', 'wall.sendPost()');

	const postingButtonPostInner = document.createElement('span');
	postingButtonPostInner.classList.add('FlatButton__in');

	const postingButtonPostText = document.createElement('span');
	postingButtonPostText.classList.add('FlatButton__content');
	postingButtonPostText.textContent = isSuggested ? postingButtonPostSuggestLang(vk.lang) : (getLang?.('global_post').toString() || 'Опубликовать');

	postingButtonPostInner.appendChild(postingButtonPostText);
	postingButtonPostButton.appendChild(postingButtonPostInner);
	postingButtonPostElement.appendChild(postingButtonPostButton);

	return postingButtonPostElement;
}

export default postingButtonPost;