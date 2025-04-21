import appendCustomIcon from "./appendCustomIcon";
import appendIcons from "./appendIcons";
const updateUsers = () => {
	document.arrive("#owner_page_name", {
		existing: true
	}, async function() {
		const url = window.location.href;
		const parts = url.split("/");
		let objectId: number;
		let username = parts[parts.length - 1];
		if (username.includes("?")) {
			username = username.split("?")[0];
		}
		let i = await vkApi.api("users.get", {
			user_ids: username
		});
		objectId = i[0].id;
		fetch("https://vkenhancer.ru/api/vip_reforged.json").then((response) => {
			if (!response.ok) {
				throw new Error("[VKENH Error] Failed to parse VIP users: " + response.statusText);
			}
			return response.json();
		}).then((data) => {
			const userData = data[objectId];
			if (userData) {
				appendCustomIcon(userData.icon, userData.text, userData["secondary-text"], userData.buttonText, userData.href, objectId);
			}
		}).catch((error) => {
			console.error(error);
		});
		switch (objectId) {
			case 185853506:
				appendIcons(["founder", "dev", "designer"]);
				break;
			case 539793061:
				appendIcons(["former"]);
				break;
			case 86322416:
				appendIcons(["help"]);
				break;
			default:
				break;
		}
	});
}
export default updateUsers;