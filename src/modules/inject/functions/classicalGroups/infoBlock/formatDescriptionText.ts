import parseAll from "../textParser/parseAll";

function formatDescriptionText(text: string): string {
  if (!text) return "";

  let escapedText = parseAll(text);

  escapedText = escapedText.replace(/\n/g, "<br>");

  return escapedText;
}

export default formatDescriptionText;
