import formatRegister from "../classicalProfile/scripts/formatRegister";
import getLangTime from "../classicalProfile/scripts/getLangTime";
import getRegDateLabel from "../classicalProfile/scripts/getRegDateLabel";
import getRegDateValue from "../classicalProfile/scripts/getRegDateValue";
import getUserDataReact from "../classicalProfile/scripts/getUserDataReact";
import getZodiacIndex from "../classicalProfile/scripts/getZodiacIndex";
import getIdAntiAsync1 from "./getIdAntiAsync1";

const regDate = () => {
    document.arrive(
        `[class^="ProfileFullInfoModal__content"]>section:nth-child(1)`,
        { existing: true },
        async function (e) {
            try {
                let regDateText1 = getRegDateLabel(vk.lang);
                let uiddd = await getIdAntiAsync1();
                let regDateValue1 = await getRegDateValue(uiddd);
                let regDateDate1 = formatRegister(regDateValue1![0]);
                regDateDate1 += " " + regDateValue1![1];
                let registrationRow1 = document.createElement(`div`);
                registrationRow1.classList.add("ProfileModalMiniInfoCell");
                registrationRow1.innerHTML = `
		  <div class="ProfileModalMiniInfoCell__before">
		  <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 ProfileFullCommonInfo__icon" viewBox="0 0 20 20" width="20" height="20" style="width: 20px; height: 20px;">
		  <path fill="currentColor" d="M7.13 1.323a.75.75 0 0 1 1.043-.197c.749.51 1.235 1.012 1.484 1.56.262.577.212 1.095.128 1.5a10 10 0 0 1-.086.363l-.038.154a2 2 0 0 0-.06.381c-.008.187.025.408.254.721a.75.75 0 1 1-1.21.886c-.43-.586-.565-1.141-.543-1.67.01-.248.055-.472.098-.658l.057-.233c.022-.084.04-.156.06-.249.053-.258.049-.41-.026-.575-.087-.192-.32-.503-.963-.942a.75.75 0 0 1-.198-1.041m9.844 4.73c-.211.338-.49.702-.899.99-.72.509-1.495.721-2.106.889l-.2.055c-.672.189-1.114.357-1.456.745a.75.75 0 0 1-1.124-.992c.657-.744 1.488-1.004 2.175-1.197l.193-.054c.635-.176 1.158-.322 1.653-.67.184-.13.337-.313.49-.56a6 6 0 0 0 .275-.492c.057-.109.119-.226.194-.361.167-.3.39-.662.726-.94a2.04 2.04 0 0 1 1.369-.467.75.75 0 1 1-.018 1.5c-.204-.003-.309.05-.393.12-.111.092-.224.246-.373.514-.039.07-.085.158-.135.254-.11.207-.24.456-.371.666"></path><path fill="currentColor" fill-rule="evenodd" d="M6.145 7.997a2.3 2.3 0 0 1 .505.05c.4.086.727.31 1.021.56.287.244.616.58 1.007.978l1.795 1.83c.387.395.713.727.95 1.016.242.297.457.625.536 1.023a2.25 2.25 0 0 1-.32 1.664c-.22.34-.541.566-.877.752-.327.18-.752.368-1.258.592L6.25 17.899c-.86.38-1.553.686-2.097.872-.521.178-1.088.316-1.61.15a2.25 2.25 0 0 1-1.47-1.482c-.162-.524-.02-1.089.163-1.608.19-.543.502-1.232.89-2.09l1.471-3.255c.23-.509.424-.937.61-1.265q.128-.233.293-.445a1.8 1.8 0 0 1 .472-.432 2.25 2.25 0 0 1 1.173-.347m-1.137 3.009-.809 1.79a5.32 5.32 0 0 0 2.764 3.149l2.032-.898a6.83 6.83 0 0 1-3.987-4.041m5.494 2.905a5.31 5.31 0 0 1-4.339-4.415.8.8 0 0 1 .17.017c.04.008.14.043.366.236.23.195.51.48.933.91l1.746 1.782c.418.425.695.709.883.94.186.227.219.326.227.366q.015.082.014.164m-5.22 2.775a6.8 6.8 0 0 1-1.901-2.079c-.34.752-.581 1.298-.73 1.72a3 3 0 0 0-.14.517c-.016.112-.005.154-.005.154a.75.75 0 0 0 .49.493s.041.012.153-.003c.12-.015.285-.056.519-.136.402-.138.917-.358 1.615-.666Zm8.599-4.702c.746-.137 1.704-.123 2.435.206.353.159.639.384.84.69.2.304.346.737.346 1.365a.75.75 0 0 0 1.5 0c0-.871-.207-1.601-.592-2.188a3.4 3.4 0 0 0-1.478-1.234c-1.106-.498-2.401-.483-3.322-.314a.75.75 0 1 0 .271 1.475m1.989 2.697-.556-.556a.444.444 0 0 0-.628 0l-.556.556a.443.443 0 0 0 0 .628l.556.556a.444.444 0 0 0 .628 0l.556-.556a.443.443 0 0 0 0-.628M5.314 4.129l.556.556a.443.443 0 0 1 0 .627l-.556.556a.444.444 0 0 1-.628 0l-.556-.556a.443.443 0 0 1 0-.627l.556-.556a.444.444 0 0 1 .628 0m8.556-.444-.556-.556a.444.444 0 0 0-.628 0l-.556.556a.443.443 0 0 0 0 .628l.556.556a.444.444 0 0 0 .628 0l.556-.556a.443.443 0 0 0 0-.628m4.444 4.442.556.557a.443.443 0 0 1 0 .627l-.556.556a.444.444 0 0 1-.628 0l-.556-.556a.443.443 0 0 1 0-.627l.556-.557a.444.444 0 0 1 .628 0"></path>
		  </svg>
		  </div>
		  <div class="ProfileModalMiniInfoCell__in">
		  <span class="ProfileFullCommonInfo__caption">${regDateText1}
		  <span>${regDateDate1}</span>
		  </span></div>
		  `;
                if (registrationRow1 && !regDateDate1?.includes('null')) {
                    e.appendChild(registrationRow1);
                } else {
                    console.error(
                        "[VK Tools Error]: There is no registration date for user " +
                        uiddd
                    );
                }
            } catch (error) {
                console.error(
                    "[VK Tools Error]: There is no registration date for user " +
                    (await getIdAntiAsync1()) +
                    error
                );
            }
        }
    );

    document.arrive(
  `.ProfileModalMiniInfoCell:has(.vkuiIcon--gift_outline_20)`,
  { existing: true },
  async function (e) {
    let respsp = await getUserDataReact();
    let birthday = respsp.bdate;
    var ageAndZodiac = "";

    var parts = birthday.split(".");
    if (parts.length === 3) {
      let bDayFull = birthday;
      let ptsOfAfe = bDayFull.split(".");
      let birthYear1 = parseInt(ptsOfAfe[2], 10);
      let birthMonth1 = parseInt(ptsOfAfe[1], 10);
      let birthDay1 = parseInt(ptsOfAfe[0], 10);
      let todayDate1 = new Date();
      let currentYear1 = todayDate1.getFullYear();
      let currentMonth1 = todayDate1.getMonth() + 1;
      let currentDay1 = todayDate1.getDate();
      let age = currentYear1 - birthYear1;
      if (
        currentMonth1 < birthMonth1 ||
        (currentMonth1 === birthMonth1 && currentDay1 < birthDay1)
      ) {
        age--;
      }
      ageAndZodiac = `${getLangTime(
              age,
              getLang?.("global_years_accusative", "raw") || [
    "",
    "%s год",
    "%s года",
    "%s лет"
]
            )}, ${getZodiacIndex(parts[0], parts[1])}`;
    } else if (parts.length === 2) {
      ageAndZodiac = `${getZodiacIndex(parts[0], parts[1])}`;
    }
    let appherenow = e.querySelector(".ProfileFullCommonInfo__caption");
      if(appherenow) appherenow.textContent += `(${ ageAndZodiac })`;
  }
);
}

export default regDate;