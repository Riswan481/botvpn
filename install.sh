#!/bin/bash

echo "=== Instalasi BotVPN ==="

# Update sistem
apt update && apt upgrade -y

# Install Node.js & npm (versi LTS terbaru)
echo "[*] Menginstall Node.js..."
apt install -y nodejs npm

# Cek versi Node.js
node -v
npm -v

# Install PM2 untuk menjalankan bot di background
echo "[*] Menginstall PM2..."
npm install -g pm2

# Clone repo jika belum ada
if [ ! -d "botvpn" ]; then
    echo "[*] Clone repository..."
    git clone https://github.com/Riswan481/botvpn.git
fi

cd botvpn || exit

# Install dependencies
echo "[*] Menginstall dependencies..."
npm install

# Jalankan bot pertama kali
echo "[*] Menjalankan bot..."
pm2 start index.js --name botvpn

# Auto start saat reboot
pm2 startup
pm2 save

echo "=== Instalasi selesai! ==="
echo "Gunakan 'pm2 logs botvpn' untuk melihat log."