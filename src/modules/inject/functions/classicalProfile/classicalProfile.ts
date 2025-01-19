import getId from '../middleName/getId';
import appearStarts from './scripts/appearStarts';
import appendActivityText from './scripts/appendActivityText';
import getUserData from './scripts/getUserData';
import './styles/classical-profile-view.css';
import classicButtons from './styles/classicButtons';

const classicalProfile = () => {
    document.arrive(
        "#profile_redesigned",
        { existing: true },
        async function (e) {
            classicButtons();
            let objectId1 = await getId();
            let userData = await getUserData(objectId1);
            if (!userData.hidden) {
              var photoUrl = userData.photo_200;
            }
            let activityText = userData.activity;
            appendActivityText(activityText);
            await appearStarts(userData);
        });
}

export default classicalProfile;