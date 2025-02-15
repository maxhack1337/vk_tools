const postSubtitle = () => {
let selectorsSub = [`.postponed.Post--redesignV3 .PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item`,`.suggest.Post--redesignV3 .PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item`];
document.arrive(selectorsSub.join(', '), { existing: true }, async function (e) {
			try {
				let sub = e;
				let removeThis = e.closest('.PostHeaderInfo > .PostHeaderSubtitle');
				let appHere = e.closest('.Post--redesignV3')?.querySelector('.PostHeaderSubtitle__link');
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere?.appendChild(separatorInPost);
				appHere?.appendChild(sub);
				
				let newSub = document.createElement('div');
				newSub.classList.add('PostHeaderSubtitle', 'PostHeaderSubtitle--layoutDefault');
				newSub.append(appHere!);

				removeThis?.remove();

				let app = e.closest('.PostHeaderInfo');
				app?.append(newSub);

			}
			catch(error) {
				console.log(error);
			}
});
}

export default postSubtitle;