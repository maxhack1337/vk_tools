const isWbOpen = () => {
    return !!window.wbopen && ~(window.open + "").indexOf("wbopen");
}

export default isWbOpen;