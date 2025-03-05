import { escapeHtml } from "../../escapeHtml";

const videoDescription = (videoID:string,videoList:string,postData:any,videoDur:string,videoName:string,videoViews:any) => {
return `
				<a class="lnk" id="post_media_lnk" onclick="return showVideo('`+videoID+`',
				'`+videoList+`',
				{'autoplay':1,'queue':1,'user_id':`+vk.id+`,'module':'','skip_checks':false,'addParams':{'post_id':'`+postData.postRaw+`'}},
				event,
				this);"
				href="/video`+videoID+`?`+videoList+`"
				data-video="`+videoID+`"
				data-list="`+videoList+`"
				data-duration="`+videoDur+`"
				aria-label="`+escapeHtml(videoName)+`"
				>
				<div class="a post_video_title">
				`+escapeHtml(videoName)+`
				</div>
				<div class="post_video_views_count">`+getLang?.('video_showcase_N_viewers',videoViews)+`</div>
				</a>
				`
}

export default videoDescription;