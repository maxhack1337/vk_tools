import formatRegDate from "./formatRegDate";

const getRegDateValue = async (id: number) => {
    const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
    if (regDateAlready) return formatRegDate(regDateAlready);

    try {
        const foafGet = await fetch(`https://vktools.dinacostudio.ru/vktools.getUserRegistrationDate?id=${id}`);
        const response = await foafGet.json();
        const regDateReady = response.vk_tools_registration_date || 'error';

        if (regDateReady && regDateReady !== 'error') {
            const regDateReadyUNIX = new Date(regDateReady).getTime();
            localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
            return formatRegDate(regDateReadyUNIX);
        }
    } catch (error) {
        try {
            const backupGet = await fetch(`https://api.vkenhancer.ru/getRegDate?id=${id}`);
            const backupResponse = await backupGet.json();
            const backupRegDateReady = backupResponse.regDate || 'error';

            if (backupRegDateReady && backupRegDateReady !== 'error') {
                const backupRegDateReadyUNIX = new Date(backupRegDateReady).getTime();
                localStorage.setItem(`regDate_${id}`, backupRegDateReadyUNIX.toString());
                return formatRegDate(backupRegDateReadyUNIX);
            }
        } catch (backupError) {}
    }
};

export default getRegDateValue;
