const redirectIfNeeded = () => {
    const currentUrl = window.location.href;
    const baseUrl = 'https://vk.com/groups';

    if (currentUrl.startsWith(baseUrl) && !currentUrl.startsWith(baseUrl + '/')) {
        if (!currentUrl.includes('act=recommendations')) {
            const url = new URL(currentUrl);
            url.pathname = '/groups/my_all_groups';
            window.location.href = url.toString();
        }
    }
}

export default redirectIfNeeded;
