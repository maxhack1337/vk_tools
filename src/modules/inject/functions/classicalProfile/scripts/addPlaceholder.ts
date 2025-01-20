const addPlaceholder = () => {
    let pInfoShort = document.querySelector(
        ".profile_info.profile_info_short"
    );
    let pModuleText = "";
    try {
        pModuleText = document.querySelector(
            '[class^="vkitGroup__group"]:has(>.PlaceholderMessageBlock) [class^="vkitPlaceholder__text"]'
        )?.innerHTML || '';
    } catch (error) { }
    let pModuleDiv = document.createElement("div");
    let pModuleSpan = document.createElement("span");
    pModuleSpan.innerHTML = pModuleText;
    pModuleDiv.classList.add("vkEnhancerOffProfile");
    pModuleDiv.style.display = "flex";
    pModuleDiv.style.justifyContent = "center";
    pModuleDiv.style.width = "100%";
    pModuleSpan.classList.add("vkEnhancerOffProfile__in");
    pModuleSpan.style.padding = "32px 32px";
    pModuleSpan.style.fontSize = "14px";
    pModuleSpan.style.lineHeight = "18px";
    pModuleSpan.style.fontWeight = "400";
    pModuleSpan.style.textAlign = "center";
    pModuleSpan.style.color = "var(--vkui--color_text_secondary)";
    pModuleDiv.appendChild(pModuleSpan);
    if (pModuleText !== "") {
        pInfoShort?.appendChild(pModuleDiv);
    }
}

export default addPlaceholder;
