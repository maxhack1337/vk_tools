import postingActionButtons from "./postingActionButtons";
import postingBlockAvatar from "./postingBlockAvatar";
import postingBlockDataRoot from "./postingBlockDataRoot";
import postingBlockErrorOnPosting from "./postingBlockErrorOnPosting";
import postingMediaInfo from "./postingMediaInfo";
import postingMediaPreview from "./postingMediaPreview";
import postingSubmitBlock from "./postingSubmitBlock";
import postingWrap from "./postingWrap";

const postingBlock = ({
	oid,
	fromOid,
	ownerName,
	ownerPhoto,
	ownerHref,
	isSuggested,
	onlyOfficial,
	isMyWall
}:any) => {
	
	const isUser = oid ? (oid > 0) : true;
	const pageBlock = document.createElement('div');
	pageBlock.classList.add('page_block');
	pageBlock.id = 'page_block_submit_post';

	if (!isUser) {
		pageBlock.setAttribute('data-tooltip-id', 'business_groups_web:make_post');
	}

	const postingBlockMainRoot = postingBlockDataRoot({
		oid,
		fromOid,
		ownerName,
		ownerPhoto,
		ownerHref,
	});

	postingBlockMainRoot.append(
		postingBlockErrorOnPosting(),
		postingBlockAvatar({ ownerHref, ownerPhoto }),
		postingWrap(isSuggested, onlyOfficial),
		postingMediaPreview(),
		postingMediaInfo(),
		postingActionButtons(isUser, isMyWall),
		postingSubmitBlock(!isUser, isSuggested, onlyOfficial)
	);

	pageBlock.appendChild(postingBlockMainRoot);

	return pageBlock;
}

export default postingBlock;