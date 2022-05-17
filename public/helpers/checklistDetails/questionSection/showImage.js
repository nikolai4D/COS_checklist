export default async function (e) {
    let buttonForImageId = e.target.id
    let fragaId = buttonForImageId.split("$")[1]
    let inputImage = document.getElementById(`inputImage_$${fragaId}`)

    inputImage.src = URL.createObjectURL(inputImage.files[0])
    window.open(inputImage.src);
    }