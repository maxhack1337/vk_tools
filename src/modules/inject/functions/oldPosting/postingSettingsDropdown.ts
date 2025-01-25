import postingButtonSettingsList from "./postingButtonSettingsList";
import postingButtonWithDD from "./postingButtonWithDD";

const postingSettingsDropdown = (isGroup:boolean, isSuggested:boolean, onlyOfficial:boolean) => {
	const postingSettingsDropdownElement = document.createElement('div');
	postingSettingsDropdownElement.classList.add('post_settings','PostSettings');
	postingSettingsDropdownElement.id = 'post_settings_btn';

	if (!isSuggested) {
		postingSettingsDropdownElement.appendChild(postingButtonWithDD());
	}

	postingSettingsDropdownElement.appendChild(postingButtonSettingsList(isGroup, onlyOfficial));

	return postingSettingsDropdownElement;
}

export default postingSettingsDropdown;