const postingMediaPreview = () => {
	const mediaPreview = document.createElement('div');
	mediaPreview.id = 'media_preview';
	mediaPreview.classList.add('clear_fix','media_preview','wall_post_media_preview');

	return mediaPreview;
}

export default postingMediaPreview;