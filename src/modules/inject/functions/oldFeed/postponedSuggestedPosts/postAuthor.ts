const postAuthor = () => {
let selectorsAuthor = [`.postponed.Post--redesignV3 [class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)`,`.suggest.Post--redesignV3 [class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)`];
document.arrive(selectorsAuthor.join(', '), { existing: true }, async function (e) {
			try {
				
				let isRepost;
				if(!e.closest('.PostCopyQuote--redesignV3'))
				{
					isRepost = '';
				}
				else {
					isRepost = '.PostCopyQuote--redesignV3 ';
				}
				let sub = e.closest(isRepost + '[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]') as HTMLElement;
				sub?.classList.add('vkEnhancerPostAuthorTip');
				let appHere;
				if(isRepost === '') {
					appHere = e.closest('.Post--redesignV3')?.querySelector('.post_date') as HTMLElement;
				}
				else {
					appHere = e.closest('.vk_enhancer_copy_post_subhead') as HTMLElement;
				}
				appHere.style.display = "flex";
				appHere.style.alignItems = "center";
				sub.style.fontSize = "12.5px";
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere.appendChild(separatorInPost);
				appHere.appendChild(sub);
			}
			catch(error) {
				console.log(error);
			}
});
}

export default postAuthor;