import appendButton from './appendButton'
import appendButtonPlist from './appendButtonPlist'
import getSuperAudioPropsMin from './getSuperAudioPropsMin'

const downloadMusic = () => {
    document.arrive(
        '[class^="vkitAudioRow__rootHasHover"]',
        { existing: true },
        async function (e) {
            let x: any = getSuperAudioPropsMin(e.querySelector('[class^="vkitAudioRow__actions"] > div')!);
            let key = x.props.children.props.track.myMusic.identity;
            let access = key.accessKey ? '_' + key.accessKey : '';
            let subKey = key.ownerId + '_' + key.id + access;
            let pListID;
            let getPlistID = ajax.post('al_audio.php?act=reload_audios', {
                audio_ids: subKey,
                al: 1,
            });

            getPlistID.onload = function () {
                pListID = JSON.parse(getPlistID.response)
                    .payload[1][0][0][19][2]
            }
            let linkAudio = await vkApi.api('audio.getById', {
                audios: subKey + '_' + pListID,
            })
            let objectOf = [linkAudio[0].artist, linkAudio[0].title]
            appendButtonPlist(
                e.querySelector('[class^="vkitAudioRow__actions"] > div')!,
                linkAudio,
                subKey + '_' + pListID,
                objectOf
            )
        }
    )
    document.arrive(
        '.audio_row:not(.audio_claimed) .audio_row__actions',
        { existing: true },
        function (e) {
            appendButton(e as HTMLElement)
        }
    )
}

export default downloadMusic
