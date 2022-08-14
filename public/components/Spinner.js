function getSpinner() {
    document.body.style.cursor = "wait";
}

function getPointer() {
    document.body.style.cursor = "default";

}

export { getPointer, getSpinner }