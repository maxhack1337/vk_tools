const getValidIDPlist = (elem: any) => {
    return `${elem.closest('.vkEnhancerDownloadMusicButton').dataset.fullId}`
}
export default getValidIDPlist
