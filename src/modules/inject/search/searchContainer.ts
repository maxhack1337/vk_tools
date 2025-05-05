interface ReactProps {
  fiber?: any;
  container?: any;
}

const searchContainer = (e: HTMLElement | null): ReactProps => {
  const t: ReactProps = {};
  if (!e) return t;

  for (const n of Object.keys(e)) {
    if (n.startsWith("__reactContainer")) t.container = e[n as keyof HTMLElement];
  }

  return t;
};

export default searchContainer;
