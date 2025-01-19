      const getRegDateLabel = (lang:number) => {
        switch (lang) {
          case 0:
            return "Дата регистрации:";
          case 1:
            return "Дата реєстрації:";
          case 454:
            return "Дата реєстрації:";
          case 114:
            return "Дата рэгістрацыі:";
          case 2:
            return "Дата рэгістрацыі:";
          case 777:
            return "Дата заведения досье:";
          case 97:
            return "Тіркеу күні:";
          case 100:
            return "Дата рѣгистрацiи:";
          default:
            return "Registration date:";
        }
}
      
export default getRegDateLabel;