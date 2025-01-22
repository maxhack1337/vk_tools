const downloadBlob = (blob: Blob | MediaSource, name = 'file.txt') => {
    const data = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = data
    link.download = name
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        })
    )
    setTimeout(() => {
        window.URL.revokeObjectURL(data)
        link.remove()
    }, 100)
}
export default downloadBlob
