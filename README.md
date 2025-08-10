Botvpn wa Installation Guide

Panduan ini menjelaskan cara instalasi dan menjalankan BotVPN di server Linux (misal Ubuntu/Debian).

---

Langkah Instalasi

1. Update dan upgrade sistem:
```bash
apt update && apt upgrade -y
apt install git -y
apt install nodejs -y
apt install npm -y
```
3. Clone repository Botvpn:
```bash
git clone https://github.com/Riswan481/botvpn.git
```
4. Masuk ke direktori botvpn:
```bash
cd botvpn
```
5. Install dependencies Node.js:
```bash
npm install
```
6. Jalankan bot untuk pertama kali:
```bash
node index.js
```
7. Install PM2 secara global untuk manajemen proses:
```bash
npm install -g pm2
```
8. Jalankan bot menggunakan PM2:
9. Setelah ini Reboot vps 
```bash
pm2 start index.js --name botvpn
pm2 save
pm2 startup
```
Cara Menghapus BotVPN

Jika ingin menghapus bot dan foldernya, jalankan perintah berikut:
```bash
rm -rf /root/botvpn
```

