import showSnackbar from "../../components/snackbar/snackbar";
import DownloadStream from "./DownloadStream";
import getDownloadErrorLang from "./getDownloadErrorLang";
import processUrl from "./processUrl";

const getTopPlayerCr = () => {
    const audioObj = window.AudioUtils.audioTupleToAudioObject(window.ap.getCurrentAudio());
    if (audioObj) {
        const id = audioObj.fullId;
        const performer = audioObj.performer;
        const title = audioObj.title;

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
                console.log(DownloadStream(url, performer + ' - ' + title, this, imgurl))
            } catch (e) {
                showSnackbar({
                    text: getDownloadErrorLang(vk.lang),
                    timeout: 4000,
                    icon: 'error'
                });
            }
        })
    }
}

export default getTopPlayerCr;