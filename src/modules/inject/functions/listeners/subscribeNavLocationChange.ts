/*
 * Используй вместо subscribeOnModuleEvaulated
 * Мират был не прав и это работает, а сабскрайб - нет
 */

const subscribeNavLocationChange = (callback: any) => {
  return window.nav.onLocationChange(callback);
};

export default subscribeNavLocationChange;
