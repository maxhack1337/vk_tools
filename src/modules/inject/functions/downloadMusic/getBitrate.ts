import Hls from "hls.js";
import getBitrateSizeDivLang from "./getBitrateSizeDivLang";
import getBitrateSizeLang from "./getBitrateSizeLang";

const getBitrate = async (url: any, mode: string) => {
  let resolvePromise: any, rejectPromise: any;
  const promise = new Promise((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  try {
    const hlsInstance = new Hls();
    const audioElement = new Audio();

    let totalDuration = 0;
    let retryCount = 0;
    let bufferedData: any = null;

    const handleError = (error: any) => {
      rejectPromise(error);
      hlsInstance.stopLoad();
      hlsInstance.destroy();
    };

    hlsInstance.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      const firstLevelDetails = data.levels[0]?.details;
      if (firstLevelDetails) {
        totalDuration = firstLevelDetails.totalduration;
      }
    });

    hlsInstance.on(Hls.Events.BUFFER_APPENDING, (event, data) => {
      bufferedData = data.data;
    });

    hlsInstance.on(Hls.Events.FRAG_BUFFERED, (event, data) => {
      if (bufferedData) {
        hlsInstance.detachMedia();

        const calculateBitrate = (dataSize: any, duration: any) => {
          const bitrate = Math.min(32 * Math.round(dataSize / 4096 / duration), 320);
          const resultString = mode === "normal" ? getBitrateSizeLang(vk.lang, bitrate, dataSize) : getBitrateSizeDivLang(vk.lang, bitrate, dataSize);
          resolvePromise(resultString);
        };

        const dataSize = (bufferedData.length / data.frag.duration) * totalDuration;
        calculateBitrate(dataSize, totalDuration);
      }
    });

    hlsInstance.on(Hls.Events.ERROR, (event, data) => {
      if (!["bufferFullError", "fragLoadError"].includes(data.details)) {
        if (data.type === Hls.ErrorTypes.MEDIA_ERROR && retryCount < 2) {
          retryCount++;
          if (retryCount > 1) {
            hlsInstance.swapAudioCodec();
          }
          hlsInstance.recoverMediaError();
          return;
        }
      }
      handleError(event);
    });

    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(audioElement);

    return await promise;
  } catch (error) {
    console.error("[VK Tools Error] Error parsing track:", error);
    throw error;
  }
};

export default getBitrate;
