export default function(e){
    const selectedValue = e.target.innerText
    const rowElement = e.target.parentElement.parentElement.parentElement.parentElement
    const correctValue = rowElement.children[2].innerText

    console.log({selectedValue, correctValue})

    if(selectedValue === correctValue){
        rowElement.classList.remove("bg-danger", "bg-warning")
        rowElement.classList.add("bg-success")
    }
    else if (selectedValue === "N/A"){
        rowElement.classList.remove("bg-danger", "bg-success")
        rowElement.classList.add("bg-warning")
    }
    else {
        rowElement.classList.remove("bg-success", "bg-success")
        rowElement.classList.add("bg-danger")
    }
}