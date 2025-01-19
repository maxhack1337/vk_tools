interface LangConfig {
    numRules: {
        float?: number; 
        int?: Array<[string | number, (number | string)[] | undefined, number]>;
    };
    numDel: string;
    numDec: string;
}

const getLangTime = (e: number, t: string | string[], n?: undefined, langConfig: LangConfig = window.langConfig) => {
    let i: string;

    if (Array.isArray(t)) {
        i = t[1]; 

        if (e !== Math.floor(e)) {
            i = t[langConfig.numRules.float as number]; 
        } else {
            (langConfig.numRules.int || []).some((rule) => {
                if (rule[0] === "*") { 
                    i = t[rule[2]]; 
                    return true; 
                }
                const r = rule[0] ? e % Number(rule[0]) : e;
                if (Array.isArray(rule[1]) && rule[1].includes(r)) {
                    i = t[rule[2]];
                    return true; 
                }
                return false; 
            });
        }
    } else {
        i = t; 
    }

    let a = String(e);
    if (n) {
        const parts = a.split(".");
        const integerPart = parts[0];
        const formattedParts: string[] = [];
        for (let j = integerPart.length - 3; j > -3; j -= 3) {
            formattedParts.unshift(integerPart.slice(j > 0 ? j : 0, j + 3));
        }

        parts[0] = formattedParts.join(langConfig.numDel); 
        a = parts.join(langConfig.numDec); 
    }

    return (i || "%s").replace("%s", a); 
}

export default getLangTime;
