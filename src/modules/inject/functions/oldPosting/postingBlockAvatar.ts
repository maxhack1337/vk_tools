import avatarImageInBlock from "./avatarImageInBlock";

const postingBlockAvatar = ({ ownerHref = '', ownerPhoto = '' }) => {
	const postingAvatarElement = document.createElement('a');
	postingAvatarElement.href = ownerHref;
	postingAvatarElement.classList.add('post_field_user_link','_post_field_author');
	postingAvatarElement.setAttribute(
		'onclick',
		'if (!checkEvent(event)) return nav.go(this, event); event.cancelBubble = true;'
	);

	const avatarImage = avatarImageInBlock(ownerPhoto);
	postingAvatarElement.appendChild(avatarImage);

	const avatarImageUnderlay = avatarImageInBlock(ownerPhoto);
	avatarImageUnderlay.classList.add('post_field_image_secondary');
	postingAvatarElement.appendChild(avatarImageUnderlay);

	return postingAvatarElement;
}

export default postingBlockAvatar;