const createProfileInfoHeader = (headerText: string, headerLink: string) => {
  const profileInfoWrap = document.createElement("div");
  profileInfoWrap.classList.add("profile_info_header_wrap");

  const profileInfoHeader = document.createElement("h2");
  profileInfoHeader.classList.add("profile_info_header");
  profileInfoHeader.textContent = headerText;

  const profileInfoSeparator = document.createElement("span");
  profileInfoSeparator.classList.add("profile_info_separator_line");

  const profileInfoEdit = document.createElement("a");
  profileInfoEdit.classList.add("profile_info_edit");
  profileInfoEdit.href = headerLink;
  profileInfoEdit.textContent = getLang?.("global_edit").toString() || "Редактировать";

  profileInfoWrap.append(profileInfoHeader, profileInfoSeparator, profileInfoEdit);
  return profileInfoWrap;
};

export default createProfileInfoHeader;
