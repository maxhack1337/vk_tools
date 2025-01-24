const handleClickOutsideBox = (event: MouseEvent, element: HTMLElement) => {
    const target = event.target as HTMLElement;
    if (element && !element.contains(target) && element.style.display !== 'none') {
        element.style.display = 'none';
    }
}

export default handleClickOutsideBox;