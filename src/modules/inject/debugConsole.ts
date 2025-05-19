import { DEBUG_MODE } from "./constants";

const debugConsole = (log: string) => {
  if (DEBUG_MODE) console.log(log);
  else return;
};

export default debugConsole;
