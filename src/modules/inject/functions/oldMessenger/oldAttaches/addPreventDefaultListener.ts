const addPreventDefaultListener = (el: HTMLElement) => {
    el.addEventListener('click', (e: MouseEvent) => {
        let target = e.target as HTMLElement;
        if ((target.hasAttribute('onclick') && target.getAttribute('onclick')!.length > 1) || target.closest('.audio_row')) {
            e.preventDefault();
            e.stopPropagation();
        }
    })
}

export default addPreventDefaultListener;
