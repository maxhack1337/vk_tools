/* eslint-disable no-useless-escape */
import carouselGridKeys from "./carouselGridKeys";
import postingBlock from "./postingBlock";

const exportVars = async(wall_oid:number,public_link:string,loc:string,owner:{id: number;name: string;photo: string;},wall_tpl:{profileData: [profileId: number, photo: string, href: string, name: string];ownerData: [ownerId: number, photo: string, href: string, name: string];},wallData:any) => {
	if(localStorage.getItem('old_post_design') === 'false') return;
	console.info('[VKENH] Wall data fetched');
	console.log({wall_oid,public_link,loc,owner,wall_tpl,wallData});
	let newPostingBlock = document.querySelector('#page_block_submit_post.new_posting');
	let isFeedBlock = document.querySelector('#main_feed');
	let isWallModule = cur.module === 'wall';
	let isElseProfile = document.querySelector('.ui_tabs_right_section > .PostingReactBlock__root');
	if (document.querySelector('#submit_post_field')) return;
	if (!isFeedBlock && !newPostingBlock && !isElseProfile && !isWallModule) return;

	const [ownerId, ownerPhoto, ownerHref, ownerName] = wallData?.ownerData || [];
	const [profileId, profilePhoto, profileHref] = wallData?.profileData || [];
	let photoApi;
	let notMineWall;
	if(vk.id !== owner?.id && owner?.id > 0) {
		notMineWall = await vkApi.api('users.get',{'user': vk.id,'fields': 'photo_200'});
		notMineWall = notMineWall[0].photo_200
	}
	if(!(ownerPhoto || owner?.photo || profilePhoto)) {
		photoApi = await vkApi.api('users.get',{'user': vk.id,'fields': 'photo_200'});
		photoApi = photoApi[0].photo_200
	}
	if (!window.templates) {
		window.templates = {};
	}

	if (!window.templates['primary_attachments_view_template']) {
		window.templates['primary_attachments_view_template'] =
			`<div class="post_action_btn primary_attachments_view" id=\'primary_attachments_view_btn%link_id%\' style=\'display: none;\'>\n  <div class="post_action_btn_layout">\n    <span class="post_action_btn_text" role="button" aria-label="${carouselGridKeys(vk.lang)[1] || 'Сетка'}">${carouselGridKeys(vk.lang)[1] || 'Сетка'}</span>\n    <span class="post_action_image_btn"><svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fill-rule="evenodd"/></svg></span>\n    <div class="post_action_tt_content">\n      <div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'${carouselGridKeys(vk.lang)[1] || 'Сетка'}\' data-value=\'grid\'>\n  \n  <div class="FancyElementTT__itemLabel">${carouselGridKeys(vk.lang)[1] || 'Сетка'}</div>\n</div><div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'${carouselGridKeys(vk.lang)[0] || 'Карусель'}\' data-value=\'carousel\'>\n  \n  <div class="FancyElementTT__itemLabel">${carouselGridKeys(vk.lang)[0] || 'Карусель'}</div>\n</div>\n    </div>\n  </div>\n</div>`;
	}
	const oid = wall_oid || ownerId || profileId;
	const isMyWall = vk.id === wall_oid?.valueOf();
	const submitPostBlock = postingBlock({
		isSuggested: wall_oid !== (ownerId || profileId) && (oid < 0) && wallData.suggesting,
		oid,
		fromOid: oid,
		ownerHref: ownerHref || public_link || loc || (owner?.id ? `id${owner.id}` : undefined) || profileHref,
		ownerPhoto: notMineWall || wall_tpl?.ownerData?.at(1) || ownerPhoto || owner?.photo || profilePhoto || photoApi,
		ownerName,
		onlyOfficial: wallData.only_official?.valueOf(),
		isMyWall
	});
	if (newPostingBlock) {
		newPostingBlock.parentElement?.insertBefore(submitPostBlock, newPostingBlock);
		newPostingBlock.remove();
	}
	if (isFeedBlock) {
		isFeedBlock.parentElement?.prepend(submitPostBlock);
		let newFeedPostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newFeedPostingBlock) newFeedPostingBlock.remove();
	}
	if (isElseProfile) {
		isElseProfile.closest('.WallLegacy')?.prepend(submitPostBlock);
		let newElsePostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newElsePostingBlock) newElsePostingBlock.remove();
	}
	if (isWallModule) {
		document.querySelector('.PostingReactBlock__root')?.parentElement?.prepend(submitPostBlock);
		let newWallPostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newWallPostingBlock) newWallPostingBlock.remove();
	}
}

export default exportVars;