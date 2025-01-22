const linkAttachment = (linkCurrent: any) => {
return `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+linkCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="24" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.146 3.634c.762-.407 1.512-.534 3.082-.534H10.1a.9.9 0 1 1 0 1.8H8.228c-1.487 0-1.87.128-2.233.322q-.504.27-.773.773c-.194.362-.322.746-.322 2.233v7.544c0 1.487.128 1.87.322 2.233q.27.504.773.774c.362.193.746.321 2.233.321h7.544c1.487 0 1.87-.128 2.233-.321q.504-.27.774-.774c.193-.362.321-.746.321-2.233V13.9a.9.9 0 1 1 1.8 0v1.872c0 1.57-.127 2.32-.534 3.082a3.65 3.65 0 0 1-1.512 1.512c-.763.407-1.512.534-3.082.534H8.228c-1.57 0-2.32-.127-3.082-.534a3.65 3.65 0 0 1-1.512-1.512c-.407-.762-.534-1.512-.534-3.082V8.228c0-1.57.127-2.32.534-3.082a3.65 3.65 0 0 1 1.512-1.512"></path><path d="M14 4a.9.9 0 0 1 .9-.9H20a.9.9 0 0 1 .9.9v5.1a.9.9 0 1 1-1.8 0V6.173l-6.564 6.563a.9.9 0 1 1-1.272-1.272L17.827 4.9H14.9A.9.9 0 0 1 14 4"></path></g>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.title+`</div>
        </div>
        <div class="linkDescr vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+linkCurrent.description+`</div>
        <div class="vkitSecondaryAttachment__progressBarContent">
          <div class="vkitSecondaryAttachment__progressBar"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__after vkuiButtonGroup vkuiButtonGroup--mode-horizontal vkuiButtonGroup--gap-s vkuiButtonGroup--align-left vkuiRootComponent" role="group" data-testid="secondaryattachment-after">
        <div class="vkitSecondaryAction__root">
          <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--chevron_right_outline_20 vkitSecondaryAction__chevron" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px;">
            <path fill="currentColor" fill-rule="evenodd" d="M7.47 4.217a.75.75 0 0 0 0 1.06L12.185 10l-4.716 4.72a.75.75 0 1 0 1.062 1.06l5.245-5.25a.75.75 0 0 0 0-1.061L8.531 4.218a.75.75 0 0 0-1.061-.001" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
  </a>
</div>
			`
}

export default linkAttachment;