#!/bin/bash
# =========================================
# Script Instalasi Bot dari Repo Riswan481
# =========================================

# Warna untuk output
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}=== Instalasi Bot Dimulai ===${NC}"

# Update & install Node.js + Git
echo -e "${GREEN}1. Update system & install dependency...${NC}"
apt update && apt upgrade -y
apt install -y git curl unzip

# Install Node.js versi LTS
if ! command -v node &> /dev/null; then
    echo -e "${GREEN}Menginstall Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi

# Clone repo
echo -e "${GREEN}2. Clone repository bot...${NC}"
if [ ! -d "botvpn" ]; then
    git clone https://github.com/Riswan481/botvpn.git
fi

cd botvpn || exit

# Install dependencies
echo -e "${GREEN}3. Install dependencies Node.js...${NC}"
npm install

# Tanya input Owner dan Nomor Bot
echo -e "${GREEN}4. Masukkan konfigurasi awal bot...${NC}"
read -p "Masukkan nomor owner (contoh: 628xxx): " OWNER_NUMBER
read -p "Masukkan nomor bot (contoh: 628xxx): " BOT_NUMBER

# Simpan ke settings.js (jika perlu edit otomatis)
if grep -q "OWNER_NUMBER" settings.js; then
    sed -i "s/OWNER_NUMBER.*/OWNER_NUMBER = '${OWNER_NUMBER}';/" settings.js
fi
if grep -q "BOT_NUMBER" settings.js; then
    sed -i "s/BOT_NUMBER.*/BOT_NUMBER = '${BOT_NUMBER}';/" settings.js
fi

# Jalankan bot
echo -e "${GREEN}5. Menjalankan bot...${NC}"
node index.js