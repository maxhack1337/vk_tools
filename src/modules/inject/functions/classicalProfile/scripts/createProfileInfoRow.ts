        const createProfileInfoRow = (label: string | string[] | null | undefined, content: string | null) => {
          if (!content) return null;
          var clearFix = document.createElement("div");
          clearFix.classList.add("clear_fix", "profile_info_row");
          var labelDiv = document.createElement("div");
          labelDiv.classList.add("label", "fl_l");
          const labelValue = getLang?.('support_ask_question'); 
          const labelText = Array.isArray(labelValue) ? labelValue.join(", ") : labelValue || 'Задать вопрос';
          labelDiv.textContent = labelText; 
          var labeledDiv = document.createElement("div");
          labeledDiv.classList.add("labeled");
          labeledDiv.innerHTML = content;
          clearFix.appendChild(labelDiv);
          clearFix.appendChild(labeledDiv);
          return clearFix;
}
        
export default createProfileInfoRow;