#!/bin/bash
clear
echo "===================================="
echo " 🚀 Auto Install & Run BotVPN"
echo "===================================="

BOT_DIR="/root/botvpn"
INDEX_FILE="$BOT_DIR/index.js"

# === Fungsi ganti owner (bisa kapan saja) ===
change_owner() {
    NEW_OWNER=$1
    if [ -z "$NEW_OWNER" ]; then
        echo "❌ Nomor owner belum dimasukkan!"
        echo "👉 Contoh: ./install-botvpn.sh owner 6285888801241"
        exit 1
    fi

    if grep -q '^global.owner' "$INDEX_FILE"; then
        sed -i "s/^global.owner = \".*\"/global.owner = \"$NEW_OWNER\"/" "$INDEX_FILE"
    else
        echo "global.owner = \"$NEW_OWNER\" // Owner number" >> "$INDEX_FILE"
    fi

    echo "✅ Nomor owner berhasil diubah ke: $NEW_OWNER"
    pm2 restart botvpn
    exit 0
}

# === Mode ganti owner ===
if [ "$1" == "owner" ]; then
    change_owner $2
fi

# === Install otomatis (jalan sekali aja) ===
if [ ! -d "$BOT_DIR" ]; then
    # Tanya URL repo & nomor owner
    read -p "👉 Masukkan URL repo Git (contoh: https://github.com/Riswan481/botvpn.git): " REPO
    read -p "👉 Masukkan nomor owner (contoh: 6285888801241): " OWNER

    # Update & install dependency
    apt update -y && apt upgrade -y
    apt install -y curl wget git unzip screen

    # Install Node.js LTS (18.x)
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs npm

    # Install PM2
    npm install -g pm2

    # Clone repo
    git clone $REPO $BOT_DIR
    cd $BOT_DIR

    # Install dependency
    npm install cheerio
    npm install

    # Set owner pertama kali
    if grep -q '^global.owner' "$INDEX_FILE"; then
      sed -i "s/^global.owner = \".*\"/global.owner = \"$OWNER\"/" "$INDEX_FILE"
    else
      echo "global.owner = \"$OWNER\" // Owner number" >> "$INDEX_FILE"
    fi

    echo "✅ Nomor owner berhasil di-set ke: $OWNER"

    # Jalankan bot dengan PM2
    pm2 delete botvpn >/dev/null 2>&1
    pm2 start index.js --name "botvpn"
    pm2 save
    pm2 startup -u root --hp /root
else
    echo "✅ Bot sudah pernah diinstall sebelumnya!"
    echo "👉 Kalau mau ganti owner: ./install-botvpn.sh owner NOMOR"
    exit 0
fi

echo "===================================="
echo "✅ Bot sudah berjalan otomatis!"
echo "👉 Lihat status bot: pm2 status"
echo "👉 Restart bot: pm2 restart botvpn"
echo "👉 Stop bot: pm2 stop botvpn"
echo "👉 Ganti owner: ./install-botvpn.sh owner NOMOR"
echo "===================================="