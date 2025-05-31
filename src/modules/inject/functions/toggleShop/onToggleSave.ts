const onToggleSave = () => {
  const keyInput = document.querySelector(".toggleShopInputKey") as HTMLInputElement;
  const valInput = document.querySelector(".toggleShopInputVal") as HTMLInputElement;

  const key = keyInput?.value.trim();
  const valRaw = valInput?.value.trim();

  if (!key) {
    vkenh.showSnackbar({ text: "Ключ не может быть пустым", icon: "error" });
    return;
  }

  if (!valRaw) {
    vkenh.showSnackbar({ text: "Значение не может быть пустым", icon: "error" });
    return;
  }

  const valNumber = Number(valRaw);
  const val = !isNaN(valNumber) && valRaw !== "" ? valNumber : valRaw;

  const stored = localStorage.getItem("vkToolsCustomToggles");
  let togglesObj: Record<string, string | number> = {};

  if (stored) {
    try {
      togglesObj = JSON.parse(stored);
    } catch (e) {
      console.error("Ошибка парсинга localStorage:", e);
      togglesObj = {};
    }
  }

  togglesObj[key] = val;

  localStorage.setItem("vkToolsCustomToggles", JSON.stringify(togglesObj));
  vkenh.showSnackbar({ text: "Тоггл сохранён", icon: "ok" });
  nav.reload();
};

export default onToggleSave;
