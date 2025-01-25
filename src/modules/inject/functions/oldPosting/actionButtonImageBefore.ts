const actionButtonImageBefore = () => {
	const buttonImageBefore = document.createElement('span');
	buttonImageBefore.classList.add('post_action_image_btn');

	const buttonImageSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	buttonImageSVG.setAttribute('height', '8');
	buttonImageSVG.setAttribute('width', '12');
	buttonImageSVG.setAttribute('viewBox', '0 0 12 8');
	buttonImageSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	buttonImageSVG.setAttribute('fill', 'currentColor');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('clip-rule', 'evenodd');
	path.setAttribute('d', 'M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z');
	path.setAttribute('fill', 'currentColor');
	path.setAttribute('fill-rule', 'evenodd');

	buttonImageSVG.appendChild(path);

	buttonImageBefore.appendChild(buttonImageSVG);

	return buttonImageBefore;
}

export default actionButtonImageBefore;