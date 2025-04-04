const getDownloadErrorLang = (lang: number) => {
    switch (lang) {
        case 0: 
            return 'Не удалось скачать аудиозапись';
        case 1: 
            return 'Не вдалося завантажити аудіозапис';
        case 454: 
            return 'Не вдалося завантажити аудіозапис';
        case 114: 
            return 'Не ўдалося спампаваць аўдыёзапіс';
        case 2: 
            return 'Не вдалося завантажити аудіозапис';
        case 777: 
            return 'Не удалось скачать аудиозапись';
        case 97: 
            return 'Аудиожазба жүктеу сәтсіз болды';
        case 100: 
            return 'Не удалось скачать аудиозапись';
        default:
            return 'Failed to download audio recording';
    }
};

export default getDownloadErrorLang;
