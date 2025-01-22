const getDownloadName1 = (elem: any) => {
    return `${JSON.parse(elem.closest('.audio_row').dataset.audio)[4]}`
}
export default getDownloadName1
