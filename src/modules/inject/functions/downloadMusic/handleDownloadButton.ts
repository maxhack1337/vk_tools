import processUrl from "./processUrl"
import DownloadStream from "./DownloadStream"
import getDownloadName from "./getDownloadName"
import getDownloadName1 from "./getDownloadName1"
import getValidID from "./getValidID"
import showSnackbar from "../../components/snackbar/snackbar"
import getDownloadErrorLang from "./getDownloadErrorLang"

const handleDownloadButton = (e:any) =>{
    e.preventDefault()
    e.stopPropagation()
    const bar = e.target.parentNode.querySelector('.bar > .progress-bar')
    const id = getValidID(e.target)
    const Orig = getDownloadName(e.target)
    const Orig2 = getDownloadName1(e.target)
    let Cyr = Orig
    let Cyr1 = Orig2
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
            try {
                let imgurl = e.payload[1][0][0][14];
                let url = processUrl(e.payload[1][0][0][2]).toString()
                console.log(DownloadStream(url, Cyr1 + ' - ' + Cyr, bar, imgurl))
            } catch (e) {
                showSnackbar({
                    text: getDownloadErrorLang(vk.lang),
                    timeout: 4000,
                    icon: 'error'
                });
            }
        })
}
export default handleDownloadButton