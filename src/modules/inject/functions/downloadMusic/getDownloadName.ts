let getDownloadName = (elem: any) => {
    return `${JSON.parse(elem.closest('.audio_row').dataset.audio)[3]}`
}
export default getDownloadName
