const showForwardBox = (t: any) => {
    return showBox("al_im.php", t, {
        params: {
            width: 638,
            bodyStyle: "padding: 0px",
            containerClass: "im-show-message-box"
        }
    }, {});
}

export default showForwardBox;