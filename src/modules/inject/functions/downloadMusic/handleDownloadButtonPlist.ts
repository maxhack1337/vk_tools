import processUrl from "./processUrl";
import DownloadStream from "./DownloadStream";
import getDownloadName1Plist from "./getDownloadName1Plist";
import getDownloadNamePlist from "./getDownloadNamePlist";
import getValidIDPlist from "./getValidIDPlist";
import showSnackbar from "../../components/snackbar/snackbar";
import getDownloadErrorLang from "./getDownloadErrorLang";

const handleDownloadButtonPlist = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target as HTMLElement;
  const bar = target?.parentNode?.querySelector(".bar > .progress-bar");
  const id = getValidIDPlist(e.target);
  const Orig = getDownloadNamePlist(e.target);
  const Orig2 = getDownloadName1Plist(e.target);

  let Cyr = Orig;
  let Cyr1 = Orig2;
  fetch(`https://${vk.__domain || "vk.ru"}/al_audio.php?act=reload_audios`, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-requested-with": "XMLHttpRequest",
    },
    body: `al=1&audio_ids=${id}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((e) => e.json())
    .then((e) => {
      try {
        let imgurl = e.payload[1][0][0][14];
        let url = processUrl(e.payload[1][0][0][2]).toString();
        console.log(DownloadStream(url, Cyr1 + " - " + Cyr, bar, imgurl));
      } catch (e) {
        showSnackbar({
          text: getDownloadErrorLang(vk.lang),
          timeout: 4000,
          icon: "error",
        });
      }
    });
};
export default handleDownloadButtonPlist;
