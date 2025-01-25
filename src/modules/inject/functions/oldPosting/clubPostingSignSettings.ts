import clubPostingSignSettingsLang from "./clubPostingSignSettingsLang";

const clubPostingSignSettings = () => {
	const signSettingElement = document.createElement('div');
	signSettingElement.classList.add('checkbox_pic','check_sign_pic','PostOption');
	signSettingElement.id = 'check_sign';
	signSettingElement.setAttribute('onclick', 'Wall && Wall.saveCheckSign(this)');
	signSettingElement.setAttribute('onmouseover', 'showTitle(this, false, [10,10], {noZIndex: true});');
	signSettingElement.setAttribute('role', 'checkbox');
	signSettingElement.setAttribute('aria-checked', 'false');
	signSettingElement.setAttribute('tabindex', '0');
	signSettingElement.setAttribute('data-title', getLang?.('wall_check_sign_disabled').toString() || 'Подпись останется при редактировании записи');
	signSettingElement.setAttribute('aria-label', getLang?.('wall_check_sign_enabled').toString() || 'Подпись будет скрыта при редактировании записи');

	const signHint = document.createElement('span');
	signHint.classList.add('blind_label');
	signHint.textContent = clubPostingSignSettingsLang(vk.lang);

	const signIcon = document.createElement('span');
	signIcon.classList.add('PostOption__iconWrapper');
	
	const signIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	signIconSVG.setAttribute('height', "20");
	signIconSVG.setAttribute('width', "20");
	signIconSVG.setAttribute('viewBox', '0 0 20 20');
	signIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	signIconSVG.setAttribute('fill', 'currentColor');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute(
		'd',
		'M12.5 5C12.5 3.61859 11.3814 2.5 10 2.5C8.61859 2.5 7.5 3.61859 7.5 5C7.5 6.38141 8.61859 7.5 10 7.5C11.3814 7.5 12.5 6.38141 12.5 5ZM14 5C14 7.20984 12.2098 9 10 9C7.79016 9 6 7.20984 6 5C6 2.79016 7.79016 1 10 1C12.2098 1 14 2.79016 14 5ZM4 15.5C4 16.2152 4.35765 16.5 5 16.5H15C15.6423 16.5 16 16.2152 16 15.5C16 13.1666 13.4334 12 10 12C6.56661 12 4 13.1666 4 15.5ZM2.5 15.5C2.5 12.0152 5.83339 10.5 10 10.5C14.1666 10.5 17.5 12.0152 17.5 15.5C17.5 17.1283 16.4053 18 15 18H5C3.59467 18 2.5 17.1283 2.5 15.5Z'
	);
	path.setAttribute('fill', 'currentColor');

	signIconSVG.appendChild(path);

	signIcon.appendChild(signIconSVG);


	signSettingElement.append(signHint, signIcon);

	return signSettingElement;
}

export default clubPostingSignSettings;