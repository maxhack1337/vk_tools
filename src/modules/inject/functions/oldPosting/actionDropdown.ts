import actionButtonTextLang from "./actionButtonTextLang";
import bestFriendsDropdown from "./bestFriendsDropdown";
import dropdownActionSingle from "./dropdownActionSingle";
import postingActionDropdownLangFriends from "./postingActionDropdownLangFriends";

const actionDropdown = () => {
	const actionDropdownElement = document.createElement('div');
	actionDropdownElement.classList.add('post_action_tt_content');
	actionDropdownElement.id = 'post_visibility_tt_content';

	actionDropdownElement.append(
		dropdownActionSingle({
			id: 'no_friends_only',
			value: 0,
			checked: true,
			label: actionButtonTextLang(vk.lang),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 0, '')`,
		}),
		dropdownActionSingle({
			id: 'friends_only',
			value: 1,
			checked: false,
			label: postingActionDropdownLangFriends(vk.lang),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 1, '')`,
		}),
		dropdownActionSingle({
			id: 'best_friends_only',
			value: 2,
			checked: false,
			label: bestFriendsDropdown(),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 2, '')`,
		})
	);

	return actionDropdownElement;
}

export default actionDropdown;