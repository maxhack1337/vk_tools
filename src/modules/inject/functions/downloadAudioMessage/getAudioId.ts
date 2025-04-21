interface ReactProps {
    fiber?: any;
    props?: any;
}

interface ExtendedHTMLElement extends HTMLElement {
    [key: string]: any;
}

const getAudioId = (elem:ExtendedHTMLElement) => {
  const t:ReactProps = {};
  let n = 0;
  for (const o of Object.keys(elem))
    if (
      (o.startsWith("__reactFiber")
        ? ((t.fiber = elem[o]), ++n)
        : o.startsWith("__reactProps") && ((t.props = elem[o]), ++n),
      2 === n)
    )
      break;
  let ownerId = t.fiber.return.memoizedProps.voice.ownerId;
  let audioId = t.fiber.return.memoizedProps.voice.id;
  let audioRaw = [ownerId, audioId].join("_");
  return `audio_message${audioRaw}.mp3`;
}

export default getAudioId;