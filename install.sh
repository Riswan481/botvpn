#!/bin/bash

# ==========================
# --- Konfigurasi awal ---
# ==========================
REPO_URL="https://github.com/Riswan481/botvpn.git"

# ==========================
# --- Warna & Garis ---
# ==========================
YELLOW='\033[1;33m'
GREEN='\033[1;92m'
BLUE='\033[1;94m'
CYAN='\033[1;96m'
RED='\033[1;91m'
NC='\033[0m'
LINE="${CYAN}
═══════════════════════════════════════════════════════════════${NC}"

# ==========================
# --- Fungsi loading ---
# ==========================
loading_spinner() {
  local pid=$!
  local delay=0.1
  local spinstr='|/-\\'
  while kill -0 $pid 2>/dev/null; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  wait $pid
}

# ==========================
# --- Menu Pilihan ---
# ==========================
clear
echo -e "${YELLOW}"
echo "═══════════════════════════════════════════════════════════════"
echo "    🚀 INSTALLER BOT WHATSAPP by RISWAN        "
echo "═══════════════════════════════════════════════════════════════"
echo -e "${NC}"
echo -e "${GREEN}Pilih opsi:${NC}"
echo -e "  1) 🤖 Install Bot WhatsApp"
echo -e "  2) 🗑️ Hapus Bot WhatsApp"
echo "═══════════════════════════════════════════════════════════════"
echo ""

read -p "$(echo -e "${YELLOW}Masukkan pilihan kamu (1/2): ${NC}")" INSTALL_OPTION

if [[ "$INSTALL_OPTION" != "1" && "$INSTALL_OPTION" != "2" ]]; then
  echo -e "${RED}❌ Pilihan tidak valid.${NC}"
  exit 1
fi

# ==========================
# --- Instalasi Bot WA ---
# ==========================
if [[ "$INSTALL_OPTION" == "1" ]]; then
  echo -e "$LINE"
  echo -e "${BLUE}🤖 Instalasi Bot WhatsApp...${NC}"
  echo -e "$LINE"

  echo -ne "${YELLOW}📦 Menginstal nodejs, npm, git, jq...${NC}"
  (apt install -y nodejs npm git jq) & loading_spinner

  echo -ne "${YELLOW}📥 Clone repo bot WhatsApp...${NC}"
  (git clone "$REPO_URL" simplebot) & loading_spinner

  cd simplebot || exit

  echo -ne "${YELLOW}📦 Menginstall package npm...${NC}"
  (npm install) & loading_spinner

  echo -ne "${YELLOW}📦 Menginstall PM2...${NC}"
  (npm install -g pm2) & loading_spinner

  read -p "$(echo -e "${YELLOW}📱 Masukkan nomor WhatsApp owner (cth: 6281234567890): ${NC}")" OWNER_NUMBER

  if [[ -f settings.js ]]; then
    if grep -q "global\.owner" settings.js; then
      sed -i -E "s/global\.owner *= *[\"'][^\"']*[\"']/global.owner = \"$OWNER_NUMBER\"/" settings.js
      echo -e "${YELLOW}✅ global.owner berhasil diubah ke \"$OWNER_NUMBER\"${NC}"
    else
      echo -e "${RED}❌ Tidak ditemukan baris global.owner di settings.js${NC}"
    fi
  else
    echo -e "${RED}❌ File settings.js tidak ditemukan!${NC}"
  fi

  read -n 1 -s -r -p "📌 Tekan tombol apapun untuk pairing WhatsApp..."
  echo ""
  echo -e "${YELLOW}🔑 Menjalankan pairing WhatsApp...${NC}"
  echo -e "${YELLOW}🕒 Tunggu sampai muncul '✅ Bot terhubung!', lalu CTRL+C...${NC}"
  echo ""
  node index.js

  echo -e ""
  echo -e "${GREEN}✅ Pairing sukses. Menjalankan bot di PM2...${NC}"
  cd ~/simplebot || exit
  pm2 delete simplebot 2>/dev/null
  pm2 start index.js --name simplebot
  pm2 save
  pm2 startup

  echo -e "${GREEN}✅ Bot berhasil dijalankan di PM2 dengan nama: simplebot${NC}"
  pm2 list
fi

# ==========================
# --- Hapus Bot WhatsApp ---
# ==========================
if [[ "$INSTALL_OPTION" == "2" ]]; then
  echo -e "$LINE"
  echo -e "${RED}🗑️ Menghapus Bot WhatsApp...${NC}"
  echo -e "$LINE"

  echo -ne "${YELLOW}📍 Menghapus folder simplebot...${NC}"
  (rm -rf simplebot) & loading_spinner

  echo -ne "${YELLOW}🧹 Menghapus PM2 dan proses bot...${NC}"
  (
    pm2 stop simplebot >/dev/null 2>&1
    pm2 delete simplebot >/dev/null 2>&1
    pm2 save
  ) & loading_spinner

  echo -e "${GREEN}✅ Bot WhatsApp berhasil dihapus.${NC}"
fi

# ==========================
# --- Selesai ---
# ==========================
echo ""
echo -e "$LINE"
if [[ "$INSTALL_OPTION" == "1" ]]; then
  echo -e "🤖 ${CYAN}Bot WA aktif dengan PM2.${NC}"
fi
echo -e "$LINE"
echo -e "${CYAN}        ✅ Bot WhatsApp Installer by Riswan ✅${NC}"
echo -e "$LINE"
echo -e "${GREEN}🎉 Proses selesai tanpa error.${NC}"