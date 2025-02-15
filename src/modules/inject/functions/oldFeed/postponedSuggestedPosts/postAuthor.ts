const postAuthor = () => {
let selectorsAuthor = [`.postponed.Post--redesignV3 [class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)`,`.suggest.Post--redesignV3 [class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)`];
document.arrive(selectorsAuthor.join(', '), { existing: true }, async function (e) {
			try {
				let anchor = e as HTMLAnchorElement;

				let wallSigned = document.createElement('div');
				wallSigned.classList.add('wall_signed');
				wallSigned.style.paddingLeft = '0px';

				let wallSignedBy = document.createElement('a');
				wallSignedBy.href = anchor.href;
				wallSignedBy.textContent = anchor.textContent;
				wallSignedBy.classList.add('wall_signed_by');

				wallSigned.append(wallSignedBy);

				e.replaceWith(wallSigned);
                        
                let contentContainer = e.querySelector('[class^="PostContentContainer__contentContainer"]');
                contentContainer?.append(wallSigned);
			}
			catch(error) {
				console.log(error);
			}
});
}

export default postAuthor;