const avatarImageInBlock = (src = '') => {
	const avatarImage = document.createElement('span');
	avatarImage.className = 'AvatarRich AvatarRich--sz-28 AvatarRich--shadow post_field_user_image _post_field_image';
	avatarImage.style.cssText =
		'width: 28px; height: 28px; border-radius: 50%; --avatar-rich-stroke-width: 1.5px; --avatar-rich-nft-frame-width: 2px;';
	avatarImage.setAttribute('aria-hidden', 'true');
	avatarImage.setAttribute(
		'onclick',
		'if (!checkEvent(event)) return nav.go(this, event); event.cancelBubble = true;'
	);

	const avatarBg = document.createElement('div');
	avatarBg.className = 'AvatarRich__background';

	const avatarImg = document.createElement('img');
	avatarImg.src = src;
	avatarImg.alt = '';
	avatarImg.className = 'AvatarRich__img';

	avatarImage.append(avatarBg, avatarImg);

	return avatarImage;
}

export default avatarImageInBlock;