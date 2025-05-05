function onInit(){
    renderGallery()
}



function onClickMenu() {
    const body = document.body;
    const burgerIcon = document.getElementById('burger-icon')
    const closeIcon = document.getElementById('close-icon')
    const nav = document.querySelector('.main-nav')

    body.classList.toggle('menu-open')

    const isOpen = body.classList.contains('menu-open')
    burgerIcon.style.display = isOpen ? 'none' : 'inline'
    closeIcon.style.display = isOpen ? 'inline' : 'none'
}



function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function renderPics() {
    const pics = getPics()
    const elPics = document.querySelector('.pic-list')
    elPics.innerHTML = pics.map(pic => {
        return `
        <article>
            <button onclick="onRemovePic('${pic.id}')">X</button>
            <img src="${pic.data}" onclick="onSelectPic('${pic.id}')">
        </article>
        `
    }).join('')
}

function onSave() {
    const data = gElCanvas.toDataURL()
    addPic(data)
    renderPics()
}

function onRemovePic(picId) {
    removePic(picId)
    renderPics()
}