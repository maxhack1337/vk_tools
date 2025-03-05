import { escapeHtml } from "../../../escapeHtml";
import audioAttachment from "../attachments/audioAttachment";
import getPostAttaches from "../getPostAttaches";

const postMusic = () => {
let selectorsMusic = [`.postponed.Post--redesignV3 [class^="vkitMusicTrackOverlayBadge__root"]`,`.suggest.Post--redesignV3 [class^="vkitMusicTrackOverlayBadge__root"]`]
document.arrive(selectorsMusic.join(', '), { existing: true }, async function (docus) {
		let closestCheck = docus.closest('.vkEnhancerPostponedPost');
		if(!closestCheck) {
		let dataAttachments;
		let postAppendClass = docus.closest('.Post--redesignV3');
		postAppendClass?.classList.add('vkEnhancerPostponedPost');
		try {
			dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]')!);
		} catch(error) {
			console.log(error);
		}
			if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
                    dataAttachments.item.attachments.forEach(function(music:any) {
                        if(music.type === "audio" && music.style === "on_media") {
                            let audioElement = document.createElement("div");
			  let titleAud = escapeHtml(music.audio.title)
              let artistAud = escapeHtml(music.audio.artist)
			  let isRestrickted = '';
			  let isAvailableTrack = music.audio.content_restricted?.valueOf() > 0;
			  if(isAvailableTrack?.valueOf() === true) {
								isRestrickted = 'audio_claimed';
			  }
			  
              audioElement.innerHTML = audioAttachment(isRestrickted, music, titleAud, artistAud);
              docus.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(audioElement);
                        }
                    });
                }
		
			
		}
});
}

export default postMusic;