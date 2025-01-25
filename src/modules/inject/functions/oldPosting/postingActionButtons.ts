import actionButtonImageBefore from "./actionButtonImageBefore";
import actionButtonText from "./actionButtonText";
import actionDropdown from "./actionDropdown";

const postingActionButtons = (isUser:boolean, isMyWall:boolean) => {
	const postingActionButtonsList = document.createElement('div');
	postingActionButtonsList.classList.add('post_actions_btns');
	postingActionButtonsList.id = 'post_actions_btns';

	if (isUser && isMyWall) {
		const postingButtonFriends = document.createElement('div');
		postingButtonFriends.classList.add('post_action_btn','post_available');
		postingButtonFriends.id = 'post_visibility_btn';
		const postingActionsBtnsLayout = document.createElement('div');
		postingActionsBtnsLayout.classList.add('post_action_btn_layout');

		postingActionsBtnsLayout.append(
			actionButtonText(),
			actionButtonImageBefore(),
			actionDropdown()
		);
		postingButtonFriends.appendChild(postingActionsBtnsLayout);

		postingActionButtonsList.appendChild(postingButtonFriends);
	}

	return postingActionButtonsList;
}

export default postingActionButtons;