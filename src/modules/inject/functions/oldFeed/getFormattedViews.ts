const getFormattedViews = (views: number) => {
	if(views >= 1e9) {
		const k = views / 1e9;
		return k.toFixed(1) + 'B';
	}
	else if(views >= 1e6) {
		const k = views / 1e6;
		return k.toFixed(1) + 'M';
	}
	else if(views >= 1e3) {
		const k = views / 1e3;
		return k.toFixed(1) + 'K';	
	}
	return views.toString();
}

export default getFormattedViews;