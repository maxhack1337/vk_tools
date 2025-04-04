import findAudioMessenger from "./findAudioMessenger"

interface ReactProps {
    fiber?: any
    props?: any
    container?: any
}

interface ExtendedHTMLElement extends HTMLElement {
    [key: string]: any
}

const getPostSecondaryAudioUrl = (elem: ExtendedHTMLElement) => {
    try {
        let dButton = _o(elem).fiber.return.return.return.return.return.return.memoizedProps.originalAttachment;
        if (dButton) {
            const response = findAudioMessenger(dButton);
            return response;
        } else {
            throw new Error("Invalid structure of audioRow");
        }
    } catch (error) {
        return [];
    }
}

function _o(e: HTMLElement | null): ReactProps { 
    const t: ReactProps = {}; 
    if (!e) return t;

    for (const n of Object.keys(e)) {
        if (n.startsWith("__reactFiber")) t.fiber = e[n as keyof HTMLElement];
        
        if (n.startsWith("__reactProps")) t.props = e[n as keyof HTMLElement];

        if (n.startsWith("__reactContainer")) t.container = e[n as keyof HTMLElement];
    }
    
    return t;
}

export default getPostSecondaryAudioUrl;