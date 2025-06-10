import { escapeHtml, escapeUrl } from "../../../escapeHtml";
import appearVariable from "./appearVariable";
import createProfileInfoHeader from "./createProfileInfoHeader";
import renderGroups from "./groups/renderGroups";
import groupsLang from "./groupsLang";

const nextExpander = async (
  userData: {
    universities: any;
    schools: any;
    military: string | any[];
    personal: { alcohol?: any; life_main?: any; people_main?: any; smoking?: any; inspired_by?: any; religion?: any; political?: any; langs_full?: any };
    activities: string;
    interests: string;
    music: string;
    movies: string;
    tv: string;
    books: string;
    games: string;
    quotes: string;
    about: string;
  },
  moreItemsLoaded: any,
  preloadedGroups: any
) => {
  let education = userData.universities;
  let educationDiv = document.createElement("div");
  if (education) {
    education.forEach(
      (edu: {
        name: string | null;
        country: any;
        city: any;
        id: any;
        graduation: number;
        faculty_name: string | null;
        university: any;
        faculty: any;
        chair_name: string | null;
        chair: any;
        education_form: string | null;
        education_form_id: any;
        education_status: string | null;
        education_status_id: any;
      }) => {
        let educationInfo = document.createElement("div");
        educationInfo.classList.add("education_info");
        let universityInfo = document.createElement("div");
        let facultyInfo = document.createElement("div");
        let chairInfo = document.createElement("div");
        let educationFormInfo = document.createElement("div");
        let statusInfo = document.createElement("div");
        let eduRowInner = document.createElement("div");
        if (edu.name) {
          let universityLink = document.createElement("a");
          universityLink.href = `/search/people?education_city_id=${edu.city}&education_id=${edu.id}&education_type=university`;
          universityLink.textContent = edu.name;

          let graduationYearText = "";
          if (edu.graduation && edu.graduation !== 0) {
            graduationYearText = `​ '${edu.graduation.toString().slice(-2)}`;
          }

          let graduationLink = document.createElement("a");
          graduationLink.href = `/search/people?education_city_id=${edu.city}&education_id=${edu.id}&education_type=university&education_year=${edu.graduation}`;
          graduationLink.textContent = graduationYearText;

          let universityDiv = document.createElement("div");
          universityDiv.classList.add("label", "fl_l");
          universityDiv.textContent = `${getLang?.("Univ")}`;
          universityInfo.classList.add("education_row");
          universityInfo.appendChild(universityDiv);
          eduRowInner.classList.add("education_row_inner");
          universityLink.style.display = "inline";
          eduRowInner.append(universityLink);
          if (graduationYearText !== "") {
            eduRowInner.append(graduationLink);
          }
          universityInfo.append(eduRowInner);
        }
        // Факультет
        if (edu.faculty_name) {
          let facultyLink = document.createElement("a");
          facultyLink.href = `/search/people?c[name]=0&c[uni_country]=${edu.country}&c[uni_city]=${edu.city}&c[university]=${edu.id}&c[faculty]=${edu.faculty}`;
          facultyLink.textContent = edu.faculty_name;
          let facultyDiv = document.createElement("div");
          facultyDiv.classList.add("label", "fl_l");
          facultyDiv.textContent = `${getLang?.("Faculty")}`;
          facultyInfo.classList.add("education_row");
          facultyInfo.appendChild(facultyDiv);
          facultyInfo.appendChild(facultyLink);
        }
        // Специальность
        if (edu.chair_name) {
          let chairLink = document.createElement("a");
          chairLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=1&c[university]=2&c[faculty]=23&c[chair]=${edu.chair}`;
          chairLink.textContent = edu.chair_name;
          let chairDiv = document.createElement("div");
          chairDiv.classList.add("label", "fl_l");
          chairDiv.textContent = `${getLang?.("Chair")}`;
          chairInfo.classList.add("education_row");
          chairInfo.appendChild(chairDiv);
          chairInfo.appendChild(chairLink);
        }

        // Форма обучения
        if (edu.education_form) {
          let educationFormLink = document.createElement("a");
          educationFormLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=153&c[university]=${edu.university}&c[edu_form]=${edu.education_form_id}`;
          educationFormLink.textContent = edu.education_form;
          let educationFormDiv = document.createElement("div");
          educationFormDiv.classList.add("label", "fl_l");
          educationFormDiv.textContent = `${getLang?.("Form")}`;
          educationFormInfo.classList.add("education_row");
          educationFormInfo.appendChild(educationFormDiv);
          educationFormInfo.appendChild(educationFormLink);
        }
        // Статус
        if (edu.education_status) {
          let statusLink = document.createElement("a");
          statusLink.href = `/search/people?c[name]=0&c[uni_country]=1&c[uni_city]=1&c[university]=2&c[edu_status]=${edu.education_status_id}`;
          statusLink.textContent = edu.education_status;
          let statusDiv = document.createElement("div");
          statusDiv.classList.add("label", "fl_l");
          statusDiv.textContent = `${getLang?.("global_edustatus")}`;
          statusInfo.classList.add("education_row");
          statusInfo.appendChild(statusDiv);
          statusInfo.appendChild(statusLink);
        }

        educationInfo.appendChild(universityInfo);
        educationInfo.appendChild(facultyInfo);
        educationInfo.appendChild(chairInfo);
        educationInfo.appendChild(educationFormInfo);
        educationInfo.appendChild(statusInfo);
        moreItemsLoaded.appendChild(educationInfo);
      }
    );

    moreItemsLoaded.appendChild(educationDiv);
  }
  let schools = userData.schools;
  if (schools) {
    schools.forEach((school: { name: string | null; country: any; city: any; id: any; year_from: any; year_to: any; class: any; year_graduated: any; speciality: string | null }) => {
      let schoolInfo = document.createElement("div");
      schoolInfo.classList.add("school_info");

      // Школа
      if (school.name) {
        let schoolDiv = document.createElement("div");
        schoolDiv.classList.add("label", "fl_l");
        schoolDiv.textContent = `${getLang?.("admin2_school")}`;
        schoolInfo.appendChild(schoolDiv);

        let schoolLink = document.createElement("a");
        schoolLink.style.width = "335px";
        schoolLink.style.maxWidth = "335px";
        schoolLink.style.wordBreak = "break-word";
        schoolLink.style.display = "inline-block";
        schoolLink.href = `/search/people?education_city_id=${school.city}&education_id=${school.id}&education_type=school`;
        schoolLink.textContent = school.name;
        schoolInfo.appendChild(schoolLink);
      }
      // Годы обучения и класс
      if (school.year_from && school.year_to) {
        let yearClassDiv = document.createElement("div");
        yearClassDiv.classList.add("yearClassDiv");
        if (school.city) {
          vkApi
            .api("database.getCitiesById", { city_ids: school.city })
            .then((cidSchool: { title: string }[]) => {
              let schoolCity = document.createElement("div");
              schoolCity.textContent = cidSchool[0].title + ", ​";
              yearClassDiv.prepend(schoolCity);
            })
            .catch((error: any) => {
              console.error("Error fetching city:", error);
            });
        }
        let yearRangeDiv = document.createElement("div");
        yearRangeDiv.textContent = `${school.year_from}-${school.year_to} ​`;
        yearClassDiv.appendChild(yearRangeDiv);

        // Класс
        if (school.class) {
          let classLink = document.createElement("a");
          classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
          classLink.textContent = `(${school.class})`;
          yearClassDiv.appendChild(classLink);
        }

        schoolInfo.appendChild(yearClassDiv);
      } else if (school.year_from) {
        let yearFromDiv = document.createElement("div");
        yearFromDiv.classList.add("yearClassDiv");
        let yearFromString = getLang?.("profile_places_year_from");
        yearFromDiv.textContent = Array.isArray(yearFromString) ? yearFromString[0].replace("%s", `${school.year_from}`) : yearFromString?.replace("%s", `${school.year_from}`) || `с ${school.year_from} г.`;
        if (school.city) {
          vkApi
            .api("database.getCitiesById", { city_ids: school.city })
            .then((cidSchool: { title: string }[]) => {
              let schoolCity = document.createElement("div");
              schoolCity.textContent = cidSchool[0].title + ", ​";
              yearFromDiv.prepend(schoolCity);
            })
            .catch((error: any) => {
              console.error("Error fetching city:", error);
            });
        }
        schoolInfo.appendChild(yearFromDiv);

        // Класс
        if (school.class) {
          let classLink = document.createElement("a");
          classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_class]=${school.class}`;
          classLink.textContent = `(${school.class})`;
          yearFromDiv.appendChild(classLink);
        }
      } else if (school.year_to) {
        let yearFromDiv = document.createElement("div");
        yearFromDiv.classList.add("yearClassDiv");
        let yearFromString = getLang?.("profile_places_year_to");
        yearFromDiv.textContent = Array.isArray(yearFromString) ? yearFromString[0].replace("%s", `${school.year_to}`) : yearFromString?.replace("%s", `${school.year_to}`) || `с ${school.year_to} г.`;
        if (school.city) {
          vkApi
            .api("database.getCitiesById", { city_ids: school.city })
            .then((cidSchool: { title: string }[]) => {
              let schoolCity = document.createElement("div");
              schoolCity.textContent = cidSchool[0].title + ", ​";
              yearFromDiv.prepend(schoolCity);
            })
            .catch((error: any) => {
              console.error("Error fetching city:", error);
            });
        }
        schoolInfo.appendChild(yearFromDiv);

        // Класс
        if (school.class) {
          let classLink = document.createElement("a");
          classLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_year]=${school.year_graduated}&c[school_class]=${school.class}`;
          classLink.textContent = `(${school.class})`;
          yearFromDiv.appendChild(classLink);
        }
      }

      // Специальность
      if (school.speciality) {
        let specialityLink = document.createElement("a");
        specialityLink.href = `/search/people?c[name]=0&c[school_country]=${school.country}&c[school_city]=${school.city}&c[school]=${school.id}&c[school_spec]=${school.speciality}`;
        specialityLink.textContent = school.speciality;
        specialityLink.style.display = "inline-block";
        specialityLink.style.marginLeft = "165px";
        schoolInfo.appendChild(specialityLink);
      }

      moreItemsLoaded.appendChild(schoolInfo);
    });
  }

  if (userData.military && userData.military.length > 0) {
    let commonDiv = createProfileInfoHeader(getLang?.("profile_military").toString() || "Военная служба", "https://vk.com/edit?act=military");
    moreItemsLoaded.appendChild(commonDiv);
    let military: any = userData.military;
    if (military) {
      military.forEach((voin: { unit: string | null; country_id: any; unit_id: any; from: any; until: any }) => {
        let voinInfo = document.createElement("div");
        voinInfo.classList.add("voin_info");
        voinInfo.style.display = "flex";
        voinInfo.style.flexWrap = "wrap";
        // Воинская часть
        if (voin.unit) {
          let voinDiv = document.createElement("div");
          voinDiv.classList.add("label", "fl_l");
          voinDiv.textContent = `${getLang?.("Military_place")}`;
          voinInfo.appendChild(voinDiv);

          let voinLink = document.createElement("a");
          voinLink.style.width = "335px";
          voinLink.style.maxWidth = "335px";
          voinLink.style.wordBreak = "break-word";
          voinLink.href = `/search/people?c[name]=0&c[mil_country]=${voin.country_id}&c[mil_unit]=${voin.unit_id}`;
          voinLink.textContent = voin.unit;
          voinInfo.appendChild(voinLink);
        }

        // Воинская часть годы службы
        if (voin.from && voin.until) {
          let voinClassDiv = document.createElement("div");
          voinClassDiv.classList.add("voinClassDiv");

          let voinRangeDiv = document.createElement("div");
          voinRangeDiv.textContent = `${voin.from}-${voin.until} `;
          voinClassDiv.appendChild(voinRangeDiv);

          voinInfo.appendChild(voinClassDiv);
        } else if (voin.from) {
          let voinFromDiv = document.createElement("div");
          voinFromDiv.classList.add("voinClassDiv");

          let voinFromString = getLang?.("profile_places_year_from");
          voinFromDiv.textContent = Array.isArray(voinFromString) ? voinFromString[0].replace("%s", `${voin.from}`) : voinFromString?.replace("%s", `${voin.from}`) || `с ${voin.from} г.`;
          voinInfo.appendChild(voinFromDiv);
        } else if (voin.until) {
          let voinUntilDiv = document.createElement("div");
          voinUntilDiv.classList.add("voinClassDiv");

          let voinUntilString = getLang?.("profile_places_year_to");
          voinUntilDiv.textContent = Array.isArray(voinUntilString) ? voinUntilString[0].replace("%s", `${voin.until}`) : voinUntilString?.replace("%s", `${voin.until}`) || `до ${voin.until} г.`;
          voinInfo.appendChild(voinUntilDiv);
        }
        moreItemsLoaded.appendChild(voinInfo);
      });
    }
  }

  if (
    userData.personal &&
    ((userData.personal.alcohol && userData.personal.alcohol !== 0) ||
      (userData.personal.life_main && userData.personal.life_main !== 0) ||
      (userData.personal.people_main && userData.personal.people_main !== 0) ||
      (userData.personal.smoking && userData.personal.smoking !== 0) ||
      (userData.personal.inspired_by && userData.personal.inspired_by !== "") ||
      (userData.personal.religion && userData.personal.religion !== "")) &&
    Object.keys(userData.personal).length > 0
  ) {
    let commonDiv = createProfileInfoHeader(getLang?.("profile_beliefs").toString() || "Жизненная позиция", "https://vk.com/edit?act=personal");
    moreItemsLoaded.appendChild(commonDiv);

    let lifePos = document.createElement("div");
    lifePos.classList.add("life_info");

    // 1. Политические предпочтения
    let politicalLabels = [getLang?.("politics_comm"), getLang?.("politics_soc"), getLang?.("politics_moder"), getLang?.("politics_liber"), getLang?.("politics_cons"), getLang?.("politics_mon"), getLang?.("politics_ucons"), getLang?.("politics_indiff"), getLang?.("politics_libert")];
    let political = userData.personal.political;
    if (political) {
      let politicalDiv = document.createElement("div");
      politicalDiv.classList.add("politicalRow");

      let politicalLabel = document.createElement("div");
      politicalLabel.textContent = `${getLang?.("profile_politics")}`;
      politicalLabel.classList.add("label", "fl_l");
      politicalDiv.appendChild(politicalLabel);

      let politicalLink = document.createElement("div");
      politicalLink.classList.add("vkEnhancerPoliticalInfo");
      politicalLink.textContent = `${politicalLabels[political - 1]}`;

      politicalDiv.appendChild(politicalLink);
      lifePos.appendChild(politicalDiv);
    }

    // 2. Мировоззрение
    let religion = userData.personal.religion;
    if (religion) {
      let religionDiv = document.createElement("div");
      religionDiv.classList.add("religionRow");

      let religionLabel = document.createElement("div");
      religionLabel.textContent = `${getLang?.("profile_religion")}`;
      religionLabel.classList.add("label", "fl_l");
      religionDiv.appendChild(religionLabel);

      let religionLink = document.createElement("a");
      religionLink.href = `/search/people?c[name]=0&c[religion]=${encodeURIComponent(religion)}`;
      religionLink.textContent = religion;

      religionDiv.appendChild(religionLink);
      lifePos.appendChild(religionDiv);
    }

    // 3. Главное в жизни
    let lifeMainLabels = [getLang?.("Personal_priority1"), getLang?.("Personal_priority2"), getLang?.("Personal_priority3"), getLang?.("Personal_priority4"), getLang?.("Personal_priority5"), getLang?.("Personal_priority6"), getLang?.("Personal_priority7"), getLang?.("Personal_priority8")];
    let lifeMain = userData.personal.life_main;
    if (lifeMain) {
      let lifeMainDiv = document.createElement("div");
      lifeMainDiv.classList.add("lifeMainRow");

      let lifeMainLabel = document.createElement("div");
      lifeMainLabel.textContent = `${getLang?.("profile_personal_priority")}`;
      lifeMainLabel.classList.add("label", "fl_l");
      lifeMainDiv.appendChild(lifeMainLabel);

      let lifeMainLink = document.createElement("a");
      lifeMainLink.href = `/search/people?c[name]=0&c[personal_priority]=${encodeURIComponent(lifeMain)}`;
      lifeMainLink.textContent = `${lifeMainLabels[lifeMain - 1]}`;

      lifeMainDiv.appendChild(lifeMainLink);
      lifePos.appendChild(lifeMainDiv);
    }

    // 4. Главное в людях
    let peopleMainLabels = [getLang?.("Important_in_others1"), getLang?.("Important_in_others2"), getLang?.("Important_in_others3"), getLang?.("Important_in_others4"), getLang?.("Important_in_others5"), getLang?.("Important_in_others6")];
    let peopleMain = userData.personal.people_main;
    if (peopleMain) {
      let peopleMainDiv = document.createElement("div");
      peopleMainDiv.classList.add("peopleMainRow");

      let peopleMainLabel = document.createElement("div");
      peopleMainLabel.textContent = `${getLang?.("profile_important_in_others")}`;
      peopleMainLabel.classList.add("label", "fl_l");
      peopleMainDiv.appendChild(peopleMainLabel);

      let peopleMainLink = document.createElement("a");
      peopleMainLink.href = `/search/people?c[name]=0&c[people_priority]=${encodeURIComponent(peopleMain)}`;
      peopleMainLink.textContent = `${peopleMainLabels[peopleMain - 1]}`;

      peopleMainDiv.appendChild(peopleMainLink);
      lifePos.appendChild(peopleMainDiv);
    }

    // 5. Отношение к курению
    let smokingLabels = [getLang?.("Smoking_like1"), getLang?.("Smoking_like2"), getLang?.("Smoking_like3"), getLang?.("Smoking_like4"), getLang?.("Smoking_like5")];
    let smoking = userData.personal.smoking;
    if (smoking) {
      let smokingDiv = document.createElement("div");
      smokingDiv.classList.add("smokingRow");

      let smokingLabel = document.createElement("div");
      smokingLabel.textContent = `${getLang?.("profile_smoking_like")}`;
      smokingLabel.classList.add("label", "fl_l");
      smokingDiv.appendChild(smokingLabel);

      let smokingLink = document.createElement("a");
      smokingLink.href = `/search/people?c[name]=0&c[smoking]=${encodeURIComponent(smoking)}`;
      smokingLink.textContent = `${smokingLabels[smoking - 1]}`;

      smokingDiv.appendChild(smokingLink);
      lifePos.appendChild(smokingDiv);
    }

    // 6. Отношение к алкоголю
    let alcoholLabels = [getLang?.("Alcohol_like1"), getLang?.("Alcohol_like2"), getLang?.("Alcohol_like3"), getLang?.("Alcohol_like4"), getLang?.("Alcohol_like5")];
    let alcohol = userData.personal.alcohol;
    if (alcohol) {
      let alcoholDiv = document.createElement("div");
      alcoholDiv.classList.add("alcoholRow");

      let alcoholLabel = document.createElement("div");
      alcoholLabel.textContent = `${getLang?.("profile_alcohol_like")}`;
      alcoholLabel.classList.add("label", "fl_l");
      alcoholDiv.appendChild(alcoholLabel);

      let alcoholLink = document.createElement("a");
      alcoholLink.href = `/search/people?c[name]=0&c[alcohol]=${encodeURIComponent(alcohol)}`;
      alcoholLink.textContent = `${alcoholLabels[alcohol - 1]}`;

      alcoholDiv.appendChild(alcoholLink);
      lifePos.appendChild(alcoholDiv);
    }

    // 7. Источники вдохновения
    let inspiredBy = userData.personal.inspired_by;
    if (inspiredBy) {
      let inspiredByDiv = document.createElement("div");
      inspiredByDiv.classList.add("inspired_by_info");

      let inspiredByLabel = document.createElement("div");
      inspiredByLabel.textContent = `${getLang?.("profile_inspired_by")}`;
      inspiredByLabel.classList.add("label", "fl_l");
      inspiredByDiv.appendChild(inspiredByLabel);

      let inspiredBySpan = document.createElement("span");

      let inspiredByLinks = inspiredBy.split(", ");
      inspiredByLinks.forEach((inspiration: string | number | boolean, index: number) => {
        let inspirationLink = document.createElement("a");
        inspirationLink.href = `/search/people?c[name]=0&c[q]=${encodeURIComponent(inspiration)}`;
        inspirationLink.textContent = `${inspiration}`;
        inspiredBySpan.appendChild(inspirationLink);

        if (index !== inspiredByLinks.length - 1) {
          inspiredBySpan.appendChild(document.createTextNode(", ​"));
        }
      });

      inspiredByDiv.appendChild(inspiredBySpan);
      lifePos.appendChild(inspiredByDiv);
    }

    moreItemsLoaded.appendChild(lifePos);
  }

  if (
    (userData.activities && userData.activities !== "") ||
    (userData.interests && userData.interests !== "") ||
    (userData.music && userData.music !== "") ||
    (userData.movies && userData.movies !== "") ||
    (userData.tv && userData.tv !== "") ||
    (userData.books && userData.books !== "") ||
    (userData.games && userData.games !== "") ||
    (userData.quotes && userData.quotes !== "") ||
    (userData.about && userData.about !== "") ||
    (preloadedGroups && Object.entries(preloadedGroups || {})?.length > 0)
  ) {
    let commonDiv = createProfileInfoHeader(getLang?.("profile_private").toString() || "Личная информация", "https://vk.com/edit?act=interests");
    moreItemsLoaded.appendChild(commonDiv);

    let activities = userData.activities;
    if (activities) {
      let interestsDiv = document.createElement("div");
      interestsDiv.classList.add("interests_info");

      let activitiesLabel = document.createElement("div");
      activitiesLabel.textContent = `${getLang?.("Activities")}`;
      activitiesLabel.classList.add("label", "fl_l");
      interestsDiv.appendChild(activitiesLabel);

      let activitiesSpan = document.createElement("span");
      activitiesSpan.classList.add("labeled");

      let interests = activities.split(", ");
      interests.forEach((interest, index) => {
        let interestLink = document.createElement("a");
        interestLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(interest)}`;
        interestLink.textContent = interest;
        activitiesSpan.appendChild(interestLink);

        if (index !== interests.length - 1) {
          activitiesSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      interestsDiv.appendChild(activitiesSpan);
      moreItemsLoaded.appendChild(interestsDiv);
    }

    let interests = userData.interests;
    if (interests && interests.length > 0) {
      let interestsDiv = document.createElement("div");
      interestsDiv.classList.add("interests_info");

      let interestsLabel = document.createElement("div");
      interestsLabel.textContent = `${getLang?.("profile_interests")}`;
      interestsLabel.classList.add("label", "fl_l");
      interestsDiv.appendChild(interestsLabel);

      let interestsSpan = document.createElement("span");
      interestsSpan.classList.add("labeled");

      let interestList = interests.split(", ");
      interestList.forEach((interest, index) => {
        let interestLink = document.createElement("a");
        interestLink.href = `/search/people?c[name]=0&c[q]=${encodeURIComponent(interest)}`;
        interestLink.textContent = interest;

        interestsSpan.appendChild(interestLink);

        if (index !== interestList.length - 1) {
          interestsSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      interestsDiv.appendChild(interestsSpan);
      moreItemsLoaded.appendChild(interestsDiv);
    }

    let music = userData.music;
    if (music) {
      let musicDiv = document.createElement("div");
      musicDiv.classList.add("music_info");

      let musicLabel = document.createElement("div");
      musicLabel.textContent = `${getLang?.("Fave_music")}`;
      musicLabel.classList.add("label", "fl_l");
      musicDiv.appendChild(musicLabel);

      let musicSpan = document.createElement("span");
      musicSpan.classList.add("labeled");

      let musicList = music.split(", ");
      musicList.forEach((genre, index) => {
        let genreLink = document.createElement("a");
        genreLink.href = `/search/audio?q=${encodeURIComponent(genre)}`;
        genreLink.textContent = genre;

        musicSpan.appendChild(genreLink);

        if (index !== musicList.length - 1) {
          musicSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      musicDiv.appendChild(musicSpan);
      moreItemsLoaded.appendChild(musicDiv);
    }

    let movies = userData.movies;
    if (movies) {
      let moviesDiv = document.createElement("div");
      moviesDiv.classList.add("movies_info");

      let moviesLabel = document.createElement("div");
      moviesLabel.textContent = `${getLang?.("Fave_movies")}`;
      moviesLabel.classList.add("label", "fl_l");
      moviesDiv.appendChild(moviesLabel);

      let moviesSpan = document.createElement("span");
      moviesSpan.classList.add("labeled");

      let movieList = movies.split(", ");
      movieList.forEach((movie, index) => {
        let movieLink = document.createElement("a");
        movieLink.href = `/search/video?q=${encodeURIComponent(movie)}`;
        movieLink.textContent = movie;
        moviesSpan.appendChild(movieLink);

        if (index !== movieList.length - 1) {
          moviesSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      moviesDiv.appendChild(moviesSpan);
      moreItemsLoaded.appendChild(moviesDiv);
    }

    let tv = userData.tv;
    if (tv) {
      let moviesDiv = document.createElement("div");
      moviesDiv.classList.add("movies_info");

      let moviesLabel = document.createElement("div");
      moviesLabel.textContent = `${getLang?.("Fave_tvshows")}`;
      moviesLabel.classList.add("label", "fl_l");
      moviesDiv.appendChild(moviesLabel);

      let moviesSpan = document.createElement("span");
      moviesSpan.classList.add("labeled");

      let movieList = tv.split(", ");
      movieList.forEach((movie, index) => {
        let movieLink = document.createElement("a");
        movieLink.href = `/search/video?q=${encodeURIComponent(movie)}`;
        movieLink.textContent = movie;
        moviesSpan.appendChild(movieLink);

        if (index !== movieList.length - 1) {
          moviesSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      moviesDiv.appendChild(moviesSpan);
      moreItemsLoaded.appendChild(moviesDiv);
    }

    let books = userData.books;
    if (books) {
      let booksDiv = document.createElement("div");
      booksDiv.classList.add("books_info");

      let booksLabel = document.createElement("div");
      booksLabel.textContent = `${getLang?.("Fave_books")}`;
      booksLabel.classList.add("label", "fl_l");
      booksDiv.appendChild(booksLabel);

      let booksSpan = document.createElement("span");
      booksSpan.classList.add("labeled");

      let bookList = books.split(", ");
      bookList.forEach((book, index) => {
        let bookLink = document.createElement("a");
        bookLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(book)}`;
        bookLink.textContent = book;
        booksSpan.appendChild(bookLink);

        if (index !== bookList.length - 1) {
          booksSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      booksDiv.appendChild(booksSpan);
      moreItemsLoaded.appendChild(booksDiv);
    }

    let games = userData.games;
    if (games) {
      let gamesDiv = document.createElement("div");
      gamesDiv.classList.add("games_info");

      let gamesLabel = document.createElement("div");
      gamesLabel.textContent = `${getLang?.("Fave_games")}`;
      gamesLabel.classList.add("label", "fl_l");
      gamesDiv.appendChild(gamesLabel);

      let gamesSpan = document.createElement("span");
      gamesSpan.classList.add("labeled");

      let gameList = games.split(", ");
      gameList.forEach((game, index) => {
        let gameLink = document.createElement("a");
        gameLink.href = `https://vk.com/search/people?c[name]=0&c[q]=${encodeURIComponent(game)}`;
        gameLink.textContent = game;
        gamesSpan.appendChild(gameLink);

        if (index !== gameList.length - 1) {
          gamesSpan.appendChild(document.createTextNode(", ​"));
        }
      });

      gamesDiv.appendChild(gamesSpan);
      moreItemsLoaded.appendChild(gamesDiv);
    }

    let quotes = userData.quotes;
    if (quotes) {
      let quotesDiv = document.createElement("div");
      quotesDiv.classList.add("quotes_info");

      let quotesLabel = document.createElement("div");
      quotesLabel.textContent = `${getLang?.("Fave_quotes")}`;
      quotesLabel.classList.add("label", "fl_l");
      quotesDiv.appendChild(quotesLabel);

      let quotesText = escapeHtml(quotes).replace(/\n/g, "<br>");
      let quotesSpan = document.createElement("span");
      quotesSpan.classList.add("labeled");
      // quotesSpan.style.display = "inline-block";
      // quotesSpan.style.maxWidth = "335px";
      // quotesSpan.style.width = "335px";
      // quotesSpan.style.wordWrap = "break-word";
      quotesSpan.innerHTML = quotesText;

      quotesDiv.appendChild(quotesSpan);
      moreItemsLoaded.appendChild(quotesDiv);
    }

    let about = userData.about;
    if (about) {
      let aboutDiv = document.createElement("div");
      aboutDiv.classList.add("about_info");

      let aboutLabel = document.createElement("div");
      aboutLabel.textContent = `${getLang?.("Aboutme")}`;
      aboutLabel.classList.add("label", "fl_l");
      aboutDiv.appendChild(aboutLabel);
      let aboutText = escapeHtml(about).replace(/\n/g, "<br>");
      let aboutSpan = document.createElement("span");
      aboutSpan.classList.add("labeled");

      // aboutSpan.style.display = "inline-block";
      // aboutSpan.style.maxWidth = "335px";
      // aboutSpan.style.width = "335px";
      // aboutSpan.style.wordWrap = "break-word";

      let regex = /(?:https?:\/\/|www\.)\S+/g;
      let match;
      let lastIndex = 0;
      while ((match = regex.exec(aboutText)) !== null) {
        let link = match[0];
        let linkText = link.length > 20 ? link.substring(0, 20) + "..." : link;
        if (!link.startsWith("http://") && !link.startsWith("https://")) {
          link = "https://" + link;
        }
        let beforeText = aboutText.substring(lastIndex, match.index);
        lastIndex = match.index + link.length;
        aboutSpan.innerHTML += beforeText;
        aboutSpan.innerHTML += `<a href="${escapeUrl(link)}">${escapeHtml(linkText)}</a>`;
      }
      aboutSpan.innerHTML += aboutText.substring(lastIndex);

      aboutDiv.appendChild(aboutSpan);
      moreItemsLoaded.appendChild(aboutDiv);
    }
    //Группы(если есть)
    if (preloadedGroups && Object.entries(preloadedGroups || {})?.length > 0) {
      const MAX_VISIBLE_GROUPS = 15;

      let groupsDiv = document.createElement("div");
      groupsDiv.classList.add("groups_info");

      let groupsLabel = document.createElement("div");
      groupsLabel.classList.add("label", "fl_l");

      let groupsLabelHref = document.createElement("a");
      groupsLabelHref.classList.add("groupsLabelHref");
      groupsLabelHref.setAttribute("onclick", "return nav.go(this, event, {noback: false})");
      groupsLabelHref.href = `https://vk.com/groups?id=${cur.oid}`;
      groupsLabelHref.textContent = `${groupsLang(vk.lang)}`;

      groupsLabel.append(groupsLabelHref);
      groupsDiv.appendChild(groupsLabel);

      let groupsSpan = document.createElement("span");
      groupsSpan.classList.add("labeled");

      const groupsArray = Object.entries(preloadedGroups);

      renderGroups(MAX_VISIBLE_GROUPS, groupsArray, groupsSpan);

      groupsDiv.append(groupsSpan);
      moreItemsLoaded.appendChild(groupsDiv);

      if (groupsArray.length > MAX_VISIBLE_GROUPS) {
        const toggleButton = document.createElement("a");
        toggleButton.classList.add("noselect");
        toggleButton.id = "profile_groups_link";
        toggleButton.href = `https://vk.com/groups?id=${cur.oid}`;
        toggleButton.textContent = "Показать полный список";

        let expanded = false;

        toggleButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          if (!expanded) {
            renderGroups(groupsArray.length, groupsArray, groupsSpan);
            toggleButton.textContent = "Скрыть полный список";
            expanded = true;
          } else {
            renderGroups(MAX_VISIBLE_GROUPS, groupsArray, groupsSpan);
            toggleButton.textContent = "Показать полный список";
            expanded = false;
          }
          appearVariable();
        });

        moreItemsLoaded.append(toggleButton);
      }
    }
  }
};

export default nextExpander;
