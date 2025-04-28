const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderMeme() {
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    const img = new Image()
    console.log(imgData)

    const imgName = document.getElementById(`${imgData.id}`)
    
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderImg(imgName)
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}
