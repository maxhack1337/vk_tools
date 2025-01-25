const postingBlockErrorOnPosting = () => {
	const postingErrorBlock = document.createElement('div');
	postingErrorBlock.id = 'submit_post_error';
	postingErrorBlock.classList.add('error');

	return postingErrorBlock;
}

export default postingBlockErrorOnPosting;