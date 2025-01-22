const getValidID = (elem: any) => {
    return `${elem.closest('.audio_row').dataset.fullId}_${
        JSON.parse(elem.closest('.audio_row').dataset.audio)[24]
    }`
}

export default getValidID
