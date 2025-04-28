
var currId = 1
var gImgs = [
    createImg(1,'tramp', 'actually'),
    createImg(2,'puppies', 'cute'),
    createImg(3,'baby','puppies', 'sleep'),
    createImg(4,'cat', 'sleep'),
    createImg(5,'baby', 'angry')
  ]

console.log(gImgs)
  
 
var gCurrMeme = {}

function setCurrMeme(imgId) {
    gCurrMeme = {
         selectedImgId: imgId,
         selectedLineIdx: 0,
         lines: [
             { txt: 'hello' , size: 30, color: 'white' }
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
    gCurrMeme.lines[gCurrMeme.selectedLineIdx].txt = txt
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}



function makeId() {
  let id = currId
  currId = currId + 1
  return id
}
