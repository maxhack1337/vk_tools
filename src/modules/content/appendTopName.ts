const appendTopName = () => {
	if(!document.querySelector(".top_profile_name")) {
    try {
      const parentlnk = document.querySelector("div#top_profile_menu");
      const name = document.querySelector("img.TopNavBtn__profileImg") as HTMLImageElement;
      let namealt = null;
      if (name) {
        namealt = name.alt;
      }
      var s = document.querySelector("a#top_profile_link");
      var q = document.createElement("div");
      q.classList.add("top_profile_name");
      q.textContent = namealt;
        if (namealt !== null && s !== null && parentlnk !== null) {
        s.insertBefore(q, s.firstChild);
      }
    } catch (e) { }
    const styleElement = document.createElement("style");
    styleElement.id = "top_name";
    styleElement.innerHTML = ".top_profile_name {padding-right: 10px;}";
    document.head.appendChild(styleElement);
  }
}

export default appendTopName;