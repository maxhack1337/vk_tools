import encodeWAV from "./encodeWAV";

const convertAudioToMono = async (file: any) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioCtx = new window.AudioContext();
    let audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    if (audioBuffer.numberOfChannels === 1) {
      return file;
    }

    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    const monoBuffer = audioCtx.createBuffer(1, length, sampleRate);
    const channelDataLeft = audioBuffer.getChannelData(0);
    const channelDataRight = audioBuffer.getChannelData(1);
    const monoData = monoBuffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      monoData[i] = (channelDataLeft[i] + channelDataRight[i]) / 2;
    }

    const wavBlob = encodeWAV(monoBuffer);
    return wavBlob;
  } catch (error) {
    console.error("[VK Tools Error] Error converting audio to mono", error);
  }
};

export default convertAudioToMono;
