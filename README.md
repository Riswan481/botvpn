WhatsApp Bot Installation Guide

Panduan ini menyediakan langkah-langkah lengkap untuk menginstal dan menjalankan WhatsApp Bot pada server Linux seperti Ubuntu atau Debian. Dengan instruksi yang sistematis dan mudah diikuti, Anda akan dapat mengaktifkan bot WhatsApp dengan cepat dan menjaga bot agar berjalan stabil menggunakan PM2.

Dokumentasi ini mencakup instalasi semua dependensi penting, pengaturan bot, hingga pengelolaan proses agar bot tetap aktif otomatis meskipun server melakukan restart.

Selamat mencoba dan semoga bot WhatsApp Anda berjalan lancar!

---

Langkah Instalasi

1. Update dan upgrade sistem:
```bash
apt update && apt upgrade -y
apt install git -y
apt install nodejs -y
apt install npm -y
```
2. Clone repository Botvpn:
```bash
git clone https://github.com/Riswan481/botvpn.git
```
3. Masuk ke direktori botvpn:
```bash
cd botvpn
```
4.menginstall module cheerio yang dibutuhkan.
```bash
npm install cheerio
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

