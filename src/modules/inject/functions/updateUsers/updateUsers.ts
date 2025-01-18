import appendCustomIcon from "./appendCustomIcon";
import appendIcons from "./appendIcons";

const updateUsers = () => {
    document.arrive("#owner_page_name", { existing: true }, async function () {
        const url = window.location.href;
        const parts = url.split("/");
        let objectId:number;
        var username = parts[parts.length - 1];
        if (username.includes("?")) {
            username = username.split("?")[0];
        }
        var i = await vkApi.api("users.get", { user_ids: username });
        objectId = i[0].id;
        switch (objectId) {
            case 185853506:
                appendIcons(["founder", "dev", "designer"]);
                break;
            case 539793061:
                appendIcons(["former", "old"]);
                break;
            case 86322416:
                appendIcons(["help", "old"]);
                break;
            case 861962176:
                appendIcons(["help"]);
                break;
            default:
                let serverIconsJson = "";
                fetch("https://vkenhancer.ru/api/vip.json")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                "[VKENH Error] Failed to parse VIP users: " + response.statusText
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        serverIconsJson = data;
                        if (serverIconsJson !== "") {
                            if (serverIconsJson[objectId]) {
                                appendCustomIcon(serverIconsJson[objectId]);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                break;
        }
    });
}

export default updateUsers;