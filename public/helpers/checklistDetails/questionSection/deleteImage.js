export default async function (e) {
    let deleteButtonId = e.target.id
    let fragaId = deleteButtonId.split("$")[1]
    document.getElementById(`buttonForImage_$${fragaId}`).remove();
    document.getElementById(`deleteImage_$${fragaId}`).remove();
    document.getElementById(`inputImage_$${fragaId}`).value = null;
    }