import tooltip from '../../components/tooltip/tooltip'
import create from '../../create'
import handleDownloadButtonPlist from './handleDownloadButtonPlist'

const appendButtonPlist = (
    elem: HTMLElement,
    linkAudio: string | undefined,
    subKey: string | undefined,
    objectOf: (string | undefined)[]
) => {
    const button = create(
        'button',
        {},
        {
            innerText: '',
        }
    )
    button.classList.add('vkEnhancerDownloadMusicButton')
    const div = create(
        'div',
        {},
        {
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
        }
    )
    //
    //button.setAttribute(
    //    'onmouseover',
    //    `showTooltip(this, { text: '${getLang?.(
    //        'video_download_video_from_modal'
    //    )}', black: true, shift: [7, 5] });`
    //)
    
    let ttDownloadText = getLang?.('video_download_video_from_modal').toString() || 'Скачать';

    button.addEventListener("mouseenter", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const tooltipText = ttDownloadText;
        const tooltipElement = tooltip({
          style: colorScheme?.currentIsDark ? 'black' : 'white',
          elem: button,
          text: tooltipText,
        });
        button.style.opacity = '.8';
        document.body.appendChild(tooltipElement);
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
        tooltipElement.style.visibility = "visible";
        setTimeout(() => {
          tooltipElement.style.transform = "scale(1)";
          tooltipElement.style.opacity = "1";
        }, 10);
      });

    button.addEventListener("mouseleave", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const tooltipElement = document.querySelector('.vkToolsTooltipBase') as HTMLElement;
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
        button.style.opacity = '1';
        setTimeout(() => {
          if (document.querySelector('.vkToolsTooltipBase')) {
            document.querySelector('.vkToolsTooltipBase')?.remove();
          }
        }, 100);
      });
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`
    button.dataset.title = objectOf[1]
    button.dataset.subtitle = objectOf[0]
    button.dataset.fullId = subKey
    button.dataset.linkAudio = linkAudio
    button.addEventListener('click', handleDownloadButtonPlist)
    div.appendChild(button)
    elem.prepend(div)
}
export default appendButtonPlist
