import articleAttachment from "../attachments/articleAttachment";
import getArticleInfo from "../getArticleInfo";

const postArticle = () => {
let selectorsArticle = [`.postponed.Post--redesignV3 [class^="vkitSnippetAttachment__root"]`,`.suggest.Post--redesignV3 [class^="vkitSnippetAttachment__root"]`]
document.arrive(selectorsArticle.join(', '), { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass?.classList.add('vkEnhancerPostponedPost');
			let articleSetClosest = postAppendClass?.querySelector('.vkuiDiv [class^="vkitSnippetAttachment__root"]');
			let getArticle = articleSetClosest?.parentElement;
			let swapArticle = articleSetClosest?.firstChild;
			let f = getArticleInfo(getArticle!);
			try {
			if(f.attachment.type === "article") {
				let articleInfo = f.attachment.article;
				let articleUrlShort = articleInfo.url.slice(14)
				let newArticlePreset = document.createElement('a');
				newArticlePreset.classList.add('vk_enhancer_article_snippet','article_snippet','clear_fix')
				newArticlePreset.setAttribute('onclick',`return nav.go('${articleInfo.url}', event);`);
				newArticlePreset.setAttribute('onmouseenter',`articlePrepare('${articleUrlShort}', { ref: '' })`);
				newArticlePreset.setAttribute('data-article-raw-id',articleInfo.owner_id+'_'+articleInfo.id);
				newArticlePreset.setAttribute('data-post-id','');
                newArticlePreset.innerHTML = articleAttachment(articleInfo);
                let snippetImage = newArticlePreset.querySelector('.article_snippet__image') as HTMLElement;
				if(articleInfo.photo) {
					snippetImage.style.backgroundImage = `url(${articleInfo.photo.orig_photo.url})`;
				}
				swapArticle?.remove();
				articleSetClosest?.appendChild(newArticlePreset);
			}
			} catch(error) {
				console.log(error);
			}
			
		}
});
}

export default postArticle;