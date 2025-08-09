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
• .listvps
• .addvps
• .hapusvps
• .autoread

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

    6
      } else m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
    }
    break
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