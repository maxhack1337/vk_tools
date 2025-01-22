const playlistAttachment = (pListInfo: any) => {
return `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
			<div onclick="return AudioUtils.showAudioPlaylist(${pListInfo.owner_id}, ${pListInfo.id}, '', 'group_wall', event);" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
  <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
    <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
      <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
	    <div class="vkuiImageBase__fallback">
    <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--playlist_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
      <g fill="currentColor"><path d="M11.295 19.247c1.87 1.896 5.505.02 5.505-3.548v-5.054l2.399-.697A2.74 2.74 0 0 0 21 7.364l-.01-1.72a.75.75 0 0 0-.906-.623l-.267.061c-.941.215-1.886.431-2.807.721-1.332.45-2.03 1.614-2.01 3.077V14c-3.887.196-5.639 3.286-3.705 5.247M3.9 5.1a.9.9 0 1 0 0 1.8h8.197a.9.9 0 1 0 0-1.8zM3.9 10.1a.9.9 0 1 0 0 1.8h7.196a.9.9 0 1 0 0-1.8zM3 16a.9.9 0 0 1 .9-.9h4.183a.9.9 0 0 1 0 1.8H3.9A.9.9 0 0 1 3 16"></path></g>
    </svg>
  </div>
        <div class="vkuiImageBase__children"></div>
        <div aria-hidden="true" class="vkuiImageBase__border"></div>
      </div>
    </div>
    <div class="vkitSecondaryAttachment__content">
      <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">
		${pListInfo.title}
		</div>
      </div>
      <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">
	  ${pListInfo.description}
	  </div>
      <div class="vkitSecondaryAttachment__progressBarContent">
        <div class="vkitSecondaryAttachment__progressBar"></div>
      </div>
    </div>
    <div onclick="event.preventDefault(); event.stopPropagation(); getAudioPlayer().playPlaylist(${pListInfo.owner_id}, ${pListInfo.id}, '', 'group_wall')" class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
      <div class="vkitSecondaryAction__root">
        <div class="vkitSecondaryAction__iconButton vkitSecondaryAction__iconButtonCircle vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkuiIcon--play_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
            <path fill="currentColor" d="M18.5 11.134a1 1 0 0 1 0 1.732l-9 5.196a1 1 0 0 1-1.5-.866V6.804a1 1 0 0 1 1.5-.866z"></path>
          </svg><span aria-hidden="true" class="vkuiTappable__stateLayer"></span></div>
      </div>
    </div>
  </div>
</div>
</div>`
}

export default playlistAttachment;