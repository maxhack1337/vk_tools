interface ReactProps {
  fiber?: any;
  container?: any;
}

const searchFiber = (e: HTMLElement | null): ReactProps => {
  const t: ReactProps = {};
  if (!e) return t;

  for (const n of Object.keys(e)) {
    if (n.startsWith("__reactFiber")) t.fiber = e[n as keyof HTMLElement];
  }

  return t;
};

export default searchFiber;
