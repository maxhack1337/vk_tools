import getBitrate from "./getBitrate";
import getValidID from "./getValidID";
import getValidIDPlist from "./getValidIDPlist";
import processUrl from "./processUrl";

const parseUrl = async (el: any, mode: string) => {
    try {
        const id = mode === 'normal' 
            ? getValidID(el) 
            : mode === 'plist' 
            ? getValidIDPlist(el) 
            : '1_1';
        const response = await fetch('https://vk.com/al_audio.php?act=reload_audios', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-requested-with': 'XMLHttpRequest',
            },
            body: `al=1&audio_ids=${id}`,
            mode: 'cors',
            credentials: 'include',
        });
        const data = await response.json();
        const url = processUrl(data.payload[1][0][0][2]).toString();
        if (!url) return;
        return await getBitrate(url, mode);
        
    } catch (error) {
        el.style.display = "none";
    }
};

export default parseUrl;
