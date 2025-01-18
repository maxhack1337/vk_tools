const dataURItoSVG = (dataURI: string) => {
  const svgString = decodeURIComponent(dataURI.split(",")[1]);
  const div = document.createElement("div");
  div.innerHTML = svgString;
  const svgElement = div.querySelector("svg");
  return svgElement;
}

export default dataURItoSVG;