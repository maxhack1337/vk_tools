import postingButtonSettingsListNotifyLang from "./postingButtonSettingsListNotifyLang";
import postingButtonSettingsListSignLang from "./postingButtonSettingsListSignLang";
import postingSettingsOptionAds from "./postingSettingsOptionAds";

const postingButtonSettingsList = (isGroup:boolean, onlyOfficial:boolean) => {
	const postingButtonSettingsListElement = document.createElement('div');
	postingButtonSettingsListElement.classList.add('_post_settings_items');

	const closeComments = document.createElement('div');
	closeComments.classList.add('checkbox');
	closeComments.id = 'close_comments';
	closeComments.setAttribute('onclick', 'checkbox(this)');
	closeComments.textContent = getLang?.('wall_closing_comments').toString() || 'Выключить комментарии';
	postingButtonSettingsListElement.appendChild(closeComments);

	if (isGroup) {
		const signCheckBox = document.createElement('div');
		signCheckBox.classList.add('checkbox');
		signCheckBox.id = 'signed';
		signCheckBox.setAttribute('onclick', 'checkbox(this); Wall && Wall.postChanged(true);');
		signCheckBox.textContent = postingButtonSettingsListSignLang(vk.lang);
		postingButtonSettingsListElement.appendChild(signCheckBox);
	}

	const silentMode = document.createElement('div');
	silentMode.classList.add('checkbox');
	silentMode.id = 'mute_notifications';
	silentMode.setAttribute('onclick', 'checkbox(this)');
	silentMode.textContent = postingButtonSettingsListNotifyLang(vk.lang);
	postingButtonSettingsListElement.appendChild(silentMode);
	
	if (onlyOfficial === false) {
		const official = document.createElement('div');
		official.className = 'checkbox on';
		official.id = 'official';
		official.setAttribute('onclick', 'Wall && Wall.checkAsGroup(this)');
		official.setAttribute('role', 'checkbox');
		official.setAttribute('aria-checked', 'true');
		official.setAttribute('tabindex', '0');
		official.setAttribute('aria-label', getLang?.('global_on_behalf_group').toString() || 'От имени сообщества');
		official.textContent = getLang?.('global_on_behalf_group').toString() || 'От имени сообщества';
		postingButtonSettingsListElement.prepend(official);
	}

	postingButtonSettingsListElement.append(postingSettingsOptionAds());

	return postingButtonSettingsListElement;
}

export default postingButtonSettingsList;