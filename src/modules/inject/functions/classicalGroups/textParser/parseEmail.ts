const emailPattern = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@" + "(" + "((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})" + "([A-Za-zа-яА-Я\\-\\d]{2,22})" + ")" + ")", "gi");

const parseEmail = (input: string) => {
  return input.replace(emailPattern, (match: string) => {
    return `<a href="mailto:${match}">${match}</a>`;
  });
};

export default parseEmail;
