const getDocSize = (docSize: number) => {
	if (!docSize) return "";
    switch (!0) {
        case docSize >= (2 ** 30):
            return getLang?.("calls_decoded_page_doc_size_gb").toString().replace(/{size}/g, String(Number((docSize / (2 ** 30)).toFixed(1))) + " ").toUpperCase();
        case docSize >= (2 ** 20):
            return getLang?.("calls_decoded_page_doc_size_mb").toString().replace(/{size}/g, String(Number((docSize / (2 ** 20)).toFixed(1))) + " ").toUpperCase();
        case docSize >= 1024:
            return getLang?.("calls_decoded_page_doc_size_kb").toString().replace(/{size}/g, String(Math.round(docSize / 1024)) + " ").toUpperCase();
        default:
            return getLang?.("calls_decoded_page_doc_size_kb").toString().replace(/{size}/g, String(Number((docSize / 1024).toFixed(1))) + " ").toUpperCase();
    }
}

export default getDocSize;