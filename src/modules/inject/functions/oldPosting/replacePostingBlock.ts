const replacePostingBlock = (submitPostBlock:any, newPostingBlock:any, isFeedBlock:any, isElseProfile:any, isWallModule:any) => {
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

export default replacePostingBlock;