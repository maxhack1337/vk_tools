import 'arrive';


const updateReactState = () => {
	if (localStorage.getItem("removePostReactions") === "true") 
  {
	try {
		document.arrive(
		".PostBottomActionLikeBtns--withTransparentButtons .like_btns>.PostBottomActionContainer:first-child > .PostButtonReactions--post",
		{ existing: true },
			function (e: Element) {
				let postId;
				try {
					postId = e?.closest('.Post--redesign.Post--redesignV3[id^="post"]')?.getAttribute("id");
				}
				catch(error) {
					postId = '';
				}
				e.removeAttribute("onmouseenter");
				e.removeAttribute("onkeydown");
				e.setAttribute(
					"onmouseover",
					"Likes.showLikes(this, '" +
						postId?.replace("post", "wall") +
					"', {isFromReactionsPreview:1})"
			);
			}
		);
	}
	catch(error) {console.info('[VK Tools] RemoveReactions Error', error);}
  }
}

export default updateReactState;