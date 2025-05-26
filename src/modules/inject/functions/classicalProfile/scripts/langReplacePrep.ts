const langReplacePrep = (langWithToken: string, valueToCompare: string) => {
  if (!valueToCompare) {
    return langWithToken;
  }
  const prep = window.langConfig.prep;
  if (prep.length) {
    const matchedPrepsByToken = prep
      .map((item: [any, any, any]) => {
        const [token, firstLetters, replacePrep] = item;
        const [lowerCaseToken, upperCaseToken] = token.split(",");
        const [lowerReplacePrep, upperReplacePrep] = replacePrep.split(",");
        const isLowerCaseTokenExist = new RegExp(lowerCaseToken).test(langWithToken);
        const isUpperCaseTokenExist = new RegExp(upperCaseToken).test(langWithToken);
        if (isLowerCaseTokenExist) {
          return [lowerCaseToken, firstLetters, lowerReplacePrep];
        }
        if (isUpperCaseTokenExist) {
          return [upperCaseToken, firstLetters, upperReplacePrep];
        }
        return false;
      })
      .filter((val: any) => !!val);
    if (matchedPrepsByToken.length === 2) {
      const [specialPrep, defaultPrep] = matchedPrepsByToken;
      const [defaultToken, defaultFirstLetters, defaultPretext] = defaultPrep;
      const isDefaultLettersExistInValue = defaultFirstLetters.split(",").find((firstLetters: string) => {
        const modifiedFirstLetters = firstLetters.replace("*", "");
        return modifiedFirstLetters && new RegExp(`^${modifiedFirstLetters}`).test(valueToCompare);
      });
      if (!isDefaultLettersExistInValue) {
        const [specialToken, specialFirstLetters, specialPretext] = specialPrep;
        const isSpecialLettersExistInValue = specialFirstLetters.split(",").find((firstLetters: string) => {
          const modifiedFirstLetters = firstLetters.replace("*", "");
          return modifiedFirstLetters && new RegExp(`^${modifiedFirstLetters}`).test(valueToCompare);
        });
        if (isSpecialLettersExistInValue) {
          return langWithToken.replace(specialToken, specialPretext);
        }
      }
      return langWithToken.replace(defaultToken, defaultPretext);
    }
  }
  return langWithToken;
};

export default langReplacePrep;
