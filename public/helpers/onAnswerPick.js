export default function(e){
    const selectedValue = e.target.innerText
    const rowElement = e.target.parentElement.parentElement.parentElement.parentElement
    const sectionElement = rowElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    const correctValue = rowElement.children[2].innerText

    //Set the row color
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

    //Set the section color
    const sectionAnswers = Array.from(sectionElement.getElementsByClassName("answer"))

    const isSectionFilled = sectionAnswers.every(el =>
        el.classList.contains("bg-success") || el.classList.contains("bg-warning") || el.classList.contains("bg-danger")
    )

    if (!isSectionFilled) return

    const haveInvalidAnswers = Array.from(sectionElement.getElementsByClassName("answer")).some(el => el.classList.contains("bg-danger"))

    const sectionTitle = sectionElement.getElementsByTagName("h2")[0].firstElementChild

    if(haveInvalidAnswers) {
        sectionTitle.classList.remove("bg-success")
        sectionTitle.classList.add("bg-danger")
    }
    else {
        sectionTitle.classList.remove("bg-danger")
        sectionTitle.classList.add("bg-success")
    }
}