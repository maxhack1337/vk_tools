const renderGroups = (limit: number, groupsArray: any, groupsSpan: any) => {
  groupsSpan.innerHTML = "";

  groupsArray.slice(0, limit).forEach(([name, url]: [string, string], index: number, arr: any[]) => {
    const groupHref = document.createElement("a");
    groupHref.href = url?.toString() || "";
    groupHref.textContent = name;
    groupsSpan.appendChild(groupHref);

    if (index < arr.length - 1 && index < limit - 1) {
      groupsSpan.appendChild(document.createTextNode(", ​"));
    }
  });
};

export default renderGroups;
