WhatsApp Bot Installation Vpn

Panduan ini menyediakan langkah-langkah lengkap untuk menginstal dan menjalankan WhatsApp Bot pada server Linux seperti Ubuntu atau Debian. Dengan instruksi yang sistematis dan mudah diikuti, Anda akan dapat mengaktifkan bot WhatsApp dengan cepat dan menjaga bot agar berjalan stabil menggunakan PM2.

Dokumentasi ini mencakup instalasi semua dependensi penting, pengaturan bot, hingga pengelolaan proses agar bot tetap aktif otomatis meskipun server melakukan restart.

Selamat mencoba dan semoga bot WhatsApp Anda berjalan lancar!

Langkah Instalasi
1. Install bot:
```bash
rm -rf /root/botvpn && git clone https://github.com/Riswan481/botvpn.git /root/botvpn && cd /root/botvpn && npm install cheerio && npm install && node index.js
```
2. pm2:
```bash
npm install -g pm2 && pm2 start index.js --name botvpn && pm2 save && pm2 startup
```

Jika ingin menghapus bot dan foldernya, jalankan perintah berikut:
```bash
rm -rf /root/botvpn
```
