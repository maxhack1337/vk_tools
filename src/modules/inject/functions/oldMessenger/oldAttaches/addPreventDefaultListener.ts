const addPreventDefaultListener = (el: HTMLElement) => {
    el.addEventListener('click', (e: MouseEvent) => {
        let target = e.target as HTMLElement;
        if (target.hasAttribute('onclick')) {
            e.preventDefault();
            e.stopPropagation();
        }
    })
}

export default addPreventDefaultListener;
