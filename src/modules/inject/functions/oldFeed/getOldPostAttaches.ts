interface ReactProps {
    fiber?: any
    props?: any
}

interface ExtendedHTMLElement extends HTMLElement {
    [key: string]: any
}

const getOldPostAttaches = (elem:ExtendedHTMLElement) => {
  const t:ReactProps = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedProps.children[0].props;
}

export default getOldPostAttaches;