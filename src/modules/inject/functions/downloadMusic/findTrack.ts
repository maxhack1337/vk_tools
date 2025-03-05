const findTrack = (obj: any) => {
    const stack = [obj];
    const seen = new Set();

    while (stack.length > 0) {
        const currentObj = stack.pop();
        if (currentObj === null || typeof currentObj !== 'object') continue;
        if (seen.has(currentObj)) continue;
        seen.add(currentObj);

        if (currentObj.track && currentObj.track.myMusic && currentObj.track.myMusic.identity) {
            return currentObj.track;
        }

        for (const key in currentObj) {
            try {
                stack.push(currentObj[key]);
            }
            catch (error) {
                /**console.info('[VK Tools] Error', error);
                 * Вывод Security-ошибки
                 * Убираем в продакшне
                 */
            }
        }
    }

    return null;
}

export default findTrack;