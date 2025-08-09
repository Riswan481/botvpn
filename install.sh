#!/bin/bash

echo "=== Instalasi BotVPN ==="

# Minta nomor owner
read -p "Masukkan nomor owner/admin (format: 628xxxx): " OWNER_NUMBER

# Update & install paket dasar
apt update && apt upgrade -y
apt install -y nodejs npm git

# Install PM2
npm install -g pm2

# Masuk ke folder bot
cd "$(dirname "$0")" || exit

# Edit settings.js untuk set owner
if grep -q "global.owner" settings.js; then
    sed -i "s/global\.owner\s*=.*/global.owner = ['$OWNER_NUMBER']/g" settings.js
else
    echo "global.owner = ['$OWNER_NUMBER']" >> settings.js
fi

# Install dependencies
npm install

# Jalankan bot untuk login nomor bot
echo "=== Sekarang login nomor bot WhatsApp ==="
echo "Scan QR atau masukkan pairing code yang muncul"
node index.js