
var currId = 1
var gImgs = [
    createImg(1,'tramp', 'actually'),
    createImg(2,'puppies', 'cute'),
    createImg(3,'baby','puppies', 'sleep'),
    createImg(4,'cat', 'sleep'),
    createImg(5,'baby', 'angry')
  ]

console.log(gImgs)


function getPics(){
    const pics = loacalStorage.getItem(STORAGE_KEY)
    return pics ? JSON.parse(pics) : []
}
  
 
var gCurrMeme = {}

function setCurrMeme(imgId) {
    const canvasCenterX = gElCanvas.width / 2
    const topY = 50 // Default top text position

    gCurrMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'hello',
                size: 40,
                color: 'white',
                font: 'Impact',
                align: 'center',
                x: canvasCenterX,
                y: topY,
                isSelected: true
            }
        ]
    }
    return gCurrMeme
}


function getMeme() {
    return gCurrMeme
}    
  
function createImg(imgName, key1, key2, key3){
    const img = {
        id: makeId(),
        url: `img/${imgName}.jpg`,
        keywords:[key1, key2, key3]
    }
    return img
}

function setLineTxt(txt) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (line) line.txt = txt
}


function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}



function makeId() {
  let id = currId
  currId = currId + 1
  return id
}


