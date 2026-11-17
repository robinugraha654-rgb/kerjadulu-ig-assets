# LolosKerja app (Cloudflare Pages)

App latihan LolosKerja Kit di https://loloskerja.pages.dev, dengan kode akses per pembeli.

| Path | Isi |
|---|---|
| `public/` | Halaman app (`index.html`), service worker offline (`sw.js`), manifest, ikon, dan halaman admin (`admin/`). |
| `functions/` | Logika server: aktivasi kode (`api/activate.js`), isi app untuk HP yang sudah aktif (`api/kit.js`), admin kode (`api/admin/codes.js`). `_kit.js` (seluruh soal dan panduan) sengaja tidak ada di repo ini. |
| `build/` | Sumber halaman app (`app.head.html`, `app.script.html`, `gate.js`, `install.js`), Modul 0 (`modul0.py`), perakit halaman (`make.py`), deploy (`deploy.py`), dan worker (`worker-entry.js`). |

## Ubah lalu deploy

```bash
python3 build/make.py build/app.head.html build/app.script.html build/install.js public/index.html build/gate.js
python3 build/deploy.py main
```

`deploy.py` membuat `dist/` (aset + `_worker.js` hasil bundel `functions/`) lalu mengunggahnya lewat API Cloudflare.

## Rahasia

`TOKEN_SECRET` dan `ADMIN_KEY` tersimpan sebagai secret di proyek Pages `loloskerja`. Salinan lokal ada di `.secrets.local` (tidak di-commit).

## Isi berbayar (`functions/_kit.js`)

Repo ini publik, jadi isi soal, jawaban interview, dan modul tidak disimpan di sini. Sumbernya adalah blok JSON `kit-data` di artifact privat **Kerja Dulu App** (https://claude.ai/artifact/GxshAdESpmoamC9wYPktyD). Untuk membuat ulang `functions/_kit.js`:

1. Simpan baris `<script type="application/json" id="kit-data">…</script>` dari artifact itu ke sebuah file, misalnya `/tmp/kit.part`.
2. Jalankan `python3 build/modul0.py /tmp/kit.part functions/_kit.js` (menambahkan Modul 0 Peta Seleksi).

## Kenapa deploy tidak memakai `wrangler pages deploy`

Di lingkungan tempat proyek ini dibuat, unggahan aset Pages diblokir. Karena itu semua file di `public/` disematkan ke dalam satu `_worker.js` (lihat `build/deploy.py`) lalu dikirim lewat API deployment Pages. Kalau `wrangler pages deploy` berjalan normal di komputermu, cara biasa itu juga bisa dipakai.
