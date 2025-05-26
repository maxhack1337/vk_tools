import formatRelationName from "./formatRelationName";
import getUserDataFields from "./getUserDataFields";
import langReplacePrep from "./langReplacePrep";

const getRelationText = async (
  relation: any,
  userData: {
    bdate?: any;
    id?: number;
    relation?: any;
    city?: { id: any; title: any };
    occupation?: any;
    site?: any;
    home_town?: string;
    personal?: { langs_full?: any; alcohol?: any; life_main?: any; people_main?: any; smoking?: any; inspired_by?: any; religion?: any };
    relatives?: string | any[];
    home_phone?: string;
    mobile_phone?: string;
    skype?: string;
    career?: string | any[];
    universities?: string | any[];
    schools?: string | any[];
    military?: string | any[];
    activities?: string;
    interests?: string;
    music?: string;
    movies?: string;
    tv?: string;
    books?: string;
    games?: string;
    quotes?: string;
    about?: string;
    relation_partner: any;
    sex: any;
  }
) => {
  if (!relation) return "";
  var relationText = "";
  var relationPartner = userData.relation_partner;
  var sex = userData.sex;
  if (relationPartner) {
    var partnerData = relationPartner.id ? await getUserDataFields(relationPartner.id) : null;
    var formatted_name = formatRelationName(relation, sex, partnerData);
  }
  switch (relation) {
    case 1:
      if (sex === 2) {
        const langValue = getLang?.("profile_m_not_married");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Не женат";
      } else {
        const langValue = getLang?.("profile_fm_not_married");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Не замужем";
      }
      break;
    case 2:
      if (sex === 2) {
        const langValue = getLang?.("profile_m_has_friend");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Есть подруга";
      } else {
        const langValue = getLang?.("profile_fm_has_friend");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Есть друг";
      }
      if (relationPartner) {
        let relationTextP = langReplacePrep(getLang?.("profile_meet_with_partner").toString() || "", formatted_name || "");

        relationText = Array.isArray(relationTextP)
          ? relationTextP[0].replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`)
          : relationTextP.replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`);
      }
      break;
    case 3:
      if (sex === 2) {
        const langValue = getLang?.("profile_m_engaged");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Помолвлен";
      } else {
        const langValue = getLang?.("profile_fm_engaged");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Помолвлена";
      }
      if (relationPartner) {
        if (sex === 2) {
          const langValue = getLang?.("profile_engaged_with_partner", "raw")[1];
          relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "помолвлен {prep_with} %s";
        } else {
          const langValue = getLang?.("profile_engaged_with_partner", "raw")[2];
          relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "помолвлена {prep_with} %s";
        }
        let relationTextP = langReplacePrep(relationText, formatted_name || "");
        relationText = Array.isArray(relationTextP)
          ? relationTextP[0].replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)"">${formatted_name}</a>`)
          : relationTextP.replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)"">${formatted_name}</a>`);
      }
      break;
    case 4:
      if (sex === 2) {
        const langValue = getLang?.("profile_m_married");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Женат";
      } else {
        const langValue = getLang?.("profile_fm_married");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Замужем";
      }
      if (relationPartner) {
        if (sex === 2) {
          const langValue = getLang?.("profile_married_with_partner", "raw")[1];
          relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Женат на %s";
        } else {
          const langValue = getLang?.("profile_married_with_partner", "raw")[2];
          relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "Замужем за %s";
        }
        let relationTextP = langReplacePrep(relationText, formatted_name || "");
        relationText = Array.isArray(relationTextP)
          ? relationTextP[0].replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`)
          : relationTextP.replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`);
      }
      break;
    case 5:
      let langValueLet = getLang?.("profile_complicated");
      relationText = Array.isArray(langValueLet) ? langValueLet.join(", ") : langValueLet || "Всё сложно";
      if (relationPartner) {
        const rawValue = getLang?.("profile_complic_with_partner", "raw");
        relationText = Array.isArray(rawValue) ? rawValue[0] : rawValue || "";
        let relationTextP = langReplacePrep(relationText, formatted_name || "");
        relationText = Array.isArray(relationTextP)
          ? relationTextP[0].replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`)
          : relationTextP.replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`);
      }
      break;
    case 6:
      let langValue = getLang?.("profile_in_search");
      relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "В активном поиске";
      break;
    case 7:
      if (sex === 2) {
        const langValue = getLang?.("profile_m_in_love");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "влюблён";
      } else {
        const langValue = getLang?.("profile_f_in_love");
        relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "влюблена";
      }
      if (relationPartner) {
        if (sex === 2) {
          const langValue = getLang?.("profile_love_with_partner", "raw")[1];
          relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "влюблён {prep_into} %s";
        } else {
          const langValue = getLang?.("profile_love_with_partner", "raw")[2];
          relationText = Array.isArray(langValue) ? langValue.join(", ") : langValue || "влюблена {prep_into} %s";
        }
        let relationTextP = langReplacePrep(relationText, formatted_name || "");
        relationText = Array.isArray(relationTextP)
          ? relationTextP[0].replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`)
          : relationTextP.replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`);
      }
      break;
    case 8:
      let langValueLet2 = getLang?.("profile_civil_married");
      relationText = Array.isArray(langValueLet2) ? langValueLet2.join(", ") : langValueLet2 || "В гражданском браке";
      if (relationPartner) {
        let civilRaw = getLang?.("profile_civil_married_with", "raw");
        relationText = Array.isArray(civilRaw) ? civilRaw.join(", ") : civilRaw || "В гражданском браке с %s";
        let relationTextP = langReplacePrep(relationText, formatted_name || "");

        relationText = Array.isArray(relationTextP)
          ? relationTextP[0].replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`)
          : relationTextP.replace("%s", `<a href="https://vk.com/id${relationPartner.id}" mention_id="id${relationPartner.id}" onmouseover="mentionOver(this)">${formatted_name}</a>`);
      }
      break;
    default:
      return "";
  }
  return relationText;
};

export default getRelationText;
