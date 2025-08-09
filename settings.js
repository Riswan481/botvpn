const fs = require('fs')
const pack = require('./package.json')
global.pairing = false // false = pairing code | true = scan QR
global.PaiCode = "RISWANDI" // Wajib 8 digit pairing code (custom)
global.broswer = "Firefox" // Server Browser 
global.sessionName = "session" // Nama file session

global.botname = "LayraMD" // Bot name
global.ownername = "Riswan Store" // Owner name
global.owner = "6285888801241" // Owner number
global.botNumber = "628" //  Bot number
global.version = pack.version // Version

global.packname = "LyraaMD" // Sticker packname 
global.author = "Author" // Sticker author
global.wm = "Simple script" // Watermark thumbnail
global.chjid = "120363345840627946" // Channel Id Gaush pakai @
global.gcjid = "120363385712257684" // Group Id Gaush pakai @
global.sch = "https://whatsapp.com/channel/0029VamUr1QJuyAFhT7ife3K"
global.sgc = "https://chat.whatsapp.com/BDrJtuxjIwh2Rgn1gBtvGx"
global.thumb = "https://files.catbox.moe/k0r7rr.jpg" // Thumbnail bot 
global.payment = {
  dana: "089629939141", // Dana
  gopay: "085888801241", // Gopay
  ovo: "-", // Ovo
  qris: "https://files.catbox.moe/207t9m.jpg"
}

global.domain = "" // Domain harus diakhiri tanda [ / ]
global.apikey = "" // Plta
global.capikey = "" // Pltc
global.eggs = "15"
global.locc = "1"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`Update ${__filename}`)
  delete require.cache[file]
  require(file)
})