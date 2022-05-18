export default function (){
    const isValid = Array.from(document.getElementsByClassName("answer")).every(el =>
        el.classList.contains("bg-success") || el.classList.contains("bg-warning") || el.classList.contains("bg-danger")
    )

    isValid? alert("Form sent!") : alert("All the questions need to be answered before sending the form.")
}