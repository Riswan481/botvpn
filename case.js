require('./settings')
const {
  generateWAMessageFromContent,
  WAMessageStubType,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  InteractiveMessage,
  proto,
  delay
} = require('baileys')
const axios = require('axios')
const fs = require('fs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const moment = require('moment-timezone')
const path = require('path')
const util = require('util')
const { v4: uuidv4 } = require("uuid"); // Pastikan uuidv4 diimpor
// Fungsi untuk menghasilkan UUID
function generateUUID() {
  return uuidv4(); // Menggunakan uuidv4 dari pustaka 'uuid' untuk konsistensi
}
const {
  ytdlv2
} = require('very-nay')
const ytdl = require("nouku-search")
const {
  fromBuffer
} = require('file-type')

const CLOUDFLARE_API_TOKEN = 'c5u39dKBh6LFsJKJdZ-F00eke-vIIbvatphFbB8e'
const CLOUDFLARE_ZONE_ID = '229c1e484eb41505fd0abc3125b9b795'  // Contoh: zone untuk example.com
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4'
// Konfigurasi SSH untuk VPS Anda

const vpsFile = path.join(__dirname, 'vps.json');
let sshConfig = {
  host: '',
  username: '',
  password: ''
};

if (fs.existsSync(vpsFile)) {
  sshConfig = JSON.parse(fs.readFileSync(vpsFile));
}
const {
  exec,
  execSync
} = require('child_process')
const own = JSON.parse(fs.readFileSync('./database/owner.json').toString())
const res = JSON.parse(fs.readFileSync('./database/reseller.json').toString())
let setting = JSON.parse(fs.readFileSync('./lib/settings.json'))

// === START: Penambahan dan Konfigurasi SSH ===
const { NodeSSH } = require('node-ssh'); // Memastikan NodeSSH diimpor

const pathLimit = './limits.json';


function loadLimits() {
  try {
    if (!fs.existsSync(pathLimit)) {
      fs.writeFileSync(pathLimit, '{}');
    }
    const data = fs.readFileSync(pathLimit);
    return JSON.parse(data);
  } catch (error) {
    console.error('Gagal membaca limits.json:', error);
    return {};
  }
}

function saveLimits(data) {
  fs.writeFileSync(pathLimit, JSON.stringify(data, null, 2));
}

function increaseLimit(id) {
  const limits = loadLimits();
  limits[id] = (limits[id] || 0) + 1;
  saveLimits(limits);
}

function resetLimit(id) {
  const limits = loadLimits();
  if (id) {
    delete limits[id];
  } else {
    for (let key in limits) delete limits[key];
  }
  saveLimits(limits);
}

function getLimit(id) {
  const limits = loadLimits();
  return limits[id] || 0;
}
function loadResellers() {
  try {
    if (!fs.existsSync('./resellers.json')) {
      fs.writeFileSync('./resellers.json', '[]');
    }
    const data = fs.readFileSync('./resellers.json');
    return JSON.parse(data);
  } catch (e) {
    console.error('❌ Gagal baca data reseller:', e);
    return [];
  }
}
// === END: Penambahan dan Konfigurasi SSH ===

module.exports = sock = async (sock, m, chatUpdate, mek, store) => {
  try {

    const chalk = require('chalk')
    const sourceFiles = [
      fs.readFileSync('./case.js', 'utf8')
    ]
    const regex = /case\s+'([^']+)':/g
    const matches = []
    for (const source of sourceFiles) {
      let match
      while ((match = regex.exec(source)) !== null) {
        matches.push(match[1])
      }
    }
    global.help = Object.values(matches)
      .flatMap(v => v ?? [])
      .map(entry => entry.trim().split(' ')[0].toLowerCase())
      .filter(Boolean)
    global.handlers = []

    const {
      type
    } = m
    const {
      parseMention,
      formatDuration,
      getRandom,
      getBuffer,
      fetchJson,
      runtime,
      sleep,
      isUrl,
      clockString,
      getTime,
      formatp,
      getGroupAdmins,
      pickRandom,
      monospace,
      randomKarakter,
      randomNomor,
      toRupiah,
      toDolar,
      FileSize,
      resize,
      nebal,
      totalFitur,
      smsg
    } = require('./lib/myfunc')

    const {
      CatBox,
      pinterest,
      yt_search,
      tiktokSearchVideo
    } = require('./lib/scrape')

    var body = m.body
    var budy = m.text
    var prefix
    if (setting.multiprefix) {
      prefix = body.match(/^[°zZ#@+,.?=''():√%!¢£¥€π¤ΠΦ&™©®Δ^βα¦|/\\©^]/)?.[0] || '.'
    } else {
      prefix = body.match(/^[#.?!]/)?.[0] || ''
    }
    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : ''
    const pushname = m.pushName || "No Name"
    const botNumber = await sock.decodeJid(sock.user.id)
    const bulan = moment.tz('Asia/Jakarta').format('DD/MMMM')
    const tahun = moment.tz('Asia/Jakarta').format('YYYY')
    const tanggal = moment().tz("Asia/Jakarta").format("dddd, d")
    const jam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss')
    const wibTime = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    const penghitung = moment().tz("Asia/Jakarta").format("dddd, D MMMM - YYYY")
    const args = body.trim().split(/ +/).slice(1)
    const full_args = body.replace(command, '').slice(1).trim()
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const from = m.key.remoteJid
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const isMediaa = /image|video/.test(mime)
    const isPc = from.endsWith('@s.whatsapp.net')
    const isGc = from.endsWith('@g.us')
    const more = String.fromCharCode(8206)
    const readmore = more.repeat(4001)
    const qmsg = (quoted.msg || quoted)
    const sender = m.key.fromMe ? (sock.user.id.split(':')[0] + '@s.whatsapp.net' || sock.user.id) : (m.key.participant || m.key.remoteJid)
    const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat) : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await participants.filter((v) => v.admin !== null).map((i) => i.id) : [] || []
    const groupOwner = m.isGroup ? groupMetadata?.owner : false
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const groupMembers = m.isGroup ? groupMetadata.participants : ''
    const froms = m.quoted ? m.quoted.sender : text ? (text.replace(/[^0-9]/g, '') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false) : false
    const tag = `${m.sender.split('@')[0]}`
    const tagg = `${m.sender.split('@')[0]}` + '@s.whatsapp.net'
    const isImage = (type == 'imageMessage')
    const isVideo = (type == 'videoMessage')
    const isAudio = (type == 'audioMessage')
    const isSticker = (type == 'stickerMessage')
    const isOwner = [owner, ...own]
      .filter(v => typeof v === 'string' && v.trim() !== '')
      .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender)
    const isReseller = [owner, ...own, ...res]
      .filter(v => typeof v === 'string' && v.trim() !== '')
      .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender)

    if (!setting.public) {
      if (!isOwner && !m.key.fromMe) return
    }
    const contacts = JSON.parse(fs.readFileSync('./database/contacts.json'))
    const isContacts = contacts.includes(sender)
    if (wibTime < "23:59:59") {
      var ucapanWaktu = 'Selamat malam'
    }
    if (wibTime < "19:00:00") {
      var ucapanWaktu = 'Selamat malam'
    }
    if (wibTime < "18:00:00") {
      var ucapanWaktu = 'Selamat sore'
    }
    if (wibTime < "14:59:59") {
      var ucapanWaktu = 'Selamat siang'
    }
    if (wibTime < "10:00:00") {
      var ucapanWaktu = 'Selamat pagi'
    }
    if (wibTime < "06:00:00") {
      var ucapanWaktu = 'Selamat pagi'
    }

    if (!setting.public) {
      if (!isOwner && !m.key.fromMe) return
    }

    const onlyAdmin = () => {
      m.reply('Fitur ini hanya dapat diakses oleh admin')
    }
    const onlyOwn = () => {
      m.reply('Fitur ini hanya dapat diakses oleh owner')
    }
    const onlyBotAdmin = () => {
      m.reply('Fitur ini hanya dapat diakses jika bot adalah admin')
    }
    const onlyGrup = () => {
      m.reply('Fitur ini hanya dapat diakses di group')
    }
    const onlyPrivat = () => {
      m.reply('Fitur ini hanya bisa di akses di private chat')
    }
    const onlyOr = () => {
      m.reply('Fitur ini hanya bisa diakses oleh reseller')
    }

    try {
      const currentTimee = Date.now()
      let isNumber = x => typeof x === 'number' && !isNaN(x)
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}
      if (user) {
        if (!('daftar' in user)) user.daftar = false
        if (!('nama' in user)) user.nama = `${pushname}`
        if (!('banned' in user)) user.banned = false
      } else global.db.data.users[m.sender] = {
        daftar: false,
        nama: `${pushname}`,
        banned: false
      }
      let chats = global.db.data.chats[m.chat]
      if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
      if (chats) {
        if (!('antilink' in chats)) chats.antilink = false
        if (!('antilinkgc' in chats)) chats.antilinkgc = false
        if (!('welcome' in chats)) chats.welcome = false
        if (!('goodbye' in chats)) chats.goodbye = false
        if (!('warn' in chats)) chats.warn = {}
      } else global.db.data.chats[m.chat] = {
        antilink: false,
        antilinkgc: false,
        welcome: false,
        goodbye: false,
        warn: {}
      }

      fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
    } catch (err) {
      console.log(err)
    }

    const _p = prefix
    const n_cmd = command
    const p_c = prefix + command
    const reply = (teks) => {
      return sock.sendMessage(m.chat, {
        text: teks,
        mentions: sock.ments(teks)
      }, {
        quoted: m
      })
    }

    const ftext = {
      key: {
        participant: '0@s.whatsapp.net',
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        } : {})
      },
      message: {
        extendedTextMessage: {
          text: `${command} ${text}`,
          thumbnailUrl: thumb
        }
      }
    }
    const ftoko = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? {
          remoteJid: "status@broadcast"
        } : {})
      },
      message: {
        "productMessage": {
          "product": {
            "productImage": {
              "mimetype": "image/jpeg",
              "jpegThumbnail": "",
            },
            "title": `Payment ${ownername}`,
            "description": null,
            "currencyCode": "JPY",
            "priceAmount1000": "7750000",
            "retailerId": `Powered ${botname}`,
            "productImageCount": 1
          },
          "businessOwnerJid": `0@s.whatsapp.net`
        }
      }
    }

async function cloudflareDeleteDNS(subdomain) {
    // implementasi hapus DNS record dari Cloudflare
}

async function cloudflareUpdateDNS(subdomain, ip) {
  const dnsName = subdomain // contoh: sub.example.com
  const zoneId = CLOUDFLARE_ZONE_ID
  const token = CLOUDFLARE_API_TOKEN

  // Cari dulu apakah record sudah ada
  const listRecordsResp = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records?type=A&name=${dnsName}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const listData = await listRecordsResp.json()
  if (!listData.success) throw new Error('Gagal ambil data DNS dari Cloudflare')

  if (listData.result.length > 0) {
    // Update record yang sudah ada
    const recordId = listData.result[0].id
    const updateResp = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records/${recordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'A',
        name: dnsName,
        content: ip,
        ttl: 1,
        proxied: false
      })
    })
    const updateData = await updateResp.json()
    if (!updateData.success) throw new Error('Gagal update DNS record')
    return updateData.result
  } else {
    // Buat record baru
    const createResp = await fetch(`${CLOUDFLARE_API_BASE}/zones/${zoneId}/dns_records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'A',
        name: dnsName,
        content: ip,
        ttl: 1,
        proxied: false
      })
    })
    const createData = await createResp.json()
    if (!createData.success) throw new Error('Gagal buat DNS record')
    return createData.result
  }
}
    const fconvert = {
      key: {
        fromMe: false,
        participant: m.sender,
        ...(m.chat ? {
          remoteJid: "0@s.whatsapp.net"
        } : {}),
      },
      message: {
        conversation: `*֎ ${isOwner ? 'ᴛʜᴇ ᴏᴡɴᴇʀ' : 'ɴᴏᴛʜɪɴɢ'}*\n*➥ ${db.data.users[m.sender].nama}*`,
      },
    }

    const fchannel = {
      key: {
        fromMe: false,
        participant: m.sender,
        ...(m.chat ? {
          remoteJid: m.sender
        } : {})
      },
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: chjid + "@newsletter",
          newsletterName: `${wm}`,
          caption: prefix + command
        }
      }
    }

    const floc = {
      key: {
        participant: '0@s.whatsapp.net',
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        } : {})
      },
      message: {
        locationMessage: {
          name: `Powered ${botname}`,
          jpegThumbnail: ""
        }
      }
    }

    let rn = ['recording']
    let jd = rn[Math.floor(Math.random() * rn.length)];
    if (m.message && global.help.includes(command)) {
      let time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
      sock.sendPresenceUpdate('available', m.chat)

      const getDtckMsg = `
${chalk.bold.magenta('📥 WHATSAPP MESSAGE')}

${chalk.cyan('⏰ Time     :')} ${chalk.yellow(time)}
${chalk.cyan('💬 Chat     :')} ${chalk.green(m.isGroup ? 'Group 👥' : 'Private 🔒')}
${chalk.cyan('🙋 Sender   :')} ${chalk.hex('#FFA500')(m.pushName || 'Unknown')}
${chalk.cyan('🧩 Command  :')} ${chalk.redBright(command)}
`

      console.log(getDtckMsg)
    }

    if (setting.autosholat) {
      sock.autosholat = sock.autosholat ? sock.autosholat : {}
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? sock.user.jid : m.sender
      let id = m.chat
      if (!(id in sock.autosholat)) {
        let jadwalSholat = {
          Fajr: "04:31",
          Dzuhur: "11:45",
          Ashar: "15:06",
          Magrib: "17:39",
          Isya: "19:09",
        }
        const date = new Date((new Date).toLocaleString("en-US", {
          timeZone: "Asia/Jakarta"
        }))
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
        for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
          if (timeNow === waktu) {
            if (sholat === "Fajr") {
              thumbislam = "https://telegra.ph/file/b666be3c20c68d9bd0139.jpg"
            } else if (sholat === "Dzuhur") {
              thumbislam = "https://telegra.ph/file/5295095dad53783b9cd64.jpg"
            } else if (sholat === "Ashar") {
              thumbislam = "https://telegra.ph/file/c0e1948ad75a2cba22845.jpg"
            } else if (sholat === "Magrib") {
              thumbislam = "https://telegra.ph/file/0082ad9c0e924323e08a6.jpg"
            } else {
              thumbislam = "https://telegra.ph/file/687fd664f674e90ae1079.jpg"
            }
            sock.autosholat[id] = [
              sock.sendMessage(m.chat, {
                audio: {
                  url: "https://files.catbox.moe/fsw8se.mp3"
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                  externalAdReply: {
                    title: `Waktu ${sholat} telah tiba, ambilah air wudhu dan segeralah sholat 😇`,
                    body: 'Wilayah Jakarta dan sekitarnya',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: thumbislam,
                    sourceUrl: "-"
                  }
                }
              }, {
                quoted: m
              }),
              setTimeout(() => {
                delete sock.autosholat[id]
              }, 57000)
            ]
          }
        }
      }
    }

    if (budy.startsWith('=> ')) {
      if (!m.fromMe && !isOwner) return

      function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
          bang = util.format(sul)
        }
        return m.reply(bang)
      }
      try {
        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
      } catch (e) {
        m.reply(util.format(e))
      }
    }

    if (budy.startsWith('> ')) {
      if (!m.fromMe && !isOwner) return
      try {
        let evaled = await eval(budy.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await m.reply(evaled)
      } catch (err) {
        await m.reply(util.format(err))
      }
    }

    if (budy.startsWith('$ ')) {
      if (!m.fromMe && !isOwner) return
      exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
      })
    }

    if (db.data.chats[m.chat].warn && db.data.chats[m.chat].warn[m.sender]) {
      const warnings = db.data.chats[m.chat].warn[m.sender]

      if (warnings >= setting.warnCount) {
        if (!isBotAdmins || isAdmins || isOwner) return

        await sock.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.sender
          }
        })
      }
    }

    if (db.data.chats[m.chat].antilink) {
      if (budy.match('chat.whatsapp|wa.me|whatsapp.com|t.me|http|www.')) {
        if (!(m.key.fromMe || isAdmins || isOwner || !isBotAdmins)) {
          await sock.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
            }
          })
          await sock.groupParticipantsUpdate(m.chat, [m.sender], 'delete')
        }
      }
    }

    if (db.data.chats[m.chat].antilinkgc) {
      if (budy.match('chat.whatsapp')) {
        if (!(m.key.fromMe || isAdmins || isOwner || !isBotAdmins)) {
          await sock.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
            }
          })
          await sock.groupParticipantsUpdate(m.chat, [m.sender], 'delete')
        }
      }
    }

    if (setting.autoread) {
      sock.readMessages([m.key])
    }

    if (global.help.includes(command) && setting.autotyping) {
      sock.sendPresenceUpdate('composing', from)
      setTimeout(() => {
        sock.sendPresenceUpdate('paused', from)
      }, 2000)
    }

    async function react() {
      sock.sendMessage(from, {
        react: {
          text: '⏱️',
          key: m.key
        }
      })
    }


    switch (command) {

    case 'tes': {
      m.reply('tes')
    }
    break    
case 'allmenu':
case 'ceratevpn': {
  const moment = require('moment-timezone');
  moment.locale('id');

  const uptime = () => {
    let totalSeconds = parseInt(process.uptime());
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} jam ${minutes} menit`;
  };

  const waktu = moment().tz('Asia/Jakarta');
  const tanggal = waktu.format('LL');
  const hari = waktu.format('dddd');
  const jam = waktu.format('HH:mm') + ' WIB';

  let teks = "```" + `
👥 WELCOME TO RISWAN STORE
👋 Hai @${m.sender.replace(/[^0-9]/g, '')}
📅 ${hari}, ${tanggal}
🕘 Pukul: ${jam}
⚡ Bot Aktif: ${uptime()}

👑 MENU UTAMA
✦ .pay             ➜ Pembayaran
✦ .login           ➜ Login Akun
✦ .addreseller     ➜ Tambah User
✦ .hapusreseller   ➜ Hapus User
✦ .rekber          ➜ Jasa Rekber
✦ .listreseller    ➜ Lihat User
✦ .risetlimit      ➜ Riset Akun
✦ .proses          ➜ Proses Paket
✦ .listvpn         ➜ Harga VPN
✦ .pointing        ➜ Add Domain
✦ .listdomain      ➜ List Domain
✦ .hapusdomain     ➜ Hapus Domain
✦ .addsc           ➜ Tambah Script
✦ .listsc          ➜ List Script
✦ .getsc           ➜ Ambil Script
✦ .addvps          ➜ Tambah VPS
✦ .hapusvps        ➜ Hapus VPS
✦ .listvps         ➜ Lihat VPS
✦ .autoread        ➜ Auto Baca
✦ .autotyping      ➜ Auto Ketik

📡 BUAT AKUN
✦ .sgws            ➜ SG WS VLESS
✦ .sgwc            ➜ SG WC VLESS
✦ .idws            ➜ ID WS VLESS
✦ .idwc            ➜ ID WC VLESS
✦ .vmess           ➜ Buat Akun
✦ .vless           ➜ Buat Akun
✦ .trojan          ➜ Buat Akun 
✦ .ssh             ➜ Buat Akun 

🎨 LAINNYA
✦ .s     ➜ Buat Stiker
✦ .hd    ➜ Gambar HD

📣 PUSH MENU
✦ .jpm         ➜ Push Pesan
✦ .jpmhidetag  ➜ Push Tanpa Tag
✦ .jpmfoto     ➜ Push Gambar

📡 CHANNEL
✦ .cekidch  ➜ Cek ID Channel
✦ .addch    ➜ Tambah Channel
✦ .delch    ➜ Hapus Channel
✦ .listch   ➜ List Channel
✦ .jpmch    ➜ Push via Channel

📛 Riswan Bot © 2023
` + "```";
  await sock.sendMessage(m.chat, {
    text: teks,
    mentions: [m.sender]
  }, { quoted: m });
}
break;
case 'menu': {
  const poter = "```" + `
━━━━━━━━━━━━━━━━━━━━━━
   PANEL BOT VPN PREMIUM
━━━━━━━━━━━━━━━━━━━━━━
📡 Layanan VPN premium:
📌 • SERVER ID & SG
━━━━━━━━━━━━━━━━━━━━━━
• .ssh    → user 30 500 2
• .vless  → user 30 500 2
• .vmess  → user 30 500 2
• .trojan → user 30 500 2

📌 Format Perintah:
📌 .ssh risvpn 30 500 2
• user → nama pengguna
• 30   → masa aktif (hari)
• 500  → Limit kuota (GB)
• 2    → maksimal IP login
━━━━━━━━━━━━━━━━━━━━━━
🧩 Menu Tambahan:
• .allmenu → lihat semua
━━━━━━━━━━━━━━━━━━━━━━
🔐 Admin Only:
• .addvps
• .addreseller
• .risetlimit
• .hapusreseller
• .listreseller

📍 by © Riswan Store 2023
━━━━━━━━━━━━━━━━━━━━━━` + "```";
  await sock.sendMessage(m.chat, {
    text: poter
  }, { quoted: m });
}
break;
    //Mainmenu

    case 'runtime': {
      m.reply(`Bot runtime: ${runtime(process.uptime())}`)
    }
    break    
// ==========================
// 1. PONTING DOMAIN
// ==========================
case 'pointing': {
    if (!args[0]) {
        return m.reply('❌ Format salah. Gunakan:\n```\n👉vpn|123.123.123\n```')
    }

    const [subRaw, ipRaw] = args[0].split('|')

    if (!subRaw || !ipRaw) {
        return m.reply('❌ Format salah. Gunakan:\n```\n👉vpn|123.123.123\n```')
    }

    const sub = subRaw.toLowerCase().trim()
    const ip = ipRaw.trim()
    const subdomain = `${sub}.pgetunnel.cloud`

    // Validasi format
    if (!/^[a-z0-9.-]+$/.test(sub)) return m.reply('❌ Format subdomain tidak valid.')
    if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return m.reply('❌ Format IP tidak valid.')

    // Cek apakah subdomain + IP sudah pernah digunakan
    const isDuplicate = Object.values(db.data.chats).some(chat =>
        chat.ponting &&
        chat.ponting.subdomain === subdomain &&
        chat.ponting.ip === ip
    )

    if (isDuplicate) {
        return m.reply(`*Subdomain dan IP sudah pernah dipointing*
*sebelumnya. Silakan hapus terlebih*
*dahulu jika itu milik kamu.*`)
    }

    try {
        // Hapus data lama (jika ada) di chat ini
        if (db.data.chats[m.chat].ponting) {
            delete db.data.chats[m.chat].ponting
        }

        // Update ke Cloudflare
        await cloudflareUpdateDNS(subdomain, ip)

        // Simpan ke database
        db.data.chats[m.chat].ponting = { subdomain, ip }

        m.reply(`\`\`\`
✅ Sip! Domain berhasil dipointing
📡 Domain: ${subdomain}
🖥️ IP VPS: ${ip}

⏳ Tunggu 1 menit ya biar 
🌐 domainnya aktif sepenuhnya!
\`\`\``)

    } catch (e) {
        return m.reply(`❌ Gagal update DNS: ${e.message}`)
    }
}
break
// ==========================
// 2. UNPOINTING DOMAIN + IP (Hapus juga dari Cloudflare)
// ==========================
case 'hapusdomain': {
    const domain = args[0]?.toLowerCase()
    const ip = args[1]

    // Validasi domain: harus diakhiri .pgetunnel.cloud
    if (!domain || !/^[a-z0-9.-]+\.pgetunnel\.cloud$/i.test(domain)) {
        return m.reply('⚠️ Format salah. gunakan:\n```\n👉vpn.pgetunnel.cloud\n\n```')
    }

    if (ip && !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) {
        return m.reply('❌ Format IP tidak valid.')
    }

    let count = 0

    for (const chatId in db.data.chats) {
        const p = db.data.chats[chatId].ponting
        if (!p) continue

        const domainMatch = p.subdomain === domain
        const ipMatch = ip ? p.ip === ip : true

        if (domainMatch && ipMatch) {
            try {
                await cloudflareDeleteDNS(p.subdomain)
            } catch (err) {
                console.error(`Gagal hapus DNS dari Cloudflare: ${p.subdomain}`, err.message)
            }

            delete db.data.chats[chatId].ponting
            count++
        }
    }

    if (count === 0) {
        return m.reply('ℹ️ Tidak ditemukan data pointing dengan domain dan IP tersebut.')
    }

    return m.reply(`\`\`\`
✅ ${count} data pointing berhasil dihapus
🌐 untuk domain ${domain}\`\`\`
`)
}
break

// ==========================
// 3. LIST POINTING
// ==========================
case 'listdomain': {
    if (!isOwner) return m.reply('❌ Perintah ini hanya bisa digunakan oleh admin.')

    let result = ''
    let count = 0

    for (const chatId in db.data.chats) {
        const p = db.data.chats[chatId].ponting
        if (!p) continue

        count++
        result += `*${count}.*\n📡 Domain: ${p.subdomain}\n🖥️ IP VPS: ${p.ip}\n💬 Chat: ${chatId}\n\n`
    }

    if (count === 0) {
        return m.reply('ℹ️ Tidak ada data Domain yang aktif saat ini.')
    }

    return m.reply(`📝 *Daftar Domain Aktif (${count}):*\n\n${result}`)
}
break
case "idws":
case "idwc":
case "sgws":
case "sgwc": {
  const isGroup = m.key.remoteJid.endsWith('@g.us');
  if (isGroup) return reply(`🚫 *Fitur ini hanya bisa digunakan di chat*`);

  const allowedAdmins = ["6285888801241@s.whatsapp.net"];
  if (!allowedAdmins.includes(sender)) return reply(`🚫 *Fitur ini untuk admin.*`);

  if (!q) {
    const contoh = command === 'idws' || command === 'idwc' ? '.idws 3 hari bug.example.com' : '.sgws 3 hari bug.example.com';
    return reply(`📆 Masukkan masa aktif akun dan domain\n👉 Contoh: ${contoh}`);
  }

  const args = q.trim().split(/\s+/);
  if (args.length < 2) return reply(`❌ Format tidak valid. Gunakan:\nContoh: .${command} 3 hari quiz.vidio.com`);

  let timePart = args[0];
  let domain = args.slice(2).join(" ");
  if (/^\d+$/.test(timePart) && args[1]?.toLowerCase() === 'hari') {
    timePart = `${timePart} hari`;
  } else if (/^\d{2}-\d{2}-\d{4}$/.test(`${args[0]}`)) {
    timePart = args[0];
    domain = args[1];
  }

  const customDomain = domain || (command.startsWith("id") ? "bug.example.com" : "bug.example.com");

  let expiredDate;
  if (/^\d+\s*hari$/i.test(timePart)) {
    const jumlahHari = parseInt(timePart);
    const now = new Date();
    now.setDate(now.getDate() + jumlahHari);
    expiredDate = now.toISOString().split('T')[0];
  } else if (/^\d{2}-\d{2}-\d{4}$/.test(timePart)) {
    const [d, m, y] = timePart.split("-");
    expiredDate = new Date(`${y}-${m}-${d}`).toISOString().split('T')[0];
  } else {
    return reply(`❌ Format tanggal tidak valid.\nContoh: *3 hari* atau *27-07-2025*`);
  }

  const isWC = command.endsWith("wc");
  const baseHost = "violetvpn.biz.id";
  const hostAndSNI = isWC ? `${customDomain}.${baseHost}` : baseHost;

  const config = {
    domain: customDomain,
    path: command.startsWith("id") ? "/id-amz" : "/sg-melbi",
    port: 443,
    tls: "tls",
    sni: hostAndSNI,
    host: hostAndSNI,
    remark: command.startsWith("id")
      ? `ID Amazon 🇮🇩 (Exp: ${expiredDate})`
      : `SG Melbi 🇸🇬 (Exp: ${expiredDate})`
  };

  try {
    const cleanUuid = generateUUID();
    const vlessLink = `vless://${cleanUuid}@${config.domain}:${config.port}?encryption=none&security=${config.tls}&type=ws&path=${encodeURIComponent(config.path)}&host=${config.host}&fp=random&sni=${config.sni}#${encodeURIComponent(config.remark)}`;
    return reply(`${vlessLink}`);
  } catch (error) {
    console.error("❌ Error saat membuat UUID:", error.message || error);
    return reply("❌ Terjadi kesalahan saat membuat konfigurasi. Coba lagi nanti.");
  }
}
break;
// ===== VPN CONFIGURATION =====
case 'ssh':
case 'vmess':
case 'vless':
case 'trojan':
case 'shadowsocks': {

    // Fungsi hitung akun reseller
    function getLimit(resellerId) {
        try {
            const data = fs.readFileSync('./reseller_accounts.json', 'utf-8');
            const akun = JSON.parse(data);
            return akun.filter(a => a.owner === resellerId).length;
        } catch (e) {
            console.error('❌ Gagal membaca database reseller:', e);
            return 0;
        }
    }

    // Fungsi simpan akun reseller ke database lokal
    function saveResellerAccount({ username, owner, type }) {
        try {
            const file = './reseller_accounts.json';
            const db = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
            db.push({ username, owner, type });
            fs.writeFileSync(file, JSON.stringify(db, null, 2));
        } catch (e) {
            console.error('❌ Gagal simpan data reseller:', e);
        }
    }

    const isReseller = loadResellers().includes(m.sender.replace(/[^0-9]/g, ''));
    const resellerId = m.sender.replace(/[^0-9]/g, '');

    if (!isOwner && !isReseller)
        return m.reply('❌ *Fitur ini hanya untuk Owner atau Reseller*');

    if (isReseller && getLimit(resellerId) >= 6 )
        return m.reply('❌ *Limit reseller tercapai (maksimal 6 akun total) silahkan hubungi admin*');

    const args = m.text.trim().split(/\s+/).slice(1);
    const usernameInput = args[0];
    const expiredDays = parseInt(args[1]);
    const quotaGB = parseInt(args[2]) || 0;
    const maxIP = parseInt(args[3]) || 1;
    const bugDomain = args[4] || 'quiz.vidio.com';

    if (!usernameInput || isNaN(expiredDays) || expiredDays <= 0) {
        return m.reply(`⚠️ Format salah. Contoh:
*👉 .${command} user 30 500 2*

📌 Keterangan:
👤 *user* : nama pengguna  
⏳ *30* : masa aktif (hari)  
📦 *500* : kuota (GB)  
🔢 *2* : max IP login`);
    }

    if ((command !== 'ssh') && (isNaN(quotaGB) || quotaGB < 0 || maxIP <= 0)) {
        return m.reply("❌ Kuota/IP tidak valid untuk VMess/VLESS/Trojan.");
    }

    react(); // Reaksi loading

    const ssh = new NodeSSH();
    try {
        await ssh.connect(sshConfig);

        if (command === 'ssh') {
            const password = Math.random().toString(36).slice(-8);
            const expiredDate = moment().add(expiredDays, 'days').format('YYYY-MM-DD');

            const sshResult = await ssh.execCommand(`
                useradd -e ${expiredDate} -M -s /bin/false ${usernameInput} && \\
                echo "${usernameInput}:${password}" | chpasswd
            `);

            if (sshResult.stderr) {
                console.error("❌ SSH stderr:", sshResult.stderr);
                return m.reply("❌ Gagal membuat akun SSH.\n\n" + sshResult.stderr);
            }

            // Simpan akun reseller
            if (isReseller) {
                saveResellerAccount({
                    username: usernameInput,
                    owner: resellerId,
                    type: 'ssh'
                });
            }

            return m.reply(
`✅ *Berhasil Membuat Akun SSH*
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*
👤 Host: ${sshConfig.host}
📛 Username: ${usernameInput}
🔑 Password: ${password}
📅 Expired: ${expiredDate}
📶 IP Limit: ${maxIP}
📊 Quota: ${quotaGB}GB
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*
🌐 ${sshConfig.host}:443@${usernameInput}:${password}
⚠️ *Gunakan akun ini dengan bijak.*
👤 *Bot by Riswan Store*  t.me/JesVpnt
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*`
            );
        } else {
            let scriptPath = '';
            if (command === 'vmess') scriptPath = '/etc/xray/add-vmess';
            else if (command === 'vless') scriptPath = '/etc/xray/add-vless';
            else if (command === 'trojan') scriptPath = '/etc/xray/add-trojan';
            else if (command === 'shadowsocks') scriptPath = '/etc/xray/add-ss';

            const execCmd = `${scriptPath} ${usernameInput} ${expiredDays} ${quotaGB} ${maxIP} ${bugDomain}`;
            const result = await ssh.execCommand(execCmd);

            if (result.stderr && !result.stdout.includes("SUCCESS")) {
                console.error(`❌ SSH stderr for ${command}:`, result.stderr);
                return m.reply(`❌ Gagal membuat akun ${command.toUpperCase()}.\n\n${result.stderr}`);
            }

            const outputLines = result.stdout.trim().split('\n');
            const successIndex = outputLines.findIndex(line => line.includes("SUCCESS"));

            if (successIndex !== -1) {
                let message = '';
                for (let i = successIndex + 1; i < outputLines.length; i++) {
                    const line = outputLines[i].trim();
                    if (line.includes(':')) message += `${line}\n`;
                }

                // Simpan akun reseller
                if (isReseller) {
                    saveResellerAccount({
                        username: usernameInput,
                        owner: resellerId,
                        type: command
                    });
                }

                return m.reply(
`✅ *Berhasil Membuat Akun ${command.toUpperCase()}*
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*
${message}*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*
⚠️ *Gunakan akun ini dengan bijak.*
👤 *Bot by Riswan Store* t.me/JesVpnt
*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*`);
            } else {
                return m.reply(`❌ Output dari VPS tidak sesuai format.\n\n${result.stdout}`);
            }
        }

    } catch (err) {
        console.error("❌ SSH Connection Error:", err);
        return m.reply(`❌ Gagal koneksi VPS atau eksekusi perintah:\n\n${err.message || err}`);
    } finally {
        if (ssh.isConnected()) ssh.dispose();
    }
}
break;

case 'addreseller': {
  if (!isOwner) return m.reply('❌ Hanya Owner yang bisa menambahkan reseller!');
  const target = m.text.split(' ')[1]?.replace(/[^0-9]/g, '');
  if (!target) return m.reply('⚠️ Format salah!\nContoh: *.addreseller 6281234567890*');

  const list = loadResellers();
  if (list.includes(target)) return m.reply('✅ Sudah menjadi reseller.');

  list.push(target);
  fs.writeFileSync('./resellers.json', JSON.stringify(list, null, 2));
  return m.reply(`✅ Berhasil menambahkan reseller:\n${target}`);
}
break;
case 'hapusreseller': {
  if (!isOwner) return m.reply('❌ Hanya Owner!');
  const target = m.text.split(' ')[1]?.replace(/[^0-9]/g, '');
  if (!target) return m.reply('⚠️ Format salah!\nContoh: *.hapusreseller 6281234567890*');

  let list = loadResellers();
  if (!list.includes(target)) return m.reply('❌ Nomor bukan reseller.');

  list = list.filter(id => id !== target);
  fs.writeFileSync('./resellers.json', JSON.stringify(list, null, 2));
  resetLimit(target);
  return m.reply(`✅ Reseller ${target} berhasil dihapus.`);
}
break;

case 'risetlimit': {
  if (!isOwner) return m.reply('❌ Hanya Owner!');
  const target = m.text.split(' ')[1]?.replace(/[^0-9]/g, '');
  if (!target) return m.reply('⚠️ Format salah!\nContoh: *.risetlimit 6281234567890*');

  try {
    // 1. Hapus akun yang dibuat reseller dari database
    const file = './reseller_accounts.json';
    let totalDeleted = 0;
    if (fs.existsSync(file)) {
      const db = JSON.parse(fs.readFileSync(file));
      const before = db.length;
      const updatedDb = db.filter(a => a.owner !== target);
      fs.writeFileSync(file, JSON.stringify(updatedDb, null, 2));
      totalDeleted = before - updatedDb.length;
    }

    // 2. Reset limit
    resetLimit(target);

    // 3. Tambahkan ulang ke daftar reseller jika belum ada
    const list = loadResellers();
    if (!list.includes(target)) {
      list.push(target);
      fs.writeFileSync('./resellers.json', JSON.stringify(list, null, 2));
    }

    return m.reply(`✅ Berhasil *reset akun reseller*:\n• Nomor: ${target}\n• Akun dihapus: ${totalDeleted}\n• Status: Ditambahkan ulang ke daftar reseller`);
  } catch (e) {
    console.error('❌ Gagal reset reseller:', e);
    return m.reply('❌ Terjadi kesalahan saat reset reseller.');
  }
}
break;
case 'listreseller': {
  if (!isOwner) return m.reply('❌ Hanya Owner!');
  const resellerFile = './resellers.json';
  const akunFile = './reseller_accounts.json';

  try {
    if (!fs.existsSync(resellerFile)) return m.reply('📂 Belum ada data reseller.');

    const resellers = JSON.parse(fs.readFileSync(resellerFile));
    if (resellers.length === 0) return m.reply('📂 Daftar reseller kosong.');

    // Load data akun yang telah dibuat reseller
    const akunData = fs.existsSync(akunFile) ? JSON.parse(fs.readFileSync(akunFile)) : {};

    const teks = resellers.map((nomor, i) => {
      const total = akunData[nomor]?.length || 0;
      return `${i + 1}. ${nomor}`;
    }).join('\n');

    return m.reply(`📋 *Daftar Reseller kamu:*\n\n${teks}`);
  } catch (e) {
    console.error('❌ Gagal membaca reseller:', e);
    return m.reply('❌ Terjadi kesalahan saat menampilkan reseller.');
  }
}
break;
case 'addvps': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menambahkan VPS.');

  const args = m.text.split(' ')[1];
  if (!args || !args.includes('|')) 
    return m.reply('❌ Format salah.\nGunakan: *.addvps host|username|password*');

  const [host, username, password] = args.split('|');
  if (!host || !username || !password)
    return m.reply('❌ Semua field harus diisi.');

  sshConfig = { host, username, password };

  // Simpan ke file
  fs.writeFileSync(vpsFile, JSON.stringify(sshConfig, null, 2));

  return m.reply(`✅ *VPS kmu berhasil ditambahkan:*\n\n🌐 *Host:* ${host}\n👤 *Username:* ${username}`);
}
break;
case 'listvps': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa melihat daftar VPS.');

  if (!sshConfig.host || !sshConfig.username || !sshConfig.password) {
    return m.reply('⚠️ Konfigurasi VPS masih kosong atau belum disetting.');
  }

  const teks =
    `📋 *Konfigurasi VPS Saat Ini:*\n\n` +
    `🌐 *Host:* ${sshConfig.host}\n` +
    `👤 *Username:* ${sshConfig.username}\n` +
    `🔒 *Password:* ${sshConfig.password ? '********' : '(kosong)'}`;

  return m.reply(teks);
}
break;

case 'hapusvps': {
  if (!isOwner) return m.reply('❌ Hanya owner yang bisa menghapus VPS.');

  sshConfig = {
    host: '',
    username: '',
    password: ''
  };

  fs.writeFileSync(vpsFile, JSON.stringify(sshConfig, null, 2));
  return m.reply('✅ *Konfigurasi VPS berhasil dihapus.*');
}
break;

    case 's':
    case 'stiker':
    case 'setiker':
    case 'sticker': {
      if (!quoted) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      react()

      if (quoted) {
        let msg = quoted
        let type = Object.keys(msg)[0]
        if (msg[type].viewOnce) {
          let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
          let buffer = Buffer.from([])
          for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
          }
          if (/video/.test(type)) {
            if ((quoted.msg || quoted).seconds > 25) return m.reply('Maksimal 25 detik!')
            await sock.vidToSticker(m.chat, buffer, m, {
              packname: packname,
              author: author
            })
            return
          } else if (/image/.test(type)) {
            await sock.imgToSticker(m.chat, buffer, m, {
              packname: packname,
              author: author
            })
            return
          }
        }
      }

      if (/image/.test(mime)) {
        let media = await sock.downloadAndSaveMediaMessage(quoted, +new Date * 1)
        await sock.imgToSticker(m.chat, media, m, {
          packname: packname,
          author: author
        })
        await fs.unlinkSync(media)
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 25) return m.reply('Maksimal 25 detik!')
        let media = await sock.downloadAndSaveMediaMessage(quoted, +new Date * 1)
        await sock.vidToSticker(m.chat, media, m, {
          packname: packname,
          author: author
        })
        await fs.unlinkSync(media)
      } else if (/sticker/.test(mime)) {
        let media = await sock.downloadAndSaveMediaMessage(quoted, +new Date * 1)
        await sock.sendStickerFromUrl(m.chat, media, m, {
          packname: packname,
          author: author
        })
        await fs.unlinkSync(media)
      } else m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
    }
    break
    case 'hd':
    case 'hdr':
    case 'remini': {
      if (!/image/.test(mime)) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      react()

      const {
        upScale,
        remini,
        Pxpic
      } = require('./lib/scrape')
      const media = await sock.downloadAndSaveMediaMessage(quoted)

      const hasilnya = await Pxpic(media, 'enhance')
      if (hasilnya?.resultImageUrl) {
        await sock.sendMessage(m.chat, {
          image: {
            url: hasilnya.resultImageUrl
          },
          caption: 'Sukses'
        }, {
          quoted: m
        })
        fs.unlinkSync(media)
        return
      }

      if (await upScale(media, sock, m, m.chat)) {
        fs.unlinkSync(media)
        return
      }

      const proses = await remini(media, 'enhance')
      if (proses) {
        await sock.sendMessage(m.chat, {
          image: proses,
          caption: 'Sukses'
        }, {
          quoted: m
        })
      } else {
        m.reply('Terjadi kesalahan')
      }

      fs.unlinkSync(media)
    }
    break       
    case 'addsc':
    case 'addscript': {
      if (!isOwner) return onlyOwn()

      const quoted = m.quoted
      if (!quoted || quoted.mtype !== 'documentMessage') {
        return m.reply('❗Reply dokumen script yang ingin ditambahkan!\n\nContoh: *.addsc namascript.zip*')
      }

      const filename = text?.trim() || quoted.fileName || `script-${Date.now()}.zip`

      const folder = './database/script'
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, {
        recursive: true
      })

      const media = await downloadContentFromMessage(quoted, 'document')
      let buffer = Buffer.from([])
      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
      }

      const filePath = require('path').join(folder, filename)
      require('fs').writeFileSync(filePath, buffer)

      m.reply(`✅ Script berhasil ditambahkan sebagai:\n📁 ${filePath}`)
    }
    break

    case 'listsc':
    case 'listscript': {
      if (!isOwner) return onlyOwn()
      const folder = './database/script'
      if (!fs.existsSync(folder)) return m.reply('❌ Folder script belum ada.')

      const files = fs.readdirSync(folder)
      if (files.length === 0) return m.reply('📁 Folder script kosong.')

      let teks = `📜 *DAFTAR SCRIPT (${files.length})*\n\n`
      files.forEach((file, i) => {
        teks += `${i + 1}. ${file}\n`
      })
      m.reply(teks)
    }
    break

    case 'getsc':
    case 'getscript': {
      if (!isOwner) return onlyOwn()

      const folder = './database/script'
      if (!fs.existsSync(folder)) return m.reply('❌ Folder script belum ada.')

      const files = fs.readdirSync(folder)
      if (files.length === 0) return m.reply('📁 Tidak ada script.')

      const no = parseInt(text.trim())
      if (isNaN(no) || no < 1 || no > files.length) return m.reply(`Masukkan nomor script yang valid!\n\nContoh: *.getsc 1*\nGunakan *.listsc* untuk melihat nomor script.`)

      const filepath = path.join(folder, files[no - 1])
      let buff = fs.readFileSync(filepath)

      await sock.sendMessage(m.chat, {
        document: buff,
        fileName: files[no - 1],
        mimetype: 'application/octet-stream',
      }, {
        quoted: m
      })
    }
    break

    // CASE LIST VPN
case 'listvpn':
case 'cerajshsusbtevpn': {
  const moment = require('moment-timezone');
  moment.locale('id');

  const uptime = () => {
    let totalSeconds = parseInt(process.uptime());
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} jam ${minutes} menit`;
  };

  const waktu = moment().tz('Asia/Jakarta');
  const tanggal = waktu.format('LL');
  const hari = waktu.format('dddd');
  const jam = waktu.format('HH:mm');

  const poter = "```" + `
👤 Hai @${m.sender.replace(/[^0-9]/g, '')}
📅 ${hari}, ${tanggal} • ${jam}
⏱️ Uptime: ${uptime()}

VPN PREMIUM - PGETUNNEL
✓ Akses Semua Server Global
✓ Bandwidth Tanpa Batas
💸 Mulai Rp 8.000 / Bulan

PAKET XL - Kuota Only
• XL XUTS  : Rp 27.000
• XL Vidio : Rp 38.000
• XL XUTUP : Rp 43.000

PAKET XL - Siap Pakai
• XL XUTS  : Rp 30.000
• XL Vidio : Rp 40.000
• XL XUTUP : Rp 48.000

AUTOSCRIPT FULL AKSES
✓ Lifetime & Custom Bebas
✓ Bisa Disewakan via IP
💰 Rp 150.000
Support: Ubuntu 20, Debian 10/11

SCRIPT BOT VPN
✓ WhatsApp Bot (Baileys)
✓ Telegram Bot (VLESS, dll)
💰 Rp 100.000

JOIN RESELLER VPN
• Harga Murah dari Member
• Bonus Topup Otomatis via Bot
👉 Mulai Rp 5.000

HUBUNGI ADMIN
• WA: wa.me/6285888801241
• TG: t.me/JesVpnt

INFO & RESOURCE
• Grup     : t.me/grupvpn
• Channel  : t.me/pgetunnel
• VLESS CF : t.me/pgetunnel_robot
• Script   : t.me/subdom_robot
` + "```";

  await sock.sendMessage(m.chat, {
    text: poter,
    mentions: [m.sender]
  }, { quoted: m });
}
break;
case 'rekber':
case 'jasa rekber': {
  try {
    const moment = require('moment-timezone');
    moment.locale('id');

    // Fungsi menghitung uptime bot
    const uptime = () => {
      const totalSeconds = parseInt(process.uptime());
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      return `${hours} jam ${minutes} menit`;
    };

    const waktu = moment().tz('Asia/Jakarta');
    const tanggal = waktu.format('LL');
    const hari = waktu.format('dddd');
    const jam = waktu.format('HH:mm');

    const pesan = "```" + `
🔒 JASA REKBER (Rekening Bersama)

📆 hari ${hari}, ${tanggal}
⏰ Jam     : ${jam}
🔧 Aktif   : ${uptime()}

💰 Biaya   : Rp 3.000
📛 Nama    : Sandi Herlan
📱 No dana : 0896-2993-9141

📌 LANGKAH-LANGKAH:
📩 Chat admin dulu
💸 Kirim dana ke kami
✅ Admin konfirmasi
🔁 Dana diteruskan
🔒 Transaksi aman

📞 Hubungi Admin:
👉 wa.me/6285888801241
` + "```";

    await sock.sendMessage(m.chat, {
      image: { url: `${payment.qris}` },
      caption: pesan
    }, { quoted: m });

  } catch (e) {
    return m.reply('*Gagal menampilkan informasi jasa rekber!*');
  }
}
break;
case 'login': {
  const moment = require('moment-timezone');
  moment.locale('id');

  const uptime = () => {
    const totalSeconds = parseInt(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} jam ${minutes} menit`;
  };

  const waktu = moment().tz('Asia/Jakarta');
  const tanggal = waktu.format('LL');
  const hari = waktu.format('dddd');
  const jam = waktu.format('HH:mm');

  const poter = "```" + `
➡️ LOGIN DOR
📅 ${hari}, ${tanggal} • ${jam}
⚡ Aktif: ${uptime()}

📶 Paket XL DOR
🔐 Login: otp.exel.workers.dev
📸 Kirim foto kuota via dial

Cek Kuota & Stop Langganan:
• Dial *808#
• Pilih INFO
• Info Kartu XL-Ku
• Stop Langganan

📤 Kirim bukti setelah stop
🙏 Terima kasih
` + "```";

  await sock.sendMessage(m.chat, { text: poter }, { quoted: m });
}
break;

case 'proses': {
  const moment = require('moment-timezone');
  moment.locale('id');

  const uptime = () => {
    const totalSeconds = parseInt(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} jam ${minutes} menit`;
  };

  const waktu = moment().tz('Asia/Jakarta');
  const tanggal = waktu.format('LL');
  const hari = waktu.format('dddd');
  const jam = waktu.format('HH:mm');

  const poter = "```" + `
➡️ PROSES DOR PAKET XL 
📅 ${hari}, ${tanggal} • ${jam}
⚡ Bot Aktif: ${uptime()}

✅ Paket kamu sedang diproses
🔃 Estimasi waktu ±1 jam

🙏 Terima kasih atas kesabaran
` + "```";

  await sock.sendMessage(m.chat, { text: poter }, { quoted: m });
}
break;
// CASE QRIS PAYMENT
case 'pay': {
  try {
    const moment = require('moment-timezone');
    moment.locale('id');

    const uptime = () => {
      const totalSeconds = parseInt(process.uptime());
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      return `${hours} jam ${minutes} menit`;
    };

    const waktu = moment().tz('Asia/Jakarta');
    const tanggal = waktu.format('LL');
    const hari = waktu.format('dddd');
    const jam = waktu.format('HH:mm');

    const poter = "```" + `
💳 QRIS PEMBAYARAN: RIS STORE
📅 ${hari}, ${tanggal} • ${jam}
⚡ Aktif: ${uptime()}

💳 NAMA DANA: Sandi Herlan
📱 NOMER: 0896-2993-9141

📤 Kirim bukti setelah transfer
📩 Langsung kirim di sini
` + "```";

    await sock.sendMessage(m.chat, {
      image: { url: `${payment.qris}` },
      caption: poter
    }, { quoted: m });

  } catch (e) {
    return m.reply('*Gagal mengambil QRIS!*');
  }
}
break;
    case 'done': {
      if (!isOwner) return onlyOwn();
      if (!m.quoted) return m.reply('Reply pesanan yang telah di proses')
      let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
      let sukses = `
「 *TRANSAKSI KAMU BERHASIL* 」\n
📆 TANGGAL : @tanggal
⌚ JAM           : @jam
✅ STATUS     : Berhasil

@user, Next order ya 🙏`
      sock.sendTextWithMentions(m.chat, (sukses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', wibTime).replace('@tanggal', tanggal).replace('@user', '@' + m.quoted.sender.split("@")[0])), m)
    }
    break    

    case 'autoread': {
      if (!isOwner) return onlyOwn()
      if (args[0] === 'on') {
        if (setting.autoread) return m.reply('Sudah diaktifkan sebelumnya')
        setting.autoread = true
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses mengaktifkan autoread.')
      } else if (args[0] === 'off') {
        if (!setting.autoread) return m.reply('Sudah dinonaktifkan sebelumnya')
        setting.autoread = false
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses menonaktifkan autoread.')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'autotyping': {
      if (!isOwner) return onlyOwn()
      if (args[0] === 'on') {
        if (setting.autotyping) return m.reply('Sudah diaktifkan sebelumnya')
        setting.autotyping = true
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses mengaktifkan autotyping.')
      } else if (args[0] === 'off') {
        if (!setting.autotyping) return m.reply('Sudah dinonaktifkan sebelumnya')
        setting.autotyping = false
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses menonaktifkan autotyping.')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break
    case 'cekidch':
    case 'getidch': {
      if (!text) return m.reply(`Kirim perintah ${prefix + command} _linkchannel_`)
      if (!isUrl(args[0]) && !args[0].includes('whatsapp.com/channel')) return m.reply(`Harus Berupa Link Channel`)
      let result = args[0].split('https://whatsapp.com/channel/')[1]
      let data = await sock.newsletterMetadata("invite", result)
      let teks = `*乂 NEWSLETTER INFO*

*Name:* ${data.name}
*Status*: ${data.state}
*Subscribers*: ${data.subscribers}
*Meta Verify*: ${data.verification}
*React Emoji:* ${data.reaction_codes}
*Id Channel:* ${data.id}
*Description*:
${data.description}

`
      m.reply(teks)
    }
    break

    // Push

    case 'jpm': {
      if (!isOwner) return onlyOwn()
      if (!isPc) return onlyPrivat()
      react()
      if (!text) m.reply(`Contoh: ${p_c} teks`)
      let getGroups = await sock.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
      let anu = groups.map(v => v.id)
      for (let i of anu) {
        await sleep(1500)
        let metadat72 = await sock.groupMetadata(i)
        let participanh = await metadat72.participants
        let msg = generateWAMessageFromContent(i, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: null,
                  forwardingScore: 99999999999,
                  isForwarded: false,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: chjid + '@newsletter',
                    newsletterName: `${wm}`,
                    serverMessageId: 145
                  },
                  businessMessageForwardInfo: {
                    businessOwnerJid: sock.decodeJid(sock.user.id)
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: text
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: ``
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: "",
                  subtitle: "",
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                    text: '-'
                  }],
                })
              })
            }
          }
        }, {})
        await sock.relayMessage(i, msg.message, {
          messageId: msg.key.id
        })
      }
      m.reply(`Berhasil mengirim jpm hidetag ke ${anu.length} grup!`)
    }
    break

    case 'jpmhidetag': {
      if (!isOwner) return onlyOwn()
      if (!isPc) return onlyPrivat()
      react()
      if (!text) m.reply(`Contoh: ${p_c} teks`)
      let getGroups = await sock.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
      let anu = groups.map(v => v.id)
      for (let i of anu) {
        await sleep(1500)
        let metadat72 = await sock.groupMetadata(i)
        let participanh = await metadat72.participants
        let msg = generateWAMessageFromContent(i, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: participanh.map(a => a.id),
                  forwardingScore: 99999999999,
                  isForwarded: false,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: chjid + '@newsletter',
                    newsletterName: `${wm}`,
                    serverMessageId: 145
                  },
                  businessMessageForwardInfo: {
                    businessOwnerJid: sock.decodeJid(sock.user.id)
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: text
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: ``
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: "",
                  subtitle: "",
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                    text: '-'
                  }],
                })
              })
            }
          }
        }, {})
        await sock.relayMessage(i, msg.message, {
          messageId: msg.key.id
        })
      }
      m.reply(`Berhasil mengirim jpm hidetag ke ${anu.length} grup!`)
    }
    break

    case 'jpmfoto': {
      if (!isOwner) return onlyOwn()
      if (!isPc) return onlyPrivat()
      if (!isMediaa) return m.reply('Harus berupa gambar/video!')
      if (!text) return m.reply(`Contoh: ${p_c} teks`)
      react()
      let getGroups = await sock.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
      let anu = groups.map((v) => v.id)

      for (let xnxx of anu) {
        let metadat72 = await sock.groupMetadata(xnxx)
        let participanh = await metadat72.participants

        if (/image/.test(mime)) {
          let media = await sock.downloadAndSaveMediaMessage(quoted)
          let mem = await CatBox(media)
          await sock.sendMessage(xnxx, {
            image: {
              url: mem
            },
            caption: `${kapital(text)}`,
            contextInfo: {
              mentionedJid: participanh.map(a => a.id)
            }
          }, {
            quoted: m
          })
          await sleep(2000)
        } else if (/video/.test(mime)) {
          let media1 = await sock.downloadAndSaveMediaMessage(quoted)
          let mem1 = await CatBox(media1)
          await sock.sendMessage(xnxx, {
            video: {
              url: mem1
            },
            caption: `${kapital(text)}`,
            contextInfo: {
              mentionedJid: participanh.map(a => a.id)
            }
          }, {
            quoted: m
          })
          await sleep(2000)
        } else {
          await sock.sendMessage(xnxx, {
            text: `${kapital(text)}`,
            contextInfo: {
              mentionedJid: participanh.map(a => a.id)
            }
          }, {
            quoted: m
          })
          await sleep(2000)
        }
      }
      m.reply(`Berhasil mengirim broadcast ke ${anu.length} grup!`)
    }
    break

    case 'addch':
    case 'addchannel': {
      if (!isOwner) return onlyOwn();
      if (!args[0]) return m.reply(`Contoh: ${p_c} https://whatsapp.com/channel/123abc`);

      const filePath = './database/channelid.json';
      const ch = JSON.parse(fs.readFileSync(filePath).toString());

      if (!isUrl(args[0]) || !args[0].includes('whatsapp.com/channel/'))
        return m.reply(`Link tidak valid, harus berupa link channel WhatsApp`);

      let result = args[0].split('https://whatsapp.com/channel/')[1].replace('/', '').trim();
      let data = await sock.newsletterMetadata("invite", result);

      if (!data || !data.id) return m.reply('Gagal mengambil metadata channel.');
      if (ch.includes(data.id)) return m.reply('Channel sudah ada di daftar jpmch!');

      ch.push(data.id);
      fs.writeFileSync(filePath, JSON.stringify(ch, null, 2));
      m.reply(`Berhasil menambahkan channel:\n• ID: ${data.id}\n• Nama: ${data.name || 'Tanpa Nama'}`);
    }
    break

    case 'delch':
    case 'delchannel': {
      if (!isOwner) return onlyOwn();
      if (!args[0]) return m.reply(`Contoh: ${p_c} 1\nGunakan .listch untuk melihat nomor channel.`);

      const filePath = './database/channelid.json';
      let ch = JSON.parse(fs.readFileSync(filePath).toString());

      if (ch.length === 0) return m.reply('📂 Belum ada channel yang tersimpan.');

      let index = parseInt(args[0]) - 1;
      if (isNaN(index) || index < 0 || index >= ch.length)
        return m.reply(`❌ Nomor tidak valid. Gunakan antara 1 sampai ${ch.length}`);

      let removed = ch.splice(index, 1)[0];
      fs.writeFileSync(filePath, JSON.stringify(ch, null, 2));

      m.reply(`✅ Berhasil menghapus channel nomor ${args[0]}:\nID: ${removed}`);
    }
    break

    case 'listch':
    case 'listchannel': {
      if (!isOwner) return onlyOwn()

      const filePath = './database/channelid.json'
      const ch = JSON.parse(fs.readFileSync(filePath).toString())

      if (ch.length === 0) return m.reply('📂 Belum ada channel yang tersimpan.')

      let teks = `📋 *Daftar Channel yang Tersimpan:*\n\n`

      for (let i = 0; i < ch.length; i++) {
        try {
          let data = await sock.newsletterMetadata("jid", ch[i])
          teks += `${i + 1}. ${data.name || 'Tanpa Nama'}\n   ID: ${ch[i]}\n\n`
        } catch (err) {
          teks += `${i + 1}. [GAGAL AMBIL DATA]\n   ID: ${ch[i]}\n\n`
        }
      }

      teks += `Gunakan perintah *${p_c} [1]* untuk menghapus channel id 1.`

      m.reply(teks.trim())
    }
    break

    case 'jpmch':
    case 'jpmchannel': {
      if (!isOwner) return onlyOwn()
      if (!text) return m.reply(`Contoh: ${p_c} Halo ini pesan broadcast ke semua channel`)

      const filePath = './database/channelid.json'
      const ch = JSON.parse(fs.readFileSync(filePath).toString())

      if (ch.length == 0) return m.reply('Belum ada channel yang ditambahkan.')

      let sukses = 0,
        gagal = 0

      for (let id of ch) {
        try {
          await sock.sendTextWithMentions(id, text, null)
          sukses++
          await delay(2000)
        } catch (e) {
          gagal++
          console.log(`Gagal kirim ke ${id}: ${e.message}`)
        }
      }

      m.reply(`✅ Broadcast selesai.\n🟢 Berhasil: ${sukses}\n🔴 Gagal: ${gagal}`)
    }
    break

    default:


    }

  } catch (err) {
    console.log(err)
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`Update ${__filename}`)
  delete require.cache[file]
  require(file)
})