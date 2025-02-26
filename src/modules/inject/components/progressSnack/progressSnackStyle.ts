const progressSnackStyle = () => {
	return `
  .vkToolsImageSnack {
	border-radius: 8px;
	width: 42px;
	height: 42px;
  }
  .vkToolsSnackbar__before {
	color:var(--vkui--color_icon_accent);
	padding-right:12px;
	display: flex;
  }
  .vkToolsSnackbar{
	margin:12px;
	user-select:none;
	z-index:var(--vkui--z_index_popout);
	position:fixed;
	inset-block-end:0;
	inset-inline-start:auto;
	inline-size:100%;
	padding-inline:var(--vkui_internal--safe_area_inset_left) var(--vkui_internal--safe_area_inset_right);
	padding-block-end:var(--vkui_internal--safe_area_inset_bottom)
}
.vkToolsSnackbar__in,.vkToolsSnackbar__snackbar{
	transition:transform 320ms var(--vkui--animation_easing_platform)
}
.vkToolsSnackbar__body {
	display:flex;
	align-items:center;
}
.vkToolsSnackbar__in{
	border-radius:8px;
	background-color:var(--vkui--color_background_modal);
	box-shadow:var(--vkui--elevation3);
	padding:16px;
	animation:vkenh-snackbar-intro-vertical 340ms var(--vkui--animation_easing_platform);
}
.vkToolsRemovebar {
	animation:vkenh-snackbar-intro-vertical-remove 340ms var(--vkui--animation_easing_platform)!important;
}
.vkToolsSnackbar--ios .vkToolsSnackbar__in,.vkToolsSnackbar--ios .vkToolsSnackbar__snackbar{
	transition:transform 400ms var(--vkui--animation_easing_platform)
}
.vkToolsSnackbar--desktop{
	max-inline-size:351px;
	inset-inline-start:0;
	inset-block-end:0
}
.vkToolsSnackbar--desktop .vkToolsSnackbar__in{
	padding:16px;
	animation-name:vkenh-snackbar-intro-horizontal
}
.vkToolsSnackbar--desktop.vkuiSnackbar--closing--wCurt .vkToolsSnackbar__in{
	transform:translate3d(-140%, 0, 0)
}
.vkuiSnackbar--touched--a8Qa6 .vkToolsSnackbar__snackbar{
	transition:none
}
@keyframes vkenh-snackbar-intro-vertical{
	from{
		transform:translate3d(0, 140%, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}
@keyframes vkenh-snackbar-intro-vertical-remove {
    from {
        transform: translate3d(0, 0, 0);
    }
    to {
        transform: translate3d(-140%, 0, 0); 
        opacity: 0!important; 
    }
}
@keyframes vkenh-snackbar-intro-horizontal{
	from{
		transform:translate3d(-140%, 0, 0)
	}
	to{
		transform:translate3d(0, 0, 0)
	}
}`
}

export default progressSnackStyle;