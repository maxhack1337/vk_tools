interface AnswerProps {
    fiber?: any; 
    props?: any;
}

const getAnswerProps = (elem: any): [number | undefined, number | undefined] => {
    const t: AnswerProps = {};
    let n = 0;

    for (const o of Object.keys(elem)) {
        if (o.startsWith("__reactFiber")) {
            t.fiber = elem[o];
            ++n;
        } else if (o.startsWith("__reactProps")) {
            t.props = elem[o];
            ++n;
        }
        if (n === 2) break;
    }
    const votes = t.fiber?.return?.memoizedProps?.answer?.votes;
    const rate = t.fiber?.return?.memoizedProps?.answer?.rate;

    return [votes, rate];
}

export default getAnswerProps;
