import postingSettingsOptionAdsIcon from "./postingSettingsOptionAdsIcon";

const postingSettingsOptionAds = () => {
	const postingSettingsOptionAdsElement = document.createElement('a');
	postingSettingsOptionAdsElement.classList.add('Post__copyrightButton');
	postingSettingsOptionAdsElement.id = 'ads_ord_mini_app_option';
	postingSettingsOptionAdsElement.setAttribute('onclick', 'Wall && Wall.openMarkAsAdsOrdMiniApp(this)');

	const adsORD = document.createElement('input');
	adsORD.type = 'hidden';
	adsORD.name = 'ord_pred_id';
	postingSettingsOptionAdsElement.appendChild(adsORD);

	const adsERID = document.createElement('input');
	adsERID.type = 'hidden';
	adsERID.name = 'erid';
	postingSettingsOptionAdsElement.appendChild(adsERID);

	const postingSettingsOptionAdsIcon_false = postingSettingsOptionAdsIcon(false);
	postingSettingsOptionAdsIcon_false.classList.add('withoutAds');
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsIcon_false);

	const postingSettingsOptionAdsIcon_true = postingSettingsOptionAdsIcon(true);
	postingSettingsOptionAdsIcon_true.classList.add('withAds');
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsIcon_true);

	const postingSettingsOptionAdsText_false = document.createElement('span');
	postingSettingsOptionAdsText_false.classList.add('Post__copyrightButtonText','withoutAds');
	postingSettingsOptionAdsText_false.textContent = getLang?.('global_ads_wall_post_ord_mark_as_ads').toString() || 'Отметить рекламу';
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsText_false);

	const postingSettingsOptionAdsText_true = document.createElement('span');
	postingSettingsOptionAdsText_true.classList.add('Post__copyrightButtonText','withAds');
	postingSettingsOptionAdsText_true.textContent = getLang?.('global_ads_wall_post_ord_mark_as_ads_activated').toString() || 'Изменить отметку о рекламе';
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsText_true);

	return postingSettingsOptionAdsElement;
}

export default postingSettingsOptionAds;