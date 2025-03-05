import { escapeHtml } from "../../../escapeHtml";
import getDocSize from "./getDocSize";

const documentAttachment = (documentCurrent:any) => {
return `
			<div class="vkuiDiv vkuiRootComponent" style="padding: 0px 12px;">
  <a href="`+documentCurrent.url+`" target="_blank" style="text-decoration:none;" class="vkitSecondaryAttachmentList__root vkitSecondaryAttachmentList__rootRedesign">
    <div class="vkitSecondaryAttachment__root vkitSecondaryAttachment__rootNoHorizontalPadding vkitSecondaryAttachment__rootVerticalPaddingRedesign vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" role="button" tabindex="0" data-testid="secondaryattachment">
      <div data-testid="secondaryattachment-before" class="vkitSecondaryAttachment__before">
        <div class="vkuiInternalImage vkuiImage vkuiImageBase vkuiClickable__host vkuiRootComponent" style="width: 40px; height: 40px; --vkui_internal--Image_border_radius: 8px;">
          <div class="vkuiImageBase__fallback">
            <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--24 vkuiIcon--w-24 vkuiIcon--h-24 vkEnhancer--document_outline_24" width="22" height="22" viewBox="0 0 20 20" style="width: 22px; height: 22px;">
              <path fill="currentColor" fill-rule="evenodd" d="M10.175 1.5H9c-.806 0-1.465.006-2.01.05-.63.052-1.172.16-1.67.413a4.25 4.25 0 0 0-1.857 1.858c-.253.497-.361 1.04-.413 1.67C3 6.103 3 6.864 3 7.816v4.366c0 .952 0 1.713.05 2.327.052.63.16 1.172.413 1.67a4.25 4.25 0 0 0 1.858 1.857c.497.253 1.04.361 1.67.413.613.05 1.374.05 2.326.05h1.366c.952 0 1.713 0 2.327-.05.63-.052 1.172-.16 1.67-.413a4.25 4.25 0 0 0 1.857-1.857c.253-.498.361-1.04.413-1.67.05-.614.05-1.375.05-2.327V8.325c0-.489 0-.733-.055-.963q-.075-.309-.24-.579c-.123-.201-.296-.374-.642-.72l-3.626-3.626c-.346-.346-.519-.519-.72-.642a2 2 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055M15.5 12.15c0 .992 0 1.692-.045 2.238-.044.537-.127.86-.255 1.11A2.75 2.75 0 0 1 14 16.7c-.252.128-.574.21-1.111.255-.546.044-1.245.045-2.238.045h-1.3c-.992 0-1.692 0-2.238-.045-.537-.044-.86-.127-1.11-.255A2.75 2.75 0 0 1 4.8 15.5c-.128-.252-.21-.574-.255-1.111-.044-.546-.045-1.245-.045-2.238v-4.3c0-.992 0-1.692.045-2.238.044-.537.127-.86.255-1.11A2.75 2.75 0 0 1 6.002 3.3c.25-.128.573-.21 1.11-.255C7.658 3.001 8.358 3 9.35 3H10v2.35c0 .409 0 .761.024 1.051.026.306.083.61.238.902.21.398.537.724.935.935.291.155.596.212.902.238.29.024.642.024 1.051.024h2.35zM14.879 7 11.5 3.621V5.32c0 .447 0 .736.02.955.017.21.047.288.067.326a.75.75 0 0 0 .312.312c.038.02.116.05.326.068.22.018.508.019.955.019z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="vkuiImageBase__children"></div>
        </div>
      </div>
      <div class="vkitSecondaryAttachment__content">
        <div class="vkitSecondaryAttachment__title vkuiFlex vkuiFlex--wrap vkuiFlex--align-center vkuiRootComponent" data-testid="secondaryattachment-title">
          <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__titleText vkuiHeadline--sizeY-compact vkuiHeadline--level-1 vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiRootComponent" style="--vkui_internal--textclamp-lines: 1;">`+escapeHtml(documentCurrent.title)+`</div>
        </div>
        <div class="vkitTextClamp__root vkitTextClamp__rootSingleLine vkitSecondaryAttachment__description vkuiFootnote vkuiTypography vkuiTypography--normalize vkuiRootComponent" data-testid="secondaryattachment-description" style="--vkui_internal--textclamp-lines: 1;">`+getDocSize(documentCurrent.size)+`</div>
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

export default documentAttachment;