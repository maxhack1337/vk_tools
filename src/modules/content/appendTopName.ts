const appendTopName = () => {
  if (!document.querySelector(".top_profile_name")) {
    try {
      const parentlnk = document.querySelector("div#top_profile_menu");
      const parentlnk2 = document.querySelector("div#react_rootTopNavProfileMenu");
      if (parentlnk) {
        const name = document.querySelector("img.TopNavBtn__profileImg") as HTMLImageElement;
        let namealt = null;
        if (name) {
          namealt = name.alt;
        }
        let topProfile = document.querySelector("a#top_profile_link");
        let topProfileName = document.createElement("div");
        topProfileName.classList.add("top_profile_name");
        topProfileName.textContent = namealt;
        if (namealt !== null && topProfile !== null && parentlnk !== null) {
          topProfile.insertBefore(topProfileName, topProfile.firstChild);
        }
      } else if (parentlnk2) {
        const name = parentlnk2.querySelector("img") as HTMLImageElement;
        let namealt = null;
        if (name) {
          namealt = name.alt;
        }
        let topProfile = parentlnk2.querySelector("div#react_rootTopNavProfileMenu>a");
        let topProfileName = document.createElement("div");
        topProfileName.classList.add("top_profile_name");
        topProfileName.textContent = namealt;
        if (namealt !== null && topProfile !== null && parentlnk2 !== null) {
          topProfile.insertBefore(topProfileName, topProfile.firstChild);
        }
      }
    } catch (e) {}
    const styleElement = document.createElement("style");
    styleElement.id = "top_name";
    styleElement.innerHTML = `
    .top_profile_name
    {
      padding-right: 10px!important;
      font-size: 13px;
    }
    div#react_rootTopNavProfileMenu>a {
      width: auto!important;
      padding: 0 8px;
    }`;
    document.head.appendChild(styleElement);
  }
};

export default appendTopName;
