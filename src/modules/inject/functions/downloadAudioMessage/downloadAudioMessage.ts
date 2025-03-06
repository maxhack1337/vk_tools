import fromId from "../../../content/fromId";
import create from "../../create";
import createStyle from "../classicalProfile/scripts/createStyle";
import getAudioId from "./getAudioId";
import getLink from "./getLink";

const downloadAudioMessage = () => {

  document.arrive('.audio-msg-track', { existing: true }, (e) => {
    let link = e.hasAttribute('data-mp3') ? e.getAttribute('data-mp3') : e.getAttribute('data-ogg');
    createStyle('downloadBHover', `
      .audio-msg-track--download:hover {
        background: rgba(143,173,200,.5) !important;
      }
    `);
    let downloadButton = document.createElement('button');
    downloadButton.classList.add('audio-msg-track--download');
    downloadButton.style.cssText = `
          display: flex;
          flex-shrink: 0;
          order: 3;
          border: 0;
          padding: 0;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 20px;
          margin: 2px 8px 2px 0px;
          background: rgba(143, 173, 200, .3);
          color: var(--blue_400);
          border-radius: 4px;
          cursor: pointer;  
    `;
    downloadButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#447bba" fill-rule="evenodd" d="M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z" clip-rule="evenodd"/></svg>`;
    let download_name = e.id.replace('pl_','');
    let download = create(
      "a",
      {},
      {
        href: link,
        innerHTML: "",
        download: download_name,
        "data-link": link,
      }
    ) as HTMLAnchorElement;
    downloadButton.addEventListener('click', async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const a_ = await fetch(download.href, {
        method: "GET",
      });
      let o = await a_.blob();
      download.href = URL.createObjectURL(o);
      download.click();
    })

    e.append(downloadButton);
  });

  
    document.arrive(
  ".AttachVoice",
  {
    existing: true,
  },
  function (e) {
    let styleElement = fromId("vkEnhancerDownloadAudioButtonStyle");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "vkEnhancerDownloadAudioButtonStyle";
      document.head.appendChild(styleElement);
    }
    var bgImageUri = `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath fill='%23447bba' fill-rule='evenodd' d='M8.75 1.75a.75.75 0 0 0-1.5 0v6.6893L5.0303 6.2197a.75.75 0 0 0-1.0606 1.0606l3.5 3.5a.7498.7498 0 0 0 1.0606 0l3.5-3.5a.75.75 0 0 0-1.0606-1.0606L8.75 8.4393V1.75Zm-6 10.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H2.75Z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");`;
    styleElement.innerHTML =
      ".vkEnhancerDownloadAudioButton:hover:before{background:#8fadc880;opacity:1}.vkEnhancerDownloadAudioButton{color:var(--vkui--color_icon_accent);" +
      bgImageUri +
      'background-position: center;background-repeat: no-repeat;isolation: isolate;position: relative; align-items:center; justify-content: center;display: flex;cursor: pointer;border-radius: 100px; margin-left: 6px; margin-right: 4px; order: 3; top: 2px;height: 24px; width: 24px;}.vkEnhancerDownloadAudioButton:before {background: #8fadc84d;color: var(--blue_400);opacity: 1;transition: background-color .14s; border-radius:100px; bottom: 0;content: "";left: 0; position: absolute;right: 0;top: 0;z-index:-1;}';
    let download_name = getLink(document.querySelector(".AttachVoice")!)
      .split("/")
          .at(-1);
    let link;
      if (e instanceof HTMLElement) link = getLink(e);
      let fileNameAud: string;
    if(e instanceof HTMLElement) fileNameAud = getAudioId(e);
    let download = create(
      "a",
      {},
      {
        href: link,
        innerHTML: "",
        download: download_name,
        "data-link": link,
      }
    );
    download.classList.add("vkEnhancerDownloadAudioButton");
    download.addEventListener("click", async function (e) {
      e.preventDefault();
      const a = document.createElement("a");
      a.rel = "noopener";
      a.target = "_blank";
      a.download = fileNameAud;
      const target = e.target as HTMLAnchorElement;
      const a_ = await globalThis.fetch(target.href, {
        method: "GET",
      });
      let o = await a_.blob();
      a.href = URL.createObjectURL(o);
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(() => {
        const a__ = document.createEvent("MouseEvents");
        a__.initMouseEvent(
          "click",
          !0,
          !0,
          window,
          0,
          0,
          0,
          80,
          20,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        );
        a.dispatchEvent(a__);
      }, 0);
    });
    e.children[0].appendChild(download);
  }
);
}

export default downloadAudioMessage;