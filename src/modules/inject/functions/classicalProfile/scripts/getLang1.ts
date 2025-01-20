const getLang1 = (key: string, type: string | number | undefined) => {
    let arr = getLang?.(key, type);

    if (type === "raw") {
        try {
            if (Array.isArray(arr)) {
                arr = arr.map((item: string) => item.replace("{count} ", "")); 
            } else if (typeof arr === "string") {
                arr = arr.replace("{count} ", "");
            }
        } catch (error) {
            nav.reload();
            console.info('[VK Tools] getLang is not defined. Trying reload page');
        }
    }

    return arr; 
}

export default getLang1;
