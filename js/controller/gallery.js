

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    console.log('elGallery:', elGallery)
    
    const imgsHTML = gImgs.map(img => {
        return `<img src="${img.url}" id="${img.id}" onclick="onImgSelect(${img.id})">`
    }).join('')
    
    elGallery.innerHTML = imgsHTML
}

function onImgSelect(imgId) {
    setCurrMeme(imgId)
    document.querySelector('.gallery').classList.add('hidden')
    document.querySelector('.editor').classList.remove('hidden')
    renderMeme()
}