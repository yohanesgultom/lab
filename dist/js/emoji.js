'use strict'

// http://www.2ality.com/2013/09/javascript-unicode.html
const u = function (codeUnit) {
    return '\\u'+codeUnit.toString(16).toUpperCase()
}

// http://www.2ality.com/2013/09/javascript-unicode.html
const toUTF16 = function (emoji) {
    let codePoint = emoji.codePointAt(0)
    let TEN_BITS = parseInt('1111111111', 2)    
    
    if (codePoint <= 0xFFFF) {
        return u(codePoint)
    }
    codePoint -= 0x10000
    
    // Shift right to get to most significant 10 bits
    let leadSurrogate = 0xD800 + (codePoint >> 10)
    
    // Mask to get least significant 10 bits
    let tailSurrogate = 0xDC00 + (codePoint & TEN_BITS)
    
    return u(leadSurrogate) + u(tailSurrogate)
}

// From: https://stackoverflow.com/a/33686504/1862500
const parseUnicode = function (str){
    let r = /\\u([\d\w]{4})/gi
    str = str.replace(r, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16)) 
    })
    return str
}

/* Event handlers */

const handleEmojiChange = function (e) {
    let surrogatePair = ''
    try {
        let cleaned = e.target.value.replace(/\s/g, '')
        for (let i = 0; i < cleaned.length; i += 2) {
            surrogatePair += toUTF16(cleaned.substr(i, 2))
        }
    } catch (err) {
        surrogatePair = ''
        alert(err)
    } finally {
        document.querySelector('textarea[name=surrogate-pair]').value = surrogatePair
    }
}

const handleUnicodeChange = function (e) {
    // TODO: handle multiple
    let emoji = ''
    try {
        let cleaned = e.target.value.replace(/\s/g, '')
        for (let i = 0; i < cleaned.length; i += 6) {
            emoji += parseUnicode(cleaned.substr(i, 6))
        }
        // emoji = parseUnicode(e.target.value)
    } catch (err) {
        emoji = ''
        alert(err)
    } finally {        
        document.querySelector('textarea[name=emoji]').value = emoji
    }
}

/* Bind events */

document.querySelector('textarea[name=emoji]').addEventListener('keyup', handleEmojiChange)
document.querySelector('textarea[name=surrogate-pair]').addEventListener('keyup', handleUnicodeChange)
