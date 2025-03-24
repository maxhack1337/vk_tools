/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-sequences */
import Hls from 'hls.js'
import downloadBlob from './downloadBlob'
import progressSnack from '../../components/progressSnack/progressSnack'
import { escapeHtmlDownloadTrack } from '../../escapeHtml'

const DownloadStream = (url: string, name: string, elem: any, imgurl = '') => {
    let hls = new Hls()
    let audio_data: Uint8Array,
        blob_data: Uint8Array[] = [],
        dur,
        frag_length: number
    let temp_audio = document.createElement('audio')
    let downloadInProgress;
    if (!document.querySelector('.snackBarStack')) {
        downloadInProgress = document.createElement('div');
        downloadInProgress.classList.add('snackBarStack');
        document.body.appendChild(downloadInProgress);
    } else downloadInProgress = document.querySelector('.snackBarStack');
    let snacky: HTMLDivElement;
    if (imgurl === '') {
        snacky = progressSnack(getLang?.("me_download_waiting") + "...", 'music');
        downloadInProgress?.append(snacky);
    } else {
        snacky = progressSnack(getLang?.("me_download_waiting") + "...", 'custom', imgurl);
        downloadInProgress?.append(snacky);
    }

    let progrText = snacky.querySelector(
        '.vkToolsSnackbar__content-text'
    )

    if (Hls.isSupported()) {
        hls.loadSource(url)
        hls.attachMedia(temp_audio)
        hls.on(Hls.Events.FRAG_BUFFERED, (e, h) => {
            let jijijijij: number = new Date().getTime()
            progrText!.innerHTML =
                getLang?.('box_loading') +
                '<br><br>' +
                escapeHtmlDownloadTrack(name) +
                '.mp3 ' +
                ''.repeat((jijijijij / 1e3) % 4) +
                '' +
                ((blob_data.length / frag_length) * 100).toFixed() +
                '%'
            blob_data.push(audio_data)
            temp_audio.currentTime = h.frag.start + h.frag.duration
            if (blob_data.length >= frag_length) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                hls.stopLoad(),
                    hls.destroy(),
                    snacky
                        .querySelector('.vkToolsSnackbar__in')
                        ?.classList.add('vkToolsRemovebar'),
                    snacky
                        .querySelector('.vkToolsSnackbar__in')
                        ?.addEventListener('animationend', () => {
                            snacky.remove()
                        }),
                    downloadBlob(new Blob(blob_data), name + '.mp3')
            }
        })
        hls.on(Hls.Events.BUFFER_APPENDING, (e, a) => (audio_data = a.data))
        hls.on(Hls.Events.MANIFEST_PARSED, (e, t: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ;(t = t.levels[0].details),
                (frag_length = t.fragments.length),
                (dur = t.totalduration)
        })
        temp_audio.load()
    }
}
export default DownloadStream
