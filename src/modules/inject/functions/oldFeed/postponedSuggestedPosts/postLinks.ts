import linkAttachment from "../attachments/linkAttachment";
import getPostAttaches from "../getPostAttaches";

const postLinks = () => {
let selectorsLinks = [`.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])`,`.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])`,`.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])`,`.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])`]
document.arrive(selectorsLinks.join(', '), { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let dataAttachments;
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass?.classList.add('vkEnhancerPostponedPost');
		try {
			dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]')!);
		} catch(error) {
			console.log(error);
		}

			let allLinks = docus;
			let count = 0;
			dataAttachments.item.attachments.forEach(async function (linkChip:any) {
			if(linkChip.link) {
			let linkCurrent = linkChip.link;
			let secondaryAttachDoc = document.createElement('div');
			secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttach');
			if(count === 0) {
				secondaryAttachDoc.classList.add('vkuiDiv','vkuiRootComponent','vkEnhancerSecondaryAttachFirst');
				count += 1;
			}
			secondaryAttachDoc.style.padding = "0px 8px";
			secondaryAttachDoc.innerHTML = linkAttachment(linkCurrent);
			if(!linkCurrent.description) {
				secondaryAttachDoc.querySelector('.linkDescr')!.textContent = linkCurrent.url;
			}
			if(linkCurrent.photo) {
				let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage') as HTMLElement;
				fallBack.querySelector('.vkuiImageBase__fallback')?.remove();
				fallBack.style.background = "url("+linkCurrent.photo.sizes[0].url+")";
				fallBack.style.backgroundSize = "cover";
			} else {
				
			}
			allLinks?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
			}});
		}
});
}

export default postLinks;