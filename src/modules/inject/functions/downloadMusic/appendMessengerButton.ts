import tooltip from '../../components/tooltip/tooltip'
import create from '../../create'
import DownloadStream from './DownloadStream'
import getBitrate from './getBitrate'

const appendMessengerButton = (url: string, img: string, title: string, elem: HTMLElement) => {

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

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="min-width: 20px;"><path fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`
    button.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        DownloadStream(url, title, elem, img || '');
    })
    div.appendChild(button)
    elem.append(div)
  
  getBitrate(url, "plist").then((eb) => {
    let ttDownloadText = '<b>' + getLang?.('video_download_video_from_modal').toString() + '</b>' + eb || 'Скачать';

    button.addEventListener("mouseenter", (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const tooltipText = ttDownloadText;
      const tooltipElement = tooltip({
        style: colorScheme?.currentIsDark ? 'black' : 'white',
        elem: button,
        innerHTML: `<div style = "display: flex; text-align: center; flex-direction: column">${tooltipText}</div>`,
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
      if (tooltipElement) {
        tooltipElement.style.transform = "scale(0)";
        tooltipElement.style.opacity = "0";
      }
      button.style.opacity = '1';
      setTimeout(() => {
        if (document.querySelector('.vkToolsTooltipBase')) {
          document.querySelector('.vkToolsTooltipBase')?.remove();
        }
      }, 100);
    });
  });
}

export default appendMessengerButton;