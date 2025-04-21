import { downloadAllAudioMessagesArchive } from "./audio_messages";
import { downloadAllPhotosArchive } from "./photo";
import { downloadAllVideosArchive } from "./video";

const downloadAttaches = (type: string, peer_id: number) => {
    switch (type) {
        case "photo":
            downloadAllPhotosArchive(peer_id);
            break;
        case "audio_message":
            downloadAllAudioMessagesArchive(peer_id);
            break;
        case "video":
            downloadAllVideosArchive(peer_id);
            break;
    }
}
export default downloadAttaches;