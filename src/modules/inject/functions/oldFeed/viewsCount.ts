import getFormattedViews from "./getFormattedViews";

const viewsCount = (postData: { postRaw: string; viewsCount: number; }, postBottom: HTMLElement) => {
	if (!postBottom.parentElement?.querySelector('.vkEnhancerPostViews')) {
		let postBottomNew = document.createElement('div');
		postBottomNew.classList.add('vkEnhancerPostViews');
		let postParentBottom = postBottom.parentElement;
		postBottomNew.innerHTML = `
		<div class="like_views like_views--inActionPanel" role="img" onmouseover="Likes &amp;&amp; Likes.updateViews('wall`+ postData.postRaw + `', event);" title="` + getLang?.('video_N_views_list', postData.viewsCount) + `">
			<span class="like_views__icon "><svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path><path clip-rule="evenodd" d="M15.5 8c0-1-3-5-7.5-5S.5 7 .5 8s3 5 7.5 5 7.5-4 7.5-5zm-4 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" fill-rule="evenodd"></path></g></svg></span>
			<span class="_views" data-count="`+ postData.viewsCount + `">` + getFormattedViews(postData.viewsCount) + `</span>
			</div>
		`;
		if (postData.viewsCount !== 0) postParentBottom?.appendChild(postBottomNew);
	}
}

export default viewsCount;