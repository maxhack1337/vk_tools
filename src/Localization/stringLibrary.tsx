const strings = {
  clearCacheDescription: ["Вы уверены, что хотите очистить кеш?", "Are you sure you want to clear cache?", "Ви впевнені, що хочете очистити кеш?"],
  globalYes: ["Да", "Yes", "Так"],
  globalNo: ["Нет", "No", "Ні"],
  clearCache: ["Очистить кеш", "Clear cache", "Очистити кеш"],
  changeTheme: ["Сменить тему", "Change theme color", "Змінити тему"],
  openExtension: ["Открыть расширение в новом окне", "Open extension in new window", "Відкрити розширення в новому вікні"],
  returnCamera: ['Вернуть "фотоаппарат"', "Return camera profile avatar", 'Повернутися до "фотоапарату"'],
  showPatronymic: ["Изменение и отображение отчества", "Change & Display middle name", "Зміна та відображення по-батькові"],
  removeAvatars: ["Убрать NFT-аватарки", "Remove NFT avatars", "Видалити NFT аватари"],
  removeEmojiStatus: ["Убрать эмодзи-статусы", "Remove emoji statuses", "Видалити емодзі-статуси"],
  disableReadingMessages: ["Отключить чтение сообщений", "Disable reading messages", "Вимкнути читання повідомлень"],
  hideTextEntry: ["Скрывать набор текста", "Hide text entry", "Приховувати введення тексту"],
  removeMessageReactions: ["Убрать реакции на сообщения", "Remove message reactions", "Видалити реакції на повідомлення"],
  removePostReactions: ["Убрать реакции на посты", "Remove post reactions", "Видалити реакції на пости"],
  disableAway: ["Отключить vk.com/away.php", "Disable vk.com/away.php", "Вимкнути vk.com/away.php"],
  hideNamesAvatars: ["Скрыть имена и аватарки", "Blur names and avatars", "Приховати імена та аватари"],
  showPollResults: ["Показывать результаты опросов", "Show poll results", "Показувати результати опитувань"],
  defaultPollHidden: ["По умолчанию результаты опроса скрыты до выбора ответа", "Default poll hidden", "За замовчуванням результати опитування приховані до вибору відповіді"],
  avatarNameNear: ["Имя возле аватарки VK ID", "Name next to VK ID avatar", "Ім'я біля аватарки VK ID"],
  stickerPopupHide: ["Скрывать всплывающие стикеры", "Hide pop-up stickers", "Приховувати спливаючі стікери"],
  oldClub: ["Старый дизайн страницы сообществ", "Old community page design", "Старий дизайн сторінки спільнот"],
  oldClubDescription: ["Возвращает старый дизайн страницы сообществ, изменённый ВК в январе 2025", "Returns the old design of the communities page, changed by VK in January 2025", "Повертає старий дизайн сторінки спільнот, змінений ВК у січні 2025"],
  doNotDisturb: ['Режим "не беспокоить"', "Do not disturb", 'Режим "не турбувати"'],
  doNotDisturbDescription: [
    "Данная функция отключает входящие звонки. Звонящий не будет знать, что вы отключили звонки",
    "This feature disables incoming calls. The caller will not know that you have turned them off",
    "Ця функція вимикає вхідні дзвінки. Дзвінокер не буде знати, що ви вимкнули дзвінки",
  ],
  alternativeScrollbar: ["Альтернативный скроллбар", "Alternative scrollbar", "Альтернативний скролбар"],
  tabletMenu: ["Левое меню, как на планшетах", "Tablet-style left menu", "Ліве меню, як на планшетах"],
  disableReconnectIndicator: ["Отключить индикатор реконнекта в мессенджере", "Disable reconnect indicator", "Вимкнути індикатор перепідключення в месенджері"],
  newMediaViewer: ["Кнопка обновления стены", "Wall refresh button", "Кнопка оновлення стіни"],
  standardTagInteraction: ["Стандартное взаимодействие с тегом", "Standard tag interaction", "Стандартна взаємодія з тегом"],
  emojiHotbar: ["Эмодзи-хотбар", "Emoji hotbar", "Емодзі-хотбар"],
  emojiHotbarDescription: [
    'Нажмите на смайлик ниже, чтобы выбрать нужные эмодзи для хотбара, затем, вставьте сформированную строку сюда. Если хотите отключить хотбар - очистите поле ввода. Далее нажмите кнопку "Обновить хотбар" и перезагрузите страницу',
    'Click on the emoticon below to select the desired emoji for the hotbar, then paste the generated string here. If you want to disable the hotbar, clear the input field. Next, click the "Update hotbar" button and reload the page',
    'Натисніть на смайлика нижче, щоб вибрати потрібні емодзі для хотбару, потім вставте сформований рядок сюди. Якщо хочете вимкнути хотбар - очистіть поле введення. Потім натисніть кнопку "Оновити хотбар" і перезавантажте сторінку',
  ],
  enterEmojiCodes: ["Введите строку с кодами эмодзи...", "Enter emoji codes...", "Введіть рядок з кодами емодзі..."],
  updateHotbar: ["Обновить хотбар", "Update hotbar", "Оновити хотбар"],
  disableMessageCounter: ["Убрать блок информации о чатах", "Remove chat information block", "Прибрати блок інформації про чати"],
  fixLeftMenu: ["Зафиксировать левое меню", "Fix left menu", "Зафіксувати ліве меню"],
  enterProfileGroupID: ["ID пользователя/группы", "User profile/group ID", "ID користувача/групи"],
  enterProfileGroupIDDescription: ['Перейдите в профиль пользователя/в группу и нажмите кнопку "Узнать ID"', 'Go to the user profile/group and click the "Find out ID" button', 'Перейдіть у профіль користувача/у групу та натисніть кнопку "Дізнатися ID"'],
  notUserOrGroup: ["Данный элемент не является пользователем или группой", "This element is not a user or group", "Цей елемент не є користувачем або групою"],
  knowID: ["Узнать ID", "Get ID", "Дізнатися ID"],
  customLogoHeader: ["Свой логотип в шапке профиля", "Custom logo header", "Власний логотип у шапці профілю"],
  addLink: ["Добавьте ссылку...", "Add link...", "Додайте посилання..."],
  set: ["Установить", "Set", "Встановити"],
  resetFast: ["Сброс", "Reset", "Скидання"],
  customBackground: ["Свой фон страницы", "Custom background", "Власний фон сторінки"],
  useCustomFont: ["Использовать свой шрифт", "Use custom font", "Використовувати власний шрифт"],
  enterFontName: ["Используется стандартный шрифт", "You are using default font", "Використовується стандартний шрифт"],
  classicProfileInterface: ["Классический интерфейс профилей", "Classic profile interface", "Класичний інтерфейс профілів"],
  classicProfileInterfaceDescription: ["Возвращает старый дизайн профиля, который был изменён ВК 28 августа 2022 года", "Returns the old profile design, which was changed by VK on August 28, 2022", "Повертає старий дизайн профілю, який був змінений ВК 28 серпня 2022 року"],
  blockTransparency: ["Прозрачность блоков", "Block transparency", "Прозорість блоків"],
  additionalVKEnhancerFunctions: ["Видео в модальном окне", "Videos in modal window", "Відео у модальному вікні"],
  additionalFunctionsDescription: [
    "Старый дизайн сайта от декабря 2017 года - beta<br>Обновите страницу после включения/выключения<br>Временно не поддерживается",
    "Old design from December 2017 - beta<br>Refresh the page after turning on/off<br>Temporary unavailable",
    "Старий дизайн сайту від грудня 2017 року - beta<br>Оновіть сторінку після увімкнення/вимкнення<br>Тимчасово не підтримується",
  ],
  copiedToCB: ["Скопировано в буфер!", "Successfully copied to clipboard!", "Скопійовано у буфер!"],
  customAccent: ["Кастомный акцент", "Custom accent", "Кастомний акцент"],
  highlightColor: ["Цвет выделения", "Highlight color", "Колір виділення"],
  selectedTextColor: ["Цвет выделенного текста", "Selected text color", "Колір виділеного тексту"],
  newMessengerDesign: ["Загрузка граффити", "Graffiti loader", "Завантаження графіті"],
  oldMessagesBadge: ["Старый дизайн исходящих непрочитанных сообщений", "Old design of outgoing unread messages", "Старий дизайн вихідних непрочитаних повідомлень"],
  oldMessagesBadgeDescription: [`Работает только с внешним видом "Строки"`, `Works only with the "Row" appearance.`, `Працює тільки із зовнішнім виглядом "Рядки"`],
  afterReboot: ["Данные функции будут применены только после перезагрузки страницы", "These features will only be applied after the page is reloaded", "Ці функції будуть застосовані лише після перезавантаження сторінки"],
  someAfterReboot: ["Некоторые функции будут применены только после перезагрузки страницы", "Some features will only be applied after the page is reloaded", "Деякі функції будуть застосовані лише після перезавантаження сторінки"],
  newMessengerDesignDescription: [
    "Данной функции потребуется токен от вашей страницы ВК. Не пугайтесь при открытии дополнительного окна, мы гарантируем сохранность ваших данных",
    "This function will require an access token from your VK page. Don't be alarmed when an additional window opens, we guarantee the safety of your data",
    "Даної функції буде потрібно токен від вашої сторінки ВК. Не лякайтеся при відкритті додаткового вікна, ми гарантуємо збереження ваших даних",
  ],
  oldMessengerDesign: ["Старый дизайн мессенджера", "Old messenger design", "Старий дизайн месенджера"],
  oldMessengerDesignDescription: ["Максимально приближённый к старому дизайн мессенджера", "The messenger design is as close to the old one as possible", "Максимально наближений до старого дизайну месенджера"],
  messagesDefaultTheme: ["Сохранение внешнего вида сообщений", "Preserving the appearance of messages", "Збереження зовнішнього вигляду повідомлень"],
  messagesDefaultThemeDescription: ['Внимание!<br>Не активируйте эту функцию, если вы используете вид сообщений "блоки"', 'Attention!<br>Do not activate this feature if you are using the "blocks" message view', 'Увага!<br>Не активуйте цю функцію, якщо ви використовуєте вигляд повідомлень "блоки"'],
  reloadFunctionsButton: ["Стандартный размер стикеров", "Standard size of stickers", "Стандартний розмір стікерів"],
  saveSettingsToFile: ["Сохранить настройки в файл", "Save settings", "Зберегти налаштування в файл"],
  loadSettingsFromFile: ["Загрузить настройки из файла", "Load settings from file", "Завантажити налаштування з файлу"],
  resetSettings: ["Сбросить настройки", "Reset settings", "Скинути налаштування"],
  usefulLinks: ["Полезные ссылки", "Useful links", "Корисні посилання"],
  vkEnhancerGitHub: ["VK Tools на GitHub", "VK Tools on GitHub", "VK Tools на GitHub"],
  vkEnhancerGitHubDescription: ["Исходный код и новые версии расширения", "Source code and new versions of the extension", "Вихідний код та нові версії розширення"],
  vkEnhancerGroup: ["Группа VK Tools ВКонтакте", "VK Tools group", "Група VK Tools ВКонтакті"],
  vkEnhancerGroupDescription: ["Новости, информация об обновлениях", "News and information about updates", "Новини, інформація про оновлення"],
  vkEnhancerChat: ["Чат VK Tools ВКонтакте", "VK Tools chat", "Чат VK Tools ВКонтакті"],
  vkEnhancerChatDescription: ["Обсуждение новинок и ошибок расширения, общение на любые темы", "Discussion of new features and extension errors, communication on any topic", "Обговорення новинок і помилок розширення, спілкування на будь-які теми"],
  team: ["Команда", "Team", "Команда"],
  extensionCreator: ["Создатель расширения, разработчик, дизайнер", "Extension creator, developer, designer", "Розробник розширення, розробник, дизайнер"],
  developer: ["Бывший разработчик. Рефордж кода расширения, скачивание музыки и видео, интеграция arrive", "Former developer", "Колишній розробник"],
  tester: ["Тестировщик", "Extension tester", "Тестувальник"],
  appearance: ["Внешний вид", "Appearance", "Зовнішній вигляд"],
  messenger: ["Мессенджер", "Messenger", "Месенджер"],
  other: ["Прочее", "Other", "Інше"],
  information: ["Информация", "Information", "Інформація"],
  oldDTab: ["Старый дизайн", "Old design", "Старий дизайн"],
  pseudoTab1: ["Кастомизация акцентов", "Accents customization", "Кастомізація акцентів"],
  pseudoTab2: ["Новый мессенджер", "New messenger", "Новий месенджер"],
  pseudoTab3: ["Настройки", "Settings", "Налаштування"],
  versionNumber: ["Версия 5.4.4 Release", "v. 5.4.4 Release", "Версія 5.4.4 Release"],
  whatsNew: ["Что нового?", "What's new?", "Що нового?"],
  hideMessageFooter: ["Скрыть переключатель непрочитанных сообщений", "Hide unread messages switcher", "Приховати перемикач непрочитаних повідомлень"],
  doWideFeed: ["Ширина ленты", "Feed width", "Ширина стрічки"],
  errorUpdating: [
    "Не обновляется расширение? Нажмите Alt+Shift+R в любом месте браузера и расширение перезагрузится, при этом, обновившись до новейшей версии",
    "Extension not updating? Press Alt+Shift+R anywhere in the browser and the extension will reload, updating to the latest version",
    "Чи не оновлюється розширення? Натисніть Alt+Shift+R будь-де браузера і розширення перезавантажиться, при цьому, оновившись до новітньої версії",
  ],
  lang: ["Язык:", "Language:", "Мова:"],
  notGroupOrUserId: ["Данный элемент не является пользователем или группой", "This element is not a user profile or group", "Цей елемент не є користувачем або групою"],
  loadConfigLeft: ["Загрузить названия пунктов левого меню", "Load left menu item names", "Завантажити назви пунктів лівого меню"],
  saveConfigLeft: ["Скачать конфиг для названий пунктов левого меню", "Download names of the left menu items cfg", "Завантажити конфіг для назв пунктів лівого меню"],
  leftMenuSettingsHeader: ["Названия пунктов левого меню", "Left menu item names", "Назви пунктів лівого меню"],
  garlandDisable: ["Убрать гирлянду", "Remove the garland", "Прибрати гірлянду"],
  profile: ["Профиль", "Profile", "Профіль"],
  feed: ["Лента", "News", "Новини"],
  im: ["Мессенджер", "Messenger", "Месенджер"],
  calls: ["Звонки", "Calls", "Дзвінки"],
  friends: ["Друзья", "Friends", "Друзі"],
  groups: ["Сообщества", "Communities", "Спільноти"],
  photo: ["Фото", "Photos", "Фотографії"],
  audio: ["Музыка", "Music", "Музика"],
  video: ["Видео", "Videos", "Відео"],
  clips: ["Клипы", "Clips", "Кліпи"],
  games: ["Игры", "Games", "Ігри"],
  stickers: ["Стикеры", "Stickers", "Стікери"],
  market: ["Маркет", "Market", "Маркет"],
  services: ["Сервисы", "Mini apps", "Сервіси"],
  vkpay: ["VK Pay", "VK Pay", "VK Pay"],
  bookmarks: ["Закладки", "Bookmarks", "Закладки"],
  files: ["Файлы", "Files", "Файли"],
  ads: ["Реклама", "Ads", "Реклама"],
  appmng: ["Управление", "Managed apps", "Керування"],
  faq: ["Помощь", "Help", "Допомога"],
  save: ["Сохранить", "Save", "Зберегти"],
  feedOldTheme: ["Старый дизайн ленты и постов", "Old feed and posts design", "Старий дизайн стрічки та постів"],
  feedOldThemeDescription: ["Максимально приближённый к старому дизайн ленты и постов", "The design of the feed and posts is as close to the old as possible", "Максимально наближений до старого дизайн стрічки та постів"],
  oldPosting: ["Старый редактор постов", "Old post publisher", "Старий редактор постів"],
  oldPostingDescription: ["Старый редактор постов, удалённый ВК в начале декабря 2024", "Old post publisher, removed by VK in early December 2024", "Старий редактор постів, видалений ВК на початку грудня 2024 року"],
  messageTextUp: ["Отображать текст перед вложениями", "Show text before attachments", "Відображати текст перед вкладеннями"],
};

export default strings;
