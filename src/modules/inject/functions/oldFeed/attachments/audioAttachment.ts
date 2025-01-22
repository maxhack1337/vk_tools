/* eslint-disable no-useless-escape */
import splitDuration from "../splitDuration";

const audioAttachment = (isRestrickted:string, music:any, titleAud: string, artistAud: string) => {
return `<div tabindex="0" class="vk_enhancer_in_post_audio audio_row ${isRestrickted} audio_row_with_cover _audio_row _audio_row_${
                music.audio.owner_id
              }_${
                music.audio.id
              } audio_can_add audio_row2 audio_row_playable" data-full-id="${
                music.audio.owner_id
              }_${
                music.audio.id
              }" onclick="return getAudioPlayer().toggleAudio(this, event)" data-audio="[${
                music.audio.id
              },${music.audio.owner_id},&quot;&quot;,&quot;${
                titleAud
              }&quot;,&quot;${
                artistAud
              }&quot;,157,0,0,&quot;&quot;,0,34,&quot;my:my_audios&quot;,&quot;[]&quot;,&quot;3e8cdfd5a11f7bb4a5\/8aaf2d333742261dd0\/c475d689c9416c918c\/461c9aa17f026bb20c\/\/0e75de100e99ef17ec\/3e835a4ecc5ff99a2a&quot;,&quot;&quot;,{&quot;duration&quot;:${
                music.audio.ads.duration
              },&quot;content_id&quot;:&quot;${music.audio.owner_id}_${
                music.audio.id
              }&quot;,&quot;puid22&quot;:${
                music.audio.ads.puid22?.valueOf() || 11
              },&quot;account_age_type&quot;:${
                music.audio.ads.account_age_type
              },&quot;_SITEID&quot;:276,&quot;vk_id&quot;:${
                vk.id
              },&quot;ver&quot;:251116},&quot;&quot;,&quot;&quot;,&quot;&quot;,false,&quot;e4cff92eZml8iFLTMTK-fJ2P469iWcmgLIP03FFV2E6sfIYHm7xfWzPLQtJmMrpuhZesiXJXx7Y2m_-QaYwIryRPtjG3lx4FdZQJiiR160y_tQM8nyMnVdJ4z-1p&quot;,0,0,true,&quot;${
                music.audio.access_key
              }&quot;,false,&quot;&quot;,false,&quot;&quot;,&quot;&quot;,0]" onmouseover="window.AudioUtils &amp;&amp; window.AudioUtils.onRowOver(this, event, false, '', '${
                music.audio.access_key
              }')" onmouseleave="window.AudioUtils &amp;&amp; window.AudioUtils.onRowLeave(this, event)">
  <div class="audio_row_content _audio_row_content vkEnAudioRow">
    <button class="blind_label _audio_row__play_btn" aria-label="Воспроизвести " data-testid="audio_row_play_pause_button" onclick="getAudioPlayer().toggleAudio(this, event); return cancelEvent(event)"></button>
    <div class="audio_row__cover audio_row__without_cover">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="song_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="song_24__song_24">
            <path id="song_24__Bounds" d="M0 0h24v24H0z"></path>
            <path d="M13 11.48v5.65c0 4.52-.87 5.39-4.37 5.85C6.96 23.19 5 22.44 5 19.8c0-1.28.8-2.5 2.46-2.81 1.27-.25-.09.02 2.78-.52.7-.13.77-.37.77-.9V3.97c0-1.24.67-1.69 2.66-2.09l4.68-.87c.37-.07.65.07.65.49v4.05c0 .42-.17.6-.59.68l-4.86.86c-.38.1-.55.36-.55.74v3.64Z" id="song_24__Mask" fill="currentColor"></path>
          </g>
        </g>
      </svg>
    </div>
    <div class="audio_row__cover_back _audio_row__cover_back"></div>
    <div class="audio_row__cover_icon _audio_row__cover_icon">
      <div class="audio_row__play_btn_icon--pause">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6.6c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C6.76 5 7.04 5 7.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45C6 18.24 6 17.96 6 17.4V6.6Zm8 0c0-.56 0-.84.1-1.05a1 1 0 0 1 .45-.44C14.76 5 15.04 5 15.6 5h.8c.56 0 .84 0 1.05.1a1 1 0 0 1 .44.45c.11.21.11.49.11 1.05v10.8c0 .56 0 .84-.1 1.05a1 1 0 0 1-.45.44c-.21.11-.49.11-1.05.11h-.8c-.56 0-.84 0-1.05-.1a1 1 0 0 1-.44-.45c-.11-.21-.11-.49-.11-1.05V6.6Z"></path>
        </svg>
      </div>
      <div class="audio_row__play_btn_icon--play">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.5 11.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 8 17.2V6.8a1 1 0 0 1 1.5-.86l9 5.2Z"></path>
        </svg>
      </div>
    </div>
    <div class="audio_row__counter"></div>
    <div class="audio_row__play_btn">
      <div class="audio_row__play_btn_icon--pause">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zM10.6 7.1c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3zm5 0c-.14-.06-.27-.1-.63-.1h-.94c-.36 0-.49.04-.62.1a.73.73 0 0 0-.3.3c-.07.14-.11.27-.11.63v7.94c0 .36.04.49.1.62.08.13.18.23.3.3.14.07.27.11.63.11h.94c.36 0 .49-.04.62-.1a.73.73 0 0 0 .3-.3c.07-.14.11-.27.11-.63V8.03c0-.36-.04-.49-.1-.62a.73.73 0 0 0-.3-.3z" fill="currentColor" fill-rule="evenodd"></path>
        </svg>
      </div>
      <div class="audio_row__play_btn_icon--play">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm5.02-11.13c.64-.39.64-1.36 0-1.74l-6.6-4C9.77 6.75 9 7.23 9 8v8c0 .76.78 1.25 1.41.87z" fill="currentColor" fill-rule="evenodd"></path>
        </svg>
      </div>
    </div>

    <div class="audio_row__inner">
      <div class="audio_row__chart_info">

      </div>
      <div class="audio_row__performer_title">
        <div onmouseover="setTitle(this)" class="audio_row__performers" data-testid="audio_row_performers"><a href="/audio?performer=1&amp;q=${
          music.audio.artist
        }">${music.audio.artist}</a></div>
        <div class="audio_row__title _audio_row__title" onmouseover="setTitle(this)" title="${
            music.audio.title
          }">
          <span class="audio_row__title_inner_icon"></span>
          <a href="" class="audio_row__title_inner _audio_row__title_inner" data-testid="audio_row_title">${
            music.audio.title
          }</a>
          <span class="audio_row__title_inner_subtitle _audio_row__title_inner_subtitle"></span>

        </div>
      </div>
      <div class="audio_row__info _audio_row__info">
        <div class="audio_row__duration audio_row__duration-s _audio_row__duration" style="visibility: visible;">${splitDuration(
        music.audio.duration
      )}</div>
      </div>
    </div>

    <div class="audio_player__place _audio_player__place"></div>
  </div>
</div>`
}

export default audioAttachment;