import parsePropsVideo from "./parsePropsVideo";

const parseVidPlist = (video: HTMLElement) => {
  let videoProps = parsePropsVideo(video);
  return videoProps;
};
export default parseVidPlist;
