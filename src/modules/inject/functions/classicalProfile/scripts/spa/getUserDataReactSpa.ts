import findStore from "./findStore";

interface Owner {
  nickname: string;
}

interface Store {
  getState: () => {
    owner: Owner;
  };
}

interface ReactProps {
  fiber?: any;
  memoizedState?: {
    element?: {
      props?: {
        store?: Store;
      };
    };
  };
  container?: any;
}

const getUserDataReactSpa = async () => {
  try {
    const rootProfileElement = document.getElementById("react_rootprofile");
    const rootProfile = _o(rootProfileElement);
    if (rootProfile) {
      const response = findStore(rootProfile);
      return response.getState();
    } else {
      throw new Error("Invalid structure of rootProfile");
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

    if (n.startsWith("__reactProps")) {
      const propsValue = e[n as keyof HTMLElement];
      if (typeof propsValue === "object" && propsValue !== null) {
        const props = propsValue as { store?: Store };
        t.memoizedState = t.memoizedState || {};
        t.memoizedState.element = t.memoizedState.element || {};
        t.memoizedState.element.props = { store: props.store };
      }
    }

    if (n.startsWith("__reactContainer")) t.container = e[n as keyof HTMLElement];
  }

  return t;
}

export default getUserDataReactSpa;
