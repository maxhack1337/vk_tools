const getDownloadName1Plist = (elem: any) => {
    return `${elem.closest('.vkEnhancerDownloadMusicButton').dataset.subtitle}`
}
export default getDownloadName1Plist
