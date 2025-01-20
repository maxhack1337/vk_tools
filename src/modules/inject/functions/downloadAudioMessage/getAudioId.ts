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
  var o = t.fiber.return.memoizedProps.voice.ownerId;
  var a = t.fiber.return.memoizedProps.voice.id;
  var i = [o, a].join("_");
  return `audio_message${i}.mp3`;
}

export default getAudioId;