'use strict'

const STORAGE_KEY = 'picDB'

var gPics = loadFromStorage(STORAGE_KEY) || []

function getPics() {
    return gPics
}

function removePic(picId) {
    const picIdx = gPics.findIndex(pic => picId === pic.id)
    gPics.splice(picIdx, 1)
    _savePicsToStorage()
}

function addPic(data) {
    const pic = _createPic(data)
    gPics.unshift(pic)
    _savePicsToStorage()
    return pic
}

function getPicById(picId) {
    const pic = gPics.find(pic => picId === pic.id)
    return pic
}

function _createPic(data) {
    return {
        id: makeId(),
        createdAt: Date.now(),
        data
    }
}

function _savePicsToStorage() {
    saveToStorage(STORAGE_KEY, gPics)
}
