const replacePostingBlock = (submitPostBlock:any, newPostingBlock:any, isFeedBlock:any, isElseProfile:any, isWallModule:any, isBeginBlock:any) => {
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
    
    if (isBeginBlock) {
        isBeginBlock.insertAdjacentElement('afterend', submitPostBlock);
        let newBeginPostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newBeginPostingBlock) newBeginPostingBlock.remove();
    }
}

export default replacePostingBlock;