const leftMenuCustom = () => {
document.arrive('[class^="vkitLeftMenuItem__container"]', { existing: true }, function (e) {
	try {
        let leftTabs = JSON.parse(localStorage.getItem('customLeftMenuLabels') || '');
		let savedString = e?.querySelector?.('[data-testid="leftmenuitem-text"]')?.textContent;
		switch(e.id) {
			case "l_pr":
				savedString = leftTabs.profileLeft;
				break;
			case "l_nwsf":
				savedString = leftTabs.feedLeft;
				break;
			case "l_msg":
				savedString = leftTabs.imLeft;
				break;
			case "l_ca":
				savedString = leftTabs.callsLeft;
				break;
			case "l_fr":
				savedString = leftTabs.friendsLeft;
				break;
			case "l_gr":
				savedString = leftTabs.groupsLeft;
				break;
			case "l_ph":
				savedString = leftTabs.photoLeft;
				break;
			case "l_aud":
				savedString = leftTabs.audioLeft;
				break;
			case "l_vid":
				savedString = leftTabs.videoLeft;
				break;
			case "l_svd":
				savedString = leftTabs.clipsLeft;
				break;
			case "l_ap":
				savedString = leftTabs.gamesLeft;
				break;
			case "l_stickers":
				savedString = leftTabs.stickersLeft;
				break;
			case "l_mk":
				savedString = leftTabs.marketLeft;
				break;
			case "l_mini_apps":
				savedString = leftTabs.servicesLeft;
				break;
			case "l_vkp":
				savedString = leftTabs.vkpayLeft;
				break;
			case "l_fav":
				savedString = leftTabs.bookmarksLeft;
				break;
			case "l_doc":
				savedString = leftTabs.filesLeft;
				break;
			case "l_ads":
				savedString = leftTabs.adsLeft;
				break;
			case "l_apm":
				savedString = leftTabs.appmngLeft;
				break;
			case "l_faq":
				savedString = leftTabs.faqLeft;
				break;
				
        }
        const leftMenuItemText = e.querySelector('[data-testid="leftmenuitem-text"]');
		if(savedString && leftMenuItemText) {
			leftMenuItemText.textContent = savedString;
		}
	}
	catch(error) {
        console.log('[VK Tools] Error in leftMenuItems',error);
	}
  }
);
}

export default leftMenuCustom;