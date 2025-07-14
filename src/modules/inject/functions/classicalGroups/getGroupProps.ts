import findClubInfo from "./findClubInfo";

interface ReactProps {
  fiber?: any;
  container?: any;
  props?: any;
}

const getGroupProps = async (el: any) => {
  try {
    const fiber = _o(el).fiber;
    if (fiber) {
      const response = findClubInfo(fiber);
      return response;
    } else {
      throw new Error("Invalid structure of club");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

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

export default getGroupProps;
