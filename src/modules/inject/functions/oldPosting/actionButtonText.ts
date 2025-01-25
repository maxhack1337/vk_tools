import actionButtonTextLang from "./actionButtonTextLang";

const actionButtonText = () => {
	const buttonText = document.createElement('span');
	buttonText.classList.add('post_action_btn_text');
	buttonText.setAttribute('role', 'button');
	buttonText.setAttribute('aria-label', actionButtonTextLang(vk.lang));
	buttonText.textContent = actionButtonTextLang(vk.lang);

	return buttonText;
}

export default actionButtonText;