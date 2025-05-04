const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderMeme() {
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgData.url 

    img.onload = () => {

        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach(line => drawTextLine(line))
    }
}

function onInputTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}



function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}







function onSwitchLine() {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].isSelected = false
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    meme.lines[meme.selectedLineIdx].isSelected = true

    document.getElementById('txt-line').value = meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}


function drawTextLine(line) {
    const lineHeight = line.size || 40
    const maxWidth = gElCanvas.width - 40
    let x = line.x || gElCanvas.width / 2
    let y = line.y || lineHeight


    gCtx.font = `${line.size || 40}px ${line.font || 'Impact'}`;
    gCtx.textAlign = line.align || 'center'
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color || 'white'

    const textLines = line.txt.split('\n')


    textLines.forEach(text => {
        const wrappedLines = wrapText(text, maxWidth); 


        wrappedLines.forEach(wrappedLine => {

            drawText(wrappedLine, x, y, line)

            if (line.isSelected) {
                highlightSelectedText(x, y, wrappedLine, lineHeight, line);
            }

           
            y += lineHeight;
        });
    });
}


function textFits(text, maxWidth) {
    const textWidth = gCtx.measureText(text).width;
    return textWidth <= maxWidth
}


function wrapText(text, maxWidth) {
    const words = text.split(' ')
    const lines = [];
    let currentLine = ''

    words.forEach(word => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = gCtx.measureText(testLine).width;


        if (testWidth <= maxWidth) {
            currentLine = testLine
        } else {

            if (currentLine) {
                lines.push(currentLine)
            }
            currentLine = word;
        }
    });

    if (currentLine) {
        lines.push(currentLine)
    }

    return lines;
}


function drawText(wrappedLine, x, y, line) {

    if (line.align === 'left') {
        x = 10
    } else if (line.align === 'right') {
        x = gElCanvas.width - gCtx.measureText(wrappedLine).width - 10; // Small padding from the right edge
    } else {
        x = gElCanvas.width / 2
    }

    gCtx.fillText(wrappedLine, x, y)
    gCtx.strokeText(wrappedLine, x, y)
}


