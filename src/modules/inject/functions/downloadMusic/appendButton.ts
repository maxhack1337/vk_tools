import create from '../../create'
import handleDownloadButton from './handleDownloadButton'
import parseUrl from './parseUrl'

const appendButton = (elem: HTMLElement) => {
    const button = create('button', {}, {
        innerText: '',
    })
    button.classList.add('vkEnhancerDownloadMusicButton')
    const div = create('div', {}, {
        className: 'download',
        innerHTML: `<style>
            .vkEnhancerDownloadMusicButton {
                color: var(--vkui--color_icon_secondary);
                isolation: isolate;
                position: relative;
                align-items: center;
                justify-content: center;
                display: flex;
                cursor: pointer;
                height: 24px;
                width: 24px;
                border: none;
                background-color: transparent;
            }
        </style>`,
    })

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`
    button.addEventListener('click', handleDownloadButton)
    let elemclos:any = elem.closest('.audio_row')!
    button.dataset.audio = elemclos.dataset.audio
    button.dataset.fullId = elemclos.dataset.fullId
    div.appendChild(button)
    elem.prepend(div)
    parseUrl(button, 'normal').then(eb => {
        button.addEventListener('mouseover', e => {
            const target = e.target as HTMLElement
            const g = target.closest(".CatalogBlock")
            showTooltip(button, {
                text: '<b>' + getLang?.('video_download_video_from_modal') + '</b>' + eb,
                black: true,
                shift: [7, 5],
                noZIndex: true,
                needLeft: true,
                appendEl: g
            })
        })
    })
}

export default appendButton
