'use strict'

function generatePassword(length) {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let retVal = ""
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    return retVal
}

let txtPassword = document.getElementsByName('txt-password')[0]
txtPassword.addEventListener('click', function () {
    this.select()
    document.execCommand('copy')
    alert('copied to clipboard')
})

let generatePassBtn = document.getElementById('btn-generate-password')
generatePassBtn.addEventListener('click', function () {
    let len = document.getElementsByName('txt-length')[0].value
    txtPassword.value = generatePassword(len)
})
generatePassBtn.click()
