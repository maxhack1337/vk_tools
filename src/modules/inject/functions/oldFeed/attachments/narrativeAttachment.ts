import getLangTime from "../../classicalProfile/scripts/getLangTime";
import getStoryText from "../../classicalProfile/scripts/getStoryText";

const narrativeAttachment = (narrativeCurrent:any,ownerNarrative:string) => {
return `
			<a href="https://vk.com/narrative${narrativeCurrent.owner_id}_${narrativeCurrent.id}" class="NarrativeSnippet  NarrativeSnippet--base" data-narrative-raw-id="${narrativeCurrent.owner_id}_${narrativeCurrent.id}">
  <div class="NarrativeSnippet__inner">
    <div class="NarrativeSnippet__cover">
      <div class="NarrativeSnippet__image" style=""></div>
    </div>
    <div class="NarrativeSnippet__info">
      <div class="NarrativeSnippet__title">${narrativeCurrent.title}</div>
      <span class="NarrativeSnippet__author">${ownerNarrative}</span>
      <span class="NarrativeSnippet__description">${getLang?.('global_type_narrative')} · ${narrativeCurrent.story_ids?.length || 0} ${getLangTime(narrativeCurrent.story_ids?.length || 0, getStoryText(vk.lang))}</span>
    </div>
  </div>
</a>`
}

export default narrativeAttachment;