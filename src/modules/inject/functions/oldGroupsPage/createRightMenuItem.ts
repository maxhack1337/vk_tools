import getCalendarLabel from "./getCalendarLabel";

const createRightMenuItem = (id: string, href: string, label: string, isCalendar: boolean, isSelected: boolean) => {
    let rightMenuItem = document.createElement('a');
    rightMenuItem.id = id;
    rightMenuItem.href = 'https://vk.com' + href;
    rightMenuItem.className = `ui_rmenu_item ${isSelected ? 'ui_rmenu_item_sel' : ''}`;
    rightMenuItem.setAttribute('onclick', `nav.go("${href}"); nav.reload();`);

    let rightMenuItemLabel = document.createElement('span');
    rightMenuItemLabel.className = "ui_rmenu_item_label";

    let rightMenuItemLabelText = document.createElement('span');
    rightMenuItemLabelText.className = "ui_rmenu_label-text";
    rightMenuItemLabelText.textContent = label;
    let rightMenuCalendarIcon = document.createElement('span');
    if (isCalendar) {
        rightMenuCalendarIcon.className = "ui_calendar_icon";
        rightMenuCalendarIcon.setAttribute('onclick', "nav.change({w: 'calendar'}); return cancelEvent(event);");
        rightMenuCalendarIcon.setAttribute('onmouseover', `showTitle(this, "${getCalendarLabel(vk.lang)}");`);
        rightMenuCalendarIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.25 1a.75.75 0 0 1 .75.75v.26L8.32 2H13v-.25a.75.75 0 0 1 1.5 0v.36c.43.06.82.17 1.18.35a4.25 4.25 0 0 1 1.86 1.86c.25.5.36 1.04.41 1.67.05.61.05 1.37.05 2.33v3.36c0 .96 0 1.72-.05 2.33a4.39 4.39 0 0 1-.41 1.67 4.25 4.25 0 0 1-1.86 1.86c-.5.25-1.04.36-1.67.41-.61.05-1.38.05-2.33.05H8.32c-.96 0-1.72 0-2.33-.05a4.39 4.39 0 0 1-1.67-.41 4.25 4.25 0 0 1-1.86-1.86 4.39 4.39 0 0 1-.41-1.67C2 13.4 2 12.63 2 11.68V8.32c0-.96 0-1.72.05-2.33.05-.63.16-1.17.41-1.67a4.25 4.25 0 0 1 1.86-1.86 3.8 3.8 0 0 1 1.18-.35v-.36A.75.75 0 0 1 6.25 1ZM5.5 3.63a2 2 0 0 0-.5.17A2.75 2.75 0 0 0 3.8 5c-.13.25-.21.57-.26 1.11-.02.26-.03.54-.03.88h12.98a14.08 14.08 0 0 0-.03-.88 2.9 2.9 0 0 0-.26-1.1A2.75 2.75 0 0 0 15 3.8a2.02 2.02 0 0 0-.5-.17v.12a.75.75 0 0 1-1.5 0v-.24a80.42 80.42 0 0 0-1.35-.01H7v.25a.75.75 0 0 1-1.5 0v-.12Zm11 4.86h-13v3.16c0 1 0 1.7.04 2.24.05.53.13.86.26 1.1A2.75 2.75 0 0 0 5 16.2c.25.13.57.21 1.11.26.55.04 1.25.04 2.24.04h3.3c1 0 1.7 0 2.24-.04a2.9 2.9 0 0 0 1.1-.26A2.75 2.75 0 0 0 16.2 15c.13-.25.21-.57.26-1.11.04-.55.04-1.25.04-2.24V8.5Z" clip-rule="evenodd"></path></svg>`;
    }

    rightMenuItemLabel.appendChild(rightMenuItemLabelText);
    rightMenuItem.appendChild(rightMenuItemLabel);
    rightMenuItem.appendChild(rightMenuCalendarIcon);

    return rightMenuItem;
}

export default createRightMenuItem;