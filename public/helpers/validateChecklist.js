export default function (){
    const status = document.getElementById("checklist-status")

    const isFullyFilled = Array.from(document.getElementsByClassName("answer")).every(el =>
        el.classList.contains("bg-success") || el.classList.contains("bg-warning") || el.classList.contains("bg-danger")
    )

    if(!isFullyFilled){
        alert("All the questions need to be answered before sending the form.")
        status.classList.remove("alert-danger")
        status.classList.remove("alert-success")
        status.classList.add("alert-warning")
        status.innerText = "In progress"
        return
    }

    alert("Form sent!")

    const isValid = Array.from(document.getElementsByClassName("answer")).every(el =>
        el.classList.contains("bg-success") || el.classList.contains("bg-warning")
    )

    if(isValid) {
        status.classList.remove("alert-danger")
        status.classList.remove("alert-warning")
        status.classList.add("alert-success")
        status.innerText = "Godkänd"
    }
    else {
        status.classList.remove("alert-success")
        status.classList.remove("alert-warning")
        status.classList.add("alert-danger")
        status.innerText = "No godkänd"
    }
}