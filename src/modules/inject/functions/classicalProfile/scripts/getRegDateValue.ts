import formatRegDate from "./formatRegDate";

const getRegDateValue: any = async (id: number, captcha: any) => {
	const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
	if (regDateAlready) return formatRegDate(regDateAlready);

	try {
		const foafGet = await fetch(`https://cutely-untouched-passerine.cloudpub.ru/vktools.getUserRegDate?id=${id}`);
		const response = await foafGet.json();
		let regDateReady = response.vk_tools_registration_date;

		if (captcha?.captcha_sid) {
			const regDate = await fetch(
				`https://cutely-untouched-passerine.cloudpub.ru/vktools.getUserRegDate?id=${id}&captcha_sid=${captcha.captcha_sid}&captcha_key=${captcha.captcha_key}`
			);
			const response2 = await regDate.json();
			regDateReady = response2.vk_tools_registration_date;
			if (regDateReady && regDateReady !== "error") {
				const regDateReadyUNIX = new Date(regDateReady).getTime();
				localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
				return formatRegDate(regDateReadyUNIX);
			}
		}

		if (regDateReady) {
			console.log(regDateReady);
		} else {
			const { captcha_sid, captcha_img } = response;
			return { captcha_sid, captcha_img };
		}

		if (regDateReady && regDateReady !== "error") {
			const regDateReadyUNIX = new Date(regDateReady).getTime();
			localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
			return formatRegDate(regDateReadyUNIX);
		}
	} catch (error) {
		console.log(error);
		// try {
		// 	const backupGet = await fetch(`https://api.vkenhancer.ru/getRegDate?id=${id}`);
		// 	const backupResponse = await backupGet.json();
		// 	const backupRegDateReady = backupResponse.regDate || "error";
		// 	if (backupRegDateReady && backupRegDateReady !== "error") {
		// 		const backupRegDateReadyUNIX = new Date(backupRegDateReady).getTime();
		// 		localStorage.setItem(`regDate_${id}`, backupRegDateReadyUNIX.toString());
		// 		return formatRegDate(backupRegDateReadyUNIX);
		// 	}
		// } catch (backupError) {}
	}
};

export default getRegDateValue;
