interface ReactProps {
    fiber?: any;
    props?: any;
}

interface ExtendedHTMLElement extends HTMLElement {
    [key: string]: any;
}

const getPostData = (elem:ExtendedHTMLElement) => {
  const t:ReactProps = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactContainer")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  return t.fiber.memoizedState.element.props;
}

export default getPostData;