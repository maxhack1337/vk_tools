const dropdownActionSingle = ({ id, value, checked, label, onclick }: any) => {
	const dropdownActionSingleElement = document.createElement('div');
	dropdownActionSingleElement.classList.add('FancyElementTT__item','radiobtn');
	dropdownActionSingleElement.role = 'radio';
	dropdownActionSingleElement.setAttribute('data-value', String(value));
	dropdownActionSingleElement.setAttribute('aria-checked', checked ? '1' : '');

	if (onclick) {
		dropdownActionSingleElement.setAttribute('onclick', onclick);
	}

	if (id) {
		dropdownActionSingleElement.id = id;
		dropdownActionSingleElement.classList.add(`name_${id}`);
		dropdownActionSingleElement.setAttribute('name', id);
	}

	if (typeof label === 'string') {
		dropdownActionSingleElement.setAttribute('aria-label', label);
	}

	if (checked) {
		dropdownActionSingleElement.classList.add('on');

		const checkedIcon = document.createElement('span');
		checkedIcon.classList.add('FancyElementTT__checkIcon');

		const checkedIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		checkedIconSVG.classList.add('vkuiIcon', 'vkuiIcon--16', 'vkuiIcon--w-16', 'vkuiIcon--h-16', 'vkuiIcon--check_outline_16');
		checkedIconSVG.setAttribute('width', '16');
		checkedIconSVG.setAttribute('height', '16');
		checkedIconSVG.setAttribute('viewBox', '0 0 16 16');
		checkedIconSVG.style.width = '16px';
		checkedIconSVG.style.height = '16px';
		checkedIconSVG.setAttribute('fill', 'currentColor');

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('fill-rule', 'evenodd');
		path.setAttribute('d', 'M12.782 4.721a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06 0l-2.502-2.5A.75.75 0 0 1 4.28 8.22l1.971 1.97 5.47-5.469a.75.75 0 0 1 1.06 0Z');
		path.setAttribute('clip-rule', 'evenodd');
		path.setAttribute('fill', 'currentColor');

		checkedIconSVG.appendChild(path);
		checkedIcon.appendChild(checkedIconSVG);

		dropdownActionSingleElement.appendChild(checkedIcon);
	}

	const dropdownActionSingleElementText = document.createElement('div');
	dropdownActionSingleElementText.classList.add('FancyElementTT__itemLabel');

	if (typeof label === 'string') {
		dropdownActionSingleElementText.textContent = label;
	} else if (label instanceof HTMLElement) {
		dropdownActionSingleElementText.appendChild(label);
	}

	dropdownActionSingleElement.appendChild(dropdownActionSingleElementText);

	return dropdownActionSingleElement;
}

export default dropdownActionSingle;