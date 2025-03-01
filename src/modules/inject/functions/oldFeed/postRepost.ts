import getFormattedPostDate from "./getFormattedPostDate";

const postRepost = async (e: Element, postData: { postRaw: any; } | undefined) => {
			try {
			let postType = "post";
			let isCase = '';
			/*Дата репоста*/
			let repost = e.querySelector('.PostCopyQuote--redesignV3');
			if(!repost?.querySelector('.vkEnhancerPostDate')) {
				let repostID;
				try { 
					repostID = repost?.querySelector('.copy_post_image')?.getAttribute('data-post-id');
				} catch(error) {
					try {
						repostID = repost?.querySelector('.PostHeader__coauthorAvatarWrapper')?.getAttribute('data-item-owner-id') + "_" + repost?.querySelector('.PostHeader__coauthorAvatarWrapper')?.getAttribute('data-item-id');
					}
					catch(error) {
						console.error('[VK Tools Error] Не удалось получить данные о репосте - данные о репосте отсутствуют в HTML');
					}
				}
				let repostData;
				try {
					repostData = await vkApi.api('wall.getById',{'posts':repostID});	
				}
				catch(error) {
					try {
						let x = await vkApi.api('wall.getById',{posts:postData?.postRaw,extended:1});
						let postInner = x.items[0].copy_history[0];
						repostID = postInner.from_id + "_" + postInner.id;
						repostData = {items:[{date:postInner.date}]};
						postType = postInner.post_type;
						isCase = postType;
						}
					catch (error) {
						console.error('[VKENH Error] Не удалось получить данные о репосте - не найдена дата репоста. Вероятнее всего, вы находитесь в режиме инкогнито');
						repostData = {items:[{date:1}]};
					}
				}
				
				let postHeader = repost?.querySelector('[class^="copy_post_header_info"]');
				let postDuoHeader = repost?.querySelector('[class="CopyPost__author"]')?.parentElement;
				let postDate = document.createElement('div');
				postDate.classList.add("copy_post_date","vk_enhancer_copy_post_subhead");
				if (isCase === '' || isCase === 'post') {
					try {
						postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall`+ repostID + `" onclick="return showWiki({w: 'wall` + repostID + `'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					`+ getFormattedPostDate(repostData.items[0].date) + `
				</a>
				`;
					}
					catch (error) {
						let copyPostQuery = await vkApi.api('wall.getById', { posts: postData?.postRaw, extended: 1 });
						let copyItem = copyPostQuery.items[0].copy_history[0];
						postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall`+ copyItem.owner_id + `_` + copyItem.id + `" onclick="return showWiki({w: 'wall` + copyItem.owner_id + `_` + copyItem.id + `'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					`+ getFormattedPostDate(copyItem.date) + `
				</a>
				`;
					}
				} else if (isCase === 'video') {
					postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/`+ postType + repostID + `" onclick="event.preventDefault(); event.stopPropagation(); window.showVideo('` + repostID + `','0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);">
					`+ getFormattedPostDate(repostData.items[0].date) + `
				</a>
			`;
				}
				else {
					postDate.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/`+ postType + repostID + `" onclick="event.preventDefault(); event.stopPropagation(); window.showPhoto('` + repostID + `');">
					`+ getFormattedPostDate(repostData.items[0].date) + `
				</a>
			`;
				}
			try {
				postHeader?.appendChild(postDate);
			}
			catch(error) {
				postDuoHeader?.appendChild(postDate);
			}
			}
			}
			catch(error) {
				console.log(error);
			}
}

export default postRepost;