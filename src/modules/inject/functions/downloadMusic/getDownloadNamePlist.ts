const getDownloadNamePlist = (elem: any) => {
    return `${elem.closest('.vkEnhancerDownloadMusicButton')!.dataset.title}`
}
export default getDownloadNamePlist
