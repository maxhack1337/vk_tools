import processUrl from './processUrl'
import DownloadStream from './DownloadStream'
import getDownloadName1Plist from './getDownloadName1Plist'
import getDownloadNamePlist from './getDownloadNamePlist'
import getValidIDPlist from './getValidIDPlist'

const handleDownloadButtonPlist = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    const target = e.target as HTMLElement
    const bar = target?.parentNode?.querySelector('.bar > .progress-bar')
    const id = getValidIDPlist(e.target)
    const Orig = getDownloadNamePlist(e.target)
    const Orig2 = getDownloadName1Plist(e.target)

    let Cyr = Orig
    let Cyr1 = Orig2
    if (window.vkenh.setEnglishMusic === 1) {
        Cyr = parseCyr(Orig) ? parseCyr(Orig) : Orig
        Cyr1 = parseCyr(Orig2) ? parseCyr(Orig2) : Orig2
    }
    fetch('https://vk.com/al_audio.php?act=reload_audios', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-requested-with': 'XMLHttpRequest',
        },
        body: `al=1&audio_ids=${id}`,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })
        .then(e => e.json())
        .then(e => {
            let imgurl = e.payload[1][0][0][14];
            let url = processUrl(e.payload[1][0][0][2]).toString()
            console.log(DownloadStream(url, Cyr1 + ' - ' + Cyr, bar, imgurl))
        })
}
export default handleDownloadButtonPlist
