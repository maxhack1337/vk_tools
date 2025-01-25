const postingBlockDataRoot = ({
	oid,
	fromOid,
	ownerName = '',
	ownerPhoto = '',
	ownerHref = '',
}:any) => {
	const postingBlockMainRoot = document.createElement('div');
	postingBlockMainRoot.id = 'submit_post_box';
	postingBlockMainRoot.classList.add('submit_post_box','clear_fix','_submit_post_box');
	postingBlockMainRoot.setAttribute('data-from-oid', String(fromOid) || '');
	postingBlockMainRoot.setAttribute('data-oid', String(oid) || '');
	postingBlockMainRoot.setAttribute('data-owner-name', ownerName);
	postingBlockMainRoot.setAttribute('data-owner-photo', ownerPhoto);
	postingBlockMainRoot.setAttribute('data-owner-href', ownerHref);
	postingBlockMainRoot.setAttribute(
		'onclick',
		"if(domClosest('article_snippet', event.target)) return;return cancelEvent(event)"
	);

	if (oid > 0) {
		postingBlockMainRoot.classList.add('submit_post_box_with_sitposting');
	}
	return postingBlockMainRoot;
}

export default postingBlockDataRoot;