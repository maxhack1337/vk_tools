interface ReactProps {
    fiber?: any;
    props?: any;
}

interface ExtendedHTMLElement extends HTMLElement {
    [key: string]: any;
}

const getSubText = (elem:ExtendedHTMLElement) => {
  try {
    const t:ReactProps = {};
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

    return [
      t.fiber.memoizedProps.children.props.membersCountText,
    ];
  } catch (error) {
    return [0, 0];
  }
}

export default getSubText;