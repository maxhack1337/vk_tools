import { downloadAllPhotosArchive } from "./photo";

const downloadAttaches = (type: string, peer_id: number) => {
    switch (type) {
        case "photo":
            downloadAllPhotosArchive(peer_id);
    }
}
export default downloadAttaches;