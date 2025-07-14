import { escapeHtml } from "../../../escapeHtml";
import parseEmail from "./parseEmail";
import parseLinks from "./parseLinks";
import parseLinksSquared from "./parseLinksSquared";
import parseMentions from "./parseMentions";

const parseAll = (input: string) => {
  let escapedText = escapeHtml(input);
  escapedText = parseLinksSquared(escapedText);
  escapedText = parseLinks(escapedText);
  escapedText = parseMentions(escapedText);
  return parseEmail(escapedText);
};

export default parseAll;
