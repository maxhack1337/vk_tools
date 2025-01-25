const bestFriendsDropdown = () => {
	const bestFriendsDropdownElement = document.createElement('div');
	bestFriendsDropdownElement.classList.add('PostVisibilityBestFriendsOnlyOption');

	const bfDropdownElementText = document.createTextNode(getLang?.('wall_best_friends_only').toString() || 'Для близких друзей');

	const bfEditList = document.createElement('span');
	bfEditList.classList.add('PostVisibilityBestFriendsOnlyOption__info');

	const editLink = document.createElement('span');
	editLink.classList.add('PostVisibilityBestFriendsOnlyOption__editLink');
	editLink.setAttribute('role', 'button');
	editLink.textContent = getLang?.('global_edit').toString() || 'Редактировать';

	bfEditList.appendChild(editLink);

	bestFriendsDropdownElement.appendChild(bfDropdownElementText);
	bestFriendsDropdownElement.appendChild(bfEditList);

	return bestFriendsDropdownElement;
}

export default bestFriendsDropdown;