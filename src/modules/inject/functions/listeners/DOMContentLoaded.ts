const DOMContentLoaded = (callback: () => unknown): void => {
	if (document.readyState !== 'loading') {
		callback();
	} else {
		document.addEventListener('DOMContentLoaded', callback, { once: true });
	}
};

export default DOMContentLoaded;
