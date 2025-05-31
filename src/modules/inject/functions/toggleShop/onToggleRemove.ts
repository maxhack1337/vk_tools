const onToggleRemove = (featureFlag: string) => {
  const stored = localStorage.getItem("vkToolsCustomToggles");
  if (!stored) {
    vkenh.showSnackbar({ text: "Объект с тогглами не найден в localStorage", icon: "error" });
    return;
  }

  let togglesObj: Record<string, string>;
  try {
    togglesObj = JSON.parse(stored);
  } catch (e) {
    console.error("Ошибка парсинга localStorage:", e);
    return;
  }

  if (!(featureFlag in togglesObj)) {
    vkenh.showSnackbar({ text: `Тоггл с ключом "${featureFlag}" не найден`, icon: "error" });
    return;
  }

  delete togglesObj[featureFlag];

  localStorage.setItem("vkToolsCustomToggles", JSON.stringify(togglesObj));

  vkenh.showSnackbar({ text: `Тоггл "${featureFlag}" удалён`, icon: "ok" });
  nav.reload();
};

export default onToggleRemove;
