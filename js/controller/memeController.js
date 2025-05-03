const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderMeme() {
    const meme = getMeme()
    const imgData = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgData.url // Make sure imgData has a 'url' field

    img.onload = () => {
        // Clear the canvas and draw the image
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        // Draw each line of text
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
    const lineHeight = line.size || 40; // Default line height (font size)
    const maxWidth = gElCanvas.width - 40; // Max width considering padding
    let x = line.x || gElCanvas.width / 2; // Default to center if no x is specified
    let y = line.y || lineHeight; // Start at the top of the canvas or specified y value

    // Set font style for text drawing
    gCtx.font = `${line.size || 40}px ${line.font || 'Impact'}`;
    gCtx.textAlign = line.align || 'center'; // Alignment: 'left', 'center', 'right'
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black'; // Stroke for readability
    gCtx.fillStyle = line.color || 'white'; // Fill color for text

    const textLines = line.txt.split('\n'); // Split the text into multiple lines if needed

    // Loop through each line of text
    textLines.forEach(text => {
        const wrappedLines = wrapText(text, maxWidth); // Wrap the text if necessary

        // Draw each wrapped line
        wrappedLines.forEach(wrappedLine => {
            // Draw the text (with stroke for better visibility)
            drawText(wrappedLine, x, y, line);

            // Highlight if the line is selected
            if (line.isSelected) {
                highlightSelectedText(x, y, wrappedLine, lineHeight, line);
            }

            // Move the y position for the next line of text
            y += lineHeight;
        });
    });
}

// Helper function to measure if the text fits within the canvas width
function textFits(text, maxWidth) {
    const textWidth = gCtx.measureText(text).width;
    return textWidth <= maxWidth;
}

// Helper function to wrap text based on the available width
function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = gCtx.measureText(testLine).width;

        // If the line fits, add the word
        if (testWidth <= maxWidth) {
            currentLine = testLine;
        } else {
            // If the line doesn't fit, push the current line and start a new one
            if (currentLine) {
                lines.push(currentLine);
            }
            currentLine = word;
        }
    });

    // Add the last line if there's any remaining text
    if (currentLine) {
        lines.push(currentLine);
    }

    return lines;
}

// Function to actually draw the text
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


