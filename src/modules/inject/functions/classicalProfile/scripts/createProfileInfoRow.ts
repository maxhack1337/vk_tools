const createProfileInfoRow = (label: string | string[] | null | undefined, content: string | null) => {
  if (!content) return null;
  let clearFix = document.createElement("div");
  clearFix.classList.add("clear_fix", "profile_info_row");
  let labelDiv = document.createElement("div");
  labelDiv.classList.add("label", "fl_l");
  const labelText = `${label}`;
  labelDiv.textContent = labelText; 
  let labeledDiv = document.createElement("div");
  labeledDiv.classList.add("labeled");
  labeledDiv.innerHTML = content;
  clearFix.appendChild(labelDiv);
  clearFix.appendChild(labeledDiv);
  return clearFix;
}
        
export default createProfileInfoRow;