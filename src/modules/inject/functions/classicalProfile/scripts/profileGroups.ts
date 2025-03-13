/* eslint-disable no-useless-escape */
import {
	escapeHtml
}
from "../../../escapeHtml";
import getId from "../../middleName/getId";
import getInterestingPagesLang from "./getInterestingPagesLang";
import getPhotoAlbumLang from "./getPhotoAlbumLang";
import getUserDataWithoutOnline from "./getUserDataWithoutOnline";
import splitDuration from "./splitDuration";
const profileGroup = () => {
	document.arrive(".ProfileGroup", {
		existing: true
	}, async function(e) {
		let scrollSticky = document.querySelector(".ScrollStickyWrapper > div");
		let pageBlock = document.createElement('div');
		pageBlock.classList.add('page_block', 'page_block_vktools');
		pageBlock.style.marginTop = "0";
		///ДЛЯ ФОТОАЛЬБОМОВ///
		let userIDHereWeGoAgain = await getId();
		let profileCheckIsClosed = await getUserDataWithoutOnline(userIDHereWeGoAgain);
		let albumsGetter;
		if (!profileCheckIsClosed.is_closed || profileCheckIsClosed.can_access_closed) {
			try {
				albumsGetter = await vkApi.api("photos.getAlbums", {
					owner_id: userIDHereWeGoAgain,
					need_covers: true,
				});
			} catch (error) {
				albumsGetter = {
					count: 0
				};
			}
		} else {
			albumsGetter = {
				count: 0
			};
		}
		let newAlbumElement = document.createElement("section");
		newAlbumElement.classList.add("vkuiInternalGroup", "vkuiGroup", "vkuiInternalGroup--mode-card", "vkuiGroup--padding-m", "Group-module__group--lRMIn", "Group-module__groupPaddingM", "Group-module__groupModeCard", "vkuiInternalGroupCard", "ProfileGroupEnhancer", "ProfileAlbumsEnhancer");
		newAlbumElement.innerHTML = ` <div class="vkuiGroup__header">
    <a href="/albums${userIDHereWeGoAgain}" data-allow-link-onclick-web="1" style="padding: 0 8px;" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
      <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
        <div class="vkuiHeader__main">
          <div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1"><span class="vkuiHeader__content-in"><div class="Header-module__content--F5x_X"><div class="TextClamp-module__singleLine--mRCrF">
          ${getPhotoAlbumLang(vk.lang)}</div></div></span><span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${
          albumsGetter.count
        }</span></div>
        </div>
      </div>
    </a>
    <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
  </div>
  <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
  <div class="ProfileVideos__items">
    <div class="Group-module__horizontalContentExpanded--yxlH5 vkuiInternalGroupExpandedContent">
      <div class="OwnerVideosList">
        <div class="vkuiHorizontalScroll vkuiInternalHorizontalScroll">
          <div class="vkuiHorizontalScroll__in">
            <div class="vkuiHorizontalScroll__in-wrapper">
              <div class="OwnerAlbumsList__items"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="vkuiSpacing" style="height: 12px; padding: 6px 0px;"></div>`;
		if (albumsGetter.count > 0 && !document.querySelector(".ProfileAlbumsEnhancer")) {
			pageBlock.appendChild(newAlbumElement);
			let appendHereAlbum = pageBlock.querySelector(".OwnerAlbumsList__items");
			albumsGetter.items.slice(0, 2).forEach(async(item: {
				owner_id: any;thumb_id: number;id: any;size: any;title: any;
			}) => {
				let thumb = await vkApi.api("photos.get", {
					owner_id: item.owner_id,
					photo_ids: item.thumb_id,
					album_id: item.id,
				});
				let thumbSrc;
				try {
					thumbSrc = thumb.items[0].sizes[thumb.items[0].sizes.length - 1].url;
				} catch (error) {
					thumbSrc = "https://vk.com/images/camera_big.png";
				}
				let albumElement = document.createElement("div");
				if (item.thumb_id !== 0) {
					albumElement.innerHTML = `<a href="/album${item.owner_id}_${item.id}" data-href="album${item.owner_id}_${item.id}?rev=1" onclick="return showPhoto('${item.owner_id}_${item.thumb_id}', 'album${item.owner_id}_${item.id}/rev', {&quot;temp&quot;:{&quot;x&quot;:&quot;${thumbSrc}&quot;,&quot;y&quot;:&quot;${thumbSrc}&quot;,&quot;z&quot;:&quot;${thumbSrc}&quot;,&quot;w&quot;:&quot;${thumbSrc}&quot;,&quot;x_&quot;:[&quot;${thumbSrc}&quot;,431,604],&quot;y_&quot;:[&quot;${thumbSrc}&quot;,576,807],&quot;z_&quot;:[&quot;${thumbSrc}&quot;,771,1080],&quot;w_&quot;:[&quot;${thumbSrc}&quot;,1542,2160],&quot;base&quot;:&quot;&quot;},&quot;jumpTo&quot;:{&quot;z&quot;:&quot;albums${item.owner_id}&quot;}}, event); return nav.go(this, event)" class="img_link  photos_album_w_description vkenh">
    <div class="photos_album_thumb_wrap vkenh">
      <div class="photos_album_thumb crisp_image vkenh" style="background-image: url(${thumbSrc})">
        
        <div class="photos_album_title_wrap vkenh">
          <div class="clear_fix">
            <div class="photos_album_counter vkenh fl_r">${item.size}</div>
            <div class="photos_album_title ge_photos_album vkenh" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</div>
          </div>
          <div class="photos_album_description_wrap"><div class="photos_album_description description"></div></div>
        </div>
      </div>
    </div>
  </a>`;
				} else {
					albumElement.innerHTML = `<a href="/album${item.owner_id}_${item.id}" data-href="album${item.owner_id}_${item.id}?rev=1" class="img_link  photos_album_w_description vkenh">
    <div class="photos_album_thumb_wrap vkenh">
      <div class="photos_album_thumb crisp_image vkenh" style="background-image: url(${thumbSrc}); background-size: 60px 48px; background-position: center;">
        
        <div class="photos_album_title_wrap vkenh">
          <div class="clear_fix">
            <div class="photos_album_counter vkenh fl_r">${item.size}</div>
            <div class="photos_album_title ge_photos_album vkenh" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</div>
          </div>
          <div class="photos_album_description_wrap"><div class="photos_album_description description"></div></div>
        </div>
      </div>
    </div>
  </a>`;
				}
				appendHereAlbum?.appendChild(albumElement);
			});
    }
				
		///ДЛЯ АУДИО///
		let audioResponse;
		try {
			audioResponse = await vkApi.api("audio.get", {
				owner_id: userIDHereWeGoAgain,
			});
			if (audioResponse.count > 0 && !document.querySelector(".vkEnAudioRow")) {
				let newAudioElement = document.createElement("section");
				newAudioElement.classList.add("vkuiInternalGroup", "vkuiGroup", "vkuiInternalGroup--mode-card", "vkuiGroup--padding-m", "Group-module__group--lRMIn", "Group-module__groupPaddingM", "Group-module__groupModeCard", "vkuiInternalGroupCard", "ProfileGroupEnhancer", "ProfileAudiosEnhancer");
				newAudioElement.innerHTML = ` <div class="vkuiGroup__header">
				<a href="/audios${userIDHereWeGoAgain}?section=all"  style="padding: 0 8px;" data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
					<div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
						<div class="vkuiHeader__main">
						<div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1"><span class="vkuiHeader__content-in"><div class="Header-module__content--F5x_X"><div class="TextClamp-module__singleLine--mRCrF">${getLang?.(
              "vkapps_scope_audio"
            )}</div></div></span><span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${
              audioResponse.count
            }</span></div>
						</div>
					</div>
					</a>
					<div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
				</div>
				<div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
				<div class="ProfileVideos__items">
					<div class="Group-module__horizontalContentExpanded--yxlH5 vkuiInternalGroupExpandedContent">
					<div class="OwnerVideosList">
						<div class="vkuiHorizontalScroll vkuiInternalHorizontalScroll" style="overflow: visible;">
						<div class="vkuiHorizontalScroll__in" style="overflow: visible;">
							<div class="vkuiHorizontalScroll__in-wrapper">
							<div class="OwnerAudiosList__items"></div>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				<div class="vkuiSpacing" style="height: 12px; padding: 6px 0px;"></div>`;
				pageBlock.append(newAudioElement);
				let appendHereAudio = pageBlock.querySelector(".OwnerAudiosList__items");
				audioResponse.items.slice(0, 6).forEach(async(audioItem: {
					title: {
						replaceAll: (arg0: string, arg1: string) => any;
					};artist: {
						replaceAll: (arg0: string, arg1: string) => any;
					};owner_id: any;id: any;ads: {
						duration: any;puid22: any;account_age_type: any;
					};access_key: any;duration: any;
				}) => {
					let audioElement = document.createElement("div");
					let titleAud = audioItem.title;
					let artistAud = audioItem.artist;
					let escaped = escapeHtml(artistAud);
					const audioData = `[${audioItem.id},${audioItem.owner_id},"","${escapeHtml(titleAud)}","${escapeHtml(artistAud)}",157,0,0,"",0,34,"module:${audioItem.owner_id}","[]","62efa83eaf32d46ab7//e3727249bcd60c36ee///bca050eaeb2ae61a22/","",{"duration": ${audioItem.ads.duration},"content_id": "${audioItem.owner_id}_${audioItem.id}","puid22": ${audioItem.ads.puid22},"account_age_type": ${audioItem.ads.account_age_type},"_SITEID": 276,"vk_id": ${vk.id},"ver": 251116},"","","",false,"9c91d4359kPPl-j5wiDD-N-q4xNYySV8d1i8YjJXvg6StjuAn436s3dh-U5Vim743w",0,0,true,"${audioItem.access_key}",false,"",false]`;
					audioElement.innerHTML = `<div tabindex="0" class="audio_row audio_row_with_cover _audio_row _audio_row_${
                audioItem.owner_id
              }_${
                audioItem.id
              } audio_can_add audio_lpb audio_row2 audio_row_playable audio_new_lyrics" data-full-id="${
                audioItem.owner_id
              }_${
                audioItem.id
              }" onclick="return getAudioPlayer().toggleAudio(this, event)" onmouseover="window.AudioUtils &amp;&amp; window.AudioUtils.onRowOver(this, event, false, '', '${
                audioItem.access_key
              }')" onmouseleave="window.AudioUtils &amp;&amp; window.AudioUtils.onRowLeave(this, event)">
  <div class="audio_row_content _audio_row_content vkEnAudioRow">
    <button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " data-testid="audio_row_play_pause_button" onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button>
    <div class="audio_row__cover audio_row__without_cover"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="song_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="song_24__song_24"><path id="song_24__Bounds" d="M0 0h24v24H0z"></path><path d="M13 11.48v5.65c0 4.52-.87 5.39-4.37 5.85C6.96 23.19 5 22.44 5 19.8c0-1.28.8-2.5 2.46-2.81 1.27-.25-.09.02 2.78-.52.7-.13.77-.37.77-.9V3.97c0-1.24.67-1.69 2.66-2.09l4.68-.87c.37-.07.65.07.65.49v4.05c0 .42-.17.6-.59.68l-4.86.86c-.38.1-.55.36-.55.74v3.64Z" id="song_24__Mask" fill="currentColor"></path></g></g></svg></div>
    <div class="audio_row__cover_back _audio_row__cover_back"></div>
    <div class="audio_row__cover_icon _audio_row__cover_icon">
      <div class="audio_row__play_btn_icon--pause"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6.6c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C6.76 5 7.04 5 7.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45C6 18.24 6 17.96 6 17.4V6.6Zm8 0c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C14.76 5 15.04 5 15.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45c-.11-.21-.11-.49-.11-1.05V6.6Z"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 11.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 8 17.2V6.8a1 1 0 0 1 1.5-.86l9 5.2Z"></path></svg></div>
    </div>
    <div class="audio_row__counter"></div>
    <div class="audio_row__play_btn">
      <div class="audio_row__play_btn_icon--pause"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM10.6 7.1c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3zm5 0c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
      <div class="audio_row__play_btn_icon--play"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm5.02-11.13c.64-.39.64-1.36 0-1.74l-6.6-4C9.77 6.75 9 7.23 9 8v8c0 .76.78 1.25 1.41.87z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
    </div>

    <div class="audio_row__inner">
      <div class="audio_row__chart_info">
        
        
      </div>
      <div class="audio_row__performer_title">
        <div onmouseover="setTitle(this)" class="audio_row__performers" data-testid="audio_row_performers"><a href="/audio?performer=1&amp;q=${escaped}">${escaped}</a></div>
        <div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)">
          <a href="" class="audio_row__title_inner _audio_row__title_inner" data-testid="audio_row_title">${
            escapeHtml(audioItem.title)
          }</a>
          <span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span>
          
        </div>
      </div>
      <div class="audio_row__info _audio_row__info"><div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">${splitDuration(
        audioItem.duration
      )}</div></div>
    </div>

    <div class="audio_player__place _audio_player__place"></div>
  </div>
</div>`;
					audioElement.querySelector('.audio_row_with_cover')?.setAttribute('data-audio', audioData);
					appendHereAudio?.appendChild(audioElement);
				});
			}
    } catch (error) { }
    if (!document.querySelector('.page_block_vktools')) scrollSticky?.append(pageBlock);
    ///ДОБАВЛЕНИЕ БЛОКА ПОДПИСОК///
				document.arrive('.ProfileSubscriptions', {
					existing: true
				}, (e) => {
					document.querySelector('.page_block_vktools')?.prepend(e);
					let count = e.querySelector('.vkuiHeader__indicator')?.textContent || '0';
          e.classList.add('ProfileSubsEnhancer');
          let subHead = e.querySelector('.vkuiGroup__header') as HTMLElement;
					subHead!.innerHTML = `
    <a data-allow-link-onclick-web="1"  style="padding: 0 8px;" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
      <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
        <div class="vkuiHeader__main">
          <div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
          <span class="vkuiHeader__content-in">
          <div class="Header-module__content--F5x_X">
          <div class="TextClamp-module__singleLine--mRCrF">
          ${getInterestingPagesLang(vk.lang)}
          </div></div></span>
          <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${count}</span></div>
        </div>
      </div>
    </a>
    <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>`;
          subHead?.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            showBox("al_fans.php", {
                act: "box",
                tab: "idols",
                oid: userIDHereWeGoAgain
            });
          });
					e.classList.remove('vkuiGroup__modeCard');
				});
				///КОНЕЦ ДОБАВЛЕНИЯ БЛОКА ПОДПИСОК///
				///ДОБАВЛЕНИЕ БЛОКА ВИДЕО///
				document.arrive('.ProfileVideos', {
					existing: true
        }, (e) => {
          let hasAudios = document.querySelector('.ProfileAudiosEnhancer');
					hasAudios ? document.querySelector('.page_block_vktools')?.insertBefore(e, hasAudios) : document.querySelector('.page_block_vktools')?.append(e);
					e.classList.add('ProfileVideosEnhancer');
					let vLang = getLang?.('videofile_num') || 'видеозаписи';
					vLang = vLang[0].toUpperCase() + vLang.slice(1);
					let count = e.querySelector('.vkuiHeader__indicator')?.textContent || '0';
					let href = e.querySelector('.vkuiGroup__header > a')?.getAttribute('href') || '';
					e.querySelector('.vkuiGroup__header') !.innerHTML = `
    <a href=${href} data-allow-link-onclick-web="1"  style="padding: 0 8px;" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
      <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
        <div class="vkuiHeader__main">
          <div class="vkAlbumTypography vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
          <span class="vkuiHeader__content-in">
          <div class="Header-module__content--F5x_X">
          <div class="TextClamp-module__singleLine--mRCrF">
          ${vLang}
          </div></div></span>
          <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">${count}</span></div>
        </div>
      </div>
    </a>
    <div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>`;
					e.classList.remove('vkuiGroup__modeCard');
				});
				///КОНЕЦ ДОБАВЛЕНИЯ БЛОКА ВИДЕО///
	});
}
export default profileGroup;