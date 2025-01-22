import Hls from 'hls.js'
import fromId from '../../../content/fromId'
import _o from './_o'
import downloadBlob from './downloadBlob'

const DownloadStream = (url: string, name: string, elem: any) => {
    let hls = new Hls()
    let audio_data: Uint8Array,
        blob_data: Uint8Array[] = [],
        dur,
        frag_length: number
    let temp_audio = document.createElement('audio')
    let downloadInProgress = document.createElement('div')
    downloadInProgress.innerHTML = `<div class="vkEnhSnackbar vkEnhSnackbar--ios vkEnhSnackbar--desktop vkui--vkIOS--light">
  <div class="vkEnhSnackbar__in">
    <div class="vkEnhSnackbar__body vkEnhSnackbar--layout-vertical vkEnhSnackbar__snackbar">
      <div class="vkEnhSnackbar__before"><svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--song_outline_24" viewBox="0 0 24 24" width="24" height="24" style="width: 24px; height: 24px;"><path fill="currentColor" fill-rule="evenodd" d="m16.302 4.06-2.4.661a1.1 1.1 0 0 0-.803 1.06v.845l2.407-.681a1.1 1.1 0 0 0 .796-1.058zM13.1 8.5l2.902-.824a2.9 2.9 0 0 0 2.099-2.79V3.006a1 1 0 0 0-1.267-.964l-3.414.946a2.9 2.9 0 0 0-2.118 2.794v8.908c-2.601.018-4.222.835-5.016 2.167-.864 1.45-.5 3.188.505 4.148a3.42 3.42 0 0 0 4.06.577c1.662-1.041 2.21-2.636 2.25-4.98zm-1.796 7.989c-2.331-.045-3.144.733-3.487 1.307-.402.674-.219 1.494.23 1.919.509.499 1.2.636 1.893.305.561-.328 1.364-.982 1.364-3.531" clip-rule="evenodd"></path></svg></div>
      <div class="vkEnhSnackbar__content"><span class="vkEnhTypography vkEnhSnackbar__content-text vkEnhParagraph"></span></div>
    </div>
  </div>
</div>`
    let styleElement = fromId('vkEnDownloadPopup')
    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'vkEnDownloadPopup'
        document.head.appendChild(styleElement)
    }
    styleElement.innerHTML = `
  .vkEnhSnackbar__before {
	color:var(--vkui--color_icon_accent);
	padding-right:12px;
  }
  .vkEnhSnackbar{
	margin:12px;
	user-select:none;
	z-index:var(--vkui--z_index_popout);
	position:fixed;
	inset-block-end:0;
	inset-inline-start:auto;
	inline-size:100%;
	padding-inline:var(--vkui_internal--safe_area_inset_left) var(--vkui_internal--safe_area_inset_right);
	padding-block-end:var(--vkui_internal--safe_area_inset_bottom)
}
.vkEnhSnackbar__in,.vkEnhSnackbar__snackbar{
	transition:transform 320ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar__body {
	display:flex;
	align-items:center;
}
.vkEnhSnackbar__in{
	border-radius:8px;
	background-color:var(--vkui--color_background_modal);
	box-shadow:var(--vkui--elevation3)
	padding:16px;
	animation:vkenh-snackbar-intro-vertical 340ms var(--vkui--animation_easing_platform);
}
.vkEnhRemovebar {
	animation:vkenh-snackbar-intro-vertical-remove 340ms var(--vkui--animation_easing_platform)!important;
}
.vkEnhSnackbar--ios .vkEnhSnackbar__in,.vkEnhSnackbar--ios .vkEnhSnackbar__snackbar{
	transition:transform 400ms var(--vkui--animation_easing_platform)
}
.vkEnhSnackbar--desktop{
	max-inline-size:351px;
	inset-inline-start:0;
	inset-block-end:0
}
.vkEnhSnackbar--desktop .vkEnhSnackbar__in{
	padding:16px;
	animation-name:vkenh-snackbar-intro-horizontal
}
.vkEnhSnackbar--desktop.vkuiSnackbar--closing--wCurt .vkEnhSnackbar__in{
	transform:translate3d(-140%, 0, 0)
}
.vkuiSnackbar--touched--a8Qa6 .vkEnhSnackbar__snackbar{
	transition:none
}
@keyframes vkenh-snackbar-intro-vertical{
	from{
		transform:translate3d(0, 140%, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
@keyframes vkenh-snackbar-intro-vertical-remove {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-140%, 0, 0); /* Сдвигаем блок влево на 100% от его ширины */
        opacity: 0!important; /* Добавляем анимацию исчезновения */
    }
}
@keyframes vkenh-snackbar-intro-horizontal{
	from{
		transform:translate3d(-140%, 0, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
`
    let progrText = downloadInProgress.querySelector(
        '.vkEnhSnackbar__content-text'
    )

    document.body.appendChild(downloadInProgress)
    if (Hls.isSupported()) {
        hls.loadSource(url)
        hls.attachMedia(temp_audio)
        hls.on(Hls.Events.FRAG_BUFFERED, (e, h) => {
            let jijijijij: number = new Date().getTime()
            progrText!.innerHTML =
                getLang?.('box_loading') +
                '<br><br>' +
                name +
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
                    downloadInProgress
                        .querySelector('.vkEnhSnackbar__in')
                        ?.classList.add('vkEnhRemovebar'),
                    downloadInProgress
                        .querySelector('.vkEnhSnackbar__in')
                        ?.addEventListener('animationend', () => {
                            downloadInProgress.remove()
                        }),
                    downloadBlob(new Blob(blob_data), name + '.mp3')
            }
        })
        // hls.on(
        //     Hls.Events.BUFFER_CODECS,
        //     (e, t) => (_o = t.audio && 'audio/mp4' === t.audio.container)
        // )
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
