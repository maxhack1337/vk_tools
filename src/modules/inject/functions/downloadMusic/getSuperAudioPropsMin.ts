interface ReactProps {
    fiber?: any
    props?: any
}

interface ExtendedHTMLElement extends HTMLElement {
    [key: string]: any
}

const getSuperAudioPropsMin = (elem: ExtendedHTMLElement) => {
    try {
        const t: ReactProps | undefined = {}
        let n = 0
        for (const o of Object.keys(elem)) {
            if (o.startsWith('__reactFiber')) {
                t.fiber = elem[o]
                ++n
            } else if (o.startsWith('__reactProps')) {
                t.props = elem[o]
                ++n
            }
            if (n === 2) break
        }

        return t
    } catch (error) {
        return [0, 0]
    }
}
export default getSuperAudioPropsMin
