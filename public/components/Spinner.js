function getSpinner() {
    let loadingDOM = document.createElement("div")
    loadingDOM.id = "loadingDiv"
    loadingDOM.classList.add("loading")

    loadingDOM.innerHTML = `<div style="width: 3rem; height: 3rem;" class="spinner-border text-info loading-wheel" role="status">
  <span class="sr-only"></span>
</div>`
    document.body.appendChild(loadingDOM)
}

function getPointer() {
    document.getElementById("loadingDiv").remove()

}

export { getPointer, getSpinner }