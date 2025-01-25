const postingWarningTooMuchSymbols = () => {
	const postingWarnOfSymbols = document.createElement('span');
	postingWarnOfSymbols.classList.add('post_field_warning');

	return postingWarnOfSymbols;
}

export default postingWarningTooMuchSymbols;